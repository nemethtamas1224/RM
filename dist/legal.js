'use strict';
const escapeLegal=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let legalContent;
function showLegal(lang){
  const e=escapeLegal,s=legalContent.settings,c=legalContent[lang],l=c.legal;
  document.documentElement.lang=lang;document.title=l.pageTitle+' · VODAR Smart Irrigation';
  document.getElementById('language-label').textContent=c.language;document.getElementById('language').value=lang;
  document.querySelector('.wordmark').href='index.html?lang='+lang;
  document.getElementById('legal-content').innerHTML=`<a class="legal-back" href="index.html?lang=${lang}">← ${e(l.back)}</a><h1>${e(l.pageTitle)}</h1><p>${e(l.updated)}</p><div class="legal-nav"><a href="#company">${e(l.labels[0])}</a><a href="#privacy">${e(l.labels[1])}</a><a href="#storage">${e(l.labels[2])}</a></div><section id="company"><h2>${e(l.companyTitle)}</h2><address><strong>Kántor Automatika Kft.</strong><br>${e(s.address)}<br>${e(l.tax)}: ${e(s.taxNumber)}<br><a href="mailto:${e(s.email)}">${e(s.email)}</a><br><a href="tel:${e(s.phoneLink)}">${e(s.phone)}</a><br><a href="${e(s.kantorUrl)}">kantorautomatika.hu</a></address><p>${e(l.companyText)}</p></section><section id="privacy"><h2>${e(l.privacyTitle)}</h2>${l.privacyItems.map(p=>`<h3>${e(p[0])}</h3><p>${e(p[1])}</p>`).join('')}</section><section id="storage"><h2>${e(l.storageTitle)}</h2><p>${e(l.storageText)}</p></section><section id="pending"><h2>${e(l.pendingTitle)}</h2><ul>${l.pending.map(p=>`<li>${e(p)}</li>`).join('')}</ul></section><div class="legal-sources"><a href="https://naih.hu/erintetti-jogok" target="_blank" rel="noopener">${e(l.rightsLink)} ↗</a><a href="https://eur-lex.europa.eu/legal-content/HU-EN/TXT/?uri=CELEX%3A32016R0679" target="_blank" rel="noopener">${e(l.lawLink)} ↗</a></div>`;
}
async function startLegal(){
  try{
    const r=await fetch('content.json?v=10',{cache:'no-store'});if(!r.ok)throw new Error('Content unavailable');legalContent=await r.json();
    let lang=new URL(location.href).searchParams.get('lang');if(!['en','hu','it','de'].includes(lang))lang=legalContent.settings.defaultLanguage;
    showLegal(lang);
    const id=location.hash.slice(1);if(['company','privacy','storage'].includes(id))document.getElementById(id)?.scrollIntoView({behavior:'instant'});
    document.getElementById('language').addEventListener('change',ev=>{showLegal(ev.target.value);const url=new URL(location.href);url.searchParams.set('lang',ev.target.value);url.hash='';history.replaceState(null,'',url);window.scrollTo({top:0,left:0,behavior:'instant'});});
  }catch(error){document.getElementById('legal-content').innerHTML='<p><a href="index.html">← VODAR Smart Irrigation</a></p><p>info@kantorautomatika.hu · +36 30 368 3983</p>';console.error(error);}
}
startLegal();
