// Client-side logic for logging out
const logOutHandlerF = async () => {
  try {
    const attempt = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (attempt.ok) {
      document.location.redirect = "/";
    } else {
      alert(attempt.statusText);
    }
  } catch (err) {
    console.error("Logout Error:", err);
  }
};

const logoutLink = document.getElementById("logout");
if (logoutLink) {
  logoutLink.addEventListener("click", logOutHandlerF);
}
