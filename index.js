const express = require('express');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const app = express();
const port = 3000;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCax0qPA_VoNcjDexYMv9gJfcrza7VVoDM",
  authDomain: "authentication-app-fae03.firebaseapp.com",
  projectId: "authentication-app-fae03",
  storageBucket: "authentication-app-fae03.appspot.com",
  messagingSenderId: "498700669163",
  appId: "1:498700669163:web:a2b3d7e7efec491b092eae"

};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/signin.ejs', (req, res) => {
  res.render('signin');
});

app.get('/signup.ejs', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  const { email, password, fname, lname } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);
    res.redirect('/signin');
  } catch (error) {
    console.error('Error signing up:', error);
    res.send('Error signing up');
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
    // Redirect to home page or dashboard
    res.send('User signed in');
  } catch (error) {
    console.error('Error signing in:', error);
    res.send('Error signing in');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
