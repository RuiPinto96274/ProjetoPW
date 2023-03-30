const loginButtons = document.querySelectorAll('.login-button');
const loginForm = document.querySelector('.login');
const overlay = document.createElement('div');
overlay.classList.add('overlay');

loginButtons.forEach((button) => {
    console.log(button); // add this line
    button.addEventListener('click', () => {
      // Store the previous page URL in localStorage
      localStorage.setItem('previousPage', window.location.href);
      loginForm.classList.add('show');
      document.body.appendChild(overlay);
    });
  });

loginButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Store the previous page URL in localStorage
    localStorage.setItem('previousPage', window.location.href);
    loginForm.classList.add('show');
    document.body.appendChild(overlay);
  });
});

overlay.addEventListener('click', () => {
  loginForm.classList.remove('show');
  document.body.removeChild(overlay);
});

function closeLogin() {
  console.log(loginForm)
  const previousPage = localStorage.getItem('previousPage');
  if (previousPage) {
    window.location.href = previousPage;
  } else {
    loginForm.classList.remove('show');
  }
}

function handleSubmit(event) {
  event.preventDefault();
  // Handle login form submission
  // ...
  closeLogin();
}