const tabela = document.getElementById("table-body");
const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
const linhas = tabela.querySelectorAll('tbody tr');
let linhaSelecionada = null;

window.addEventListener('load', function () {
    atualizarTabela();
});


function limparFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("atividade").value = "";
    document.getElementById("quantidade").value = "";
}

function atualizarTabela() {
    // Limpa os dados da tabela antes de atualizar
    tabela.innerHTML = '';

    function inserirCelula(linha, valor) {
        const celula = linha.insertCell();
        celula.innerHTML = valor;
    }

    materiais.forEach(function (material) {
        const newRow = tabela.insertRow();

        inserirCelula(newRow, material.id);
        inserirCelula(newRow, material.nome);
        inserirCelula(newRow, material.descricao);
        inserirCelula(newRow, material.atividade);
        inserirCelula(newRow, material.quantidade);

        newRow.addEventListener('click', function () {
            if (linhaSelecionada === newRow) {
                // Desseleciona a linha atual
                newRow.style.backgroundColor = '';
                newRow.style.color = '';
                // Limpa os campos do formulário
                document.getElementById("id").value = "";
                document.getElementById("nome").value = "";
                document.getElementById("descricao").value = "";
                document.getElementById("atividade").value = "";
                document.getElementById("quantidade").value = "";
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

                // Preenche os campos do formulário com os valores do material selecionado
                document.getElementById('id').value = material.id;
                document.getElementById('nome').value = material.nome;
                document.getElementById('descricao').value = material.descricao;
                document.getElementById('atividade').value = material.atividade;
                document.getElementById('quantidade').value = material.quantidade;
            }
        });
    });
}


//Botão adicionar material
document.getElementById("top-center-add").addEventListener("click", function() {
    // Obtém os valores dos campos do formulário
    let id = document.getElementById('id').value;
    let nome = document.getElementById('nome').value;
    let descricao = document.getElementById('descricao').value;
    let selectElement1 = document.getElementById('atividade');
    let selectElement2 = document.getElementById('quantidade');
    let selectedOption1 = Array.from(selectElement1.selectedOptions);
    let selectedOption2 = Array.from(selectElement2.selectedOptions);
    let atividade = selectedOption1.map(option => option.value);
    let quantidade = selectedOption2.map(option => option.value);
    console.log(atividade);
    console.log(quantidade);
    let descricaoRegex = /^[a-zA-Z\s]*$/;
  
    
    // Verifica se o ID já existe na lista de materiais
    for (let i = 0; i < materiais.length; i++) {
        if (materiais[i].id === id) {
            alert("Já existe um material com o ID inserido. Por favor, insira um ID diferente.");
            return;
        }
    }
  
    if (id == "" || nome == "" || descricao == "" || atividade == "" || atividade.length === 0 || quantidade == "" || quantidade.length === 0) {
        alert("Por favor, preencha todos os campos antes de inserir os dados.");
        return;
    }else if (!descricaoRegex.test(descricao)) {
        alert("Por favor, insira uma descrição válida.");
        return;
    }else{
        // Cria um objeto com os dados do material
    let material = {
        id: id,
        nome: nome,
        descricao: descricao,
        atividade: atividade,
        quantidade: quantidade
    };
  
    // Adiciona novo material à lista de materiais
    materiais.push(material);
  
    // Armazena a lista atualizada de materiais em local storage
    localStorage.setItem('materiais', JSON.stringify(materiais));
  
    // limpar os campos de entrada após a inserção
    limparFormulario();
  
    // Exibir uma mensagem de sucesso
    alert('Material adicionado com sucesso!');
    atualizarTabela();
    }
  });

  //Botão alterar material
  document.getElementById("top-center-update").addEventListener("click", function() {
    // Obter o ID do material a ser alterado
    let id = document.getElementById('id').value;
  
  
    // Procurar pelo material com o ID correspondente
    let index = materiais.findIndex(function (m) {
      return m.id === id;
    });
  
    // Verificar se o ID foi encontrado
    if (index === -1) {
      alert('Não foi encontrado nenhum material com o ID especificado.');
      return;
    }
    
    // Obter os novos dados a partir do formulário
    let nome = document.getElementById('nome').value;
    let descricao = document.getElementById('descricao').value;
    let selectElement1 = document.getElementById('atividade');
    let selectElement2 = document.getElementById('quantidade');
    let selectedOption1 = Array.from(selectElement1.selectedOptions);
    let selectedOption2 = Array.from(selectElement2.selectedOptions);
    let atividade = selectedOption1.map(option => option.value);
    let quantidade = selectedOption2.map(option => option.value);
    console.log(atividade);
    console.log(quantidade);
    let descricaoRegex = /^[a-zA-Z\s]*$/;
  
  
    // Verificar se todos os campos foram preenchidos
    if (id == "" || nome == "" || descricao == "" || atividade == "" || atividade.length === 0 || quantidade == "" || quantidade.length === 0) {
        alert("Por favor, preencha todos os campos antes de atualizar os dados.");
        return;
   }else if (!descricaoRegex.test(descricao)) {
        alert("Por favor, insira uma descrição válida.");
        return;
    }else{
    // Atualizar os dados do material
    materiais[index].nome = nome;
    materiais[index].descricao = descricao;
    materiais[index].atividade = atividade;
    materiais[index].quantidade = quantidade;
  
    // Armazenar os dados atualizados no local storage
    localStorage.setItem('materiais', JSON.stringify(materiais));
  
    // Limpar o formulário
    limparFormulario();
  
    // Exibir uma mensagem de sucesso
    alert('Material alterada com sucesso!');
    atualizarTabela();
    }
  });

  //Botão remover material
  document.getElementById("top-center-remove").addEventListener("click", function() {
    // Obter o ID do material a ser removido
    let id = document.getElementById('id').value;
  
    // Procurar pelo material com o ID correspondente
    let index = materiais.findIndex(function (m) {
      return m.id === id;
    });
  
    // Verificar se o ID foi encontrado
    if (index === -1) {
      alert('Não foi encontrado nenhum material com o ID especificado.');
      return;
    }
    
    // Remover o material encontrado
     materiais.splice(index, 1);
   
    // Armazenar a lista atualizada de materiais no local storage
    localStorage.setItem('materiais', JSON.stringify(materiais));
    
    // Limpar o campo de entrada do ID
    document.getElementById('id').value = '';
    // limpar os campos de entrada após a inserção
    limparFormulario();
    
    // Exibir uma mensagem de sucesso
    alert('Material removido com sucesso!');
    // Atualizar a tabela com a lista atualizada de materiais
    atualizarTabela();
 });