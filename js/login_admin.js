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

// Check if the user is logged in and update the UI accordingly
if (localStorage.getItem('isAdminLoggedIn') === 'true') {
  $("#loginBtnFooter").hide();
  $("#logoutBtnFooter").show();
} else {
  $("#logoutBtnFooter").hide();
  $("#loginBtnFooter").show();
}

document.getElementById("adminloginUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  // obter os dados do formulário
  let email = $("#adminemailLogin").val();
  let password = $("#adminpasswordLogin").val();
  // verificar credenciais do admin e autenticá-lo
  let admin = JSON.parse(localStorage.getItem('admin'));

  if (admin && admin.email === email && admin.password === password) {
    // exibir mensagem de sucesso
    alert("Login bem sucedido!");
    // limpa o formulário
    document.getElementById("adminloginUser").reset();

    $('#adminLoginModal').modal('hide');
    $("#loginBtnFooter").hide();
    $("#logoutBtnFooter").show();
    localStorage.setItem('isAdminLoggedIn', 'true');
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
  localStorage.setItem('isAdminLoggedIn', 'false');
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


