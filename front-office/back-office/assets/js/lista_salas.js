const tabela = document.getElementById("table-body");
const salas = JSON.parse(localStorage.getItem('salas')) || [];
const linhas = tabela.querySelectorAll('tbody tr');
let linhaSelecionada = null;

document.addEventListener("DOMContentLoaded", function () {
    let adicionar_sala = new Vue({
        el: "#adicionar_sala",
        data: {
            salas: JSON.parse(localStorage.getItem('salas')) || [],
            tabela: document.getElementById("table-body"),
            linhaSelecionada: null,
            id: "",
            numSala: "",
            edificio: "",
            capacidade: ""
        },
        methods: {
            limparFormulario() {
                this.id = "";
                this.numSala = "";
                this.edificio = "";
                this.capacidade = "";
            },
            atualizarTabela() {
                // Limpa os dados da tabela antes de atualizar
                this.tabela.innerHTML = '';

                function inserirCelula(linha, valor) {
                    const celula = linha.insertCell();
                    celula.innerHTML = valor;
                }

                this.salas.forEach(function (sala) {
                    const newRow = tabela.insertRow();

                    inserirCelula(newRow, sala.id);
                    inserirCelula(newRow, sala.numSala);
                    inserirCelula(newRow, sala.edificio);
                    inserirCelula(newRow, sala.capacidade);

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

                            // Preenche os campos do formulário com os valores da sala selecionado
                            this.id = sala.id;
                            this.numSala = sala.numSala;
                            this.edificio = sala.edificio;
                            this.capacidade = sala.capacidade;
                        }
                    }.bind(this));
                }.bind(this));
            },
            adicionarSala() {
                let id = this.id;
                let numSala = this.numSala;
                let edificio = this.edificio;
                let capacidade = this.capacidade;
                // Verifica se o ID já existe na lista de salas
                for (let i = 0; i < this.salas.length; i++) {
                    if (this.salas[i].id === this.id) {
                        erroInput("Já existe uma sala com o ID inserido. Por favor, insira um ID diferente.");
                        return;
                    }
                }

                if (this.capacidade < 7 || this.capacidade > 15) {
                    erroInput("A capacidade máxima deve ser entre 6 e 14 pessoas");
                    return;
                } else if (isNaN(this.id)) {
                    erroInput("O ID deve conter apenas valores numéricos");
                } else if (isNaN(this.numSala)) {
                    erroInput("O número da sala deve conter apenas valores numéricos");
                } else if (this.id == "" || this.numSala == "" || this.edificio == "" || this.capacidade == "") {
                    erroInput("Por favor, preencha todos os campos antes de inserir os dados.");
                } else {
                    // Cria um objeto com os dados do sala
                    let sala = {
                        id: id,
                        numSala: numSala,
                        edificio: edificio,
                        capacidade: capacidade,
                        ocupacao_salas: [] //[id_reserva, dia, hora_inicio, hora_fim]     //vai ser guardado todas as reservas que a sala tem
                    };

                    // Adiciona o novo sala à lista de salas
                    this.salas.push(sala);

                    // Armazena a lista atualizada de salas em local storage
                    localStorage.setItem('salas', JSON.stringify(this.salas));

                    // limpar os campos de entrada após a inserção
                    this.limparFormulario();

                    // Exibir uma mensagem de sucesso
                    toastifyAlerta('Sala adicionado com sucesso!');
                    this.atualizarTabela();
                }
            },
            alterarSala() {
                let id = this.id;

                // Procurar a sala com o ID correspondente
                let index = this.salas.findIndex(function (p) {
                    return p.id === id;
                });

                // Verificar se o ID foi encontrado
                if (index === -1) {
                    erroInput('Não foi encontrado nenhuma sala com o ID especificado.');
                    return;
                }

                // Verificar se todos os campos foram preenchidos
                if (this.id == "" || this.numSala == "" || this.edificio == "" || this.capacidade == "") {
                    erroInput("Por favor, preencha todos os campos antes de atualizar os dados.");
                    return;
                } else if (isNaN(this.id)) {
                    erroInput("O ID deve conter apenas valores numéricos");
                } else if (isNaN(this.numSala)) {
                    erroInput("O número da sala deve conter apenas valores numéricos");
                } else {
                    // Atualizar os dados da sala
                    this.salas[index].numSala = this.numSala;
                    this.salas[index].edificio = this.edificio;
                    this.salas[index].capacidade = this.capacidade;

                    // Armazenar os dados atualizados no local storage
                    localStorage.setItem('salas', JSON.stringify(this.salas));

                    // Limpar o formulário
                    this.limparFormulario();

                    // Exibir uma mensagem de sucesso
                    toastifyAlerta('Sala alterada com sucesso!');
                    this.atualizarTabela();
                }

            },
            removerSala() {
                let id = this.id;

                // Procurar a sala com o ID correspondente
                let index = this.salas.findIndex(function (p) {
                    return p.id === id;
                });

                // Verificar se o ID foi encontrado
                if (index === -1) {
                    erroInput('Não foi encontrado nenhuma sala com o ID especificado.');
                    return;
                }

                // Remover a sala encontrada
                this.salas.splice(index, 1);

                // Armazenar a lista atualizada de salas no local storage
                localStorage.setItem('salas', JSON.stringify(this.salas));

                // limpar os campos de entrada após a inserção
                this.limparFormulario();

                // Exibir uma mensagem de sucesso
                toastifyAlerta('Sala removida com sucesso!');
                // Atualizar a tabela com a lista atualizada de salas
                this.atualizarTabela();
            }
        },
        mounted() {
            this.atualizarTabela();
        }
    });
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