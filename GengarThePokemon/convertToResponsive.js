const fs = require("fs");
const path = require("path");

const curFile = path.join(__dirname, "css", "styles.css");

fs.readFile(curFile, handleMe);

function handleMe(err, data) {
    const processMe = data.toString();
    const newString = processMe.replace(/-?\d+\.?\d*px/g, function(substringToReplace) {
        console.log(substringToReplace);
        const pixelValue = parseFloat(substringToReplace);
        return `calc(var(--unitSize) * ${pixelValue / 10})`;
    });
    fs.writeFile(path.join(__dirname, "css", "newStyles.css"), newString, () => {
    });
}

c