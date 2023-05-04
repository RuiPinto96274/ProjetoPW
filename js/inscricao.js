const form = document.getElementById('form_inscricao');
const lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];
const loggedUser=JSON.parse(localStorage.getItem('currentUser')) || {};

if (localStorage.getItem('isUserLoggedIn') === 'true'){

  document.getElementById("nome").value=loggedUser.nome;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = loggedUser.username;
    const nome = document.getElementById('nome').value;
    const contacto = document.getElementById('telefone').value;
    const id_atividade = document.getElementById('atividade_escolhida').value;
    const numParticipantes = document.getElementById('num_participantes').value;
    const data = document.getElementById('data').value;
    const horas = document.getElementById('horas').value;

    const pedido = {
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
    
    alert('Inscrição realizada com sucesso!');
    location.reload();
  });
}