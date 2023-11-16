
let questions = [];
let currentQuestion = 0;
let score = 0;

const questionText = $("#question-text");
const optionsContainer = $("#options-container");
const resultContainer = $("#result-container");
const resultText = $("#result-text");
const nextButton = $("#next-button");
const restartButton = $("#restart-button");

function loadQuizData() {
    $.ajax({
        url: 'quiz_questions.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            questions = data;
            loadQuestion();
        },
        error: function (error) {
            console.error('Error loading quiz data:', error);
        }
    });
}

function loadQuestion() {
    const current = questions[currentQuestion];
    questionText.text(current.question);

    optionsContainer.empty();

    current.options.forEach((option, index) => {
        const li = $(`<li class="option">${option}</li>`);
        li.click(() => handleAnswer(option, li));
        optionsContainer.append(li);
    });
}

function handleAnswer(selectedOption, selectedElement) {
    checkAnswer(selectedOption, selectedElement);
    $(".option").off("click");
    nextButton.show();
}

function checkAnswer(selectedOption, selectedElement) {
    const current = questions[currentQuestion];
    const resultContainer = $("<div class='result'></div>");

    if (selectedOption === current.correctAnswer) {
        resultContainer.text("Your answer is correct!");
        selectedElement.addClass("correct");
    } else {
        resultContainer.text(`Your answer: ${selectedOption} | Correct answer: ${current.correctAnswer}`);
        selectedElement.addClass("wrong");

        // Display the correct answer
        const correctOptionIndex = current.options.indexOf(current.correctAnswer);
        if (correctOptionIndex !== -1) {
            optionsContainer.children().eq(correctOptionIndex).addClass("correct");
        }
    }

    resultContainer.appendTo(optionsContainer);

    if (selectedOption === current.correctAnswer) {
        score++;
    }
}

nextButton.click(() => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        nextButton.hide();
    } else {
        showResult();
    }
});

restartButton.click(() => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resultContainer.hide();
    restartButton.hide();
    nextButton.show();
});

function showResult() {
    resultText.text(`You scored ${score} out of ${questions.length}!`);
    resultContainer.show();
    nextButton.hide();
    restartButton.show();
}

loadQuizData();


