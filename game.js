document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const gameMenu = document.getElementById('game-menu');
    const spinButton = document.getElementById('spin-button');
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

    let saldo = 1000;
    let currentBet = 200;
    let currentMultiplier = 2;

    // Update score display
    function updateSaldoDisplay() {
        document.getElementById('saldo').textContent = `Saldo: Rp ${saldo}`;
    }

    // Toggle game menu
    burgerMenu.addEventListener('click', () => {
        gameMenu.classList.toggle('visible');
    });

    // Spin button click event
    spinButton.addEventListener('click', () => {
        if (currentBet > saldo) {
            alert("Saldo tidak cukup!");
            return;
        }
        saldo -= currentBet;
        updateSaldoDisplay();
        spinSound.play();
        performSpin();
    });

    // Perform spin logic
    function performSpin() {
        const spinResults = generateSpinResults();
        displaySpinResults(spinResults);
        calculateWin(spinResults);
    }

    // Generate random spin results
    function generateSpinResults() {
        const results = [];
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * 7);
            results.push(randomIndex);
        }
        return results;
    }

    // Display spin results in the grid
    function displaySpinResults(results) {
        const cells = document.querySelectorAll('#spin-table img');
        results.forEach((result, index) => {
            cells[index].src = getImageSourceForResult(result);
        });
    }

    // Get image source based on result index
    function getImageSourceForResult(index) {
        const images = ["coin.png", "Diamond.png", "game.png", "gold.png", "vip.png", "j.png", "a.png"];
        return images[index];
    }

    // Calculate winnings and show win message
    function calculateWin(results) {
        const winAmount = currentBet * currentMultiplier; // Sample win calculation
        saldo += winAmount;
        updateSaldoDisplay();
        winMessage.style.display = 'block';
        winSound.play();
        setTimeout(() => {
            winMessage.style.display = 'none';
        }, 2000);
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
        // Show dropdown
    });

    autoSpinOptions.forEach(option => {
        option.addEventListener('click', function () {
            const count = this.getAttribute('data-count');
            autoSpin(count);
        });
    });

    // Auto spin logic
    function autoSpin(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                spinButton.click();
            }, i * 1000); // Spin every second
        }
    }

    updateSaldoDisplay();
});
