const images = ['Diamond.png', 'coin.png', 'jackpot.png', 'vip.png', 'luxury.png', 'a.png', 'treasure-chest.png', 'game.png'];
const rows = 6;
const cols = 7;
let score = 1000.00; // Mulai dengan modal Rp 1000.00
let autoSpinCount = 0;
let spinInterval;

// Fungsi untuk memutar spin
function spin() {
    const betAmount = parseFloat(document.getElementById('bet-amount').value);
    const multiplier = parseFloat(document.getElementById('multiplier').value);
    if (score >= betAmount) {
        score -= betAmount; // Kurangi saldo dengan taruhan
        updateScore();

        // Play spin sound
        const spinSound = document.getElementById('spin-sound');
        spinSound.play();

        let spinCount = 0;
        const intervalId = setInterval(() => {
            if (spinCount >= 10) {
                clearInterval(intervalId);
                calculatePrize(multiplier);
                return;
            }
            for (let r = 1; r <= rows; r++) {
                for (let c = 1; c <= cols; c++) {
                    const randomImage = images[Math.floor(Math.random() * images.length)];
                    const cell = document.getElementById(`cell-${r}-${c}`);
                    cell.src = randomImage;
                }
            }
            spinCount++;
        }, 200);
    } else {
        alert("Saldo tidak cukup!");
    }
}

// Fungsi untuk menghitung hadiah
function calculatePrize(multiplier) {
    let prize = 0;
    // Logika untuk menghitung kemenangan di sini (misal 3 ikon sama)
    // Contoh:
    // Jika 3 ikon 'jackpot' dalam satu baris, menangkan hadiah
    prize = 200 * multiplier; // Contoh hadiah berdasarkan multiplier
    score += prize;
    updateScore();

    if (prize > 0) {
        const winSound = document.getElementById('win-sound');
        winSound.play();
    }
}

// Fungsi untuk memperbarui tampilan saldo
function updateScore() {
    document.getElementById('score').innerText = `Rp ${score.toFixed(2)}`;
}

// Spin otomatis
function autoSpin(times) {
    autoSpinCount = times;
    spinInterval = setInterval(() => {
        if (autoSpinCount <= 0) {
            clearInterval(spinInterval);
            return;
        }
        spin();
        autoSpinCount--;
    }, 1500);
}

// Event listeners
document.getElementById('spin-button').addEventListener('click', spin);
document.getElementById('auto-spin-10').addEventListener('click', () => autoSpin(10));
document.getElementById('auto-spin-50').addEventListener('click', () => autoSpin(50));
document.getElementById('auto-spin-100').addEventListener('click', () => autoSpin(100));
