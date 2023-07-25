import fs from 'fs';
import path from 'path';

const curFile = path.join("./style.scss");

fs.readFile(curFile, handleMe);

function handleMe(_err: Error | null, data: Buffer | string) {
    const processMe = data.toString();
    const newString = processMe.replace(/-?\d+\.?\d*px/g, function(substringToReplace: string) {
        console.log(substringToReplace);
        const pixelValue = parseFloat(substringToReplace);
        return `calc(var(--unitSize) * ${pixelValue / 10})`;
    });
    fs.writeFile(path.join("./responsiveStyles.scss"), newString, () => {
    });
}
