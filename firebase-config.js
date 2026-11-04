// Firebase web app of the shared project robinwiseapps-c4e9e. These are the
// settings of the "FaB Events Windows" web registration, which the Windows
// build of the app also uses. Web API keys are public identifiers; what the
// page may do is decided by the Firestore rules (firestore.rules).
export const firebaseConfig = {
  apiKey: 'AIzaSyAhAQGMXanNmL9VZBHq9OY1E2E87roAcBQ',
  authDomain: 'robinwiseapps-c4e9e.firebaseapp.com',
  projectId: 'robinwiseapps-c4e9e',
  appId: '1:979790589714:web:d9bbb5e3b2390acef44dcb',
};

// The Firestore collection the sign-ups go to. Changing it means changing
// the rules block too.
export const collectionName = 'fabEventsWaitlist';

// Where people can reach Robin about their entry.
export const contactEmail = 'robinwiseapps@gmail.com';
