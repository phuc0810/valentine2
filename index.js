let noButtonDodgeCount = 0;
const maxDodges = 7;
let fontSizeQ2 = 0;
const imageList = [
    'https://i.pinimg.com/originals/df/a6/57/dfa6575e3907fc7b70d82a6fd841ed00.gif',
    'https://i.pinimg.com/736x/42/81/7d/42817d5cf2e9edd03070e7848027725b.jpg',
    'https://i.pinimg.com/originals/00/95/c0/0095c0b45f4c493887478f566ebe5a91.gif',
    './imgs/valungtung.jpg'
]

function nextQuestion(accepted, questionNumber) {
    if (accepted) {
        document.querySelector(`#q${questionNumber}`).classList.remove('active');
        if (questionNumber < 3) {
            document.querySelector(`#q${questionNumber + 1}`).classList.add('active');
            changeImage(imageList[questionNumber])
        } else {
            document.querySelector('#final').classList.add('active');
            celebrateAcceptance();
            changeImage(imageList[questionNumber])
        }
    }
}

function handleNo() {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.querySelector('#rejected').classList.add('active');
    document.querySelector('.heart').style.display = 'none';
    document.querySelector('.broken-heart').style.display = 'block';
}

function handleNoQuestion1() {
    if (noButtonDodgeCount >= maxDodges) {
        const link = 'https://i.pinimg.com/originals/15/4f/d5/154fd5c7ee43c0d2ece96ec621a5a9b3.gif'
        handleNo();
        changeImage(link);
    }
}

function handleNoQuestion2() {
    handleChangeFontsize(100);
}

function handleNoQuestion3() {
    const link = 'https://i.pinimg.com/originals/2a/e4/03/2ae4033c7319f2ddbe6bb0c118dc93b4.gif'
    handleNo();
    changeImage(link);
}

function dodgeNo() {
    const btn = document.querySelector('.btn.no');

    if (noButtonDodgeCount < 3) {
        btn.disabled = true;
        btn.classList.add('hover-hidden');
    }

    if (noButtonDodgeCount >= 3 && noButtonDodgeCount <= 7) {
        btn.classList.remove('hover-hidden');
        btn.style.transform = `translate(${Math.random() * 500 - 200}px, ${Math.random() * 500 - 200}px)`;
    }

    if (noButtonDodgeCount === maxDodges) {
        const intervalId = setInterval(() => {
            btn.style.transform = `translate(${Math.random() * 600 - 200}px, ${Math.random() * 600 - 200}px)`;
        }, 500);

        setTimeout(() => {
            clearInterval(intervalId);  // Dừng bằng cách truyền vào intervalId
            console.log('Đã dừng!');
        }, 5000);

        btn.disabled = false;
    }

    noButtonDodgeCount++;
}

function hoverOut() {
    if (noButtonDodgeCount <= 3) {
        const btn = document.querySelector('.btn.no');
        const textContentsBtnNo = ['Nhấn yes nha em iu 😽', 'Nhấn yes nè vk iu 🙀', 'Nhấn Yes kìa má 😾 !!!']

        btn.textContent = textContentsBtnNo[noButtonDodgeCount - 1]
    }
}

function resetQuestions() {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.querySelector('#q1').classList.add('active');
    document.querySelector('.heart').style.display = 'block';
    document.querySelector('.broken-heart').style.display = 'none';
    noButtonDodgeCount = 0;
    const noBtn = document.querySelector('.btn.no');
    noBtn.style.transform = 'none';
    changeImage('https://i.pinimg.com/originals/df/a6/57/dfa6575e3907fc7b70d82a6fd841ed00.gif')
    fontSizeQ2 = 0;
    handleChangeFontsize(17)
}

function celebrateAcceptance() {
    const container = document.querySelector('.floating-hearts');
    for (let i = 0; i < 50; i++) {
        createHeart(container);
    }
}

function createHeart(container) {
    const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heart.setAttribute('viewBox', '0 0 100 100');
    heart.style.width = '30px';
    heart.style.height = '30px';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animation = `float ${3 + Math.random() * 3}s linear infinite`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', 'M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 34.2 0L50 20.5l-0.9 0.9c9.5-9.5 24.7-9.5 34.2 0s9.5 24.7 0 34.2L50 88.9z');
    path.style.fill = `hsl(${Math.random() * 60 + 330}, 100%, 65%)`;

    heart.appendChild(path);
    container.appendChild(heart);

    setTimeout(() => {
        container.removeChild(heart);
    }, 6000);
}

function changeImage(link) {
    const element = document.querySelector('.image_gif img');
    console.log(element);

    element.src = link
}

function handleChangeFontsize(number) {
    const btn = document.querySelector('.btn-yes');

    console.log(btn);

    fontSizeQ2 += number
    btn.style.fontSize = `${fontSizeQ2}px`;
}