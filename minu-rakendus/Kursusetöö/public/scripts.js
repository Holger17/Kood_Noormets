document.addEventListener('DOMContentLoaded', () => {
    // ... (eelnev kood)
  
    const profileBtn = document.getElementById('profile-btn');
    const profileContent = document.getElementById('profile-content');
  
    profileBtn.addEventListener('click', () => {
      if (profileContent.style.display === 'none' || profileContent.style.display === '') {
        profileContent.style.display = 'block';
        profileBtn.classList.add('active-btn');
      } else {
        profileContent.style.display = 'none';
        profileBtn.classList.remove('active-btn');
      }
    });
  });
  