document.addEventListener("DOMContentLoaded", function () {
    const spinButton = document.getElementById("spin-button");
    const stopButton = document.getElementById("stop-button");
    const betDecreaseButton = document.getElementById("bet-decrease");
    const betIncreaseButton = document.getElementById("bet-increase");
    const betAmountDisplay = document.getElementById("bet-amount");
    const autoSpinButton = document.getElementById("auto-spin-button");
    const autoSpinOptions = document.getElementById("auto-spin-options");
    const scoreDisplay = document.getElementById("score");
    const warningMessage = document.getElementById("warning-message");
    const spinSound = document.getElementById("spin-sound");
    const winSound = document.getElementById("win-sound");

    let betAmount = 200;
    let score = 1000;
    let autoSpinInterval = null;
    let isSpinning = false;

    // Fungsi untuk memperbarui tampilan saldo
    function updateScoreDisplay() {
        scoreDisplay.textContent = `Rp ${score.toFixed(2)}`;
        if (score <= 0) {
            warningMessage.classList.remove("hidden");
        } else {
            warningMessage.classList.add("hidden");
        }
    }

    // Fungsi untuk melakukan Spin
    function spin() {
        if (isSpinning) return; // Mencegah spin berulang saat sudah berputar
        if (score <= 0) {
            warningMessage.classList.remove("hidden");
            return;
        }

        isSpinning = true;
        spinSound.play();
        
        // Proses animasi spin
        setTimeout(() => {
            // Setelah spin selesai, periksa hasilnya
            checkWin();
            isSpinning = false;
        }, 2000);
    }

    // Fungsi untuk memeriksa apakah ada kemenangan
    function checkWin() {
        // Misalkan mekanisme kemenangan sederhana di sini
        const win = Math.random() > 0.7; // 30% peluang untuk menang
        if (win) {
            winSound.play();
            const winnings = betAmount * 2; // Pengganda kemenangan
            score += winnings;
            alert(`Selamat, Anda menang Rp ${winnings}!`);
        } else {
            score -= betAmount;
        }
        updateScoreDisplay();
    }

    // Fungsi untuk mengurangi jumlah taruhan
    betDecreaseButton.addEventListener("click", function () {
        if (betAmount > 50) {
            betAmount -= 50;
            betAmountDisplay.textContent = betAmount;
        }
    });

    // Fungsi untuk menambah jumlah taruhan
    betIncreaseButton.addEventListener("click", function () {
        if (betAmount < score) {
            betAmount += 50;
            betAmountDisplay.textContent = betAmount;
        }
    });

    // Fungsi untuk memulai spin manual
    spinButton.addEventListener("click", function () {
        spin();
    });

    // Fungsi untuk menghentikan spin otomatis
    stopButton.addEventListener("click", function () {
        clearInterval(autoSpinInterval);
        autoSpinInterval = null;
    });

    // Fungsi untuk memulai spin otomatis
    autoSpinButton.addEventListener("click", function () {
        const spins = parseInt(autoSpinOptions.value);
        let count = 0;
        if (autoSpinInterval) return; // Mencegah auto spin berulang

        autoSpinInterval = setInterval(() => {
            if (count < spins) {
                spin();
                count++;
            } else {
                clearInterval(autoSpinInterval);
                autoSpinInterval = null;
            }
        }, 2500); // Interval antar spin otomatis
    });

    updateScoreDisplay();
});
