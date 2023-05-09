const users = JSON.parse(localStorage.getItem('users'))|| [];
const currentUser=JSON.parse(localStorage.getItem('currentUser')) || {};

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
  let username = $("#usernameNew").val();
  let nome = $("#nomeNew").val();
  let email = $("#emailNew").val();
  let password = $("#passwordNew").val();
  let passwordConfirmation = $("#password_confirmationNew").val();

  // armazenar os valores no localStorage
  let user = {
    username: username,
    nome: nome,
    email: email,
    password: password
  };

  // Adiciona o novo user à lista de users
  users.push(user);

  // Valida se os campos estão preenchidos corretamente
  if (username == '' || nome == '' || email == '' || password == '' || passwordConfirmation == '') {
    $('.error').addClass('alert alert-danger').html('Por favor preencha todos os campos.');
  } else if (password != passwordConfirmation) {
    $('.error').addClass('alert alert-danger').html('As senhas não correspondem.');
  } else {
  localStorage.setItem('users', JSON.stringify(users));
  }

  Toastify({
    text: 'Registo bem sucedido! Por favor, faça login.',
    duration: 2500, // duração da mensagem de exibição em ms
    close: true,
    gravity: 'top', // posição da mensagem na tela
    position: 'center',
    backgroundColor: '#223843'
}).showToast();

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

// Check if the user is logged in and update the UI accordingly
if (localStorage.getItem('isUserLoggedIn') === 'true') {
  $("#loginBtnNav").hide();
  $("#logoutBtnNav").show();
} else {
  $("#logoutBtnNav").hide();
  $("#loginBtnNav").show();
}

document.getElementById("loginUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  // obter os dados do formulário
  let email = $("#emailLogin").val();
  let password = $("#passwordLogin").val();
  
  // percorre o array de usuários
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    // verificar credenciais do usuário e autenticá-lo
    if (user && user.email === email && user.password === password) {
      // exibir mensagem de sucesso
      Toastify({
        text: 'Login bem sucedido!',
        duration: 2500, // duração da mensagem de exibição em ms
        close: true,
        gravity: 'top', // posição da mensagem na tela
        position: 'center',
        backgroundColor: '#223843'
      }).showToast();
      // limpa o formulário
      document.getElementById("loginUser").reset();

      $('#loginModal').modal('hide');
      $("#loginBtnNav").hide();
      $("#logoutBtnNav").show();

      localStorage.setItem('isUserLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setTimeout(function(){
        location.reload();
      }, 500); 
      return;
    }
  } 

  if (localStorage.getItem('isUserLoggedIn') === 'false') {
    // exibir mensagem de erro
    Toastify({
      text: 'Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.',
      duration: 2500, // duração da mensagem de exibição em ms
      close: true,
      gravity: 'top', // posição da mensagem na tela
      position: 'center',
      backgroundColor: '#8B0000'
  }).showToast();
    // limpa o formulário
    document.getElementById("loginUser").reset();
    openLoginModal();
  } 
  // após o login bem sucedido
  // fechar o modal
  $("#loginModal").modal("hide");
});

function closeLogin(){
  // remove o user atual
  localStorage.removeItem('currentUser');
  
  if (localStorage.getItem('isUserLoggedIn') === 'false') {
  document.getElementById("username_perfil").value="";
  document.getElementById("nome_perfil").value="";
  document.getElementById("email_perfil").value="";
  document.getElementById("passe_perfil").value="";
  }
  localStorage.setItem('isUserLoggedIn', 'false');
  location.reload();
}

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