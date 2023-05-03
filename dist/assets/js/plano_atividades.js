const listGroup = document.querySelector('#lista_pedidos');
const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
const lista_users = JSON.parse(localStorage.getItem('users')) || [];
const lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];
const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
const salas = JSON.parse(localStorage.getItem('salas')) || [];

//opções dos fielsets dos modais
// opções de profissionais que podem ser gestores de atividades
const selectProfissionais = document.getElementById('gestor_registo');
for (let i = 0; i < profissionais.length; i++) {
  const profissional = profissionais[i];

  // Configurar o valor e o texto de cada opção do `select` com as informações do profissional.
  const option = document.createElement('option');
  option.value = profissional.id;
  option.text = profissional.nome;

  // Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
  selectProfissionais.appendChild(option);
}

// opções de salas que podem ser escolhidas
const selectSalas = document.getElementById('local_registo');
for (let i = 0; i < salas.length; i++) {
  const sala = salas[i];

  // Configurar o valor e o texto de cada opção do `select` com as informações do profissional.
  const option = document.createElement('option');
  option.value = sala.id;
  option.text = sala.numSala + " - " + sala.edificio;

  // Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
  selectSalas.appendChild(option);
}

// opções de atividades que podem ser selecionadas
const selectAtividades = document.getElementById('atividade_registo');
for (let i = 0; i < lista_atividades.length; i++) {
  const nome_atividade = lista_atividades[i];

  // Configurar o valor e o texto de cada opção do `select` com as informações do profissional.
  const option = document.createElement('option');
  option.value = nome_atividade.id;
  option.text = nome_atividade.nome + " " + nome_atividade.nivel;

  // 5. Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
  selectAtividades.appendChild(option);
}
/*
// opções de nivel atividades que podem ser selecionadas
const selectNivel = document.getElementById('nivel_registo');
for (let i = 0; i < lista_atividades.length; i++) {
  const nivel_atividade = lista_atividades[i];

  // Configurar o valor e o texto de cada opção do `select` com as informações do profissional.
  const option = document.createElement('option');
  option.value = nivel_atividade.nivel;
  option.text = nivel_atividade.nivel;

  // 5. Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
  selectNivel.appendChild(option);
}*/


// Recupera os dados das atividades marcadas do localStorage
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Atualize a lista de atividades marcadas com os dados recuperados do localstorage
const listAtividades = document.querySelector('#atividades-diarias');
reservas.forEach(selectedActivity => {
  const atividadeListItem = document.createElement('a');
  atividadeListItem.className = 'list-group-item list-group-item-action';
  atividadeListItem.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${selectedActivity.type}</h5>
    </div>
    <p class="mb-1">Dia: ${selectedActivity.date} Hora: ${selectedActivity.time}</p>
    <p class="mb-1">Contacto: ${selectedActivity.contact}</p>
    <small>Grupo de ${selectedActivity.groupSize} elementos</small>
  `;
  listAtividades.appendChild(atividadeListItem);

  atividadeListItem.addEventListener('click', function () {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <h5 class="mb-1">${selectedActivity.type}</h5>
      <p class="mb-1">Dia: ${selectedActivity.date} Hora: ${selectedActivity.time}</p>
      <p class="mb-1">Contacto: ${selectedActivity.contact}</p>
      <small>Grupo de ${selectedActivity.groupSize} elementos</small>
    `;
    const modal = new bootstrap.Modal(document.getElementById('atividade'));
    modal.show();
  });
});


//Percorre cada item da lista de Pedidos
pedidos.forEach(item => {
  // Cria uma lista nova com os dados do pedido
  const listItem = document.createElement('a');
  listItem.className = 'list-group-item list-group-item-action';
  listItem.setAttribute('data-bs-toggle', 'modal');
  listItem.setAttribute('data-bs-target', '#primary');
  listItem.setAttribute('id_pedido', item.id);
  listItem.setAttribute('id_atividade', item.id_atividade);
  listItem.setAttribute('username', item.username);
  listItem.setAttribute('data', item.data);
  listItem.setAttribute('horas', item.horas);
  listItem.setAttribute('contacto', item.contacto);
  listItem.setAttribute('numParticipantes', item.numParticipantes);
  listItem.setAttribute('estado', item.estado);

  //buscar nome e nivel da atividade com base no ID de atividade dado no pedido
  const atividade_encontrada = lista_atividades.find(atividade => atividade.id === item.id_atividade);

  let nome_atividade = atividade_encontrada.nome;
  let nivel_atividade = atividade_encontrada.nivel;

  // Coloca na lista o pedido
  const content = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${nome_atividade} ${nivel_atividade}</h5>
      </div>
      <p class="mb-1">Dia: ${item.data}    Hora: ${item.horas}</p>
      <p class="mb-1">Nome: ${item.nome}</p>
      <p class="mb-1">Contacto: ${item.contacto}</p>
      <small>Grupo de ${item.numParticipantes} elementos</small>
    `;

  // Set the content of the list item
  listItem.innerHTML = content;

  // Add the new list item to the list group
  listGroup.appendChild(listItem);
});

// função que corre quando algum dos itens da lista de pedidos é selecionado
listGroup.addEventListener('click', event => {
  const listItem = event.target.closest('.list-group-item');
  if (listItem) {
    // indica o index do pedido selecionado
    const index = Array.from(listGroup.children).indexOf(listItem);

    // guarda os dados do pedido selecionado
    const selectedItem = pedidos[index];

    //buscar nome e nivel da atividade com base no ID de atividade dado no pedido
    const atividade_encontrada = lista_atividades.find(atividade => atividade.id === selectedItem.id_atividade);

    let nome_atividade = atividade_encontrada.nome;
    let nivel_atividade = atividade_encontrada.nivel;



    // coloca o modal com o conteudo do pedido selecionado 
    const modalTitle = document.querySelector('#primary .modal-title');
    modalTitle.textContent = nome_atividade + ' ' + nivel_atividade;

    const modalBody = document.querySelector('#primary .modal-body');
    modalBody.innerHTML = `
        <p>Dia: ${selectedItem.data}     Hora: ${selectedItem.horas}</p>
        <p>Contacto: ${selectedItem.contacto}</p>
        <p>Nome:  ${selectedItem.nome}</p>
        <p>Grupo de ${selectedItem.numParticipantes} elementos</p>
      `;

    // Open the modal
    const modal = new bootstrap.Modal(document.querySelector('#primary'));
    modal.show();
  }
});

// Get the modal element
const modal = document.querySelector('#primary');

// Add an event listener to the modal that will remove the backdrop when the modal is closed
modal.addEventListener('hidden.bs.modal', () => {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
});

//Registar atividades confirmadas
listGroup.addEventListener('click', event => {
  // Encontre o item selecionado na lista de pedidos.
  let listItem = event.target.closest('.list-group-item');
  // Obter o índice do item selecionado
  const index = Array.from(listGroup.children).indexOf(listItem);

  // Adicione um evento de escuta de clique ao botão aceitar_pedido dentro do modal correspondente.
  $(document).on('click', '#aceitar_pedido', function () {
    // Obter o objeto do item selecionado usando o índice
    const selectedItem = pedidos[index];

    // Crie um objeto com as informações relevantes da atividade selecionada.
    const selectedActivity = {
      id_atividade: listItem.getAttribute('id_atividade'),
      username: listItem.getAttribute('username'),
      contact: listItem.getAttribute('contacto'),
      type: listItem.getAttribute('tipoAtividade') + " " + listItem.getAttribute('nivelAtividade'),
      date: listItem.getAttribute('data'),
      time: listItem.getAttribute('horas'),
      groupSize: listItem.getAttribute('numParticipantes')
    };


    //buscar o preco por pessoa da atividade com base no ID de atividade dado no pedido
    const atividade_encontrada = lista_atividades.find(atividade => atividade.id === selectedItem.id_atividade);
    let preco_pessoa = atividade_encontrada.preco_pessoa;

    //buscar nome do cliente com base no username de atividade dado no pedido
    const username_encontrado = lista_users.find(user => user.username === selectedItem.username);
    let nome_cliente = username_encontrado.nome;


    //isto apenas deve acontecer se o modal de registo for aberto a partir de um pedido e não no botão de registar atividade 
    document.getElementById('num_part_registo').value = selectedActivity.groupSize;
    document.getElementById('data_registo').value = selectedActivity.date;
    document.getElementById('nome_registo').value = nome_cliente;
    document.getElementById('hora_registo').value = selectedActivity.time;
    document.getElementById('atividade_registo').value = selectedActivity.id_atividade;
    document.getElementById('tlm_registo').value = selectedActivity.contact;
    document.getElementById('custo_registo').value = preco_pessoa * selectedActivity.groupSize;
    console.log(selectedActivity.contact);

    /*
        // Adicione esse objeto à lista de atividades confirmadas.
        dados_atividades.push(selectedActivity);
    
        selectedItem.estado = 'confirmado';
        
        // Remove esse item da lista de pedidos.
        listItem.parentNode.removeChild(listItem);
    
        // Atualize a lista de atividades confirmadas para exibir a nova atividade.
        const atividadeListItem = document.createElement('a');
        atividadeListItem.className = 'list-group-item list-group-item-action';
        atividadeListItem.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${selectedActivity.type}</h5>
          </div>
          <p class="mb-1">Dia: ${selectedActivity.date} Hora: ${selectedActivity.time}</p>
          <p class="mb-1">Contacto: ${selectedActivity.contact}</p>
          <small>Grupo de ${selectedActivity.groupSize} elementos</small>
        `;
        listAtividades.appendChild(atividadeListItem);
    
        listItem.setAttribute('estado', 'confirmado');
        // Atualize o localStorage com o array atualizado
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        // Armazene a lista de atividades confirmadas em localStorage.
        localStorage.setItem('dados_atividades', JSON.stringify(dados_atividades));*/
  });
});

//Atividades rejeitas
listGroup.addEventListener('click', event => {
  // Encontre o item selecionado na lista de pedidos.
  let listItem = event.target.closest('.list-group-item');
  // Obter o índice do item selecionado
  const index = Array.from(listGroup.children).indexOf(listItem);
  // Adicione um evento de escuta de clique ao botão rejeitar_pedido dentro do modal correspondente.
  $(document).on('click', '#rejeitar_pedido', function () {
    // Obter o objeto do item selecionado usando o índice
    const selectedItem = pedidos[index];
    selectedItem.estado = 'rejeitado';
    // Remove esse item da lista de pedidos.
    listItem.parentNode.removeChild(listItem);
    // Atualize o localStorage com o array atualizado
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  });
});

// Função para remover itens confirmados ou rejeitados da lista de pedidos
function removePedidosConfirmados() {
  // Obter os itens da lista de pedidos
  const pedidos = document.querySelectorAll('.list-group-item');
  // Iterar sobre cada item e verificar seu estado
  pedidos.forEach(pedido => {
    if (pedido.getAttribute('estado') === 'confirmado' || pedido.getAttribute('estado') === 'rejeitado') {
      // Se o item estiver confirmado ou rejeitado, remova-o da lista
      pedido.parentNode.removeChild(pedido);
    }
  });
}

// Chamar a função quando a página for carregada
window.onload = removePedidosConfirmados;


const botao_registar_atividade = document.getElementById('registar_atividade');
botao_registar_atividade.addEventListener('click', function () {
  // code to execute when the button is clicked
  document.getElementById('num_part_registo').value = "";
  document.getElementById('data_registo').value = "";
  document.getElementById('nome_registo').value = "";
  document.getElementById('hora_registo').value = "";
  document.getElementById('atividade_registo').value = "";
  document.getElementById('tlm_registo').value = "";
  document.getElementById('custo_registo').value = "";
});

//quando for selecionada uma atividade no registo de atividade o preço é atualizado automaticamente se já estiver preenchido o campo de nº de participantes
const caixa_preencher_atividade_registo = document.getElementById('atividade_registo');
caixa_preencher_atividade_registo.addEventListener('change', function () {
  const id_atividade = this.value;
  //buscar o preco por pessoa da atividade com base no ID de atividade dado no pedido
  const atividade_encontrada = lista_atividades.find(atividade => atividade.id === id_atividade);
  let preco_pessoa = atividade_encontrada.preco_pessoa;

  let num_participantes = document.getElementById('num_part_registo').value;
  document.getElementById('custo_registo').value = preco_pessoa * num_participantes;
});


