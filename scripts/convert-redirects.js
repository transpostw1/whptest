const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = xlsx.readFile('redirects.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

// Function to clean and format URL
const cleanUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Ensure pathname starts with /
    return urlObj.pathname.startsWith('/') ? urlObj.pathname : '/' + urlObj.pathname;
  } catch (e) {
    // If not a valid URL, try to clean it manually
    const pathname = url.split('?')[0];
    return pathname.startsWith('/') ? pathname : '/' + pathname;
  }
};

// Function to clean destination URL
const cleanDestination = (url) => {
  try {
    const urlObj = new URL(url);
    // Keep the search params for destination
    const pathname = urlObj.pathname.startsWith('/') ? urlObj.pathname : '/' + urlObj.pathname;
    return pathname + urlObj.search;
  } catch (e) {
    // If not a valid URL, try to clean it manually
    const [pathname, search] = url.split('?');
    const cleanPath = pathname.startsWith('/') ? pathname : '/' + pathname;
    return search ? `${cleanPath}?${search}` : cleanPath;
  }
};

// Group redirects by their base path (without query parameters)
const groupedRedirects = data.reduce((acc, row) => {
  const source = cleanUrl(row['Top pages']);
  const destination = cleanDestination(row['Redirect to']);
  
  // Only add if we haven't seen this source path before
  if (!acc.some(r => r.source === source)) {
    acc.push({
      source,
      destination,
      permanent: true
    });
  }
  return acc;
}, []);

// Convert to the required format
const redirects = {
  redirects: groupedRedirects
};

// Write to redirects.json
const outputPath = path.join(__dirname, '../src/config/redirects.json');
fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2));

console.log(`Successfully converted ${redirects.redirects.length} redirects to JSON format!`); 