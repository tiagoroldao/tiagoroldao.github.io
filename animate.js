const lettersPerFrame = 0.4;
const frameDuration = 1000/30;
const letterIter = 20;
const letterShow = 10;


function animate() {
    if (window.localStorage && !window.localStorage.getItem('animated')){
        document.body.style.opacity = 1;
        window.localStorage.setItem('animated', '1');
        animateElement(document.body);
    } else {
        document.body.style.opacity = 1;
    }
}


function animateElement(el) {
    const nodes = el.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].hasChildNodes()) {
            animateElement(nodes[i]);
        } else if (nodes[i].textContent.trim().length > 0) {
            animateNode(nodes[i]);
        }
    }
}

function animateNode(node) {
    let content = node.textContent.split('').map((char, index) => ({
        char, 
        index,
        iter: letterIter
    })).filter(el => el.char !== ' ');

    const loopsPerFrame = Math.max(1, Math.round(content.length * lettersPerFrame));
    console.log(loopsPerFrame);

    node.textContent = node.textContent.replace(/[^ ]/gm, '\u2002').replace(/ /gm, '\u00A0');

    let loop = () => {
        for (let i = 0; i < loopsPerFrame; i++) {
            if (content.length === 0) { return; } 
            const index = Math.floor(Math.random() * content.length);
            const charObject = content[index];
            charObject.iter -= 1;
            if (charObject.iter <= 0 || node.textContent[charObject.index] == charObject.char || node.textContent[charObject.index] == '\u00A0') {
                node.textContent = setChar(node.textContent, charObject.index, charObject.char);
                content.splice(index, 1);
            } else if (charObject.iter <= letterShow) {
                node.textContent = setChar(node.textContent, charObject.index, randomChar());
            }
        }

        setTimeout(loop, frameDuration);
    }
    
    setTimeout(loop, frameDuration);
}

function randomizeChar(charList) {
    if (charList.length === 0) { return false; }

    return charList.length > 0;
}

function setChar (string, index, char) {
    return string.substr(0, index) + char + string.substr(index + 1)
}

function randomChar() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@%$?/*&^(){}[]|\\"\':;.,<>`~±§';
    return characters.charAt(Math.floor(Math.random() * characters.length));
 }


try {
    animate();
    document.getElementById('rerun-animation').onclick = () => animateElement(document.body);
} catch(e) {
    console.log(e);
    document.body.style.opacity = 1;
}