const fs = require('fs');
const path = require('path');

const files = [
  'packages/app/features/admin/screen.tsx',
  'packages/app/features/history/screen.tsx',
  'packages/app/features/input/screen.tsx',
  'packages/app/features/preview/screen.tsx',
  'packages/app/features/questionnaire/screen.tsx',
  'packages/app/features/user/onboarding.tsx',
  'packages/app/engine/QuestionnaireEngine.tsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Add useTheme import if not present
  if (!content.includes('useTheme')) {
    content = content.replace(/(import .*?;[\r\n]+)/, `$1import { useTheme } from '../../design/useTheme';\n`);
  }
  
  // Add const theme = useTheme(); if not present
  if (!content.includes('const theme = useTheme();')) {
    content = content.replace(/((?:export function|const \w+ = \(\) =>)[\s\S]*?{)/, `$1\n  const theme = useTheme();`);
  }

  // Convert className="..." to className={`...`} for theme injection
  content = content.replace(/className="([^"]+)"/g, (match, p1) => {
    // If it contains things we want to replace
    if (/(text-white|text-slate-400|text-slate-500|text-slate-600|border-white\/5|border-white\/10|bg-surface-light\/30|bg-surface\/40|bg-background\/50|bg-black\/20|bg-surface|bg-background)/.test(p1)) {
      let replaced = p1
        .replace(/\btext-white\b/g, '${theme.text}')
        .replace(/\btext-slate-400\b/g, '${theme.textMuted}')
        .replace(/\btext-slate-500\b/g, '${theme.textMuted}')
        .replace(/\btext-slate-600\b/g, '${theme.textMuted}')
        .replace(/\bborder-white\/5\b/g, '${theme.borderSubtle}')
        .replace(/\bborder-white\/10\b/g, '${theme.border}')
        .replace(/\bbg-surface-light\/30\b/g, '${theme.cardBg}')
        .replace(/\bbg-surface\/40\b/g, '${theme.cardBg}')
        .replace(/\bbg-background\/50\b/g, '${theme.headerBg}')
        .replace(/\bbg-black\/20\b/g, '${theme.inputBg}')
        .replace(/\bbg-surface\b/g, '${theme.surface}')
        .replace(/\bbg-background\b/g, '${theme.bg}');
        
      return `className={\`${replaced}\`}`;
    }
    return match;
  });
  
  // Also handle already template strings: className={`...`}
  content = content.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
    let replaced = p1
        .replace(/\btext-white\b/g, '${theme.text}')
        .replace(/\btext-slate-400\b/g, '${theme.textMuted}')
        .replace(/\btext-slate-500\b/g, '${theme.textMuted}')
        .replace(/\btext-slate-600\b/g, '${theme.textMuted}')
        .replace(/\bborder-white\/5\b/g, '${theme.borderSubtle}')
        .replace(/\bborder-white\/10\b/g, '${theme.border}')
        .replace(/\bbg-surface-light\/30\b/g, '${theme.cardBg}')
        .replace(/\bbg-surface\/40\b/g, '${theme.cardBg}')
        .replace(/\bbg-background\/50\b/g, '${theme.headerBg}')
        .replace(/\bbg-black\/20\b/g, '${theme.inputBg}')
        .replace(/\bbg-surface\b/g, '${theme.surface}')
        .replace(/\bbg-background\b/g, '${theme.bg}');
    return `className={\`${replaced}\`}`;
  });

  fs.writeFileSync(fullPath, content);
});
console.log('Refactor complete.');
