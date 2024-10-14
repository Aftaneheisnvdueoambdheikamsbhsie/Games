document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spin-button');
    const autoSpinButton = document.getElementById('auto-spin-button');
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
    let score = 1000;  // Starting score
    const predefinedBetValues = [200, 500, 1000, 5000, 10000, 20000, 50000, 100000, 500000, 1000000, 5000000, 10000000];
    const predefinedMultiplierValues = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Start Spin
    spinButton.addEventListener('click', () => {
        if (score > 0) {
            startSpin();
        }
    });

    function startSpin() {
        // Deduct bet from score
        let bet = parseInt(betAmountInput.value);
        if (isNaN(bet) || bet <= 0 || bet > score) {
            alert('Invalid bet amount!');
            return;
        }

        score -= bet;
        updateScore();

        // Spin animation logic
        let spinDuration = 3000;
        animateColumnsSpin(spinDuration);

        // Play spin sound
        spinSound.currentTime = 0;
        spinSound.play();

        setTimeout(() => {
            spinSound.pause();
            checkForJackpot();
        }, spinDuration);
    }

    function updateScore() {
        document.getElementById('saldo').textContent = `Saldo: Rp ${score.toFixed(2)}`;
    }

    // Spin Animation
    function animateColumnsSpin(duration) {
        const columns = spinTable.getElementsByTagName('tr');
        let delay = 0;

        // Animate each column with a delay
        Array.from(columns).forEach((column, index) => {
            setTimeout(() => {
                randomizeColumn(column);
            }, delay);
            delay += 500;  // Add delay between columns
        });

        setTimeout(() => {
            checkForJackpot();
        }, duration);
    }

    function randomizeColumn(column) {
        let images = Array.from(column.getElementsByTagName('img'));
        let randomizedImages = shuffleArray(images);

        for (let i = 0; i < images.length; i++) {
            column.replaceChild(randomizedImages[i], images[i]);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Jackpot Check
    function checkForJackpot() {
        const jackpotImages = ['jackpot.png'];  // Define which images count as jackpot
        const cells = Array.from(spinTable.getElementsByTagName('img'));
        let jackpotCells = cells.filter(cell => jackpotImages.includes(cell.src.split('/').pop()));

        if (jackpotCells.length >= 3) {
            triggerJackpotAnimation(jackpotCells);
        }
    }

    function triggerJackpotAnimation(jackpotCells) {
        jackpotCells.forEach(cell => {
            cell.classList.add('jackpot-animate');  // Add visual effect
        });

        setTimeout(() => {
            jackpotCells.forEach(cell => cell.classList.remove('jackpot-animate'));
            awardFreeSpins();
        }, 3000);
    }

    function awardFreeSpins() {
        let freeSpins = 5;
        startAutoSpin(freeSpins);
    }

    function startAutoSpin(count) {
        if (isAutoSpinning) return;

        isAutoSpinning = true;
        let spins = 0;

        autoSpinInterval = setInterval(() => {
            if (spins >= count) {
                clearInterval(autoSpinInterval);
                isAutoSpinning = false;
            } else {
                startSpin();
                spins++;
            }
        }, 4000);
    }

    // Bet Controls
    betIncrease.addEventListener('click', () => {
        adjustBetAmount(1);
    });

    betDecrease.addEventListener('click', () => {
        adjustBetAmount(-1);
    });

    function adjustBetAmount(direction) {
        const currentBet = parseInt(betAmountInput.value) || 0;
        const currentIndex = predefinedBetValues.indexOf(currentBet);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < predefinedBetValues.length) {
            betAmountInput.value = predefinedBetValues[newIndex];
        }
    }

    // Multiplier Controls
    multiplierIncrease.addEventListener('click', () => {
        adjustMultiplier(1);
    });

    multiplierDecrease.addEventListener('click', () => {
        adjustMultiplier(-1);
    });

    function adjustMultiplier(direction) {
        const currentMultiplier = parseInt(multiplierInput.value) || predefinedMultiplierValues[0];
        const currentIndex = predefinedMultiplierValues.indexOf(currentMultiplier);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < predefinedMultiplierValues.length) {
            multiplierInput.value = predefinedMultiplierValues[newIndex];
        }
    }
});
