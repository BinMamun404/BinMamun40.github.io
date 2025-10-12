// JavaScript (script.js)

// --- Typed Effect (Hero Section) ---
const typedElement = document.getElementById('typed');
const phrases = ["Web Developer", "Social Media Expert", "UI/UX Designer"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 1500;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // অক্ষর মুছে ফেলা
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // অক্ষর লেখা
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        // লেখা শেষ, এখন মোছা শুরু হবে
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // মোছা শেষ, পরের বাক্যে যাওয়া হবে
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500; // নতুন বাক্য শুরুর আগে একটু বিরতি
    }

    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    // কপিরাইট সাল সেট করা
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // টাইপিং ইফেক্ট শুরু করা
    if (typedElement) {
        typeWriter();
    }
});


// --- Smooth Scrolling ---
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    // মেনু বন্ধ করা
    closePanel();
}


// --- Hamburger Menu Logic ---
const hamb = document.getElementById('hamb');
const panel = document.getElementById('panel');

function togglePanel() {
    const isHidden = panel.getAttribute('aria-hidden') === 'true';
    panel.setAttribute('aria-hidden', !isHidden);
    document.body.classList.toggle('menu-open', !isHidden);
}

function closePanel() {
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
}

if (hamb) {
    hamb.addEventListener('click', togglePanel);
}

// স্ক্রিনের বাইরে ক্লিক করলে মেনু বন্ধ করা (মোবাইলের জন্য)
document.body.addEventListener('click', (e) => {
    if (document.body.classList.contains('menu-open') && !panel.contains(e.target) && !hamb.contains(e.target)) {
        closePanel();
    }
});


// --- Contact Functions (Email/Copy) ---
const EMAIL_ADDRESS = "zenomamun@proton.me";
const STATUS_ELEMENT = document.getElementById('status');

function getMessageContent() {
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    let body = `Hello Bin Mamun,\n\n`;
    body += `${message}\n\n`;
    body += `--- Sent from Portfolio Contact Form ---\n`;
    body += `Name: ${name}\n`;
    
    // ইমেইলের জন্য এনকোড করা হবে
    const encodedBody = encodeURIComponent(body);
    const encodedSubject = encodeURIComponent(subject || "New Project/Inquiry from Portfolio");

    return { body: body, encodedBody: encodedBody, encodedSubject: encodedSubject, name: name };
}

function sendContact() {
    const { encodedBody, encodedSubject } = getMessageContent();
    const mailtoLink = `mailto:${EMAIL_ADDRESS}?subject=${encodedSubject}&body=${encodedBody}`;
    
    window.location.href = mailtoLink;
    
    if (STATUS_ELEMENT) {
        STATUS_ELEMENT.textContent = 'Email client opened!';
        setTimeout(() => STATUS_ELEMENT.textContent = '', 3000);
    }
}

function copyMessage() {
    const { body, name } = getMessageContent();
    
    if (body.trim().length < 5) {
        if (STATUS_ELEMENT) {
            STATUS_ELEMENT.textContent = 'Please write a message first!';
            STATUS_ELEMENT.style.color = 'var(--accent2)';
            setTimeout(() => {STATUS_ELEMENT.textContent = ''; STATUS_ELEMENT.style.color = 'var(--muted)';}, 3000);
        }
        return;
    }

    navigator.clipboard.writeText(body).then(() => {
        if (STATUS_ELEMENT) {
            STATUS_ELEMENT.textContent = 'Message copied! Paste it into Telegram.';
            STATUS_ELEMENT.style.color = 'var(--accent)';
            setTimeout(() => {STATUS_ELEMENT.textContent = ''; STATUS_ELEMENT.style.color = 'var(--muted)';}, 3000);
        }
    }).catch(err => {
        console.error('Could not copy text: ', err);
        if (STATUS_ELEMENT) {
            STATUS_ELEMENT.textContent = 'Failed to copy. Try manual copy.';
        }
    });
}


// --- Utility Functions ---
function openTelegram() {
    window.open('https://t.me/binmamun', '_blank');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(text + ' copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

function downloadCV() {
    alert("CV Download function is not implemented yet. Please use the contact form to request it!");
    // window.open('path/to/your/cv.pdf', '_blank'); // আপনার CV ফাইলের আসল পথ এখানে দিন
}