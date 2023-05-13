const SIZE_OFFSET = 1.5;

function resize(e) {
    const minSize = Math.min(window.innerHeight, window.innerWidth);
    document.querySelector(".canvas").style
        .setProperty("--unitSize", SIZE_OFFSET / 100 * minSize + "px");
}

resize();

window.addEventListener("resize", resize)