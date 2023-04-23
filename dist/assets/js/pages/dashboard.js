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
		name: 'sales',
		data: [9,20,30,20,10,20,30,20,10,20,30,20]
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
  


var barPorAtiv = new ApexCharts(document.querySelector("#barPorAtiv"), barOptionsPorAtiv);
var chartAtivMensais = new ApexCharts(document.querySelector("#chart-Ativ-Mensais"), optionsAtivMensais);
var chartPercentAtiv = new ApexCharts(document.getElementById('chart-Percent-Ativ'), optionsPercentAtiv)

chartAtivMensais.render();
chartPercentAtiv.render();
barPorAtiv.render();