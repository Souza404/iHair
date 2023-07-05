// GENERATE PASSWORD
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbols = () => {
  const symbols = "[]{}+=,<>:?/-_!@#$%&()";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const getFunctions = [
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbols,
];

generatePasswordButton.addEventListener("click", () => {
  generatedPasswordElement.style.display = "block";
  let password = "";
  let passwordLength = 10;

  for (let i = 0; i < passwordLength; i += 4) {
    getFunctions.forEach(() => {
      password +=
        getFunctions[Math.floor(Math.random() * getFunctions.length)]();
    });
  }
  password = password.slice(0, passwordLength);
  generatedPasswordElement.querySelector("h4").innerText = password;
});