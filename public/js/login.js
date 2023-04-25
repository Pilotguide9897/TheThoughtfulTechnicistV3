// Client-side logic for managing login submission form
const logInHandler = async (event) => {
  event.preventDefault();

const email = document.querySelector("#email-login").value.trim();
const password = document.querySelector("#password-login").value.trim();

if (email && password) {
    try {
      const dataToSend = { email, password };

      const response = await fetch("/login", {
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

document.querySelector(".login-form").addEventListener("submit", logInHandler);