export const listaBusinesses = JSON.parse(
  localStorage.getItem("businesses") || "[]"
);

// register business
export const register = (Business) => {
  listaBusinesses.push(Business);
  localStorage.setItem("businesses", JSON.stringify(listaBusinesses));

  // login after register
  professinalLogin(Business);

  window.location.href = "../Profile/businessProfile.html";
};

// sign in
export const professinalLogin = ({ email, password }) => {
  listaBusinesses.forEach((business) => {
    // verify if business exists
    if (email === business.email && password === business.password) {
      window.location.href = "../Profile/businessProfile.html";

      let mathRandom = Math.random().toString(16).substring(2);
      let token = mathRandom + mathRandom;

      let businessValid = {
        business: true,
        businessName: business.businessName,
        owner: business.owner,
        phone: business.phone,
        email: business.email,
        password: business.password,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userLogado", JSON.stringify(businessValid));
      return true;
    }
  });
  return false;
};