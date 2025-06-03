const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = XLSX.readFile('redirects.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Generate redirects array
const redirects = data.map(row => ({
  source: row.source,
  destination: row.destination,
  permanent: true
}));

// Generate the configuration file
const configContent = `// This file is auto-generated. Do not edit manually.
const redirects = ${JSON.stringify(redirects, null, 2)};

module.exports = redirects;
`;

// Write to a new file
fs.writeFileSync(path.join(__dirname, '../config/redirects.js'), configContent);

console.log('Redirects configuration generated successfully!'); 