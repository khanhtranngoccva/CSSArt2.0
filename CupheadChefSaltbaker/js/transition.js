function delay(seconds) {
    return new Promise((r) => {
        setTimeout(r, seconds * 1000);
    })
}



void function() {
    async function evilFlash(e) {
        chefSaltbaker.removeEventListener("click", evilFlash);
        document.body.classList.add("lightning1");
        await delay(0.1);
        document.body.classList.remove("lightning1");
        document.body.classList.add("evil");
        setTimeout(evilFlash, 900);
    }

    const chefSaltbaker = document.querySelector(".chefSaltbaker");
    chefSaltbaker.addEventListener("click", evilFlash);
}();
