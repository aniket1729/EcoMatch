// scripts.js
function sendOTP() {
    const email = document.getElementById('email').value;
    // Here you would send the email and generate an OTP
    // For simplicity, we'll assume the OTP is sent and the user needs to enter it
    document.getElementById('otpSection').style.display = 'block';
}

function validateOTP() {
    const otp = document.getElementById('otp').value;
    // Here you would validate the OTP
    // For simplicity, we'll assume the OTP is correct and redirect the user to the index page
    window.location.href = 'index.html';
}

function redirectToSignUp() {
    // Redirect the user to the sign-up page
    window.location.href = 'signup.html';
}
