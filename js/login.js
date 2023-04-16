
function showRegisterForm(){
  $('.loginBox').fadeOut('fast',function(){
      $('.registerBox').fadeIn('fast');
      $('.login-footer').fadeOut('fast',function(){
          $('.register-footer').fadeIn('fast');
      });
      $('.modal-title').html('Registar');
  }); 
  $('.error').removeClass('alert alert-danger').html('');
}

function openRegisterModal(){
  showRegisterForm();
  setTimeout(function(){
      $('#loginModal').modal('show');    
  }, 230);
  
}

document.getElementById("createUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  // obter os valores do formulário
  var username = $("#usernameNew").val();
  var nome = $("#nomeNew").val();
  var email = $("#emailNew").val();
  var password = $("#passwordNew").val();
  var passwordConfirmation = $("#password_confirmationNew").val();

  // armazenar os valores no localStorage
  var user = {
    username: username,
    nome: nome,
    email: email,
    password: password
  };

  // Valida se os campos estão preenchidos corretamente
  if (username == '' || nome == '' || email == '' || password == '' || passwordConfirmation == '') {
    $('.error').addClass('alert alert-danger').html('Por favor preencha todos os campos.');
  } else if (password != passwordConfirmation) {
    $('.error').addClass('alert alert-danger').html('As senhas não correspondem.');
  } else {
  localStorage.setItem('user', JSON.stringify(user));
  }

  alert("Registo bem sucedido! Por favor, faça login.");

  // limpa o formulário
  document.getElementById("createUser").reset();

  $('#loginModal').modal('hide');
});

function showLoginForm(){
  $('#loginModal .registerBox').fadeOut('fast',function(){
      $('.loginBox').fadeIn('fast');
      $('.register-footer').fadeOut('fast',function(){
          $('.login-footer').fadeIn('fast');    
      });
      
      $('.modal-title').html('Login');
  });       
   $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
  showLoginForm();
  setTimeout(function(){
      $('#loginModal').modal('show');    
  }, 230);
  
}

document.getElementById("loginUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  var users = [];
  // obter os dados do formulário
  var email = $("#emailLogin").val();
  var password = $("#passwordLogin").val();

  // verificar credenciais do usuário e autenticá-lo
  var user = JSON.parse(localStorage.getItem('user'));
  if (user && user.email === email && user.password === password) {
    // exibir mensagem de sucesso
    alert("Login bem sucedido!");
    // limpa o formulário
    document.getElementById("loginUser").reset();

    $('#loginModal').modal('hide');
    /*$(".loginBox").fadeOut(function () {
      $("#loginBtnNav").hide();
      $("#logoutBtnNav").show();
      $(".modal-title").html(user.nome);
    });*/
  } else {
    // exibir mensagem de erro
    alert("Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.");
    // limpa o formulário
    document.getElementById("loginUser").reset();
    openLoginModal();
  }

  // adicionar o usuário ao array
  var user = {
    email: email,
    password: password
  };
  users.push(user);
  // após o login bem sucedido
  //document.getElementById("loginBtnNav").style.display = "none"; // esconde botão de login
  //document.getElementById("logoutBtnNav").style.display = "block"; // exibe botão de logout
  // fechar o modal
  $("#loginModal").modal("hide");
});

$(document).ready(function () {
  // Fechar o modal quando o botão 'fechar' for clicado
  $(".modal-header button").click(function () {
    $("#loginModal").modal("hide");
  });

  // Limpar os campos do formulário quando o modal for fechado
  $("#loginModal").on("hidden.bs.modal", function () {
    $("#loginUser")[0].reset();
  });
});

