
const tabela = document.getElementById("table-body");
const atividades = JSON.parse(localStorage.getItem('atividades')) || [];
const linhas = tabela.querySelectorAll('tbody tr');
let linhaSelecionada = null;

window.addEventListener('load', function () {
    atualizarTabela();
});

function limparFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("nivel").value = "";
    document.getElementById("preco_pessoa").value = "";
    document.getElementById("max_cap").value = "";
    document.getElementById("min_cap").value = "";
    document.getElementById("duracao").value = "";
}

function atualizarTabela() {
    // Limpa os dados da tabela antes de atualizar
    tabela.innerHTML = '';

    function inserirCelula(linha, valor) {
        const celula = linha.insertCell();
        celula.innerHTML = valor;
    }

    atividades.forEach(function (atividade) {
        const newRow = tabela.insertRow();

        inserirCelula(newRow, atividade.id);
        inserirCelula(newRow, atividade.nome);
        inserirCelula(newRow, atividade.nivel);
        inserirCelula(newRow, atividade.preco_pessoa);
        inserirCelula(newRow, atividade.max_cap);
        inserirCelula(newRow, atividade.min_cap);
        inserirCelula(newRow, atividade.duracao);

        newRow.addEventListener('click', function () {
            if (linhaSelecionada === newRow) {
                // Desseleciona a linha atual
                newRow.style.backgroundColor = '';
                newRow.style.color = '';
                // Limpa os campos do formulário
                document.getElementById('id').value = '';
                document.getElementById('nome').value = '';
                document.getElementById('nivel').value = '';
                document.getElementById('preco_pessoa').value = '';
                document.getElementById('max_cap').value = '';
                document.getElementById('min_cap').value = '';
                document.getElementById('duracao').value = '';
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

                // Preenche os campos do formulário com os valores da atividade selecionado
                document.getElementById('id').value = atividade.id;
                document.getElementById('nome').value = atividade.nome;
                document.getElementById('nivel').value = atividade.nivel;
                document.getElementById('preco_pessoa').value = atividade.preco_pessoa;
                document.getElementById('max_cap').value = atividade.max_cap;
                document.getElementById('min_cap').value = atividade.min_cap;
                document.getElementById('duracao').value = atividade.duracao;

            }
        });
    });
}

document.getElementById("top-center-add").addEventListener("click", function () {
    // Obtém os valores dos campos do formulário
    let id = document.getElementById('id').value;
    let nome = document.getElementById('nome').value;
    let preco_pessoa = document.getElementById('preco_pessoa').value;
    let max_cap = document.getElementById('max_cap').value;
    let min_cap = document.getElementById('min_cap').value;
    let duracao = document.getElementById('duracao').value;
    let selectElement = document.getElementById('nivel');
    let selectedOptions = Array.from(selectElement.selectedOptions);
    let nivel = selectedOptions.map(option => option.value);
    console.log(nivel);
    let precoRegex = /^\d+(\.\d{1,2})?$/;
    let duracaoRegex = /^\d+(\.\d{1,1})?$/;
    let capRegex = /^\d+$/;


    // Verifica se o ID já existe na lista de atividades
    for (let i = 0; i < atividades.length; i++) {
        if (atividades[i].id === id) {
            alert("Já existe uma atividade com o ID inserido. Por favor, insira um ID diferente.");
            return;
        }
    }

    if (id == "" || nome == "" || nivel == "" || nivel.length === 0 || max_cap == "" || min_cap == "" || duracao == "") {
        alert("Por favor, preencha todos os campos antes de inserir os dados.");
        return;
    } else if (!capRegex.test(max_cap)) {
        alert("Por favor, insira um número válido (exemplo: 5 ou 6).");
        return;
    } else if (!capRegex.test(min_cap)) {
        alert("Por favor, insira um número válido (exemplo: 5 ou 6).");
        return;
    } else if (!duracaoRegex.test(duracao)) {
        alert("Por favor, insira uma duração válida (exemplo: 1 ou 1.5 - 1 hora ou 1h30min).");
        return;
    }else if (!precoRegex.test(preco_pessoa)) {
        alert("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
        return;
    } else {
        // Cria um objeto com os dados do profissional
        let atividade = {
            id: id,
            nome: nome,
            nivel: nivel,
            preco_pessoa: preco_pessoa,
            max_cap: max_cap,
            min_cap: min_cap,
            duracao:duracao
        };

        // Adiciona a nova atividade à lista de atividades
        atividades.push(atividade);

        // Armazena a lista atualizada de profissionais em local storage
        localStorage.setItem('atividades', JSON.stringify(atividades));

        // limpar os campos de entrada após a inserção
        limparFormulario();

        // Exibir uma mensagem de sucesso
        alert('Atividade adicionada com sucesso!');
        atualizarTabela();
    }
});


document.getElementById("top-center-update").addEventListener("click", function () {
    // Obter o ID do profissional a ser alterado
    let id = document.getElementById('id').value;


    // Procurar pelo profissional com o ID correspondente
    let index = atividades.findIndex(function (p) {
        return p.id === id;
    });

    // Verificar se o ID foi encontrado
    if (index === -1) {
        alert('Não foi encontrado nenhuma atividade com o ID especificado.');
        return;
    }

    // Obter os novos dados a partir do formulário
    let nome = document.getElementById('nome').value;
    let preco_pessoa = document.getElementById('preco_pessoa').value;
    let max_cap = document.getElementById('max_cap').value;
    let min_cap = document.getElementById('min_cap').value;
    let duracao = document.getElementById('duracao').value;
    let selectElement = document.getElementById('nivel');
    let selectedOptions = Array.from(selectElement.selectedOptions);
    let nivel = selectedOptions.map(option => option.value);
    console.log(nivel);
    let precoRegex = /^\d+(\.\d{1,2})?$/;
    let duracaoRegex = /^\d+(\.\d{1,1})?$/;
    let capRegex = /^\d+$/;

    // Verificar se todos os campos foram preenchidos
    if (id == "" || nome == "" || preco_pessoa == "" || nivel.length === 0 || max_cap == "" || min_cap == "" || duracao == "") {
        alert("Por favor, preencha todos os campos antes de atualizar os dados.");
        return;
    } else if (!capRegex.test(max_cap)) {
        alert("Por favor, insira um número válido (exemplo: 5 ou 6).");
        return;
    } else if (!capRegex.test(min_cap)) {
        alert("Por favor, insira um número válido (exemplo: 5 ou 6).");
        return;
    } else if (!duracaoRegex.test(duracao)) {
        alert("Por favor, insira uma duração válida (exemplo: 1 ou 1.5 - 1 hora ou 1h30min).");
        return;
    } else if (!precoRegex.test(preco_pessoa)) {
        alert("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
        return;
    } else {
        // Atualizar os dados da atividade
        atividades[index].nome = nome;
        atividades[index].preco_pessoa = preco_pessoa;
        atividades[index].nivel = nivel;
        atividades[index].max_cap = max_cap;
        atividades[index].min_cap = min_cap;
        atividades[index].duracao = duracao;

        // Armazenar os dados atualizados no local storage
        localStorage.setItem('atividades', JSON.stringify(atividades));

        // Limpar o formulário
        limparFormulario();

        // Exibir uma mensagem de sucesso
        alert('Atividade alterada com sucesso!');
        atualizarTabela();
    }
});


document.getElementById("top-right").addEventListener("click", function () {
    // Obter o ID da atividade a ser removida
    let id = document.getElementById('id').value;

    // Procurar pelo profissional com o ID correspondente
    let index = atividades.findIndex(function (p) {
        return p.id === id;
    });

    // Verificar se o ID foi encontrado
    if (index === -1) {
        alert('Não foi encontrado nenhuma atividade com o ID especificado.');
        return;
    }

    // Remover a atividade encontrada
    atividades.splice(index, 1);

    // Armazenar a lista atualizada de atividades no local storage
    localStorage.setItem('atividades', JSON.stringify(atividades));

    // Limpar o campo de entrada do ID
    document.getElementById('id').value = '';
    // limpar os campos de entrada após a inserção
    limparFormulario();

    // Exibir uma mensagem de sucesso
    alert('Atividade removida com sucesso!');
    // Atualizar a tabela com a lista atualizada de profissionais
    atualizarTabela();
});