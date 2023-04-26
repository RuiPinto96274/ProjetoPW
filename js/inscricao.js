const form = document.getElementById('form_inscricao');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const tipoAtividade = document.getElementById('tipo_atividade').value;
  const nivelAtividade = document.getElementById('nivel_atividade').value;
  const numParticipantes = document.getElementById('num_participantes').value;
  const data = document.getElementById('data').value;
  const horas = document.getElementById('horas').value;

  const pedido = {
    id: Date.now(), // retorna o número de milissegundos desde 1º de janeiro de 1970 00:00:00 UTC. Como esse número é exclusivo para cada milissegundo, é improvável que haja conflitos entre IDs.
    nome: nome,
    telefone: telefone,
    tipoAtividade: tipoAtividade,
    nivelAtividade: nivelAtividade,
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
});

/* A implementar
Receber a resposta do backoffice na forma de um objeto "resposta" que inclui o ID do pedido e o novo estado. 
Percorrer o array de pedidos armazenados no localStorage, encontrar o pedido correspondente pelo ID e atualizar seu estado da seguinte forma:

for (let i = 0; i < pedidos.length; i++) {
  if (pedidos[i].id === resposta.id) {
    pedidos[i].estado = resposta.estado;
    break;
  }
}

localStorage.setItem('pedidos', JSON.stringify(pedidos));*/