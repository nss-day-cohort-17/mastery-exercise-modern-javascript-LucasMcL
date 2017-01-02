// Contains all functions pertaining to combat

// NOTE: debug battle over message
	// (make sure it doesn't display until health bar reaches 0)

// To do: desciptions of models
	// Damage bonus by type

// Known bugs:
	// Message displays before health reaches 0
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

function generateEnemy() {
	var rockNames = ["Stoney McStoneface",
									 "Rock Lobstah"]
  var paperNames = ["Bureaucracy",
  									"Wide-Ruled Nightmare"]
	var scissorsNames = ["Edward Scissorhands",
											 "I Will Cut You"]
	var models = ["Boulder", "Pebble",
								"Scroll", "IndexCard",
								"GardenScissors", "CraftScissors"]

	var random = Math.floor(Math.random() * 6)
	var randomModel = models[random]
	var random = Math.floor(Math.random() * 2)

	enemy = new Battledome.Robot[randomModel]()

	// Assign name, load picture into battlefield
	switch(enemy.model) {
		case 'Boulder':
			enemy.name = rockNames[random]
			$('#enemy img').attr('src', "../img/models/boulder.png")
			break
		case 'Pebble':
			enemy.name = rockNames[random]
			$('#enemy img').attr('src', "../img/models/pebble.png")
			break
		case 'Scroll':
			enemy.name = paperNames[random]
			$('#enemy img').attr('src', "../img/models/scroll.png")
			break
		case 'Index Card':
			enemy.name = paperNames[random]
			$('#enemy img').attr('src', "../img/models/index-card.png")
			break
		case 'Garden Scissors':
			enemy.name = scissorsNames[random]
			$('#enemy img').attr('src', "../img/models/garden-scissors.png")
			break
		case 'Craft Scissors':
			enemy.name = scissorsNames[random]
			$('#enemy img').attr('src', "../img/models/craft-scissors.png")
			break
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
			damage = player1.strength,
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
			damage = enemy.strength,
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














