let form = document.getElementById('form_inscricao');
let lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];
let loggedUser=JSON.parse(localStorage.getItem('currentUser')) || {};

if (localStorage.getItem('isUserLoggedIn') === 'true'){

  document.getElementById("nome").value=loggedUser.nome;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let username = loggedUser.username;
    let nome = document.getElementById('nome').value;
    let contacto = document.getElementById('telefone').value;
    let id_atividade = document.getElementById('atividade_escolhida').value;
    let numParticipantes = document.getElementById('num_participantes').value;
    let data = document.getElementById('data').value;
    let horas = document.getElementById('horas').value;

    let pedido = {
      id_pedido: Date.now(), // retorna o número de milissegundos desde 1º de janeiro de 1970 00:00:00 UTC. Como esse número é exclusivo para cada milissegundo, é improvável que haja conflitos entre IDs.
      username: username,
      nome: nome,
      contacto: contacto,
      id_atividade: id_atividade,
      numParticipantes: numParticipantes,
      data: data,
      horas: horas,
      estado: 'pendente' // inicializa o estado como 'pendente'
    };

    // Verifica se já há alguma inscrição guardada no Local Storage. 
    // Se houver, adiciona a nova inscrição ao final do array. 
    // Se não houver, ele cria um novo array apenas com a nova inscrição.
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Adicionar a nova inscrição ao array
    pedidos.push(pedido);
    
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    Toastify({
      text: 'Inscrição realizada com sucesso!',
      duration: 1000, // duração da mensagem de exibição em ms
      close: true,
      gravity: 'top', // posição da mensagem na tela
      position: 'center',
      backgroundColor: '#223843'
  }).showToast();
  
  setTimeout(() => {
    location.reload();
  }, 1000);
  });
}
