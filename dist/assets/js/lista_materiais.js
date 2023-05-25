document.addEventListener("DOMContentLoaded", function () {
    let adicionar_materiais = new Vue({
        el: "#adicionar_material",
        data: {
            materiais: JSON.parse(localStorage.getItem('materiais')) || [],
            tabela: document.getElementById("table-body"),
            linhaSelecionada: null,
            id: "",
            atividade: "Selecione uma atividade",
            descricao: "",
            nome: "",
            quantidade: ""
        },
        methods: {
            limparFormulario() {
                this.id = "";
                this.nome = "";
                this.descricao = "";
                this.quantidade = "";
                this.atividade= "";
            },
            atualizarTabela() {
                // Limpa os dados da tabela antes de atualizar
                this.tabela.innerHTML = '';
                function inserirCelula(linha, valor) {
                    const celula = linha.insertCell();
                    celula.innerHTML = valor;
                }

                this.materiais.forEach(function (material) {
                    const newRow = this.tabela.insertRow();

                    inserirCelula(newRow, material.id);
                    inserirCelula(newRow, material.nome);
                    inserirCelula(newRow, material.descricao);
                    inserirCelula(newRow, material.quantidade);
                    inserirCelula(newRow, material.atividade);

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

                            // Preenche os campos do formulário com os valores do material selecionado
                            this.id = material.id;
                            this.nome = material.nome;
                            this.descricao = material.descricao;
                            this.quantidade = material.quantidade;
                            this.atividade = material.atividade[0];
                        }
                    }.bind(this));
                }.bind(this));
            },
            //Botão adicionar material
            adicionarMaterial() {
                let id = this.id;
                let nome = this.nome;
                let quantidade = parseInt(this.quantidade);
                let descricao = this.descricao;
                let atividade = [this.atividade];

                // Verifica se o ID já existe na lista de materiais
                for (let i = 0; i < this.materiais.length; i++) {
                    if (this.materiais[i].id === id) {
                        erroInput("Já existe um material com o ID inserido. Por favor, insira um ID diferente.");
                        return;
                    }
                }

                if (id == "" || nome == "" || descricao == "" || atividade == "Selecione uma atividade" || quantidade == "") {
                    erroInput("Por favor, preencha todos os campos antes de inserir os dados.");
                    return;
                } else if(quantidade<0){
                    erroInput("Por favor, insira uma quantidade maior que 0.");
                    return;
                }else {
                    // Cria um objeto com os dados do material
                    let material = {
                        id: id,
                        nome: nome,
                        descricao: descricao,
                        atividade: atividade,
                        quantidade: quantidade
                    };

                    // Adiciona novo material à lista de materiais
                    this.materiais.push(material);

                    // Armazena a lista atualizada de materiais em local storage
                    localStorage.setItem('materiais', JSON.stringify(this.materiais));

                    // limpar os campos de entrada após a inserção
                    this.limparFormulario();

                    // Exibir uma mensagem de sucesso
                    toastifyAlerta('Material adicionado com sucesso!');
                    this.atualizarTabela();
                }
            },
            alterarMaterial() {
                // Obter o ID do material a ser alterado
                let id = this.id;

                // Procurar pelo material com o ID correspondente
                let index = this.materiais.findIndex(function (m) {
                    return m.id === id;
                });

                // Verificar se o ID foi encontrado
                if (index === -1) {
                    erroInput('Não foi encontrado nenhum material com o ID especificado.');
                    return;
                }

                // Obter os novos dados a partir do formulário
                let nome = this.nome;
                let descricao = this.descricao;
                let quantidade = parseInt(this.quantidade);
                let atividade = [this.atividade];

                // Verificar se todos os campos foram preenchidos
                if (id == "" || nome == "" || descricao == "" || atividade == "Selecione uma atividade" || quantidade == "") {
                    erroInput("Por favor, preencha todos os campos antes de atualizar os dados.");
                    return;
                } else if(quantidade<0){
                    erroInput("Por favor, insira uma quantidade maior que 0.");
                    return;
                }else {
                    // Atualizar os dados do material
                    this.materiais[index].nome = nome;
                    this.materiais[index].descricao = descricao;
                    this.materiais[index].atividade = atividade;
                    this.materiais[index].quantidade = quantidade;

                    // Armazenar os dados atualizados no local storage
                    localStorage.setItem('materiais', JSON.stringify(this.materiais));

                    // Limpar o formulário
                    this.limparFormulario();

                    // Exibir uma mensagem de sucesso
                    toastifyAlerta('Material alterado com sucesso!');
                    this.atualizarTabela();
                }
            },
            removerMaterial() {
                // Obter o ID do material a ser removido
                let id = this.id;

                // Procurar pelo material com o ID correspondente
                let index = this.materiais.findIndex(function (m) {
                    return m.id === id;
                });

                // Verificar se o ID foi encontrado
                if (index === -1) {
                    erroInput('Não foi encontrado nenhum material com o ID especificado.');
                    return;
                }

                // Remover o material encontrado
                this.materiais.splice(index, 1);

                // Armazenar a lista atualizada de materiais no local storage
                localStorage.setItem('materiais', JSON.stringify(this.materiais));

                // limpar os campos de entrada após a inserção
                this.limparFormulario();

                // Exibir uma mensagem de sucesso
                toastifyAlerta('Material removido com sucesso!');
                // Atualizar a tabela com a lista atualizada de materiais
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