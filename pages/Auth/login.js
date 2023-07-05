import { login } from "../../controller/UserController.js";
import { professinalLogin } from "../../controller/BusinessContoller.js";

const loginSection = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

let error;

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value === "" || password.value === "") {
    console.log("Preencha todos os campos.");
    return;
  }

  const User = {
    email: email.value,
    password: password.value,
  };

  if (!login(User) && !professinalLogin(User)) {
    password.value = "";
    email.value = "";
    email.focus();

    error = document.createElement("p");
    error.classList.add("error");
    error.innerHTML = "Usuário não encontrado";

    loginSection.appendChild(error);
  }

  setTimeout(() => {
    error.remove();
  }, 4000);
});