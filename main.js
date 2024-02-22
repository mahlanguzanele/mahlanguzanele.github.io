let isTyping = false;
let i = 0;
let speed = 50;

console.log("Please note I'm using a free openAI api for Zanele AI. Because of that there are some limitations and some errors are expected:\n1. Limited to 3 requests/messages per minute\n\nI'm also hosting this on a free azure subscription so there are some limitations on the hosting server too.\n\nPlease refresh if you run into any errors");

function typeWriter(cursorID, className, txt) {
  if (isTyping) {
    speed -= 10;
    return;
  }
  if (!document.getElementById(cursorID).classList.contains("off")) {
    document.getElementById(cursorID).classList.toggle("off");
  }
  isTyping = true;
  let lines = txt.split('\n');
  let j = 0;

  // If it's the first line, clear the existing content
  if (i === 0) {
    document.getElementsByClassName(className).item(0).innerHTML = "<div></div>";
  }

  var withoutCursor = document.getElementsByClassName(className).item(0).innerHTML;

  function typeCharacter() {
    let line = lines[i];
    if (j < line.length) {
      if (line[j] == "<") {
        withoutCursor += line;
        j = line.length - 1;
      } else {
        withoutCursor += line[j];
      }
      document.getElementsByClassName(className).item(0).innerHTML = withoutCursor;
      document.getElementsByClassName(className).item(0).innerHTML += "<span class='cursor' id='typing-cursor'>|</span>";
      j++;
      setTimeout(typeCharacter, speed);
    } else {
      i++;
      j = 0;
      // Move to the next line after typing the entire line
      if (i < lines.length) {
        withoutCursor += '<br>';
        document.getElementsByClassName(className).item(0).innerHTML = withoutCursor;
        setTimeout(typeCharacter, speed);
      } else {
        isTyping = false; // Reset the flag when animation is complete
        i = 0;
        speed = 50;
        return;
      }
    }
  }
  typeCharacter();
}

let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
  // Hide the loading screen and show the main content after the video duration
  const loadingScreen = document.querySelector('.loading-screen');
  const mainContent = document.querySelector('.main-content');
  const loadingVideo = document.getElementById('loading-video');
  let headerHeight = document.querySelector('.my-title').offsetHeight;
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const skipIntro = document.querySelector(".skip-intro");
  showSlides(slideIndex);
  skipIntro.style.opacity = 1;
  skipIntro.addEventListener('click', function () {
    loadingScreen.style.opacity = 0;
    // Listen for the 'transitionend' event to hide the loading screen after the fade-out transition
    loadingScreen.addEventListener('transitionend', function () {
      loadingScreen.style.display = 'none';
    });

    // Set opacity to 1 for fade-in effect
    mainContent.style.opacity = 1;
  });

  menuToggle.addEventListener('click', function () {
    let headerHeight = document.querySelector('.my-title').offsetHeight;
    menu.style.top = headerHeight + 'px';
    menu.classList.toggle('show');
  });
  // Set padding for the content based on the header height
  document.querySelector('.border').style.paddingTop = headerHeight + 3 + 'px';
  loadingVideo.addEventListener('ended', function () {
    loadingScreen.style.opacity = 0;
    // Listen for the 'transitionend' event to hide the loading screen after the fade-out transition
    loadingScreen.addEventListener('transitionend', function () {
      loadingScreen.style.display = 'none';
    });

    // Set opacity to 1 for fade-in effect
    mainContent.style.opacity = 1;
  });

  const card = document.querySelector(".card__inner");
  const card2 = document.querySelector(".card2").querySelector(".card__inner");
  const card3 = document.querySelector(".card3").querySelector(".card__inner");

  card3.addEventListener("click", function (e) {
    card3.classList.toggle('is-flipped');
  });
  card2.addEventListener("click", function (e) {
    card2.classList.toggle('is-flipped');
  });
  card.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
  });

});

