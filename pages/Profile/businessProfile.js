const business = JSON.parse(localStorage.getItem("userLogado"));

const businessName = document.querySelector("#business-name");
const Info = document.querySelector("#data-info");

businessName.innerHTML = business.businessName;
businessName.style.textTransform = "capitalize";

function createMenuItem(item) {
  if (item[0] !== "business" && "password" !== item[0]) {
    const li = document.createElement("li");
    li.innerHTML = item[1];
    Info.appendChild(li);
  }
}

if (business) {
  Object.entries(business).map((item) => {
    createMenuItem(item);
  });
}