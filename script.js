document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spin-button');
    const autoSpinButton = document.getElementById('auto-spin-button');
    const autoSpinOptions = document.querySelectorAll('.auto-spin-option');
    const betIncrease = document.getElementById('bet-increase');
    const betDecrease = document.getElementById('bet-decrease');
    const betAmountInput = document.getElementById('bet-amount');
    const multiplierIncrease = document.getElementById('multiplier-increase');
    const multiplierDecrease = document.getElementById('multiplier-decrease');
    const multiplierInput = document.getElementById('multiplier');
    const spinTable = document.getElementById('spin-table');
    const spinSound = document.getElementById('spin-sound');
    const winSound = document.getElementById('win-sound');
    let isAutoSpinning = false;
    let autoSpinInterval;
    const predefinedBetValues = [200, 500, 1000, 5000, 10000, 20000, 25000, 50000, 100000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 5000000, 10000000];
    const predefinedMultiplierValues = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Spin Logic
    spinButton.addEventListener('click', () => {
        startSpin();
    });

    function startSpin() {
        // Play spin sound
        spinSound.currentTime = 0;
        spinSound.play();

        // Animate the table
        let spinDuration = 3000; // 3 seconds
        animateSpin(spinDuration);
        
        // Stop sound when spin ends
        setTimeout(() => {
            spinSound.pause();
        }, spinDuration);
    }

    function animateSpin(duration) {
        // Placeholder spin animation logic
        // Add actual animation logic to randomize the images
        spinTable.classList.add('spinning'); // CSS class to handle animation

        setTimeout(() => {
            spinTable.classList.remove('spinning');
            checkForJackpot();
        }, duration);
    }

    // Auto Spin Logic
    autoSpinButton.addEventListener('click', () => {
        toggleAutoSpinMenu();
    });

    autoSpinOptions.forEach(option => {
        option.addEventListener('click', () => {
            const spinCount = parseInt(option.textContent.replace('x', ''));
            startAutoSpin(spinCount);
        });
    });

    function toggleAutoSpinMenu() {
        const dropdown = autoSpinButton.nextElementSibling;
        dropdown.classList.toggle('hidden');
    }

    function startAutoSpin(count) {
        if (isAutoSpinning) return;

        isAutoSpinning = true;
        let spins = 0;

        autoSpinInterval = setInterval(() => {
            startSpin();
            spins++;

            if (spins >= count) {
                clearInterval(autoSpinInterval);
                isAutoSpinning = false;
            }
        }, 4000); // 4 seconds per spin
    }

    // Betting Logic
    betIncrease.addEventListener('click', () => {
        adjustBetAmount(1);
    });

    betDecrease.addEventListener('click', () => {
        adjustBetAmount(-1);
    });

    function adjustBetAmount(direction) {
        const currentBet = parseInt(betAmountInput.value);
        const currentIndex = predefinedBetValues.indexOf(currentBet);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < predefinedBetValues.length) {
            betAmountInput.value = predefinedBetValues[newIndex];
        }
    }

    multiplierIncrease.addEventListener('click', () => {
        adjustMultiplier(1);
    });

    multiplierDecrease.addEventListener('click', () => {
        adjustMultiplier(-1);
    });

    function adjustMultiplier(direction) {
        const currentMultiplier = parseInt(multiplierInput.value);
        const currentIndex = predefinedMultiplierValues.indexOf(currentMultiplier);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < predefinedMultiplierValues.length) {
            multiplierInput.value = predefinedMultiplierValues[newIndex];
        }
    }

    // Jackpot Animation
    function checkForJackpot() {
        const jackpotImages = ['jackpot.png']; // Add more jackpot identifiers if needed
        const cells = Array.from(spinTable.getElementsByTagName('img'));
        let jackpotCells = [];

        cells.forEach(cell => {
            if (jackpotImages.includes(cell.src.split('/').pop())) {
                jackpotCells.push(cell);
            }
        });

        if (jackpotCells.length >= 3) {
            triggerJackpotAnimation(jackpotCells);
        }
    }

    function triggerJackpotAnimation(jackpotCells) {
        jackpotCells.forEach(cell => {
            cell.classList.add('jackpot-animate'); // Apply CSS animation
        });

        setTimeout(() => {
            jackpotCells.forEach(cell => {
                cell.classList.remove('jackpot-animate');
            });
            awardFreeSpins();
        }, 3000); // 3 seconds of jackpot animation
    }

    function awardFreeSpins() {
        let freeSpins = 6;
        startAutoSpin(freeSpins);
    }

    // Stop all spin sounds when auto spin ends
    function stopAllSounds() {
        spinSound.pause();
        winSound.pause();
    }
});
