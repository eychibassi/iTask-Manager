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

    // Selecionando os inputs
const inputTitulo = document.getElementById('input-titulo') as HTMLInputElement;
const inputDescricao = document.getElementById('input-descricao') as HTMLTextAreaElement;
const btnAdicionar = document.getElementById('btn-adicionar') as HTMLButtonElement;

btnAdicionar.addEventListener('click', () => {
    const titulo = inputTitulo.value;
    const descricao = inputDescricao.value;
    const urgencia = (document.querySelector('input[name="urgencia"]:checked') as HTMLInputElement).value;

    if (titulo === "") return; // Não adiciona se estiver vazio

    // No momento de criar o card:
const novoCard = document.createElement('div');
novoCard.classList.add('task-card');

// Mapeamento de cores vibrantes
const cores = { 
    baixa: '#2ecc71', // Verde neon
    media: '#f1c40f', // Amarelo (o seu favorito)
    alta: '#ff4757'   // Vermelho vibrante
};

const corEscolhida = cores[urgencia as keyof typeof cores];

// Aplicamos a cor como uma variável CSS dentro do próprio card
novoCard.style.setProperty('--card-color', corEscolhida);

    // 3. Montar o conteúdo interno do Card
    novoCard.innerHTML = `

    <button class="btn-delete">
        <img src="images/bin.png" alt="Excluir">
    </button>
    <div class="task-content">

    <div class="task-info">
        <h3>${titulo}</h3>
        <p>${descricao}</p>
    </div>
    <button class="btn-check">
            <img src="images/check.png" alt="Concluir Tarefa">
        </button>
    </div>

`;

const btnCheck = novoCard.querySelector('.btn-check') as HTMLButtonElement;

btnCheck.addEventListener('click', () => {
    // Adiciona ou remove a classe que controla o visual "riscado"
    novoCard.classList.toggle('completed');
});

// --- LOGICA DE EXCLUSÃO (BIN) ---
const btnDelete = novoCard.querySelector('.btn-delete') as HTMLButtonElement;

btnDelete.addEventListener('click', () => {
    novoCard.remove();
});

    // 4. Adicionar na tela e limpar o formulário
    const container = document.getElementById('container-tarefas');
    const mensagemVazia = document.getElementById('mensagem-vazia');

    if (container) {
        if (mensagemVazia) mensagemVazia.style.display = 'none'; // Esconde o aviso
        container.appendChild(novoCard);
    }

    // Limpar campos
    inputTitulo.value = "";
    inputDescricao.value = "";
});
