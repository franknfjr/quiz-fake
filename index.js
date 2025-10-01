const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2
    },
    {
        question: "Quantos continentes existem no mundo?",
        options: ["5", "6", "7", "8"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const landingPage = document.getElementById('landing-page');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const questionCounter = document.getElementById('question-counter');
const scoreEl = document.getElementById('score');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    landingPage.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    selectedAnswer = null;
    nextBtn.classList.add('hidden');

    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    questionCounter.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsEl.appendChild(button);
    });
}

function selectAnswer(index) {
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const buttons = optionsEl.querySelectorAll('.option-btn');
    const correctAnswer = questions[currentQuestion].correct;

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctAnswer) {
            btn.classList.add('correct');
        } else if (i === selectedAnswer) {
            btn.classList.add('wrong');
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const percentage = (score / questions.length) * 100;
    scoreEl.textContent = `Você acertou ${score} de ${questions.length} perguntas (${percentage}%)`;
}

function restartQuiz() {
    resultContainer.classList.add('hidden');
    landingPage.classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
}
