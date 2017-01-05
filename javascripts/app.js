var titleScreenDone = false
var player1 = {}
var enemy = {}

// Add event listeners upon page load
$(document).ready(function() {

	// Show first article
	$('article#landing-page').show()
	animateTitle()
	$(document).keypress(moveFromTitle)
	$(document).click(moveFromTitle)



	// Change this to player input and enemy input
	// $('#name').keyup(function(keyEvt) {
	// 	updateName()
	// 	if(keyEvt.key === "Enter") {
	// 		assignRobotName()
	// 		checkThenProceed()
	// 	}
	// })

	$('#player1-selection input').keyup(function(keyEvt) {
		updatePlayerName()
		if(keyEvt.key === "Enter") this.blur()
	})

	$('#enemy-selection input').keyup(function(keyEvt) {
		updateEnemyName()
		if(keyEvt.key === "Enter") this.blur()
	})

	$('#player1-selection select').change(assignPlayerRobot)

	$('#enemy-selection select').change(assignEnemyRobot)


	$('#to-battle').click(function() {
		generateEnemy()
		loadBattle()
		fightPlayer()
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

function loadModelStats() {
	$('#boulder .health .stats-bar').css('width', '90%')
	$('#boulder .strength .stats-bar').css('width', '83%')
	$('#boulder .speed .stats-bar').css('width', '5%')

	$('#pebble .health .stats-bar').css('width', '70%')
	$('#pebble .strength .stats-bar').css('width', '42%')
	$('#pebble .speed .stats-bar').css('width', '80%')

	$('#scroll .health .stats-bar').css('width', '60%')
	$('#scroll .strength .stats-bar').css('width', '75%')
	$('#scroll .speed .stats-bar').css('width', '20%')

	$('#index-card .health .stats-bar').css('width', '50%')
	$('#index-card .strength .stats-bar').css('width', '20%')
	$('#index-card .speed .stats-bar').css('width', '100%')

	$('#garden-scissors .health .stats-bar').css('width', '70%')
	$('#garden-scissors .strength .stats-bar').css('width', '59%')
	$('#garden-scissors .speed .stats-bar').css('width', '60%')

	$('#craft-scissors .health .stats-bar').css('width', '60%')
	$('#craft-scissors .strength .stats-bar').css('width', '30%')
	$('#craft-scissors .speed .stats-bar').css('width', '80%')

	// Change color based on percent width
	$('#select-model .stats-bar').each(function() {
		var width = parseFloat($(this).css('width'))

		if(width >= 75) $(this).css('background', '#14b214')
		else if (width >= 25 && width < 75) $(this).css('background', 'rgb(219, 219, 19)')
		else $(this).css('background', '#ff2121')
	})
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

function assignPlayerRobot() {
	var model = $('#player1-selection select').val()

	switch(model) {
		case 'boulder':
			player1 = new Battledome.Robot.Boulder()
			$('#player1-selection img').attr('src', '/img/models/boulder.png')
			break
		case 'pebble':
			player1 = new Battledome.Robot.Pebble()
			$('#player1-selection img').attr('src', '/img/models/pebble.png')
			break
		case 'scroll':
			player1 = new Battledome.Robot.Scroll()
			$('#player1-selection img').attr('src', '/img/models/scroll.png')
			break
		case 'index-card':
			player1 = new Battledome.Robot.IndexCard()
			$('#player1-selection img').attr('src', '/img/models/index-card.png')
			break
		case 'garden-scissors':
			player1 = new Battledome.Robot.GardenScissors()
			$('#player1-selection img').attr('src', '/img/models/garden-scissors.png')
			break
		case 'craft-scissors':
			player1 = new Battledome.Robot.CraftScissors()
			$('#player1-selection img').attr('src', '/img/models/craft-scissors.png')
			break
		case 'random':
			player1 = {}
			$('#player1-selection img').attr('src', '/img/question-mark.png')
			break
	}
	loadPlayerStats()
}

function loadPlayerStats() {
	if($('#player1-selection select').val() === 'random') {
		$('#player1-selection .stats-container').hide()
	}

	else {
		$('#player1-selection .health .stats-bar').css('width', `${player1.baseHealth}%`)
		$('#player1-selection .strength .stats-bar').css('width', `${(player1.baseStrength / 30) * 100}%`)
		$('#player1-selection .speed .stats-bar').css('width', `${((5 - player1.cooldown) / 5) * 100}%`)

		$('#player1-selection .stats-container').show()
	}
}

function assignEnemyRobot() {
	var model = $('#enemy-selection select').val()

	switch(model) {
		case 'boulder':
			enemy = new Battledome.Robot.Boulder()
			$('#enemy-selection img').attr('src', '/img/models/boulder.png')
			break
		case 'pebble':
			enemy = new Battledome.Robot.Pebble()
			$('#enemy-selection img').attr('src', '/img/models/pebble.png')
			break
		case 'scroll':
			enemy = new Battledome.Robot.Scroll()
			$('#enemy-selection img').attr('src', '/img/models/scroll.png')
			break
		case 'index-card':
			enemy = new Battledome.Robot.IndexCard()
			$('#enemy-selection img').attr('src', '/img/models/index-card.png')
			break
		case 'garden-scissors':
			enemy = new Battledome.Robot.GardenScissors()
			$('#enemy-selection img').attr('src', '/img/models/garden-scissors.png')
			break
		case 'craft-scissors':
			enemy = new Battledome.Robot.CraftScissors()
			$('#enemy-selection img').attr('src', '/img/models/craft-scissors.png')
			break
		case 'random':
			enemy = {}
			$('#enemy-selection img').attr('src', '/img/question-mark.png')
			break
	}
	loadEnemyStats()
}

function loadEnemyStats() {
	if($('#enemy-selection select').val() === 'random') {
		$('#enemy-selection .stats-container').hide()
	}

	else {
		$('#enemy-selection .stats-container').show()
	}
}

function assignRobotName(evt) {
	var name = $('#name').val()
	player1.name = name
}

function updatePlayerName() {
	var name = $('#player1-selection input').val()
	$('#player1-selection h3').text(name)
}

function updateEnemyName() {
	var name = $('#enemy-selection input').val()
	$('#enemy-selection h3').text(name)
}














