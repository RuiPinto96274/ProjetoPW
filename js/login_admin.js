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
    alert("Login bem sucedido como Admin!");
    // limpa o formulário
    document.getElementById("adminloginUser").reset();

    $('#adminLoginModal').modal('hide');

    window.location.href = "dist/index_dist.html";
    admin.role = "admin";
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    autenticado = true;
  }

  // verificar credenciais dos profissionais e autenticá-los
  for(let i = 0; i < profissionais.length; i++){
    const profissional = profissionais[i];
    if(profissional.email === email && profissional.palavraPasse === password){
      // exibir mensagem de sucesso
      alert("Login bem sucedido como profissional!");
      // limpa o formulário
      document.getElementById("adminloginUser").reset();

      $('#adminLoginModal').modal('hide');

      window.location.href = "dist/index_dist.html";
      profissional.role = "profissional";
      localStorage.setItem('currentAdmin', JSON.stringify(profissional));
      autenticado = true;
      break;
    }
  }

  // exibir mensagem de erro, se as credenciais não forem autenticadas
  if (!autenticado) {
    alert("Credenciais inválidas. Por favor, verifique seu e-mail e senha e tente novamente.");
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


