let currentAdmin=JSON.parse(localStorage.getItem('currentAdmin')) || {};
let admin = JSON.parse(localStorage.getItem('admin')) || {};
let profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];

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

 admin = {
  email: "admin@admin.com",
  password: "Admin1*"
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
  let autenticado = false;
  
  // verificar credenciais do admin e autenticá-lo
  if (admin && admin.email === email && admin.password === password) {
    // exibir mensagem de sucesso
    Toastify({
      text: 'Login bem sucedido como Admin!',
      duration: 1000, // duração da mensagem de exibição em ms
      close: true,
      gravity: 'top', // posição da mensagem na tela
      position: 'center',
      backgroundColor: '#223843'
    }).showToast();
    // limpa o formulário
    document.getElementById("adminloginUser").reset();

    $('#adminLoginModal').modal('hide');

    // aguarda 1 segundo antes de redirecionar para outra página
    setTimeout(() => {
      window.location.href = "back-office/index_dist.html";
    }, 1000);
    admin.role = "admin";
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    autenticado = true;
  }

  // verificar credenciais dos profissionais e autenticá-los
  for(let i = 0; i < profissionais.length; i++){
    const profissional = profissionais[i];
    if(profissional.email === email && profissional.palavraPasse === password){
      // exibir mensagem de sucesso
      Toastify({
        text: 'Login bem sucedido como profissional!',
        duration: 1000, // duração da mensagem de exibição em ms
        close: true,
        gravity: 'top', // posição da mensagem na tela
        position: 'center',
        backgroundColor: '#223843'
      }).showToast();
      // limpa o formulário
      document.getElementById("adminloginUser").reset();

      $('#adminLoginModal').modal('hide');

      // aguarda 1 segundo antes de redirecionar para outra página
      setTimeout(() => {
        window.location.href = "back-office/index_dist.html";
      }, 1000);
      profissional.role = "profissional";
      localStorage.setItem('currentAdmin', JSON.stringify(profissional));
      autenticado = true;
      return;
    }
  }

  // exibir mensagem de erro, se as credenciais não forem autenticadas
  if (!autenticado) {
    Toastify({
      text: 'Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.',
      duration: 1000, // duração da mensagem de exibição em ms
      close: true,
      gravity: 'top', // posição da mensagem na tela
      position: 'center',
      backgroundColor: '#8B0000'
  }).showToast();
    // limpa o formulário
    document.getElementById("adminloginUser").reset();
    openAdminLoginModal();
  }
});

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


