var dictServices = {};
let infowindow;

const labels = "B";
let labelIndex = 0;

function initMap() {
  const brunoBrito = { lat: -19.970599260087308, lng: -44.197966503292555 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: brunoBrito,
  });

  const contentString =
    //id dos botoes:
    //servico: servicoCorte, servicoBarba, servicoCorteBarba
    //horario: option1, option2,option3
    //agendar: btnAgendar
    "<div style='float:left;'><img src='https://pr1.nicelocal.br.com/YoKPiZwylDtuVFk3uCNPDw/1120x700,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2QYkiWeIAncsFbLqtQTMnFnysiiY6kewLg4frxksdyCr7s-wzMoqL-tn1-q_71Ry9w'class='mt-3' id='imagemCard'></div><div style='float:right; padding: 10px;'><h6><b>BRUNO BRITO BARBERSHOP</b></h6><br/>Av. Juscelino Kubitschek,417-Centro,Betim-MG<br/> <br> <b>Servicos:</b><br><div class='btn-group btn-group-justified' data-toggle='buttons'><label class='btn active' style='background-color:#D9D9D9; margin-right:5px;' id='servicoCorte' ><input type='checkbox' autocomplete='off' checked >Corte</label><label class='btn' style='background-color:#D9D9D9; margin-right:5px;' id='servicoBarba'><input type='checkbox' autocomplete='off' >Barba</label><label class='btn' style='background-color:#D9D9D9; margin-right:5px;' id='servicoCorteBarba'><input type='checkbox' autocomplete'off'>Barba + Corte</label></div><br><br><b>Horarios:</b><br><div class='btn-group btn-group-justified' data-toggle='buttons'><label class='btn' style='background-color:#D9D9D9; margin-right:5px;' id='option1'><input type='radio' name='options' autocomplete='off' >13:00-13:30</label><label class='btn' style='background-color:#D9D9D9; margin-right:5px;' id='option2'><input type='radio' name='options' autocomplete='off'>13:40-14:10</label><label class='btn' style='background-color:#D9D9D9; margin-right:5px; ' id='option3'><input type='radio' name='options'  autocomplete='off'>17:00-17:40</label></div><br><input onclick='isClickAgendar()' id='btnAgendar' class='btn mt-2' type='submit' value='Agendar' style='color:white; background-color:#6C6C6C; margin-right:5px;'></div>";

  infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "brunoBrito",
    maxWidth: 1800,
  });
  const marker = new google.maps.Marker({
    position: brunoBrito,
    title: "brunoBrito",
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
}

window.initMap = initMap;

function getServiceValue() {
  var isActive1 = $("#servicoCorte").hasClass("active");
  var isActive2 = $("#servicoBarba").hasClass("active");
  var isActive3 = $("#servicoCorteBarba").hasClass("active");

  if (isActive1 === true) {
    dictServices.servico = "Corte";
  }
  if (isActive2 === true) {
    dictServices.servico = "Barba";
  }
  if (isActive3 === true) {
    dictServices.servico = "Corte + Barba";
  }
  dictServices.businessName = "brunoBrito";
}

function getHorasValue() {
  var isActive1 = $("#option1").hasClass("active");
  var isActive2 = $("#option2").hasClass("active");
  var isActive3 = $("#option3").hasClass("active");
  var horas1 = $("#option1").text();
  var horas2 = $("#option2").text();
  var horas3 = $("#option3").text();
  if (isActive1 === true) {
    dictServices.horario = horas1;
  }
  if (isActive2 === true) {
    dictServices.horario = horas2;
  }
  if (isActive3 === true) {
    dictServices.horario = horas3;
  }
}
function isClickAgendar() {
  getServiceValue();
  getHorasValue();

  const user = JSON.parse(localStorage.getItem("userLogado"));
  user.agendamento = [];
  user.agendamento.push(dictServices);
  localStorage.setItem("userLogado", JSON.stringify(user));

  window.location.href = "../Profile/profile.html";
}