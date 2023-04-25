console.log("javascript is running");
// Define the function before calling it
const postCommentHandler = async (content, generalPostId) => {
    console.log(content);
    console.log(generalPostId);
  try {
    const response = await fetch(`/api/posts/post/${generalPostId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentContent: content }),
    });

    if (response.ok) {
      window.location.href = `/post/${generalPostId}`;
    } else {
      console.error("Error submitting comment");
    }
  } catch (err) {
    console.error(err);
  }
};

// Get the post ID from the URL
const urlPath = window.location.pathname;
console.log(urlPath);
const generalPostId = urlPath.split("/")[2];

// Add an event listener for form submission
document.getElementById("comment-form")




const commentForm = document.getElementById("comment-form");


if (commentForm) {
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
const commentContent = document.getElementById("commentDataToAdd").value;

  // Call the postCommentHandler function with the necessary arguments
postCommentHandler(commentContent, generalPostId);
});
}


  

