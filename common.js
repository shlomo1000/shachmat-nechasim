(function(){
var S=document.currentScript.src;
window.BASE=S.slice(0,S.lastIndexOf("/")+1);
window.SITE={phone:"053-416-1615",wa:"972534161615",mail:"shtn161615@gmail.com",license:"",demo:true};
window.DATA=null;
window.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
window.fmt=function(n){return Number(n).toLocaleString("he-IL")};
window.areaName=function(slug){var a=((DATA&&DATA.areas)||[]).filter(function(x){return x.slug===slug})[0];return a?a.name:""};
window.areaUrl=function(slug){return BASE+"areas/"+slug+".html"};
window.waLink=function(t){return "https://wa.me/"+SITE.wa+(t?"?text="+encodeURIComponent(t):"")};
function qa(s){return [].slice.call(document.querySelectorAll(s))}
window.applySite=function(){
qa("[data-phone]").forEach(function(e){e.textContent=SITE.phone;e.href="tel:+"+SITE.wa});
qa("[data-wa]").forEach(function(e){e.href=waLink()});
qa("[data-mail]").forEach(function(e){e.textContent=SITE.mail;e.href="mailto:"+SITE.mail});
qa("[data-license]").forEach(function(e){e.textContent=SITE.license?"מתווך מורשה, רישיון מס׳ "+SITE.license:""});
qa("[data-demo]").forEach(function(e){e.hidden=!SITE.demo});
};
window.load=function(cb){
fetch(BASE+"data.json?v="+Date.now()).then(function(r){return r.json()}).then(function(d){
DATA=d;if(d.site)for(var k in d.site)SITE[k]=d.site[k];applySite();cb(d)}).catch(function(){cb(null)})};
window.renderList=function(box,L,empty){
box.innerHTML="";
if(!L.length){box.innerHTML='<p class="none">'+(empty||"אין כרגע נכס שמתאים לחיפוש. השאירו פרטים ונחפש בשבילכם.")+'</p>';return}
L.forEach(function(p){
var c=document.createElement("article");c.className="card";
var pic=p.img?'<img src="'+BASE+esc(p.img)+'" alt="'+esc(p.title)+'" loading="lazy">':'⌂';
c.innerHTML='<div class="pic"><b>'+esc(p.deal)+'</b>'+pic+'</div><div class="body"><h3>'+esc(p.title)+'</h3><div class="meta"><span>'+esc(p.rooms)+' חדרים</span>'+(p.size?'<span>'+esc(p.size)+' מ״ר</span>':'')+(p.floor?'<span>'+esc(p.floor)+'</span>':'')+'</div><span>'+esc(areaName(p.area))+'</span><div class="price">'+priceTxt(p)+'</div><button class="btn navy" type="button">לפרטים נוספים</button></div>';
c.querySelector("button").onclick=function(){openP(p)};
box.appendChild(c)})};
function priceTxt(p){return p.price?"₪"+fmt(p.price)+(p.deal==="השכרה"?" לחודש":""):"לפרטים"}
window.openP=function(p){
var d=document.getElementById("dlg");
if(!d){d=document.createElement("dialog");d.id="dlg";document.body.appendChild(d);d.addEventListener("click",function(e){if(e.target===d)d.close()})}
d.innerHTML='<div class="dimg">'+(p.img?'<img src="'+BASE+esc(p.img)+'" alt="'+esc(p.title)+'">':'⌂')+'</div><div class="dbody"><h3>'+esc(p.title)+'</h3><div class="meta"><span>'+esc(p.type||"דירה")+'</span><span>'+esc(p.rooms)+' חדרים</span>'+(p.size?'<span>'+esc(p.size)+' מ״ר</span>':'')+(p.floor?'<span>'+esc(p.floor)+'</span>':'')+'</div><span>'+esc(areaName(p.area))+'</span><div class="price">'+priceTxt(p)+'</div><p>'+esc(p.desc||"")+'</p><div class="row"><a class="btn" target="_blank" rel="noopener" href="'+waLink("שלום, אני מעוניין בנכס: "+p.title+" ב"+areaName(p.area))+'">שלחו הודעה בוואטסאפ</a><button class="btn navy" type="button" onclick="document.getElementById(\'dlg\').close()">סגירה</button></div></div>';
d.showModal()};
})();
