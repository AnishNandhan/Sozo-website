fetch("Contact/contact.html")
  .then((res) => res.text())
  .then((text) => {
    let oldelem = document.querySelector("script#contact-section");
    let newelem = document.createElement("div");

    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);

    (function () {
      function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements)
          .filter(function (k) {
            if (elements[k].name === "honeypot") {
              honeypot = elements[k].value;
              return false;
            }
            return true;
          })
          .map(function (k) {
            if (elements[k].name !== undefined) {
              return elements[k].name;
            } else if (elements[k].length > 0) {
              return elements[k].item(0).name;
            }
          })
          .filter(function (item, pos, self) {
            return self.indexOf(item) == pos && item;
          });

        var formData = {};
        fields.forEach(function (name) {
          var element = elements[name];

          formData[name] = element.value;

          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(", ");
          }
        });

        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses";
        formData.formGoogleSendEmail = form.dataset.email || "";

        return { data: formData, honeypot: honeypot };
      }

      function handleFormSubmit(event) {
        event.preventDefault();
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        if (formData.honeypot) {
          return false;
        }

        disableAllButtons(form);

        fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        })
          .then((response) => response.json())
          .then((data) => {
            form.reset();
            enableAllButtons(form);
          })
          .catch((error) => {
            console.error("Error:", error);
            enableAllButtons(form);
          });
      }

      function loaded() {
        var forms = document.getElementById("contactForm");
        forms.addEventListener("submit", handleFormSubmit, false);
      }

      if (document.readyState !== "loading") {
        loaded();
      } else {
        document.addEventListener("DOMContentLoaded", loaded, false);
      }

      function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
        }
      }

      function enableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = false;
        }
      }
    })();
  });


  function submitForm() {
    // Show the thank you message immediately
    document.getElementById('contactForm').style.display = 'none';
    document.querySelector('.thankyou_message').style.display = 'block';
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



