// Contains all functions pertaining to combat

function loadBattle() {
	$('#player1 .health-bar')
		.data('total', player1.health)
		.data('value', player1.health)
	$('#enemy .health-bar')
		.data('total', enemy.health)
		.data('value', enemy.health)



	$('article').hide()
	$('article#battledome').show()
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
	console.log("Attack!")
	attackBtn = $('#attack')
	attackBtn.attr('disabled', true)


	setTimeout(function() {
		attackBtn.attr('disabled', false)
	}, player1.cooldown * 1000)
}










