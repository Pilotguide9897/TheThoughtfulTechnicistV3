// Delete your post

// Get the post ID from the URL
  const deleteUrlPath = window.location.pathname;
  console.log(deleteUrlPath);
  const deletePostId = urlPath.split("/")[2];
  console.log("Current Post ID:", deletePostId);

document.addEventListener("DOMContentLoaded", () => {
  const deletePostButton = document.getElementById("delete-post");

  if (deletePostButton) {
    deletePostButton.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("delete button clicked");

      if (confirm("Are you sure you want to delete this post?")) {
        try {
          const response = await fetch(`/api/posts/delete/${deletePostId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            window.location.href = "/dashboard";
            alert("Post deleted.");
          } else {
            console.error("Error deleting post");
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  }
});

