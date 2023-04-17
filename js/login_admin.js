/*function showAdminRegisterForm(){
  $('.loginBox').fadeOut('fast',function(){
      $('.registerBox').fadeIn('fast');
      $('.login-footer').fadeOut('fast',function(){
          $('.register-footer').fadeIn('fast');
      });
      $('.modal-title').html('Registar');
  }); 
  $('.error').removeClass('alert alert-danger').html('');
}

function openAdminRegisterModal(){
  showAdminRegisterForm();
  setTimeout(function(){
      $('#adminLoginModal').modal('show');    
  }, 230);
}

document.getElementById("createAdmin").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  // obter os valores do formulário
  var email = $("#adminemailLogin").val();
  var password = $("#adminpasswordLogin").val();

  // armazenar os valores no localStorage
  var admin = {
    email: email,
    password: password
  };

  // Valida se os campos estão preenchidos corretamente
  if (email == '' || password == '') {
    $('.error').addClass('alert alert-danger').html('Por favor preencha todos os campos.');
  }else {
  localStorage.setItem('admin', JSON.stringify(admin));
  }

  alert("Registo bem sucedido! Por favor, faça login.");

  // limpa o formulário
  document.getElementById("createAdmin").reset();

  $('#adminLoginModal').modal('hide');
});*/

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

document.getElementById("adminloginUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  var admins = [];
  // obter os dados do formulário
  var email = $("#adminemailLogin").val();
  var password = $("#adminpasswordLogin").val();

  // verificar credenciais do usuário e autenticá-lo
  var admin = JSON.parse(localStorage.getItem('admin'));
  if (admin && admin.email === email && admin.password === password) {
    // exibir mensagem de sucesso
    alert("Login bem sucedido!");
    // limpa o formulário
    document.getElementById("adminloginUser").reset();

    $('#adminLoginModal').modal('hide');
    $("#loginBtnNav").hide();
    $("#logoutBtnNav").show();
  } else {
    // exibir mensagem de erro
    alert("Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.");
    // limpa o formulário
    document.getElementById("adminloginUser").reset();
    openAdminLoginModal();
  }

  // adicionar o usuário ao array
  var admin = {
    email: email,
    password: password
  };
  admins.push(admin);
  // após o login bem sucedido
  // fechar o modal
  $("#adminLoginModal").modal("hide");
});

function closeLogin(){
  $("#logoutBtnNav").hide();
  $("#loginBtnNav").show();
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

