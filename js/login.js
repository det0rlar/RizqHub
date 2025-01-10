document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const loginErrorMessage = document.getElementById("login-error-message");

    // Local storage for user data
    const getUsersFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem("users")) || [];
    };

    const saveUserToLocalStorage = (user) => {
        const users = getUsersFromLocalStorage();
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    };

    // Helper function to display error messages
    const showError = (input, message) => {
        const errorDiv = input.nextElementSibling;
        errorDiv.textContent = message;
        errorDiv.style.color = "red";
    };

    // Helper function to clear error messages
    const clearError = (input) => {
        const errorDiv = input.nextElementSibling;
        errorDiv.textContent = "";
    };

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Check if the user exists in local storage
    const findUser = (email, password) => {
        const users = getUsersFromLocalStorage();
        return users.find(
            (user) => user.email === email && user.password === password
        );
    };

    // Check if the email is already registered
    const isExistingUser = (email) => {
        const users = getUsersFromLocalStorage();
        return users.some((user) => user.email === email);
    };

    // Form submit event listener
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate email
        if (email === "") {
            showError(emailInput, "Email is required.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validate password
        if (password === "") {
            showError(passwordInput, "Password is required.");
            isValid = false;
        } else if (password.length < 8) {
            showError(passwordInput, "Password must be at least 8 characters long.");
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        // Process login
        if (isValid) {
            const user = findUser(email, password);

            if (user) {
                loginErrorMessage.textContent = "";
                alert("Welcome back, " + email + "!");
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "panel.html"; // Redirect for existing users
            } else if (isExistingUser(email)) {
                loginErrorMessage.textContent = "Incorrect password. Please try again.";
                loginErrorMessage.style.color = "red";
            } else {
                loginErrorMessage.textContent = "Email not registered. Please sign up.";
                loginErrorMessage.style.color = "red";
            }
        } else {
            loginErrorMessage.textContent = "Please fix the errors above.";
            loginErrorMessage.style.color = "red";
        }
    });
});
