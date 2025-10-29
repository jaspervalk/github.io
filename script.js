const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', function() {
    let theme = htmlElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

const links = document.querySelectorAll('a, button, .work-item, .education-item, .project-item, .sidebar-toggle, .sidebar-link');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        header.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
    
    lastScrollTop = scrollTop;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const tagline = document.querySelector('.tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    setTimeout(typeWriter, 500);
}


const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
});

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
let sidebarHoverTimeout;

function showSidebar() {
    clearTimeout(sidebarHoverTimeout);
    sidebar.classList.add('sidebar-hover');
}

function hideSidebar() {
    sidebarHoverTimeout = setTimeout(() => {
        sidebar.classList.remove('sidebar-hover');
    }, 300);
}

sidebar.addEventListener('mouseenter', showSidebar);
sidebar.addEventListener('mouseleave', hideSidebar);

sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    sidebar.classList.remove('sidebar-hover');
});

document.addEventListener('click', function(e) {
    if (!sidebar.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            sidebar.classList.remove('active');
        }
    });
});

console.log('Portfolio loaded');