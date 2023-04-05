// Sample data retrieved from the database
const data = [
    {
      type: 'Workshop Costura Livre',
      date: '04/05/2023',
      time: '10:00',
      contact: 961269447,
      groupSize: 6,
      status: 'confirmada'
    },
    {
      type: 'Workshop Cerâmica Iniciante',
      date: '04/06/2023',
      time: '14:00',
      contact: 935147788,
      groupSize: 8,
      status: 'pendente'
    },
    {
      type: 'Workshop Bordado Livre',
      date: '04/07/2023',
      time: '16:00',
      contact: 914588126,
      groupSize: 5,
      status: 'cancelada'
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

    // Determine the appropriate status label
  let statusLabel = '';
  switch (item.status) {
    case 'confirmada':
      statusLabel = '<span class="badge rounded-pill bg-success">Confirmada</span>';
      break;
    case 'pendente':
      statusLabel = '<span class="badge rounded-pill bg-warning text-dark">Pendente</span>';
      break;
    case 'cancelada':
      statusLabel = '<span class="badge rounded-pill bg-danger">Cancelada</span>';
      break;
  }

    // Create the content of the list item
    const content = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${item.type}</h5>
        ${statusLabel}
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