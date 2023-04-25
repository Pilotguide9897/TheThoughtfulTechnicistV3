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
  postEditHandler
});


const myPostTitle = document.getElementById("edit-title").value;
const myPost_content = document.getElementById("edit-content").value;

const postEditHandler = async () => {
  console.log("postEditHandler called");
  myPostId = req.params.id

     try {
    const response = await fetch(`/api/post/update/${userPostId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ myPostTitle, myPost_content }),
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      console.error("Error submitting comment");
    }
  } catch (err) {
    console.error(err);
  }
};
};



