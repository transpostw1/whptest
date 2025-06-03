// const xlsx = require('xlsx');
// const fs = require('fs');
// const path = require('path');
// // const { URL } = require('url'); // No longer strictly needed for parsing source path

// // Read the Excel file
// const workbook = xlsx.readFile('redirects.xlsx'); // Replace with your Excel file name
// const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// const data = xlsx.utils.sheet_to_json(worksheet);

// // Convert to the required format
// const redirects = {
//   redirects: data.map(row => {
//     let sourceUrl = row['Top pages']; // Get the full URL from Excel
//     let destinationUrl = row['Redirect to']; // Get the full URL from Excel
    
//     // Log the original source URL from Excel
//     console.log(`Original Source URL: ${sourceUrl}`);

//     let sourcePath = '';
    
//     // Ensure sourceUrl is a string
//     if (typeof sourceUrl !== 'string') {
//         console.error(`Invalid source URL type in Excel: ${sourceUrl}`);
//         return null; // Skip this row if the source is not a string
//     }

//     try {
//       // Explicitly find the first occurrence of ? or # and take the substring before it
//       const queryStringIndex = sourceUrl.indexOf('?');
//       const hashIndex = sourceUrl.indexOf('#');
      
//       let endIndex = sourceUrl.length;
//       if (queryStringIndex !== -1 && (hashIndex === -1 || queryStringIndex < hashIndex)) {
//           endIndex = queryStringIndex;
//       } else if (hashIndex !== -1) {
//           endIndex = hashIndex;
//       }

//       // Get the path part before ? or #
//       sourcePath = sourceUrl.substring(0, endIndex);
      
//       // If the source URL was a full URL (like https://...), extract just the path part
//       try {
//           const parsedUrl = new URL(sourcePath); // Attempt to parse just the path part
//           sourcePath = parsedUrl.pathname; // Get the pathname
//       } catch (e) {
//           // If parsing as a URL fails, assume it was already just a path
//           // console.log(`Source path not a full URL, using as is: ${sourcePath}`);
//       }

//     } catch (e) {
//       console.error(`Error processing source URL: ${sourceUrl}`, e);
//       return null; // Skip this row if processing fails
//     }

//     // Next.js redirect source patterns must start with a /, ensure this
//     if (!sourcePath.startsWith('/')) {
//         sourcePath = '/' + sourcePath;
//     }

//     // Log the extracted source path before adding to JSON
//     console.log(`Extracted Source Path: ${sourcePath}`);

//     // Destination can be a full URL or a path, so keep it as is from the Excel or convert if needed
//     // Assuming destination can be a full URL or path based on your sample
//     let finalDestination = destinationUrl;
//     // If destination is also a full URL and you only want the path, uncomment below:
//     /*
//     let finalDestination = '';
//     try {
//       const parsedDestUrl = new URL(destinationUrl);
//       finalDestination = parsedDestUrl.pathname + parsedDestUrl.search + parsedDestUrl.hash;
//     } catch (e) {\n       console.error(`Invalid destination URL in Excel: ${destinationUrl}`, e);
//        return null; // Skip this row if destination URL is invalid
//     }
//     */

//     return {
//       source: sourcePath, // Use the extracted pathname
//       destination: finalDestination, // Use the destination as is from Excel
//       permanent: true
//     };
//   }).filter(Boolean) // Filter out any null entries from invalid URLs
// };

// // Write to redirects.json
// const outputPath = path.join(__dirname, '../src/config/redirects.json');
// fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2));

// console.log(`Successfully converted ${redirects.redirects.length} redirects to JSON format!`); 