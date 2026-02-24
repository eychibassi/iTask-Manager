//CONTÉM TODA A LÓGICA EM TYPESCRIPT

//definição da estrutura e das propriedades da classe Tarefa
class Tarefa {
    public titulo: string;
    public descricao: string;
    public dataCriacao: Date;
    public concluida: boolean;

//inicializa o objeto com status não concluída (false) e registra a data/horário da criação   
    constructor(titulo: string, descricao: string) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.concluida = false;
        this.dataCriacao = new Date();
    }

    // gera o elemento HTML da tarefa para ser inserido na página
    renderizar(): HTMLElement {
        //cria o container principal do card
        const card = document.createElement('div');
        card.className = 'task-card';

        //formata a data para o padrão brasileiro
        const dataFormatada = this.dataCriacao.toLocaleString('pt-BR');

        //define o conteúdo interno do card
        card.innerHTML = `
            <div class="task-info">
                <input type="checkbox" class="task-check">
                <div class="task-details">
                    <h3>${this.titulo}</h3>
                    <p>${this.descricao || "<em>Sem descrição</em>"}</p>
                    <small>Criado em: ${dataFormatada}</small>
                </div>
            </div>
        `;

        //adiciona o feedback visual imediato
        const checkbox = card.querySelector('.task-check') as HTMLInputElement;
        checkbox.addEventListener('change', () => {
            this.concluida = checkbox.checked;
            
            if (this.concluida) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
        });

        return card;
    }

    }