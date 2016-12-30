// Robot Archetype
	// Rock
		// Boulder
		// Pebble
	// Paper
		// Scroll
		// Index Card
	// Scissors
		// Garden Scissors
		// Craft Scissors

// Robot
	// Instantiate with:
	// Health [0-100]
	// Strength [0-30]
	// Cooldown (in seconds) [1-5]


var Battledome = {}

Battledome.Robot = function(name) {
	this.health = null
	this.strengh = null
	this.cooldown = null
	this.attack = null

	this.type = null
	this.name = name || "Robot"
}

Battledome.Robot.Rock = function() {
	this.type = "Rock"
}
Battledome.Robot.Rock.prototype = new Battledome.Robot();


Battledome.Robot.Paper = function() {
	this.type = "Paper"
}
Battledome.Robot.Paper.prototype = new Battledome.Robot();


Battledome.Robot.Scissors = function() {
	this.type = "Scissors"
}
Battledome.Robot.Scissors.prototype = new Battledome.Robot();


Battledome.Robot.Boulder = function() {
	// Health: 80-100
	// Strength: 25-30
	// Cooldown: 5s
	// Dps: 5-6
	// Attack name: Rock Slam
	// Time alive against 10dps enemy: 8-10s
	var healthBonus = Math.floor(Math.random() * 21)
	var strengthBonus = Math.floor(Math.random() * 6)

	this.health = 80 + healthBonus
	this.strength = 25 + strengthBonus
	this.cooldown = 5
	this.attack = "Rock Slam"
}
Battledome.Robot.Boulder.prototype = new Battledome.Robot.Rock();


Battledome.Robot.Pebble = function() {
	// Health: 60-80
	// Strength: 10-15
	// Cooldown: 1s
	// Dps: 10-15
	// Attack name: Stone Skip
	// Time alive against 10dps enemy: 6-8s

	var healthBonus = Math.floor(Math.random() * 21)
	var strengthBonus = Math.floor(Math.random() * 6)

	this.health = 60 + healthBonus
	this.strength = 10 + strengthBonus
	this.cooldown = 1
	this.attack = "Stone Skip"
}
Battledome.Robot.Pebble.prototype = new Battledome.Robot.Rock();


Battledome.Robot.Scroll = function() {
	// Health: 50-70
	// Strength: 20-25
	// Cooldown: 4s
	// Dps: 5-6
	// Attack name: Ancient Arts
	// Time alive against 10dps enemy: 5-7s


	var healthBonus = Math.floor(Math.random() * 21)
	var strengthBonus = Math.floor(Math.random() * 6)

	this.health = 50 + healthBonus
	this.strength = 20 + strengthBonus
	this.cooldown = 4
	this.attack = "Ancient Arts"
}
Battledome.Robot.Scroll.prototype = new Battledome.Robot.Paper();


Battledome.Robot.IndexCard = function() {
	// Health: 40-60
	// Strength: 5-7
	// Cooldown: .5s
	// Dps: 10-14
	// Attack name: Paper Cut
	// Time alive against 10dps enemy: 4-6s

	var healthBonus = Math.floor(Math.random() * 21)
	var strengthBonus = Math.floor(Math.random() * 3)

	this.health = 50 + healthBonus
	this.strength = 5 + strengthBonus
	this.cooldown = .5
	this.attack = "Paper Cut"
}
Battledome.Robot.IndexCard.prototype = new Battledome.Robot.Paper();


Battledome.Robot.GardenScissors = function() {
	// Health: 60-80
	// Strength: 15-20
	// Cooldown: 2s
	// Dps: 7-10
	// Attack name: Prune
	// Time alive against 10dps enemy: 6-8s

	var healthBonus = Math.floor(Math.random() * 21)
	var strengthBonus = Math.floor(Math.random() * 6)

	this.health = 60 + healthBonus
	this.strength = 10 + strengthBonus
	this.cooldown = 2
	this.attack = "Prune"
}
Battledome.Robot.GardenScissors.prototype = new Battledome.Robot.Scissors();


Battledome.Robot.CraftScissors = function() {
	// Health: 50-70
	// Strength: 8-10
	// Cooldown: 1s
	// Dps: 8-10
	// Attack name: Snip
	// Time alive against 10dps enemy: 5-7

	var healthBonus = Math.floor(Math.random() * 21)
	var strengthBonus = Math.floor(Math.random() * 3)

	this.health = 50 + healthBonus
	this.strength = 8 + strengthBonus
	this.cooldown = 1
	this.attack = "Snip"
}
Battledome.Robot.CraftScissors.prototype = new Battledome.Robot.Scissors();









