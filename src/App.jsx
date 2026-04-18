// App.jsx — HopHrad.cz
// Změny oproti předchozí verzi:
//   - Logo: větší (56px), mix-blend-mode screen (průhledné pozadí)
//   - TrustBar: lepší spacing od rozdělovačů
//   - Certifikát: všude otevřít v novém okně místo stahování
//   - 2. den sleva: -25 % (bylo -50 %)
//   - Recenze: "a hlavně dětí!"
//   - Castle karty: celá karta je klikatelná
//   - Odstraněn banner "LEGO Hrad je dostupný"
//   - LEGO váha: 120 kg, kapacita: až 10 dětí
//   - Kalkulačka v kontaktu: maxWidth 680px
//   - Formulář: nová kolonka "Místo akce"

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import KalkulackaDopravy from "./KalkulackaDopravy";

// Tady už začínají tvoje obrázky...

import I_LOGO    from "./assets/logo.png";
import I_HRAD1   from "./assets/hrad1.png";
import I_HRAD2   from "./assets/hrad2.png";
import I_HRAD3   from "./assets/hrad3.png";
import I_HRAD5   from "./assets/hrad5.png";
import I_IMG3422 from "./assets/img3422.png";
import I_IMG3458 from "./assets/img3458.png";
import I_IMG3474 from "./assets/img3474.png";
import I_GEM1    from "./assets/gem1.png";
import I_GEM2    from "./assets/gem2.png";
import I_GEM3    from "./assets/gem3.png";
import I_GEM4    from "./assets/gem4.png";
import I_GEM5    from "./assets/gem5.png";
import I_CERT    from "./assets/ce-certifikat.pdf";

const P="#7C3AED",PD="#5B21B6",PL="#EDE9FE",PLM="#DDD6FE";
const BG="#FAFAFA",SRF="#FFFFFF",SRFL="#F7F5FF",SRFM="#F0EDFD";
const TX="#18181B",MUT="#52525B",FAINT="#A1A1AA",BRD="#E4E0F5";
const GBG="#DCFCE7",GFG="#166534",YBG="#FEF3C7",YFG="#92400E";

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Manrope',sans-serif;background:#fafafa;color:#18181b;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,h5{font-family:'Plus Jakarta Sans',sans-serif}
a{text-decoration:none;color:inherit}
img{display:block;max-width:100%}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes heroPan{0%,100%{transform:scale(1.06)}50%{transform:scale(1.1) translate(-1.5%,-1%)}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.fu{animation:fadeUp .65s ease both}
.d1{animation-delay:.08s}.d2{animation-delay:.2s}.d3{animation-delay:.35s}.d4{animation-delay:.5s}
input,textarea,select{font-family:'Manrope',sans-serif}
.hmenu{display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;align-items:center}
@media(max-width:860px){
  .dlink,.dbtn{display:none!important}
  .hmenu{display:flex!important}
  .col2{grid-template-columns:1fr!important}
  .col3{grid-template-columns:1fr 1fr!important}
  .col4{grid-template-columns:1fr 1fr!important}
  .hero-h1{font-size:clamp(38px,11vw,68px)!important;letter-spacing:-2px!important}
  .sec{padding:52px 5%!important}
  .ctar{flex-wrap:wrap!important}
  .prow{flex-direction:column!important;gap:6px!important}
  .galgrid{grid-template-columns:1fr!important}
  .kgrid{grid-template-columns:1fr!important}
  .fgrid{grid-template-columns:1fr 1fr!important}
  .gdpr-grid{grid-template-columns:1fr!important}
}
@media(max-width:520px){
  .col3{grid-template-columns:1fr!important}
  .col4{grid-template-columns:1fr!important}
  .fgrid{grid-template-columns:1fr!important}
}
`;

function useScroll(threshold=50){
  const [val,setVal]=useState(false);
  useEffect(()=>{
    const fn=()=>setVal(window.scrollY>threshold);
    window.addEventListener("scroll",fn,{passive:true});fn();
    return()=>window.removeEventListener("scroll",fn);
  },[threshold]);
  return val;
}

function Btn({children,onClick,href,variant="primary",size="md",full,s={}}){
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
    border:"none",cursor:"pointer",borderRadius:9999,fontFamily:"'Plus Jakarta Sans',sans-serif",
    fontWeight:800,transition:"transform .15s, box-shadow .15s",
    ...(full?{width:"100%"}:{}),
    ...(size==="lg"?{padding:"16px 38px",fontSize:16}:size==="sm"?{padding:"8px 16px",fontSize:13}:{padding:"12px 26px",fontSize:14}),
    ...(variant==="primary"?{background:P,color:"#fff",boxShadow:`0 5px 18px rgba(124,58,237,.35)`}:
        variant==="ghost"  ?{background:"rgba(255,255,255,.12)",color:"#fff",border:"1.5px solid rgba(255,255,255,.25)",boxShadow:"none"}:
        variant==="dark"   ?{background:"#111",color:"#fff",boxShadow:"none"}:
        variant==="outline"?{background:"transparent",color:P,border:`1.5px solid ${P}`,boxShadow:"none"}:
                            {background:SRFM,color:TX,boxShadow:"none",border:`1px solid ${BRD}`}),
    ...s};
  const enter=e=>{e.currentTarget.style.transform="scale(1.04)"};
  const leave=e=>{e.currentTarget.style.transform="scale(1)"};
  if(href) return <a href={href} style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button style={base} onClick={onClick} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
}

function Chip({children,bg=PL,color=PD}){
  return <span style={{display:"inline-block",background:bg,color,fontWeight:800,fontSize:11,
    letterSpacing:1.5,padding:"5px 14px",borderRadius:9999,textTransform:"uppercase",
    fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{children}</span>;
}

// Odkaz na certifikát — otevřít v novém okně, ne stahovat
function CertLink({style,children}){
  return(
    <a href={I_CERT} target="_blank" rel="noopener noreferrer"
      style={{display:"inline-flex",alignItems:"center",gap:8,background:PL,
        color:PD,padding:"11px 18px",borderRadius:10,fontWeight:800,fontSize:13,
        border:`1px solid ${PLM}`,fontFamily:"'Plus Jakarta Sans',sans-serif",...style}}>
      {children||"📄 Zobrazit CE certifikát EN 14960"}
    </a>
  );
}

function NavBar({page,go}){
  const solid=useScroll(50);
  const [open,setOpen]=useState(false);
  useEffect(()=>{setOpen(false)},[page]);
  const onHero=page==="home"&&!solid;
  const links=[["Domů","home"],["Hrady","hrady"],["Kontakt","kontakt"]];
  return(
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:300,
      background:solid?"rgba(250,250,250,.97)":"transparent",
      backdropFilter:solid?"blur(18px)":"blur(0px)",
      borderBottom:solid?`1px solid ${BRD}`:"none",
      boxShadow:solid?"0 2px 16px rgba(124,58,237,.07)":"none",transition:"all .3s"}}>
      <nav style={{maxWidth:1200,margin:"0 auto",padding:"0 5%",height:72,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>

        {/* Logo — mix-blend-mode:screen odstraní černé pozadí obrázku */}
        <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",
          display:"flex",alignItems:"center",gap:0}}>
          <img src={I_LOGO} alt="HopHrad logo"
            style={{height:56,width:"auto",objectFit:"contain",mixBlendMode:"screen"}}/>
        </button>

        <ul className="dlink" style={{display:"flex",gap:2,listStyle:"none"}}>
          {links.map(([l,p])=>(
            <li key={p}><button onClick={()=>go(p)} style={{
              background:page===p?(onHero?"rgba(255,255,255,.15)":PL):"transparent",
              color:page===p?(onHero?"#fff":P):(onHero?"rgba(255,255,255,.82)":MUT),
              border:"none",cursor:"pointer",padding:"8px 16px",borderRadius:9999,
              fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,transition:"all .15s"
            }}>{l}</button></li>
          ))}
        </ul>

        <span className="dbtn"><Btn onClick={()=>go("kontakt")} size="sm">📅 Rezervovat</Btn></span>

        <button className="hmenu" onClick={()=>setOpen(o=>!o)} aria-label={open?"Zavřít":"Menu"}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:2.5,borderRadius:2,
            transition:"all .22s",background:onHero?"#fff":TX,
            transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none"):"none",
            opacity:open&&i===1?0:1}}/>)}
        </button>
      </nav>
      {open&&(
        <div style={{background:"rgba(250,250,250,.98)",backdropFilter:"blur(20px)",
          borderTop:`1px solid ${BRD}`,padding:"12px 5% 20px",animation:"slideDown .2s ease"}}>
          {links.map(([l,p])=>(
            <button key={p} onClick={()=>go(p)} style={{display:"block",width:"100%",
              textAlign:"left",background:page===p?PL:"transparent",color:page===p?P:TX,
              border:"none",cursor:"pointer",padding:"12px 14px",borderRadius:10,marginBottom:4,
              fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:15}}>{l}</button>
          ))}
          <Btn onClick={()=>go("kontakt")} full s={{marginTop:8,justifyContent:"center"}}>📅 Rezervovat termín</Btn>
        </div>
      )}
    </header>
  );
}

function TrustBar(){
  const items=[
    ["🛡️","CE certifikát EN 14960","Bezpečnost ověřena"],
    ["🚚","Prvních 10 km zdarma","Zbytek dle kalkulačky"],
    ["🏗️","Instalace ZDARMA","My vše připravíme"],
    ["⭐","100% spokojených","Stovky šťastných rodin"],
  ];
  return(
    <div style={{background:P}}>
      <ul className="col4" style={{maxWidth:1200,margin:"0 auto",padding:"0 5%",
        display:"grid",gridTemplateColumns:"repeat(4,1fr)",listStyle:"none",gap:0}}>
        {items.map(([icon,title,sub],i)=>(
          <li key={i} style={{
            padding:"14px 24px 14px 16px",
            // Rozdělovač jako pseudo-border pomocí outline box-shadow
            borderRight:i<3?"1px solid rgba(255,255,255,.18)":"none",
            display:"flex",alignItems:"center",gap:13}}>
            <span style={{fontSize:22,flexShrink:0}}>{icon}</span>
            <div style={{minWidth:0}}>
              <strong style={{display:"block",color:"#fff",fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontSize:12,fontWeight:800,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                {title}
              </strong>
              <span style={{color:"rgba(255,255,255,.65)",fontSize:11}}>{sub}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home({go}){
  const [heroI,setHeroI]=useState(0);
  const slides=[
    {src:I_GEM1,alt:"Děti skáčou na skákacím hradě HopHrad – pronájem Liberec"},
    {src:I_HRAD5,alt:"LEGO skákací hrad HopHrad – pronájem Liberec a Jablonec nad Nisou"},
    {src:I_GEM5,alt:"Šťastná holčička na skákacím hradě HopHrad"},
  ];
  useEffect(()=>{
    const t=setInterval(()=>setHeroI(i=>(i+1)%slides.length),5200);
    return()=>clearInterval(t);
  },[]);
  const [openFaq,setOpenFaq]=useState(null);
  const faqs=[
    ["Co je v ceně pronájmu?","Instalace i odvoz hradu. Prvních 10 km od Liberce je doprava zcela zdarma. Pro vzdálenější místa cena dle kalkulačky dopravy výše."],
    ["Co potřebuji zajistit?","Příjezd k místu konání, elektrické připojení 230 V (standardní zásuvka) a pomoc jedné dospělé osoby při předávání hradu."],
    ["Jak rychle odepíšete na poptávku?","Snažíme se odpovědět co nejdříve. V sezóně (jaro–léto) doporučujeme rezervovat s předstihem 2–3 týdnů."],
    ["Lze hrad použít i na veřejné akci?","Ano! Dodáváme hrady na firemní eventy, školní dny, městské slavnosti i soukromé narozeninové oslavy."],
    ["Co se stane při špatném počasí?","Mírný déšť nevadí. Při bouřce a silném větru (nad 6 Beaufort) je z bezpečnostních důvodů nutné provoz přerušit."],
    ["Jaký věk je pro hrad vhodný?","Naše hrady jsou určeny pro děti od 3 do 13 let. Vždy zajistěte dohled dospělé osoby."],
  ];

  return(
    <main id="main">
      {/* HERO */}
      <section style={{position:"relative",minHeight:"100vh",display:"flex",
        alignItems:"center",overflow:"hidden",background:"#0f0a1e"}}>
        {slides.map((s,i)=>(
          <div key={i} style={{position:"absolute",inset:0,transition:"opacity 1.2s ease",opacity:i===heroI?1:0}}>
            <img src={s.src} alt={s.alt} loading={i===0?"eager":"lazy"}
              style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.35)",
                animation:"heroPan 18s ease-in-out infinite"}}/>
          </div>
        ))}
        <div style={{position:"absolute",inset:0,
          background:"linear-gradient(to top,#fafafa 0%,rgba(250,250,250,.05) 38%,transparent 72%)"}}/>
        <div style={{position:"relative",zIndex:5,maxWidth:1200,margin:"0 auto",
          padding:"120px 5% 100px",width:"100%"}}>
          <div style={{maxWidth:680}}>
            <h1 className="hero-h1 fu d1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",
              fontSize:"clamp(44px,8vw,88px)",fontWeight:900,color:"#fff",
              lineHeight:1.02,letterSpacing:-3,marginBottom:20}}>
              Pronájem<br/>skákacích<br/>
              <span style={{backgroundImage:"linear-gradient(135deg,#c4b5fd,#a78bfa,#e879f9)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                hradů Liberec
              </span>
            </h1>
            <p className="fu d2" style={{color:"rgba(255,255,255,.74)",fontSize:18,
              lineHeight:1.7,maxWidth:520,marginBottom:32}}>
              Přivezeme, nainstalujeme a odvezeme.{" "}
              <strong style={{color:"#fff"}}>Prvních 10 km zdarma</strong>, zbytek dle kalkulačky.
              Certifikované hrady pro nezapomenutelné oslavy.
            </p>
            <div className="fu d3 ctar" style={{display:"flex",gap:12}}>
              <Btn onClick={()=>go("kontakt")} size="lg">📅 Rezervovat termín</Btn>
              <Btn onClick={()=>go("hrady")} variant="ghost" size="lg">Zobrazit hrady →</Btn>
            </div>
            <div className="fu d4" style={{display:"flex",gap:22,marginTop:36,flexWrap:"wrap"}}>
              {[["EN 14960-1:2019","CE certifikát"],["3 – 13 let","Věk dětí"],["10 km zdarma","Pak dle kalkulačky"]].map(([v,l])=>(
                <div key={l} style={{borderLeft:"3px solid rgba(167,139,250,.55)",paddingLeft:12}}>
                  <div style={{color:"#fff",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:15}}>{v}</div>
                  <div style={{color:"rgba(255,255,255,.48)",fontSize:12}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:26,left:"50%",transform:"translateX(-50%)",
          display:"flex",gap:8,zIndex:10}}>
          {slides.map((_,i)=>(
            <button key={i} onClick={()=>setHeroI(i)} aria-label={`Snímek ${i+1}`}
              style={{width:i===heroI?26:8,height:8,borderRadius:9999,
                background:i===heroI?P:"rgba(255,255,255,.28)",border:"none",
                cursor:"pointer",transition:"all .3s"}}/>
          ))}
        </div>
      </section>

      <TrustBar/>

      {/* JAK TO FUNGUJE */}
      <section className="sec" style={{padding:"80px 5%",background:BG}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Chip>Jak to funguje</Chip>
            <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:900,color:TX,marginTop:14,letterSpacing:-1}}>Pronájem bez starostí</h2>
            <p style={{color:MUT,fontSize:16,marginTop:10,maxWidth:420,margin:"10px auto 0"}}>Celý proces zvládnete za pár minut. O zbytek se staráme my.</p>
          </div>
          <div className="col4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
            {[["01","📞","Zavolejte / napište","Domluvte termín a místo. Odpovídáme rychle."],
              ["02","📅","Potvrďte rezervaci","Zašleme smlouvu a potvrzení termínu."],
              ["03","🚚","Přijedeme & instalujeme","Hrad nainstalujeme, předáme pokyny."],
              ["04","🎉","Užívejte oslavu","Po akci vše odvezeme. Vy jen slavte."]].map(([n,icon,title,desc])=>(
              <div key={n} style={{background:SRF,borderRadius:18,padding:"26px 20px",
                border:`1px solid ${BRD}`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:14,right:14,fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:48,fontWeight:900,color:PL,lineHeight:1,userSelect:"none"}}>{n}</div>
                <span style={{fontSize:30,display:"block",marginBottom:14}}>{icon}</span>
                <h3 style={{fontWeight:800,fontSize:15,color:TX,marginBottom:7}}>{title}</h3>
                <p style={{color:MUT,fontSize:13,lineHeight:1.65}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEZPEČNOST + CERTIFIKACE */}
      <section className="sec" style={{padding:"80px 5%",background:SRFL}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div style={{borderRadius:22,overflow:"hidden",boxShadow:"0 20px 52px rgba(0,0,0,.11)",position:"relative"}}>
              <img src={I_GEM4} alt="Certifikovaný skákací hrad HopHrad – bezpečnost na prvním místě"
                style={{width:"100%",aspectRatio:"4/3",objectFit:"cover"}} loading="lazy"/>
              <div style={{position:"absolute",inset:0,
                background:"linear-gradient(to top,rgba(0,0,0,.6) 35%,transparent)",
                display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:22}}>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {["EN 14960-1:2019","ISO 9001:2015","PVC Terpaulin 1000D"].map(t=>(
                    <span key={t} style={{background:"rgba(255,255,255,.16)",backdropFilter:"blur(8px)",
                      color:"#fff",padding:"5px 10px",borderRadius:9999,fontSize:11,fontWeight:700,
                      border:"1px solid rgba(255,255,255,.24)"}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Chip>Materiál & certifikace</Chip>
              <h2 style={{fontSize:"clamp(24px,3.5vw,38px)",fontWeight:900,color:TX,margin:"14px 0",letterSpacing:-.5}}>
                Nejlepší zábava.<br/>Maximální bezpečnost.
              </h2>
              <p style={{color:MUT,lineHeight:1.75,marginBottom:16,fontSize:15}}>
                Nafukovací skákací hrady HopHrad jsou vyrobeny z prémiového materiálu{" "}
                <strong>PVC Terpaulin 1000D</strong> — nejpevnějšího materiálu pro nafukovací atrakce.
                Je ohnivzdorný, netoxický, bezolovnatý a odolný UV záření i vodě.
              </p>
              <p style={{color:MUT,lineHeight:1.75,marginBottom:22,fontSize:15}}>
                Splňujeme evropskou normu <strong>EN 14960-1:2019</strong> a výrobní standard{" "}
                <strong>ISO 9001:2015</strong>, které garantují maximální bezpečnost při pronájmu
                nafukovacích atrakcí v celé EU.
              </p>
              <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:22}}>
                {[["🔥","Ohnivzdorné"],["🌿","Netoxické"],["☀️","UV odolné"],["💧","Voděodolné"]].map(([icon,lbl])=>(
                  <div key={lbl} style={{display:"flex",alignItems:"center",gap:10,
                    background:SRF,borderRadius:12,padding:"11px 13px",border:`1px solid ${BRD}`}}>
                    <span style={{fontSize:20}}>{icon}</span>
                    <span style={{fontWeight:700,fontSize:13,color:TX}}>{lbl}</span>
                  </div>
                ))}
              </div>
              {/* Certifikát — otevřít v novém okně */}
              <CertLink/>
            </div>
          </div>
        </div>
      </section>

      {/* LEGO SPOTLIGHT */}
      <section style={{padding:"80px 5%",background:"#0f0a1e",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:380,height:380,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(124,58,237,.26),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div>
              <Chip bg="rgba(196,181,253,.18)" color="#c4b5fd">Naše hvězda</Chip>
              <h2 style={{fontSize:"clamp(30px,5vw,54px)",fontWeight:900,color:"#fff",
                margin:"14px 0 14px",letterSpacing:-1.5}}>🧱 LEGO Hrad</h2>
              <p style={{color:"rgba(255,255,255,.68)",fontSize:15,lineHeight:1.72,marginBottom:24}}>
                Nafukovací hrad s motivem LEGO — skluzavka, překážky, skákací plocha.
                Pro věk 3–13 let. Průhledné sítě pro nepřetržitý dohled rodičů.
              </p>
              <div className="prow" style={{display:"flex",alignItems:"baseline",gap:16,marginBottom:26,
                background:"rgba(255,255,255,.06)",borderRadius:14,padding:"16px 18px",flexWrap:"wrap"}}>
                <div>
                  <div style={{color:"rgba(255,255,255,.42)",fontSize:11,fontWeight:700,
                    textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Cena od</div>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:40,
                    fontWeight:900,color:"#c4b5fd",letterSpacing:-2}}>3 000 Kč</span>
                  <span style={{color:"rgba(255,255,255,.42)",fontSize:13,marginLeft:6}}>/den (všední)</span>
                </div>
                <div style={{borderLeft:"1px solid rgba(255,255,255,.12)",paddingLeft:16}}>
                  <div style={{color:"#c4b5fd",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:20}}>5 000 Kč</div>
                  <div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>víkend / svátek</div>
                </div>
              </div>
              <div style={{background:"rgba(167,139,250,.12)",borderRadius:12,padding:"11px 15px",marginBottom:22}}>
                <p style={{color:"rgba(255,255,255,.6)",fontSize:13,lineHeight:1.65}}>
                  ✓ Instalace zdarma &nbsp;·&nbsp; ✓ Prvních 10 km zdarma &nbsp;·&nbsp; ✓ 2. den −25 %
                </p>
              </div>
              <div className="ctar" style={{display:"flex",gap:10}}>
                <Btn onClick={()=>go("kontakt")}>📅 Rezervovat LEGO Hrad</Btn>
                <Btn onClick={()=>go("hrady")} variant="ghost">Galerie →</Btn>
              </div>
            </div>
            <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 32px 72px rgba(0,0,0,.5)"}}>
              <img src={I_HRAD5} alt="LEGO skákací hrad HopHrad – pronájem Liberec Jablonec nad Nisou"
                style={{width:"100%",aspectRatio:"4/3",objectFit:"cover"}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* KALKULAČKA DOPRAVY */}
      <section className="sec" style={{padding:"80px 5%",background:BG}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}}>
            <div>
              <Chip>Doprava</Chip>
              <h2 style={{fontSize:"clamp(26px,3.5vw,40px)",fontWeight:900,color:TX,
                margin:"14px 0 14px",letterSpacing:-.5}}>
                Prvních 10 km zdarma
              </h2>
              <p style={{color:MUT,lineHeight:1.75,marginBottom:20,fontSize:15}}>
                Záleží nám na tom, aby pronájem byl dostupný pro co nejvíce rodin.
                Proto prvních <strong>10 km od Liberce</strong> neplatíte za dopravu vůbec.
                Za každý další kilometr účtujeme přesnou cenu dle kalkulačky — žádné skryté poplatky.
              </p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10,marginBottom:26}}>
                {["Dovoz hradu na místo","Instalace a zprovoznění","Deinstalace a odvoz po akci"].map(item=>(
                  <li key={item} style={{display:"flex",alignItems:"center",gap:10,
                    background:SRFL,borderRadius:12,padding:"11px 14px",border:`1px solid ${BRD}`,fontSize:14,color:TX}}>
                    <span style={{color:GFG,fontWeight:900}}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <div style={{background:GBG,borderRadius:13,padding:"13px 16px",
                display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>📍</span>
                <p style={{fontSize:13,color:"#1a4731",lineHeight:1.5}}>
                  <strong>Provozní oblast:</strong> Liberec, Jablonec n.N. a okolí do 10 km zdarma.
                  Vzdálenější místa dle kalkulačky.
                </p>
              </div>
            </div>
            <KalkulackaDopravy/>
          </div>
        </div>
      </section>

      {/* CENÍK */}
      <section className="sec" style={{padding:"80px 5%",background:SRFL}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <Chip>Ceník</Chip>
            <h2 style={{fontSize:"clamp(26px,4vw,42px)",fontWeight:900,color:TX,marginTop:14,letterSpacing:-1}}>
              Transparentní ceny, žádná překvapení
            </h2>
          </div>
          <div className="col3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:14}}>
            {[
              {label:"Všední den",price:"3 000",unit:"Kč / den",icon:"📅",note:"Pondělí – Čtvrtek",featured:false},
              {label:"Víkend / Svátek",price:"5 000",unit:"Kč / den",icon:"🎉",note:"Pátek – Neděle, svátky",featured:true},
              {label:"2. den v řadě",price:"−25 %",unit:"sleva z ceny",icon:"💡",note:"Při rezervaci 2+ po sobě",featured:false},
            ].map(({label,price,unit,icon,note,featured})=>(
              <div key={label} style={{background:featured?P:SRF,borderRadius:20,padding:"30px 24px",
                textAlign:"center",border:featured?"none":`1px solid ${BRD}`,
                boxShadow:featured?"0 14px 36px rgba(124,58,237,.3)":"0 2px 10px rgba(0,0,0,.04)"}}>
                <span style={{fontSize:34,display:"block",marginBottom:14}}>{icon}</span>
                <div style={{color:featured?"rgba(255,255,255,.7)":MUT,fontSize:11,fontWeight:700,
                  letterSpacing:1.2,textTransform:"uppercase",marginBottom:8}}>{label}</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:40,fontWeight:900,
                  color:featured?"#fff":P,letterSpacing:-2,lineHeight:1}}>{price}</div>
                <div style={{color:featured?"rgba(255,255,255,.6)":MUT,fontSize:13,marginTop:5,marginBottom:14}}>{unit}</div>
                <div style={{background:featured?"rgba(255,255,255,.14)":SRFM,borderRadius:9999,
                  padding:"5px 14px",display:"inline-block",fontSize:12,
                  color:featured?"rgba(255,255,255,.72)":MUT,fontWeight:700}}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{background:SRFM,borderRadius:14,padding:"16px 22px",display:"flex",
            alignItems:"center",gap:12,flexWrap:"wrap",border:`1px solid ${PLM}`}}>
            <span style={{fontSize:20}}>ℹ️</span>
            <p style={{color:MUT,fontSize:14,lineHeight:1.6}}>
              <strong style={{color:TX}}>V ceně vždy:</strong> instalace zdarma. Doprava: prvních 10 km od Liberce zdarma, vzdálenější místa dle kalkulačky dopravy. Uzavíráme smlouvu o krátkodobém pronájmu.
            </p>
          </div>
        </div>
      </section>

      {/* PŘÍLEŽITOSTI */}
      <section className="sec" style={{padding:"80px 5%",background:BG}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div>
              <Chip>Pro každou příležitost</Chip>
              <h2 style={{fontSize:"clamp(24px,3.5vw,38px)",fontWeight:900,color:TX,margin:"14px 0 22px",letterSpacing:-.5}}>
                Kde se nás hodí objednat?
              </h2>
              <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:26}}>
                {[["🎂","Narozeninové oslavy"],["🏡","Zahradní party"],
                  ["🏫","Školy a školky"],["🏃","Sportovní akce"],
                  ["🏢","Firemní eventy"],["🎪","Městské slavnosti"]].map(([icon,lbl])=>(
                  <div key={lbl} style={{display:"flex",alignItems:"center",gap:10,
                    background:SRF,padding:"11px 13px",borderRadius:12,border:`1px solid ${BRD}`}}>
                    <span style={{fontSize:18}}>{icon}</span>
                    <span style={{fontWeight:700,fontSize:13}}>{lbl}</span>
                  </div>
                ))}
              </div>
              <Btn onClick={()=>go("kontakt")}>📅 Poptat pronájem</Btn>
            </div>
            <div style={{position:"relative"}}>
              <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 18px 50px rgba(0,0,0,.10)"}}>
                <img src={I_GEM2} alt="Děti na nafukovacím hradě HopHrad na narozeninové oslavě"
                  style={{width:"100%",aspectRatio:"4/3",objectFit:"cover"}} loading="lazy"/>
              </div>
              <div style={{position:"absolute",bottom:-16,left:-16,background:P,color:"#fff",
                padding:"14px 20px",borderRadius:16,boxShadow:"0 8px 22px rgba(124,58,237,.4)"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:30,fontWeight:900}}>3 – 13</div>
                <div style={{fontSize:12,opacity:.84,fontWeight:600}}>let věk dětí</div>
              </div>
              <div style={{position:"absolute",top:-14,right:-14,background:SRF,
                border:`1px solid ${BRD}`,padding:"11px 16px",borderRadius:14,
                boxShadow:"0 6px 18px rgba(0,0,0,.07)"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:18,color:TX}}>5 × 5 m</div>
                <div style={{fontSize:11,color:MUT}}>Rozměr hradu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENZE */}
      <section className="sec" style={{padding:"80px 5%",background:SRFL}}>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
          <Chip>Zákazníci říkají</Chip>
          <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:TX,margin:"14px 0 6px",letterSpacing:-.5}}>
            Stovky spokojených rodin —
          </h2>
          <p style={{color:MUT,fontSize:17,marginBottom:36}}>a hlavně dětí! 🎈</p>
          <div className="col3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:40}}>
            {[
              {name:"Petra K.",loc:"Liberec",text:"Skvělá služba! Hrad přivezli načas, děti byly nadšené celé odpoledne. Vřele doporučuji všem rodičům!"},
              {name:"Martin V.",loc:"Jablonec n. N.",text:"Profesionální přístup, instalace proběhla bez problémů. Určitě si objednáme znovu na příští narozeniny."},
              {name:"Jana H.",loc:"Liberec",text:"Narozeninová párty se povedla na jedničku. Děti skákaly celý den a odcházely s úsměvem. Perfektní!"},
            ].map(({name,loc,text})=>(
              <article key={name} style={{background:SRF,borderRadius:18,padding:"22px 20px",
                border:`1px solid ${BRD}`,textAlign:"left"}}>
                <div style={{display:"flex",gap:2,marginBottom:12}}>
                  {[...Array(5)].map((_,i)=><span key={i} style={{fontSize:13}}>⭐</span>)}
                </div>
                <blockquote>
                  <p style={{color:MUT,lineHeight:1.72,fontSize:14,marginBottom:14,fontStyle:"italic"}}>„{text}"</p>
                  <footer>
                    <cite style={{fontWeight:800,color:TX,fontSize:14,fontStyle:"normal"}}>{name}</cite>
                    <span style={{color:FAINT,fontSize:13,marginLeft:6}}>— {loc}</span>
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{padding:"80px 5%",background:BG}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <Chip>Nejčastější dotazy</Chip>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:TX,marginTop:14,letterSpacing:-.5}}>
              Máte otázky? Máme odpovědi.
            </h2>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {faqs.map(([q,a],i)=>(
              <div key={i} style={{background:SRF,borderRadius:13,
                border:`1px solid ${openFaq===i?P:BRD}`,overflow:"hidden",transition:"border .18s"}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{
                  width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"15px 18px",background:"none",border:"none",cursor:"pointer",gap:12}}>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,
                    fontSize:14,color:TX,textAlign:"left"}}>{q}</span>
                  <span style={{fontSize:20,color:P,flexShrink:0,transition:"transform .18s",
                    transform:openFaq===i?"rotate(45deg)":"none",lineHeight:1}}>+</span>
                </button>
                {openFaq===i&&(
                  <div style={{padding:"0 18px 16px",animation:"fadeUp .2s ease"}}>
                    <p style={{color:MUT,fontSize:14,lineHeight:1.72}}>{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"68px 5%",background:SRFL}}>
        <div style={{maxWidth:860,margin:"0 auto",
          background:"linear-gradient(135deg,#f0e9ff 0%,#fce4f3 100%)",
          borderRadius:26,padding:"60px 5%",textAlign:"center"}}>
          <span style={{fontSize:46,display:"block",marginBottom:14}}>🎉</span>
          <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:"clamp(22px,4vw,38px)",fontWeight:900,color:TX,marginBottom:12,letterSpacing:-.5}}>
            Připraveni na skvělou oslavu?
          </h2>
          <p style={{color:MUT,fontSize:16,lineHeight:1.7,maxWidth:420,margin:"0 auto 28px"}}>
            Rezervujte termín ještě dnes. Fungujeme v Liberci, Jablonci nad Nisou a okolí.
          </p>
          <div className="ctar" style={{display:"flex",justifyContent:"center",gap:12}}>
            <Btn onClick={()=>go("kontakt")} size="lg">📅 Chci rezervovat termín</Btn>
            <Btn onClick={()=>go("hrady")} size="lg"
              s={{background:"rgba(124,58,237,.09)",border:`1px solid ${PLM}`,color:PD,boxShadow:"none"}}>
              Prohlédnout hrady
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}

// Celá karta hradů je klikatelná (ne jen tlačítko dole)
function CastleCard({img,name,price,size,capacity,tag,tagBg,tagColor,desc,onDetail,disabled}){
  const [hov,setHov]=useState(false);
  const handleClick=()=>{ if(!disabled&&onDetail) onDetail(); };
  return(
    <article
      onClick={handleClick}
      onMouseEnter={()=>!disabled&&setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{borderRadius:20,overflow:"hidden",background:SRF,border:`1px solid ${BRD}`,
        transition:"transform .22s, box-shadow .22s",
        cursor:disabled?"default":"pointer",
        transform:hov?"translateY(-5px)":"none",
        opacity:disabled?0.65:1,
        boxShadow:hov?"0 16px 38px rgba(124,58,237,.15)":"0 3px 10px rgba(0,0,0,.05)"}}>
      <div style={{position:"relative",aspectRatio:"4/3",overflow:"hidden"}}>
        <img src={img} alt={`${name} – pronájem skákacího hradu Liberec`} loading="lazy"
          style={{width:"100%",height:"100%",objectFit:"cover",
            transition:"transform .5s",transform:hov?"scale(1.07)":"scale(1)",
            filter:disabled?"grayscale(0.4)":"none"}}/>
        {tag&&<span style={{position:"absolute",top:11,left:11,background:tagBg||PL,color:tagColor||P,
          fontSize:11,fontWeight:800,padding:"4px 10px",borderRadius:9999,
          fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{tag}</span>}
        {price&&!disabled&&<div style={{position:"absolute",bottom:11,right:11,
          background:"rgba(255,255,255,.92)",backdropFilter:"blur(8px)",
          padding:"4px 11px",borderRadius:9999,fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontWeight:900,fontSize:15,color:P}}>{price} Kč<span style={{fontSize:11,color:MUT}}>/den</span></div>}
      </div>
      <div style={{padding:"17px 18px 18px"}}>
        <h3 style={{fontSize:17,fontWeight:800,color:disabled?MUT:TX,marginBottom:6}}>{name}</h3>
        <p style={{color:MUT,fontSize:13,lineHeight:1.6,marginBottom:disabled?0:13}}>{desc}</p>
        {!disabled&&size&&(
          <div style={{display:"flex",gap:14,fontSize:12,color:MUT,fontWeight:700,marginBottom:14}}>
            <span>📐 {size}</span><span>👥 {capacity}</span>
          </div>
        )}
        {!disabled&&(
          <div style={{width:"100%",padding:"10px",borderRadius:10,textAlign:"center",
            background:hov?P:SRFM,color:hov?"#fff":TX,
            fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:13,
            transition:"all .18s"}}>
            {hov?"Zobrazit detail →":"Detail hradu"}
          </div>
        )}
        {disabled&&(
          <div style={{marginTop:12,textAlign:"center",fontSize:13,color:FAINT,fontStyle:"italic"}}>
            Brzy v nabídce…
          </div>
        )}
      </div>
    </article>
  );
}

function Hrady({go}){
  const [detail,setDetail]=useState(false);
  const [img,setImg]=useState(0);
  const gallery=[I_HRAD5,I_HRAD3,I_HRAD1,I_HRAD2,I_IMG3474,I_IMG3422,I_IMG3458];
  const openDetail=()=>{setDetail(true);setImg(0);window.scrollTo({top:0,behavior:"smooth"})};
  const closeDetail=()=>{setDetail(false);window.scrollTo({top:0,behavior:"smooth"})};

  if(detail) return(
    <main id="main" style={{paddingTop:88,background:BG,minHeight:"100vh"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"36px 5% 80px"}}>
        <button onClick={closeDetail} style={{display:"inline-flex",alignItems:"center",gap:7,
          background:"none",border:`1px solid ${BRD}`,cursor:"pointer",padding:"7px 16px",
          borderRadius:9999,fontSize:13,color:MUT,fontWeight:600,marginBottom:26}}>
          ← Zpět na katalog
        </button>
        <div className="galgrid" style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:50,alignItems:"start"}}>
          <div>
            <div style={{borderRadius:18,overflow:"hidden",aspectRatio:"4/3",marginBottom:10,
              boxShadow:"0 14px 40px rgba(0,0,0,.11)"}}>
              <img src={gallery[img]} alt={`LEGO skákací hrad – fotografie ${img+1}`}
                style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {gallery.map((src,i)=>(
                <button key={i} onClick={()=>setImg(i)} aria-label={`Foto ${i+1}`}
                  style={{width:62,height:48,borderRadius:8,overflow:"hidden",cursor:"pointer",
                    border:`2px solid ${i===img?P:"transparent"}`,
                    opacity:i===img?1:.5,transition:"all .18s"}}>
                  <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
              <span style={{background:GBG,color:GFG,padding:"3px 11px",borderRadius:9999,fontWeight:800,fontSize:12}}>✓ Dostupný</span>
              <span style={{background:PL,color:PD,padding:"3px 11px",borderRadius:9999,fontWeight:800,fontSize:12}}>CE EN 14960-1:2019</span>
            </div>
            <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(28px,4.5vw,42px)",
              fontWeight:900,color:TX,marginBottom:8,letterSpacing:-1}}>🧱 LEGO Hrad</h1>
            <p style={{color:MUT,marginBottom:20,fontSize:14,lineHeight:1.72}}>
              Nafukovací skákací hrad s motivem LEGO — skluzavka, překážky, skákací plocha.
              Pro děti 3–13 let. Průhledné sítě pro nepřetržitý dohled rodičů.
            </p>
            <div className="prow" style={{display:"flex",alignItems:"baseline",gap:16,marginBottom:18,
              background:SRFM,borderRadius:14,padding:"14px 17px",flexWrap:"wrap",border:`1px solid ${PLM}`}}>
              <div>
                <div style={{fontSize:11,color:FAINT,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Cena od</div>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:36,fontWeight:900,color:P,letterSpacing:-2}}>3 000 Kč</span>
                <span style={{color:FAINT,fontSize:13,marginLeft:5}}>/den (Po–Čt)</span>
              </div>
              <div style={{borderLeft:`1px solid ${BRD}`,paddingLeft:14}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:20,fontWeight:900,color:TX}}>5 000 Kč</span>
                <div style={{color:FAINT,fontSize:12}}>víkend / svátek</div>
              </div>
            </div>
            {/* Specifikace — váha 120 kg, kapacita až 10 dětí, sleva 25 % */}
            <div className="col2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[["📐 Velikost","5 × 5 m"],["📏 Výška","4 m"],["👶 Věk","3–13 let"],
                ["👥 Kapacita","až 10 dětí"],["⚖️ Váha","120 kg"],["🔄 2. den","−25 % sleva"]].map(([l,v])=>(
                <div key={l} style={{background:SRFL,borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:11,color:FAINT,fontWeight:700,marginBottom:2}}>{l}</div>
                  <div style={{fontWeight:800,color:TX,fontSize:14}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{background:GBG,borderRadius:12,padding:"12px 15px",marginBottom:9}}>
              <div style={{fontWeight:800,color:GFG,marginBottom:6,fontSize:13}}>✓ V ceně pronájmu:</div>
              {["Hrad + fukar",
                "Instalace zdarma",
                "Doprava: prvních 10 km od Liberce zdarma, pak dle kalkulačky",
                "Odvoz po akci zdarma"].map(item=>(
                <div key={item} style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:4,fontSize:13,color:"#1a4731"}}>
                  <span style={{color:GFG,fontWeight:700,flexShrink:0}}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{background:YBG,borderRadius:12,padding:"10px 15px",marginBottom:18,fontSize:13,color:YFG,lineHeight:1.6}}>
              📌 <strong>Vy zajistíte:</strong> příjezd k místu, el. připojení 230 V, pomoc jedné dospělé osoby.
            </div>
            <div className="ctar" style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:28}}>
              <Btn onClick={()=>go("kontakt")}>📅 Rezervovat LEGO Hrad</Btn>
              <Btn href="tel:+420774351097" variant="dark">📞 Zavolat</Btn>
            </div>
            {/* Certifikát — nové okno */}
            <div style={{marginBottom:28}}>
              <a href={I_CERT} target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:7,background:PL,
                  color:PD,padding:"9px 16px",borderRadius:10,fontWeight:800,fontSize:13,
                  border:`1px solid ${PLM}`,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                📄 Zobrazit CE certifikát EN 14960
              </a>
            </div>
            {/* Kalkulačka dopravy v detailu */}
            <KalkulackaDopravy/>
          </div>
        </div>
      </div>
    </main>
  );

  return(
    <main id="main" style={{paddingTop:88,background:BG,minHeight:"100vh"}}>
      <header style={{maxWidth:1200,margin:"0 auto",padding:"38px 5% 30px"}}>
        <Chip>Katalog hradů – Liberec & okolí</Chip>
        <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(34px,6vw,60px)",
          fontWeight:900,color:TX,letterSpacing:-1.5,margin:"14px 0 10px"}}>
          Pronájem skákacích hradů
        </h1>
        <p style={{color:MUT,fontSize:16,maxWidth:520,lineHeight:1.7}}>
          Certifikované nafukovací hrady pro narozeninové oslavy, zahradní party, školy i firemní akce.
        </p>
      </header>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 5% 80px"}}>
        {/* Banner "dostupný" odstraněn dle požadavku */}
        <div className="col3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          <CastleCard img={I_HRAD5} name="🧱 LEGO Hrad" price="3 000" size="5×5 m" capacity="až 10 dětí"
            tag="✓ Dostupný" tagBg={GBG} tagColor={GFG}
            desc="Skluzavka, překážky, skákací plocha. Pro věk 3–13 let."
            onDetail={openDetail} disabled={false}/>
          <CastleCard img={I_GEM3} name="🐉 Drak (připravujeme)" price={null} size={null} capacity={null}
            tag="🔜 Připravujeme" tagBg={YBG} tagColor={YFG}
            desc="Nová atrakce brzy v nabídce. Sledujte nás!"
            onDetail={null} disabled={true}/>
          <CastleCard img={I_GEM2} name="🏴‍☠️ Pirát (připravujeme)" price={null} size={null} capacity={null}
            tag="🔜 Připravujeme" tagBg={YBG} tagColor={YFG}
            desc="Pirátský hrad s motivem moře a dobrodružství. Brzy!"
            onDetail={null} disabled={true}/>
        </div>
      </div>
    </main>
  );
}

function Kontakt({go}){
  const [sent,setSent]=useState(false);
  const [mistoAkce,setMistoAkce]=useState("");
  const submit=e=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),5000)};
  const inputStyle={width:"100%",background:SRFL,border:`1px solid ${BRD}`,borderRadius:10,
    padding:"12px 13px",fontSize:14,outline:"none",transition:"border .15s",boxSizing:"border-box"};
  const fi=e=>{e.target.style.border=`1px solid ${P}`};
  const fo=e=>{e.target.style.border=`1px solid ${BRD}`};
  return(
    <main id="main" style={{paddingTop:88,background:BG,minHeight:"100vh"}}>
      <header style={{background:"linear-gradient(135deg,#1a0533 0%,#2d0b4e 60%,#1a1a2e 100%)",
        padding:"62px 5% 78px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:260,height:260,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(124,58,237,.3),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <Chip bg="rgba(196,181,253,.18)" color="#c4b5fd">Plánujete oslavu?</Chip>
          <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:"clamp(34px,6vw,60px)",fontWeight:900,color:"#fff",
            letterSpacing:-1.5,margin:"14px 0 10px"}}>
            Rezervace pronájmu<br/><span style={{color:"#c4b5fd"}}>skákacího hradu</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.58)",fontSize:17,maxWidth:440,lineHeight:1.7,marginBottom:24}}>
            Pro každý pronájem uzavíráme smlouvu o krátkodobém pronájmu movité věci.
          </p>
          <div className="ctar" style={{display:"flex",gap:11}}>
            <Btn href="tel:+420774351097" size="md">📞 +420 774 351 097</Btn>
            <Btn href="mailto:info@hophrad.cz" variant="ghost" size="md">✉️ info@hophrad.cz</Btn>
          </div>
        </div>
      </header>

      {/* Kalkulačka dopravy — na kontaktu omezena na max 680px */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"52px 5% 0"}}>
        <div style={{marginBottom:10}}>
          <Chip>Krok 1 — Zjistěte cenu dopravy</Chip>
        </div>
        {/* maxWidth:680 zabraňuje přílišné šířce na velkých obrazovkách */}
        <div style={{maxWidth:680}}>
          <KalkulackaDopravy/>
        </div>
      </div>

      <div id="kontakt-formular" className="kgrid" style={{maxWidth:1200,margin:"0 auto",
        padding:"40px 5% 70px",display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:42,alignItems:"start"}}>
        <section>
          <div style={{marginBottom:8}}>
            <Chip>Krok 2 — Odešlete poptávku</Chip>
          </div>
          <div style={{background:SRF,borderRadius:22,padding:"36px 32px",
            boxShadow:"0 16px 50px rgba(0,0,0,.05)",border:`1px solid ${BRD}`}}>
            <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:22,fontWeight:800,
              marginBottom:24,display:"flex",alignItems:"center",gap:10}}>📅 Rezervační formulář</h2>
            {sent?(
              <div style={{background:GBG,borderRadius:16,padding:"28px 22px",textAlign:"center"}}>
                <span style={{fontSize:44,display:"block",marginBottom:12}}>✅</span>
                <h3 style={{color:GFG,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:19,fontWeight:800}}>Odesláno!</h3>
                <p style={{color:"#166534aa",marginTop:8,fontSize:14}}>Ozveme se vám co nejdříve.</p>
              </div>
            ):(
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Jméno a příjmení</label>
      <input name="user_name" required type="text" placeholder="Jan Novák" autoComplete="name" style={inputStyle} onFocus={fi} onBlur={fo} />
    </div>
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>E-mail</label>
      <input name="user_email" required type="email" placeholder="jan@example.cz" autoComplete="email" style={inputStyle} onFocus={fi} onBlur={fo} />
    </div>
  </div>
  <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Telefon</label>
      <input name="user_phone" type="tel" placeholder="+420 774 351 097" autoComplete="tel" style={inputStyle} onFocus={fi} onBlur={fo} />
    </div>
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Datum akce</label>
      <input name="action_date" required type="date" min={new Date().toISOString().split("T")[0]} style={inputStyle} onFocus={fi} onBlur={fo} />
    </div>
  </div>
  {/* Kolonka Místo akce — name="action_place" zajistí přenos do e-mailu */}
  <div>
    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>
      Místo akce
      <span style={{ fontWeight: 400, color: FAINT, marginLeft: 6 }}>(vyplňte z kalkulačky výše nebo ručně)</span>
    </label>
    <input
      name="action_place"
      type="text"
      id="misto-akce"
      value={mistoAkce}
      onChange={e => setMistoAkce(e.target.value)}
      placeholder="Ulice a číslo, město, PSČ"
      style={inputStyle}
      onFocus={fi}
      onBlur={fo}
    />
  </div>
  <div>
    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Zpráva (počet dětí, speciální požadavky…)</label>
    <textarea name="message" rows={4} placeholder="Počet dětí, speciální požadavky..."
      style={{ ...inputStyle, resize: "vertical", borderRadius: 10 }} onFocus={fi} onBlur={fo} />
  </div>
  <div className="ctar" style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 2, flexWrap: "wrap" }}>
    {/* Tlačítko teď reaguje na stav loading */}
    <Btn disabled={loading}>
      {loading ? "Odesílám..." : "Odeslat poptávku →"}
    </Btn>
    <span style={{ color: FAINT, fontSize: 13 }}>✅ Odpovídáme rychle</span>
  </div>
</form>
            )}
          </div>
        </section>

        <aside style={{display:"flex",flexDirection:"column",gap:11}}>
          {[
            ["📞","Zavolejte nám",<a key="t" href="tel:+420774351097" style={{color:P,fontWeight:800,fontSize:17}}>+420 774 351 097</a>],
            ["✉️","Napište nám",<a key="e" href="mailto:info@hophrad.cz" style={{color:P,fontWeight:800,fontSize:16}}>info@hophrad.cz</a>],
          ].map(([icon,title,content])=>(
            <div key={title} style={{background:SRF,borderRadius:13,padding:"14px 16px",
              display:"flex",alignItems:"flex-start",gap:12,border:`1px solid ${BRD}`}}>
              <div style={{width:38,height:38,borderRadius:10,background:PL,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{icon}</div>
              <div>
                <p style={{fontSize:11,fontWeight:700,color:FAINT,letterSpacing:.5,marginBottom:3,textTransform:"uppercase"}}>{title}</p>
                {content}
              </div>
            </div>
          ))}
          <div style={{background:PL,borderRadius:13,padding:"14px 16px",border:`1px solid ${PLM}`}}>
            <h3 style={{fontWeight:800,color:PD,marginBottom:7,fontSize:13,
              display:"flex",alignItems:"center",gap:6}}>🛡️ Certifikát bezpečnosti</h3>
            <p style={{fontSize:13,color:MUT,lineHeight:1.65,marginBottom:10}}>
              Splňuje <strong>EN 14960-1:2019</strong> a <strong>ISO 9001:2015</strong>.
              PVC Terpaulin 1000D.
            </p>
            {/* Certifikát — nové okno */}
            <a href={I_CERT} target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:5,color:P,fontWeight:700,fontSize:13}}>
              📄 Zobrazit CE certifikát
            </a>
          </div>
          <div style={{background:SRFM,borderRadius:13,padding:"14px 16px",border:`1px solid ${PLM}`}}>
            <h3 style={{fontWeight:800,color:PD,marginBottom:7,fontSize:13}}>🚚 Doprava</h3>
            <p style={{fontSize:13,color:MUT,lineHeight:1.65}}>
              Prvních <strong>10 km od Liberce zdarma</strong>. Vzdálenější místa dle kalkulačky dopravy výše.
            </p>
          </div>
          <p style={{color:FAINT,fontSize:12,lineHeight:1.72,paddingTop:2}}>
            IČO: 21356220 · Tobiáš Novák<br/>
            Při každém pronájmu uzavíráme smlouvu o krátkodobém pronájmu movité věci.
          </p>
        </aside>
      </div>
    </main>
  );
}

function GdprPage({go}){
  const Section=({title,children})=>(
    <section style={{marginBottom:40}}>
      <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:20,fontWeight:800,
        color:TX,marginBottom:16,paddingBottom:10,borderBottom:`2px solid ${PL}`}}>{title}</h2>
      {children}
    </section>
  );
  const Right=({title,text})=>(
    <div style={{background:SRFL,borderRadius:14,padding:"16px 20px",marginBottom:12,
      borderLeft:`4px solid ${P}`,borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
      <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,fontWeight:800,color:P,marginBottom:6}}>{title}</h3>
      <p style={{color:MUT,fontSize:14,lineHeight:1.7}}>{text}</p>
    </div>
  );
  const lawList=["Zákon č. 563/1992 Sb. o účetnictví","Zákon č. 235/2004 Sb. o dani z přidané hodnoty",
    "Zákon č. 112/2016 Sb. o evidenci tržeb","Zákon č. 586/1992 Sb. o daních z příjmů",
    "Zákon č. 353/2003 Sb. o spotřebních daních","Zákon č. 280/2009 Sb. daňový řád",
    "Zákon č. 254/2004 Sb. o omezení plateb v hotovosti",
    "Zákon č. 253/2008 Sb. o opatřeních proti legalizaci výnosů z trestné činnosti"];
  const rights=[
    ["Právo odvolat souhlas – čl. 13","Souhlas lze kdykoli odvolat, aniž by tím byla dotčena zákonnost dříve provedeného zpracování."],
    ["Právo na informace – čl. 13","Máte právo obdržet informace o tom, jak zpracováváme vaše osobní údaje."],
    ["Právo na přístup – čl. 15","Máte právo získat potvrzení, zda jsou vaše osobní údaje zpracovávány, a pokud ano, získat k nim přístup."],
    ["Právo na opravu – čl. 16","Máte právo na opravu nepřesných osobních údajů a doplnění neúplných údajů."],
    ["Právo na výmaz (být zapomenut) – čl. 17","Máte právo požádat o bezodkladný výmaz osobních údajů, které se vás týkají."],
    ["Právo na omezení zpracování – čl. 18","Ve vymezených případech máte právo požádat o omezení zpracování vašich osobních údajů."],
    ["Oznamovací povinnost – čl. 19","Správce oznamuje příjemcům veškeré opravy, výmazy nebo omezení zpracování osobních údajů."],
    ["Právo na přenositelnost – čl. 20","Máte právo obdržet své osobní údaje ve strukturovaném, strojově čitelném formátu."],
    ["Právo vznést námitku – čl. 21","Máte právo kdykoli vznést námitku proti zpracování vašich osobních údajů."],
    ["Právo nebýt předmětem automatizovaného rozhodování – čl. 22","Máte právo nebýt předmětem rozhodnutí založeného výhradně na automatizovaném zpracování."],
    ["Právo podat stížnost – čl. 77","Máte právo podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ)."],
  ];
  const kodex=["Osobní údaje shromažďujeme výhradně od zákazníků a kontaktních osob v rámci smluvního vztahu.",
    "Nikdy jsme nezískávali ani nebudeme získávat kontakty nelegální cestou.",
    "Námi získané osobní údaje budeme chránit a nebudeme je nezákonně postupovat třetím stranám.",
    "Osobní údaje budou chránit naši zaměstnanci s podepsanou mlčenlivostí.",
    "Data nebudou předávána mimo EU.",
    "Budeme respektovat veškerá práva subjektů osobních údajů.",
    "Výmaz budeme realizovat bezodkladně — data budou anonymizována.",
    "Plníme informační povinnosti vůči subjektům v souladu s čl. 13 GDPR."];
  return(
    <main id="main" style={{paddingTop:88,background:BG,minHeight:"100vh"}}>
      <div style={{background:"linear-gradient(135deg,#1a0533 0%,#2d0b4e 60%,#1a1a2e 100%)",
        padding:"56px 5% 72px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:260,height:260,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(124,58,237,.32),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:900,margin:"0 auto",position:"relative",zIndex:1}}>
          <button onClick={()=>go("home")} style={{display:"inline-flex",alignItems:"center",gap:8,
            background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.75)",
            cursor:"pointer",padding:"7px 16px",borderRadius:9999,fontSize:13,
            fontFamily:"'Manrope',sans-serif",fontWeight:600,marginBottom:24}}>
            ← Zpět na hlavní stránku
          </button>
          <Chip bg="rgba(196,181,253,.18)" color="#c4b5fd">Právní dokumenty</Chip>
          <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(30px,5vw,52px)",
            fontWeight:900,color:"#fff",letterSpacing:-1,margin:"16px 0 12px"}}>
            Obchodní podmínky<br/><span style={{color:"#c9b8ff"}}>& Ochrana osobních údajů (GDPR)</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:16,lineHeight:1.7,maxWidth:560}}>
            Tobiáš Novák · HOP HRAD · IČO: 21356220
          </p>
        </div>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"60px 5% 80px"}}>
        <div style={{background:PL,borderRadius:16,padding:"20px 24px",marginBottom:44,borderLeft:`4px solid ${P}`,borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
          <p style={{color:PD,fontSize:15,lineHeight:1.75,fontWeight:600}}>
            Dnem 25. 5. 2018 nabývá účinnosti Nařízení GDPR Evropského parlamentu a Rady (EU) 2016/679
            o ochraně fyzických osob v souvislosti se zpracováním osobních údajů.
          </p>
        </div>
        <Section title="I. Shromažďování osobních údajů">
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:800,color:TX,marginBottom:12}}>
            1) Plnění právní povinnosti – čl. 6 odst. 1 písm. c)
          </h3>
          <p style={{color:MUT,fontSize:15,lineHeight:1.75,marginBottom:16}}>Shromažďujeme osobní údaje nezbytné pro splnění zákonných povinností:</p>
          <ul style={{listStyle:"none",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:22}} className="gdpr-grid">
            {lawList.map(law=>(
              <li key={law} style={{display:"flex",alignItems:"flex-start",gap:8,background:SRFL,
                borderRadius:10,padding:"10px 14px",fontSize:13,color:MUT,lineHeight:1.5}}>
                <span style={{color:P,fontWeight:800,flexShrink:0}}>§</span>{law}
              </li>
            ))}
          </ul>
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:800,color:TX,marginBottom:12,marginTop:16}}>
            2) Oprávněný zájem správce – čl. 6 odst. 1 písm. f)
          </h3>
          <p style={{color:MUT,fontSize:14,lineHeight:1.75,marginBottom:16}}>
            Shromažďujeme kontaktní osoby zákazníků pro zákonné CRM a plnění smluvních závazků.
            Subjekt má právo kdykoli odmítnout zasílání obchodních sdělení.
          </p>
          <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:800,color:TX,marginBottom:12}}>
            3) Souhlas – čl. 6 odst. 1 písm. a)
          </h3>
          <p style={{color:MUT,fontSize:14,lineHeight:1.75}}>
            V ostatních případech vždy vyžadujeme výslovný souhlas, který lze kdykoli odvolat.
          </p>
        </Section>
        <Section title="II. Způsob zpracování osobních údajů">
          <p style={{color:MUT,fontSize:15,lineHeight:1.75}}>
            Osobní údaje zpracováváme manuálně i automatizovaně. Máme zavedena technická a organizační
            opatření pro přiměřenou úroveň zabezpečení. S každým zpracovatelem je uzavřena zpracovatelská smlouva dle čl. 28 GDPR.
            Data nejsou předávána mimo EU.
          </p>
        </Section>
        <Section title="III. Mlčenlivost">
          <div style={{background:"linear-gradient(135deg,#f0ecff,#fce4f3)",borderRadius:16,padding:"22px 26px"}}>
            <p style={{color:TX,fontSize:15,lineHeight:1.8}}>
              K osobním údajům přistupují výhradně osoby podléhající{" "}
              <strong>prohlášení o mlčenlivosti po dobu 10 let</strong> od ukončení spolupráce.
              Všechny osoby jsou pravidelně proškolovány, minimálně jednou ročně.
            </p>
          </div>
        </Section>
        <Section title="IV. Vaše práva (dle Nařízení GDPR)">
          <div style={{display:"grid",gap:9}}>
            {rights.map(([title,text])=><Right key={title} title={title} text={text}/>)}
          </div>
        </Section>
        <Section title="V. Náš kodex">
          <ol style={{listStyle:"none",display:"grid",gap:9}}>
            {kodex.map((item,i)=>(
              <li key={i} style={{display:"flex",gap:14,alignItems:"flex-start",
                background:SRFL,borderRadius:12,padding:"13px 17px"}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,
                  fontSize:17,color:P,flexShrink:0,lineHeight:1.2}}>{i+1}.</span>
                <p style={{color:MUT,fontSize:14,lineHeight:1.7}}>{item}</p>
              </li>
            ))}
          </ol>
        </Section>
        <div style={{background:"#111",borderRadius:20,padding:"30px 32px",
          display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
          <div>
            <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:800,color:"#fff",marginBottom:6}}>Dotazy ohledně GDPR?</h3>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:14}}>Tobiáš Novák · HOP HRAD · IČO: 21356220</p>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <Btn href="mailto:info@hophrad.cz" size="sm">✉️ info@hophrad.cz</Btn>
            <Btn href="tel:+420774351097" size="sm"
              s={{background:"rgba(255,255,255,.1)",boxShadow:"none",border:"1px solid rgba(255,255,255,.2)"}}>
              📞 774 351 097
            </Btn>
          </div>
        </div>
      </div>
    </main>
  );
}

function Footer({go}){
  const links=[["Domů","home"],["Hrady","hrady"],["Kontakt","kontakt"]];
  return(
    <footer style={{background:"#0f0a1e",color:"#fff",padding:"56px 5% 34px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div className="fgrid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.2fr",gap:40,marginBottom:40}}>
          <div>
            <div style={{marginBottom:14}}>
              <img src={I_LOGO} alt="HopHrad logo"
                style={{height:52,width:"auto",objectFit:"contain",mixBlendMode:"screen"}}/>
            </div>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:14,lineHeight:1.8}}>
              Pronájem nafukovacích skákacích hradů v&nbsp;Liberci a okolí.
              Přivezeme, nainstalujeme — vy si jen užíváte.
            </p>
          </div>
          <nav>
            <h3 style={{color:"rgba(255,255,255,.28)",fontSize:11,fontWeight:800,letterSpacing:2,
              textTransform:"uppercase",marginBottom:16}}>Navigace</h3>
            <ul style={{listStyle:"none"}}>
              {links.map(([l,p])=>(
                <li key={p} style={{marginBottom:10}}>
                  <button onClick={()=>go(p)} style={{background:"none",border:"none",cursor:"pointer",
                    color:"rgba(255,255,255,.55)",fontSize:14,fontFamily:"'Manrope',sans-serif",fontWeight:600}}>{l}</button>
                </li>
              ))}
            </ul>
          </nav>
          <address style={{fontStyle:"normal"}}>
            <h3 style={{color:"rgba(255,255,255,.28)",fontSize:11,fontWeight:800,letterSpacing:2,
              textTransform:"uppercase",marginBottom:16}}>Kontakt</h3>
            <a href="tel:+420774351097" style={{display:"block",color:"rgba(255,255,255,.55)",fontSize:14,marginBottom:8}}>📞 +420 774 351 097</a>
            <a href="mailto:info@hophrad.cz" style={{display:"block",color:"rgba(255,255,255,.55)",fontSize:14,marginBottom:8}}>✉️ info@hophrad.cz</a>
            <p style={{color:"rgba(255,255,255,.35)",fontSize:13,marginTop:7}}>IČO: 21356220</p>
          </address>
          <div>
            <h3 style={{color:"rgba(255,255,255,.28)",fontSize:11,fontWeight:800,letterSpacing:2,
              textTransform:"uppercase",marginBottom:16}}>Certifikát</h3>
            {/* Certifikát — otevřít v novém okně */}
            <a href={I_CERT} target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(124,58,237,.2)",
                color:"#c4b5fd",border:"1px solid rgba(124,58,237,.35)",padding:"9px 14px",
                borderRadius:12,fontSize:13,fontWeight:700,marginBottom:10,width:"100%"}}>
              📄 CE Certifikát EN 14960
            </a>
            <p style={{color:"rgba(255,255,255,.28)",fontSize:12,lineHeight:1.7}}>EN 14960-1:2019<br/>ISO 9001:2015</p>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:20,
          display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,alignItems:"center"}}>
          <small style={{color:"rgba(255,255,255,.28)",fontSize:12}}>
            © 2026 HopHrad.cz – Pronájem skákacích hradů Liberec · Tobiáš Novák · IČO: 21356220
          </small>
          <button onClick={()=>go("gdpr")} style={{background:"none",border:"none",cursor:"pointer",
            color:"rgba(255,255,255,.35)",fontSize:12,fontFamily:"'Manrope',sans-serif",
            textDecoration:"underline",textUnderlineOffset:3}}>
            Obchodní podmínky & GDPR
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function App(){
  const [page,setPage]=useState("home");
  const go=p=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"})};

  useEffect(()=>{
    let el=document.getElementById("hophrad-css");
    if(!el){el=document.createElement("style");el.id="hophrad-css";document.head.appendChild(el);}
    el.textContent=CSS;
    return()=>{try{el.remove()}catch(e){}};
  },[]);

  useEffect(()=>{
    let el=document.getElementById("hophrad-ld");
    if(!el){el=document.createElement("script");el.id="hophrad-ld";el.type="application/ld+json";document.head.appendChild(el);}
    el.text=JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",
      "name":"HopHrad – Pronájem skákacích hradů Liberec",
      "description":"Pronájem nafukovacích skákacích hradů Liberec a okolí. Prvních 10 km zdarma. CE certifikát EN 14960-1:2019.",
      "url":"https://hophrad.cz","telephone":"+420774351097","email":"info@hophrad.cz",
      "areaServed":["Liberec","Jablonec nad Nisou"],"priceRange":"3000-5000 Kč/den",
      "taxID":"21356220"});
    return()=>{try{el.remove()}catch(e){}};
  },[]);

  return(
    <>
      <a href="#main" style={{position:"absolute",left:-9999,top:8,zIndex:9999,
        background:P,color:"#fff",padding:"8px 14px",borderRadius:8,fontWeight:700,fontSize:13}}
        onFocus={e=>{e.target.style.left="8px"}}
        onBlur={e=>{e.target.style.left="-9999px"}}>
        Přejít na obsah
      </a>
      <NavBar page={page} go={go}/>
      {page==="home"    && <Home    go={go}/>}
      {page==="hrady"   && <Hrady   go={go}/>}
      {page==="kontakt" && <Kontakt go={go}/>}
      {page==="gdpr"    && <GdprPage go={go}/>}
      <Footer go={go}/>
    </>
  );
}