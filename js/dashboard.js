document.addEventListener('DOMContentLoaded', () => {
  const user = auth.currentUser;
  if (user) {
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userId').textContent = user.uid;
    
    db.collection('users').doc(user.uid).get()
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          document.getElementById('userSince').textContent = 
            userData.createdAt?.toDate().toLocaleDateString() || 'Recently';
        }
      });
  }
  
});