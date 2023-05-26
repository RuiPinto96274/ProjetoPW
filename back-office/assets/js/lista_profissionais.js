let tabela = document.getElementById("table-body");
let profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
let linhaSelecionada = null;

// Create a new Choices instance for the select element
let competenciasElement = document.getElementById('competencias');
let competenciasChoices = new Choices(competenciasElement,{
    removeItems: true,
    removeItemButton: true,
    allowHTML: true,
    duplicateItemsAllowed: false
});

window.addEventListener('load', function () {
    atualizarTabela();
});

function limparFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("morada").value = "";
    document.getElementById("email").value = "";
    document.getElementById("palavra-passe").value = "";
    document.getElementById("contacto").value = "";
    document.getElementById("preco").value = "";
    competenciasChoices.clearStore();
    competenciasChoices.setChoices([{ value: "Crochê", label: "Crochê" },
    { value: "Costura", label: "Costura" },
    { value: "Cerâmica", label: "Cerâmica" },
    { value: "Escultura", label: "Escultura" },
    { value: "Pintura", label: "Pintura" },
    { value: "Bordado", label: "Bordado" }]);
}
  
function atualizarTabela() {
    // Limpa os dados da tabela antes de atualizar
    tabela.innerHTML = '';

    function inserirCelula(linha, valor) {
        const celula = linha.insertCell();
        celula.innerHTML = valor;
    }

    profissionais.forEach(function (profissional) {
        const newRow = tabela.insertRow();

        inserirCelula(newRow, profissional.id);
        inserirCelula(newRow, profissional.nome);
        inserirCelula(newRow, profissional.morada);
        inserirCelula(newRow, profissional.email);
        inserirCelula(newRow, profissional.palavraPasse);
        inserirCelula(newRow, profissional.contacto);
        inserirCelula(newRow, profissional.competencias);
        inserirCelula(newRow, profissional.preco + '€/h');

        newRow.addEventListener('click', function () {
            if (linhaSelecionada === newRow) {
                // Desseleciona a linha atual
                newRow.style.backgroundColor = '';
                newRow.style.color = '';
                // Limpa os campos do formulário
                limparFormulario();
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

                // Preenche os campos do formulário com os valores do profissional selecionado
                document.getElementById('id').value = profissional.id;
                document.getElementById('nome').value = profissional.nome;
                document.getElementById('morada').value = profissional.morada;
                document.getElementById('email').value = profissional.email;
                document.getElementById('palavra-passe').value = profissional.palavraPasse;
                document.getElementById('contacto').value = profissional.contacto;

                competenciasChoices.clearStore();
                competenciasChoices.setValue(profissional.competencias);
                competenciasChoices.setChoices([
                { value: "Crochê", label: "Crochê" },
                { value: "Costura", label: "Costura" },
                { value: "Cerâmica", label: "Cerâmica" },
                { value: "Escultura", label: "Escultura" },
                { value: "Pintura", label: "Pintura" },
                { value: "Bordado", label: "Bordado" }]);

                document.getElementById('preco').value = profissional.preco;
            }
        });
    });
}

document.getElementById("adicionar_profissional").addEventListener("click", function () {
    // Obtém os valores dos campos do formulário
    let id = document.getElementById('id').value;
    let nome = document.getElementById('nome').value;
    let morada = document.getElementById('morada').value;
    let email = document.getElementById('email').value;
    let palavraPasse = document.getElementById('palavra-passe').value;
    let contacto = document.getElementById('contacto').value;
    let competencias = competenciasChoices.getValue(true);
    let preco = document.getElementById('preco').value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let contactoRegex = /^\d{9}$/;
    let precoRegex = /^\d+(\.\d{1,2})?$/;


    // Verifica se o ID já existe na lista de profissionais
    for (let i = 0; i < profissionais.length; i++) {
        if (profissionais[i].id === id) {
            erroInput("Já existe um profissional com o ID inserido. Por favor, insira um ID diferente.");
            return;
        }
    }

    // Percorre a lista de profissionais existentes
    for (let i = 0; i < profissionais.length; i++) {
        // Verifica se o email já existe
        if (profissionais[i].email === email) {
            erroInput("Este endereço de email já existe. Por favor, insira outro email.");
            return;
        }
    }

    // Verifica se o Contacto já existe na lista de profissionais
    for (let i = 0; i < profissionais.length; i++) {
        if (profissionais[i].contacto === contacto) {
            erroInput("Já existe um profissional com o contacto inserido. Por favor, insira um contacto diferente.");
            return;
        }
    }

    if (id == "" || nome == "" || morada == "" || email == "" || palavraPasse == "" || contacto == "" || competencias.length === 0 || preco == "") {
        erroInput("Por favor, preencha todos os campos antes de inserir os dados.");
        return;
    } else if (!emailRegex.test(email)) {
        erroInput("Por favor, insira um endereço de email válido.");
        return;
    } else if (!contactoRegex.test(contacto)) {
        erroInput("Por favor, insira um número de contato válido (9 dígitos).");
        return;
    } else if (!precoRegex.test(preco)) {
        erroInput("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
        return;
    } else {
        // Cria um objeto com os dados do profissional
        let profissional = {
            id: id,
            nome: nome,
            morada: morada,
            email: email,
            palavraPasse: palavraPasse,
            contacto: contacto,
            competencias: competencias,
            preco: preco,
            reservas_profissional: [] //[id_reserva, dia, hora_inicio, hora_fim]     //vai ser guardado todas as reservas que o profissional teve
        };

        // Adiciona o novo profissional à lista de profissionais
        profissionais.push(profissional);

        // Armazena a lista atualizada de profissionais em local storage
        localStorage.setItem('profissionais', JSON.stringify(profissionais));

        // limpar os campos de entrada após a inserção
        limparFormulario();

        // Exibir uma mensagem de sucesso
        toastifyAlerta('Profissional adicionado com sucesso!');
        atualizarTabela();
    }
});


document.getElementById("alterar_profissional").addEventListener("click", function () {
    // Obter o ID do profissional a ser alterado
    let id = document.getElementById('id').value;

    // Procurar pelo profissional com o ID correspondente
    let index = profissionais.findIndex(function (p) {
        return p.id === id;
    });

    // Verificar se o ID foi encontrado
    if (index === -1) {
        erroInput('Não foi encontrado nenhum profissional com o ID especificado.');
        return;
    }

    // Obter os novos dados a partir do formulário
    let nome = document.getElementById('nome').value;
    let morada = document.getElementById('morada').value;
    let email = document.getElementById('email').value;
    let palavraPasse = document.getElementById('palavra-passe').value;
    let contacto = document.getElementById('contacto').value;
    let preco = document.getElementById('preco').value;
    let competencias = competenciasChoices.getValue(true);
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let contactoRegex = /^\d{9}$/;
    let precoRegex = /^\d+(\.\d{1,2})?$/;


    // Verificar se todos os campos foram preenchidos
    if (id == "" || nome == "" || morada == "" || email == "" || palavraPasse == "" || contacto == "" || competencias.length === 0 || preco == "") {
        //alert("Por favor, preencha todos os campos antes de atualizar os dados.");
        erroInput("Por favor, preencha todos os campos antes de atualizar os dados.");
        return;
    } else if (!emailRegex.test(email)) {
        erroInput("Por favor, insira um endereço de email válido.");
        return;
    } else if (!contactoRegex.test(contacto)) {
        erroInput("Por favor, insira um número de contato válido (9 dígitos).");
        return;
    } else if (!precoRegex.test(preco)) {
        erroInput("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
        return;
    } else {
        // Atualizar os dados do profissional
        profissionais[index].nome = nome;
        profissionais[index].morada = morada;
        profissionais[index].email = email;
        profissionais[index].palavraPasse = palavraPasse;
        profissionais[index].contacto = contacto;
        profissionais[index].competencias = competencias;
        profissionais[index].preco = preco;

        // Armazenar os dados atualizados no local storage
        localStorage.setItem('profissionais', JSON.stringify(profissionais));

        // Limpar o formulário
        limparFormulario();

        // Exibir uma mensagem de sucesso
        //alert('Profissional alterado com sucesso!');
        toastifyAlerta('Profissional alterado com sucesso!');
        atualizarTabela();
    }
});


document.getElementById("remover_profissional").addEventListener("click", function () {
    // Obter o ID do profissional a ser removido
    let id = document.getElementById('id').value;

    // Procurar pelo profissional com o ID correspondente
    let index = profissionais.findIndex(function (p) {
        return p.id === id;
    });

    // Verificar se o ID foi encontrado
    if (index === -1) {
        //alert('Não foi encontrado nenhum profissional com o ID especificado.');
        erroInput('Não foi encontrado nenhum profissional com o ID especificado.');
        return;
    }

    // Remover o profissional encontrado
    profissionais.splice(index, 1);

    // Armazenar a lista atualizada de profissionais no local storage
    localStorage.setItem('profissionais', JSON.stringify(profissionais));

    // limpar os campos de entrada após a inserção
    limparFormulario();

    // Exibir uma mensagem de sucesso
    //alert('Profissional removido com sucesso!');
    toastifyAlerta('Profissional removido com sucesso!');
    // Atualizar a tabela com a lista atualizada de profissionais
    atualizarTabela();
});




function toastifyAlerta(mensagem) {
    Toastify({
        text: mensagem,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#223843",
    }).showToast();
}

function erroInput(mensagem) {
    Swal.fire({
        icon: "error",
        confirmButtonColor: '#d77a61',
        text: mensagem

    })
}
