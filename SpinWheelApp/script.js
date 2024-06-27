document.getElementById('add-name-button').addEventListener('click', function() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();

    if (name) {
        addNameToWheel(name);
        addNameToList(name);
        nameInput.value = '';
    }
});

document.getElementById('spin-button').addEventListener('click', function() {
    const wheel = document.getElementById('wheel');
    const segments = wheel.children.length;

    if (segments === 0) {
        alert('Please add names to the wheel before spinning.');
        return;
    }

    const spinTimeInput = document.getElementById('spin-time-input');
    let spinTime = parseInt(spinTimeInput.value, 10) || 4; // Default spin time is 4 seconds

    if (spinTime < 1 || spinTime > 10) {
        alert('Spin time should be between 1 and 10 seconds.');
        return;
    }

    const randomDegree = Math.floor(Math.random() * 360) + 360 * 3; // Random spin for at least 3 rounds
    const segmentAngle = 360 / segments;

    wheel.style.transition = `transform ${spinTime}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const finalRotation = randomDegree % 360;
        const normalizedAngle = (360 - finalRotation + segmentAngle / 2) % 360;
        const winnerIndex = Math.floor(normalizedAngle / segmentAngle) % segments;

        alert(`The winner is: ${wheel.children[winnerIndex].textContent}!`);
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${finalRotation}deg)`;
    }, spinTime * 1000);
});

function addNameToWheel(name) {
    const wheel = document.getElementById('wheel');
    const segment = document.createElement('div');
    segment.className = 'segment';
    segment.textContent = name;

    // Generate a random color for the segment
    const color = getRandomColor();
    segment.style.backgroundColor = color;

    const segments = wheel.children.length;
    const angle = 360 / (segments+1);

    for (let i = 0; i < segments; i++) {
        wheel.children[i].style.transform = `rotate(${angle * i}deg) translate(-100%, -100%)`;
    }

    segment.style.transform = `rotate(${angle * segments}deg) translate(-100%, -100%)`;
    wheel.appendChild(segment);
}

function addNameToList(name) {
    const nameList = document.getElementById('name-list');
    const listItem = document.createElement('li');
    listItem.textContent = name;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        removeNameFromWheel(name);
        nameList.removeChild(listItem);
    });

    listItem.appendChild(removeButton);
    nameList.appendChild(listItem);
}

function removeNameFromWheel(name) {
    const wheel = document.getElementById('wheel');
    const segments = Array.from(wheel.children);

    const index = segments.findIndex(segment => segment.textContent === name);
    if (index !== -1) {
        wheel.removeChild(segments[index]);
        const remainingSegments = wheel.children.length;
        const angle = 360 / remainingSegments;

        for (let i = 0; i < remainingSegments; i++) {
            wheel.children[i].style.transform = `rotate(${angle * i}deg) translate(-100%, -100%)`;
        }
    }
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
