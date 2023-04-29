const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

window.addEventListener('load', function() {
    atualizarIndicadores();
});

function atualizarIndicadores(){
    //Indicador 1
    //buscar array de reservas, selecionar os que têm data e hora inferior à atual e para cada reserva ir somando o numero de participantes
    //document.getElementById("indicador1").innerHTML = ###;   -o valor aqui é a soma de todos os participantes de todas as atividades já realizadas

    //Indicador 2
    let num_funcionarios = profissionais.length;
    console.log(num_funcionarios);
    document.getElementById("indicador2").innerHTML = num_funcionarios;

    //Indicador 3
    //buscar array de reservas, e somar todas aquelas que a data é inferior à atual
    //document.getElementById("indicador3").innerHTML = ###;   -o valor aqui é a soma de todas as atividades já realizadas

}