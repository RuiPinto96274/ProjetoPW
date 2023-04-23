const dados_salas = [
    {
        id: 1,
        n_sala: 1,
        edificio: 'Estúdio Principal',
        capacidade:7
    },
    {
        id: 2,
        n_sala: 2,
        edificio: 'Estúdio Principal',
        capacidade:11
    },
    {
        id: 3,
        n_sala: 3,
        edificio: 'Estúdio Principal',
        capacidade:10
    },
    {
        id: 4,
        n_sala: 4,
        edificio: 'Estúdio Principal',
        capacidade:8
    },
    {
        id: 5,
        n_sala: 5,
        edificio: 'Estúdio Principal',
        capacidade:9
    },
    {
        id: 6,
        n_sala: 6,
        edificio: 'Estúdio Principal',
        capacidade:10
    }
];

const table_salas = document.querySelector('#tabela_salas tbody');

dados_salas.forEach(item => {
    const row = table_salas.insertRow();
    row.innerHTML = `
      <td>${item.id}</td>
      <td class="text-bold-500">${item.n_sala}</td>
      <td>${item.edificio}</td>
      <td class="text-bold-500">${item.capacidade}</td>
    `;
});