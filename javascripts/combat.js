// Contains all functions pertaining to combat

// NOTE: debug battle over message
	// (make sure it doesn't display until health bar reaches 0)

// To do: Display message when attack hits

var rockNames = ["Stoney McStoneface",
								 "Rock Lobstah"]
var paperNames = ["Bureaucracy",
									"Wide-Ruled Nightmare"]
var scissorsNames = ["Edward Scissorhands",
										 "I Will Cut You"]
var models = ["Boulder", "Pebble",
							"Scroll", "IndexCard",
							"GardenScissors", "CraftScissors"]
var intervalID;

function loadBattle() {
	$('#player1 .health-bar')
		.data('max-health', player1.health)
		.data('health', player1.health)
	$('#enemy .health-bar')
		.data('max-health', enemy.health)
		.data('health', enemy.health)

	$('article').hide()
	$('article#battledome').show()

	setTimeout(function() {
		alert(
			"Instructions: click the attack button repeatedly until your oponent is defeated." +
			"\n\nThe battle is about to begin.  Ready?"
			)
	}, 200)

}

function loadPlayer() {
	var random = Math.floor(Math.random() * 2)

	// Assign name based on type
	if($('#player1-selection input').val() === '') {
		switch (player1.type) {
			case "Rock":
				player1.name = rockNames[random]
				break
			case "Paper":
				player1.name = paperNames[random]
				break
			case "Scissors":
				player1.name = scissorsNames[random]
				break
		}
	}
	else {
		player1.name = $('#player1-selection input').val()
	}

	$('#player1 h3').text(player1.name)
}

function generatePlayer() {
	var random = Math.floor(Math.random() * 6)
	var randomModel = models[random]
	var random = Math.floor(Math.random() * 2)

	player1 = new Battledome.Robot[randomModel]()

	// Assign name, load picture into battlefield
	switch(player1.model) {
		case 'Boulder':
			$('#player1 img').attr('src', "../img/models/boulder.png")
			break
		case 'Pebble':
			$('#player1 img').attr('src', "../img/models/pebble.png")
			break
		case 'Scroll':
			$('#player1 img').attr('src', "../img/models/scroll.png")
			break
		case 'Index Card':
			$('#player1 img').attr('src', "../img/models/index-card.png")
			break
		case 'Garden Scissors':
			$('#player1 img').attr('src', "../img/models/garden-scissors.png")
			break
		case 'Craft Scissors':
			$('#player1 img').attr('src', "../img/models/craft-scissors.png")
			break
	}
	// Assign name based on type
	if($('#player1-selection input').val() === '') {
		switch (player1.type) {
			case "Rock":
				player1.name = rockNames[random]
				break
			case "Paper":
				player1.name = paperNames[random]
				break
			case "Scissors":
				player1.name = scissorsNames[random]
				break
		}
	}
	else {
		player1.name = $('#player1-selection input').val()
	}
	// Load name into battlefield
	$('#player1 h3').text(player1.name)
}

function loadEnemy() {
	var random = Math.floor(Math.random() * 2)

	// Assign name based on type
	if($('#enemy-selection input').val() === '') {
		switch (enemy.type) {
			case "Rock":
				enemy.name = rockNames[random]
				break
			case "Paper":
				enemy.name = paperNames[random]
				break
			case "Scissors":
				enemy.name = scissorsNames[random]
				break
		}
	}
	else {
		enemy.name = $('#enemy-selection input').val()
	}

	$('#enemy h3').text(enemy.name)
}

function generateEnemy() {
	var random = Math.floor(Math.random() * 6)
	var randomModel = models[random]
	var random = Math.floor(Math.random() * 2)

	enemy = new Battledome.Robot[randomModel]()

	// Assign name, load picture into battlefield
	switch(enemy.model) {
		case 'Boulder':
			$('#enemy img').attr('src', "../img/models/boulder.png")
			break
		case 'Pebble':
			$('#enemy img').attr('src', "../img/models/pebble.png")
			break
		case 'Scroll':
			$('#enemy img').attr('src', "../img/models/scroll.png")
			break
		case 'Index Card':
			$('#enemy img').attr('src', "../img/models/index-card.png")
			break
		case 'Garden Scissors':
			$('#enemy img').attr('src', "../img/models/garden-scissors.png")
			break
		case 'Craft Scissors':
			$('#enemy img').attr('src', "../img/models/craft-scissors.png")
			break
	}
	// Assign name based on type
	if($('#enemy-selection input').val() === '') {
		switch (enemy.type) {
			case "Rock":
				enemy.name = rockNames[random]
				break
			case "Paper":
				enemy.name = paperNames[random]
				break
			case "Scissors":
				enemy.name = scissorsNames[random]
				break
		}
	}
	else {
		enemy.name = $('#enemy-selection input').val()
	}

	// Load name into battlefield
	$('#enemy h3').text(enemy.name)
}

function whenAttackIsClicked() {
	var attackBtn = $('#attack')
	damageEnemy()
	animatePlayerCooldown()
	attackBtn.attr('disabled', true)

	setTimeout(function() {
		attackBtn.attr('disabled', false)
	}, player1.cooldown * 1000)
}

function damageEnemy() {
	var attackBtn = $('#attack'),
			enemyHealth = $('#enemy .health-bar').data('health'),
			enemyMaxHealth = $('#enemy .health-bar').data('max-health'),
			damage = calculateDamagePlayer(),
			hBar = $('#enemy .health-bar'),
			bar = $('#enemy .bar'),
			hit = $('#enemy .hit')


	newHealth = enemyHealth - damage;

	var	barWidth = (newHealth / enemyMaxHealth) * 100,
			hitWidth = (damage / enemyHealth) * 100

	// show hit bar and set the width
  hit.css('width', 0)
  hit.removeClass('hidden')
  hit.css('width', hitWidth + "%");
  hBar.data('health', newHealth);

  setTimeout(function(){
      bar.css('width', barWidth + "%");
      hit.addClass('hidden')
      hit.css('width', 0)
    }, 500)

	if(newHealth <= 0) playerWins()
}

function animatePlayerCooldown() {
	$("#player1 .cooldown-bar").css('width', 0)

	$("#player1 .cooldown-bar").animate({
	  width: '100%'
  }, player1.cooldown * 1000);
}

function animateEnemyCooldown() {
	$("#enemy .cooldown-bar").css('width', 0)

	// Wait for 10% of cooldown time, then
	// animate bar for 80% of cooldown time
	// leaves 5% as cushion
	setTimeout(function() {
		$("#enemy .cooldown-bar").animate({
		  width: '100%'
	  }, enemy.cooldown * 850)
	}, enemy.cooldown * 100)
}

function fightPlayer() {
	// Loop enemy attack
	intervalID = window.setInterval(function() {
		animateEnemyCooldown()
		damagePlayer()
	}, enemy.cooldown * 1000);
}

function damagePlayer() {
	var playerHealth = $('#player1 .health-bar').data('health'),
			playerMaxHealth = $('#player1 .health-bar').data('max-health'),
			damage = calculateDamageEnemy(),
			hBar = $('#player1 .health-bar'),
			bar = $('#player1 .bar'),
			hit = $('#player1 .hit')

	// Stop battle if the oponent already has 0 health

	newHealth = playerHealth - damage

	var	barWidth = (newHealth / playerMaxHealth) * 100,
			hitWidth = (damage / playerHealth) * 100

	// show hit bar and set the width
  hit.css('width', 0)
  hit.removeClass('hidden')
  hit.css('width', hitWidth + "%");
  hBar.data('health', newHealth);


  setTimeout(function(){
      bar.css('width', barWidth + "%");
      hit.addClass('hidden')
      hit.css('width', 0)
    }, 500)

	if(newHealth <= 0) enemyWins()
}

function enemyWins() {
	window.clearInterval(intervalID)

	alert("The battle is over!" +
				`\n\n${enemy.name} defeated ${player1.name} with ${enemy.attack}!`)
	$('#attack').addClass('hidden')
}

function playerWins() {
	window.clearInterval(intervalID)

	alert("The battle is over!" +
				`\n\n${player1.name} defeated ${enemy.name} with ${player1.attack}!`)
	$('#attack').addClass('hidden')
}

// 40% damage bonus to weak opponent types
function calculateDamagePlayer() {
	switch(player1.type) {
		case "Rock":
			if(enemy.type === "Scissors") return player1.strength * 1.4
			break
		case "Paper":
			if(enemy.type === "Rock") return player1.strength * 1.4
			break
		case "Scissors":
			if(enemy.type === "Paper") return player1.strength * 1.4
			break
	}
	return player1.strength
}

// 40% damage bonus to weak opponent types
function calculateDamageEnemy() {
	switch(enemy.type) {
		case "Rock":
			if(player1.type === "Scissors") return enemy.strength * 1.4
			break
		case "Paper":
			if(player1.type === "Rock") return enemy.strength * 1.4
			break
		case "Scissors":
			if(player1.type === "Paper") return enemy.strength * 1.4
			break
	}
	return enemy.strength
}

// Not currently used
function restartGame() {
	console.log("Restart game")

	// Reset global variables
	sections = ["select-robot",
								"select-model",
								"input-name",
								"confirmation"]
	sectionIndex = 0
	titleScreenDone = false
	robotTypeSelected = false
	robotModelSelected = false
	player1 = {}
	enemy = {}

	// Hide sections, remove highlighting, etc.
	$('article').hide()
	$('section').hide()
	$('article#selection').show()
	$('section#select-robot').show()
	$('#previous').attr('disabled', true)
	$('#next').removeClass('hidden')
	$('.robot .img-container').removeClass('highlight')
	$('.robot .stats-container').hide()
	$('.model .img-container').removeClass('highlight')
	$('.model .stats-container').hide()
	$('#name').val('')

	$('#player1 .bar').css('width', '100%')
	$('#enemy .bar').css('width', '100%')
}














