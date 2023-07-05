import { logout } from "../controller/UserController.js";

// localStorage
const token = localStorage.getItem("token");
const userLogado = localStorage.getItem("userLogado");

const logo = document.querySelector("#home");
const menuList = document.querySelector(".nav_menu");

// Navbar dinâmica
const baseUrl =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port +
  "/";

const menuItems = [
  { text: "Home", url: "index.html" },
  { text: "Sobre", url: "pages/About/about.html" },
  { text: "Entrar", url: "pages/Auth/login.html" },
  { text: "Cadastrar", url: "pages/Auth/register.html" },
  { text: "Business", url: "pages/Auth/registerBusiness.html" },
];

function createMenuItem(item) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = baseUrl + item.url;
  a.textContent = item.text;
  li.appendChild(a);
  return li;
}

const storedMenuItems = localStorage.getItem("menuItems");

logo.href = baseUrl + menuItems[0].url;

if (storedMenuItems) {
  const parsedMenuItems = JSON.parse(storedMenuItems);
  parsedMenuItems.forEach(function (item) {
    if (
      (token && item.text === "Entrar") ||
      (token && item.text === "Cadastrar") ||
      (token && item.text === "Business")
    )
      return;

    if (item.text === "Home")
      item.url = token ? "pages/Map/indexmapa.html" : "index.html";

    if (window.location.pathname !== "/" + item.url || item.text === "Home") {
      const menuItem = createMenuItem(item);
      menuList.appendChild(menuItem);
    }
  });
} else {
  menuItems.forEach(function (item) {
    const menuItem = createMenuItem(item);
    menuList.appendChild(menuItem);
  });

  localStorage.setItem("menuItems", JSON.stringify(menuItems));
}

// check if a token exists
if (token) {
  // set user profile
  let profile = {
    text: "Perfil",
  };

  profile.url = JSON.parse(userLogado).business
    ? "pages/Profile/businessProfile.html"
    : "pages/Profile/profile.html";

  // create and set logout and profile
  const logout = { text: "Sair", url: "#" };

  const logoutItem = createMenuItem(logout);
  const profileItem = createMenuItem(profile);

  logoutItem.setAttribute("id", "logoutMenu");

  // add to navbar
  menuList.appendChild(profileItem);
  menuList.appendChild(logoutItem);
}

// logout an user
const logoutMenu = document.getElementById("logoutMenu");
if (logoutMenu) logoutMenu.addEventListener("click", logout);

// responsive menu
const hamburguer = document.getElementById("hamburguer-menu");
const menu = document.querySelector(".nav_menu");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  menu.classList.toggle("active");
});