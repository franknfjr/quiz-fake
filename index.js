// Selecionar os botões
const btnCorrect = document.querySelector('.btn-correct');
const btnWrong = document.querySelector('.btn-wrong');

// Adicionar event listeners
btnCorrect.addEventListener('click', () => {
    console.log('Botão CORRETO clicado!');
});

btnWrong.addEventListener('click', () => {
    console.log('Botão ERRADO clicado!');
});
