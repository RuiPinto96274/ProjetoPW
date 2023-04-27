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

  // Adiciona o novo user à lista de users
  users.push(user);

  // Valida se os campos estão preenchidos corretamente
  if (username == '' || nome == '' || email == '' || password == '' || passwordConfirmation == '') {
    $('.error').addClass('alert alert-danger').html('Por favor preencha todos os campos.');
  } else if (password != passwordConfirmation) {
    $('.error').addClass('alert alert-danger').html('As senhas não correspondem.');
  } else {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
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

// Check if the user is logged in and update the UI accordingly
if (localStorage.getItem('isUserLoggedIn') === 'true') {
  $("#loginBtnNav").hide();
  $("#logoutBtnNav").show();
  //preencher dados do perfil do user que fez login
  document.getElementById("username_perfil").value=currentUser.username;
  document.getElementById("nome_perfil").value=currentUser.nome;
  document.getElementById("email_perfil").value=currentUser.email;
  document.getElementById("passe_perfil").value=currentUser.password;
} else {
  $("#logoutBtnNav").hide();
  $("#loginBtnNav").show();
}

document.getElementById("loginUser").addEventListener("submit", function(event){
  // impede que a página recarregue quando o formulário é enviado
  event.preventDefault();

  // obter os dados do formulário
  var email = $("#emailLogin").val();
  var password = $("#passwordLogin").val();

  var isAuthenticated = false; // variável para indicar se o usuário foi autenticado com sucesso

  // percorre o array de usuários
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    // verificar credenciais do usuário e autenticá-lo
    if (user && user.email === email && user.password === password) {
      // exibir mensagem de sucesso
      alert("Login bem sucedido!");
      // limpa o formulário
      document.getElementById("loginUser").reset();

      $('#loginModal').modal('hide');
      $("#loginBtnNav").hide();
      $("#logoutBtnNav").show();

      localStorage.setItem('isUserLoggedIn', 'true');
      isAuthenticated = true; // definir como autenticado
      break; // interromper o loop
    }
  } 

  if (!isAuthenticated) {
    // exibir mensagem de erro
    alert("Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.");
    // limpa o formulário
    document.getElementById("loginUser").reset();
    openLoginModal();
  } 
  // após o login bem sucedido
  // fechar o modal
  $("#loginModal").modal("hide");
});

function closeLogin(){
  $("#logoutBtnNav").hide();
  $("#loginBtnNav").show();

  document.getElementById("username_perfil").value="";
  document.getElementById("nome_perfil").value="";
  document.getElementById("email_perfil").value="";
  document.getElementById("passe_perfil").value="";
 
  localStorage.setItem('isUserLoggedIn', 'false');
}

if (localStorage.getItem('isUserLoggedIn') === 'true') {
  document.getElementById("alterar_perfil").addEventListener("submit", function(event){
    event.preventDefault();
    
    // Obter o username do profissional a ser alterado
    let username = document.getElementById('username_perfil').value;
    
    // Procurar pelo profissional com o username correspondente
    let index = users.findIndex(function (u) {
      return u.username === username;
    });

    // Verificar se o username foi encontrado
    if (index === -1) {
      alert('Não foi encontrado nenhum profissional com o username especificado.');
      return;
    }
    // realizar ação de guardar dados aqui
    let nome= document.getElementById("nome_perfil").value;
    let email= document.getElementById("email_perfil").value;
    let password= document.getElementById("passe_perfil").value;

    // Verificar se todos os campos foram preenchidos
    if (username == "" || nome == "" || email == "" || password == "" ) {
      alert("Por favor, preencha todos os campos antes de atualizar os dados.");
      return;
    }else{
      users[index].nome=nome;
      users[index].email=email;
      users[index].password=password;

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[index]));
      alert("Dados guardados com sucesso!");
    }
  });
}

if (localStorage.getItem('isUserLoggedIn') === 'true') {
  // adicionar evento ao botão "Cancelar"
  document.getElementById("cancelar_perfil").addEventListener("click", function(event){
   event.preventDefault();
   for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (localStorage.getItem('isUserLoggedIn') === 'true') {
    document.getElementById("username_perfil").value=user.username;
    document.getElementById("nome_perfil").value=user.nome;
    document.getElementById("email_perfil").value=user.email;
    document.getElementById("passe_perfil").value=user.password;
    }
   }
  });
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

  //Ver password no perfil que se encontra escondida
  $("#showPasswordBtn").click(function() {
    var passwordInput = $("#passe_perfil");
    var passwordFieldType = passwordInput.attr("type");
    if (passwordFieldType === "password") {
      passwordInput.attr("type", "text");
      $(this).text("Esconder senha");
    } else {
      passwordInput.attr("type", "password");
      $(this).text("Mostrar senha");
    }
  });
});