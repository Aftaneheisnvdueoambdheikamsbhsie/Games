// Predefined bet amounts
const betAmounts = [
    200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 
    100000, 500000, 1000000, 2000000, 2500000, 3000000, 5000000, 10000000
];

// Game state variables
let currentBet = betAmounts[0]; // Default bet amount
let isSpinning = false;
let autoSpinInterval; // To store the interval ID for auto-spin

// DOM elements
const betAmountDisplay = document.getElementById('bet-amount');
const spinButton = document.getElementById('spin-button');
const autoSpinButton = document.getElementById('auto-spin-button');
const stopButton = document.getElementById('stop-button'); // New stop button
const gameBoard = document.getElementById('game-board');
const columns = document.querySelectorAll('.column');

// Function to update bet amount
function updateBetAmount(increase = true) {
    const currentIndex = betAmounts.indexOf(currentBet);
    if (increase && currentIndex < betAmounts.length - 1) {
        currentBet = betAmounts[currentIndex + 1];
    } else if (!increase && currentIndex > 0) {
        currentBet = betAmounts[currentIndex - 1];
    }
    betAmountDisplay.innerText = currentBet.toLocaleString(); // Format the bet amount with commas
}

// Event listeners for bet control
document.getElementById('bet-increase').addEventListener('click', () => updateBetAmount(true));
document.getElementById('bet-decrease').addEventListener('click', () => updateBetAmount(false));

// Function to start the spinning animation
function startSpin() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true; // Disable the spin button during spinning

    // Trigger the column animations
    columns.forEach((column, index) => {
        setTimeout(() => {
            animateColumn(column);
        }, index * 200); // Delay each column by 200ms for a cascading effect
    });

    // After the spin finishes, re-enable the button
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;
    }, columns.length * 400 + 1000); // Total time to finish all column animations
}

// Function to animate a single column
function animateColumn(column) {
    const images = column.querySelectorAll('img');
    let scrollIndex = 0;

    const scrollInterval = setInterval(() => {
        // Scroll each image down by moving them to the bottom
        images.forEach((img, i) => {
            const newPosition = (scrollIndex + i) % images.length;
            img.style.transform = `translateY(${newPosition * 100}%)`;
        });

        scrollIndex++;

        // Stop after a certain number of scrolls
        if (scrollIndex > images.length + 10) {
            clearInterval(scrollInterval);
        }
    }, 100); // Scroll every 100ms for a smooth animation
}

// Event listener for the spin button
spinButton.addEventListener('click', startSpin);

// Auto-spin functionality
autoSpinButton.addEventListener('click', () => {
    const autoSpinOptions = [10, 20, 50, 100]; // Example options for auto-spin
    let selectedAutoSpin = autoSpinOptions[0]; // Default option

    function startAutoSpin() {
        let spinCount = 0;
        autoSpinInterval = setInterval(() => {
            if (spinCount >= selectedAutoSpin || !isSpinning) {
                clearInterval(autoSpinInterval);
                return;
            }
            startSpin();
            spinCount++;
        }, columns.length * 400 + 1500); // Adjust timing for auto-spin
    }

    // Show options menu for auto-spin (optional)
    showAutoSpinMenu(autoSpinOptions, (selected) => {
        selectedAutoSpin = selected;
        startAutoSpin();
    });
});

// Stop button functionality
stopButton.addEventListener('click', () => {
    clearInterval(autoSpinInterval); // Stop the auto-spin
    isSpinning = false;
    spinButton.disabled = false; // Re-enable the spin button
});

// Helper function to display auto-spin options (optional)
function showAutoSpinMenu(options, onSelect) {
    const option = prompt(`Choose auto-spin amount: ${options.join(', ')}`, options[0]);
    const selected = parseInt(option, 10);
    if (options.includes(selected)) {
        onSelect(selected);
    }
}
