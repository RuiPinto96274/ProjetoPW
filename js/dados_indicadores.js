let lista_profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
let lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];

window.onload=function atualizarIndicadores(){
    //Indicador 1
    //buscar array de reservas, selecionar os que têm data e hora inferior à atual e para cada reserva ir somando o numero de participantes
    let numParticipantesRealizados = reservas.reduce((total, reserva) => {
        let dataReserva = new Date(reserva.dia_hora);
        let dataAtual = new Date();
      
        if (dataReserva < dataAtual) {
          return total + parseInt(reserva.num_participantes);
        } else {
          return total;
        }
      }, 0);
      
    document.getElementById("indicador1").innerHTML = numParticipantesRealizados;
    //Indicador 2
    let num_funcionarios = lista_profissionais.length;

    document.getElementById("indicador2").innerHTML = num_funcionarios;

    //Indicador 3
    //buscar array de reservas, e somar todas aquelas que a data é inferior à atual
    let reservasRealizadas = reservas.filter(reserva => {
        let dataReserva = new Date(reserva.dia_hora);
        let dataAtual = new Date();
        return dataReserva < dataAtual;
    });
    document.getElementById("indicador3").innerHTML = reservasRealizadas.length;

    //Indicador 4
    //percorrer todas as reservas, buscar a duração da respetiva atividade e soma-las?
    let duracaoTotal=0
    for(let i=0;i<reservasRealizadas.length;i++){
        let atividade_encontrada = lista_atividades.find(atividade => atividade.id === reservasRealizadas[i].id_atividade);
        let duracao=parseInt(atividade_encontrada.duracao);
        duracaoTotal+=duracao;
    }
    document.getElementById("indicador4").innerHTML = duracaoTotal;
}