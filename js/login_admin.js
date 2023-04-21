function showAdminLoginForm(){
  $('#adminLoginModal .registerBox').fadeOut('fast',function(){
      $('.loginBox').fadeIn('fast');
      $('.register-footer').fadeOut('fast',function(){
          $('.login-footer').fadeIn('fast');    
      });
      
      $('.modal-title').html('Login');
  });       
   $('.error').removeClass('alert alert-danger').html(''); 
}

function openAdminLoginModal(){
  showAdminLoginForm();
  setTimeout(function(){
      $('#adminLoginModal').modal('show');    
  }, 230);
}

let admin = {
  email: "admin@admin.com",
  password: "1234"
};

// Cria o admin se ele ainda não existe
if (!localStorage.getItem('admin')) {
  localStorage.setItem('admin', JSON.stringify(admin));
}

document.getElementById("adminloginUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  // obter os dados do formulário
  let email = $("#adminemailLogin").val();
  let password = $("#adminpasswordLogin").val();
  // verificar credenciais do admin e autenticá-lo
  let admin = JSON.parse(localStorage.getItem('admin'));
  console.log(email);
  console.log(admin.password);
  console.log(admin.email);
  console.log(admin.password);
  if (admin && admin.email === email && admin.password === password) {

    // exibir mensagem de sucesso
    alert("Login bem sucedido!");
    // limpa o formulário
    document.getElementById("adminloginUser").reset();

    $('#adminLoginModal').modal('hide');
    $("#loginBtnFooter").hide();
    $("#logoutBtnFooter").show();
  } else {
    // exibir mensagem de erro
    alert("Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.");
    // limpa o formulário
    document.getElementById("adminloginUser").reset();
    openAdminLoginModal();
  }
});

function closeAdminLogin(){
  $("#logoutBtnFooter").hide();
  $("#loginBtnFooter").show();
}

$(document).ready(function () {
  // Fechar o modal quando o botão 'fechar' for clicado
  $(".modal-header button").click(function () {
    $("#adminLoginModal").modal("hide");
  });

  // Limpar os campos do formulário quando o modal for fechado
  $("#adminLoginModal").on("hidden.bs.modal", function () {
    $("#adminloginUser")[0].reset();
  });
});


