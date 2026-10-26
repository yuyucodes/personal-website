const c={about:["About","Hi, I'm Yuyu. Write a short intro about yourself here."],
projects:["Projects","List your projects here."],
contact:["Contact","Add your email and links here."]};

const m=document.getElementById("m");let last;

document.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{last=b;const d=c[b.dataset.d];mt.textContent=d[0];mp.textContent=d[1];m.showModal()});

x.onclick=()=>m.close();

m.addEventListener("click",e=>{if(e.target===m)m.close()});
m.addEventListener("close",()=>last&&last.focus());
