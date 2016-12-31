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

// NOTE: put battledome code into own file

let sections = ["select-robot",
								"select-model",
								"input-name",
								"confirmation"]
let sectionIndex = 0
let titleScreenDone = false
let robotTypeSelected = false
let robotModelSelected = false
var player1 = {}
var enemy = {}

// Add event listeners upon page load
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
		robotTypeSelected = true
		loadModels(clickEvt)
		highlightRobot(clickEvt)
	})

	$('.model').click(function(clickEvt) {
		robotModelSelected = true
		updateImages(clickEvt)
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

	$('#to-battle').click(function() {
		generateEnemy()
		loadBattle()
	})

	$('#attack').click(whenAttackIsClicked)
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

// Remove highlighting from page and change
// boolean variable for checking selection to false
// Then, go back a page
function showPreviousSection() {
	// Discard changes from current page when you go backwards
	var currentSection = sections[sectionIndex]
	switch (currentSection) {
		case 'select-model':
			robotModelSelected = false
			$('.model .img-container')
				.removeClass('highlight')
			$('.model .stats-container')
				.hide()
			break
		case 'input-name':
			$('#name').val('')
			break
	}

	// Hide current page, show previous page
	// Decriment sectionIndex
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
			if(robotTypeSelected === true) okToProceed = true
			else alert("Please select a robot type.")
			break
		case "select-model":
			if(robotModelSelected === true) okToProceed = true
			else alert("Please select your model")
			break
		case "input-name":
			if($('#name').val() != ''){
				okToProceed = true
				assignRobotName()
			}
			else alert("Please input a name")
			break
		case "confirmation":
			okToProceed = true
			break
	}

	// Shows next section if it's OK to
	if(okToProceed === true) {
		showNextSection()
		$( "#name" ).focus();
	}
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

function updateImages(clickEvt) {
	var imgSrc = $(clickEvt.target)
		.closest('.model')
		.find('img')
		.attr('src')

	$('#confirmation img')
		.attr('src', imgSrc)

	$('#player1 img')
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
	$('#player1 h3').text(name)
}














