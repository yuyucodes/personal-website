const content={
  about:["About","Hi, I'm Esther! I'm a student and developer based in Boston, MA and Charlotte, NC."],
  projects:["Projects","my projects."],
  contact:["Contact", `
    <p class="contact-intro">I'd love to hear from you.</p>
    <p class="contact-copy">Whether you want to collaborate, ask a question, or just say hi, feel free to reach out.</p>
    <ul class="contact-links">
      <li>
        <a href="https://www.linkedin.com/in/estychen/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.7h2.88v8.8H5.5zm4.67 0h2.77v1.2h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.49 1.94 3.49 4.46v6.64h-2.88v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.61-2.38 3.27v6.31H10.17z"/></svg>
        </a>
      </li>
      <li>
        <a href="https://github.com/yuyucodes" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.18a10.8 10.8 0 0 1 5.72 0c2.18-1.49 3.13-1.18 3.13-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.35.78 1.03.78 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
        </a>
      </li>
      <li>
        <a href="mailto:esyuec@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25zm2.1-.75 6.9 5.04 6.9-5.04H5.1zm13.9 2.2-6.13 4.47a1 1 0 0 1-1.14 0L5 8.2v9.05c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75z"/></svg>
        </a>
      </li>
    </ul>
    <form class="contact-form" id="contactForm">
      <div class="field-row">
        <input type="text" name="name" placeholder="Your name" aria-label="Your name">
        <input type="email" name="email" placeholder="Your email" aria-label="Your email">
      </div>
      <input type="text" name="subject" placeholder="Subject (optional)" aria-label="Subject">
      <textarea name="message" rows="5" placeholder="Your message" aria-label="Your message"></textarea>
      <button type="submit" class="submit-btn">Send message</button>
    </form>
  `]
};

const modal=document.getElementById("m");
const title=document.getElementById("mt");
const message=document.getElementById("mp");
const closeButton=document.getElementById("x");

let lastFocusedElement=null;

const reducedMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeDialog(){
  if(reducedMotion()){modal.close();return;}
  modal.classList.add("dialog-closing");
}

modal.addEventListener("animationend",e=>{
  if(e.animationName==="dialog-out"){
    modal.classList.remove("dialog-closing");
    modal.close();
  }
});

modal.addEventListener("cancel",e=>{
  e.preventDefault();
  closeDialog();
});

const openDialog=button=>{const dialogData=content[button.dataset.d];

if(!dialogData)return;

lastFocusedElement=button;
title.textContent=dialogData[0];
message.innerHTML=dialogData[1];
modal.showModal();

const form=document.getElementById("contactForm");
if(form){
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const data=new FormData(form);
    const name=(data.get("name")||"").toString().trim();
    const email=(data.get("email")||"").toString().trim();
    const subject=(data.get("subject")||"Contact from Website").toString().trim();
    const messageText=(data.get("message")||"").toString().trim();

    if(!name || !email || !messageText){
      form.reportValidity?.();
      return;
    }

    const mailtoLink=`mailto:esyuec@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${messageText}`)}`;
    window.location.href=mailtoLink;
    closeDialog();
  });
}}

document.querySelectorAll("[data-d]").forEach(button=>{button.addEventListener("click",()=>openDialog(button))});

closeButton.addEventListener("click",()=>closeDialog());

modal.addEventListener("click",event=>{if(event.target===modal){closeDialog()}});

modal.addEventListener("close",()=>{if(lastFocusedElement){lastFocusedElement.focus()}});
