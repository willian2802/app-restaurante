// send to the server the username, password and action(register or login)
function SendData(event, action) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    console.log("Sending data to server");
  
    acao_desejada = action
    console.log("Action: " + acao_desejada);
  
    $.ajax({
      type: "POST",
      url: "/admin-page-process",
      contentType: "application/json", // Add this line
      data: JSON.stringify({ // Stringify the data object
        action: acao_desejada,
        value: $("#value").val(),
        username: $("#username").val(),
        password: $("#password").val()
      }),
      success: function(response) {
        if (response.success == true) {
          usuario_atual = response.message
          // Atualiza o conteúdo da página com o historico de listas do usuário
          render_history_space();
        } else {
          // mostra uma mensagem de erro para o usuário
          alert("Login failed: " + response.message);
          console.log(response.message);
        }
      }
    });
  }
