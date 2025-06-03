const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = xlsx.readFile('redirects.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

// Function to clean source URL (strip domain and query parameters)
const cleanSource = (url) => {
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

// Function to clean destination URL (strip domain but keep query parameters)
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

// Group redirects by their cleaned source path, keeping the destination of the first occurrence
const redirectsMap = new Map();

data.forEach(row => {
  const source = cleanSource(row['Top pages']);
  const destination = cleanDestination(row['Redirect to']);
  
  if (!redirectsMap.has(source)) {
    redirectsMap.set(source, { source, destination, permanent: true });
  }
});

// Convert map values to an array
const groupedRedirects = Array.from(redirectsMap.values());

// Convert to the required format
const redirects = {
  redirects: groupedRedirects
};

// Write to redirects.json
const outputPath = path.join(__dirname, '../src/config/redirects.json');
fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2));

console.log(`Successfully converted ${redirects.redirects.length} redirects to JSON format!`); 