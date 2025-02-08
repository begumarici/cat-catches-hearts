const cat = document.querySelector('.cat');
const heartSegments = document.querySelectorAll('.heart-segment');
const endMessage = document.getElementById("endMessage");
let catPosition = 50;
let filledHearts = 0;
let isFacingRight = true;
let heartInterval;

function getCatBounds() {
    return cat.getBoundingClientRect();
}

document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" && catPosition > 5) {
        catPosition -= 5;
        if (isFacingRight) {
            cat.style.transform = "translateX(-50%) scaleX(-1)";
            isFacingRight = false;
        }
    } else if (event.key === "ArrowRight" && catPosition < 95) {
        catPosition += 5;
        if (!isFacingRight) {
            cat.style.transform = "translateX(-50%) scaleX(1)";
            isFacingRight = true;
        }
    }
    cat.style.left = catPosition + "%";
});

function createHeart() {
    if (filledHearts >= 9) return;

    const heart = document.createElement("img");
    heart.src = "heart.svg";
    heart.classList.add("heart");
    document.body.appendChild(heart);

    let heartPosition = Math.random() * 90;
    heart.style.left = heartPosition + "%";
    heart.style.top = "-40px";

    let minSpeed = 5;
    let maxSpeed = 10;
    let fallSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

    let fallInterval = setInterval(() => {
        let heartBounds = heart.getBoundingClientRect();
        let catBounds = getCatBounds();

        if (heartBounds.top > window.innerHeight - 50) {
            clearInterval(fallInterval);
            heart.remove();
        }

        if (
            heartBounds.bottom >= catBounds.top &&
            heartBounds.left < catBounds.right &&
            heartBounds.right > catBounds.left
        ) {
            clearInterval(fallInterval);
            heart.classList.add("collected");
            setTimeout(() => heart.remove(), 300);
            fillHeartBar();
        }

        heart.style.top = (heartBounds.top + fallSpeed) + "px";
    }, 50);
}

function fillHeartBar() {
    if (filledHearts < 9) {
        heartSegments[filledHearts].classList.add("filled");
        filledHearts++;
    }

    if (filledHearts === 9) {
        stopHeartRain();
        clearRemainingHearts();
        showEndMessage();
    }
}

function stopHeartRain() {
    clearInterval(heartInterval);
}

function clearRemainingHearts() {
    const remainingHearts = document.querySelectorAll('.heart');
    remainingHearts.forEach(heart => {
        heart.classList.add("clear-out");
        setTimeout(() => heart.remove(), 500);
    });
}

function showEndMessage() {
    endMessage.classList.add("visible");
}

heartInterval = setInterval(createHeart, 2000);
