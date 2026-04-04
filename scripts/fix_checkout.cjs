const fs = require('fs');
const filepath = '/Users/nvc/Documents/VS/FrontEnd/Project_2_React/productweb/src/pages/Checkout.jsx';
let content = fs.readFileSync(filepath, 'utf-8');

// Replace standard #EAEAEA or #F0F0F3 with var(--outline-variant)
content = content.replace(/['"]#EAEAEA['"]/g, "'var(--outline-variant)'");
content = content.replace(/['"]#F0F0F3['"]/g, "'var(--outline-variant)'");

// Replace #FDFDFD with var(--surface)
content = content.replace(/backgroundColor:\s*['"]#FDFDFD['"]/g, "backgroundColor: 'var(--surface)'");

// Fix the shipping method selected border '#000' to 'var(--primary)'
content = content.replace(/\? '#000' :/g, "? 'var(--primary)' :");

// Fix the shipping method dot border '#000' to 'var(--primary)'
content = content.replace(/border: '2px solid #000'/g, "border: '2px solid var(--primary)'");

// Fix text color for "Shipping Address" etc. It inherits from surface, but let's make sure sectionTitleStyle doesn't use standard color.
// Actually sectionTitleStyle doesn't have a color, so it naturally uses var(--text-primary) which is inherited from body. In checkout.jsx line 69 it was #FDFDFD which didn't set color.
// I will just add color: 'var(--text-primary)' to sectionTitleStyle to be ultra safe.
content = content.replace(/marginBottom: '30px', borderBottom: '1px solid/g, "marginBottom: '30px', color: 'var(--text-primary)', borderBottom: '1px solid");

fs.writeFileSync(filepath, content);
console.log('Checkout fixed');
