const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

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

// Function to process a single XLSX file
const processXlsxFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    const redirectsMap = new Map();
    
    data.forEach(row => {
      if (!row['Top pages'] || !row['Redirect to']) {
        console.warn(`Skipping invalid row in ${filePath}:`, row);
        return;
      }
      const source = cleanSource(row['Top pages']);
      const destination = cleanDestination(row['Redirect to']);
      
      // Add to map only if source is not already present
      if (!redirectsMap.has(source)) {
        redirectsMap.set(source, { source, destination, permanent: true });
      }
    });
    
    // Debug: Print the first 5 source URLs from this file
    const sources = Array.from(redirectsMap.keys());
    console.log(`First 5 source URLs from ${filePath}:`);
    sources.slice(0, 5).forEach(source => console.log(source));
    
    return Array.from(redirectsMap.values());
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return [];
  }
};

// Function to process all XLSX files in a directory
const processAllXlsxFiles = (directory) => {
  const files = fs.readdirSync(directory);
  const xlsxFiles = files.filter(file => file.endsWith('.xlsx'));
  
  let allRedirects = [];
  let totalRedirects = 0;
  
  xlsxFiles.forEach(file => {
    const filePath = path.join(directory, file);
    console.log(`Processing ${file}...`);
    const redirects = processXlsxFile(filePath);
    totalRedirects += redirects.length;
    allRedirects = allRedirects.concat(redirects);
    console.log(`Found ${redirects.length} redirects in ${file}`);
  });
  
  console.log(`Total redirects found across all files: ${totalRedirects}`);
  return allRedirects;
};

// Read existing vercel.json
const vercelConfigPath = path.join(__dirname, '../vercel.json');
let vercelConfig = {};
if (fs.existsSync(vercelConfigPath)) {
  try {
    vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  } catch (e) {
    console.error('Error reading or parsing vercel.json:', e);
    process.exit(1);
  }
}

// Ensure redirects array exists
if (!vercelConfig.redirects) {
  vercelConfig.redirects = [];
}

// Process all XLSX files in the XLSX directory
const xlsxDirectory = path.join(__dirname, 'XLSX');
const generatedRedirects = processAllXlsxFiles(xlsxDirectory);

// Create a set of source paths from manual redirects for easy lookup
const manualSources = new Set(vercelConfig.redirects.map(r => r.source));

// Add generated redirects only if their source is not in manual redirects
let newRedirectsCount = 0;
generatedRedirects.forEach(redirect => {
  if (!manualSources.has(redirect.source)) {
    vercelConfig.redirects.push(redirect);
    newRedirectsCount++;
  }
});

// Write updated vercel.json
fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));

console.log(`Successfully updated vercel.json with ${newRedirectsCount} new redirects from all Excel files.`);
console.log(`Total redirects in vercel.json: ${vercelConfig.redirects.length}`); 