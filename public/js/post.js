// Direct to Post
const travelToPost = async (interestedPostId) => {
  console.log("the click was registered");
  try {
    const response = await fetch(`/post/${interestedPostId}`, {
      method: "GET",
    });
    if (response.ok) {
      window.location.href = `/post/${interestedPostId}`;
    } else {
      console.error("Error navigating between pages");
    }
  } catch (err) {
    console.error(err);
  }
};

$(document).ready(function () {
  $(".homepage-viewIndividualPost").on("click", function () {
    console.log("clicked");
    const interestedPostId = $(this).closest(".post").data("post-id");
    console.log(interestedPostId);
    travelToPost(interestedPostId);
  });
});
