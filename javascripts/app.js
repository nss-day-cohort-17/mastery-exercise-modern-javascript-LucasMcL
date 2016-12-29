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
	// Section, select-weapon
	// Section, confirmation [hide next button]
	// Buttons below
// Article -- Battlefield

let sections = ["select-robot",
								"select-model",
								"select-weapon",
								"confirmation"]
let sectionIndex = 0

$(document).ready(function() {
	// Show first article
	// NOTE: change this when you get the title screen working
	$('article#selection').show()
	// NOTE: change this when you get the title screen working
	$('section#select-robot').show()

	// Disable the previous button upon load
	$('#previous').attr('disabled', true)

	// When the next button is clicked
	$('#next').click(checkThenProceed)
	// When the previous button is clicked
	$('#previous').click(showPreviousSection)
})

function showNextSection() {
	$(`#${sections[sectionIndex]}`).hide()
	sectionIndex++
	$(`#${sections[sectionIndex]}`).show()
	$('#previous').attr('disabled', false)
	if(sectionIndex === sections.length - 1) {
		$('#next').attr('disabled', true)
	}
}

function showPreviousSection() {
	$(`#${sections[sectionIndex]}`).hide()
	sectionIndex--
	$(`#${sections[sectionIndex]}`).show()
	$('#next').attr('disabled', false)
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
		case "select-weapon":
			okToProceed = true
			break
		case "confirmation":
			okToProceed = true
			break
	}
	if(okToProceed = true) showNextSection()
}









