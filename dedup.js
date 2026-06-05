import fs from 'fs';

const filePath = './src/data/emojis.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Use regex to find items arrays and deduplicate them
content = content.replace(/items: \[(.*?)\]/g, (match, p1) => {
  const items = p1.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
  const uniqueItems = [...new Set(items)];
  return `items: [${uniqueItems.map(s => `'${s}'`).join(', ')}]`;
});

fs.writeFileSync(filePath, content);
console.log('Deduplicated emojis successfully.');
