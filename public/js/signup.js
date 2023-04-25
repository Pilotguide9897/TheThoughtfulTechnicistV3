// Client-side logic to handle sign up form submission
const signUpHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && username && password) {
    try {
      const dataToSend = { email, username, password };

      const approval = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (approval.ok) {
        const responseData = await approval.json();
        console.log("Server response:", responseData);
        alert("You have successfully created a new account!");
        document.location.replace('/');
      } else {
        console.error("Error:", approval.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
};

const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", signUpHandler);
}

