const user = JSON.parse(localStorage.getItem("userLogado"));

const userName = document.querySelector("#user-name");
const Info = document.querySelector("#data-info");
const schedule = document.querySelector("#schedule");

userName.innerHTML = user.userName;

function createMenuItem(item) {
  if (item[0] !== "agendamento" && "password" !== item[0]) {
    const li = document.createElement("li");
    li.innerHTML = item[1];
    Info.appendChild(li);
  }
}

if (user) {
  Object.entries(user).map((item) => {
    createMenuItem(item);
    if (item[0] === "agendamento") {
      let scheduleInfo = item[1];

      scheduleInfo.forEach((agendamento) => {
        let scheduleItem = document.createElement("div");
        scheduleItem.classList.add("card-schedule");
        scheduleItem.innerHTML = `<img
            src="https://pr1.nicelocal.br.com/YoKPiZwylDtuVFk3uCNPDw/1120x700,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2QYkiWeIAncsFbLqtQTMnFnysiiY6kewLg4frxksdyCr7s-wzMoqL-tn1-q_71Ry9w"
          />
          <h4>${agendamento.businessName ? agendamento.businessName : ""}</h4>
          <div id="info">
            <h5>${
              agendamento.servico ? agendamento.servico : "Não preenchido"
            }</h5>
            <p>${
              agendamento.horario ? agendamento.horario : "Não preenchido"
            }</p>
          </div>
          <button class="button__icon "><i class="fa-regular fa-x cancel"></i></button>`;
        schedule.appendChild(scheduleItem);
      });
    }
  });
}

if (!user.agendamento || user.agendamento.length === 0) {
  const empty = document.createElement("p");
  empty.innerHTML = "Sua agenda está vazia!";
  schedule.appendChild(empty);
}

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  if (targetEl.classList.contains("cancel")) {
    const nameofbusiness = parentEl.querySelector("h4").textContent;

    const userFiltered = user.agendamento.filter((agenda) => {
      return nameofbusiness !== agenda.businessName;
    });

    user.agendamento = userFiltered;
    parentEl.remove();
  }
  localStorage.setItem("userLogado", JSON.stringify(user));
  location.reload();
});