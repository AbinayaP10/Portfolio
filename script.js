// Typed.js effect
var typed = new Typed(".multiple-text", {
  strings: [ "Coding","Web Development","Designing"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// Page navigation logic
const pages = document.querySelectorAll('.page');
const menuLinks = document.querySelectorAll('.side-nav a');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const pageOrder = ["home", "profile", "resume", "project", "contact"];
let currentPageIndex = 0;

const animationMap = {
  home: 'animate-rotateY',
  profile: 'animate-scale3D',
  resume: 'animate-rotateX',
  project: 'animate-flipIn',
  contact: 'animate-rotateY'
};

function showPage(newIndex, direction = "right") {
  pages.forEach((page, i) => {
    page.classList.remove('active', 'exit-left', 'exit-right');
    if (i === currentPageIndex) {
      page.classList.add(direction === "right" ? 'exit-left' : 'exit-right');
    }
  });

  pages[newIndex].classList.add('active');

  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.classList.remove(
      'animate-rotateY', 'animate-rotateX', 'animate-scale3D', 'animate-flipIn'
    );

    void mainContent.offsetWidth; // reflow trick to restart animation

    const pageId = pageOrder[newIndex];
    const animationClass = animationMap[pageId];
    if (animationClass) {
      mainContent.classList.add(animationClass);
    }
  }

  currentPageIndex = newIndex;
}

menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    const targetIndex = pageOrder.indexOf(targetId);
    const direction = targetIndex > currentPageIndex ? "right" : "left";
    showPage(targetIndex, direction);
  });
});

nextBtn.addEventListener('click', () => {
  const newIndex = (currentPageIndex + 1) % pageOrder.length;
  showPage(newIndex, "right");
});

prevBtn.addEventListener('click', () => {
  const newIndex = (currentPageIndex - 1 + pageOrder.length) % pageOrder.length;
  showPage(newIndex, "left");
});

// Contact form submission
var form = document.getElementById('my-form');
var status = document.getElementById('status');

if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your message!";
        form.reset();
      } else {
        status.innerHTML = "Oops! There was a problem.";
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem.";
    });
  });
}
function showTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('.project-tab').forEach(tab => {
    tab.style.display = 'none';
  });
  // Remove active class on all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabId).style.display = 'flex';
  // Add active class to the clicked button
  event.target.classList.add('active');
}
