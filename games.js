// Predefined bet amounts
const betAmounts = [
    200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 
    100000, 500000, 1000000, 2000000, 2500000, 3000000, 5000000, 10000000
];

// Game state variables
let currentBet = betAmounts[0]; // Default bet amount
let isSpinning = false;
let autoSpinInterval; // To store the interval ID for auto-spin
let freeSpins = 0; // Counter for free spins
let score = 0; // Total score

// DOM elements
const betAmountDisplay = document.getElementById('bet-amount');
const spinButton = document.getElementById('spin-button');
const autoSpinButton = document.getElementById('auto-spin-button');
const stopButton = document.getElementById('stop-button'); // New stop button
const scoreDisplay = document.getElementById('score'); // Display for score
const columns = document.querySelectorAll('.column');

// Sound elements
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');

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
    spinSound.play(); // Play spin sound

    // Reset score for this spin
    score = 0;

    // Trigger the column animations
    columns.forEach((column, index) => {
        setTimeout(() => {
            animateColumn(column);
        }, index * 200); // Delay each column by 200ms for a cascading effect
    });

    // After the spin finishes, calculate score
    setTimeout(() => {
        calculateScore();
        isSpinning = false;
        spinButton.disabled = false;
        scoreDisplay.innerText = `Score: ${score.toLocaleString()}`; // Update score display
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

// Function to calculate score based on matching images
function calculateScore() {
    const imageValues = {
        'jackpot.png': 10000, // Replace with actual image names
        'vip.png': 5000,
        'image1.png': 1000,
        'image2.png': 500,
        // Add other image values as needed
    };

    // Check each column for matches
    let lastMatchedImage = '';
    let matchedCount = 0;

    columns.forEach((column) => {
        const images = column.querySelectorAll('img');
        const currentImage = images[images.length - 1].src; // Get the last image of the column

        if (lastMatchedImage === currentImage) {
            matchedCount++;
        } else {
            // Check for bonus spins
            if (matchedCount >= 3) {
                score += imageValues[lastMatchedImage] * matchedCount; // Calculate score based on matched images
                freeSpins += 6; // Grant 6 free spins for matching 3 or more
                winSound.play(); // Play win sound
            }
            matchedCount = 1; // Reset for new image
        }

        lastMatchedImage = currentImage; // Update the last matched image
    });

    // Final check for the last group
    if (matchedCount >= 3) {
        score += imageValues[lastMatchedImage] * matchedCount; // Calculate score for the last group
        freeSpins += 6; // Grant 6 free spins for matching 3 or more
        winSound.play(); // Play win sound
    }

    // Check if there's any bonus spins available
    if (freeSpins > 0) {
        alert(`You have ${freeSpins} free spins!`);
        // Implement free spin logic here if needed
    }
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

// Function to show auto-spin menu (optional implementation)
function showAutoSpinMenu(options, callback) {
    const selectedOption = prompt(`Choose auto-spin amount: ${options.join(', ')}`);
    const selected = parseInt(selectedOption);
    if (options.includes(selected)) {
        callback(selected);
    } else {
        alert('Invalid selection, please try again.');
    }
}
