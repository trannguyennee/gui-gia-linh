document.addEventListener('DOMContentLoaded', () => {
    const heartSeal = document.getElementById('heart-seal');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const instruction = document.getElementById('instruction');
    const sky = document.getElementById('sky');
    const bgMusic = document.getElementById('bg-music');

    let isMusicPlaying = false;

    function playMusic() {
        if (bgMusic && !isMusicPlaying) {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
            }).catch(error => {
                console.log("Trình duyệt chặn autoplay, cần tương tác thêm:", error);
            });
        }
    }

    // Mở thư khi bấm vào trái tim
    heartSeal.addEventListener('click', (e) => {
        envelopeWrapper.classList.add('open');
        if (instruction) {
            instruction.style.opacity = '0';
        }

        // Phát nhạc
        playMusic();
        
        // Ngăn sự kiện lan truyền lên document
        e.stopPropagation();
    });

    // Fallback: kích hoạt nhạc nếu người dùng nhấn vào bất kỳ đâu trên trang
    document.addEventListener('click', playMusic);

    // Tạo hiệu ứng trái tim bay lơ lửng xung quanh thay vì trái tim tĩnh
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');

        // Vị trí ngang ngẫu nhiên
        heart.style.left = Math.random() * 100 + 'vw';

        // Thời gian bay ngẫu nhiên (từ 5s đến 10s để mượt mà)
        const animationDuration = Math.random() * 5 + 5;
        heart.style.animationDuration = animationDuration + 's';

        // Kích thước ngẫu nhiên (từ 10px đến 30px)
        const size = Math.random() * 20 + 10;
        heart.style.setProperty('--size', size + 'px');
        heart.style.setProperty('--half-size', (-size / 2) + 'px');

        sky.appendChild(heart);

        // Xóa trái tim sau khi bay xong để không nặng máy
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }

    // Tạo trái tim mới mỗi 400ms
    setInterval(createFloatingHeart, 400);
});
