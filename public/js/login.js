// Client-side logic for travelling to login form
const travelToLoginPage = async () => {
    window.location.replace("/login");
}

// Client-side logic for managing login submission form
const logInHandler = async (event) => {
  console.log("logInHandler called");
  event.preventDefault();

const email = document.querySelector("#email-login").value.trim();
const password = document.querySelector("#password-login").value.trim();

if (email && password) {
    try {
      const dataToSend = { email, password };

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("You have successfully logged in!");
        console.log("Server response:", responseData);
        window.location.replace("/dashboard");
      } else {
        alert("Login unsuccessful. Please try your username and password again!");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  } else {
  alert("Please fill in both email and password.");
  }
};

const loginForm = document.querySelector(".login-form");
if (loginForm) {
  console.log("Attaching event listener to login form"); // Add this line
  loginForm.addEventListener("submit", logInHandler);
} else {
  console.log("Login form not found"); // Add this line to check if the form is not found
}


const loginRedirector = document.querySelector("#loginRedirectionLink");
if (loginRedirector) {
  loginRedirector.addEventListener('click', travelToLoginPage);
}



