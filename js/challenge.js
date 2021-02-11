const $allButtons = document.querySelectorAll('button')
const $mainCounter = document.querySelector('#counter')
const $commentForm = document.querySelector('#comment-form')
const $listDiv = document.querySelector('#list')
const $pauseButton = document.querySelector('#pause')
let isActive = true

document.addEventListener('DOMContentLoaded', startTimer)
$commentForm.addEventListener('submit', (event) => appendComment(event))
$allButtons.forEach(button => {
    button.addEventListener('click', clickButton)
})

function startTimer() {
    timer = setInterval(increaseTimer, 1000)
}

function increaseTimer() {
    $mainCounter.innerText = +$mainCounter.innerText + 1
}

function decreaseTimer() {
    $mainCounter.innerText = +$mainCounter.innerText - 1
}

function pauseOrRestartTimer(button) {
    if (isActive) {
        clearInterval(timer)
        $allButtons.forEach(pageButton => {
            if (pageButton.id !== button.target.id) {
                pageButton.disabled = true
            }
        })
        isActive = false
        $pauseButton.innerText = 'resume'
    } else {
        startTimer()
        $allButtons.forEach(pageButton => {
            pageButton.disabled = false
        })
        isActive = true
        $pauseButton.innerText = 'pause'
    }
}

function clickButton(button) {
    switch (button.target.id) {
        case 'minus':
            decreaseTimer()
        break
        case 'plus': 
            increaseTimer()
        break
        case 'pause': 
            pauseOrRestartTimer(button)
        break
        case 'submit':
            appendComment()
        break
        default:
            alert('You had an oopsie')
    }
}

function appendComment(event) {
    event.preventDefault()

    const $newComment = new FormData(event.target)
    const $getComment = $newComment.get('comment')

    const $commentP = document.createElement('p')
    $commentP.textContent = $getComment
    $listDiv.append($commentP)
}




