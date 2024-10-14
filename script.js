document.addEventListener('DOMContentLoaded', function () {
    const scoreElement = document.getElementById('score');
    const betButtons = document.querySelectorAll('.bet-option');
    const multiplierButtons = document.querySelectorAll('.multiplier-option');
    const spinButton = document.getElementById('spin-button');
    const warningMessage = document.getElementById('warning-message');
    let score = 1000000; // Starting balance
    let betAmount = 0;
    let multiplier = 2;

    // Function to update score display
    function updateScoreDisplay() {
        scoreElement.innerText = `Rp ${score.toLocaleString()}`;
        if (score <= 0) {
            warningMessage.classList.remove('hidden');
            spinButton.disabled = true; // Disable the spin button if score is zero
        } else {
            warningMessage.classList.add('hidden');
            spinButton.disabled = false;
        }
    }

    // Event listeners for bet buttons
    betButtons.forEach(button => {
        button.addEventListener('click', function () {
            betAmount = parseInt(this.dataset.value);
            console.log(`Bet Amount set to: ${betAmount}`);
        });
    });

    // Event listeners for multiplier buttons
    multiplierButtons.forEach(button => {
        button.addEventListener('click', function () {
            multiplier = parseInt(this.dataset.value);
            console.log(`Multiplier set to: ${multiplier}`);
        });
    });

    // Spin button functionality
    spinButton.addEventListener('click', function () {
        if (score >= betAmount) {
            score -= betAmount;
            updateScoreDisplay();
            // Add logic for spinning the game
            console.log('Spinning the game...');
        } else {
            alert('Saldo tidak cukup untuk melakukan taruhan.');
        }
    });

    // Initial display update
    updateScoreDisplay();
});
