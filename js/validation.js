const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('form'); // Ensure correct reference to the signup form

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateSignupInputs();
    });
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateSignupInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let errors = [];

    if (usernameValue === '') {
        setError(username, 'Name is required');
        errors.push('Name is required');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        errors.push('Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        errors.push('Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        errors.push('Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
        errors.push('Password must be at least 8 characters');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        errors.push('Please confirm your password');
    } else if (passwordValue !== password2Value) {
        setError(password2, 'Passwords do not match');
        errors.push('Passwords do not match');
    } else {
        setSuccess(password2);
    }

    if (errors.length === 0) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = {
            username: usernameValue,
            email: emailValue,
            password: passwordValue,
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Redirecting to login page...');
        window.location.href = 'login.html';
    }
};


