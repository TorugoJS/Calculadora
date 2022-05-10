//factory function = retorna um obj
// metodos vão para baixo e atributos vão para cima
// quem chama o metodo é quem é o this
//
function criaCalculadora() {
    return {
        //pegando classe do display no html
        display: document.querySelector('.display'),

        //parte do objeto
        //metodo que inicia calculadora
        inicia() {
            //chamando metodos
            //this => para referenciar qual obj 
            this.cliqueBotoes();
            this.pressionaBackSpace();
            this.pressionaEnter();
        },

        pressionaBackSpace() {
            this.display.addEventListener('keydown', e => {
                if (e.keyCode === 8) {
                    e.preventDefault();
                    this.clearDisplay();
                }
            });
        },
        //metodo que assim que pressiona enter, realizar conta
        pressionaEnter() { 
            //utilizar arrow function para não perder o this
            this.display.addEventListener('keyup', e => {
                // e.keyCode === 13 = enter
                if (e.keyCode === 13) {
                    // chamando metodo
                    this.realizaConta();
                }
            });
        },

        //metodo que vai realizar conta com (eval)
        realizaConta() {
            //uma variável que vai amazenar o texto do display
            let conta = this.display.value;

            //caso ocorra um erro, tratar ele
            try {
                conta = eval(conta);

                // se a conta for Nan, mostrar conta invalida
                if (!conta) {
                    alert('Conta inválida');
                    return;
                }

                this.display.value = String(conta);
            } catch (e) {
                // se chegou aqui vai dar um erro
                alert('Conta inválida');
                return;
            }
        },

        //um metodo para limpar o display, captura o display e coloca uma string vazia para limpar
        clearDisplay() {
            this.display.value = '';
        },
        //um metodo para limpar um elemento usando slide (0, -1) apaga o ultimo
        apagaUm() {
            this.display.value = this.display.value.slice(0, -1);
        },

        //capturando os cliques nos botões do html
        cliqueBotoes() {
            //this -> calculadora
            //utilizando arrow function, sempre vai ficar travado em quem criou o elemento, sabendo quem this fora da function e de origem da calculadora
            document.addEventListener('click', (e) => {
                //variável que vai amarzenar o evento, o que ta sendo clicado
                const el = e.target;

                //jogando os valores dos botões no display
                //tudo que for clicado vai ser exibido

                //se o elemento que foi selecionado for clicado, 
                if (el.classList.contains('btn-num')) {
                    this.btnParaDisplay(el.innerText);
                }
                //se o elemento clear for clicado, chama função e limpa
                if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }
                //se o elemento del for clicado, chama função e apaga um
                if (el.classList.contains('btn-del')) {
                    this.apagaUm();
                }
                // se o elemento de igual for clicado realiza conta
                if (el.classList.contains('btn-eq')) {
                    this.realizaConta();
                }

                this.display.focus();
            });
        },
        // recebe valor do elemento que ta sendo clicado, concatena o que tiver no display e mais o botão que foi clicado
        btnParaDisplay(valor) {
            this.display.value += valor;
        }

    };
}
// calculadora chama o inicia()
const calculadora = criaCalculadora();
calculadora.inicia();
