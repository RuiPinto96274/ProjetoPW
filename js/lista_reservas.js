let atividades = JSON.parse(localStorage.getItem('atividades')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('currentUser')) || {};
// Get the accordion element
const accordion = document.getElementById('accordion');

function updateAccordion() {
  if (localStorage.getItem('isUserLoggedIn') !== 'true') {
    return;
  }

  let data = JSON.parse(localStorage.getItem('pedidos')) || [];

  //**********Remover os pedidos com estado confirmado, vai ficar nas reservas***** */
  // Clear the accordion before adding new items
  accordion.innerHTML = '';
    // Iterate over the data array and create a new accordion item for each item
    data.forEach((item, index) => {
      if((item.nome === loggedInUser.nome)){
        // Initialize statusLabel with an empty string
        let statusLabel = '';
        // Create a new accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        // Create the header of the accordion item
        const accordionHeader = document.createElement('h2');
        accordionHeader.className = 'accordion-header';
        accordionHeader.innerHTML = `
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
            ${item.tipoAtividade}
          </button>
        `;
        // Determine the appropriate status label
        switch (item.estado) {
          case 'confirmado':
            statusLabel = '<span class="badge rounded-pill bg-success status-badge">Confirmado</span>';
            break;
          case 'pendente':
            statusLabel = '<span class="badge rounded-pill bg-warning text-dark status-badge">Pendente</span>';
            break;
          case 'cancelado':
            statusLabel = '<span class="badge rounded-pill bg-danger status-badge">Cancelado</span>';
            break;
        }

        //ciclo for na lista atividades, e um if que compara item.id_atividade com os da lista até enconrar, 
        //guarda em variaveis novas o nome e o nivel, depois é essas que ficam no innerHTML em baixo
        let nome='';
        let nivel='';
        for (let i = 0; i < atividades.length; i++) {
          if(atividades[i].id === item.id_atividade){
              nome= atividades[i].nome;
              nivel= atividades[i].nivel;
          }
        }
        
        // Update the accordion header with the status label
        accordionHeader.innerHTML = `
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
          Workshop ${nome} ${nivel} 
        </button>
        `;

        // Create the body of the accordion item
        const accordionBody = document.createElement('div');
        accordionBody.id = `collapse-${index}`;
        accordionBody.className = 'accordion-collapse collapse';
        accordionBody.setAttribute('aria-labelledby', `heading-${index}`);
        accordionBody.setAttribute('data-bs-parent', '#accordion');

        // Create the content of the accordion body
        let content = `
        <div class="accordion-body d-flex flex-column">
          <p>Dia: ${item.data} Hora: ${item.horas}</p>
          <p>Contacto: ${item.telefone}</p>
          <p>Grupo de ${item.numParticipantes} elementos</p>
          <p>Preço Total: ${item.preco} €</p>
        `;

        if (item.estado === 'confirmado') {
          content += `
            <p>Sala: ${item.sala}</p>
            <div class="d-flex justify-content-between">
              <p>${statusLabel}</p>
              <div>
                <button type="button" class="btn btn-danger me-2">Cancelar</button>
              </div>
            </div>
          `;
        } else {
          content += `
            <div class="d-flex justify-content-between">
              <p>${statusLabel}</p>
            </div>
          `;
        }

        content += `
          </div>
        </div>
        `;

        // Set the body content of the accordion item
        accordionBody.innerHTML = content;

        // Add the header and body to the accordion item
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionBody);

        // Add the accordion item to the accordion
        accordion.appendChild(accordionItem);
      }
    });
    // percorrer lista de reservas e selecionar as do cliente que fez login pelo id_cliente e não o nome, adicionar os accordion items
}

// Call updateAccordion when the page loads
updateAccordion();

