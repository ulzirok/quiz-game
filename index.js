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
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
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
	
}

submitBtn.addEventListener('click', checkAnswer)
