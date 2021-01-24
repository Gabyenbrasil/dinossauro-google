const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isjumping = false;
let position = 0;
let isGameOver = false;

function handleKeyUp(event){
    if (event.keyCode === 32){
        if (!isjumping){
            jump();
        }
    }
}

function jump(){
    isjumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150){
            clearInterval(upInterval);

        //agora desce
            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isjumping = false;
                }else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{
            //agora sobe
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = window.screen.width;
    let randomTime = Math.random() * 3000;
    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //perdeu
            clearInterval(leftInterval);
            isGameOver = true;
            setTimeout(()=> {
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
            }, 100);
        }else {
            cactusPosition -= 12;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);