// Sample data retrieved from the database
const data = [
    {
      type: 'Workshop Costura Livre',
      date: '04/05/2023',
      time: '10:00',
      contact: 961269447,
      name: 'Maria Pires',
      groupSize: 6
    },
    {
      type: 'Workshop Cerâmica Iniciante',
      date: '04/06/2023',
      time: '14:00',
      contact: 935147788,
      name: 'João Pereira',
      groupSize: 8
    },
    {
      type: 'Workshop Bordado Livre',
      date: '04/07/2023',
      time: '16:00',
      contact: 914588126,
      name: 'Rute Gonçalves',
      groupSize: 5
    }
  ];

  // Get the list group element
  const listGroup = document.querySelector('#lista_pedidos');

  // Iterate over the data array and create a new list item for each item
  data.forEach(item => {
    // Create a new list item
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item list-group-item-action';
    listItem.setAttribute('data-bs-toggle', 'modal');
    listItem.setAttribute('data-bs-target', '#primary');

    // Create the content of the list item
    const content = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${item.type}</h5>
      </div>
      <p class="mb-1">Dia: ${item.date} Hora: ${item.time}</p>
      <p class="mb-1">Contacto: ${item.contact}</p>
      <small>Grupo de ${item.groupSize} elementos</small>
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
      modalTitle.textContent = selectedItem.type;
  
      const modalBody = document.querySelector('#primary .modal-body');
      modalBody.innerHTML = `
        <p>Dia: ${selectedItem.date}  ${selectedItem.time}</p>
        <p>Contacto: ${selectedItem.contact}</p>
        <p>Nome:  ${selectedItem.name}</p>
        <p>Grupo de ${selectedItem.groupSize} elementos</p>
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
  


// Dados com as atividades já marcadas
const dados_atividades = [
  {
    type: 'Workshop Bordado Livre',
    date: '12/04/2023',
    time: '10:30',
    contact: 961269447,
    room: 1,
    groupSize: 6
  },
  {
    type: 'Workshop Bordado Iniciante',
    date: '12/04/2023',
    time: '14:30',
    contact: 914588126,
    room:1,
    groupSize: 7
  },
  {
    type: 'Workshop Escultura Iniciante',
    date: '12/04/2023',
    time: '15:00',
    contact: 968918126,
    room:4,
    groupSize: 5
  },
  {
    type: 'Workshop Cerâmica Livre',
    date: '12/04/2023',
    time: '15:30',
    contact: 935147788,
    room:5,
    groupSize: 8
  }
];

// Get the list group element
const listAtividades = document.querySelector('#atividades-diarias');

 // Iterate over the data array and create a new list item for each item
 dados_atividades.forEach(item => {
  // Create a new list item
  const listItem = document.createElement('a');
  listItem.className = 'list-group-item list-group-item-action';
  listItem.setAttribute('data-bs-toggle', 'modal');
  listItem.setAttribute('data-bs-target', '#atividade');
  // Create the content of the list item
  const content = `
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${item.type}</h5>
    </div>
    <p class="mb-1">Dia: ${item.date} Hora: ${item.time}</p>
    <p class="mb-1">Contacto: ${item.contact}</p>
    <p class="mb-1">Sala: ${item.room}</p>
    <small>Grupo de ${item.groupSize} elementos</small>
  `;

  // Set the content of the list item
  listItem.innerHTML = content;

  // Add the new list item to the list group
  listAtividades.appendChild(listItem);
});

// Handle click events on list items
listAtividades.addEventListener('click', event => {
  const listItem = event.target.closest('a');
  if (listItem) {
    // Get the index of the clicked item
    const index = Array.from(listAtividades.children).indexOf(listItem);

    // Get the data of the selected item
    const selectedItem = dados_atividades[index];

    // Set the content of the modal with the selected item's data
    const modalTitle = document.querySelector('#atividade .modal-title');
    modalTitle.textContent = selectedItem.type;

    const modalBody = document.querySelector('#atividade .modal-body');
     modalBody.innerHTML = `
        <p>Dia: ${selectedItem.date}  ${selectedItem.time}</p>
        <p>Contacto: ${selectedItem.contact}</p>
        <p>Sala: ${selectedItem.room}</p>
        <p>Grupo de ${selectedItem.groupSize} elementos</p>
      `;
    // Open the modal
    const modal = new bootstrap.Modal(document.querySelector('#atividade'));
    modal.show();
  }
});

// Get the modal element
const modal_atividade = document.querySelector('#atividade');

// Add an event listener to the modal that will remove the backdrop when the modal is closed
modal_atividade.addEventListener('hidden.bs.modal', () => {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
});