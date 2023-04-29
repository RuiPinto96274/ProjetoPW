const listGroup = document.querySelector('#lista_pedidos');
const data = JSON.parse(localStorage.getItem('pedidos')) || [];
// Recupera os dados das atividades marcadas do localStorage
const dados_atividades = JSON.parse(localStorage.getItem('dados_atividades')) || [];

// Atualize a lista de atividades marcadas com os dados recuperados do localstorage
const listAtividades = document.querySelector('#atividades-diarias');
dados_atividades.forEach(selectedActivity => {
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
});

  // Iterate over the data array and create a new list item for each item
  data.forEach(item => {
    // Create a new list item
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item list-group-item-action';
    listItem.setAttribute('data-bs-toggle', 'modal');
    listItem.setAttribute('data-bs-target', '#primary');
    listItem.setAttribute('id', item.id);
    listItem.setAttribute('tipoAtividade', item.tipoAtividade);
    listItem.setAttribute('nivelAtividade', item.nivelAtividade);
    listItem.setAttribute('data', item.data);
    listItem.setAttribute('horas', item.horas);
    listItem.setAttribute('telefone', item.telefone);
    listItem.setAttribute('numParticipantes', item.numParticipantes);
    listItem.setAttribute('estado', item.estado);

    // Create the content of the list item
    const content = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${item.tipoAtividade} ${item.nivelAtividade}</h5>
      </div>
      <p class="mb-1">Dia: ${item.data}    Hora: ${item.horas}</p>
      <p class="mb-1">Nome: ${item.nome}</p>
      <p class="mb-1">Contacto: ${item.telefone}</p>
      <small>Grupo de ${item.numParticipantes} elementos</small>
    `;

    // Set the content of the list item
    listItem.innerHTML = content;

    // Add the new list item to the list group
    listGroup.appendChild(listItem);
  });

// Handle click events on list items
listGroup.addEventListener('click', event => {
    const listItem = event.target.closest('.list-group-item');
    if (listItem) {
      // Get the index of the clicked item
      const index = Array.from(listGroup.children).indexOf(listItem);
  
      // Get the data of the selected item
      const selectedItem = data[index];
  
      // Set the content of the modal with the selected item's data
      const modalTitle = document.querySelector('#primary .modal-title');
      modalTitle.textContent = selectedItem.tipoAtividade + ' '+selectedItem.nivelAtividade;
  
      const modalBody = document.querySelector('#primary .modal-body');
      modalBody.innerHTML = `
        <p>Dia: ${selectedItem.data}  ${selectedItem.horas}</p>
        <p>Contacto: ${selectedItem.telefone}</p>
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
  $(document).on('click', '#aceitar_pedido', function() {
    // Obter o objeto do item selecionado usando o índice
    const selectedItem = data[index];

      // Crie um objeto com as informações relevantes da atividade selecionada.
      const selectedActivity = {
        type: listItem.getAttribute('tipoAtividade') + ' ' + listItem.getAttribute('nivelAtividade'),
        date: listItem.getAttribute('data'),
        time: listItem.getAttribute('horas'),
        contact: listItem.getAttribute('telefone'),
        groupSize: listItem.getAttribute('numParticipantes')
    };

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
    localStorage.setItem('pedidos', JSON.stringify(data));
    // Armazene a lista de atividades confirmadas em localStorage.
    localStorage.setItem('dados_atividades', JSON.stringify(dados_atividades));
  });
});

//Atividades rejeitas
listGroup.addEventListener('click', event => {
  // Encontre o item selecionado na lista de pedidos.
  let listItem = event.target.closest('.list-group-item');
  // Obter o índice do item selecionado
  const index = Array.from(listGroup.children).indexOf(listItem);
    // Adicione um evento de escuta de clique ao botão rjeitar_pedido dentro do modal correspondente.
    $(document).on('click', '#rejeitar_pedido', function() {
      // Obter o objeto do item selecionado usando o índice
      const selectedItem = data[index];
      selectedItem.estado = 'rejeitado';
      // Remove esse item da lista de pedidos.
      listItem.parentNode.removeChild(listItem);
      // Atualize o localStorage com o array atualizado
      localStorage.setItem('pedidos', JSON.stringify(data));
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