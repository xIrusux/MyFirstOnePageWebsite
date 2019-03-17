const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
let interval;
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

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

// add autoplay - step 1 - without infinite loop

const autoPlay = () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  clearTimeout(interval);
  interval = setTimeout(autoPlay, 3000);
};

autoPlay();

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
