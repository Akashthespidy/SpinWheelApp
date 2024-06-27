const wheel = document.querySelector('.wheel');
const slices = document.querySelectorAll('.slice');
const spinButton = document.querySelector('.spin-button');
const winnerText = document.querySelector('.winner-text');

let isSpinning = false;
let degrees = 0;

spinButton.addEventListener('click', () => {
  if (!isSpinning) {
    isSpinning = true;
    degrees = Math.floor(Math.random() * 3600); // Spin for a random number of degrees (up to 3600)
    wheel.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
      isSpinning = false;
      const randomDegrees = degrees % 360; // Get the remainder after dividing by 360 to determine the landing slice
      const winningSlice = Math.floor(randomDegrees / 60); // Each slice covers 60 degrees (360 / 6 slices)
      winnerText.textContent = slices[winningSlice].textContent + ' is Winner
