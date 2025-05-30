const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = xlsx.readFile('redirects.xlsx'); // Replace with your Excel file name
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

// Convert to the required format
const redirects = {
  redirects: data.map(row => ({
    source: row['Top pages'], // Using the column name from your Excel
    destination: row['Redirect to'], // Using the column name from your Excel
    permanent: true
  }))
};

// Write to redirects.json
const outputPath = path.join(__dirname, '../src/config/redirects.json');
fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2));

console.log(`Successfully converted ${redirects.redirects.length} redirects to JSON format!`); 