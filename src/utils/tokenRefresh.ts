// import { auth } from "@/app/config";

// // Function to retrieve ID token from Firebase Authentication
// const getIdToken = async () => {
//   try {
//     const user = auth.currentUser;
//     if (user) {
//       const idToken = await user.getIdToken();
//       return idToken;
//     } else {
//       return null; // User not authenticated
//     }
//   } catch (error) {
//     console.error("Error retrieving ID token:", error);
//     return null;
//   }
// };

// // Function to check authentication state and retrieve ID token
// export const checkAuthentication = async () => {
//   try {
//     const idToken = await getIdToken();
//     if (idToken) {
//       // User authenticated, use the ID token
//       console.log("ID Token:", idToken);
//       // Set user authentication state or perform authenticated actions
//     } else {
//       console.log("User not authenticated");
//       // Handle case where user is not authenticated
//     }
//   } catch (error) {
//     console.error("Error checking authentication state:", error);
//     // Handle error
//   }
// };



