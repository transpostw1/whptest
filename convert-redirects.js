const fs = require('fs');

// Read the vercel.json file
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Create the new redirects array
const newRedirects = [];

// Process each redirect and preserve all entries
vercelConfig.forEach(redirect => {
    // Remove domain from source URL
    const sourceUrl = new URL(redirect.source);
    const sourcePath = sourceUrl.pathname + sourceUrl.search;
    
    // Remove domain from destination URL
    const destUrl = new URL(redirect.destination);
    const destPath = destUrl.pathname + destUrl.search;
    
    // Add to new redirects array
    newRedirects.push({ source: sourcePath, destination: destPath });
});

// Write the new format to a file
fs.writeFileSync(
    'middleware-redirects.json',
    JSON.stringify(newRedirects, null, 2)
);

console.log(`Conversion complete! Total redirects processed: ${vercelConfig.length}`);
console.log('Check middleware-redirects.json for the results.'); 