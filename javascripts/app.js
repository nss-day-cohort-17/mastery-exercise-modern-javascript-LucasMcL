// SPA Layout

// Every "page" in a article
// Title page, click anywhere to continue
// First page, next button on right side
// Second page on, previous and next buttons

// The previous button should execute immediately
// The next button should perform a check to make sure
//	something has been selected

// Maybe give all the buttons that move forward the same class?

// Article -- Landing page
// Article -- Selection
	// Header
	// Section, select-robot [hide previous button]
	// Section, select-model
		// This has to be dynamic, based on robot selection
	// Section, select-weapon
	// Section, input-name [hide next button]
	// Buttons below
// Article -- Battlefield

let sections = ["select-robot",
								"select-model",
								"input-name",
								"confirmation"]
let sectionIndex = 0
let titleScreenDone = false
var player1 = {}

$(document).ready(function() {

	// Show first article
	$('article#landing-page').show()
	//Note: adjust this animation
	animateTitle()
	//Note: use setTimeout to delay showing of footer
	// after animation
	$(document).keypress(moveFromTitle)
	$(document).click(moveFromTitle)

	// Disable the previous button upon load
	$('#previous').attr('disabled', true)

	// When the next button is clicked
	$('#next').click(checkThenProceed)
	// When the previous button is clicked
	$('#previous').click(showPreviousSection)

	$('.robot').click(function(clickEvt) {
		loadModels(clickEvt)
		highlightRobot(clickEvt)
	})

	$('.model').click(function(clickEvt) {
		loadConfirmationImage(clickEvt)
		highlightModel(clickEvt)
		assignRobot(clickEvt)
	})

	$('#name').keyup(function(keyEvt) {
		updateName()
		if(keyEvt.key === "Enter") {
			assignRobotName()
			checkThenProceed()
		}
	})

	$('#to-battle').click(loadBattle)
})

function animateTitle() {
	$('article#landing-page h1').slideDown("slow")
}

function moveFromTitle() {
	if(titleScreenDone === true) return
	else {
		$('article#landing-page').hide()
		$('article#selection').show()
		titleScreenDone = true
	}
}

function showNextSection() {
	$(`#${sections[sectionIndex]}`).hide()
	sectionIndex++
	$(`#${sections[sectionIndex]}`).show()
	$('#previous').attr('disabled', false)
	if(sectionIndex === sections.length - 1) {
		$('#next').addClass('hidden')
	}
}

function showPreviousSection() {
	$(`#${sections[sectionIndex]}`).hide()
	sectionIndex--
	$(`#${sections[sectionIndex]}`).show()
	$('#next').removeClass('hidden')
	if(sectionIndex === 0) {
		$('#previous').attr('disabled', true)
	}
}

// Performs check before moving on to next section
// Condition to check changes based on section
function checkThenProceed() {
	var currentSection = sections[sectionIndex]
	var okToProceed = false

	// Performs check to see if it's ok to proceed
	switch (currentSection) {
		case "select-robot":
			okToProceed = true
			break
		case "select-model":
			okToProceed = true
			break
		case "input-name":
			okToProceed = true
			assignRobotName()
			break
		case "confirmation":
			okToProceed = true
			break
	}
	if(okToProceed = true) showNextSection()
}

function loadModels(clickEvt) {
	// Get id from robot element
	var robot = $(clickEvt.target)
		.closest('.robot')
		.attr('id')

	// Class uses !important so it stays hidden,
	// Even when the next section is shown
	$('.model-row').addClass('hidden')

	switch (robot) {
		case 'rock':
			$('#rock-models').removeClass('hidden')
			break
		case 'paper':
			$('#paper-models').removeClass('hidden')
			break
		case 'scissors':
			$('#scissors-models').removeClass('hidden')
			break
	}
}

function highlightRobot(clickEvt) {
	var target = clickEvt.target
	$('.robot .img-container')
		.removeClass('highlight')
	$('.robot .stats-container')
		.hide()

	$(target)
		.closest('.img-container')
		.addClass('highlight')
	$(target)
		.closest('.robot')
		.find('.stats-container')
		.slideDown("slow")
}

function highlightModel(clickEvt) {
	var target = clickEvt.target
	$('.model .img-container')
		.removeClass('highlight')
	$('.model .stats-container')
		.hide()

	$(target)
		.closest('.img-container')
		.addClass('highlight')
	$(target)
		.closest('.model')
		.find('.stats-container')
		.slideDown("slow")
}

function loadConfirmationImage(clickEvt) {
	var imgSrc = $(clickEvt.target)
		.closest('.model')
		.find('img')
		.attr('src')

	$('#confirmation img')
		.attr('src', imgSrc)
}

function assignRobot(clickEvt) {
	var model = $(clickEvt.target)
		.closest('.model')
		.attr('id')

	switch(model) {
		case 'boulder':
			player1 = new Battledome.Robot.Boulder()
			break
		case 'pebble':
			player1 = new Battledome.Robot.Pebble()
			break
		case 'scroll':
			player1 = new Battledome.Robot.Scroll()
			break
		case 'index-card':
			player1 = new Battledome.Robot.IndexCard()
			break
		case 'garden-scissors':
			player1 = new Battledome.Robot.GardenScissors()
			break
		case 'craft-scissors':
			player1 = new Battledome.Robot.CraftScissors()
			break
	}
}

function assignRobotName(evt) {
	var name = $('#name').val()
	player1.name = name
}

function updateName() {
	var name = $('#name').val()
	$('#confirmation h3').text(name)
}

function loadBattle() {
	$('article').hide()
	$('article#battledome').show()
}












