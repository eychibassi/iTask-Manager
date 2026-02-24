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
