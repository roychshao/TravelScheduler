# TravelScheduler
---
### To run the project:
**clone the repo**
```
git clone git@github.com:roychshao/TravelScheduler.git
```
**create .env file in /backend like**
```properties
PORT=3000
SECRET=***

DB_HOST="localhost"
DB_USER="root"
DB_PWD="root"
DB_PORT=3306
DB_DATABASE"TravelScheduler
```

**run backend**
```
pnpm install
pnpm start
```

**create .env.local in /frontend like**
```properties
VITE_HOST_URL="http://localhost:3000/"
```

**create firebase.js in /frontend/src like**
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: *****,
  authDomain: *****,
  projectId: *****,
  storageBucket: *****,
  messagingSenderId: *****,
  appId: *****
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provide = new GoogleAuthProvider();
```

**run frontend**
```
pnpm install
pnpm run dev
```
**then open localhost:3000 in the browser**
