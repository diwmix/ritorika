let currentQuestion = 0;
let correctAnswers = 0;
let questions = [];

// Загрузка файла с вопросами и ответами
fetch("test.txt")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.split("\n");

    for (let i = 0; i < lines.length; i += 6) {
      const question = lines[i];
      const answers = lines.slice(i + 1, i + 6);

      if (question.trim() !== "") {
        questions.push({ question, answers });
      }
    }

    displayQuestion();
  })
  .catch((error) => console.error("Ошибка загрузки файла:", error));

// Отображение вопроса и ответов
function displayQuestion() {
  document.getElementById("question").innerText =
    questions[currentQuestion].question;

  const answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = "";

  // Shuffle the answers
  const shuffledAnswers = shuffleArray([...questions[currentQuestion].answers]);

  for (let i = 0; i < shuffledAnswers.length; i++) {
    const answer = shuffledAnswers[i].trim();
    const isCorrect = answer.includes("~");

    if (answer !== "") {
      const button = document.createElement("button");
      button.innerText = answer.replace("~", ""); // Убираем символ ~ для отображения
      button.classList.add("answer-btn");
      button.onclick = function () {
        selectAnswer(isCorrect);
      };
      answersContainer.appendChild(button);
    }
  }
}

// Обработка выбора ответа
function selectAnswer(isCorrect) {
  const prev = document.querySelector('#prevButton')


  if (isCorrect) {
    correctAnswers++;
    console.log(correctAnswers)
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    hideLastQuestion();
    showResult();
  }

  prev.onclick = function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      displayQuestion();
    }
  };
}

// Скрытие последнего вопроса и ответов
function hideLastQuestion() {
  document.getElementById("question").style.display = "none";
  document.getElementById("answers").style.display = "none";
}



// Вывод результата
function showResult() {
  document.getElementById(
    "result"
  ).innerText = `Правильних відповідей: ${correctAnswers} із ${questions.length}`;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}