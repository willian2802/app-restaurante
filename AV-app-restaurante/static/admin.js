// send to the server the username, password and action(register, login etc)
function SendData(event, action) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    console.log("Sending data to server");
  
    acao_desejada = action
    console.log("Action: " + acao_desejada);

  // Corrija o ID do input
  var inputData = {
    action: acao_desejada,
    restaurante_name: $("#restaurante_name").val(),
    username: $("#username").val(),
    password: $("#password").val()
  };

    console.log(inputData);
  
    $.ajax({
      type: "POST",
      url: "/login_register_staf",
      contentType: "application/json",
      data: JSON.stringify(inputData), // Remove the extra nesting
      success: function(response) {
        // ...
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
            <input id="restaurante_name" class="input" type="text">

            <label >Nome do gerente:</label>
            <input id="username" class="input" type="text">

            <label>Senha do gerente:</label>
            <input id="password" class="input" type="password">

            <div class="btn-box">
                <button type="button" class="btn btn-secondary" onclick="SendData(event, 'register')">Cadastrar</button>
            </div>
        </form>   
      </div>
    
    `
}
