document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const gameMenu = document.getElementById('game-menu');
    const spinButton = document.getElementById('spin-button');
    const stopButton = document.getElementById('stop-button');
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

    const imageValues = {
        'a.png': 25,
        'j.png': 25,
        'gold.png': 30,
        'coin.png': 30,
        'game.png': 30,
        'luxury.png': 50,
        'diamond.png': 50,
        'vip.png': 80,
        'jackpot.png': 80
    };

    let saldo = 1000;
    let currentBet = 200;
    let currentMultiplier = 2;
    let spinning = false;
    let autoSpinActive = false;

    // Navigasi burger menu
    burgerMenu.addEventListener('click', () => {
        gameMenu.classList.toggle('hidden');
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
        if (spinning) {
            stopSpin(); // Stop current spin
        }
    });

    // Perform spin logic
    function performSpin() {
        spinning = true;
        spinColumns();
    }

    // Spin columns function
    function spinColumns() {
        const columns = document.querySelectorAll('.column');
        columns.forEach((column, index) => {
            setTimeout(() => {
                column.classList.add('rolling'); // Add CSS class for animation
            }, index * 300);
        });

        // Stop after a set time
        setTimeout(stopSpin, 3000); // Adjust duration as necessary
    }

    // Stop spin function
    function stopSpin() {
        spinning = false;
        const columns = document.querySelectorAll('.column');
        columns.forEach(column => {
            column.classList.remove('rolling');
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
        const images = Object.keys(imageValues);
        for (let i = 0; i < columns.length; i++) {
            const randomIndex = Math.floor(Math.random() * images.length);
            results.push(images[randomIndex]);
        }
        return results;
    }

    // Display spin results in the grid
    function displaySpinResults(results) {
        const cells = document.querySelectorAll('#spin-table img');
        results.forEach((result, index) => {
            cells[index].src = result;
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
    
             // Memeriksa hasil untuk mendapatkan kombinasi yang menang
        for (const image in counts) {
            if (counts[image] >= 3) {
                matches.push(image);
            }
        }
        return matches;
    }

    // Menghitung total kemenangan berdasarkan kecocokan dan taruhan
    function calculateScore(matches, bet) {
        let totalWin = 0;

        matches.forEach(match => {
            totalWin += imageValues[match] * bet; // Menghitung total kemenangan berdasarkan nilai gambar
        });

        return totalWin;
    }

    // Fungsi untuk menangani peningkatan taruhan
    betIncreaseButton.addEventListener('click', () => {
        currentBet += 100; // Sesuaikan jumlah ini sesuai kebutuhan
        betAmountInput.value = currentBet;
    });

    // Fungsi untuk menangani pengurangan taruhan
    betDecreaseButton.addEventListener('click', () => {
        if (currentBet > 100) {
            currentBet -= 100; // Sesuaikan jumlah ini sesuai kebutuhan
        }
        betAmountInput.value = currentBet;
    });

    // Fungsi untuk menangani peningkatan multiplier
    multiplierIncreaseButton.addEventListener('click', () => {
        currentMultiplier += 1; // Sesuaikan jumlah ini sesuai kebutuhan
        multiplierInput.value = currentMultiplier;
    });

    // Fungsi untuk menangani pengurangan multiplier
    multiplierDecreaseButton.addEventListener('click', () => {
        if (currentMultiplier > 1) {
            currentMultiplier -= 1; // Sesuaikan jumlah ini sesuai kebutuhan
        }
        multiplierInput.value = currentMultiplier;
    });

    // Fungsi untuk mengaktifkan auto spin
    autoSpinButton.addEventListener('click', () => {
        autoSpinActive = !autoSpinActive;
        if (autoSpinActive) {
            autoSpinButton.textContent = 'Stop Auto Spin';
            autoSpin();
        } else {
            autoSpinButton.textContent = 'Auto Spin';
        }
    });

    // Fungsi untuk menjalankan auto spin
    function autoSpin() {
        if (autoSpinActive && saldo >= currentBet) {
            spinButton.click(); // Menjalankan spin
            setTimeout(autoSpin, 5000); // Menjalankan spin berikutnya setelah interval
        } else {
            autoSpinActive = false; // Menonaktifkan auto spin jika saldo tidak cukup
            autoSpinButton.textContent = 'Auto Spin';
        }
    }
});
   
