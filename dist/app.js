'use strict';
let content, currentLanguage, currentDraft = '';
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>';
const icons = [
  '<rect x="4" y="3" width="16" height="19" rx="1"/><path d="M8 7h8v5H8zM8 17h1m3 0h1m3 0h1"/>',
  '<path d="M7 18H6a5 5 0 0 1 0-10 7 7 0 0 1 13-1 5 5 0 0 1 0 10h-2M9 20v-8m-3 3 3-3 3 3m4-3v8m-3-3 3 3 3-3"/>',
  '<path d="M12 22V11M12 16C2 17 2 7 2 7s10-1 10 9Zm0-3C12 4 21 3 21 3s2 9-9 10Z"/>',
  '<circle cx="5" cy="5" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="12" cy="20" r="3"/><path d="M8 5h8M6 8l4 9m8-9-4 9"/>'
];
function button(text, href, type='blue', attrs='') { return `<a class="button ${type}" href="${esc(href)}" ${attrs}>${esc(text)}${arrow}</a>`; }
function getFormState() {
  const form = document.querySelector('form');
  if (!form) return {};
  return Object.fromEntries(new FormData(form));
}
function render(lang, preserve={}) {
  const c=content[lang], s=content.settings;
  currentLanguage=lang;
  document.documentElement.lang=lang;
  document.title=c.title;
  document.querySelector('meta[name="description"]').content=c.description;
  document.getElementById('language').value=lang;
  document.getElementById('language-label').textContent=c.language;
  document.getElementById('skip').textContent=c.skip;
  document.getElementById('navigation').setAttribute('aria-label',c.language==='Language'?'Main navigation':c.title);
  document.getElementById('navigation').innerHTML=c.nav.map((v,i)=>`<a href="#${['partnership','machines','control','contact'][i]}">${esc(v)}</a>`).join('');
  const images=['pivot-selected-v4.webp','corner-selected-v15.jpg','linear-selected-v4.webp','pump-station-selected-v4.webp'];
  const alts=['pivot','corner','linear','ditch'];
  const field=(key,autocomplete,type='text')=>`<label>${esc(c.contact[key])}<input name="${key}" type="${type}" autocomplete="${autocomplete}" ${['name','business','email','country'].includes(key)?'required':''} maxlength="180" value="${esc(preserve[key]||'')}"></label>`;
  document.getElementById('main').innerHTML=`
    <section class="hero" id="top">
      <div class="wrap hero-grid"><div>
        <span class="eyebrow">${esc(c.hero.eyebrow)}</span>
        <h1>${esc(c.hero.title)}</h1><p class="intro">${esc(c.hero.text)}</p>
        <div class="buttons">${button(c.hero.primary,'#contact','white')}${button(c.hero.secondary,'#machines','outline')}</div>
        <p class="hero-meta">${esc(c.hero.meta)}</p>
      </div><div class="hero-picture"><img class="hero-photo" src="assets/hero-field.webp" width="1920" height="1280" fetchpriority="high" alt="${esc(c.hero.alt)}"><div class="photo-note"><strong>${esc(c.hero.noteTitle)}</strong>${esc(c.hero.note)}</div></div></div>
      <svg class="wave" viewBox="0 0 1440 65" preserveAspectRatio="none" aria-hidden="true"><path d="M0 35C380 100 750-40 1440 12V65H0Z" fill="#fff" opacity=".3"/><path d="M0 55C500 15 880 85 1440 22V65H0Z" fill="white"/></svg>
    </section>
    <section class="section partnership" id="partnership"><div class="wrap">
      <div class="section-heading"><span class="eyebrow">${esc(c.partnership.eyebrow)}</span><h2>${esc(c.partnership.title)}</h2></div>
      <div class="company-grid">${s.companies.map((company,i)=>`<article class="company-card"><a class="company-logo ${company.id}" href="${esc(company.url)}" target="_blank" rel="noopener" aria-label="${esc(company.name)} — ${esc(c.partnership.web)}"><img src="assets/${esc(company.logo)}" alt="${esc(company.name)}" loading="lazy" width="240" height="160"></a><span class="company-role">${esc(c.partnership.companyRoles[i])}</span><h3>${esc(company.name)}</h3><p class="company-description">${esc(c.partnership.roles[i][1])}</p><address class="company-data"><span>${esc(company.address)}</span><a href="mailto:${esc(company.email)}">${esc(company.email)}</a>${company.phone?`<a href="tel:${esc(company.phoneLink)}">${esc(company.phone)}</a>`:''}</address><a class="company-website" href="${esc(company.url)}" target="_blank" rel="noopener">${esc(c.partnership.web)} ↗<span>${esc(new URL(company.url).hostname.replace(/^www\./,''))}</span></a></article>`).join('')}</div><p class="commercial-note">${esc(c.partnership.note)}</p>
    </div></section>
    <section class="section pale" id="machines"><div class="wrap">
      <div class="section-heading"><span class="eyebrow">${esc(c.products.eyebrow)}</span><h2>${esc(c.products.title)}</h2><p class="lead">${esc(c.products.intro)}</p></div>
      <div class="products">${c.products.items.map((p,i)=>`<article class="product"><img class="product-image selected-photo" src="assets/${images[i]}" alt="${esc(c.alt[alts[i]])}" width="960" height="640" loading="lazy"><div class="product-body"><small>${esc(p[0])}</small><h3>${esc(p[1])}</h3><p>${esc(p[2])}</p><div class="product-spec">${esc(p[3])}</div><a class="system-enquiry" href="#contact" data-system="${i}">${esc(c.products.link)} ↗</a></div></article>`).join('')}</div><p class="range-note">${esc(c.products.note)}</p>
    </div></section>
    <section class="section" id="control"><div class="wrap"><div class="control-grid">
      <div><span class="eyebrow">${esc(c.control.eyebrow)}</span><h2>${esc(c.control.title)}</h2><p class="lead">${esc(c.control.intro)}</p><div class="panel-visual"><img src="assets/control-panel-transparent-v12-lossless.webp" width="1536" height="1024" loading="lazy" alt="${esc(c.control.alt)}"><p class="image-caption">${esc(c.control.caption)}</p></div></div>
      <div>${c.control.features.map((f,i)=>`<article class="feature"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" aria-hidden="true">${icons[i]}</svg><div><h3>${esc(f[0])}</h3><p>${esc(f[1])}</p></div></article>`).join('')}<p class="technical-note">${esc(c.control.note)}</p>${button(c.hero.primary,'#contact')}</div>
    </div><div class="power"><img src="assets/starpower-transparent-lossless.webp" loading="lazy" width="960" height="640" alt="${esc(c.control.powerAlt)}"><div class="power-copy"><span class="eyebrow">${esc(c.control.powerEyebrow)}</span><h3>${esc(c.control.powerTitle)}</h3><p>${esc(c.control.powerText)}</p></div></div></div></section>
    <section class="section network" id="partners"><div class="wrap network-grid"><div><span class="eyebrow">${esc(c.network.eyebrow)}</span><h2>${esc(c.network.title)}</h2><p class="lead">${esc(c.network.intro)}</p><div class="partner-types">${c.network.types.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div><div><ul class="support-list">${c.network.support.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p class="network-note">${esc(c.network.note)}</p>${button(c.network.cta,'#contact','white')}</div></div></section>
    <section class="section"><div class="wrap field-story"><img src="assets/installation.webp" loading="lazy" width="1500" height="1000" alt="${esc(c.field.alt)}"><div><span class="eyebrow">${esc(c.field.eyebrow)}</span><h2>${esc(c.field.title)}</h2><p>${esc(c.field.text)}</p><div class="facts">${c.field.facts.map(f=>`<div><strong>${esc(f[0])}</strong><span>${esc(f[1])}</span></div>`).join('')}</div></div></div></section>
    <section class="section pale" id="questions"><div class="wrap"><div class="section-heading"><span class="eyebrow">${esc(c.faq.eyebrow)}</span><h2>${esc(c.faq.title)}</h2></div><div class="faq-list">${c.faq.items.map(f=>`<details><summary>${esc(f[0])}</summary><div class="faq-answer"><p>${esc(f[1])}</p></div></details>`).join('')}</div></div></section>
    <section class="section" id="contact"><div class="wrap"><div class="contact-grid"><div><span class="eyebrow">${esc(c.contact.eyebrow)}</span><h2>${esc(c.contact.title)}</h2><p class="lead">${esc(c.contact.text)}</p><div class="contact-links"><div><small>${esc(c.contact.emailLabel)}</small><a href="mailto:${esc(s.email)}">${esc(s.email)}</a></div><div><small>${esc(c.contact.phoneLabel)}</small><a href="tel:${esc(s.phoneLink)}">${esc(s.phone)}</a></div></div><p class="address"><strong>${esc(c.contact.company)}</strong><br>${esc(s.address)}</p>${s.showEvent?`<p class="exhibition-note">${esc(c.contact.eventLabel)}<br><strong>${esc(s.event)}</strong></p>`:''}</div>
      <form class="contact-form" id="enquiry-form"><h3>${esc(c.contact.formTitle)}</h3><div class="form-grid">${field('name','name')}${field('business','organization')}${field('email','email','email')}${field('country','country-name')}<label class="form-wide">${esc(c.contact.interest)}<select name="interest">${c.contact.options.map((o,i)=>`<option value="${i}" ${String(preserve.interest||0)===String(i)?'selected':''}>${esc(o)}</option>`).join('')}</select></label><label class="form-wide">${esc(c.contact.message)}<textarea name="message" maxlength="3500">${esc(preserve.message||'')}</textarea></label></div><button class="button blue" type="submit">${esc(c.contact.send)}${arrow}</button><p class="form-note">${esc(c.contact.note)}</p><div id="form-feedback"></div></form>
      </div><div class="download-row"><div><h3>${esc(c.contact.downloadTitle)}</h3><p>${esc(c.contact.downloadText)}</p></div><button class="button light" id="download">${esc(c.contact.download)}${arrow}</button></div></div></section>`;
  document.getElementById('footer').innerHTML=`<div class="wrap"><div class="footer-inner"><div><strong class="footer-brand">VODAR Smart Irrigation</strong></div><div class="footer-links legal-footer-links"><a href="legal.html?lang=${lang}#company">${esc(c.footer.companyDetails)}</a><a href="legal.html?lang=${lang}#privacy">${esc(c.footer.privacy)}</a><a href="legal.html?lang=${lang}#storage">${esc(c.footer.storage)}</a><a href="#contact">${esc(c.footer.contact)}</a></div></div><div class="footer-bottom"><div class="footer-links"><a href="${esc(s.kantorUrl)}">${esc(c.footer.main)}</a><a href="${esc(s.rmUrl)}">${esc(c.footer.rm)}</a></div><a href="#top">${esc(c.footer.back)} ↑</a></div></div>`;
  initialiseFaq();
  document.getElementById('enquiry-form').addEventListener('submit',prepareEnquiry);
  document.getElementById('download').addEventListener('click',downloadOverview);
  document.querySelectorAll('.system-enquiry').forEach(a=>a.addEventListener('click',()=>{
    const form=document.getElementById('enquiry-form');
    form.elements.interest.value='2';
    const product=c.products.items[Number(a.dataset.system)][1];
    const m=form.elements.message;
    if(!m.value.includes(product)) m.value=(m.value?m.value+'\n':'')+product;
  }));
}
function initialiseFaq() {
  document.querySelectorAll('.faq-list details').forEach(details=>{
    const summary=details.querySelector('summary');
    let expanded=details.open, animation=null;
    summary.setAttribute('aria-expanded',String(expanded));
    summary.addEventListener('click',event=>{
      event.preventDefault();
      const startHeight=details.getBoundingClientRect().height;
      if(animation){animation.cancel();animation=null;}
      expanded=!expanded;
      details.classList.toggle('is-expanded',expanded);
      summary.setAttribute('aria-expanded',String(expanded));
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof details.animate!=='function'){
        details.open=expanded;details.style.overflow='';return;
      }
      details.open=true;
      details.style.overflow='hidden';
      const borderHeight=parseFloat(getComputedStyle(details).borderTopWidth)+parseFloat(getComputedStyle(details).borderBottomWidth);
      const endHeight=expanded?details.scrollHeight+borderHeight:summary.getBoundingClientRect().height+borderHeight;
      animation=details.animate([{height:startHeight+'px'},{height:endHeight+'px'}],{duration:300,easing:'cubic-bezier(.4,0,.2,1)'});
      animation.onfinish=()=>{details.open=expanded;details.style.overflow='';animation=null;};
    });
  });
}
function prepareEnquiry(event) {
  event.preventDefault();
  const c=content[currentLanguage].contact, s=content.settings;
  const values=Object.fromEntries(new FormData(event.target));
  currentDraft=[`${c.name}: ${values.name}`,`${c.business}: ${values.business}`,`${c.email}: ${values.email}`,`${c.country}: ${values.country}`,`${c.interest}: ${c.options[values.interest]}`,'',values.message||''].join('\n');
  const url=`mailto:${s.email}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(currentDraft)}`;
  const feedback=document.getElementById('form-feedback');
  feedback.innerHTML=`<p class="form-feedback">${esc(c.feedback)}</p><p class="form-feedback"><a href="${esc(url)}">${esc(s.email)}</a></p><textarea class="draft-text" readonly aria-label="${esc(c.message)}" style="width:100%;min-height:180px;padding:12px;font-size:12px;border:1px solid #cbdce6;border-radius:2px">${esc(currentDraft)}</textarea><button type="button" class="button light" id="copy-enquiry">${esc(c.copy)}</button>`;
  document.getElementById('copy-enquiry').addEventListener('click',async()=>{
    try { await navigator.clipboard.writeText(currentDraft); document.getElementById('status').textContent=c.copied; document.getElementById('copy-enquiry').textContent=c.copied; }
    catch { const t=document.querySelector('.draft-text');t.focus();t.select();document.getElementById('status').textContent=c.copyFallback; }
  });
  window.location.href=url;
}
async function downloadOverview() {
  const c=content[currentLanguage].contact,button=document.getElementById('download');
  button.disabled=true;button.textContent=c.downloadPending;
  document.getElementById('status').textContent=c.downloadPending;
  try {
    const manifestResponse=await fetch('documents/brochure.json');
    if(!manifestResponse.ok)throw new Error('Brochure unavailable');
    const manifest=await manifestResponse.json();
    // Parts preserve the original PDF byte for byte while fitting static hosting limits.
    const parts=await Promise.all(manifest.parts.map(async name=>{
      const response=await fetch('documents/'+name);
      if(!response.ok)throw new Error('Brochure part unavailable');
      return response.arrayBuffer();
    }));
    const pdf=new Blob(parts,{type:'application/pdf'});
    if(pdf.size!==manifest.bytes)throw new Error('Incomplete brochure');
    const url=URL.createObjectURL(pdf),a=document.createElement('a');
    a.href=url;a.download=manifest.filename;a.click();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
    document.getElementById('status').textContent=c.download;
  } catch {
    document.getElementById('status').textContent=c.downloadError;
    button.insertAdjacentElement('afterend',Object.assign(document.createElement('p'),{className:'download-error',textContent:c.downloadError}));
  } finally {button.disabled=false;button.innerHTML=esc(c.download)+arrow;}
}
async function init() {
  try {
    const r=await fetch('content.json?v=14', {cache:'no-store'});if(!r.ok)throw new Error('Content unavailable');content=await r.json();
    let saved;try{saved=localStorage.getItem('vodar-language')}catch{}
    const query=new URL(location.href).searchParams.get('lang');
    const lang=Object.hasOwn(content,query)&&query!=='settings'?query:Object.hasOwn(content,saved)&&saved!=='settings'?saved:content.settings.defaultLanguage;
    render(lang);
    document.getElementById('language').addEventListener('change',e=>{
      const state=getFormState();render(e.target.value,state);
      try{localStorage.setItem('vodar-language',currentLanguage)}catch{}
      const url=new URL(location.href);url.searchParams.set('lang',currentLanguage);url.hash='';history.replaceState(null,'',url);
      window.scrollTo({top:0,left:0,behavior:'instant'});
      document.getElementById('status').textContent=content[currentLanguage].language+': '+document.getElementById('language').selectedOptions[0].text;
    });
    if(location.hash){try{document.querySelector(location.hash)?.scrollIntoView({behavior:'instant'});}catch{}}
  } catch(error) {
    document.getElementById('main').innerHTML='<div class="wrap empty"><h1>VODAR · RM · Kántor Automatika</h1><p>Please contact <a href="mailto:info@kantorautomatika.hu">info@kantorautomatika.hu</a> or <a href="tel:+36303683983">+36 30 368 3983</a>.</p></div>';
    console.error(error);
  }
}
init();
