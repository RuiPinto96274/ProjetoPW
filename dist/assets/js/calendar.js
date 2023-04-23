document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt',
        contentHeight: 650,
        plugins: ['interaction', 'dayGrid'],
        defaultDate: new Date(),
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'Crochê I',
                start: '2023-04-01T10:30:00'
            },
            {
                title: 'Pintura L',
                start: '2023-04-07T15:30:00'
            },
            {
                title: 'Escultura L',
                start: '2023-04-11T14:00:00'
            },
            {
                title: 'Bordado L',
                start: '2023-04-12T10:30:00'
            },
            
            {
                title: 'Bordado I',
                start: '2023-04-12T14:30:00'
            },
            {
                title: 'Cerâmica L',
                start: '2023-04-12T15:30:00'
            },
            {
                title: 'Escultura I',
                start: '2023-04-12T15:00:00'
            },
            {
                title: 'Pintura I',
                start: '2023-04-13T09:00:00'
            }
        ]
    });

    calendar.render();
});