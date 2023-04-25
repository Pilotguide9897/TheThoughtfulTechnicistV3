// Client-side logic to manage travel to the create page and to handle the create post form
const renderNewPostPage = function () {
    window.location.replace("/new");
};

const createPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const post_content = document.querySelector("#post-content").value.trim();

  if (title && post_content) {
    try {
      const dataToSend = { title, post_content };

      const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("You have successfully created a new post!");
        console.log("Server response:", responseData);
        window.location.replace("/dashboard");
      } else {
        alert("Post unsuccessful. Please try again!");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  } else {
    alert("Please try reloading the page.");
  }
};

const createPostForm = document.querySelector("#create-post-form");
if (createPostForm) {
  createPostForm.addEventListener("submit", createPostHandler);
}

const dashboardCreatePostBtn = document.querySelector("#dashboard-createPost");
if (dashboardCreatePostBtn) {
  dashboardCreatePostBtn.addEventListener("click", renderNewPostPage);
}

