const listGroup = document.querySelector('#lista_pedidos');
const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
const lista_users = JSON.parse(localStorage.getItem('users')) || [];
const lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];
const lista_materiais = JSON.parse(localStorage.getItem('materiais')) || [];
const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
const salas = JSON.parse(localStorage.getItem('salas')) || [];
const lista_reservas = JSON.parse(localStorage.getItem('reservas')) || [];

//variavel que vai armazenar pedido que foi "aceite" para se tornar numa reserva
let id_pedido_selecionado = 0;

//variavel que vai armazenar id da reserva que foi selecionada
let id_reserva_selecionada = 0;

//OPÇÕES DOS FIELDSETS DOS MODAIS
// opções de atividades que podem ser selecionadas
const selectAtividades = document.getElementById('atividade_registo');
for (let i = 0; i < lista_atividades.length; i++) {
  const nome_atividade = lista_atividades[i];
  // Configurar o valor e o texto de cada opção do `select` com as informações da atividade
  const option = document.createElement('option');
  option.value = nome_atividade.id;
  option.text = nome_atividade.nome + " " + nome_atividade.nivel;

  //Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
  selectAtividades.appendChild(option);
}

// opções de salas que podem ser escolhidas
const selectSalas = document.getElementById('local_registo');
for (let i = 0; i < salas.length; i++) {
  const sala = salas[i];
  // Configurar o valor e o texto de cada opção do `select` com as informações da sala.
  const option = document.createElement('option');
  option.value = sala.id;
  option.text = "Sala " + sala.numSala + " - " + sala.edificio;
  // Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
  selectSalas.appendChild(option);
}

// opções de materiais/kits que podem ser reservados
function carregarFieldsetsMateriais() {
  // obter a atividade selecionada
  let id_atividadeSelecionada = document.getElementById('atividade_registo').value;

  if (id_atividadeSelecionada !== '') {
    const atividadeSelecionada = lista_atividades.find(atividade => atividade.id === id_atividadeSelecionada);
    let atividade_nome = atividadeSelecionada.nome;

    const selectMateriais = document.getElementById('material_registo');
    selectMateriais.innerHTML = '';

    for (let i = 0; i < lista_materiais.length; i++) {
      const material = lista_materiais[i];
      // verificar se o material é para a mesma atividade que a selecionada
      let temMaterial = false;
      for (let j = 0; j < material.atividade.length; j++) {
        const ativ_material = material.atividade[j];
        if (ativ_material == atividade_nome) {
          temMaterial = true;
          break;
        }
      }
      if (temMaterial) {
        // Configurar o valor e o texto de cada opção do `select` com as informações do mmaterial.
        const option = document.createElement('option');
        option.value = material.id;
        option.text = material.nome;
        // Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
        selectMateriais.appendChild(option);
      }
    }
  }
}

// opções de profissionais que podem ser gestores de atividades
function carregarFieldsetsProf() {
  // obter a atividade selecionada
  let id_atividadeSelecionada = document.getElementById('atividade_registo').value;
  if (id_atividadeSelecionada !== '') {
    const atividadeSelecionada = lista_atividades.find(atividade => atividade.id === id_atividadeSelecionada);
    let atividade_nome = atividadeSelecionada.nome;

    const selectProfissionais = document.getElementById('gestor_registo');
    selectProfissionais.innerHTML = '';
    for (let i = 0; i < profissionais.length; i++) {
      const profissional = profissionais[i];
      // verificar se o profissional tem competência na atividade selecionada
      let temCompetencia = false;
      for (let j = 0; j < profissional.competencias.length; j++) {
        const competencia = profissional.competencias[j];
        if (competencia == atividade_nome) {
          temCompetencia = true;
          break;
        }
      }
      if (temCompetencia) {
        // Configurar o valor e o texto de cada opção do `select` com as informações do profissional.
        const option = document.createElement('option');
        option.value = profissional.id;
        option.text = profissional.nome;
        // Adicionar cada opção criada ao elemento `select` usando o método `appendChild`.
        selectProfissionais.appendChild(option);
      }
    }
  }
}

// Atualize a lista de reservas marcadas com os dados recuperados do localstorage
const listaReservas = document.querySelector('#atividades-diarias');
lista_reservas.forEach(reserva_selecionada => {
  const reservaListItem = document.createElement('a');
  const atividade_encontrada = lista_atividades.find(atividade => atividade.id === reserva_selecionada.id_atividade);
  let nome_atividade = atividade_encontrada.nome;
  let nivel_atividade = atividade_encontrada.nivel;

  const sala_encontrada = salas.find(sala => sala.id === reserva_selecionada.id_sala);
  let num_sala = sala_encontrada.numSala;
  let edificio = sala_encontrada.edificio;

  const profissional_encontrado = profissionais.find(profissional => profissional.id === reserva_selecionada.id_profissional);
  let id_profissional = profissional_encontrado.nome;

  const user_encontrado = lista_users.find(user => user.username === reserva_selecionada.username);
  let user_nome = user_encontrado.nome;

  let data_hoje = Date.now();
  let data = new Date(reserva_selecionada.dia_hora);
  if(data>=data_hoje){
    let dia_reserva = data.toISOString().split('T')[0];
  let hora_reserva = data.toISOString().split('T')[1].split('.')[0];

  reservaListItem.className = 'list-group-item list-group-item-action';
  reservaListItem.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${nome_atividade} ${nivel_atividade}</h5>
    </div>
    <p class="mb-1">Dia: ${dia_reserva} Hora: ${hora_reserva}</p>
    <p class="mb-1">Contacto: ${reserva_selecionada.contacto}</p>
    <p class="mb-1">Profissional: ${id_profissional}</p>
    <small>Grupo de ${reserva_selecionada.num_participantes} elementos</small>
  `;
  listaReservas.appendChild(reservaListItem);

  reservaListItem.addEventListener('click', function () {
    id_reserva_selecionada = reserva_selecionada.id_reserva;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <h5 class="mb-1">${nome_atividade} ${nivel_atividade}</h5>
      <p class="mb-1" id="id_reserva">ID reserva: ${reserva_selecionada.id_reserva}</p>
      <p class="mb-1">Dia: ${dia_reserva} Hora: ${hora_reserva}</p>
      <p class="mb-1">Nome do representante: ${user_nome}</p>
      <p class="mb-1">Contacto: ${reserva_selecionada.contacto}</p>
      <p class="mb-1">Profissional: ${id_profissional}</p>
      <p class="mb-1">Sala: ${num_sala} ${edificio}</p>
      <p class="mb-1">Grupo de ${reserva_selecionada.num_participantes} elementos</p>

    `;
    const modal = new bootstrap.Modal(document.getElementById('atividade'));
    modal.show();
  });
  }
  
});

//Percorre cada item da lista de Pedidos Pendentes
pedidos.forEach(item => {
  // Cria uma lista nova com os dados do pedido
  const listItem = document.createElement('a');
  listItem.className = 'list-group-item list-group-item-action';
  listItem.id = item.id_pedido;
  listItem.setAttribute('data-bs-toggle', 'modal');
  listItem.setAttribute('data-bs-target', '#primary');
  listItem.setAttribute('id_pedido', item.id_pedido);
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

  //coloca o conteúdo no list item 
  listItem.innerHTML = content;

  // adiciona o list item à list group
  listGroup.appendChild(listItem);
});

// função que corre quando algum dos itens da lista de pedidos é selecionado
listGroup.addEventListener('click', event => {
  let listItem = event.target.closest('.list-group-item');
  if (listItem) {
    let id_pedido = listItem.id;

    let index = pedidos.findIndex(function (p) {
      return p.id_pedido == id_pedido;
    });
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

    // abre o modal
    const modal = new bootstrap.Modal(document.querySelector('#primary'));
    modal.show();
  }
});

// vai buscar o elemento do modal
const modal = document.querySelector('#primary');

// remove o backdrop quando o modal é fechado
modal.addEventListener('hidden.bs.modal', () => {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
});

//Clicar no botao aceitar pedido
listGroup.addEventListener('click', event => {
  // Encontre o item selecionado na lista de pedidos.
  let listItem = event.target.closest('.list-group-item');
  // Obter o índice do item selecionado
  let id_pedido = listItem.id;
  let index = pedidos.findIndex(function (p) {
    return p.id_pedido == id_pedido;
  });

  // Adicione um evento de escuta de clique ao botão aceitar_pedido dentro do modal correspondente.
  $(document).on('click', '#aceitar_pedido', function () {
    // Obter o objeto do item selecionado usando o índice
    const selectedItem = pedidos[index];

    // Crie um objeto com as informações relevantes da atividade selecionada.
    const selectedActivity = {
      id_pedido: listItem.getAttribute('id_pedido'),
      id_atividade: listItem.getAttribute('id_atividade'),
      username: listItem.getAttribute('username'),
      contacto: listItem.getAttribute('contacto'),
      atividade: listItem.getAttribute('tipoAtividade') + " " + listItem.getAttribute('nivelAtividade'),
      dia: listItem.getAttribute('data'),
      hora: listItem.getAttribute('horas'),
      num_participantes: listItem.getAttribute('numParticipantes')
    };

    //buscar o preco por pessoa da atividade com base no ID de atividade dado no pedido
    const atividade_encontrada = lista_atividades.find(atividade => atividade.id === selectedItem.id_atividade);
    let preco_pessoa = atividade_encontrada.preco_pessoa;

    //buscar nome do cliente com base no username de atividade dado no pedido
    const username_encontrado = lista_users.find(user => user.username === selectedItem.username);
    let nome_cliente = username_encontrado.nome;
    let username_cliente = username_encontrado.username;

    //isto apenas deve acontecer se o modal de registo for aberto a partir de um pedido e não no botão de registar atividade 
    document.getElementById('num_part_registo').value = selectedActivity.num_participantes;
    document.getElementById('data_registo').value = selectedActivity.dia;
    document.getElementById('nome_registo').value = nome_cliente;
    document.getElementById('username_registo').value = username_cliente;
    document.getElementById('hora_registo').value = selectedActivity.hora;
    document.getElementById('atividade_registo').value = selectedActivity.id_atividade;
    document.getElementById('tlm_registo').value = selectedActivity.contacto;
    document.getElementById('custo_registo').value = preco_pessoa * selectedActivity.num_participantes;

    id_pedido_selecionado = selectedItem.id_pedido;

    //atualizar lista de profissionais e materiais
    carregarFieldsetsProf();
    carregarFieldsetsMateriais();
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
botao_registar_atividade.addEventListener('click', limparCamposRegistar);

function limparCamposRegistar() {
  //limpa os campos do modal de registar reserva de atividade
  document.getElementById('num_part_registo').value = "";
  document.getElementById('data_registo').value = "";
  document.getElementById('nome_registo').value = "";
  document.getElementById('username_registo').value = "";
  document.getElementById('hora_registo').value = "";
  document.getElementById('atividade_registo').value = "";
  document.getElementById('tlm_registo').value = "";
  document.getElementById('custo_registo').value = "";

  id_pedido_selecionado = 0;
}

//quando for selecionada uma atividade no registo de atividade o preço é atualizado automaticamente se já estiver preenchido o campo de nº de participantes e tbm atualiza a lista de prof
const caixa_preencher_atividade_registo = document.getElementById('atividade_registo');
caixa_preencher_atividade_registo.addEventListener('change', modificarCamposRegistar);

function modificarCamposRegistar() {
  const id_atividade = this.value;
  //buscar o preco por pessoa da atividade com base no ID de atividade dado no pedido
  const atividade_encontrada = lista_atividades.find(atividade => atividade.id === id_atividade);
  let preco_pessoa = atividade_encontrada.preco_pessoa;

  let num_participantes = document.getElementById('num_part_registo').value;
  document.getElementById('custo_registo').value = preco_pessoa * num_participantes;

  //atualizar lista de profissionais e materiais
  carregarFieldsetsProf();
  carregarFieldsetsMateriais();
}


const botao_marcar_reservar = document.getElementById('registar_reserva');
botao_marcar_reservar.addEventListener('click', registarReserva);

function registarReserva() {
  let num_participantes = document.getElementById('num_part_registo').value;
  let data_registo = document.getElementById('data_registo').value;
  let nome_registo = document.getElementById('nome_registo').value;
  let username_registo = document.getElementById('username_registo').value;
  let hora_registo = document.getElementById('hora_registo').value;
  let atividade_registo = document.getElementById('atividade_registo').value;
  let tlm_registo = document.getElementById('tlm_registo').value;
  let custo_registo = document.getElementById('custo_registo').value;
  let sala_registo = document.getElementById('local_registo').value;
  let profissional_registo = document.getElementById('gestor_registo').value;
  let material_registo = document.getElementById('material_registo').value;
  let id_reserva = Date.now();

  let precoRegex = /^\d+(\.\d{1,2})?$/;
  let contactoRegex = /^\d{9}$/;

  //buscar a quantidade no material selecionado para o workshop
  const material_selecionado = lista_materiais.find(material => material.id === material_registo);
  let qtd_material = material_selecionado.quantidade;

  //buscar a duracao da atividade selecionada para o workshop
  const atividade_selecionada = lista_atividades.find(atividade => atividade.id === atividade_registo);
  let duracao = atividade_selecionada.duracao;

  let dia_hora_string = data_registo + "T" + hora_registo + ':00Z';
  let dia_hora = new Date(dia_hora_string);
  let fim_atividade = new Date(dia_hora).getTime() + duracao * 60 * 60 * 1000;    //hora de fim do workshop a ser reservado para garantir que nao acaba quando outro já começou

  //buscar lista de reservas do profissional selecionado
  const profissional_selecionado = profissionais.find(profissional => profissional.id === profissional_registo);
  let lista_reservas_prof = profissional_selecionado.reservas_profissional;
  let indisponivel_prof = false; //fica V se ele estiver ocupado

  for (let i = 0; i < lista_reservas_prof.length; i++) {
    let reserva = lista_reservas_prof[i];
    // ver se a reserva coincide com o mesmo dia
    let data_registo = dia_hora.toDateString();
    let data_inicio = new Date(reserva.data_inicio);

    if (data_inicio.toDateString() === data_registo) {
      // se ambas forem no mesmo dia, compara as horas
      let reserva_fim_com_pausa = new Date(reserva.data_fim).getTime() + 30 * 60 * 1000;
      //let fim_atividade = new Date(dia_hora).getTime() + duracao * 60 * 60 * 1000;    //hora de fim do workshop a ser reservado para garantir que nao acaba quando outro já começou

      if (fim_atividade >= data_inicio.getTime() && dia_hora.getTime() < reserva_fim_com_pausa) {
        // The professional is busy at that hour

        indisponivel_prof = true;
        break;
      }
    }
  }

  //buscar lista de reservas da sala selecionada
  const sala_selecionada = salas.find(sala => sala.id === sala_registo);
  let capacidade_sala = sala_selecionada.capacidade;
  let lista_reservas_sala = sala_selecionada.ocupacao_salas;
  let indisponivel_sala = false; //fica V se ela estiver ocupada

  for (let i = 0; i < lista_reservas_sala.length; i++) {
    let reserva = lista_reservas_sala[i];
    // ver se a reserva coincide com o mesmo dia
    let data_registo = dia_hora.toDateString();
    let data_inicio = new Date(reserva.data_inicio);

    if (data_inicio.toDateString() === data_registo) {
      // se ambas forem no mesmo dia, compara as horas
      let reserva_fim_com_pausa = new Date(reserva.data_fim).getTime() + 30 * 60 * 1000;
      //let fim_atividade = new Date(dia_hora).getTime() + duracao * 60 * 60 * 1000;    //hora de fim do workshop a ser reservado para garantir que nao acaba quando outro já começou

      if (fim_atividade >= data_inicio.getTime() && dia_hora.getTime() < reserva_fim_com_pausa) {
        // a sala está ocupada naquela hora
        indisponivel_sala = true;
        break;
      }
    }
  }

  // Verificar se todos os campos foram preenchidos
  if (num_participantes == "" || nome_registo == "" || username_registo == "" || data_registo == "" || hora_registo == "" || tlm_registo == "" || sala_registo.length === 0 || custo_registo == "" || profissional_registo === 0 || atividade_registo === 0 || material_registo === 0) {
    erroInput("Por favor, preencha todos os campos");
    return;
  } else if (!contactoRegex.test(tlm_registo)) {
    erroInput("Por favor, insira um número de contato válido (9 dígitos).");
    return;
  } else if (num_participantes > capacidade_sala) {
    erroInput("A sala não tem capacidade para " + num_participantes + " participantes, selecione outra");
    return;
  } else if (!precoRegex.test(custo_registo)) {
    erroInput("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
    return;
  } else if (indisponivel_prof) {    //true se o profissional estiver ocupado naquela hora
    erroInput("O profissional não está disponível nessa hora!");
  } else if (indisponivel_sala) {
    erroInput("A sala não está disponível nessa hora!");
  } else if (num_participantes > qtd_material) {
    erroInput("Não existem kits suficientes para realizar o workshop!");
    return;
  } else {
    let reserva = {
      id_reserva: id_reserva,
      id_atividade: atividade_registo,
      dia_hora: dia_hora,
      custo_total: custo_registo,
      contacto: tlm_registo,
      id_sala: sala_registo,
      id_profissional: profissional_registo,
      id_material: material_registo,
      username: username_registo,
      num_participantes: num_participantes
    };

    //ir a profissional e sala acrescentar a reserva ao seu array de reservas individual
    const atividade_encontrada = lista_atividades.find(atividade => atividade.id === atividade_registo);
    let duracao = atividade_encontrada.duracao;
    let reserva_ocup = {
      id_reserva: id_reserva,
      data_inicio: dia_hora,
      data_fim: new Date(dia_hora.getTime() + (duracao * 60 * 60 * 1000))
    }

    //ACRESCENTAR RESERVA À LISTA DO PROFISSIONAL
    // Procurar pelo profissional com o ID correspondente
    let index_profissional = profissionais.findIndex(function (p) {
      return p.id === profissional_registo;
    });
    profissionais[index_profissional].reservas_profissional.push(reserva_ocup);
    // Armazenar os dados atualizados no local storage
    localStorage.setItem('profissionais', JSON.stringify(profissionais));

    //ACRESCENTAR RESERVA À LISTA DO PROFISSIONAL
    // Procurar pelo profissional com o ID correspondente
    let index_sala = salas.findIndex(function (p) {
      return p.id === sala_registo;
    });
    salas[index_sala].ocupacao_salas.push(reserva_ocup);
    // Armazenar os dados atualizados no local storage
    localStorage.setItem('salas', JSON.stringify(salas));

    // Adiciona a nova reserva à lista de reservas
    lista_reservas.push(reserva);

    // Armazenar os dados atualizados no local storage
    localStorage.setItem('reservas', JSON.stringify(lista_reservas));

    //ALTERAR ESTADO DO PEDIDO
    // Procurar pelo pedido com o ID correspondente
    let index = pedidos.findIndex(function (p) {
      return p.id_pedido === id_pedido_selecionado;
    });
    pedidos[index].estado = 'confirmado';

    // Armazenar os dados atualizados no local storage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    //ATUALIZAR QUANTIDADE DO MATERIAL
    // Procurar pelo material com o ID correspondente
    let index_material = lista_materiais.findIndex(function (p) {
      return p.id === material_registo;
    });
    lista_materiais[index_material].quantidade = qtd_material - num_participantes;

    // Armazenar os dados atualizados no local storage
    localStorage.setItem('materiais', JSON.stringify(lista_materiais));

    id_pedido_selecionado = 0;

    location.reload();

    // Exibir uma mensagem de sucesso
    setTimeout(function () {
      toastifyAlerta('Reserva adicionada com sucesso!');
    }, 1000);

  }
}

//reserva é cancelada
const botao_cancelar_reservar = document.getElementById('cancelar_workshop');
botao_cancelar_reservar.addEventListener('click', cancelarWorkshop);

function cancelarWorkshop() {
  // Procurar pela reserva com o ID correspondente
  let index = lista_reservas.findIndex(function (p) {
    return p.id_reserva === id_reserva_selecionada;
  });

  //REMOVER TBM DAS LISTAS DE PROFISSIONAIS E SALAS
  let id_sala = lista_reservas[index].id_sala;
  let id_profissional = lista_reservas[index].id_profissional;
  let id_material = lista_reservas[index].id_material;
  let num_participantes = parseInt(lista_reservas[index].num_participantes);

  //selecionar ID do profissional responsável pela atividade
  let index_prof = profissionais.findIndex(function (p) {
    return p.id === id_profissional;
  });

  //aceder a lista de reservas do profissional selecionado
  let index_lista = profissionais[index_prof].reservas_profissional.findIndex(function (p) {
    return p.id_reserva === id_reserva_selecionada;
  });

  // Verificar se o ID da lista reservas do profissional foi encontrado
  if (index_lista == -1) {
    erroInput('Não foi encontrado nenhuma reserva com o ID especificado na lista de reservas do profissional.');
    return;
  }
  // Remover a reserva da lista do profissional encontrado
  profissionais[index_prof].reservas_profissional.splice(index_lista, 1);
  // Armazenar a lista atualizada de profissionais no local storage
  localStorage.setItem('profissionais', JSON.stringify(profissionais));


  //selecionar ID da sala da atividade
  let index_sala = salas.findIndex(function (p) {
    return p.id === id_sala;
  });

  //aceder a lista de reservas da sala selecionado
  let index_lista_s = salas[index_sala].ocupacao_salas.findIndex(function (p) {
    return p.id_reserva === id_reserva_selecionada;
  });

  // Verificar se o ID da lista reservas da sala foi encontrado
  if (index_lista_s === -1) {
    erroInput('Não foi encontrado nenhuma reserva com o ID especificado na lista de reservas da sala.');
    return;
  }
  // Remover a reserva da lista da sala encontrada
  salas[index_sala].ocupacao_salas.splice(index_lista_s, 1);
  // Armazenar a lista atualizada de salas no local storage
  localStorage.setItem('salas', JSON.stringify(salas));


  //voltar a repor material que nao foi utilizado
  let index_lista_m = lista_materiais.findIndex(function (p) {
    return p.id === id_material;
  });

  lista_materiais[index_lista_m].quantidade += num_participantes;
  localStorage.setItem('materiais', JSON.stringify(lista_materiais));

  // Verificar se o ID foi encontrado
  if (index === -1) {
    erroInput('Não foi encontrado nenhuma reserva com o ID especificado.');
    return;
  }

  // Remover a reserva encontrada
  lista_reservas.splice(index, 1);

  // Armazenar a lista atualizada de profissionais no local storage
  localStorage.setItem('reservas', JSON.stringify(lista_reservas));

  // Limpar o campo de entrada do ID
  id_reserva_selecionada = 0;

  // Atualizar a tabela com a lista atualizada de profissionais
  location.reload();

  // Exibir uma mensagem de sucesso
  setTimeout(function () {
    toastifyAlerta('Reserva cancelada com sucesso!');
  }, 1000);

}

function toastifyAlerta(mensagem) {
  Toastify({
    text: mensagem,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "#223843",
  }).showToast();
}

function erroInput(mensagem) {
  Swal.fire({
    icon: "error",
    confirmButtonColor: '#d77a61',
    text: mensagem

  })
}