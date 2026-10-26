const content={
  about:["About","Hi, I'm Esther! I'm a student and developer based in Boston, MA and Charlotte, NC."],
  projects:["Projects","my projects."],
  contact:["Contact", `
    <p class="contact-intro">I'd love to hear from you.</p>
    <p class="contact-copy">Whether you want to collaborate, ask a question, or just say hi, feel free to reach out.</p>
    <ul class="contact-links">
      <li><a href="https://www.linkedin.com/in/estychen/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      <li><a href="https://github.com/yuyucodes" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      <li><a href="mailto:esyuec@gmail.com" target="_blank" rel="noopener noreferrer">Email</a></li>
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
    modal.close();
  });
}}

document.querySelectorAll("[data-d]").forEach(button=>{button.addEventListener("click",()=>openDialog(button))});

closeButton.addEventListener("click",()=>modal.close());

modal.addEventListener("click",event=>{if(event.target===modal){modal.close()}});

modal.addEventListener("close",()=>{if(lastFocusedElement){lastFocusedElement.focus()}});
