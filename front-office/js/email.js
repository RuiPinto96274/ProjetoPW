document.getElementById("enviar_email").addEventListener("submit",function(event){
    event.preventDefault();
   let params = {
    subject: document.getElementById("subject").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_gf31eif";
  const templateID = "template_4em1uhi";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("name").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

  });


