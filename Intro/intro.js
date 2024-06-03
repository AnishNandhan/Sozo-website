fetch('Intro/intro.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#intro-section");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })

    function playVideo() {
        const playButton = document.querySelector(".play");
        const video = document.querySelector(".video-player");
        const videoContainer = document.querySelector(".video");
      
        videoContainer.classList.add("video-playing");
        video.play();
      
        video.addEventListener("pause", () => {
          videoContainer.classList.remove("video-playing");
        });
      }


function openModal() {
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("waitingListForm");

  if (modal && closeBtn && form) {
      modal.style.display = "flex";

      closeBtn.onclick = function() {
          modal.style.display = "none";
      }

      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }

      form.addEventListener("submit", (e) => {
        form.style.display = 'none';
        document.querySelector('.thankyou_message2').style.display = 'block';
        handleFormSubmit(e);
      })
  } else {
      console.error("One or more elements not found");
  }
}
