document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spin-button');
    const betIncrease = document.getElementById('bet-increase');
    const betDecrease = document.getElementById('bet-decrease');
    const betAmountInput = document.getElementById('bet-amount');
    const multiplierIncrease = document.getElementById('multiplier-increase');
    const multiplierDecrease = document.getElementById('multiplier-decrease');
    const multiplierInput = document.getElementById('multiplier');
    const spinTable = document.getElementById('spin-table');
    const spinSound = new Audio('spin.mp3'); // Replace with actual spin sound file
    const winSound = new Audio('win.mp3');   // Replace with actual win sound file
    let score = 1000;  // Starting score
    const predefinedBetValues = [200, 500, 1000, 5000, 10000, 20000, 25000, 50000, 100000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 5000000, 10000000];
    const predefinedMultiplierValues = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    let isAutoSpinning = false;

    spinButton.addEventListener('click', () => {
        startSpin();
    });

    function startSpin() {
        let bet = parseInt(betAmountInput.value);
        if (score >= bet) {
            score -= bet;
            updateScore();
            spinSound.play();
            animateColumnsSpin(3000);
        }
    }

    function updateScore() {
        document.getElementById('saldo').textContent = `Saldo: Rp ${score.toFixed(2)}`;
    }

    function animateColumnsSpin(duration) {
        const columns = spinTable.getElementsByTagName('tr');
        let delay = 0;
        Array.from(columns).forEach((column, index) => {
            setTimeout(() => {
                randomizeColumn(column);
            }, delay);
            delay += 500; // Delay for next column
        });
        setTimeout(() => {
            checkWinning();
        }, duration);
    }

    function randomizeColumn(column) {
        // Randomize column logic here
        const images = column.getElementsByTagName('img');
        for (let img of images) {
            img.src = getRandomImage();
        }
    }

    function getRandomImage() {
        const images = ['coin.png', 'Diamond.png', 'game.png', 'gold.png', 'vip.png', 'j.png', 'treasure-chest.png', 'luxury.png', 'jackpot.png'];
        return images[Math.floor(Math.random() * images.length)];
    }

    function checkWinning() {
        // Implement winning logic
        winSound.play();
        // Show winning message
        document.getElementById('win-message').style.display = 'block';
    }

    // Bet controls
    betIncrease.addEventListener('click', () => {
        let currentBet = parseInt(betAmountInput.value);
        let nextBetIndex = predefinedBetValues.indexOf(currentBet) + 1;
        if (nextBetIndex < predefinedBetValues.length) {
            betAmountInput.value = predefinedBetValues[nextBetIndex];
        }
    });

    betDecrease.addEventListener('click', () => {
        let currentBet = parseInt(betAmountInput.value);
        let prevBetIndex = predefinedBetValues.indexOf(currentBet) - 1;
        if (prevBetIndex >= 0) {
            betAmountInput.value = predefinedBetValues[prevBetIndex];
        }
    });

    // Multiplier controls
    multiplierIncrease.addEventListener('click', () => {
        let currentMultiplier = parseInt(multiplierInput.value);
        let nextMultiplierIndex = predefinedMultiplierValues.indexOf(currentMultiplier) + 1;
        if (nextMultiplierIndex < predefinedMultiplierValues.length) {
            multiplierInput.value = predefinedMultiplierValues[nextMultiplierIndex];
        }
    });

    multiplierDecrease.addEventListener('click', () => {
        let currentMultiplier = parseInt(multiplierInput.value);
        let prevMultiplierIndex = predefinedMultiplierValues.indexOf(currentMultiplier) - 1;
        if (prevMultiplierIndex >= 0) {
            multiplierInput.value = predefinedMultiplierValues[prevMultiplierIndex];
        }
    });

    // Auto spin functionality
    function startAutoSpin(count) {
        isAutoSpinning = true;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                startSpin();
            }, i * 5000); // Spin every 5 seconds
        }
        isAutoSpinning = false;
    }

    // Burger menu functionality
    const burgerMenu = document.getElementById('burger-menu');
    const gameMenu = document.getElementById('game-menu');

    burgerMenu.addEventListener('click', () => {
        gameMenu.classList.toggle('hidden');
    });
    
    // Click outside to close menu
    window.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !gameMenu.contains(e.target)) {
            gameMenu.classList.add('hidden');
        }
    });
});
