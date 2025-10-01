// Quiz Application with Score Counter
class QuizApp {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = [
      {
        text: "A Terra é o terceiro planeta do Sistema Solar.",
        answer: true
      },
      {
        text: "A água ferve a 100°C ao nível do mar.",
        answer: true
      },
      {
        text: "O sol é uma estrela.",
        answer: true
      },
      {
        text: "O Brasil tem 26 estados.",
        answer: false
      },
      {
        text: "A Lua é maior que a Terra.",
        answer: false
      }
    ];

    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    // Screen elements
    this.startScreen = document.getElementById('start-screen');
    this.questionScreen = document.getElementById('question-screen');
    this.resultsScreen = document.getElementById('results-screen');

    // Button elements
    this.startBtn = document.getElementById('start-btn');
    this.trueBtn = document.getElementById('true-btn');
    this.falseBtn = document.getElementById('false-btn');
    this.restartBtn = document.getElementById('restart-btn');

    // Content elements
    this.questionText = document.getElementById('question-text');
    this.questionNumber = document.getElementById('question-number');
    this.scoreElement = document.getElementById('score');
    this.finalScore = document.getElementById('final-score');
    this.scoreMessage = document.getElementById('score-message');

    // Feedback elements
    this.feedbackOverlay = document.getElementById('feedback-overlay');
    this.feedbackText = this.feedbackOverlay.querySelector('.feedback-text');
  }

  attachEventListeners() {
    this.startBtn.addEventListener('click', () => this.startQuiz());
    this.trueBtn.addEventListener('click', () => this.answerQuestion(true));
    this.falseBtn.addEventListener('click', () => this.answerQuestion(false));
    this.restartBtn.addEventListener('click', () => this.restartQuiz());
  }

  startQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.updateScore();
    this.showScreen('question-screen');
    this.displayQuestion();
  }

  displayQuestion() {
    const question = this.questions[this.currentQuestion];
    this.questionText.textContent = question.text;
    this.questionNumber.textContent = this.currentQuestion + 1;

    // Reset button states
    this.resetButtonStyles();
    this.trueBtn.disabled = false;
    this.falseBtn.disabled = false;
    this.trueBtn.style.opacity = '1';
    this.falseBtn.style.opacity = '1';
  }

  answerQuestion(userAnswer) {
    const question = this.questions[this.currentQuestion];
    const isCorrect = userAnswer === question.answer;

    // Disable buttons to prevent multiple clicks
    this.trueBtn.disabled = true;
    this.falseBtn.disabled = true;

    // Visual feedback
    if (isCorrect) {
      this.score++;
      this.updateScore();
      this.showAnswerFeedback(true);
      this.showFeedbackAnimation(true);
    } else {
      this.showAnswerFeedback(false);
      this.showFeedbackAnimation(false);
    }

    // Move to next question after a short delay
    setTimeout(() => {
      this.hideFeedbackAnimation();
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.displayQuestion();
      } else {
        this.showResults();
      }
    }, 1500);
  }

  showAnswerFeedback(isCorrect) {
    if (isCorrect) {
      this.trueBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      this.trueBtn.style.color = 'white';
      this.trueBtn.style.border = '2px solid #28a745';
    } else {
      this.falseBtn.style.background = 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
      this.falseBtn.style.color = 'white';
      this.falseBtn.style.border = '2px solid #dc3545';
    }

    // Show correct answer
    const question = this.questions[this.currentQuestion];
    if (question.answer) {
      this.trueBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      this.trueBtn.style.color = 'white';
      this.trueBtn.style.border = '2px solid #28a745';
    } else {
      this.falseBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      this.falseBtn.style.color = 'white';
      this.falseBtn.style.border = '2px solid #28a745';
    }
  }

  updateScore() {
    this.scoreElement.textContent = this.score;
  }

  showResults() {
    this.finalScore.textContent = this.score;
    this.showScreen('results-screen');

    // Generate score message
    let message = '';
    const percentage = (this.score / this.questions.length) * 100;

    if (percentage === 100) {
      message = '🎉 Perfeito! Você acertou todas as perguntas!';
    } else if (percentage >= 80) {
      message = '👏 Excelente! Você tem um ótimo conhecimento!';
    } else if (percentage >= 60) {
      message = '👍 Bom trabalho! Continue estudando!';
    } else if (percentage >= 40) {
      message = '📚 Não desista! Pratique mais e você melhorará!';
    } else {
      message = '💪 Continue tentando! A prática leva à perfeição!';
    }

    this.scoreMessage.textContent = message;
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.updateScore();
    this.showScreen('start-screen');

    // Reset button styles
    this.resetButtonStyles();
  }

  showFeedbackAnimation(isCorrect) {
    // Set feedback text and style
    if (isCorrect) {
      this.feedbackText.textContent = 'Acertou!!';
      this.feedbackOverlay.classList.add('correct');
      this.feedbackOverlay.classList.remove('wrong');
    } else {
      this.feedbackText.textContent = 'Errou!!';
      this.feedbackOverlay.classList.add('wrong');
      this.feedbackOverlay.classList.remove('correct');
    }

    // Show overlay
    this.feedbackOverlay.classList.add('show');
  }

  hideFeedbackAnimation() {
    this.feedbackOverlay.classList.remove('show');
  }

  resetButtonStyles() {
    // Reset styles to original state
    this.trueBtn.style.cssText = '';
    this.falseBtn.style.cssText = '';

    // Remove animation classes if any
    this.trueBtn.classList.remove('correct', 'wrong');
    this.falseBtn.classList.remove('correct', 'wrong');

    // Reset opacity
    this.trueBtn.style.opacity = '1';
    this.falseBtn.style.opacity = '1';
  }

  showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show target screen
    document.getElementById(screenId).classList.add('active');
  }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new QuizApp();
});