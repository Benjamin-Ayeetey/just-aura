import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import solar from './icons.js';
import { contact } from './config';

gsap.registerPlugin(ScrollTrigger);
for (const el of document.querySelectorAll('[data-icon]')) {
  const icon=solar.icons[el.dataset.icon];
  if(icon) el.innerHTML=`<svg class="icon" aria-hidden="true" viewBox="0 0 ${icon.width || solar.width || 24} ${icon.height || solar.height || 24}" fill="none" xmlns="http://www.w3.org/2000/svg">${icon.body}</svg>`;
}
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#contact-email').textContent=contact.email;
// Sample contacts remain non-transmitting in preview mode.
if(!contact.demo) document.querySelector('#contact-email').href=`mailto:${contact.email}`;
document.querySelector('#contact-phone').textContent=contact.phone;
const dateInput=document.querySelector('[name=date]');
const today=new Date(); dateInput.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const menuButton=document.querySelector('.menu-button'), mobileNav=document.querySelector('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';mobileNav.hidden=open;menuButton.setAttribute('aria-expanded',String(!open));});
mobileNav.addEventListener('click',e=>{if(e.target.closest('a')) closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
for(const link of document.querySelectorAll('[data-service]')) link.addEventListener('click',()=>{document.querySelector('#service').value=link.dataset.service;});
for(const image of document.querySelectorAll('img')) image.addEventListener('error',()=>{image.style.visibility='hidden';image.parentElement.classList.add('media-missing');});
const lightbox=document.querySelector('#lightbox');
for(const button of document.querySelectorAll('[data-photo]')) button.addEventListener('click',()=>{const original=button.querySelector('img');lightbox.querySelector('img').src=`/images/pic${button.dataset.photo}-1280.webp`;lightbox.querySelector('img').alt=original.alt;lightbox.querySelector('p').textContent=button.parentElement.querySelector('figcaption').innerText;lightbox.showModal();});
for(const dialog of document.querySelectorAll('dialog')){
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close();}});
}
let enquiryURL;
document.querySelector('#booking-form').addEventListener('submit',e=>{
  e.preventDefault();const form=e.currentTarget; if(!form.reportValidity()) return;
  const data=new FormData(form);
  const content=`JUST AURA — BOOKING ENQUIRY\n\nName: ${String(data.get('name')).trim()}\nEmail: ${data.get('email')}\nExperience: ${data.get('service')}\nDate: ${data.get('date')}\n\nMy vision:\n${String(data.get('vision')).trim() || 'To discuss during consultation.'}\n\nThis is an enquiry, not a confirmed booking. Availability, fees and deposits are confirmed personally with Just Aura.`;
  document.querySelector('#enquiry-preview').textContent=content;
  if(enquiryURL) URL.revokeObjectURL(enquiryURL);
  enquiryURL=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));
  document.querySelector('#download-enquiry').href=enquiryURL;
  document.querySelector('#form-status').textContent='Your enquiry is ready to save. Nothing has been sent.';
  document.querySelector('#enquiry-dialog').showModal();
});
const matchMedia=gsap.matchMedia();let lenis;
matchMedia.add('(prefers-reduced-motion: no-preference)',()=>{
  lenis=new Lenis({duration:1.05,smoothWheel:true,anchors:true});
  lenis.on('scroll',ScrollTrigger.update);
  const tick=time=>lenis.raf(time*1000); gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
  const intro=gsap.timeline({defaults:{duration:1.1,ease:'power3.out'}});
  intro.from('h1',{y:35,opacity:0}).from('.hero-intro',{y:20,opacity:0,stagger:.12},.2).from('.hero-photo img',{scale:1.055,duration:1.7},0);
  for(const heading of document.querySelectorAll('[data-reveal]')){
    // Retain one unsplit accessible heading name; visual words are decorative.
    const accessibleCopy=heading.cloneNode(true);accessibleCopy.querySelectorAll('br').forEach(br=>br.replaceWith(' '));const label=accessibleCopy.textContent.replace(/\s+/g,' ').trim();heading.setAttribute('aria-label',label);
    const split=node=>{for(const child of [...node.childNodes]){if(child.nodeType===3){const fragment=document.createDocumentFragment();for(const token of child.textContent.split(/(\s+)/)){if(!token)continue;if(/\s/.test(token))fragment.append(document.createTextNode(token));else{const span=document.createElement('span');span.className='word';span.setAttribute('aria-hidden','true');span.textContent=token;fragment.append(span);}}child.replaceWith(fragment);}else if(child.nodeType===1)split(child);}};
    split(heading);
    gsap.from(heading.querySelectorAll('.word'),{y:28,opacity:0,duration:.75,stagger:.055,ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 90%',once:true}});
  }
  gsap.from('.about-main',{y:35,duration:1,ease:'power2.out',scrollTrigger:{trigger:'.about',start:'top 85%',once:true}});
  gsap.to('.about-small',{y:-28,ease:'none',scrollTrigger:{trigger:'.about',start:'top bottom',end:'bottom top',scrub:1}});
  const desktop=gsap.matchMedia();desktop.add('(min-width: 701px)',()=>{
    const track=document.querySelector('.gallery-track');document.querySelector('.lookbook').classList.add('motion-gallery');
    const distance=()=>Math.max(0,track.scrollWidth-document.querySelector('.lookbook').clientWidth+window.innerWidth*.1);
    if(distance()===0) return()=>document.querySelector('.lookbook').classList.remove('motion-gallery');
    const galleryTween=gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:'.lookbook',start:'top top',end:()=>`+=${distance()}`,pin:true,scrub:1,invalidateOnRefresh:true}});
    const focusGallery=e=>{const button=e.target.closest('[data-photo]');if(!button)return;const r=button.getBoundingClientRect();if(r.left<0||r.right>window.innerWidth){const offset=Math.min(distance(),Math.max(0,button.parentElement.offsetLeft-track.offsetLeft));lenis.scrollTo(galleryTween.scrollTrigger.start+offset,{immediate:true});}};
    track.addEventListener('focusin',focusGallery);
    return()=>{track.removeEventListener('focusin',focusGallery);document.querySelector('.lookbook').classList.remove('motion-gallery');};
  });
  const observer=new MutationObserver(()=>{const modalOpen=!!document.querySelector('dialog[open]');modalOpen?lenis.stop():lenis.start();});
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
  return()=>{observer.disconnect();desktop.revert();gsap.ticker.remove(tick);lenis.destroy();lenis=undefined;};
});
const refresh=()=>ScrollTrigger.refresh();document.fonts.ready.then(refresh);
for(const img of document.images) if(!img.complete) img.addEventListener('load',refresh,{once:true});
for(const details of document.querySelectorAll('details'))details.addEventListener('toggle',refresh);
window.addEventListener('pagehide',()=>{matchMedia.revert();ScrollTrigger.getAll().forEach(t=>t.kill());if(enquiryURL) URL.revokeObjectURL(enquiryURL);});

