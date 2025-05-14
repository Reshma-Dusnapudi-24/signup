const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;
    
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        showMessage(error.message, 'error');
      });
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;
    
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return db.collection('users').doc(userCredential.user.uid).set({
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        showMessage(error.message, 'error');
      });
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });
}

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is logged in
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
      userDisplay.textContent = user.email;
    }
    
    // If on login/signup page, redirect to dashboard
    if (window.location.pathname.includes('index.html')) {
      window.location.href = 'dashboard.html';
    }
  } else {
    // User is logged out
    // If on dashboard, redirect to login
    if (window.location.pathname.includes('dashboard.html')) {
      window.location.href = 'index.html';
    }
  }
});

// Show message to user
function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = type;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}