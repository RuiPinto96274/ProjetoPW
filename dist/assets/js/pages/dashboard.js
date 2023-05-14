const reservas = JSON.parse(localStorage.getItem('reservas')) || []


window.addEventListener('load', function() {
    atualizarAtivMensais();
    atualizarbarPorAtiv();

});

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
		const dataAtual = new Date();
	
		// Filtra os valores com base na data atual
		const filtrarReservas = reservas.filter(reservas => new Date(reservas.data) < dataAtual);
	
		// Agrupa os valores por mês
		const valoresPorMes = Array(12).fill(0); // Array para armazenar os valores mensais, inicialmente preenchido com zeros
	
		filtrarReservas.forEach(reserva => {
		const reservasData = new Date(reserva.data);
		const mes = reservasData.getMonth();
	
		valoresPorMes[mes] += 1; // Incrementa o valor correspondente ao mês
		});
	
		// Atualiza os dados do gráfico de barras
		optionsAtivMensais.series[0].data = valoresPorMes;
	
	
	
	}

	var chartAtivMensais = new ApexCharts(document.querySelector("#chart-Ativ-Mensais"), optionsAtivMensais);
	chartAtivMensais.render();
}


const lista_atividades = JSON.parse(localStorage.getItem('atividades')) || [];

function atualizarbarPorAtiv(){

	if (reservas !== null) {
		const dataAtual = new Date();
		const categorias = ["Bordado", "Costura", "Crochê", "Cerâmica", "Escultura", "Pintura"];
		const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
	  

		// Filtra os valores com base na data atual
		const filtrarReservas = reservas.filter(reservas => new Date(reservas.data) < dataAtual);
	
		// Inicializa os dados das séries com zeros para cada categoria e mês
		const dadosSeries = categorias.map(categoria => ({
			name: categoria,
			data: Array(12).fill(0)
		  }));
		
		filtrarReservas.forEach(reserva => {
			const reservaData = new Date(reserva.data);
			const mes = reservaData.getMonth();
			
			for (var i = 0; i < lista_atividades.length; i++) {
				if (lista_atividades[i].id === reserva.id) {
				  var categoria = lista_atividades[i].nome;
				  break; // Interrompe o loop assim que encontrar a correspondência
				}
			  }
		
			const categoriaIndex = categorias.indexOf(categoria);
			if (categoriaIndex !== -1) {
				dadosSeries[categoriaIndex].data[mes] += 1; // Incrementa o valor correspondente ao mês
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

/* Ainda nao passei tudo
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
		name: 'reservas'//,
		//data: [9,20,30,20,10,20,30,20,10,20,30,20]
	}],
	colors: '#D77A61',
	xaxis: {
		categories: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul", "Ago","Set","Out","Nov","Dez"],
	},
}

//Distribuição das atividades
let optionsPercentAtiv  = {
	series: [17, 16.33, 16.33, 17, 17.50, 17],
	labels: ['Bordado', 'Costura','Crochê','Cerâmica','Escultura','Pintura'],
	colors: ['#223843', '#89959B', '#B2B4BA', '#D8B4A0', '#D89781', '#D77A61'],
	chart: {
		type: 'donut',
		width: '100%',
		height:'350px'
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
//Atividades mensais por tipo
var barOptionsPorAtiv = {
	series: [
	  {
		name: "Bordado",
		data: [2,2,5,3,2,3,6,3,2,4,6,3],
	  },
	  {
		name: "Costura",
		data: [1,3,6,4,1,3,5,3,2,2,6,3],
	  },
	  {
		name: "Crochê",
		data: [2,5,4,3,2,3,4,3,2,3,5,3],
	  },
	  {
		name: "Cerâmica",
		data: [2,4,4,4,2,4,4,4,2,3,4,4],
	  },
	  {
		name: "Escultura",
		data: [2,4,5,3,2,4,5,3,2,4,5,4],
	  },
	  {
		name: "Pintura",
		data: [1,3,6,3,2,4,6,4,1,4,4,3],
	  },
	],
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
  

if (reservas !== null) {
	const dataAtual = new Date();

	// Filtra os valores com base na data atual
	const filtrarReservas = reservas.filter(reservas => new Date(reservas.data) < dataAtual);

	// Agrupa os valores por mês
	const valoresPorMes = Array(12).fill(0); // Array para armazenar os valores mensais, inicialmente preenchido com zeros

	filtrarReservas.forEach(reserva => {
	const reservasData = new Date(reserva.data);
	const mes = reservasData.getMonth();

	valoresPorMes[mes] += 1; // Incrementa o valor correspondente ao mês
	});

	// Atualiza os dados do gráfico de barras
	optionsAtivMensais.series[0].data = valoresPorMes;



}


var barPorAtiv = new ApexCharts(document.querySelector("#barPorAtiv"), barOptionsPorAtiv);
var chartAtivMensais = new ApexCharts(document.querySelector("#chart-Ativ-Mensais"), optionsAtivMensais);
var chartPercentAtiv = new ApexCharts(document.getElementById('chart-Percent-Ativ'), optionsPercentAtiv);

chartAtivMensais.render();
chartPercentAtiv.render();
barPorAtiv.render();
*/
