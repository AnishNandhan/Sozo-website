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


// Waiting list modal
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

      form.onsubmit = function(event) {
          event.preventDefault();
          // Add your form submission logic here
          alert("Form submitted!");
          modal.style.display = "none";
      }
  } else {
      console.error("One or more elements not found");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const openModalBtn = document.getElementById("openModalBtn");
  if (openModalBtn) {
      openModalBtn.onclick = openModal;
  }
});


      
