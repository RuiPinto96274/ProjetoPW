
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
function openRegisterModal(){
  showRegisterForm();
  setTimeout(function(){
      $('#loginModal').modal('show');    
  }, 230);
  
}

function loginAjax(){
  // verificar credenciais do usuário e autenticá-lo
  // ...
  // após o login bem sucedido
  //document.getElementById("loginBtnNav").style.display = "none"; // esconde botão de login
  document.getElementById("logoutBtnNav").style.display = "block"; // exibe botão de logout
}

function shakeModal(){
  $('#loginModal .modal-dialog').addClass('shake');
           $('.error').addClass('alert alert-danger').html("Combinação email/password inválida");
           $('input[type="password"]').val('');
           setTimeout( function(){ 
              $('#loginModal .modal-dialog').removeClass('shake'); 
  }, 1000 ); 
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

function handleSubmit(event) {
  event.preventDefault();
  // Handle login form submission
  // ...
  closeLogin();
}