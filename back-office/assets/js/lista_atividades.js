
/*const tabela = document.getElementById("table-body");
const atividades = JSON.parse(localStorage.getItem('atividades')) || [];
let linhaSelecionada = null;*/

document.addEventListener("DOMContentLoaded", function () {
    let adicionar_atividades = new Vue({
        el: "#adicionar_atividade",
        data: {
            atividades: JSON.parse(localStorage.getItem('atividades')) || [],
            tabela: document.getElementById("table-body"),
            linhaSelecionada: null,
            id: "",
            nivel: "Selecione o nível",
            nome: "",
            preco_pessoa: "",
            max_cap: "",
            min_cap: "",
            duracao: ""
        },
        methods: {
            limparFormulario() {
                this.id = "";
                this.nome = "";
                this.nivel = "";
                this.preco_pessoa = "";
                this.max_cap = "";
                this.min_cap = "";
                this.duracao = "";
            },
            atualizarTabela() {
                // Limpa os dados da tabela antes de atualizar
                this.tabela.innerHTML = '';
                function inserirCelula(linha, valor) {
                    const celula = linha.insertCell();
                    celula.innerHTML = valor;
                }

                this.atividades.forEach(function (atividade) {
                    const newRow = this.tabela.insertRow();

                    inserirCelula(newRow, atividade.id);
                    inserirCelula(newRow, atividade.nome);
                    inserirCelula(newRow, atividade.nivel);
                    inserirCelula(newRow, atividade.preco_pessoa);
                    inserirCelula(newRow, atividade.max_cap);
                    inserirCelula(newRow, atividade.min_cap);
                    inserirCelula(newRow, atividade.duracao);

                    newRow.addEventListener('click', function () {
                        if (this.linhaSelecionada === newRow) {
                            // Desseleciona a linha atual
                            newRow.style.backgroundColor = '';
                            newRow.style.color = '';
                            // Limpa os campos do formulário
                            this.limparFormulario();
                            // Define a linha selecionada como nula
                            this.linhaSelecionada = null;
                        } else {
                            if (this.linhaSelecionada !== null) {
                                // Remove a seleção da linha anteriormente selecionada
                                this.linhaSelecionada.style.backgroundColor = '';
                                this.linhaSelecionada.style.color = '';
                            }
                            // Define a cor de fundo da linha atual como a cor de seleção
                            newRow.style.backgroundColor = '#223843';
                            newRow.style.color = '#FFFFFF';
                            // Armazena a nova linha selecionada na variável de estado
                            this.linhaSelecionada = newRow;

                            // Preenche os campos do formulário com os valores da atividade selecionado
                            this.id = atividade.id;
                            this.nome = atividade.nome;
                            this.duracao = atividade.duracao;
                            this.preco_pessoa = atividade.preco_pessoa;
                            this.max_cap = atividade.max_cap;
                            this.min_cap = atividade.min_cap;
                            this.nivel = atividade.nivel[0];
                        }
                    }.bind(this));
                }.bind(this));
            },
            //Botão adicionar atividade
            adicionarAtividade() {
                let id = this.id;
                let nome = this.nome;
                let nivel = [this.nivel];
                let preco_pessoa = this.preco_pessoa;
                let max_cap = this.max_cap;
                let min_cap = this.min_cap;
                let duracao = this.duracao;
                // let quantidade = parseInt(this.quantidade);
                let precoRegex = /^\d+(\.\d{1,2})?$/;
                let duracaoRegex = /^\d+(\.\d{1,1})?$/;
                let capRegex = /^\d+$/;


                // Verifica se o ID já existe na lista de atividades
                for (let i = 0; i < this.atividades.length; i++) {
                    if (this.atividades[i].id === id) {
                        erroInput("Já existe uma atividade com o ID inserido. Por favor, insira um ID diferente.");
                        return;
                    }
                }

                if (id == "" || nome == "" || nivel[0] === "Selecione o nível" || max_cap == "" || min_cap == "" || duracao == "") {
                    erroInput("Por favor, preencha todos os campos antes de inserir os dados.");
                    return;
                } else if (!capRegex.test(max_cap)) {
                    erroInput("Por favor, insira um número válido (exemplo: 5 ou 6).");
                    return;
                } else if (!capRegex.test(min_cap)) {
                    erroInput("Por favor, insira um número válido (exemplo: 5 ou 6).");
                    return;
                } else if (!duracaoRegex.test(duracao)) {
                    erroInput("Por favor, insira uma duração válida (exemplo: 2 ou 2.5 - 2 hora ou 2h30min).");
                    return;
                } else if (duracao < 2 || duracao > 4) {
                    erroInput("Por favor, insira uma duração válida, entre 2 a 4 horas .");
                    return;
                } else if (!precoRegex.test(preco_pessoa)) {
                    erroInput("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
                    return;
                } else {
                    // Cria um objeto com os dados da atividade
                    let atividade = {
                        id: id,
                        nome: nome,
                        nivel: nivel,
                        preco_pessoa: preco_pessoa,
                        max_cap: max_cap,
                        min_cap: min_cap,
                        duracao: duracao
                    };

                    // Adiciona a nova atividade à lista de atividades
                    this.atividades.push(atividade);

                    // Armazena a lista atualizada de profissionais em local storage
                    localStorage.setItem('atividades', JSON.stringify(this.atividades));

                    // limpar os campos de entrada após a inserção
                    this.limparFormulario();

                    // Exibir uma mensagem de sucesso
                    toastifyAlerta('Atividade adicionada com sucesso!');
                    this.atualizarTabela();
                }
            },
            alterarAtividade() {
                // Obter o ID da atividade a ser alterada
                let id = this.id;

                // Procurar pela atividade com o ID correspondente
                let index = this.atividades.findIndex(function (p) {
                    return p.id === id;
                });

                // Verificar se o ID foi encontrado
                if (index === -1) {
                    erroInput('Não foi encontrado nenhuma atividade com o ID especificado.');
                    return;
                }

                // Obter os novos dados a partir do formulário
                let nome = this.nome;
                let preco_pessoa = this.preco_pessoa;
                let max_cap = this.max_cap;
                let min_cap = this.min_cap;
                let duracao = this.duracao;
                let nivel = [this.nivel];

                let precoRegex = /^\d+(\.\d{1,2})?$/;
                let duracaoRegex = /^\d+(\.\d{1,1})?$/;
                let capRegex = /^\d+$/;

                // Verificar se todos os campos foram preenchidos
                if (id == "" || nome == "" || preco_pessoa == "" || nivel[0] === "Selecione o nível" || max_cap == "" || min_cap == "" || duracao == "") {
                    erroInput("Por favor, preencha todos os campos antes de atualizar os dados.");
                    return;
                } else if (!capRegex.test(max_cap)) {
                    erroInput("Por favor, insira um número válido (exemplo: 5 ou 6).");
                    return;
                } else if (!capRegex.test(min_cap)) {
                    erroInput("Por favor, insira um número válido (exemplo: 5 ou 6).");
                    return;
                } else if (!duracaoRegex.test(duracao)) {
                    erroInput("Por favor, insira uma duração válida (exemplo: 2 ou 2.5 - 2 hora ou 2h30min).");
                    return;
                } else if (duracao < 2 || duracao > 4) {
                    erroInput("Por favor, insira uma duração válida, entre 2 a 4 horas .");
                    return;
                } else if (!precoRegex.test(preco_pessoa)) {
                    erroInput("Por favor, insira um preço válido (exemplo: 9 ou 9.50).");
                    return;
                } else {
                    // Atualizar os dados da atividade
                    this.atividades[index].nome = nome;
                    this.atividades[index].preco_pessoa = preco_pessoa;
                    this.atividades[index].nivel = nivel;
                    this.atividades[index].max_cap = max_cap;
                    this.atividades[index].min_cap = min_cap;
                    this.atividades[index].duracao = duracao;

                    // Armazenar os dados atualizados no local storage
                    localStorage.setItem('atividades', JSON.stringify(this.atividades));

                    // Limpar o formulário
                    this.limparFormulario();

                    // Exibir uma mensagem de sucesso
                    toastifyAlerta('Atividade alterada com sucesso!');
                    this.atualizarTabela();
                }
            },
            removerMaterial() {
                // Obter o ID da atividade a ser removida
                let id = this.id;

                // Procurar pelo profissional com o ID correspondente
                let index = this.atividades.findIndex(function (p) {
                    return p.id === id;
                });

                // Verificar se o ID foi encontrado
                if (index === -1) {
                    erroInput('Não foi encontrado nenhuma atividade com o ID especificado.');
                    return;
                }

                // Remover a atividade encontrada
                this.atividades.splice(index, 1);

                // Armazenar a lista atualizada de atividades no local storage
                localStorage.setItem('atividades', JSON.stringify(this.atividades));

                // limpar os campos de entrada
                this.limparFormulario();

                // Exibir uma mensagem de sucesso
                toastifyAlerta('Atividade removida com sucesso!');
                // Atualizar a tabela com a lista atualizada de atividades
                this.atualizarTabela();
            }
        },
        mounted() {
            this.atualizarTabela();
        }
    });
});
/*
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


document.getElementById("remover_atv").addEventListener("click", function () {
    // Obter o ID da atividade a ser removida
    let id = document.getElementById('id').value;

    // Procurar pelo profissional com o ID correspondente
    let index = atividades.findIndex(function (p) {
        return p.id === id;
    });

    // Verificar se o ID foi encontrado
    if (index === -1) {
        erroInput('Não foi encontrado nenhuma atividade com o ID especificado.');
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
    toastifyAlerta('Atividade removida com sucesso!');
    // Atualizar a tabela com a lista atualizada de profissionais
    atualizarTabela();
});
*/
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