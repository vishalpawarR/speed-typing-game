const url = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    // console.log(arrayValue)
    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index]
        if(char == null) {
            charSpan.classList.remove('incorrect');
            charSpan.classList.remove('correct');
            correct = false
        }
        else if(char == charSpan.innerText) {
            charSpan.classList.remove('incorrect');
            charSpan.classList.add('correct');
        }
        else{
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            correct = false
        }
    })
    if(correct) renderNewQuote();
})

function getQuote() {
    return fetch(url).then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getQuote();
    // console.log(quote)
    quoteDisplayElement.innerText = '';
    quoteInputElement.innerHTML = null;
    // console.log(quote.split('')) this splits every char in a from the sentence
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quoteDisplayElement.appendChild(charSpan)
    });
    quoteInputElement.value = '';
    getTimer();
}
let startTime
function getTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote()
