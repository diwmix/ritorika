let questions = [];
let answers = [];
let currentIndex = 0; // Keep track of the current question
let correctCount = 0; // Keep track of correct answers

fetch("lvl2test.txt")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.split("\n");

    for (let i = 0; i < lines.length; i += 1) {
      const quote = lines[i].trim();
      const words = quote.split(" ");

      // Choose a random word index
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * words.length);
      } while (words[randomIndex].length < 4 || words[randomIndex].startsWith("(")); // Ensure the word is at least 3 characters long and does not start with "("

      // Save the correct answer
      answers.push(words[randomIndex]);

      // Replace the random word with "_____"
      words[randomIndex] = "_____";

      // Join the words back into a sentence
      const question = words.join(" ");
      questions.push(question);
    }

    renderQuiz();
  });

function renderQuiz() {
  const questionsContainer = document.getElementById("questions-container");
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerHTML = questions[currentIndex];

  const answerInput = document.createElement("input");
  answerInput.classList.add("answer-input");
  answerInput.setAttribute("type", "text");

  questionsContainer.appendChild(questionElement);
  questionsContainer.appendChild(answerInput);

  document.getElementById("submit-btn").addEventListener("click", () => {
    const userAnswer = answerInput.value.trim().replace(/,/g, "").replace(/\?/g, ""); // Remove commas from the user's answer
    const correctAnswer = answers[currentIndex].replace(/,/g, "").replace(/\?/g, ""); // Remove commas from the correct answer

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      correctCount += 1;
      console.log(correctCount)
    }

    currentIndex += 1; // Move to the next question

    // Check if there are more questions
    if (currentIndex < questions.length) {
      // Clear current question and input
      questionElement.innerHTML = questions[currentIndex];
      answerInput.value = "";
    } else {
      // No more questions, quiz is complete
      questionElement.style.display = "none";
      answerInput.style.display = "none";
      document.getElementById("submit-btn").style.display = "none";

      // Display result
      const resultContainer = document.getElementById("result");
      resultContainer.innerHTML = `Правильних відповідей ${correctCount} із ${questions.length}`;
      resultContainer.style.display = "block";
    }
  });
}
