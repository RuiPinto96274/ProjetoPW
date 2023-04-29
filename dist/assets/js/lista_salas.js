const tabela = document.getElementById("table-body");
const salas = JSON.parse(localStorage.getItem('salas')) || [];
const linhas = tabela.querySelectorAll('tbody tr');
let linhaSelecionada = null;

window.addEventListener('load', function() {
    atualizarTabela();
});

function limparFormulario(){
    document.getElementById("id").value = "";
    document.getElementById("numSala").value = "";
    document.getElementById("edificio").value = "";

}

function atualizarTabela(){
    // Limpa os dados da tabela antes de atualizar
    tabela.innerHTML = '';
        
    function inserirCelula(linha, valor) {
        const celula = linha.insertCell();
        celula.innerHTML = valor;
    }
    
    salas.forEach(function(sala) {
        const newRow = tabela.insertRow();
        
        inserirCelula(newRow, sala.id);
        inserirCelula(newRow, sala.numSala);
        inserirCelula(newRow, sala.edificio);
        inserirCelula(newRow, sala.capacidade.join(', '));

        newRow.addEventListener('click', function() {
            if (linhaSelecionada === newRow) {
                // Desseleciona a linha atual
                newRow.style.backgroundColor = '';
                newRow.style.color = '';
                // Limpa os campos do formulário
                document.getElementById('id').value = '';
                document.getElementById('numSala').value = '';
                document.getElementById('edificio').value = '';
                // Define a linha selecionada como nula
                linhaSelecionada = null;
            } else {
                if (linhaSelecionada !== null) {
                    // Remove a seleção da linha anteriormente selecionada
                    linhaSelecionada.style.backgroundColor = '';
                    linhaSelecionada.style.color = '';
                }
                // Define a cor de fundo da linha atual como a cor de seleção
                newRow.style.backgroundColor = '#223843';
                newRow.style.color = '#FFFFFF';
                // Armazena a nova linha selecionada na variável de estado
                linhaSelecionada = newRow;

                // Preenche os campos do formulário com os valores da sala selecionado
                document.getElementById('id').value = sala.id;
                document.getElementById('numSala').value = sala.numSala;
                document.getElementById('edificio').value = sala.edificio;
            }
        });
    });
}

document.getElementById("top-center").addEventListener("click", function() {
    // Obtém os valores dos campos do formulário
    let id = document.getElementById('id').value;
    let numSala = document.getElementById('numSala').value;
    let edificio = document.getElementById('edificio').value;
    let selectElement = document.getElementById('capacidade');
    let selectedOptions = Array.from(selectElement.selectedOptions);
    let capacidade = selectedOptions.map(option => option.value);
    console.log(capacidade);

    
    // Verifica se o ID já existe na lista de salas
    for (let i = 0; i < salas.length; i++) {
        if (salas[i].id === id) {
            alert("Já existe uma sala com o ID inserido. Por favor, insira um ID diferente.");
            return;
        }
    }


    if (id == "" || numSala == "" || edificio == "" || capacidade.length === 0) {
        alert("Por favor, preencha todos os campos antes de inserir os dados.");
        return;
    }else if (isNaN(id)) {
        alert("O ID deve conter apenas valores numéricos");
    }else if (isNaN(numSala)) {
        alert("O número da sala deve conter apenas valores numéricos");
    }else{
        // Cria um objeto com os dados do sala
    let sala = {
        id: id,
        numSala: numSala,
        edificio: edificio,
        capacidade: capacidade
    };

    // Adiciona o novo sala à lista de salas
    salas.push(sala);

    // Armazena a lista atualizada de salas em local storage
    localStorage.setItem('salas', JSON.stringify(salas));

    // limpar os campos de entrada após a inserção
    limparFormulario();

    // Exibir uma mensagem de sucesso
    alert('Sala adicionado com sucesso!');
    atualizarTabela();
    }
});


document.getElementById("top-right-update").addEventListener("click", function() {
    // Obter o ID da sala a ser alterado
    let id = document.getElementById('id').value;
  

    // Procurar a sala com o ID correspondente
    let index = salas.findIndex(function (p) {
      return p.id === id;
    });
  
    // Verificar se o ID foi encontrado
    if (index === -1) {
      alert('Não foi encontrado nenhuma sala com o ID especificado.');
      return;
    }
    
    // Obter os novos dados a partir do formulário
    let numSala = document.getElementById('numSala').value;
    let edificio = document.getElementById('edificio').value;
    let selectElement = document.getElementById('capacidade');
    let selectedOptions = Array.from(selectElement.selectedOptions);
    let capacidade = selectedOptions.map(option => option.value);
    console.log(capacidade);


    // Verificar se todos os campos foram preenchidos
    if (id == "" || numSala == "" || edificio == "" || capacidade.length === 0) {
        alert("Por favor, preencha todos os campos antes de atualizar os dados.");
        return;
    }else if (isNaN(id)) {
        alert("O ID deve conter apenas valores numéricos");
    }else if (isNaN(numSala)) {
        alert("O número da sala deve conter apenas valores numéricos");
    }else{
    // Atualizar os dados da sala
    salas[index].numSala = numSala;
    salas[index].edificio = edificio;
    salas[index].capacidade = capacidade;

    // Armazenar os dados atualizados no local storage
    localStorage.setItem('salas', JSON.stringify(salas));
  
    // Limpar o formulário
    limparFormulario();
  
    // Exibir uma mensagem de sucesso
    alert('Sala alterada com sucesso!');
    atualizarTabela();
    }
});


document.getElementById("top-right-remove").addEventListener("click", function() {
     // Obter o ID da sala a ser removido
     let id = document.getElementById('id').value;
   
     // Procurar pela sala com o ID correspondente
     let index = salas.findIndex(function (p) {
       return p.id === id;
     });
   
     // Verificar se o ID foi encontrado
     if (index === -1) {
       alert('Não foi encontrada nenhuma sala com o ID especificado.');
       return;
     }
     
     // Remover a sala encontrada
     salas.splice(index, 1);
     
     // Armazenar a lista atualizada de salas no local storage
     localStorage.setItem('salas', JSON.stringify(salas));
     
     // Limpar o campo de entrada do ID
     document.getElementById('id').value = '';
     // limpar os campos de entrada após a inserção
     limparFormulario();
     
     // Exibir uma mensagem de sucesso
     alert('Sala removida com sucesso!');
     // Atualizar a tabela com a lista atualizada de salas
     atualizarTabela();
});