const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let firstCard, secondCard;

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const pauseButton = document.querySelector(".carousel__button--pause");
const playButton = document.querySelector(".carousel__button--play");
const dotsNav = document.querySelector(".carousel__nav");
let interval;
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// flip cards
function flipCard() {
  // in this context 'this' refers to the element clicked;
  this.classList.toggle("flip");
  // clicked first or second time?
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}
// do cards match?
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards(); // is it a match?
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
  setTimeout(() => {
    //timeout ensures the flipping can be seen otherwise the second card woul never eben show its second face
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
  }, 1500);
}

cards.forEach(card => card.addEventListener("click", flipCard));

// Code below is for image slider
// arrange the slides next to one another

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// function to move the slides

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// function to move the dots

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

// add autoplay with infinite loop

// function reduceCode(name, id, str) {
//   const name = id.querySelector(str);
// }

const autoPlay = () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling || dots[0];
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  clearTimeout(interval);
  interval = setTimeout(autoPlay, 3000);
};

autoPlay();

// pause autoplay & infinite loop when pause button is clicked

pauseButton.addEventListener("click", e => {
  clearTimeout(interval);
});

// restart autoplay & infinite loop when play button is clicked

playButton.addEventListener("click", e => {
  autoPlay();
});

// when left or right arrow key is clicked, move slides and dots

document.onkeydown = function(event) {
  if (event.keyCode === 37) {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  } else if (event.keyCode === 39) {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  }
};

// when I click left, move slides to the left

prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});

// when I click right, move slides to the right

nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});

// when I click the nav indicators, move to that slide

dotsNav.addEventListener("click", e => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});
