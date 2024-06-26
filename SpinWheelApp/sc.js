document.getElementById('add-name-button').addEventListener('click', function() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();

    if (name) {
        const wheel = document.getElementById('wheel');
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.textContent = name;

        const segments = wheel.children.length;
        const angle = 360 / (segments + 1);

        for (let i = 0; i < segments; i++) {
            wheel.children[i].style.transform = `rotate(${angle * i}deg) translate(-100%, -100%)`;
        }

        segment.style.transform = `rotate(${angle * segments}deg) translate(-100%, -100%)`;
        wheel.appendChild(segment);
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

    const randomDegree = Math.floor(Math.random() * 360) + 360 * 3; // Random spin for at least 3 rounds
    const segmentAngle = 360 / segments;

    wheel.style.transition = 'transform 4s ease-out';
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const finalRotation = randomDegree % 360;
        const winnerIndex = Math.floor((360 - finalRotation + segmentAngle / 2) % 360 / segmentAngle) % segments;
        alert(`The winner is: ${wheel.children[winnerIndex].textContent}!`);
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${finalRotation}deg)`;
    }, 4000);
});
