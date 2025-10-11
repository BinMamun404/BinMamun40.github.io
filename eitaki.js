// Basic dynamic interactions for Bin Mamun portfolio

// set year
document.getElementById('year').textContent = new Date().getFullYear();

// typing effect
const typedEl = document.getElementById('typed');
const phrases = ['Web Developer & Social Media Expert','Digital Creator • Brand Builder','Fast • Clean • Reliable'];
let pi = 0, forward = true;
function typeTick(){
  const txt = phrases[pi];
  const len = typedEl.textContent.length;
  if(forward){
    typedEl.textContent = txt.slice(0, len+1);
    if(typedEl.textContent === txt) { forward=false; setTimeout(typeTick,900); return; }
  } else {
    typedEl.textContent = txt.slice(0, len-1);
    if(typedEl.textContent === '') { forward=true; pi=(pi+1)%phrases.length; }
  }
  setTimeout(typeTick, forward?80:30);
}
typeTick();

// hamburger open
const hamb = document.getElementById('hamb');
const panel = document.getElementById('panel');
let open=false;
hamb.addEventListener('click', ()=> {
  open = !open;
  panel.classList.toggle('open', open);
  const lines = hamb.querySelectorAll('div');
  if(open){
    lines[0].style.transform = 'translateY(7px) rotate(45deg)';
    lines[1].style.opacity = '0';
    lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    lines[0].style.transform = '';
    lines[1].style.opacity = '';
    lines[2].style.transform = '';
  }
});

function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  if(open){ open=false; panel.classList.remove('open'); hamb.click(); }
}

// open telegram
function openTelegram(){
  window.open('https://t.me/binmamun', '_blank');
}

// copy helper
function copyToClipboard(text){
  navigator.clipboard?.writeText(text).then(()=> {
    alert('কপি হয়েছে: ' + text);
  }).catch(()=> {
    prompt('Copy this:', text);
  });
}

// download CV (simple text)
function downloadCV(){
  const name='Bin Mamun';
  const cvText = `${name}\nWeb Developer & Social Media Expert\n\nEmail: zenomamun@proton.me\n\nAbout:\nআমি ওয়েব ডেভেলপার এবং সোশ্যাল মিডিয়া এক্সপার্ট। Web Deployment, SEO, এবং Social Strategy-এ অভিজ্ঞ।\n\nSkills:\n- Web Deployment\n- Responsive Design\n- Social Media Strategy\n- SEO\n\nContact: zenomamun@proton.me\n`;
  const blob = new Blob([cvText], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'Bin_Mamun_CV.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

// contact form (mailto)
function sendContact(){
  const name = document.getElementById('name').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'New contact from portfolio';
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('status');
  if(!name || !message){ status.textContent = 'দয়া করে নাম ও বার্তা পূরণ করো।'; return; }
  const body = `Name: ${name}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: Portfolio Site`;
  const mailto = `mailto:zenomamun@proton.me?subject=${encodeURIComponent(subject)}&body=${body}`;
  window.location.href = mailto;
  status.textContent = 'ইমেইল ক্লায়েন্ট ওপেন হয়েছে — পাঠিয়ে নিশ্চিত করো।';
}

function copyMessage(){
  const name = document.getElementById('name').value.trim() || '—';
  const subject = document.getElementById('subject').value.trim() || '—';
  const message = document.getElementById('message').value.trim() || '—';
  const full = `Name: ${name}\nSubject: ${subject}\n\n${message}`;
  copyToClipboard(full);
  document.getElementById('status').textContent = 'Message copied — এখন Telegram বা অন্যত্র পেস্ট করো।';
}

// friendly fallback for old browsers
(function(){ if(!navigator.clipboard){ document.querySelectorAll('.copy').forEach(b=> b.style.display='none'); } })();