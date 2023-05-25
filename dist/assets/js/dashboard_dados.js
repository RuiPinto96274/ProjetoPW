let profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
let lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];

window.addEventListener('load', function() {
    atualizarIndicadores();
    atualizarAtivMensais();
    atualizarbarPorAtiv();
	atualizarPercentAtiv();
});

function atualizarIndicadores(){
    //Indicador 1
    //buscar array de reservas, selecionar os que têm data e hora inferior à atual e para cada reserva ir somando o numero de participantes
    //document.getElementById("indicador1").innerHTML = ###;   -o valor aqui é a soma de todos os participantes de todas as atividades já realizadas
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
    let num_funcionarios = profissionais.length;

    document.getElementById("indicador2").innerHTML = num_funcionarios;

    //Indicador 3
    //buscar array de reservas, e somar todas aquelas que a data é inferior à atual
    let reservasRealizadas = reservas.filter(reserva => {
        let dataReserva = new Date(reserva.dia_hora);
        let dataAtual = new Date();
        return dataReserva < dataAtual;
    }).length;

    document.getElementById("indicador3").innerHTML = reservasRealizadas;
    //document.getElementById("indicador3").innerHTML = ###;   -o valor aqui é a soma de todas as atividades já realizadas
}

//graficos
function atualizarAtivMensais(){
	//Atividades mensais
	var optionsAtivMensais = {
		annotations: {
			position: 'back'
		},
		dataLabels: {
			enabled:false
		},
		chart: {
			type: 'bar',
			height: 300
		},
		fill: {
			opacity:1
		},
		plotOptions: {
		},
		series: [{
			name: 'reservas'

		}],
		colors: '#D77A61',
		xaxis: {
			categories: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul", "Ago","Set","Out","Nov","Dez"],
		},
	}

	if (reservas !== null) {
		let filtrarReservas = reservas.filter(reserva => {
			let dataReserva = new Date(reserva.dia_hora);
			let dataAtual = new Date();
			return dataReserva < dataAtual;
		});
	
		// Agrupa os valores por mês
		let valoresPorMes = Array(12).fill(0); // Array para armazenar os valores mensais, inicialmente preenchido com zeros
	
		filtrarReservas.forEach(reserva => {
		let reservasData = new Date(reserva.dia_hora);
		let mes = reservasData.getMonth();
	
		valoresPorMes[mes] += 1; // Incrementa o valor correspondente ao mês
		});
	
		// Atualiza os dados do gráfico de barras
		optionsAtivMensais.series[0].data = valoresPorMes;
	}

	var chartAtivMensais = new ApexCharts(document.querySelector("#chart-Ativ-Mensais"), optionsAtivMensais);
	chartAtivMensais.render();
}


function atualizarbarPorAtiv(){
	let dadosSeries = [];

	if (reservas !== null) {
		const categorias = ["Bordado", "Costura", "Crochê", "Cerâmica", "Escultura", "Pintura"];

		let filtrarReservas = reservas.filter(reserva => {
			let dataReserva = new Date(reserva.dia_hora);
			let dataAtual = new Date();
			return dataReserva < dataAtual;
		});
	
		// Inicializa os dados das séries com zeros para cada categoria e mês
		dadosSeries = categorias.map(categoria => ({  
			name: categoria,
			data: Array(12).fill(0), 
		  }));
		
		filtrarReservas.forEach(reserva => {
			let reservaData = new Date(reserva.dia_hora);
			let mes = reservaData.getMonth();
			
			let categoriaAtiv = null;
			 
			for (let i = 0; i < lista_atividades.length; i++) {
				if (lista_atividades[i].id === reserva.id_atividade) {
					categoriaAtiv = lista_atividades[i].nome;
				 	break;
				}
			}

			let categoriaIndex = categorias.indexOf(categoriaAtiv);
			if (categoriaIndex !== -1) {
				dadosSeries[categoriaIndex].data[mes] += 1; 
			}
		});
	}

	//Atividades mensais por tipo
	var barOptionsPorAtiv = {
		series: dadosSeries,
		chart: {
		type: "bar",
		height: 350,
		},
		plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: "55%",
			endingShape: "rounded",
		},
		},
		dataLabels: {
		enabled: false,
		},
		stroke: {
		show: true,
		width: 2,
		colors: ["transparent"],
		},
		xaxis: {
		categories: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul", "Ago","Set","Out","Nov","Dez"],
		},
		yaxis: {
		title: {
			text: "Atividades Realizadas",
			style: {
				fontFamily: "Nunito",
				color: "#25396f",
			},
		},
		},
		fill: {
		opacity: 1,
		},
		tooltip: {
		y: {
			formatter: function(val) {
			return val + " atividades realizadas";
			},
		},
		},
		colors: ['#223843', '#89959B', '#B2B4BA', '#D8B4A0', '#D89781', '#D77A61']
	};

	

	var barPorAtiv = new ApexCharts(document.querySelector("#barPorAtiv"), barOptionsPorAtiv);
	barPorAtiv.render();

}

function atualizarPercentAtiv() {
    let dadosSeries = [];
	var dadosPorcentagem =[];

    if (reservas !== null) {
        var categorias = ['Bordado', 'Costura', 'Crochê', 'Cerâmica', 'Escultura', 'Pintura'];

        var filtrarReservas = reservas.filter(reserva => {
            let dataReserva = new Date(reserva.dia_hora);
            let dataAtual = new Date();
            return dataReserva < dataAtual;
        });

        // Inicializa os dados das séries com zeros para cada categoria
        dadosSeries = categorias.map(() => 0);

        filtrarReservas.forEach(reserva => {
            for (let i = 0; i < lista_atividades.length; i++) {
                if (lista_atividades[i].id === reserva.id_atividade) {
                    let categoria = lista_atividades[i].nome;
                    let categoriaIndex = categorias.indexOf(categoria);
                    if (categoriaIndex !== -1) {
                        dadosSeries[categoriaIndex] += 1;
                    }
                    break;
                }
            }
        });
    }

    let totalFiltrarReservas = filtrarReservas.length;

    // Verificar se totalFiltrarReservas é maior que zero
    if (totalFiltrarReservas > 0) {

        dadosPorcentagem = dadosSeries.map(valor => {
            if (typeof valor === "number" && valor !== 0) {
                return ((valor / totalFiltrarReservas) * 100);
            } else {
                return 0;
            }
        });
	
        // Distribuição das atividades
        var optionsPercentAtiv = {
            series: dadosPorcentagem,
            labels: categorias,
            colors: ['#223843', '#89959B', '#B2B4BA', '#D8B4A0', '#D89781', '#D77A61'],
            chart: {
                type: 'donut',
                width: '100%',
                height: '350px'
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '30%'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    },
                },
            },
        }

        var chartPercentAtiv = new ApexCharts(document.getElementById('chart-Percent-Ativ'), optionsPercentAtiv);
        chartPercentAtiv.render();
    }
}

function getReservasDoDia() {
	let hoje = new Date(); // Obtém a data atual

	// Define a data de hoje sem informações de hora, minutos e segundos
	let dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

	let reservasDoDia = [];
	reservas.forEach(function (reserva) {
	  let dataReserva = new Date(reserva.dia_hora); 
	  // Define a data da reserva sem informações de hora, minutos e segundos
	  let dataReservaSemHora = new Date(dataReserva.getFullYear(), dataReserva.getMonth(), dataReserva.getDate());

	  if (dataReservaSemHora.getTime() === dataAtual.getTime()) {
		reservasDoDia.push(reserva);
	  }
	});
	return reservasDoDia;
  }

let lista_reservas_hoje= getReservasDoDia();
  
//dados atividades dia atual
const atividades_hoje=new Vue({
	el: '#atividades_hoje',
	data:{
		reservas: lista_reservas_hoje,
		salas: JSON.parse(localStorage.getItem('salas')) || [],
		atividades: JSON.parse(localStorage.getItem('atividades')) || [],
		iconeAtividades: {
			"Bordado": "assets/images/icon/icon-embroidery.png",
			"Costura": "assets/images/icon/icon-sewing.png",
			"Crochê": "assets/images/icon/icon-crochet.png",
			"Cerâmica": "assets/images/icon/icon-ceramic.png",
			"Escultura": "assets/images/icon/icon-sculpture.png",
			"Pintura": "assets/images/icon/icon-art.png"
		}
	},
	methods: {
		getAtividade(idAtividade){
			return this.atividades.find((atividade) => atividade.id == idAtividade);
		},
		getNumSala(idSala){
			return this.salas.find((sala) => sala.id == idSala)?.numSala;
		},
		getIconeAtividade(nomeAtividade) {
			return this.iconeAtividades[nomeAtividade];
		}
	}
});