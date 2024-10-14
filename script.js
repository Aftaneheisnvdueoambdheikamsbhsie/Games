const images = ['Diamond.png', 'Gold coin.png', 'jackpot.png', 'vip.png', 'luxury.png', 'a.png', 'treasure-chest.png', 'game.png'];
const rows = 6;
const cols = 7;
let score = 0;

// Skor untuk setiap ikon
const iconScores = {
    'jackpot.png': 2,
    'Diamond.png': 1,
    'Gold coin.png': 1,
    'luxury.png': 1.5,
    'a.png': 1,
    'j.png': 1,
    'game.png': 1,
    'treasure-chest.png': 1
};

// Fungsi untuk memutar spin
function spin() {
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true; // Disable tombol saat spin

    const spinSound = document.getElementById('spin-sound');
    spinSound.play();

    let spinCount = 0;
    const intervalId = setInterval(() => {
        if (spinCount >= 10) {
            clearInterval(intervalId);
            spinButton.disabled = false; // Enable tombol setelah spin selesai
            calculatePrize();
            return;
        }

        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                const cell = document.getElementById(`cell-${r}-${c}`);
                
                // Gambar akan "jatuh" dari atas ke bawah
                cell.style.transform = 'translateY(-100px)';
                cell.style.opacity = '0';
                setTimeout(() => {
                    cell.src = randomImage;
                    cell.style.transform = 'translateY(0)';
                    cell.style.opacity = '1';
                }, 300);
            }
        }
        spinCount++;
    }, 200);
}

// Fungsi untuk menghitung hadiah
function calculatePrize() {
    let prize = 0;
    const checkedRows = []; // Untuk mengecek jika ada 3 ikon berturut-turut yang sama

    for (let r = 1; r <= rows; r++) {
        let rowIcons = [];
        for (let c = 1; c <= cols; c++) {
            rowIcons.push(document.getElementById(`cell-${r}-${c}`).src.split('/').pop());
        }

        // Mengecek apakah ada 3 ikon yang sama berturut-turut
        for (let i = 0; i <= cols - 3; i++) {
            if (rowIcons[i] === rowIcons[i + 1] && rowIcons[i] === rowIcons[i + 2]) {
                prize += iconScores[rowIcons[i]] * 3; // Poin untuk 3 ikon berturut-turut
            }
        }

        // Menambah poin untuk setiap ikon di baris
        for (const icon of rowIcons) {
            prize += iconScores[icon] || 0;
        }
    }

    score += prize;
    document.getElementById('score').innerText = 'Skor: ' + score;

    // Mainkan suara jika ada hadiah
    if (prize > 0) {
        const winSound = document.getElementById('win-sound');
        winSound.play();
    }
}

document.getElementById('spin-button').addEventListener('click', spin);
