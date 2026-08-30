// Paste into a browser devtools console on any page of this site.
// Returns every text node whose contrast falls below WCAG AA for its size,
// resolving alpha against whatever it is actually painted on — which is the
// part a static palette check cannot do. Run it in both colour schemes.
//
// Empty array = clean. Anything listed is a real defect: the palette derives
// every neutral from ink at alpha, and it is easy to pick an alpha that looks
// right and reads badly.

(() => {
  const lum = (r,g,b) => { const f=c=>{c/=255; return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);};
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
  const parse = s => (s.match(/[\d.]+/g)||[]).map(Number);
  const bgOf = el => { let n=el; while(n){ const c=getComputedStyle(n).backgroundColor; const p=parse(c);
    if(p.length>=3 && (p[3]===undefined||p[3]>0)) return p; n=n.parentElement; } return [255,255,255]; };
  const blend=(fg,bg)=>{const a=fg[3]===undefined?1:fg[3];return [0,1,2].map(i=>a*fg[i]+(1-a)*bg[i]);};
  const ratio=(a,b)=>{const l1=lum(...a),l2=lum(...b);return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);};

  const out=[];
  document.querySelectorAll('p,li,td,th,h1,h2,h3,a,span,dt,dd').forEach(el=>{
    const txt=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('');
    if(!txt) return;
    const cs=getComputedStyle(el);
    const bg=bgOf(el);
    const fg=blend(parse(cs.color),bg);
    const r=ratio(fg,bg);
    const px=parseFloat(cs.fontSize);
    const bold=parseInt(cs.fontWeight)>=700;
    const large = px>=24 || (px>=18.66 && bold);
    const need = large?3:4.5;
    if(r < need) out.push({sel:el.className||el.tagName, px:+px.toFixed(1), ratio:+r.toFixed(2), need, txt:txt.slice(0,42)});
  });
  return JSON.stringify(out,null,1);
})()
