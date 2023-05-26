let atividades = JSON.parse(localStorage.getItem('atividades')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('currentUser')) || {};
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
// Get the accordion element
const accordion = document.getElementById('accordion');

function updateAccordion() {
  if (localStorage.getItem('isUserLoggedIn') !== 'true') {
    return;
  }

  let data = JSON.parse(localStorage.getItem('pedidos')) || [];

  // Clear the accordion before adding new items
  accordion.innerHTML = '';
    // Iterate over the data array and create a new accordion item for each item
    data.forEach((item, index) => {
      if((item.username === loggedInUser.username)){
        // Initialize statusLabel with an empty string
        let statusLabel = '';

        if (item.estado === 'confirmado') {
          return;
        }

        // Create a new accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        // Create the header of the accordion item
        const accordionHeader = document.createElement('h2');
        accordionHeader.className = 'accordion-header';
        
        // Determine the appropriate status label
        switch (item.estado) {
          case 'pendente':
            statusLabel = '<span class="badge rounded-pill bg-warning text-dark status-badge">Pendente</span>';
            break;
          case 'cancelado':
            statusLabel = '<span class="badge rounded-pill bg-danger status-badge">Cancelado</span>';
            break;
        }

        //ciclo for na lista atividades, e um if que compara item.id_atividade com os da lista até encontrar, 
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

        let precoTotal=0;
        for (let i = 0; i < atividades.length; i++) {
          if(atividades[i].id === item.id_atividade){
            precoTotal= parseInt(atividades[i].preco_pessoa) * item.numParticipantes;
          }
        }
        // Create the content of the accordion body
        let content = `
        <div class="accordion-body d-flex flex-column">
          <p>Dia: ${item.data} Hora: ${item.horas}</p>
          <p>Contacto: ${item.contacto}</p>
          <p>Grupo de ${item.numParticipantes} elementos</p>
          <p>Preço Total: ${precoTotal} €</p>
        `;

        content += `
          <div class="d-flex justify-content-between">
            <p>${statusLabel}</p>
          </div>
        `;
        
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

    // percorrer lista de reservas e selecionar as do cliente que fez login pelo username, adicionar os accordion items
    reservas.forEach((item, index) => {
      if((item.username === loggedInUser.username)){
        // Initialize statusLabel with an empty string
        let statusLabel = '';

        // Create a new accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        // Create the header of the accordion item
        const accordionHeader = document.createElement('h2');
        accordionHeader.className = 'accordion-header';

        statusLabel = '<span class="badge rounded-pill bg-success status-badge">Confirmado</span>';

        //ciclo for na lista atividades, e um if que compara item.id_atividade com os da lista até encontrar, 
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

       let data = new Date(item.dia_hora);
       let year = data.getFullYear();
       let month = data.getMonth() + 1;
       let day = data.getDate();
       let dia_reserva = year + '-' + (month < 10 ? '0' + month : month) + '-' + day;

       let hora_reserva = '';
       if (data.getMinutes() <= 9) {
        hora_reserva = (data.getHours() - 1) + ':' + '0'+data.getMinutes();
       } else {
        hora_reserva = (data.getHours() - 1) + ':' + data.getMinutes();
       }
       
       // Create the content of the accordion body
       let content = `
       <div class="accordion-body d-flex flex-column">
         <p>Dia: ${dia_reserva} Hora: ${hora_reserva}</p>
         <p>Contacto: ${item.contacto}</p>
         <p>Grupo de ${item.num_participantes} elementos</p>
         <p>Preço Total: ${item.custo_total} €</p>
       `;

       content += `
            <p>Sala: ${item.id_sala}</p>
            <div class="d-flex justify-content-between">
              <p>${statusLabel}</p>
              <div>
                <button type="button" class="btn btn-danger me-2">Cancelar</button>
              </div>
            </div>
          `;
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
}

// Call updateAccordion when the page loads
updateAccordion();

