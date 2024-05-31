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
      