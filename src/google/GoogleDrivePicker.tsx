// import { useEffect, useState, useRef } from 'react';
// import useDrivePicker from 'react-google-drive-picker'
// import { gapi } from "gapi-script";

// const CLIENT_ID = "540152907319-n0047oq820mq5g16pmn0cd19j9vj7vqm.apps.googleusercontent.com"
// const API_KEY = "AIzaSyCatLFDBp2Fl75SNXKuJu5IfjrefMMtItk"
// const SECRET_KEY = "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"

// function GoogleDrivePicker() {
//   const [user, setUser] = useState(null);
//   const debugPainel = useRef("");
//   //const [openPicker, authResponse] = useDrivePicker();
//   useEffect(() => {
//     //Login when it's not logged when the page loads
//     gapi.load('client:auth2', () => {
//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         scope: 'https://www.googleapis.com/auth/drive.file'
//       })
//         .then(() => {
//           console.log("GAPI Initialized")

//           if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
//             gapi.auth2.getAuthInstance().signIn();
//           } else {
//             setUser({
//               'name': gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName(),
//               "email": gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()
//             })
//           }
//         })
//     })
//   }, [])

//   useEffect(() => {
//     if (user === null) return

//     gapi.client.load('drive', 'v3', () => { const folderName = 'movie_scripter_archives';

//     const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`;
  
//     gapi.client.drive.files.list({
//       q: query,
//         fields: 'files(id, name)',
//       }).then((response: { result: { files: any; }; }) => {
//         const folders = response.result.files;
//         if (folders && folders.length > 0) {
//           const folderId = folders[0].id; // Get the ID of the first folder found
//           // List files in the specified folder
//           const fileQuery = `'${folderId}' in parents`;
//           gapi.client.drive.files.list({
//             q: fileQuery,
//             fields: 'files(id, name)',
//           }).then((fileResponse: { result: { files: any; }; }) => {
//             const files = fileResponse.result.files;
//             if (files && files.length > 0) {
//               const fileId = files[0].id; // Get the ID of the first file found
//               // Read the contents of the file
//               gapi.client.drive.files.get({
//                 fileId: fileId,
//                 alt: 'media',
//               }).then((fileContentResponse: { body: any; }) => {
//                 console.log('File content:');
//                 console.log(fileContentResponse.body);
//               });
//             } else {
//               console.log('File not found in the folder.');
//             }
//           });
//         } else {
//           console.log('Folder not found.');
//         }
    
//       });
//     });
//   }, [user])
  
//   const handleLogout = () => {
//     gapi.auth2.getAuthInstance().signOut()
//       .then(() => {
//         console.log('User logged out successfully');
//       })
//       .catch((error: any) => {
//         console.log('Error logging out:', error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={() => handleLogout()}>Open Picker</button>
//       <p></p>
//     </div>
//   );
// }

// export default GoogleDrivePicker;