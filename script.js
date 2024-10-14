// Initialize score and bets
let score = 1000;
let betAmount = 0;
let multiplier = 2;
const scoreDisplay = document.getElementById('score');
const betValueDisplay = document.getElementById('bet-value');
const multiplierValueDisplay = document.getElementById('multiplier-value');
const spinButton = document.getElementById('spin-button');
const warningMessage = document.getElementById('warning-message');
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');

// Update displays
function updateDisplays() {
    scoreDisplay.innerText = `Rp ${score.toLocaleString()}`;
    betValueDisplay.innerText = `Rp ${betAmount.toLocaleString()}`;
    multiplierValueDisplay.innerText = `${multiplier}x`;
}

// Handle betting controls
document.getElementById('bet-increase').addEventListener('click', () => {
    if (betAmount < score) {
        betAmount += 100; // Increment bet
        updateDisplays();
    }
});

document.getElementById('bet-decrease').addEventListener('click', () => {
    if (betAmount > 0) {
        betAmount -= 100; // Decrement bet
        updateDisplays();
    }
});

// Handle multiplier controls
document.getElementById('multiplier-increase').addEventListener('click', () => {
    if (multiplier < 10) {
        multiplier++;
        updateDisplays();
    }
});

document.getElementById('multiplier-decrease').addEventListener('click', () => {
    if (multiplier > 2) {
        multiplier--;
        updateDisplays();
    }
});

// Spin function
spinButton.addEventListener('click', () => {
    if (score <= 0) {
        warningMessage.classList.remove('hidden');
        return;
    }
    warningMessage.classList.add('hidden');

    spinSound.play();
    // Simulate the spin
    const results = spin(); // Add your logic for spinning results
    displayResults(results);
});

// Mock function for spinning results
function spin() {
    // Randomly return 3 results from your available symbols
    const symbols = ["jackpot", "luxury", "coin", "diamond", "a", "j"];
    const results = [];
    for (let i = 0; i < 3; i++) {
        results.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    return results;
}

// Display results and handle winnings
function displayResults(results) {
    // Logic to determine if the player wins
    let win = checkWin(results);
    if (win) {
        score += betAmount * multiplier;
        winSound.play();
        animateWinningCells(results);
    } else {
        score -= betAmount;
    }
    updateDisplays();
}

// Check if there's a win
function checkWin(results) {
    // Implement your winning logic
    return results[0] === results[1] && results[1] === results[2]; // Example condition
}

// Animate winning cells
function animateWinningCells(results) {
    results.forEach((result, index) => {
        const cell = document.getElementById(`cell-1-${index + 1}`);
        cell.classList.add('win-animation');
        // Optionally, you can add a timeout to remove the animation class after a duration
        setTimeout(() => {
            cell.classList.remove('win-animation');
        }, 600); // Match the duration of the animation
    });
}

// Burger menu functionality
document.getElementById('burger-menu').addEventListener('click', () => {
    const nav = document.getElementById('game-menu');
    nav.classList.toggle('active');
});
