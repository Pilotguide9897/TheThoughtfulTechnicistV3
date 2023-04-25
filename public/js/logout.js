// Client-side logic for logging out
const logOutHandler = async () => {
  try {
    const attempt = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (attempt.ok) {
      alert("You have been logged out!");
      document.location.redirect = "/";
    } else {
      alert(attempt.statusText);
    }
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

document.getElementById("logout").addEventListener("click", logOutHandler);