// Client-side logic to manage travel to the edit post page and to handle the edit post form
 const viewPostButtons = document.querySelectorAll(
   ".dashboard-viewIndividualUserPost"
 );

 // Logic to get the id for each post
 viewPostButtons.forEach((button) => {
   button.addEventListener("click", (event) => {
    console.log("click");
     const userPostId = event.target.closest(".userPost").dataset.postId;
     console.log(userPostId);
     modifyPageHandler(userPostId);
   });
 });

const modifyPageHandler = async (userPostId) => {
  console.log("function registered too");
  try {
    const response = await fetch(`/edit/${userPostId}`, {
      method: "GET",
    });

    if (response.ok) {
      window.location.href = `/edit/${userPostId}`;
    }
  } catch (err) {
    console.error(err);
  }
};

// Edit your post
const editPostForm = document.getElementById("edit-post-form");
if (editPostForm) {
  editPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("update handler recognized");
    postEditHandler();
  });

  // Get the post ID from the URL
  const urlPath = window.location.pathname;
  console.log(urlPath);
  const currentPostId = urlPath.split("/")[2];
  console.log("Current Post ID:", currentPostId);

  const postEditHandler = async () => {
    console.log("postEditHandler called");

    try {

      const myPostTitle = document.getElementById("edit-title").value;
      const myPost_content = document.getElementById("edit-content").value;
      console.log("Current Post ID inside postEditHandler:", currentPostId);
      const response = await fetch(`/api/posts/update/${currentPostId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: myPostTitle,
          post_content: myPost_content,
        }),
      });

      if (response.ok) {
        console.log("Response is OK");
        alert("Updated post!");
        window.location.href = "/dashboard";
      } else {
        console.error("Error submitting comment");
        console.log("Response status:", response.status);
        console.log("Response text:", await response.text());
      }
    } catch (err) {
      console.error("Error in postEditHandler:", err);
    }
  };
};



