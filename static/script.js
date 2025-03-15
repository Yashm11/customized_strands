document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const messageBox = document.getElementById("messageBox");
    const congratsMessage = document.getElementById("congratsMessage");
    const submitButton = document.getElementById("submitWord");
    
    let selectedLetters = [];
    let selectedDivs = [];
    let foundWords = [];
    const colors = ["red", "blue", "orange", "purple", "pink", "brown", "cyan", "lime", "magenta", "gold"];

    function resetSelection() {
        selectedDivs.forEach(div => {
            if (!div.classList.contains("correct")) {
                div.style.backgroundColor = "lightblue";
            }
        });
        selectedLetters = [];
        selectedDivs = [];
    }

    // Desktop Mouse Drag Selection
    grid.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("letter")) {
            resetSelection();
            selectedLetters.push(e.target.dataset.letter);
            selectedDivs.push(e.target);
            e.target.style.backgroundColor = "yellow";
        }
    });

    grid.addEventListener("mouseover", (e) => {
        if (e.buttons === 1 && e.target.classList.contains("letter") && !selectedDivs.includes(e.target)) {
            selectedLetters.push(e.target.dataset.letter);
            selectedDivs.push(e.target);
            e.target.style.backgroundColor = "yellow";
        }
    });

    grid.addEventListener("mouseup", async () => {
        await checkWord();
    });

    document.querySelectorAll(".letter").forEach(letter => {
        letter.addEventListener("click", () => {
            if (!selectedDivs.includes(letter)) {
                letter.style.backgroundColor = "yellow";
                selectedLetters.push(letter.dataset.letter);
                selectedDivs.push(letter);
            }
        });
    });

    // Submit button (Mobile-friendly)
    // Although I think still this doesnt work as meant to
    submitButton.addEventListener("click", async () => {
        await checkWord();
    });

    async function checkWord() {
        let word = selectedLetters.join("").toUpperCase();
        if (word.length < 2) return;

        let response = await fetch("/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ word: word })
        });

        let result = await response.json();

        if (result.valid) {
            let color = colors[foundWords.length % colors.length];
            foundWords.push(word);
            messageBox.textContent = "Correct!";
            messageBox.style.color = "green";
            selectedDivs.forEach(div => {
                div.classList.add("correct");
                div.style.backgroundColor = "green";
                div.style.border = `3px solid ${color}`;
            });

            // Showin GIF when all words are found
            if (foundWords.length === 10) {
                congratsMessage.style.display = "block";
                setTimeout(() => { congratsMessage.style.display = "none"; }, 5000); 
            }
        } else {
            messageBox.textContent = "Incorrect, try again!";
            messageBox.style.color = "red";
            resetSelection();
        }
    }
});
