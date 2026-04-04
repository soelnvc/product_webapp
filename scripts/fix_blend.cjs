const fs = require('fs');
const path = require('path');

const directory = '/Users/nvc/Documents/VS/FrontEnd/Project_2_React/productweb/src';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let newContent = content.replace(/mixBlendMode:\s*['"]multiply['"]/g, "mixBlendMode: 'var(--image-blend, multiply)'");
      
      // Fix Wishlist explore archive button
      newContent = newContent.replace(/backgroundColor:\s*['"]#EAEAEA['"]/ig, "backgroundColor: 'var(--archive-btn-bg)'");
      newContent = newContent.replace(/color:\s*['"]var\(--primary\)['"],\s*textDecoration:\s*['"]none['"],\s*padding:\s*['"]14px 30px['"],\s*borderRadius:\s*['"]30px['"]/g, "color: 'var(--archive-btn-text)', textDecoration: 'none', padding: '14px 30px', borderRadius: '30px'");

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(directory);
