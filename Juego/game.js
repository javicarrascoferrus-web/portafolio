(() => {
"use strict";
const canvas=document.getElementById('game'), ctx=canvas.getContext('2d');
const W=20,H=12,T=48; ctx.imageSmoothingEnabled=false;
const player={x:10,y:8,face:'down',step:0};
const visited=new Set();
try { JSON.parse(localStorage.getItem('javi_os_visited')||'[]').forEach(id=>visited.add(id)); } catch {}
const objects=[
 {id:'projects',x:4,y:3,name:'Mis proyectos',icon:'💻',tag:'REPOSITORIO / GITHUB',text:'Aquí guardo mis proyectos de programación.\n\nEstoy aprendiendo Java, Python y desarrollo web. Puedes explorar mi código en GitHub.',links:[['Abrir proyectos ↗','https://github.com/javicarrascoferrus-web/Proyectos']]},
 {id:'study',x:15,y:2,name:'Mi formación',icon:'📚',tag:'FORMACIÓN / ESTUDIOS',text:'FP de Sistemas Microinformáticos y Redes (SMR).\n\nActualmente estudio Desarrollo de Aplicaciones Multiplataforma (DAM), con ganas de seguir creciendo en el mundo del software.',links:[]},
 {id:'skills',x:16,y:7,name:'Tecnologías',icon:'⚙️',tag:'HERRAMIENTAS / SKILLS',text:'Lenguajes: Python, Java, JavaScript, HTML y CSS.\n\nBases de datos: SQLite y SQL.\n\nHerramientas: GitHub y Visual Studio Code.',links:[]},
 {id:'about',x:7,y:2,name:'Sobre mí',icon:'👤',tag:'IDENTIDAD / PERFIL',text:'¡Hola! Soy Javier Carrasco.\n\nMe apasionan la tecnología, la programación y crear cosas útiles. Este pequeño juego también es parte de mi portafolio.',links:[['Ver portafolio clásico ↗','../index.html']]},
 {id:'contact',x:3,y:8,name:'Contacto',icon:'📡',tag:'CONECTAR / CONTACTO',text:'¿Hablamos? Puedes encontrarme en GitHub, LinkedIn o escribirme un correo.',links:[['GitHub ↗','https://github.com/javicarrascoferrus-web'],['LinkedIn ↗','https://www.linkedin.com/in/javier-carrasco-9211b0356/'],['Enviar email ↗','mailto:javicarrascoferrus@gmail.com']]}
];
const obstacles=new Set();
function block(x,y,w=1,h=1){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)obstacles.add(`${i},${j}`)}
for(let x=0;x<W;x++){block(x,0);block(x,H-1)}
for(let y=0;y<H;y++){block(0,y);block(W-1,y)}
// Furniture, navigable room
block(2,2,4,2);block(14,1,4,2);block(6,1,3,2);block(15,7,3,2);block(2,7,3,2);
block(10,3,2,2);block(8,9,4,1);
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
function line(x,y,w,h,c){rect(x,y,w,h,c)}
function furniture(x,y,w,h,base,edge){rect(x*T+3,y*T+5,w*T-6,h*T-10,base);rect(x*T+5,y*T+5,w*T-10,5,edge);rect(x*T+5,(y+h)*T-10,w*T-10,5,'#08170f')}
function label(s,x,y,color='#a9f9bb',size=12){ctx.fillStyle=color;ctx.font=`bold ${size}px monospace`;ctx.textAlign='center';ctx.fillText(s,x,y);ctx.textAlign='left'}
function drawFloor(){
 rect(0,0,960,576,'#15261e');
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const px=x*T,py=y*T;
  rect(px+1,py+1,T-2,T-2,(x+y)%2?'#1a3024':'#1b3427');
  rect(px+2,py+2,T-4,1,'#284432');
  if((x*7+y*13)%9===0)rect(px+12,py+32,3,3,'#31523b');
 }
 // ambient floor lighting
 for(let y=1;y<11;y++)for(let x=1;x<19;x++){
  const d=Math.hypot(x-5,y-4);
  if(d<3 && (x+y)%2===0)rect(x*T+2,y*T+2,44,44,'#20483255');
 }
 // perimeter walls
 for(let x=0;x<W;x++){
  rect(x*T,0,T,48,'#0b1914');rect(x*T+2,3,44,9,'#294b38');rect(x*T+4,15,40,23,'#1b3b2b');
  rect(x*T,11*T,T,T,'#10231b');rect(x*T+2,11*T+6,44,8,'#284835');
 }
 for(let y=1;y<11;y++){
  rect(0,y*T,T,48,'#0d1d16');rect(4,y*T+4,10,40,'#2c523b');
  rect(19*T,y*T,T,48,'#0d1d16');rect(19*T+32,y*T+4,10,40,'#2c523b');
 }
 // neon wall panel
 rect(450,5,105,27,'#06120e');rect(453,8,99,21,'#143c27');label('JAVI_OS',502,23,'#74f7a4',12);
}
function drawRoom(){
 // computer desk top left
 furniture(2,2,4,2,'#694b35','#98714d');
 for(let i=0;i<3;i++){rect(116+i*48,100,40,37,'#081813');rect(120+i*48,104,32,27,'#103f2b');for(let j=0;j<4;j++)rect(123+i*48,109+j*5,18+(j%2)*8,2,j%2?'#6cf9a6':'#36875d');rect(129+i*48,140,15,3,'#192f22')}
 rect(146,153,95,8,'#142b1d');rect(162,158,65,3,'#69d78d');
 // bookshelf
 furniture(14,1,4,2,'#4c382c','#7d5940');
 for(let i=0;i<15;i++){const x=14*T+11+i*10;rect(x,68,7,25,['#71bd77','#a6c66b','#499b7b','#c69e5b'][i%4]);rect(x,107,7,20,['#4d9e6a','#91bf83','#c78b6b'][i%3])}
 // personal wall display
 furniture(6,1,3,2,'#283b32','#4d8461');rect(305,65,100,57,'#07150f');rect(311,70,88,47,'#163f2b');label('JAVIER',355,89,'#9ff7b4',12);label('CARRASCO',355,104,'#65d792',11);
 // workbench
 furniture(15,7,3,2,'#524434','#8c7152');
 rect(742,353,35,27,'#153627');rect(748,357,23,4,'#78e7a1');rect(794,359,22,20,'#384d42');rect(829,361,20,17,'#254c36');
 // communication console
 furniture(2,7,3,2,'#4a4b40','#7c8b70');rect(113,348,70,42,'#0b1b16');rect(119,353,58,31,'#185038');label('SIGNAL',148,371,'#87f6ad',10);rect(146,341,3,13,'#73dca0');
 // couch and rug center
 furniture(10,3,2,2,'#325344','#528268');rect(492,165,48,13,'#72947b');rect(495,190,40,15,'#274b36');
 rect(6*T,7*T,7*T,3*T,'#254433');rect(6*T+7,7*T+7,7*T-14,3*T-14,'#2b503c');rect(6*T+15,7*T+15,7*T-30,3*T-30,'#214131');
 // bottom furniture
 furniture(8,9,4,1,'#493b2d','#816449');rect(412,437,24,10,'#4d9b65');rect(458,435,20,12,'#72b981');
 // plants
 for(const [x,y] of [[1,2],[18,3],[17,10]]){rect(x*T+13,y*T+25,25,17,'#674a32');rect(x*T+8,y*T+13,31,20,'#276d43');rect(x*T+17,y*T+5,13,30,'#398e56')}
}
function drawMarkers(time){
 objects.forEach(o=>{
  const cx=(o.x+.5)*T,cy=(o.y+.5)*T;
  const pulse=Math.sin(time/370+o.x)*3;
  ctx.fillStyle=visited.has(o.id)?'#60b583':'#79ffb6';ctx.globalAlpha=.14;ctx.beginPath();ctx.arc(cx,cy+12,21+pulse,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  rect(cx-15,cy-17+pulse,30,26,'#0b2217');rect(cx-13,cy-15+pulse,26,22,visited.has(o.id)?'#23513a':'#2b7e4e');
  label(o.icon,cx,cy+2+pulse,'#ffffff',19);
 });
}
function drawPlayer(time){
 const px=player.x*T,py=player.y*T;const bob=Math.sin(time/140)*1.3;
 // shadow
 ctx.fillStyle='#0008';ctx.beginPath();ctx.ellipse(px+24,py+41,17,6,0,0,Math.PI*2);ctx.fill();
 // legs
 rect(px+12,py+29+bob,10,12,'#152f2b');rect(px+26,py+29+bob,10,12,'#152f2b');
 rect(px+11,py+38+bob,12,5,'#101716');rect(px+25,py+38+bob,12,5,'#101716');
 // body
 rect(px+10,py+19+bob,28,18,'#0a1414');rect(px+13,py+22+bob,22,12,'#1d4130');rect(px+22,py+25+bob,5,5,'#82f5a8');
 rect(px+6,py+22+bob,7,13,'#c88d67');rect(px+35,py+22+bob,7,13,'#c88d67');
 // head and hair
 rect(px+14,py+6+bob,21,18,'#c88d67');rect(px+13,py+3+bob,23,8,'#191d1a');rect(px+12,py+7+bob,5,9,'#1c211b');
 if(player.face==='down'){rect(px+18,py+16+bob,3,2,'#1c251c');rect(px+29,py+16+bob,3,2,'#1c251c');rect(px+21,py+20+bob,9,2,'#825f48')}
 else if(player.face==='left')rect(px+16,py+15+bob,3,2,'#19261e');
 else if(player.face==='right')rect(px+30,py+15+bob,3,2,'#19261e');
 // selection halo
 rect(px+9,py+45,30,2,'#63e9a1');
}
function nearest(){let best=null,dist=Infinity;for(const o of objects){const d=Math.abs(o.x-player.x)+Math.abs(o.y-player.y);if(d<dist){best=o;dist=d}}return dist<=2?best:null}
const dialog=document.getElementById('dialog'),hint=document.getElementById('hint');
function refresh(){
 document.getElementById('position').textContent=`POS: ${player.x}, ${player.y}`;
 const near=nearest();hint.textContent=near?`[E] ${near.name.toUpperCase()}`:'ACÉRCATE A UN OBJETO';
 document.getElementById('progress').textContent=`EXPLORADO ${visited.size}/5`;
 document.getElementById('counter').textContent=`${visited.size} / 5`;
 document.getElementById('progressFill').style.width=(visited.size/5*100)+'%';
 objects.forEach(o=>{const el=document.getElementById('check-'+o.id);el.textContent=visited.has(o.id)?'✓':'○';el.classList.toggle('done',visited.has(o.id))});
}
function openObject(o){
 visited.add(o.id);try{localStorage.setItem('javi_os_visited',JSON.stringify([...visited]))}catch{}
 document.getElementById('dialogTag').textContent=o.tag;
 document.getElementById('dialogTitle').textContent=o.name;
 document.getElementById('dialogIcon').textContent=o.icon;
 document.getElementById('dialogText').textContent=o.text;
 const links=document.getElementById('dialogLinks');links.replaceChildren();
 for(const [name,url] of o.links){const a=document.createElement('a');a.textContent=name;a.href=url;if(url.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer'}links.append(a)}
 dialog.classList.remove('hidden');refresh();document.getElementById('closeDialog').focus();
 if(visited.size===5)showToast('¡Misión completada! Has descubierto todo JAVI_OS.');
}
function showToast(s){const t=document.getElementById('toast');t.textContent=s;t.classList.remove('off');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.add('off'),3600)}
function interact(){if(!dialog.classList.contains('hidden')){close();return}const o=nearest();if(o)openObject(o);else showToast('Acércate a un objeto brillante para interactuar.')}
function close(){dialog.classList.add('hidden');canvas.focus({preventScroll:true})}
document.getElementById('closeDialog').addEventListener('click',close);
document.getElementById('touchAction').addEventListener('click',interact);
const dirs={arrowup:[0,-1,'up'],w:[0,-1,'up'],arrowdown:[0,1,'down'],s:[0,1,'down'],arrowleft:[-1,0,'left'],a:[-1,0,'left'],arrowright:[1,0,'right'],d:[1,0,'right']};
function move(dir){if(!dialog.classList.contains('hidden'))return;const [dx,dy,face]=dir;player.face=face;const x=player.x+dx,y=player.y+dy;if(!obstacles.has(`${x},${y}`)){player.x=x;player.y=y;player.step++}refresh()}
let lastMove=0;const held=new Set();
document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(dirs[k]||k===' '||k==='escape'||k==='e')e.preventDefault();if(k==='escape'){close();return}if(!dialog.classList.contains('hidden'))return;if(k==='e'||k===' '){if(!e.repeat)interact();return}if(dirs[k]){if(!held.has(k))move(dirs[k]);held.add(k)}});
document.addEventListener('keyup',e=>held.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>held.clear());
let touchDir=null;document.querySelectorAll('[data-dir]').forEach(btn=>{
 const start=e=>{e.preventDefault();touchDir=dirs[({up:'w',down:'s',left:'a',right:'d'})[btn.dataset.dir]];move(touchDir);btn.setPointerCapture(e.pointerId)};
 btn.addEventListener('pointerdown',start);
 btn.addEventListener('pointerup',()=>touchDir=null);
 btn.addEventListener('pointercancel',()=>touchDir=null);
});
function frame(t){
 if(t-lastMove>135){if(touchDir)move(touchDir);else for(const k of held){if(dirs[k]){move(dirs[k]);break}}lastMove=t}
 drawFloor();drawRoom();drawMarkers(t);drawPlayer(t);
 requestAnimationFrame(frame);
}
document.getElementById('year').textContent=new Date().getFullYear();
refresh();requestAnimationFrame(frame);
setTimeout(()=>document.getElementById('toast').classList.add('off'),4500);
})();
