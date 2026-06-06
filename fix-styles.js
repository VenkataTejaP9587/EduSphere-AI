const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        files = files.concat(walk(filePath));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      files.push(filePath);
    }
  });
  return files;
}

const files = walk(path.join(__dirname, 'app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace justify: "..." with justifyContent: "..."
  if (content.includes('justify:')) {
    content = content.replace(/\bjustify:\s*/g, 'justifyContent: ');
    changed = true;
  }

  // Replace align: "..." with alignItems: "..."
  if (content.includes('align:')) {
    content = content.replace(/\balign:\s*/g, 'alignItems: ');
    changed = true;
  }

  // Fix media queries in inline styles in login/page.tsx and register/page.tsx
  if (file.endsWith('login/page.tsx') || file.endsWith('register/page.tsx')) {
    if (content.includes('"@media(minWidth:1024px)"')) {
      content = content.replace(
        /display:\s*"none",\s*background:\s*"linear-gradient\(135deg,#1a1040,#0f2040\)",\s*position:\s*"relative",\s*overflow:\s*"hidden",\s*"@media\(minWidth:1024px\)":\s*\{\s*display:\s*"flex"\s*\}/g,
        'display: "flex", background: "linear-gradient(135deg,#1a1040,#0f2040)", position: "relative", overflow: "hidden"'
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
