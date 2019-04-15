const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
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
  // do not allow further card flipping while the first 2 cards unflip
  if (lockBoard) return;
  // do not allow double click on same card
  if (this === firstCard) return;
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

  resetBoard();
  itsAWin(); // is it a win?
  fadeOut();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    //timeout ensures the flipping can be seen otherwise the second card woul never eben show its second face
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; //destructuring assignment ES6
  [firstCard, secondCard] = [null, null];
}

// shuffle cards on pageload
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); // wrap in brackets to create imediately evoked funtion + () --> therefore function will be executed right after it's definition

// you have won!
function itsAWin() {
  if (
    document.querySelectorAll(
      "#memory-game-body-id > section > .memory-card.flip"
    ).length === 12
  ) {
    openWinnerPopUp();
  }
}

function openWinnerPopUp() {
  document.querySelector(".winner-pop-up").style.display = "block";
}

function closeWinnerPopUp() {
  document.querySelector(".winner-pop-up").style.display = "none";
}

cards.forEach(card => card.addEventListener("click", flipCard));

// fade all other cards out on match

// function fadeOut() {
//   document.querySelectorAll(".memory-card").forEach(() => {
//     style.display = "none";
//   });
// }

// alert("hi");
// function fadeOut() {
//   alert("one"); //get till here
//   if (cards.style.opacity === "") {
//     alert("hello");
//     cards.style.opacity = 1;
//   } else if (cards.style.opacity === "1") {
//     alert("hi");
//     cards.style.opacity = 0;
//   }
// }

// function fadeOut() {
//   cards.forEach(card => {
//     card.addEventListener("click", () => {
//       if (card.style.opacity === "") {
//         card.style.opacity = 0;
//         console.log("forEach worked");
//         console.log(card.style.opacity);
//       }
//     });
//   });
// }

function fadeOut() {
  cards.forEach(card => {
    if (card.style.opacity === "" && card.className !== "memory-card flip") {
      card.style.opacity = 0;
    }
  });
}

// Code below is for sticky nav bar post scrolling

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  myFunction();
};

// Get the header
var navbar = document.getElementById("navbar-id");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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
