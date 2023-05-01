const form = document.getElementById('form_inscricao');
const lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];
const loggedUser=JSON.parse(localStorage.getItem('currentUser')) || {};

if (localStorage.getItem('isUserLoggedIn') === 'true'){

  document.getElementById("nome").value=loggedUser.nome;

  // opções de atividades que podem ser selecionadas
  const selectAtividades = document.getElementById('atividade_escolhida');
  for (let i = 0; i < lista_atividades.length; i++) {
    const nome_atividade = lista_atividades[i];

    // Configurar o valor e o texto de cada opção do select com as informações do profissional.
    const option = document.createElement('option');
    option.value = nome_atividade.id;
    option.text =  nome_atividade.nome + " "+ nome_atividade.nivel;

    //Adicionar cada opção criada ao elemento select usando o método appendChild.
    selectAtividades.appendChild(option);
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const id_atividade = document.getElementById('atividade_escolhida').value;
    /*
    const tipoAtividade = document.getElementById('tipo_atividade').value;
    const nivelAtividade = document.getElementById('nivel_atividade').value;*/
    const numParticipantes = document.getElementById('num_participantes').value;
    const data = document.getElementById('data').value;
    const horas = document.getElementById('horas').value;

    const pedido = {
      id_pedido: Date.now(), // retorna o número de milissegundos desde 1º de janeiro de 1970 00:00:00 UTC. Como esse número é exclusivo para cada milissegundo, é improvável que haja conflitos entre IDs.
      nome: nome,
      telefone: telefone,
      id_atividade: id_atividade,
    /* tipoAtividade: tipoAtividade,
      nivelAtividade: nivelAtividade,*/
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
}