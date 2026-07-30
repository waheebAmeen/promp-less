import fs from 'fs';
import path from 'path';

const storeFile = '/home/bashar/Projects/prompt_less/packages/app/storage/store.ts';
const content = fs.readFileSync(storeFile, 'utf8');

// Use a simple regex to extract INITIAL_WORKFLOWS
const match = content.match(/const INITIAL_WORKFLOWS: Workflow\[\] = (\[[\s\S]*?\]);\n/);

if (!match) {
  console.error("Could not find INITIAL_WORKFLOWS");
  process.exit(1);
}

// Evaluate the array
let workflows = [];
try {
  // We need to safely eval this. It might contain some syntax eval doesn't like, but it looks like standard JSON-like JS.
  const evalStr = `(${match[1]})`;
  workflows = eval(evalStr);
} catch (e) {
  console.error("Error evaluating workflows array", e);
  process.exit(1);
}

const templatesDir = '/home/bashar/Projects/prompt_less/packages/app/engine/templates';

if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

const categoryKeys = [];

for (const w of workflows) {
  if (w.id === 'study') {
    categoryKeys.push('study');
    continue; // already exists
  }
  
  const id = w.id;
  categoryKeys.push(id);
  
  // Create a default branch
  const templateContent = `export const ${id}Prompts = {
  default: {
    id: '${id}_default',
    title: '${w.name_ar} (افتراضي)',
    description: 'التدفق الأساسي لـ ${w.name_ar}',
    template: \`${w.template}\`,
    questions: ${JSON.stringify(w.questions, null, 2).replace(/"([^"]+)":/g, '$1:')}
  }
};
`;

  fs.writeFileSync(path.join(templatesDir, `${id}.ts`), templateContent);
  console.log(`Generated ${id}.ts`);
}

// Generate index.ts
let indexContent = '';
for (const key of categoryKeys) {
  indexContent += `import { ${key}Prompts } from './${key}';\n`;
}

indexContent += '\nexport const categoryTemplates: Record<string, Record<string, any>> = {\n';
for (const key of categoryKeys) {
  indexContent += `  ${key}: ${key}Prompts,\n`;
}
indexContent += '};\n';

fs.writeFileSync(path.join(templatesDir, 'index.ts'), indexContent);
console.log('Generated index.ts');
