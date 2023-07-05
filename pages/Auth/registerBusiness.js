// REGISTER USER INFORMATION
import { register } from "../../controller/BusinessContoller.js";

const registerSection = document.getElementById("registerBusiness");
const businessName = document.getElementById("name");
const owner = document.getElementById("ownerName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submit = document.getElementById("submit");

function clearInputs() {
  businessName.value = "";
  owner.value = "";
  phone.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}

function setError(error) {
  let message = document.createElement("p");
  message.classList.add("error");
  message.innerHTML = error;
  registerSection.appendChild(message);
  setTimeout(() => {
    message.remove();
  }, 4000);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let listaBusinesses = JSON.parse(localStorage.getItem("businesses") || "[]");
  let listaUser = JSON.parse(localStorage.getItem("users") || "[]");
  let error = "";

  if (
    businessName.value === "" ||
    owner.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === "" ||
    phone.value === ""
  ) {
    error = "Preencha todos os campos.";
  }

  // verify password
  if (password.value !== confirmPassword.value) {
    error = "As senhas precisam ser iguais.";
  }

  // verify if business or user exists
  listaBusinesses.forEach((business) => {
    if (email.value === business.email) {
      error = "Este e-mail já está sendo utilizado.";
      return;
    }
  });
  listaUser.forEach((user) => {
    if (email.value === user.email) {
      error = "Este e-mail já está sendo utilizado.";
      return;
    }
  });

  if (error.length !== 0) {
    setError(error);
    return;
  }

  const Business = {
    businessName: businessName.value,
    owner: owner.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
  };

  register(Business);
  clearInputs();
});