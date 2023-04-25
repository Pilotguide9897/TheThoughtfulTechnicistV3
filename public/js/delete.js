// Delete your post
document.addEventListener("DOMContentLoaded", () => {
  const deletePostButton = document.getElementById("delete-post");

  if (deletePostButton) {
    deletePostButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const userPostId = event.target.closest(".edit-post-form").dataset.postId;

      if (confirm("Are you sure you want to delete this post?")) {
        try {
          const response = await fetch(`/api/post/delete/${userPostId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            window.location.href = "/dashboard";
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

