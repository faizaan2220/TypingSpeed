const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    cpmTag = document.querySelector(".cpm span"),
    wpmTag = document.querySelector(".wpm span"),
    tryAgainBtn = document.querySelector("button");


let timer;
let maxTime = 60;
let timeLeft = maxTime;

let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraph.length);

    typingText.innerHTML = "";

    paragraph[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span`;
        typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        // once the timer is start , it wont restart again on every key clicked
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        //if user hasn't entered any character or pressed backspace
        if (typedChar == null) {
            charIndex--;


            // decrement mistakes only if the charIndex span contains incorrect class
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }

            characters[charIndex].classList.remove("correct", "incorrect")
        }
        else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            }
            else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }


        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let noOfWords = (charIndex - mistakes) / 5;
        let remainingTime = maxTime - timeLeft;

        let wpm = Math.round((noOfWords / remainingTime) * 60);

        // at start we may get infinity value in wpm  

        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        wpmTag.innerText = wpm;
    }

    // to get WPM first substracting total mistakes from the total typed characters then dividing
    // it by 5 (assuming 5 characters = 1 word)
    // and again dividing this  by remaining time
    // where remaining time = 60 - left time
    // finally multiplying the whole by 60        

    // Now user cant type if the time is 0;
    else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft
    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);

    timeLeft = maxTime;

    charIndex = 0;
    mistakes = 0;
    isTyping = false;

    mistakeTag.innerText = mistakes;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", reset);