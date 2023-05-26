document.addEventListener('DOMContentLoaded', function () {

    let calendarEl = document.getElementById('calendar');
   
    let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt',
        contentHeight: 'auto',
        plugins: ['interaction', 'dayGrid'],
        defaultDate: new Date(),
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: [],
        eventRender: function(info) {
          $(info.el).tooltip({ 
            title: info.event.extendedProps.description,
            placement: "top",
            trigger: "manual",
            container: "body",
            animation: false,
          });
          $(info.el).on('mouseenter', function() {
            $(this).tooltip('show');
          });
          $(info.el).on('mouseleave', function() {
            $(this).tooltip('hide');
          });
        }
    });

  //atividades confirmadas do localStorage
  let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  let atividades = JSON.parse(localStorage.getItem('atividades')) || [];
  // iterar por cada atividade e adicionar ao calendário
  reservas.forEach(reserva => {
      //buscar nome e nivel da atividade com base no ID de atividade dado na reserva
    let atividade_encontrada = atividades.find(atividade => atividade.id === reserva.id_atividade);
    if(atividade_encontrada){
      let nome_atividade = atividade_encontrada.nome;
      let nivel_atividade = atividade_encontrada.nivel;
      let data = new Date(reserva.dia_hora);
      let dia_reserva = data.toISOString().split('T')[0];
      let hora_reserva = data.toISOString().split('T')[1].split('.')[0];
      let duracao_em_minutos = parseFloat(atividade_encontrada.duracao) * 60;
      let data_fim=new Date(data.getTime() + duracao_em_minutos*60000);
      let evento = {
          title: nome_atividade + ' ' + nivel_atividade,
          start: dia_reserva + 'T' + hora_reserva,
          end: data_fim.toISOString(),
          extendedProps: {
            description: hora_reserva + ' ' + nome_atividade + ' ' + nivel_atividade // add description to use in tooltip
          }
      };  
      calendar.addEvent(evento);
    }
  });
    calendar.render();
});

