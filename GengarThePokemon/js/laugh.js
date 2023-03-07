let laughOn = false;

const sprite = document.querySelector(".gengar");

function laugh() {
    laughOn = !laughOn;
    if (laughOn) {
        sprite.classList.add("laughOn");
    } else {
        sprite.classList.remove("laughOn");
    }
    setTimeout(laugh, 100);
}

laugh();