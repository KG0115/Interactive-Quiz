const questions = [
    {
        question: "How many elements are in the periodic table?",
        options: ["102", "98", "84", "118"],
        correctAnswer: "118"
    },
    {
        question: "How many minutes are in a full week?",
        options: ["10,080", "15,120", "20,180", "12,060"],
        correctAnswer: "10,080"
    },
    {
        question: "How many dots appear on a pair of dice?",
        options: ["36", "21", "42", "48"],
        correctAnswer: "42"
    },
    {
        question: "Simplify the expression 4m+5+2m-1",
        options: ["10m", "6m + 4", "6m + 6", "6m - 4"],
        correctAnswer: "6m + 4"
    },
    {
        question: "Which equation represents a line parallel to the y-axis?",
        options: ["y = x", "y = 3", "x = -y", "x = -4"],
        correctAnswer: "x = -4"
    }
];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

const resultContainer = document.getElementById("result-container"); // Define the resultContainer
const resultText = document.getElementById("result-text");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const current = questions[currentQuestion];
    questionText.innerText = current.question;
    optionsContainer.innerHTML = "";

    current.options.forEach((option) => {
        const li = document.createElement("li");
        li.className = "option";
        li.innerText = option;
        li.addEventListener("click", () => handleAnswer(option, li));
        optionsContainer.appendChild(li);
    });
}

function handleAnswer(selectedOption, selectedElement) {
    checkAnswer(selectedOption, selectedElement);
    optionsContainer.querySelectorAll(".option").forEach((option) => {
        option.removeEventListener("click", () => handleAnswer(selectedOption, option));
        option.classList.remove("selected");
    });
    nextButton.style.display = "block";
}

function checkAnswer(selectedOption, selectedElement) {
    const current = questions[currentQuestion];
    const resultContainer = document.createElement("div");
    resultContainer.className = "result";

    if (selectedOption === current.correctAnswer) {
        resultContainer.innerText = "Your answer is correct!";
        selectedElement.classList.add("correct");
    } else {
        resultContainer.innerText = `Your answer: ${selectedOption} | Correct answer: ${current.correctAnswer}`;
        selectedElement.classList.add("wrong");

        // Display the correct answer
        const correctOptionIndex = current.options.indexOf(current.correctAnswer);
        if (correctOptionIndex !== -1) {
            const correctOptionElement = optionsContainer.children[correctOptionIndex];
            correctOptionElement.classList.add("correct");
        }
    }

    optionsContainer.appendChild(resultContainer);

    if (selectedOption === current.correctAnswer) {
        score++;
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        nextButton.style.display = "none";
    } else {
        showResult();
    }
});
const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resultContainer.style.display = "none"; // Hide the result container
    restartButton.style.display = "none"; // Hide the restart button again
    nextButton.style.display = "block"; // Show the "Next" button
});

function showResult() {
    resultText.innerText = `You scored ${score} out of ${questions.length}!`;
    resultContainer.style.display = "block"; // Show the result container
    nextButton.style.display = "none"; // Hide the "Next" button
    restartButton.style.display = "block"; // Show the "Restart Quiz" button
}
loadQuestion();

