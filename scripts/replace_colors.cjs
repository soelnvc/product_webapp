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
      
      let newContent = content.replace(/background(Color)?:\s*['"]#fff(fff)?['"]/ig, "background$1: 'var(--surface-container-highest)'");
      newContent = newContent.replace(/color:\s*['"]#fff(fff)?['"]/ig, "color: 'var(--on-primary)'");
      newContent = newContent.replace(/color:\s*['"]#000(000)?['"]/ig, "color: 'var(--primary)'");
      newContent = newContent.replace(/background(Color)?:\s*['"]#000(000)?['"]/ig, "background$1: 'var(--primary)'");

      newContent = newContent.replace(/['"]#1a1c1d['"]/ig, "'var(--on-surface)'");
      newContent = newContent.replace(/['"]#474747['"]/ig, "'var(--on-surface-variant)'");
      newContent = newContent.replace(/['"]#f9f9fb['"]/ig, "'var(--surface)'");
      newContent = newContent.replace(/['"]#f3f3f5['"]/ig, "'var(--surface-container-low)'");
      newContent = newContent.replace(/['"]#e2e2e4['"]/ig, "'var(--surface-container-highest)'");
      newContent = newContent.replace(/['"]#c6c6c6['"]/ig, "'var(--outline-variant)'");

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(directory);
