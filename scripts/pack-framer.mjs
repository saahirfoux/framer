import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  existsSync,
  unlinkSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const componentsRoot = join(root, 'src/components');
const deployRoot = join(root, 'deploy');

/** Per-component transforms before paste into Framer (no Vite asset paths). */
const STRIP_RULES = {
  FlipCard: (source) =>
    source
      .replace(/^import heroImage from ['"].*hero\.png['"];\n/m, '')
      .replace(
        /export const DEFAULT_IMAGE = heroImage;/,
        "export const DEFAULT_IMAGE = '';",
      )
      .replace(/image: DEFAULT_IMAGE,/, "image: '',"),
};

const PACKED_STYLES_MARKER = /const PACKED_STYLES = ['"]['"];?/;

/** Bundle sibling component sources into one Framer paste file. */
/** Static brand assets copied/rasterized into deploy on pack. */
const ASSET_EXPORTS = {
  SearchSquircleIcon: {
    svg: 'search-squircle-icon.svg',
    outputs: [
      { file: 'favicon.svg', copy: true },
      { file: 'search-squircle-icon-192.png', width: 192, height: 192 },
      { file: 'search-squircle-icon-512.png', width: 512, height: 512 },
    ],
  },
};

const INLINE_DEPS = {
  OmPricingSection: [
    {
      component: 'OmPricingTierCard',
      importPattern:
        /^import \{[\s\S]*?\} from '\.\.\/OmPricingTierCard\/OmPricingTierCard';\n/m,
      cssImportPattern: /^import '\.\.\/OmPricingTierCard\/styles\.css';\n/m,
    },
  ],
};

function stripExportsFromInlinedSource(source, componentName) {
  return source
    .replace(new RegExp(`^export function ${componentName}\\b`, 'm'), `function ${componentName}`)
    .replace(/^export type /gm, 'type ')
    .replace(/^export interface /gm, 'interface ')
    .replace(/^export const /gm, 'const ');
}

function stripInlinedComponentArtifacts(source, componentName) {
  return source
    .replace(/^import ['"]\.\/styles\.css['"];\n/m, '')
    .replace(
      new RegExp(
        `function ${componentName}Styles\\(\\) {[\\s\\S]*?^}\\n`,
        'm',
      ),
      '',
    )
    .replace(PACKED_STYLES_MARKER, 'const PACKED_STYLES = \'\';')
    .replace(
      new RegExp(`\\s*<${componentName}Styles \\/>\\n`, 'g'),
      '',
    );
}

function inlineDependencies(componentName, source) {
  const deps = INLINE_DEPS[componentName];
  if (!deps?.length) return { source, extraCss: '' };

  let merged = source;
  const cssChunks = [];

  for (const dep of deps) {
    const depDir = join(componentsRoot, dep.component);
    const depSource = readFileSync(
      join(depDir, `${dep.component}.tsx`),
      'utf8',
    );
    const depCssPath = join(depDir, 'styles.css');
    if (existsSync(depCssPath)) {
      cssChunks.push(readFileSync(depCssPath, 'utf8'));
    }

    let inlined = stripInlinedComponentArtifacts(depSource, dep.component);
    inlined = stripExportsFromInlinedSource(inlined, dep.component);
    merged = merged.replace(dep.importPattern, '');
    if (dep.cssImportPattern) {
      merged = merged.replace(dep.cssImportPattern, '');
    }
    merged = `${inlined.trimEnd()}\n\n${merged}`;
  }

  return { source: merged, extraCss: cssChunks.join('\n') };
}

function discoverPackableComponents() {
  if (!existsSync(componentsRoot)) return [];

  return readdirSync(componentsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => {
      const dir = join(componentsRoot, name);
      return (
        existsSync(join(dir, `${name}.tsx`)) &&
        existsSync(join(dir, `${name}.framer.tsx`)) &&
        existsSync(join(dir, 'styles.css'))
      );
    });
}

function stripForFramer(componentName, source) {
  const strip = STRIP_RULES[componentName];
  return strip ? strip(source) : source;
}

function escapeCssForTemplateLiteral(css) {
  return css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function inlineStyles(source, css) {
  const escaped = escapeCssForTemplateLiteral(css);
  return source
    .replace(/^import ['"]\.\/styles\.css['"];\n/m, '')
    .replace(PACKED_STYLES_MARKER, `const PACKED_STYLES = \`${escaped}\`;`);
}

function prepareComponentForDeploy(componentName, source) {
  const fnExport = new RegExp(`^export function ${componentName}\\b`, 'm');
  return source.replace(fnExport, `function ${componentName}`);
}

function extractFramerControls(componentName, framerSource) {
  const importFramer =
    "import { addPropertyControls, ControlType } from 'framer';\n";
  const importComponent = new RegExp(
    `^import \\{[\\s\\S]*?\\} from '\\.\\/${componentName}';\n`,
    'm',
  );
  const importRelative = /^import \{[\s\S]*?\} from '\.\.\/[^']+';\n/gm;
  const exportDefault = new RegExp(`^export default ${componentName};\n\n?`, 'm');

  const withoutImports = framerSource
    .replace(/^import \{ addPropertyControls, ControlType \} from 'framer';\n/m, '')
    .replace(importComponent, '')
    .replace(importRelative, '')
    .replace(exportDefault, '');

  return (
    importFramer +
    withoutImports.trimEnd() +
    `\n\nexport default ${componentName};\n`
  );
}

/** Move ESM imports to the top so they are not buried below inlined code. */
function hoistImports(source) {
  const importPattern = /^import\s[\s\S]*?;\n/gm;
  const imports = source.match(importPattern) ?? [];
  if (imports.length === 0) return source;

  let rest = source;
  for (const statement of imports) {
    rest = rest.replace(statement, '');
  }

  return `${imports.join('')}\n${rest.replace(/^\n+/, '')}`;
}

async function exportComponentAssets(componentName, deployDir) {
  const config = ASSET_EXPORTS[componentName];
  if (!config) return [];

  const svgPath = join(componentsRoot, componentName, config.svg);
  if (!existsSync(svgPath)) {
    console.warn(
      `Warning: ${componentName} asset source missing: ${config.svg}`,
    );
    return [];
  }

  const svgBuffer = readFileSync(svgPath);
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error(
      `Error: sharp is required for ${componentName} PNG export. Run: npm install`,
    );
    process.exit(1);
  }

  const written = [];
  for (const output of config.outputs) {
    const outPath = join(deployDir, output.file);
    if (output.copy) {
      writeFileSync(outPath, svgBuffer);
    } else {
      await sharp(svgBuffer)
        .resize(output.width, output.height)
        .png()
        .toFile(outPath);
    }
    written.push(output.file);
  }
  return written;
}

async function packComponent(componentName) {
  const componentDir = join(componentsRoot, componentName);
  const deployDir = join(deployRoot, componentName);
  const tsPath = join(componentDir, `${componentName}.tsx`);
  const framerPath = join(componentDir, `${componentName}.framer.tsx`);
  const cssPath = join(componentDir, 'styles.css');

  let source = readFileSync(tsPath, 'utf8');
  const framerSource = readFileSync(framerPath, 'utf8');
  let css = readFileSync(cssPath, 'utf8');

  const inlined = inlineDependencies(componentName, source);
  source = inlined.source;
  if (inlined.extraCss) {
    css = `${inlined.extraCss}\n${css}`;
  }

  mkdirSync(deployDir, { recursive: true });

  const header = `// Generated by npm run pack:framer — paste this single file into Framer
// Do not edit manually; edit src/components/${componentName}/ and re-run pack:framer

`;

  let body = stripForFramer(componentName, source);
  body = inlineStyles(body, css);
  body = hoistImports(body);
  body = prepareComponentForDeploy(componentName, body);

  if (!PACKED_STYLES_MARKER.test(source) && !body.includes('const PACKED_STYLES = `')) {
    console.warn(
      `Warning: ${componentName} has no PACKED_STYLES marker; CSS may not be inlined.`,
    );
  }

  const controls = extractFramerControls(componentName, framerSource);

  writeFileSync(
    join(deployDir, `${componentName}.tsx`),
    header + body + '\n' + controls,
    'utf8',
  );

  const legacyCssPath = join(deployDir, 'styles.css');
  if (existsSync(legacyCssPath)) {
    unlinkSync(legacyCssPath);
  }

  const assets = await exportComponentAssets(componentName, deployDir);
  return { deployDir, assets };
}

function parseArgs() {
  const dashIndex = process.argv.indexOf('--');
  if (dashIndex !== -1) {
    const name = process.argv[dashIndex + 1];
    return name || null;
  }
  const arg = process.argv[2];
  if (arg && !arg.startsWith('-')) return arg;
  return null;
}

const filterName = parseArgs();
const allComponents = discoverPackableComponents();

if (allComponents.length === 0) {
  console.error('No packable components found (need <Name>.tsx, <Name>.framer.tsx, styles.css).');
  process.exit(1);
}

const toPack = filterName
  ? allComponents.filter((name) => name === filterName)
  : allComponents;

if (filterName && toPack.length === 0) {
  console.error(
    `Component "${filterName}" is not packable. Available: ${allComponents.join(', ')}`,
  );
  process.exit(1);
}

console.log(`Packing ${toPack.length} component(s)...\n`);

for (const name of toPack) {
  const { assets } = await packComponent(name);
  console.log(`${name}:`);
  console.log(`  deploy/${name}/${name}.tsx (CSS inlined)`);
  for (const file of assets) {
    console.log(`  deploy/${name}/${file}`);
  }
  console.log('');
}

console.log('Done. Copy each deploy/<ComponentName>/<ComponentName>.tsx into Framer (one file).');
