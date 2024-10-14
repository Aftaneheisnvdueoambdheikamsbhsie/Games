document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const gameMenu = document.getElementById('game-menu');
    const spinButton = document.getElementById('spin-button');
    const stopButton = document.getElementById('stop-button'); // Tombol untuk menghentikan spin otomatis
    const winMessage = document.getElementById('win-message');
    const spinSound = document.getElementById('spin-sound');
    const winSound = document.getElementById('win-sound');
    const betAmountInput = document.getElementById('bet-amount');
    const multiplierInput = document.getElementById('multiplier');
    const betIncreaseButton = document.getElementById('bet-increase');
    const betDecreaseButton = document.getElementById('bet-decrease');
    const multiplierIncreaseButton = document.getElementById('multiplier-increase');
    const multiplierDecreaseButton = document.getElementById('multiplier-decrease');
    const autoSpinButton = document.getElementById('auto-spin-button');
    const autoSpinOptions = document.querySelectorAll('.auto-spin-option');
    // Static predefined bet-amounts
    const betAmounts = [
         200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 
        100000, 500000, 1000000, 2000000, 2500000, 3000000, 5000000, 10000000
    ];

    let saldo = 1000;
    let currentBetIndex = 1; // Start from the second value (200)
    let currentMultiplier = 2;
    let spinning = false;
    let autoSpinActive = false;

    // Navigasi burger menu
    burgerMenu.addEventListener('click', () => {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.toggle('visible'); // Toggle visibility class

        // Optional: Change burger menu icon to "X" when the menu is open
        if (navMenu.classList.contains('visible')) {
            burgerMenu.innerHTML = '✖'; // Change to X icon
        } else {
            burgerMenu.innerHTML = '☰'; // Change back to burger icon
        }
    });
    

    // Update saldo display
    function updateSaldoDisplay() {
        document.getElementById('saldo').textContent = `Saldo: Rp ${saldo}`;
    }

    // Spin button click event
    spinButton.addEventListener('click', () => {
        if (!spinning) {
            if (currentBet > saldo) {
                alert("Saldo tidak cukup!");
                return;
            }
            saldo -= currentBet;
            updateSaldoDisplay();
            spinSound.play();
            performSpin();
        }
    });

    // Stop spinning when button is clicked
    stopButton.addEventListener('click', () => {
        autoSpinActive = false; // Stop auto spin
        if (spinning) {
            stopSpin(); // Stop current spin
        }
    });
    function spinColumns() {
    const columns = document.querySelectorAll('.column');
    columns.forEach((column, index) => {
        setTimeout(() => {
            column.classList.add('rolling'); // Add rolling class to start the animation
        }, index * 300); // Staggered timing for each column
    });

    setTimeout(() => {
        columns.forEach(column => column.classList.remove('rolling')); // Remove rolling class to stop the animation
    }, 3000); // Stop rolling after 3 seconds
}

    // Perform spin logic
    function performSpin() {
        spinning = true;
        spinColumns();
    }

    // Stop spin function
    function stopSpin() {
        spinning = false;
        const columns = document.querySelectorAll('.column');
        columns.forEach(column => {
            column.classList.remove('rolling');
            // Calculate results here
            const results = generateSpinResults();
            calculateWin(results);
            displaySpinResults(results);
        });

        spinSound.pause(); // Stop the spin sound
        winSound.play(); // Play win sound if applicable
    }

    // Generate random spin results
    function generateSpinResults() {
        const results = [];
        const images = Object.keys(imageValues); // Ambil semua nama gambar
        for (let i = 0; i < 6; i++) { // Kolom 1-6
            const randomIndex = Math.floor(Math.random() * images.length);
            results.push(images[randomIndex]);
        }
        return results;
    }

    // Display spin results in the grid
    function displaySpinResults(results) {
        const cells = document.querySelectorAll('#spin-table img');
        results.forEach((result, index) => {
            cells[index].src = result; // Update image source directly
        });
    }

    // Calculate winnings and show win message
    function calculateWin(results) {
        const matches = checkWinningCondition(results);
        const winAmount = calculateScore(matches, currentBet);

        saldo += winAmount;
        updateSaldoDisplay();

        if (winAmount > 0) {
            winMessage.textContent = `Anda menang: Rp ${winAmount}`;
            winMessage.style.display = 'block';
            winSound.play();
            setTimeout(() => {
                winMessage.style.display = 'none';
            }, 2000);
        }
    }

    // Check winning condition
    function checkWinningCondition(results) {
        const matches = [];
        const counts = {};

        results.forEach(image => {
            counts[image] = (counts[image] || 0) + 1;
        });

        // Cek gambar dengan 3 atau lebih yang sama
        for (const [image, count] of Object.entries(counts)) {
            if (count >= 3) {
                matches.push(image);
            }
        }

        return matches; // Return winning images
    }

    // Calculate score based on matches and bet amount
    function calculateScore(matches, betAmount) {
        let score = 0;
        matches.forEach(image => {
            if (imageValues[image]) {
                score += imageValues[image];
            }
        });
        return score * betAmount; // Total score based on matches and bet
    }

    // Betting controls
    betIncreaseButton.addEventListener('click', () => {
        currentBet += 100; // Increase by a predefined value
        betAmountInput.value = currentBet;
    });

    betDecreaseButton.addEventListener('click', () => {
        if (currentBet > 100) { // Minimum bet
            currentBet -= 100; // Decrease by a predefined value
            betAmountInput.value = currentBet;
        }
    });

    multiplierIncreaseButton.addEventListener('click', () => {
        currentMultiplier += 1; // Increase by a predefined value
        multiplierInput.value = currentMultiplier;
    });

    multiplierDecreaseButton.addEventListener('click', () => {
        if (currentMultiplier > 1) { // Minimum multiplier
            currentMultiplier -= 1; // Decrease by a predefined value
            multiplierInput.value = currentMultiplier;
        }
    });

    // Auto spin functionality
    autoSpinButton.addEventListener('click', () => {
        autoSpinActive = true; // Set auto spin to active
        const count = prompt("Masukkan jumlah auto spin:"); // Example prompt for user input
        autoSpin(count);
    });

    // Auto spin logic
    function autoSpin(count) {
        for (let i = 0; i < count; i++) {
            if (!autoSpinActive) break; // Stop if auto spin is no longer active
            setTimeout(() => {
                spinButton.click();
            }, i * 1000); // Spin every second
        }
    }

    updateSaldoDisplay(); // Initialize saldo display
});
