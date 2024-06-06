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
    formData.formGoogleSheetName = form.dataset.sheet || form.id;
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