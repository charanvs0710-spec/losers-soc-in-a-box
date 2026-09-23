const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;

        const errorMessage =
            document.getElementById("errorMessage");

        if (username === "admin" && password === "admin123") {

            window.location.href = "dashboard.html";

        } else {

            errorMessage.textContent =
                "Invalid username or password.";

        }

    });

}
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    const passwordInput =
        document.getElementById("registerPassword");

    const strengthText =
        document.getElementById("passwordStrength");

    passwordInput.addEventListener("input", function () {

        const password = passwordInput.value;

        if (password.length === 0) {

            strengthText.textContent =
                "Password strength: -";

        } else if (password.length < 6) {

            strengthText.textContent =
                "Password strength: Weak";

        } else if (password.length < 10) {

            strengthText.textContent =
                "Password strength: Medium";

        } else {

            strengthText.textContent =
                "Password strength: Strong";

        }

    });

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document.getElementById("registerUsername").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            return;
        }

        message.textContent =
            "Demo registration successful. Backend registration will be connected later.";

    });

}