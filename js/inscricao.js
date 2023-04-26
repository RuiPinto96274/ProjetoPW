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
    nome: nome,
    telefone: telefone,
    tipoAtividade: tipoAtividade,
    nivelAtividade: nivelAtividade,
    numParticipantes: numParticipantes,
    data: data,
    horas: horas
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