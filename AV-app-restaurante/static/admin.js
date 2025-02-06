// LOGIN AND REGISTER
// send to the server the username, password and action(register, login etc)


function messageAlert(response) {
  alert(response)
}

function SendData(event, action) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    console.log("Sending data to server");
  
    acao_desejada = action
    console.log("Action: " + acao_desejada);

  var inputData = {
    action: acao_desejada,
    restaurant_name: $("#restaurant_name").val(),
    username: $("#username").val(),
    password: $("#password").val()
  };

  if (!inputData.restaurant_name || !inputData.username || !inputData.password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  
    $.ajax({
      type: "POST",
      url: "/login_register_staf",
      contentType: "application/json",
      data: JSON.stringify(inputData), // Remove the extra nesting
      success: function(response) {
        // show alert message to the user
        messageAlert(response.message)
      }
    });

  }

let container_area = document.querySelector(".container")

function new_restaurant_form(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    container_area.innerHTML = `
      <div class="box">
        <h2>Criar novo restaurante</h2>
        <form action="sendData" method="POST">
            <label>Nome do restaurante:</label>
            <input id="restaurant_name" class="input" type="text">

            <label >Nome do gerente:</label>
            <input id="username" class="input" type="text">

            <label>Senha do gerente:</label>
            <input id="password" class="input" type="password">

            <div class="btn-box">
                <button type="button" class="btn btn-secondary" onclick="create_new_restaurant(event)">Cadastrar</button>
            </div>
        </form>   
      </div>
    `
}


function create_new_restaurant(event) {
    event.preventDefault(); // avoid the default form submission

    var inputData = {
      restaurant_name: $("#restaurant_name").val(),
      username: $("#username").val(),
      password: $("#password").val()
    };

    if (!inputData.restaurant_name || !inputData.username || !inputData.password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    $.ajax({
      type: "POST",
      url: "/create_restaurant",
      contentType: "application/json",
      data: JSON.stringify(inputData), // Remove the extra nesting
      success: function(response) {
        // ...
      }
    });
}


// admin restaurant setings and managemnent UI


function show_staff_settings(event,staf_list) {
  event.preventDefault();
  let setings_container_area = document.querySelector(".container")

  let staff_menbers = staf_list

  setings_container_area.innerHTML = `
    <div class="settings_box">
      <div class="settings_header">
        <h2>Funcionarios</h2>
      </div>
      <div class="settings_content">
        <form action="sendData" method="POST">
          <div class="settings_form">
            <label>Nome do restaurante:</label>
            <input id="restaurant_name" class="input" type="text">

            <label>Nome do gerente:</label>
            <input id="username" class="input" type="text">

            <label>Senha do gerente:</label>
            <input id="password" class="input" type="password">

            <label>Nível de acesso:</label>
            <input id="access_level" class="input" type="text">
          </div>
        </form>
      </div>
      <div class="settings_footer"></div>
    `
}
