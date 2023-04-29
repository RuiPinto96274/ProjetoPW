document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt',
        contentHeight: 650,
        plugins: ['interaction', 'dayGrid'],
        defaultDate: new Date(),
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: []
    });
  
  //atividades confirmadas do localStorage
  var atividades = JSON.parse(localStorage.getItem('dados_atividades')) || [];

  // iterar por cada atividade e adicionar ao calendário
  atividades.forEach(function (atividade) {

    var evento = {
      title: atividade.type,
      start: atividade.date + 'T' + atividade.time,
      allDay: true,
    };  
    calendar.addEvent(evento);
  });
    calendar.render();
});