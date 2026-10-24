const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");
const passwordInput = document.getElementById("password");
const strengthLabel = document.getElementById("strengthLabel");
const strengthFill = document.getElementById("strengthFill");

const fieldRules = {
    fullName: {
        errorId: "fullNameError",
        validate: value => {
            if (!value.trim()) return "Please enter your full name.";
            if (value.trim().length < 2) return "Name must contain at least 2 characters.";
            if (!/^[A-Za-z][A-Za-z .'-]*$/.test(value.trim())) {
                return "Use letters and normal name punctuation only.";
            }
            return "";
        }
    },
    email: {
        errorId: "emailError",
        validate: value => {
            if (!value.trim()) return "Please enter your email address.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
                return "Enter a valid email address, such as name@example.com.";
            }
            return "";
        }
    },
    mobile: {
        errorId: "mobileError",
        validate: value => {
            if (!value.trim()) return "Please enter your mobile number.";
            if (!/^[6-9]\d{9}$/.test(value.trim())) {
                return "Enter a valid 10-digit Indian mobile number.";
            }
            return "";
        }
    },
    course: {
        errorId: "courseError",
        validate: value => value ? "" : "Please select your course."
    },
    year: {
        errorId: "yearError",
        validate: value => value ? "" : "Please select your year of study."
    },
    password: {
        errorId: "passwordError",
        validate: value => {
            if (!value) return "Please create a password.";
            if (value.length < 8) return "Password must be at least 8 characters long.";
            if (!/[A-Z]/.test(value)) return "Add at least one uppercase letter.";
            if (!/[a-z]/.test(value)) return "Add at least one lowercase letter.";
            if (!/\d/.test(value)) return "Add at least one number.";
            if (!/[^A-Za-z0-9]/.test(value)) return "Add at least one symbol.";
            return "";
        }
    },
    confirmPassword: {
        errorId: "confirmPasswordError",
        validate: value => {
            if (!value) return "Please confirm your password.";
            if (value !== passwordInput.value) return "Passwords do not match.";
            return "";
        }
    }
};

function showError(field, message) {
    const errorElement = document.getElementById(fieldRules[field].errorId);
    const input = document.getElementById(field);

    errorElement.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateField(field) {
    const rule = fieldRules[field];
    const input = document.getElementById(field);
    const message = rule.validate(input.value);
    showError(field, message);
    return message === "";
}

function validateGender() {
    const selected = form.querySelector('input[name="gender"]:checked');
    const error = document.getElementById("genderError");
    error.textContent = selected ? "" : "Please select a gender option.";
    return Boolean(selected);
}

function validateTerms() {
    const terms = document.getElementById("terms");
    const error = document.getElementById("termsError");
    error.textContent = terms.checked ? "" : "Please confirm the information before submitting.";
    terms.setAttribute("aria-invalid", terms.checked ? "false" : "true");
    return terms.checked;
}

function updatePasswordStrength() {
    const password = passwordInput.value;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ["Not entered", "Very weak", "Weak", "Fair", "Good", "Strong"];
    const widths = ["0%", "20%", "40%", "60%", "80%", "100%"];
    const colors = ["#cbd3df", "#c2413a", "#d97706", "#ca8a04", "#39845a", "#187347"];

    strengthLabel.textContent = labels[password ? score : 0];
    strengthFill.style.width = widths[password ? score : 0];
    strengthFill.style.backgroundColor = colors[password ? score : 0];
}

Object.keys(fieldRules).forEach(field => {
    const input = document.getElementById(field);
    const eventName = input.tagName === "SELECT" ? "change" : "input";

    input.addEventListener(eventName, () => {
        validateField(field);

        if (field === "password") {
            updatePasswordStrength();
            if (document.getElementById("confirmPassword").value) {
                validateField("confirmPassword");
            }
        }

        formMessage.textContent = "";
        formMessage.className = "form-message";
    });

    input.addEventListener("blur", () => validateField(field));
});

form.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", validateGender);
});

document.getElementById("terms").addEventListener("change", validateTerms);

form.addEventListener("submit", event => {
    event.preventDefault();

    const results = Object.keys(fieldRules).map(validateField);
    results.push(validateGender());
    results.push(validateTerms());

    if (results.every(Boolean)) {
        formMessage.textContent = "Registration form validated successfully. No data has been sent to a server.";
        formMessage.className = "form-message success";
        formMessage.focus();
    } else {
        formMessage.textContent = "Please correct the highlighted fields and submit the form again.";
        formMessage.className = "form-message failure";
        formMessage.focus();

        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
    }
});

form.addEventListener("reset", () => {
    window.setTimeout(() => {
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
        });

        form.querySelectorAll('[aria-invalid="true"]').forEach(input => {
            input.setAttribute("aria-invalid", "false");
        });

        formMessage.textContent = "";
        formMessage.className = "form-message";
        strengthLabel.textContent = "Not entered";
        strengthFill.style.width = "0";
        strengthFill.style.backgroundColor = "#cbd3df";
    }, 0);
});
