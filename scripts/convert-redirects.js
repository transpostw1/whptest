const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { URL } = require('url'); // Import URL module

// Read the Excel file
const workbook = xlsx.readFile('redirects.xlsx'); // Replace with your Excel file name
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

// Convert to the required format
const redirects = {
  redirects: data.map(row => {
    let sourceUrl = row['Top pages']; // Get the full URL from Excel
    let destinationUrl = row['Redirect to']; // Get the full URL from Excel
    
    let sourcePath = '';
    try {
      // Extract only the pathname from the source URL, exclude search and hash
      const parsedUrl = new URL(sourceUrl);
      sourcePath = parsedUrl.pathname;
    } catch (e) {
      console.error(`Invalid source URL in Excel: ${sourceUrl}`, e);
      // Handle invalid URLs, maybe skip or log an error
      return null; // Skip this row if the URL is invalid
    }

    // Destination can be a full URL or a path, so keep it as is from the Excel or convert if needed
    // Assuming destination can be a full URL or path based on your sample
    let finalDestination = destinationUrl;
    // If destination is also a full URL and you only want the path, uncomment below:
    /*
    let finalDestination = '';
    try {
      const parsedDestUrl = new URL(destinationUrl);
      finalDestination = parsedDestUrl.pathname + parsedDestUrl.search + parsedDestUrl.hash;
    } catch (e) {
       console.error(`Invalid destination URL in Excel: ${destinationUrl}`, e);
       return null; // Skip this row if destination URL is invalid
    }
    */

    // Next.js redirect source patterns must start with a /, ensure this
    if (!sourcePath.startsWith('/')) {
        sourcePath = '/' + sourcePath;
    }

    return {
      source: sourcePath, // Use the extracted pathname
      destination: finalDestination, // Use the destination as is from Excel
      permanent: true
    };
  }).filter(Boolean) // Filter out any null entries from invalid URLs
};

// Write to redirects.json
const outputPath = path.join(__dirname, '../src/config/redirects.json');
fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2));

console.log(`Successfully converted ${redirects.redirects.length} redirects to JSON format!`); 