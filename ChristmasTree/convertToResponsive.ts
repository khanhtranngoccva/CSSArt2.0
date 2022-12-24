import fs from "fs";
import path from "path";

const curFile = path.join(".", "src", "tree.module.css");

fs.readFile(curFile, handleMe);

function handleMe(err, data) {
    const processMe = data.toString();
    const newString = processMe.replace(/-?\d+\.?\d*px/g, function(substringToReplace) {
        console.log(substringToReplace);
        const pixelValue = parseFloat(substringToReplace);
        return `calc(var(--unitSize) * ${pixelValue / 10})`;
    });
    fs.writeFile(path.join(".", "src", "tree2.module.css"), newString, () => {
    });
}
