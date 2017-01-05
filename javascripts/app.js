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

	// Live-update name
	$('#player1-selection input').keyup((keyEvt) => {
		updatePlayerName()
		if(keyEvt.key === "Enter") $('#player1-selection input').blur()
	})
	$('#enemy-selection input').keyup((keyEvt) => {
		updateEnemyName()
		if(keyEvt.key === "Enter") $('#enemy-selection input').blur()
	})

	// Create player-object upon selection
	$('#player1-selection select').change(assignPlayerRobot)
	$('#enemy-selection select').change(assignEnemyRobot)


	$('#to-battle').click(function() {
		if($.isEmptyObject(player1)) generatePlayer()
		else loadPlayer()
		if($.isEmptyObject(enemy)) generateEnemy()
		else loadEnemy()
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

function assignPlayerRobot() {
	var model = $('#player1-selection select').val()

	switch(model) {
		case 'boulder':
			player1 = new Battledome.Robot.Boulder()
			$('#player1-selection img').attr('src', '/img/models/boulder.png')
			$('#player1 img').attr('src', '/img/models/boulder.png')
			break
		case 'pebble':
			player1 = new Battledome.Robot.Pebble()
			$('#player1-selection img').attr('src', '/img/models/pebble.png')
			$('#player1 img').attr('src', '/img/models/pebble.png')
			break
		case 'scroll':
			player1 = new Battledome.Robot.Scroll()
			$('#player1-selection img').attr('src', '/img/models/scroll.png')
			$('#player1 img').attr('src', '/img/models/scroll.png')
			break
		case 'index-card':
			player1 = new Battledome.Robot.IndexCard()
			$('#player1-selection img').attr('src', '/img/models/index-card.png')
			$('#player1 img').attr('src', '/img/models/index-card.png')
			break
		case 'garden-scissors':
			player1 = new Battledome.Robot.GardenScissors()
			$('#player1-selection img').attr('src', '/img/models/garden-scissors.png')
			$('#player1 img').attr('src', '/img/models/garden-scissors.png')
			break
		case 'craft-scissors':
			player1 = new Battledome.Robot.CraftScissors()
			$('#player1-selection img').attr('src', '/img/models/craft-scissors.png')
			$('#player1 img').attr('src', '/img/models/craft-scissors.png')
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
		$('#player1-selection .speed .stats-bar').css('width', `${((5.1 - player1.cooldown) / 5) * 100}%`)
		$('#player1-selection .attack td:last-child').text(`${player1.attack}`)
		$('#player1-selection .strong td:last-child').text(`${player1.strongAgainst}`)
		$('#player1-selection .weak td:last-child').text(`${player1.weakAgainst}`)

		$('#player1-selection .stats-container').show()
	}

	// Change color based on percent width
	$('#player1-selection .stats-bar').each(function() {
		var width = parseFloat($(this).css('width'))

		if(width >= 75) $(this).css('background', '#14b214')
		else if (width >= 25 && width < 75) $(this).css('background', 'rgb(219, 219, 19)')
		else $(this).css('background', '#ff2121')
	})
}

function assignEnemyRobot() {
	var model = $('#enemy-selection select').val()

	switch(model) {
		case 'boulder':
			enemy = new Battledome.Robot.Boulder()
			$('#enemy-selection img').attr('src', '/img/models/boulder.png')
			$('#enemy img').attr('src', '/img/models/boulder.png')
			break
		case 'pebble':
			enemy = new Battledome.Robot.Pebble()
			$('#enemy-selection img').attr('src', '/img/models/pebble.png')
			$('#enemy img').attr('src', '/img/models/pebble.png')
			break
		case 'scroll':
			enemy = new Battledome.Robot.Scroll()
			$('#enemy-selection img').attr('src', '/img/models/scroll.png')
			$('#enemy img').attr('src', '/img/models/scroll.png')
			break
		case 'index-card':
			enemy = new Battledome.Robot.IndexCard()
			$('#enemy-selection img').attr('src', '/img/models/index-card.png')
			$('#enemy img').attr('src', '/img/models/index-card.png')
			break
		case 'garden-scissors':
			enemy = new Battledome.Robot.GardenScissors()
			$('#enemy-selection img').attr('src', '/img/models/garden-scissors.png')
			$('#enemy img').attr('src', '/img/models/garden-scissors.png')
			break
		case 'craft-scissors':
			enemy = new Battledome.Robot.CraftScissors()
			$('#enemy-selection img').attr('src', '/img/models/craft-scissors.png')
			$('#enemy img').attr('src', '/img/models/craft-scissors.png')
			break
		case 'random':
			enemy = {}
			$('#enemy-selection img').attr('src', '/img/question-mark.png')
			break
	}
	loadEnemyStats()
}

// NOTE: incomplete
function loadEnemyStats() {
	if($('#enemy-selection select').val() === 'random') {
		$('#enemy-selection .stats-container').hide()
	}

	else {
		$('#enemy-selection .health .stats-bar').css('width', `${enemy.baseHealth}%`)
		$('#enemy-selection .strength .stats-bar').css('width', `${(enemy.baseStrength / 30) * 100}%`)
		$('#enemy-selection .speed .stats-bar').css('width', `${((5.1 - enemy.cooldown) / 5) * 100}%`)
		$('#enemy-selection .attack td:last-child').text(`${enemy.attack}`)
		$('#enemy-selection .strong td:last-child').text(`${enemy.strongAgainst}`)
		$('#enemy-selection .weak td:last-child').text(`${enemy.weakAgainst}`)

		$('#enemy-selection .stats-container').show()
	}

	// Change color based on percent width
	$('#enemy-selection .stats-bar').each(function() {
		var width = parseFloat($(this).css('width'))

		if(width >= 75) $(this).css('background', '#14b214')
		else if (width >= 25 && width < 75) $(this).css('background', 'rgb(219, 219, 19)')
		else $(this).css('background', '#ff2121')
	})
}

function updatePlayerName() {
	name = $('#player1-selection input').val()
	$('#player1-selection h3').text(name)
}

function updateEnemyName() {
	name = $('#enemy-selection input').val()
	$('#enemy-selection h3').text(name)
}













