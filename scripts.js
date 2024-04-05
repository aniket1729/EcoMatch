document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // You can add your login logic here, such as making AJAX requests to your backend
  // For simplicity, we'll just redirect to the index.html page

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
	  window.location.href = 'index.html';
      //window.location.href = '/protected';
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while logging in. Please try again later.');
  }    
});
