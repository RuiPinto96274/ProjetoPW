const app2 = new Vue({
  el: '#form_inscricao',
  data: {
      atividades: JSON.parse(localStorage.getItem('atividades')),
      reservas: JSON.parse(localStorage.getItem('reservas')),
      pedidos: JSON.parse(localStorage.getItem('pedidos')) || [],
      isUserLoggedIn: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false,
      loggedUser: JSON.parse(localStorage.getItem('currentUser')) || {},
      DiaAtual: '',
      HoraAtual: '',
      nome:(JSON.parse(localStorage.getItem('currentUser')) || {}).nome || '',
      telefone:'',
      atividadeSelecionada: '',
      numParticipantes: '',
      dia:'',
      horas:''
  },
  methods: {
      getAtividade() {
          return this.atividades.find(a => a.id === this.atividadeSelecionada);
      },
      minCap() {
          const atividade = this.getAtividade();
          return atividade ? parseInt(atividade.min_cap) : 0;
      },
      maxCap() {
          const atividade = this.getAtividade();
          return atividade ? parseInt(atividade.max_cap) : 0;
      },
      validarDataHora() {
          const dataHoraSelecionada = new Date(this.dia + 'T' + this.horas);
          const dataHoraAtual = new Date();
          
          return dataHoraSelecionada > dataHoraAtual;
      },
      submitForm(){
          if (localStorage.getItem('isUserLoggedIn') === 'true') {
              let username = this.loggedUser.username;
              let nome = this.nome;
              let contacto = this.telefone;
              let id_atividade = this.atividadeSelecionada;
              let numParticipantes = this.numParticipantes;
              let data = this.data;
              let horas = this.horas;
              
              if (this.nome === "" ||this.telefone === "" ||this.atividadeSelecionada === "" ||this.numParticipantes === "" ||this.dia === "" ||this.horas === "") {
                  // Campos vazios, exibir mensagem de erro ou fazer o que for apropriado
                  Toastify({
                      text: 'Por favor, preencha todos os campos obrigatórios.',
                      duration: 1000, // duração da mensagem de exibição em ms
                      close: true,
                      gravity: 'top', // posição da mensagem na tela
                      position: 'center',
                      backgroundColor: '#8B0000'
                  }).showToast();
                  return;
              } else if(!this.validarDataHora()){
                // Data e hora são inválidas, exiba uma mensagem de erro ou faça o que for apropriado
                Toastify({
                    text: 'A data e a hora selecionadas são anteriores ao dia de hoje.',
                    duration: 1000, // duração da mensagem de exibição em ms
                    close: true,
                    gravity: 'top', // posição da mensagem na tela
                    position: 'center',
                    backgroundColor: '#8B0000'
                }).showToast();
                return;
              }

              let pedido = {
                  id_pedido: Date.now(), // retorna o número de milissegundos desde 1º de janeiro de 1970 00:00:00 UTC. Como esse número é exclusivo para cada milissegundo, é improvável que haja conflitos entre IDs.
                  username: username,
                  nome: nome,
                  contacto: contacto,
                  id_atividade: id_atividade,
                  numParticipantes: numParticipantes,
                  data: data,
                  horas: horas,
                  estado: 'pendente' // inicializa o estado como 'pendente'
              };
              this.pedidos.push(pedido);

              localStorage.setItem('pedidos', JSON.stringify(this.pedidos));

              Toastify({
                  text: 'Inscrição realizada com sucesso!',
                  duration: 1000, // duração da mensagem de exibição em ms
                  close: true,
                  gravity: 'top', // posição da mensagem na tela
                  position: 'center',
                  backgroundColor: '#223843'
              }).showToast();
              
              setTimeout(() => {
                  location.reload();
              }, 1000);
          }
      }
  },
  computed: {
      opcoesNumParticipantes() {
          const minCap = this.minCap();
          const maxCap = this.maxCap();
          return Array.from({ length: maxCap - minCap + 1 }, (_, i) => i + minCap);
      },
  },
});