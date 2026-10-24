const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
document.getElementById('year').textContent = new Date().getFullYear();

const allCertificates = [
 {title:'Policy Frameworks for Sustainable Startup Growth',file:'dict-policy-frameworks-sustainable-startup-growth.jpg',pdf:'dict-policy-frameworks-sustainable-startup-growth.pdf',issuer:'DICT',category:'online',description:'DICT training certificate for Policy Frameworks for Sustainable Startup Growth, held on September 16, 2026.'},
 {title:'Game Development',file:'dict-game-development.jpg',pdf:'dict-game-development.pdf',issuer:'DICT',category:'online',description:'DICT certificate related to the Game Development session. Open the original PDF to view the full certificate details.'},
 {title:'Develop Branching and Looping Structures in C#',file:'microsoft-csharp-branching-looping.jpg',pdf:'microsoft-csharp-branching-looping.pdf',issuer:'Microsoft Learn',category:'online',description:'Microsoft Learn achievement completed on October 20, 2026.'},
 {title:'Write Your First C# Code',file:'microsoft-first-csharp-code.jpg',pdf:'microsoft-first-csharp-code.pdf',issuer:'Microsoft Learn',category:'online',description:'Microsoft Learn achievement completed on October 20, 2026.'},
 {title:'Data Analytics Essentials',file:'cisco-data-analytics-essentials.jpg',pdf:'cisco-data-analytics-essentials.pdf',issuer:'Cisco Networking Academy',category:'online',description:'Cisco Networking Academy course completed on September 27, 2026.'},
 {title:'Python Essentials 1',file:'cisco-python-essentials-1.jpg',pdf:'cisco-python-essentials-1.pdf',issuer:'Cisco Networking Academy',category:'online',description:'Cisco Networking Academy course completed on September 28, 2026.'},
 {title:'Startup Webinar',file:'dict-startup-webinar.jpg',pdf:'dict-startup-webinar.pdf',issuer:'DICT',category:'online',description:'DICT webinar certificate. Open the original PDF to view its complete event details.'},
 {title:'Setting Up Computer Networks',file:'tesda-setting-up-computer-networks.jpg',pdf:'tesda-setting-up-computer-networks.pdf',issuer:'TESDA Online Training',category:'online',description:'TESDA online training certificate dated September 26, 2026.'},
 {title:'Introduction to Computer Systems Servicing',file:'tesda-introduction-to-computer-systems-servicing.jpg',pdf:'tesda-introduction-to-computer-systems-servicing.pdf',issuer:'TESDA Online Training',category:'online',description:'TESDA online training certificate dated September 10, 2026.'},
 {title:'Maintaining Computer Systems and Networks',file:'tesda-maintaining-computer-systems-networks.jpg',pdf:'tesda-maintaining-computer-systems-networks.pdf',issuer:'TESDA Online Training',category:'online',description:'TESDA online training certificate dated September 26, 2026.'},
 {title:'Setting Up Computer Servers',file:'tesda-setting-up-computer-servers.jpg',pdf:'tesda-setting-up-computer-servers.pdf',issuer:'TESDA Online Training',category:'online',description:'TESDA online training certificate dated September 26, 2026.'},
 {title:'Installing and Configuring Computer Systems',file:'tesda-installing-configuring-computer-systems.jpg',pdf:'tesda-installing-configuring-computer-systems.pdf',issuer:'TESDA Online Training',category:'online',description:'TESDA online training certificate dated August 26, 2026.'},
 {title:'Video Editing Tips & Tricks',file:'video-editing-tips-tricks.jpg',issuer:'Northeastern College · 10th IT Week 2026',category:'seminars',description:'Certificate of participation issued during the 10th IT Week 2026.'},
 {title:'Agentic AI',file:'agentic-ai.jpg',issuer:'Northeastern College · 10th IT Week 2026',category:'seminars',description:'Certificate of participation issued during the 10th IT Week 2026.'},
 {title:'Integrating IoT in Capstone Project',file:'integrating-iot-capstone.jpg',issuer:'Northeastern College · 10th IT Week 2026',category:'seminars',description:'Certificate of participation issued during the 10th IT Week 2026.'},
 {title:'Programming Fundamentals',file:'programming-fundamentals.jpg',issuer:'Northeastern College · 10th IT Week 2026',category:'seminars',description:'Certificate of participation issued during the 10th IT Week 2026.'}
];
let activeCategory='online', activeCertificate=0;
const asset = file => `assets/certificates/${file}`;
const pdfAsset = file => `assets/certificate-pdfs/${file}`;
const activeImage=document.getElementById('activeCertificateImage');
const activeLink=document.getElementById('activeCertificateLink');
const activeView=document.getElementById('activeCertificateView');
const slideTitle=document.querySelector('.slide-title');
const slideCounter=document.getElementById('slideCounter');
const dotsContainer=document.getElementById('certificateDots');
const leftPreview=document.querySelector('.side-left img');
const rightPreview=document.querySelector('.side-right img');
const leftCard=document.querySelector('.side-left');
const rightCard=document.querySelector('.side-right');
const visibleCertificates=()=>allCertificates.filter(c=>c.category===activeCategory);
function renderCertificate(index,direction='next'){
 const list=visibleCertificates(); if(!list.length)return;
 const cards=[document.querySelector('.active-slide'),leftCard,rightCard].filter(Boolean);
 cards.forEach(el=>el.classList.remove('swing-next','swing-prev')); void (document.querySelector('.active-slide')?.offsetWidth);
 activeCertificate=(index+list.length)%list.length; const item=list[activeCertificate]; const path=asset(item.file);
 activeImage.src=path; activeImage.alt=`Certificate preview: ${item.title}`;
 activeLink.href=item.pdf?pdfAsset(item.pdf):path; activeLink.setAttribute('aria-label',`Open original certificate: ${item.title}`);
 activeView.href=item.pdf?pdfAsset(item.pdf):path; activeView.textContent=item.pdf?'View original PDF ↗':'View full certificate ↗';
 slideTitle.textContent=item.title; document.querySelector('.slide-description').textContent=`${item.issuer} — ${item.description}`;
 slideCounter.textContent=`${String(activeCertificate+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}`;
 leftPreview.src=asset(list[(activeCertificate-1+list.length)%list.length].file); rightPreview.src=asset(list[(activeCertificate+1)%list.length].file);
 leftPreview.alt=`Previous: ${list[(activeCertificate-1+list.length)%list.length].title}`; rightPreview.alt=`Next: ${list[(activeCertificate+1)%list.length].title}`;
 cards.forEach(el=>el.classList.add(direction==='prev'?'swing-prev':'swing-next'));
 [...dotsContainer.querySelectorAll('.carousel-dot')].forEach((dot,i)=>{dot.classList.toggle('selected',i===activeCertificate);dot.setAttribute('aria-pressed',String(i===activeCertificate));});
}
function buildDots(){const list=visibleCertificates();dotsContainer.innerHTML='';list.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='carousel-dot';b.setAttribute('aria-label',`View ${item.title}`);b.addEventListener('click',()=>renderCertificate(i,i<activeCertificate?'prev':'next'));dotsContainer.appendChild(b);});}
function selectCertificateCategory(key,scroll=true){if(!['online','seminars'].includes(key))return;activeCategory=key;activeCertificate=0;
 document.querySelectorAll('.certificate-category[data-category]').forEach(btn=>{const on=btn.dataset.category===key;btn.classList.toggle('active',on);btn.setAttribute('aria-pressed',String(on));});
 const online=key==='online';const title=online?'Online Training & Webinars':'Seminars';const count=visibleCertificates().length;
 document.querySelector('.showcase-heading h3').textContent=title;document.querySelector('.records-pill').textContent=`${count} certificates`;
 document.querySelector('.showcase-icon').textContent=online?'▤':'✦';document.getElementById('certificateCategoryNote').textContent=online?'Online training and webinar certificates from DICT, Microsoft Learn, and Cisco Networking Academy.':'Seminar participation certificates, including Northeastern College 10th IT Week 2026.';
 document.querySelector('.section#development .section-intro').textContent=online?'Browse your online training and webinar certificates. Select the center certificate or open its original PDF for a clearer view.':'Browse your seminar certificates separately. Use the arrows, side previews, or dots to switch certificates.';
 document.querySelector('.certificate-showcase').setAttribute('aria-label',title+' certificates');buildDots();renderCertificate(0);if(scroll)document.getElementById('certificateCarousel').scrollIntoView({behavior:'smooth',block:'center'});
}
document.querySelector('.carousel-prev').addEventListener('click',()=>renderCertificate(activeCertificate-1,'prev'));
document.querySelector('.carousel-next').addEventListener('click',()=>renderCertificate(activeCertificate+1,'next'));
document.querySelectorAll('.certificate-category[data-category]').forEach(btn=>btn.addEventListener('click',()=>selectCertificateCategory(btn.dataset.category)));
function sideControl(el,delta,label){el.removeAttribute('aria-hidden');el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label',label);el.addEventListener('click',()=>renderCertificate(activeCertificate+delta,delta<0?'prev':'next'));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();renderCertificate(activeCertificate+delta,delta<0?'prev':'next');}});}
sideControl(leftCard,-1,'View previous certificate');sideControl(rightCard,1,'View next certificate');
document.addEventListener('keydown',e=>{if(e.altKey&&e.key==='ArrowLeft')renderCertificate(activeCertificate-1,'prev');if(e.altKey&&e.key==='ArrowRight')renderCertificate(activeCertificate+1,'next');});
selectCertificateCategory('online',false);
