document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const gameMenu = document.getElementById('game-menu');
    const spinButton = document.getElementById('spin-button');
    const betAmountInput = document.getElementById('bet-amount');
    const multiplierInput = document.getElementById('multiplier');
    const betIncreaseButton = document.getElementById('bet-increase');
    const betDecreaseButton = document.getElementById('bet-decrease');
    const multiplierIncreaseButton = document.getElementById('multiplier-increase');
    const multiplierDecreaseButton = document.getElementById('multiplier-decrease');
    const spinSound = document.getElementById('spin-sound');
    const winSound = document.getElementById('win-sound');
    const warningMessage = document.getElementById('warning-message');

    let score = 1000;
    const maxBet = 10000000;
    
    burgerMenu.addEventListener('click', () => {
        gameMenu.classList.toggle('visible');
    });

    betIncreaseButton.addEventListener('click', () => {
        let currentBet = parseInt(betAmountInput.value);
        if (currentBet < maxBet) {
            currentBet += 200; // Adjust increment as needed
            betAmountInput.value = currentBet;
        }
    });

    betDecreaseButton.addEventListener('click', () => {
        let currentBet = parseInt(betAmountInput.value);
        if (currentBet > 0) {
            currentBet -= 200; // Adjust decrement as needed
            betAmountInput.value = currentBet;
        }
    });

    multiplierIncreaseButton.addEventListener('click', () => {
        let currentMultiplier = parseInt(multiplierInput.value);
        if (currentMultiplier < 10) {
            currentMultiplier++;
            multiplierInput.value = currentMultiplier;
        }
    });

    multiplierDecreaseButton.addEventListener('click', () => {
        let currentMultiplier = parseInt(multiplierInput.value);
        if (currentMultiplier > 2) {
            currentMultiplier--;
            multiplierInput.value = currentMultiplier;
        }
    });

    spinButton.addEventListener('click', () => {
        spinSound.play();
        // Animation Logic 
        spinAnimation();
    });

    function spinAnimation() {
        const spinTable = document.getElementById('spin-table');
        let spinCount = 10; // Total number of spins
        let spinDuration = 300; // Duration of each spin in milliseconds
        let currentRow = 0;
        let winningRows = [];

        const spinInterval = setInterval(() => {
            if (currentRow < spinCount) {
                spinTable.style.transform = `translateY(-${currentRow * 50}px)`;
                currentRow++;

                // Check for wins after certain spins
                if (currentRow === spinCount - 5) {
                    winningRows = checkForWins();
                }
            } else {
                clearInterval(spinInterval);
                revealWinnings(winningRows);
            }
        }, spinDuration);
    }

    function checkForWins() {
        // Logic to check winning rows, assuming rows with matching images are wins
        const rows = [...document.querySelectorAll('#spin-table tr')];
        const winningRows = [];

        for (let i = 0; i < rows.length; i++) {
            const cells = [...rows[i].children];
            const firstImageSrc = cells[0].querySelector('img').src;

            // Check if all images in the row are the same
            if (cells.every(cell => cell.querySelector('img').src === firstImageSrc)) {
                winningRows.push(i);
            }
        }
        return winningRows;
    }

    function revealWinnings(winningRows) {
        winningRows.forEach(rowIndex => {
            const row = document.querySelector(`#spin-table tr:nth-child(${rowIndex + 1})`);
            row.classList.add('winning-row');

            // Add win animation (e.g., spin effect)
            const images = row.querySelectorAll('img');
            images.forEach(img => {
                img.classList.add('spin-animation');
                img.addEventListener('animationend', () => {
                    img.classList.remove('spin-animation');
                });
            });
        });

        // Sound effects for wins
        if (winningRows.length > 0) {
            winSound.play();
            alert('You have won!');
        }
    }
});
