// Daftar nilai taruhan sesuai permintaan
const betValues = [
    0, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000,
    100000, 500000, 750000, 1000000, 1500000, 2000000, 
    2500000, 3000000, 5000000, 10000000
];

// Inisialisasi saldo awal
let score = 1000;
document.getElementById('score').textContent = 'Rp ' + score.toLocaleString();

// Fungsi untuk mengupdate nilai taruhan berdasarkan slider
document.getElementById('bet-amount').addEventListener('input', function() {
    const selectedBetIndex = this.value;
    const selectedBetValue = betValues[selectedBetIndex];
    document.getElementById('bet-value').textContent = 'Rp ' + selectedBetValue.toLocaleString();
});

// Fungsi untuk mengupdate nilai perkalian berdasarkan slider
document.getElementById('multiplier').addEventListener('input', function() {
    document.getElementById('multiplier-value').textContent = this.value + 'x';
});

// Fungsi untuk menjalankan Spin
document.getElementById('spin-button').addEventListener('click', function() {
    let betAmount = betValues[document.getElementById('bet-amount').value];
    let multiplier = document.getElementById('multiplier').value;

    if (betAmount > score) {
        alert('Saldo tidak mencukupi. Silakan kurangi taruhan atau tambahkan saldo.');
        return;
    }

    // Kurangi saldo dengan jumlah taruhan
    score -= betAmount;
    document.getElementById('score').textContent = 'Rp ' + score.toLocaleString();

    // Simulasikan spin dan hitung kemenangan (contoh sederhana, logika spin perlu dikembangkan)
    let winAmount = Math.random() < 0.5 ? betAmount * multiplier : 0; // 50% kemungkinan menang
    score += winAmount;

    // Update saldo setelah spin
    document.getElementById('score').textContent = 'Rp ' + score.toLocaleString();

    // Mainkan suara spin
    document.getElementById('spin-sound').play();

    // Jika menang, mainkan suara kemenangan dan tampilkan notifikasi
    if (winAmount > 0) {
        document.getElementById('win-sound').play();
        alert('Anda menang Rp ' + winAmount.toLocaleString() + '!');
    } else if (score <= 0) {
        alert('Anda kalah dan saldo habis. Silakan tambahkan saldo untuk bermain lagi.');
    }
});

// Fungsi Auto Spin (contoh dengan 10x, 50x, dan 100x)
function autoSpin(times) {
    let count = 0;
    let interval = setInterval(function() {
        if (count < times) {
            document.getElementById('spin-button').click();
            count++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Delay 1 detik per spin
}

document.getElementById('auto-spin-10').addEventListener('click', function() {
    autoSpin(10);
});

document.getElementById('auto-spin-50').addEventListener('click', function() {
    autoSpin(50);
});

document.getElementById('auto-spin-100').addEventListener('click', function() {
    autoSpin(100);
});

// Mainkan suara ketika slider digeser
document.getElementById('bet-amount').addEventListener('input', function() {
    let betSound = new Audio('slider.mp3'); // Tambahkan file suara slider
    betSound.play();
});

document.getElementById('multiplier').addEventListener('input', function() {
    let multiplierSound = new Audio('slider.mp3'); // Tambahkan file suara slider
    multiplierSound.play();
});
