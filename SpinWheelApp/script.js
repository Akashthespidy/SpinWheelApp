let items = [];
let itemDegs = {};
let currentDeg = 0;
let step;
let colors = [];
let spinTime = 4; 

function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return { r, g, b };
}

function toRad(deg) {
    return deg * (Math.PI / 180.0);
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

function getPercent(input, min, max) {
    return (((input - min) * 100) / (max - min)) / 100;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

function createWheel() {
    step = 360 / items.length;
    colors = [];
    for (let i = 0; i < items.length; i++) {
        colors.push(randomColor());
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
    ctx.fillStyle = `rgb(33,33,33)`;
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    let startDeg = currentDeg;
    for (let i = 0; i < items.length; i++, startDeg += step) {
        const endDeg = startDeg + step;
        const color = colors[i];
        const colorStyle = `rgb(${color.r},${color.g},${color.b})`;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
        const colorStyle2 = `rgb(${color.r - 30},${color.g - 30},${color.b - 30})`;
        ctx.fillStyle = colorStyle2;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg));
        ctx.fillStyle = colorStyle;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad((startDeg + endDeg) / 2));
        ctx.textAlign = "center";
        ctx.fillStyle = color.r > 150 || color.g > 150 || color.b > 150 ? "#000" : "#fff";
        ctx.font = 'bold 24px serif';
        ctx.fillText(items[i], 130, 10);
        ctx.restore();

        itemDegs[items[i] + '-' + i] = {
            "startDeg": startDeg,
            "endDeg": endDeg
        };

        if (startDeg % 360 < 360 && startDeg % 360 > 270 && endDeg % 360 > 0 && endDeg % 360 < 90) {
            document.getElementById("winner").innerHTML = items[i];
        }
    }
}

let speed = 0;
let maxRotation;
let pause = false;

function animate() {
    if (pause) {
        return;
    }
    speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
    if (speed < 0.01) {
        speed = 0;
        pause = true;
    }
    currentDeg += speed;
    draw();
    window.requestAnimationFrame(animate);
}

function spin() {
    if (speed !== 0) {
        return;
    }

    if (items.length < 3) {
        alert("Please add at least three names to spin the wheel.");
        return;
    }

    maxRotation = 0;
    currentDeg = 0;
    createWheel();
    draw();

    const spinDegrees = spinTime * 360;
    maxRotation = spinDegrees + randomRange(0, 360);

    pause = false;
    window.requestAnimationFrame(animate);
}

function addName() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();
    if (name) {
        if (!items.includes(name)) {
            items.push(name);
            updateNameList();
            createWheel();
        } else {
            alert("This name is already added.");
        }
    }
    nameInput.value = '';
}

function removeName(index) {
    items.splice(index, 1);
    updateNameList();
    createWheel();
}

function updateNameList() {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = '';
    items.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = name;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeName(index);
        li.appendChild(removeButton);
        nameList.appendChild(li);
    });
}

function setSpinTime() {
    const spinTimeInput = document.getElementById("spinTimeInput");
    const time = parseInt(spinTimeInput.value);
    if (!isNaN(time) && time > 0) {
        document.getElementById("spinTimeShow").innerHTML = time;
        spinTime = time;
    }
}

createWheel();
