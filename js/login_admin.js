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
  
  function adminLoginAjax() {
    /*   Remove this comments when moving to server
    $.post( "/login", function( data ) {
            if(data == 1){
                window.location.replace("/home");            
            } else {
                 shakeModal(); 
            }
        });
    */
  
    /*   Simulate error message from the server   */
    shakeModal();
  }
  
  function shakeModal() {
    $("#adminLoginModal .modal-dialog").addClass("shake");
    $(".error")
      .addClass("alert alert-danger")
      .html("Combinação email/password inválida");
    $("input[type='password']").val("");
    setTimeout(function() {
      $("#adminLoginModal .modal-dialog").removeClass("shake");
    }, 1000);
  }
  
  $(document).ready(function() {
    // Fechar o modal quando o botão 'fechar' for clicado
    $(".modal-header button").click(function() {
      $("#adminLoginModal").modal("hide");
    });
  
    // Limpar os campos do formulário quando o modal for fechado
    $("#adminLoginModal").on("hidden.bs.modal", function() {
      $("#adminloginUser")[0].reset();
    });
  });
  
  function handleSubmit(event) {
    event.preventDefault();
    // Handle login form submission
    // ...
    closeLogin();
  }