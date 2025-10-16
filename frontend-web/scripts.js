let isDarkMode = false;

// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }
});

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.getElementById("theme-icon").textContent = isDarkMode ? "🌙" : "☀️";
    
}

function isDarkModeEnabled() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Usage
if (isDarkModeEnabled()) {
    console.log("Dark mode is enabled on the user's device.");
    toggleTheme()
}

document.body.addEventListener('click', () => {
    document.body.style.transition = 'background-color 0.3s, color 0.3s'; // Apply transition
});

function showRegisterForm() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
    document.getElementById("form-title").textContent = "Register";
}

function showLoginForm() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("form-title").textContent = "Login";
}

function validateEmail() {
    const email = document.getElementById("register-email").value;
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = document.getElementById("register-email");
    const emailCheck = document.getElementById("email-check");
    
    // Check if the email matches the pattern
    if (emailPattern.test(email)) {
        // Valid email
        emailInput.style.borderColor = "green"; // Optional: Change border color to green for valid email
        emailCheck.style.display = "none";
    } else {
        // Invalid email
        emailInput.style.borderColor = "red"; // Optional: Change border color to red for invalid email
        emailCheck.style.display = "block";
    }

}

function validatePassword() {
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordCheck = document.getElementById("password-check");
    const passwordMatch = document.getElementById("password-match");
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById("confirm-password")

    // Check if password meets the length requirement
    if (password.length >= 8) {
        passwordCheck.textContent = "✔ Password must be at least 8 characters.";
        passwordCheck.classList.add("valid");
        passwordInput.style.borderColor = "green";
    } else  {
        passwordCheck.textContent = "✖ Password must be at least 8 characters.";
        passwordCheck.classList.remove("valid");
        passwordInput.style.borderColor = "red";
    }

    // Check if passwords match
    if ((password != confirmPassword) && password.length != 0) {
        passwordMatch.style.display = "block";
        confirmPasswordInput.style.borderColor = "red";
    } else if ((password == confirmPassword) && password.length != 0) {
        passwordMatch.style.display = "none";
        confirmPasswordInput.style.borderColor = "green"; }
    
}

function showPasswordCondition() {
    const passwordCheck = document.getElementById("password-check");
    passwordCheck.style.display = "block"; // Show password condition when user clicks
}

function hidePasswordCondition() {
    const password = document.getElementById("register-password").value;
    const passwordCheck = document.getElementById("password-check");

    // Only hide if the password condition is satisfied
    if (password.length >= 8) {
        passwordCheck.style.display = "none";
    }
}

// Function to show the popup dialog with a custom message
function showPopup(message) {
    // Set the message in the popup
    document.getElementById('popupMessage').textContent = message;

    // Show the popup
    document.getElementById('popupDialog').style.display = 'flex';
}

// Function to close the popup dialog
function closePopup() {
    // Hide the popup
    document.getElementById('popupDialog').style.display = 'none';
}

//Backend

const API_URL = "http://localhost:5000"; // Backend URL

// Handle user registration
async function handleRegister() {
    const fullName = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const phone = document.getElementById("register-phone").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Basic validation
    if (password !== confirmPassword) {
        showPopup("Passwords do not match!");
        return;
    }

    if (!email || !phone || !fullName || !password) {
        showPopup("Please fill in all the required fields.");
        return;
    }

    const data = {
        full_name: fullName,
        email: email,
        phone: phone,
        password: password,
    };

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {  // Only show success message if HTTP status is OK
            showPopup(result.message);
            if (result.status === "success") {
                showLoginForm(); // Show login form after successful registration
            }
        } else {
            showPopup(result.message);  // Show error message on failure
        }
    } catch (error) {
        console.error("Error:", error);
        showPopup("An error occurred while registering.");
    }
}

// Handle user login
async function handleLogin() {
    const identifier = document.getElementById("login-identifier").value;
    const password = document.getElementById("login-password").value;

    if (!identifier || !password) {
        showPopup("Please enter both email/phone and password.");
        return;
    }

    const data = {
        identifier: identifier,
        password: password,
    };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            showPopup(result.message);
            if (result.status === "success") {
                // Redirect or show logged-in UI
                // You can redirect using `window.location.href = 'your_dashboard_url';`
            }
        } else {
            showPopup(result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        showPopup("An error occurred while logging in.");
    }
}