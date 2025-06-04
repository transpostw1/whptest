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
  
  // Add to map only if source is not already present
  if (!redirectsMap.has(source)) {
    redirectsMap.set(source, { source, destination, permanent: true });
  }
});

// Convert map values to an array
const generatedRedirects = Array.from(redirectsMap.values());

// Read existing vercel.json
const vercelConfigPath = path.join(__dirname, '../vercel.json');
let vercelConfig = {};
if (fs.existsSync(vercelConfigPath)) {
  try {
    vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  } catch (e) {
    console.error('Error reading or parsing vercel.json:', e);
    process.exit(1); // Exit if vercel.json is invalid
  }
}

// Ensure redirects array exists
if (!vercelConfig.redirects) {
  vercelConfig.redirects = [];
}

// Combine existing manual redirects with generated redirects, prioritizing manual ones
// Create a set of source paths from manual redirects for easy lookup
const manualSources = new Set(vercelConfig.redirects.map(r => r.source));

// Add generated redirects only if their source is not in manual redirects
generatedRedirects.forEach(redirect => {
  if (!manualSources.has(redirect.source)) {
    vercelConfig.redirects.push(redirect);
  }
});

// Write updated vercel.json
fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));

console.log(`Successfully updated vercel.json with ${generatedRedirects.length} redirects from Excel.`); 