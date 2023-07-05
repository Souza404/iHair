let listaUser = JSON.parse(localStorage.getItem("users") || "[]");

// register user
export const register = (User) => {
  listaUser.push(User);
  localStorage.setItem("users", JSON.stringify(listaUser));

  // login after register
  login(User);

  window.location.href = "../Profile/profile.html";
};

// sign in
export const login = ({ email, password }) => {
  listaUser.forEach((user) => {
    // verify if user exists
    if (email === user.email && password === user.password) {
      window.location.href = "../Profile/profile.html";

      let mathRandom = Math.random().toString(16).substring(2);
      let token = mathRandom + mathRandom;

      let userValid = {
        userName: user.userName,
        email: user.email,
        password: user.password,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userLogado", JSON.stringify(userValid));
      return true;
    }
  });
  return false;
};

export const logout = () => {
  localStorage.removeItem("userLogado");
  localStorage.removeItem("token");
  window.location.href = "../pages/Auth/login.html";
};