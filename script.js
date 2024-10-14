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
    
let score = 1000;

function updateScore(amount) {
    score += amount;
    document.getElementById('saldo').textContent = `Saldo: Rp ${score.toFixed(2)}`;
}

function checkForJackpot() {
    const isJackpot = Math.random() > 0.9;
    if (isJackpot) {
        updateScore(500);
        showWinMessage(); 
    }
}

    function animateSpin(duration) {
    const spinTable = document.getElementById('spin-table');
    const rows = spinTable.getElementsByTagName('tr');

    // Logika animasi sebenarnya untuk mengacak gambar
    let spinInterval = setInterval(() => {
        for (let row of rows) {
            randomizeRow(row); // Mengacak gambar di setiap baris
        }
    }, 100); // Ubah gambar setiap 100ms untuk efek spin cepat

    spinTable.classList.add('spinning'); // Menambahkan kelas CSS untuk efek visual tambahan

    setTimeout(() => {
        clearInterval(spinInterval); // Hentikan randomisasi setelah durasi selesai
        spinTable.classList.remove('spinning'); // Hapus efek visual
        checkForJackpot(); // Cek apakah ada jackpot setelah spin selesai
    }, duration);
}
    
function showWinMessage() {
    const winMessage = document.getElementById('win-message');
    winMessage.classList.add('win-animate');

    // Sembunyikan kembali setelah 3 detik
    setTimeout(() => {
        winMessage.classList.remove('win-animate');
    }, 3000);
}
function checkForJackpot() {
    const isJackpot = /* Logika deteksi jackpot */;

    if (isJackpot) {
        spinTable.classList.add('blurred'); // Tambahkan efek blur
        showWinMessage(); // Tampilkan pesan kemenangan
    } else {
        spinTable.classList.remove('blurred'); // Hapus blur jika tidak ada jackpot
    }
}
function randomizeRow(row) {
    let images = Array.from(row.getElementsByTagName('img'));
    let randomizedImages = shuffleArray(images);

    // Ganti posisi gambar di baris secara acak
    for (let i = 0; i < images.length; i++) {
        row.replaceChild(randomizedImages[i], images[i]);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
