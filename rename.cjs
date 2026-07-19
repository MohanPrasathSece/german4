const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');
const rootPath = __dirname;

const replacements = [
  { regex: /Valakt/g, replacement: 'The Finance View' },
  { regex: /valakt\.example\.com/g, replacement: 'thefinanceview.example.com' },
  { regex: /valakt_auth/g, replacement: 'thefinanceview_auth' },
  { regex: /valakt/g, replacement: 'the_finance_view' },
  { regex: /VALAKT/g, replacement: 'THE_FINANCE_VIEW' },
];

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (
        dirFile.endsWith('.ts') ||
        dirFile.endsWith('.tsx') ||
        dirFile.endsWith('.html') ||
        dirFile.endsWith('.json')
      ) {
        if (!dirFile.includes('package-lock.json')) {
            filelist.push(dirFile);
        }
      }
    }
  }
  return filelist;
}

const allFiles = walkSync(rootPath);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

// Rename CryptoDashboard to FinanceDashboard
const oldDashboard = path.join(__dirname, 'src', 'pages', 'CryptoDashboard.tsx');
const newDashboard = path.join(__dirname, 'src', 'pages', 'FinanceDashboard.tsx');
if (fs.existsSync(oldDashboard)) {
  fs.renameSync(oldDashboard, newDashboard);
  console.log(`Renamed CryptoDashboard.tsx to FinanceDashboard.tsx`);
}
