fetch("Contact/contact.html")
  .then((res) => res.text())
  .then((text) => {
    let oldelem = document.querySelector("script#contact-section");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);    

    let form = document.getElementById("contactForm")
    form.addEventListener("submit", (e) => {
      form.style.display = 'none';
      document.querySelector('.thankyou_message').style.display = 'block';
      handleFormSubmit(e);
    })
  });
  
  function toggleShowMore() {
    const hiddenQuestions = document.querySelectorAll('.hidden');
    const showMoreBtn = document.getElementById('showMoreBtn');
  
    hiddenQuestions.forEach(question => {
      if (question.style.display === "none" || question.style.display === "") {
        question.style.display = "block";
        showMoreBtn.textContent = "Show Less";
      } else {
        question.style.display = "none";
        showMoreBtn.textContent = "Show More";
      }
    });
  }

function toggleAnswerVisibility(parent) {
  const answer = parent.querySelector(".answer");
  if (answer.style.height === "0px" || answer.style.height === "") {
    answer.style.height = "auto";
  } else {
    answer.style.height = "0px";
  }
}

function toggleQuestion(questionElement) {
  questionElement.classList.toggle("open");
}
