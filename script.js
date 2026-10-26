const content={about:["About","Hi, I'm Esther. I'm a student and developer based in Boston, MA and Charlotte, NC."],
projects:["Projects","my projects."],
contact:["Contact","my email and links."]};

const modal=document.getElementById("m");
const title=document.getElementById("mt");
const message=document.getElementById("mp");
const closeButton=document.getElementById("x");

let lastFocusedElement=null;

const openDialog=button=>{const dialogData=content[button.dataset.d];

if(!dialogData)return;

lastFocusedElement=button;
title.textContent=dialogData[0];
message.textContent=dialogData[1];
modal.showModal()};

document.querySelectorAll("[data-d]").forEach(button=>{button.addEventListener("click",()=>openDialog(button))});

closeButton.addEventListener("click",()=>modal.close());

modal.addEventListener("click",event=>{if(event.target===modal){modal.close()}});

modal.addEventListener("close",()=>{if(lastFocusedElement){lastFocusedElement.focus()}});
