document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spin-button');
    const autoSpinButton = document.getElementById('auto-spin-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const betIncreaseButton = document.getElementById('bet-increase');
    const betDecreaseButton = document.getElementById('bet-decrease');
    const multiplierIncreaseButton = document.getElementById('multiplier-increase');
    const multiplierDecreaseButton = document.getElementById('multiplier-decrease');
    const betAmountInput = document.getElementById('bet-amount');
    const multiplierInput = document.getElementById('multiplier');
    const scoreElement = document.getElementById('score');
    const warningMessage = document.getElementById('warning-message');
    const spinSound = document.getElementById('spin-sound');
    const winSound = document.getElementById('win-sound');
    const spinTable = document.getElementById('spin-table');

    let score = 1000; // Initial score
    let currentBet = 200; // Default bet amount
    let currentMultiplier = 2; // Default multiplier
    let autoSpinInterval; // For automatic spins

    // Bet values array
    const betValues = [200, 500, 1000, 5000, 10000, 20000, 25000, 50000, 100000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 5000000, 10000000];

    // Initialize the input values
    betAmountInput.value = currentBet;
    multiplierInput.value = currentMultiplier;

    // Toggle burger menu
    document.getElementById('burger-menu').addEventListener('click', () => {
        const menu = document.getElementById('game-menu');
        menu.classList.toggle('hidden');
    });

    // Spin button click event
    spinButton.addEventListener('click', () => {
        if (score >= currentBet) {
            score -= currentBet; // Deduct the bet amount from score
            scoreElement.innerText = `Rp ${score.toFixed(2)}`; // Update the score display
            warningMessage.classList.add('hidden'); // Hide warning message
            startSpinningAnimation(); // Start spinning animation
        } else {
            warningMessage.classList.remove('hidden'); // Show warning if insufficient score
        }
    });

    // Auto Spin dropdown toggle
    autoSpinButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('hidden');
    });

    // Auto Spin options
    document.querySelectorAll('.auto-spin-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const spins = parseInt(e.target.innerText);
            startAutoSpin(spins); // Start auto spin logic
            dropdownContent.classList.add('hidden'); // Hide dropdown after selection
        });
    });

    // Bet increase and decrease buttons
    betIncreaseButton.addEventListener('click', () => {
        const nextBet = betValues.find(value => value > currentBet);
        if (nextBet) {
            currentBet = nextBet;
            betAmountInput.value = currentBet;
        }
    });

    betDecreaseButton.addEventListener('click', () => {
        const previousBet = betValues.reverse().find(value => value < currentBet);
        if (previousBet) {
            currentBet = previousBet;
            betAmountInput.value = currentBet;
        }
    });

    // Multiplier increase and decrease buttons
    multiplierIncreaseButton.addEventListener('click', () => {
        if (currentMultiplier < 10) { // Set a max limit for multiplier
            currentMultiplier++;
            multiplierInput.value = currentMultiplier;
        }
    });

    multiplierDecreaseButton.addEventListener('click', () => {
        if (currentMultiplier > 1) { // Set a min limit for multiplier
            currentMultiplier--;
            multiplierInput.value = currentMultiplier;
        }
    });

    function startSpinningAnimation() {
        spinSound.currentTime = 0; // Reset sound to start
        spinSound.play(); // Play spin sound
        let spinDuration = 3000; // Spin duration in milliseconds
        let spinFrames = 6; // Number of frames to display during spin
        let currentFrame = 0;
        
        // Spin animation loop
        const spinInterval = setInterval(() => {
            // Update the spin table to simulate spinning
            updateSpinTable();
            currentFrame++;
            if (currentFrame >= spinFrames) {
                clearInterval(spinInterval);
                checkWinCondition(); // Check for winning after spin
            }
        }, spinDuration / spinFrames);
    }

    function updateSpinTable() {
    // Logic to update the spin table (e.g., randomize the images)
    const cells = spinTable.querySelectorAll('img');
    cells.forEach(cell => {
        const randomImageIndex = Math.floor(Math.random() * 10); // Randomize images (assuming 10 images)
        cell.src = `image_${randomImageIndex}.png`; // Update the image source
        cell.style.animation = 'spin 0.3s linear'; // Menambahkan animasi spin pada gambar
    });
}


    function checkWinCondition() {
        // Logic to check if the player won (placeholder logic)
        const isWinner = Math.random() < 0.5; // Randomly determine if the player wins
        if (isWinner) {
            winSound.play(); // Play win sound
            score += currentBet * currentMultiplier; // Calculate winnings
            scoreElement.innerText = `Rp ${score.toFixed(2)}`; // Update score display
            displayWinningAnimation(); // Show winning animation
        } else {
            // Handle losing scenario (you can add effects or messages here)
        }
    }

    function displayWinningAnimation() {
        const winningEffect = document.createElement('div');
        winningEffect.classList.add('winning-effect');
        winningEffect.innerText = "You Win!";
        document.body.appendChild(winningEffect); // Menambahkan efek ke body

        // Mengatur animasi
        setTimeout(() => {
            winningEffect.classList.add('show'); // Menambahkan kelas show untuk memulai animasi
        }, 100); // Menunggu sedikit untuk memberikan efek

        // Menghapus efek setelah animasi selesai
        setTimeout(() => {
            document.body.removeChild(winningEffect);
        }, 3000); // Menghapus efek setelah 3 detik
    }

    function startAutoSpin(spins) {
        let spinCount = spins; // Set the number of spins
        autoSpinInterval = setInterval(() => {
            if (spinCount > 0) {
                spinButton.click(); // Trigger spin
                spinCount--;
            } else {
                clearInterval(autoSpinInterval); // Stop auto spinning
            }
        }, 4000); // Set the interval for each spin (adjust as needed)
    }
});
