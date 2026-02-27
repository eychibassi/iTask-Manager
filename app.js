//CONTÉM TODA A LÓGICA EM TYPESCRIPT
//definição da estrutura e das propriedades da classe Tarefa
var Tarefa = /** @class */ (function () {
    //inicializa o objeto com status não concluída (false) e registra a data/horário da criação   
    function Tarefa(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluida = false;
        this.dataCriacao = new Date();
    }
    // gera o elemento HTML da tarefa para ser inserido na página
    Tarefa.prototype.renderizar = function () {
        var _this = this;
        //cria o container principal do card
        var card = document.createElement('div');
        card.className = 'task-card';
        //formata a data para o padrão brasileiro
        var dataFormatada = this.dataCriacao.toLocaleString('pt-BR');
        //define o conteúdo interno do card
        card.innerHTML = "\n            <div class=\"task-info\">\n                <input type=\"checkbox\" class=\"task-check\">\n                <div class=\"task-details\">\n                    <h3>".concat(this.titulo, "</h3>\n                    <p>").concat(this.descricao || "<em>Sem descrição</em>", "</p>\n                    <small>Criado em: ").concat(dataFormatada, "</small>\n                </div>\n            </div>\n        ");
        //adiciona o feedback visual imediato
        var checkbox = card.querySelector('.task-check');
        checkbox.addEventListener('change', function () {
            _this.concluida = checkbox.checked;
            if (_this.concluida) {
                card.classList.add('completed');
            }
            else {
                card.classList.remove('completed');
            }
        });
        return card;
    };
    return Tarefa;
}());
// Selecionando os inputs
var inputTitulo = document.getElementById('input-titulo');
var inputDescricao = document.getElementById('input-descricao');
var btnAdicionar = document.getElementById('btn-adicionar');
btnAdicionar.addEventListener('click', function () {
    var titulo = inputTitulo.value;
    var descricao = inputDescricao.value;
    var urgencia = document.querySelector('input[name="urgencia"]:checked').value;
    if (titulo === "")
        return; // Não adiciona se estiver vazio
    // No momento de criar o card:
    var novoCard = document.createElement('div');
    novoCard.classList.add('task-card');
    // Mapeamento de cores vibrantes
    var cores = {
        baixa: '#2ecc71', // Verde neon
        media: '#f1c40f', // Amarelo (o seu favorito)
        alta: '#ff4757' // Vermelho vibrante
    };
    var corEscolhida = cores[urgencia];
    // Aplicamos a cor como uma variável CSS dentro do próprio card
    novoCard.style.setProperty('--card-color', corEscolhida);
    // 3. Montar o conteúdo interno do Card
    novoCard.innerHTML = "\n\n    <button class=\"btn-delete\">\n        <img src=\"images/bin.png\" alt=\"Excluir\">\n    </button>\n    <div class=\"task-content\">\n\n    <div class=\"task-info\">\n        <h3>".concat(titulo, "</h3>\n        <p>").concat(descricao, "</p>\n    </div>\n    <button class=\"btn-check\">\n            <img src=\"images/check.png\" alt=\"Concluir Tarefa\">\n        </button>\n    </div>\n\n");
    var btnCheck = novoCard.querySelector('.btn-check');
    btnCheck.addEventListener('click', function () {
        // Adiciona ou remove a classe que controla o visual "riscado"
        novoCard.classList.toggle('completed');
    });
    // --- LOGICA DE EXCLUSÃO (BIN) ---
    var btnDelete = novoCard.querySelector('.btn-delete');
    btnDelete.addEventListener('click', function () {
        novoCard.remove();
    });
    // 4. Adicionar na tela e limpar o formulário
    var container = document.getElementById('container-tarefas');
    var mensagemVazia = document.getElementById('mensagem-vazia');
    if (container) {
        if (mensagemVazia)
            mensagemVazia.style.display = 'none'; // Esconde o aviso
        container.appendChild(novoCard);
    }
    // Limpar campos
    inputTitulo.value = "";
    inputDescricao.value = "";
});
