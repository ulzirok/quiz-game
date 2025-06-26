const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Какой результат у выражения undefined == null?",
		answers: [
			"true",
			"false",
			"undefined",
			"Ошибка",
		],
		correct: 1,
	},
	{
		question: "Что делает setTimeout(function, 1000)?",
		answers: [
			"Запускает функцию немедленно",
			"Останавливает выполнение скрипта",
			"Выполняет функцию через 1 секунду",
			"Повторяет функцию каждые 1 секунду",
		],
		correct: 3,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
	{
		question: "Какое ключевое слово используется для объявления переменной в JavaScript?",
		answers: ["let", "var", "const", "все перечисленные"],
		correct: 4,
	},
	{
		question: "Какой тип данных возвращает typeof null?",
		answers: ["null", "object", "undefined", "boolean"],
		correct: 2,
	},
	{
		question: "Какой метод используется для добавления элемента в конец массива?",
		answers: [".shift()", ".unshift()", ".push()", ".pop()"],
		correct: 3,
	},
	{
		question: "Что делает оператор === в JavaScript?",
		answers: ["Сравнивает только значения", "Присваивает значение", "Сравнивает значения и типы ", "Преобразует в строку"],
		correct: 3,
	},
	{
		question: "Какой будет результат Boolean(0)?",
		answers: ["true", "false", "null", "undefined"],
		correct: 2,
	},
	{
		question: "Что делает метод querySelector()?",
		answers: ["Удаляет элемент со страницы", "Добавляет элемент в DOM", "Находит элемент по ID", "Находит первый элемент по CSS-селектору"],
		correct: 4,
	},
];
let score = 0
let questionIndex = 0

function clearPage () {
	headerContainer.innerHTML = ''
  listContainer.innerHTML = ''
}
clearPage()

function showQuestion () {
	const headerTemplate = `<h2 class="title">%titleQuestion%</h2>`
	const titleHtml = headerTemplate.replace('%titleQuestion%', questions[questionIndex]['question'])
	headerContainer.innerHTML = titleHtml
	
	for ([index, answerItem] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate = 
		`<li>
				<label>
					<input value="${index + 1}" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
		</li>`
		const answerHtml = questionTemplate.replace('%answer%', answerItem)
		listContainer.innerHTML += answerHtml
	}
	
}
showQuestion()

function checkAnswer () {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
	
	if (!checkedRadio) {
		submitBtn.blur()
		return
	}
	
	const userAnswer = parseInt(checkedRadio.value)
	if (userAnswer === questions[questionIndex]['correct']) {
		score++
	}
	
	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage()
		showQuestion()
		return
	}
	clearPage()
	showResults()
	
}

function showResults () {
	const resultsTemplate = `
	  <h2 class="title">%title%</h2>
	  <h3 class="summary">%message%</h3>
	  <p class="result">%result%</p>
	 `
	let title, message
	
	if (score === questions.length) {
		title = 'Поздравляю! 🎉'
		message = 'Вы ответили верно на все вопросы! 😎👍'
		
	}
	else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 😉'
		message = 'Вы дали более половины правильных ответов! 👍'
	}
	else {
		title = 'Стоит постараться 😟💪'
		message = 'Пока у Вас меньше половины правильных ответов 🥺'
	}
	
	let result = `${score} ✅ из ${questions.length}`
	
	const finalMessage = resultsTemplate
	.replace('%title%', title)
	.replace('%message%', message)
	.replace('%result%', result)
	
	headerContainer.innerHTML = finalMessage
	
	submitBtn.blur()
	submitBtn.innerHTML = 'Начать заново'
	submitBtn.addEventListener('click', () => history.go())
}

submitBtn.addEventListener('click', checkAnswer)
