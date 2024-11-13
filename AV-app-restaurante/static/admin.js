// send to the server the username, password and action(register, login etc)
function SendData(event, action) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    console.log("Sending data to server");
  
    acao_desejada = action
    console.log("Action: " + acao_desejada);
  
    $.ajax({
      type: "POST",
      url: "/login_register_staf",
      contentType: "application/json", // Add this line
      data: JSON.stringify({ // Stringify the data object
        action: acao_desejada,
        value: $("#value").val(),
        restaurante_name: $("#restaurante_name").val(),
        username: $("#username").val(),
        password: $("#password").val()
      }),
      success: function(response) {
        if (response.success == true) {
          usuario_atual = response.message
          // render_history_space();
        } else {
          // Show a error message to the user
          alert("Login failed: " + response.message);
          console.log(response.message);
        }
      }
    });
  }

let login_register_area = document.querySelector(".box")

function show_interface() {

}
