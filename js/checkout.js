// Exercise 6
function validate(event) {
  // Get the input fields
  let fName = document.getElementById("fName");
  let fPhone = document.getElementById("fPhone");
  let fPassword = document.getElementById("fPassword");
  let fEmail = document.getElementById("fEmail");

  // Get the error elements
  let errorName = document.getElementById("errorName");
  let errorPhone = document.getElementById("errorPhone");
  let errorPassword = document.getElementById("errorPassword");
  let errorEmail = document.getElementById("errorEmail");

  // Remove white sapce
  let fNameTrim = fName.value.trim();
  let fPhoneTrim = fPhone.value.trim();
  let fPasswordTrim = fPassword.value.trim();
  let fEmailTrim = fEmail.value.trim();

  //Regex
  let nameRegex = /^[A-Za-z]+$/;
  let phoneRegex = /^\d+$/;
  let passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  // Validate fields entered by the user: name, phone, password, and email
  if (fNameTrim.length < 3 || !nameRegex.test(fNameTrim)) {
    errorName.style.display = "block";
    fName.classList.add("is-invalid");
    isValid = false;
  } else {
    errorName.style.display = "none";
    fName.classList.remove("is-invalid");
  }

  if (fPhoneTrim.length < 9 || !phoneRegex.test(fPhoneTrim)) {
    errorPhone.style.display = "block";
    fPhone.classList.add("is-invalid");
    isValid = false;
  } else {
    errorPhone.style.display = "none";
    fPhone.classList.remove("is-invalid");
  }

  if (fPasswordTrim.length < 3 || !passwordRegex.test(fPasswordTrim)) {
    errorPassword.style.display = "block";
    fPassword.classList.add("is-invalid");
    isValid = false;
  } else {
    errorPassword.style.display = "none";
    fPassword.classList.remove("is-invalid");
  }

  if (fEmailTrim.length < 3 || !emailRegex.test(fEmailTrim)) {
    errorEmail.style.display = "block";
    fEmail.classList.add("is-invalid");
    isValid = false;
  } else {
    errorEmail.style.display = "none";
    fEmail.classList.remove("is-invalid");
  }
  if (!isValid) {
    event.preventDefault();
    event.stopPropagation();
  }
}

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "btn") {
    validate(event);
  }
});
