import { useState, useEffect, useRef } from "react";

const P = "#7C3AED", PD = "#5B21B6", PL = "#EDE9FE", PLM = "#DDD6FE";
const BG = "#FAFAFA", SRF = "#FFFFFF", SRFL = "#F7F5FF", SRFM = "#F0EDFD";
const TX = "#18181B", MUT = "#52525B", FAINT = "#A1A1AA", BRD = "#E4E0F5";
const GBG = "#DCFCE7", GFG = "#166534", YBG = "#FEF3C7", YFG = "#92400E";

const HERO = "https://lh3.googleusercontent.com/aida-public/AB6AXuBbwHXlp1PacT9aSVk6zxO__lKDSLS5-VFHafv8DKX1O-7QysKk60Zywm9omZ6UtDj6UFzWY_YNrksl_qFbJm85-rjNjYJhZJO5aY3kmlSPWp6ltaXL07ia-jFx-Jux9cSbNZhAloXT_CCIessCc4aAc39MAwCCKQeu5C2hKO7kapRyYDSAcMp1azR8pkpiKPN4G5PNgppbIy4Fe4UKs5U4_wyQeDZwHrWgC-gYLmY8ZilKuh-iyRyO0oeTKIMrCXBzXbyDHt30vHo";
const LEGO1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDZMQ18wUnPDtzXAGLXJhBwz53OlC8jUq_uaXsQDdH6hvca_03WFY2uUQtYFTV78-N77Rb9ZIXBAqyLubr2biTLM8LCUXgBCuVtFnFSzrYqZmlE5oY7fSr6vnXeLV5T_b4DZf9ttQrHHSaEEIHmP-AthlwdpzwvwpGz8Ff4d_RD53H79K-_7L6ia4igXFACa-qfmKkLZ6b1Gv8CZoRHeGq-n7U7h1BvRl9ZBthCoscbHW4ip4iycyQ5XjySuMzjLdS1TiC2HvG9ouE";
const LEGO2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAiAJuSInWOAxZtM9XcpdCPwpSj8C1pS5TI7oy-8XYDU8dPpeihHkZbvjI474-CAGRAmzQxgnZTQI3nR957L4Ye9dccGYI6LBRkaSmeC3Iq91w3sSbjUlXju9DWjjRs131LxseqOSPiFGPtDGiHfCasFeVbYPIv1ayYaHkPxGSk_cg9XRGGgMP4uKbYXwoygKgqTWJQodjTsmievabFM6oGqfQrc1W2uc4SHhjkhh2rXnpGpRG0wE06pK7BbXeuzmeibrM0eZP5b-Q";
const CHILDREN = "https://lh3.googleusercontent.com/aida-public/AB6AXuACRdqu2mqHIAP3v-y0W_msewLvJ6TofhUL8iTm_h0WK3D3om82htmchs-c1EcRuBtIgKM2TgX027KF4nXeLs5jo8nIrPHqSt8zV8MEGEaVffg_VYR99171-o_4yxVm375h5kOYzXrJFAeFfwuUYNlex9YpM7NUSvQZadIBzFptJvlqyk6Ew58nDT9A0_npzvPNLl3EjZakLpDzhqUD-Qif55AVrBCZvtKm2yQNeoZ9SbEmcMgIXCN4v31h6UXQ8BDqZ8YsLk1ojD4";
const INSTALL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDeHmXfwI6N5vuSw8e7yrTpxfMfCLrcko37c3rEpNBIXbBnqjjUpHFCbpuhu0IhjbWHYjoTjEKVj4sdHoGWbjFTcnewseu9r-Xkrvv3ObUViPJINX9DORRgqKEtoUEFq2anGML6AVN4RLNoju5Aj2huViR2WKxfxdgJYbEB7zUsB33AzZCKTCP6nX5e3jqZYWwL64OrxcGcEx_-n1Zk_WdFypPMqGyPW54NlGZwGfqi5FOlNNMgPAHJxD-lRmQDLJGV_k6JCeVuc9s";
const POHAD = "https://lh3.googleusercontent.com/aida-public/AB6AXuACzlHS8oaDlL5CH4iF8dlanxzLiTs_cVBXrtkkvCmkukirN1VzB88FXYr0HUYEDHjo7b44dCGyjGZ5t0-3VVrOt6o9fXz7ECpbvZu2t5ud9GSyYGritp7AjeV4q7JZEGzcisWQi38TQmRoA8_Ki2XxEYTxtv3NjGqYzSDh15gnhoyOFQNEHqXTbLFEz-rqvMreQFB7FsdyuRgH1m816HAQaVIb0lLHpELGV5qu2qzGBgFmgRMubMpCX1ShngWVrC54JpRYbcZ45sc";
const SAFARI = "https://lh3.googleusercontent.com/aida-public/AB6AXuBHmFwiHoKBtA4MVpDbem9wQ6YmWmEOVmlO1bmnjbf7PJSnRrm2cn6WxY518OkS37DnzKR6NB7MhFhpoUjWILP0z1IUphoga81v55UqpqUtyywGZr9F_j7CLibwKPBPoKchI3flaTo-C-4afvz7YIVMDlst8X-aYGITcb1o2coLb74CkSqB8q1-qxakRjCctyHNO177bfqO3dORMw2PvmWNpSLpNDfADeZ6uCUfo9R5I_d4aJ90kq3G07vCvKJTq3JPUdHvlOtAQXg";

const CSS = `
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
  .dlink{display:none!important}
  .dbtn{display:none!important}
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
}
@media(max-width:520px){
  .col3{grid-template-columns:1fr!important}
  .col4{grid-template-columns:1fr!important}
  .fgrid{grid-template-columns:1fr!important}
}
`;

function useScroll(threshold = 50) {
  const [val, setVal] = useState(false);
  useEffect(() => {
    const fn = () => setVal(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return val;
}

function Btn({ children, onClick, href, variant = "primary", size = "md", full, s = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    border: "none", cursor: "pointer", borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 800, transition: "transform .15s, box-shadow .15s",
    ...(full ? { width: "100%" } : {}),
    ...(size === "lg" ? { padding: "16px 38px", fontSize: 16 } :
        size === "sm" ? { padding: "8px 16px", fontSize: 13 } : { padding: "12px 26px", fontSize: 14 }),
    ...(variant === "primary" ? { background: P, color: "#fff", boxShadow: `0 5px 18px rgba(124,58,237,.35)` } :
        variant === "ghost"   ? { background: "rgba(255,255,255,.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,.25)", boxShadow: "none" } :
        variant === "dark"    ? { background: "#111", color: "#fff", boxShadow: "none" } :
        variant === "outline" ? { background: "transparent", color: P, border: `1.5px solid ${P}`, boxShadow: "none" } :
                                { background: SRFM, color: TX, boxShadow: "none", border: `1px solid ${BRD}` }),
    ...s,
  };
  const enter = e => { e.currentTarget.style.transform = "scale(1.04)"; };
  const leave = e => { e.currentTarget.style.transform = "scale(1)"; };
  if (href) return <a href={href} style={base} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button style={base} onClick={onClick} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
}

function Chip({ children, bg = PL, color = PD }) {
  return <span style={{ display: "inline-block", background: bg, color, fontWeight: 800, fontSize: 11,
    letterSpacing: 1.5, padding: "5px 14px", borderRadius: 9999, textTransform: "uppercase",
    fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{children}</span>;
}

function NavBar({ page, go }) {
  const solid = useScroll(50);
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [page]);

  const onHero = page === "home" && !solid;
  const links = [["Domů","home"],["Hrady","hrady"],["Kontakt","kontakt"]];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      background: solid ? "rgba(250,250,250,.97)" : "transparent",
      backdropFilter: solid ? "blur(18px)" : "blur(0px)",
      borderBottom: solid ? `1px solid ${BRD}` : "none",
      boxShadow: solid ? "0 2px 16px rgba(124,58,237,.07)" : "none",
      transition: "all .3s",
    }}>
      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: P, borderRadius: 9, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 17 }}>🏰</div>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 20,
            color: onHero ? "#fff" : P, letterSpacing: -0.5, transition: "color .3s" }}>HopHrad</span>
        </button>

        <ul className="dlink" style={{ display: "flex", gap: 2, listStyle: "none" }}>
          {links.map(([l,p]) => (
            <li key={p}><button onClick={() => go(p)} style={{
              background: page===p ? (onHero?"rgba(255,255,255,.15)":PL) : "transparent",
              color: page===p ? (onHero?"#fff":P) : (onHero?"rgba(255,255,255,.82)":MUT),
              border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 9999,
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, transition: "all .15s"
            }}>{l}</button></li>
          ))}
        </ul>

        <span className="dbtn"><Btn onClick={() => go("kontakt")} size="sm">📅 Rezervovat</Btn></span>

        <button className="hmenu" onClick={() => setOpen(o=>!o)} aria-label={open?"Zavřít":"Menu"}>
          {[0,1,2].map(i => <span key={i} style={{
            display: "block", width: 22, height: 2.5, borderRadius: 2, transition: "all .22s",
            background: onHero ? "#fff" : TX,
            transform: open ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none") : "none",
            opacity: open && i===1 ? 0 : 1,
          }}/>)}
        </button>
      </nav>

      {open && (
        <div style={{ background: "rgba(250,250,250,.98)", backdropFilter: "blur(20px)",
          borderTop: `1px solid ${BRD}`, padding: "12px 5% 20px", animation: "slideDown .2s ease" }}>
          {links.map(([l,p]) => (
            <button key={p} onClick={() => go(p)} style={{ display: "block", width: "100%",
              textAlign: "left", background: page===p ? PL : "transparent",
              color: page===p ? P : TX, border: "none", cursor: "pointer",
              padding: "12px 14px", borderRadius: 10, marginBottom: 4,
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15 }}>{l}</button>
          ))}
          <Btn onClick={() => go("kontakt")} full s={{ marginTop: 8, justifyContent: "center" }}>📅 Rezervovat termín</Btn>
        </div>
      )}
    </header>
  );
}

function TrustBar() {
  const items = [["🛡️","CE certifikát EN 14960","Bezpečnost ověřena"],["🚚","Doprava ZDARMA","Liberec & Jablonec n.N."],["🏗️","Instalace ZDARMA","My vše připravíme"],["⭐","100% spokojených","Stovky šťastných rodin"]];
  return (
    <div style={{ background: P }}>
      <ul className="col4" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)", listStyle: "none" }}>
        {items.map(([icon,title,sub],i) => (
          <li key={i} style={{ padding: "13px 8px 13px 0",
            borderRight: i<3 ? "1px solid rgba(255,255,255,.14)" : "none",
            display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <div>
              <strong style={{ display: "block", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 800 }}>{title}</strong>
              <span style={{ color: "rgba(255,255,255,.65)", fontSize: 11 }}>{sub}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home({ go }) {
  const [heroI, setHeroI] = useState(0);
  const slides = [
    { src: HERO, alt: "Nafukovací skákací hrad HopHrad v zahradě – pronájem Liberec" },
    { src: LEGO1, alt: "LEGO skákací hrad – pronájem Liberec a Jablonec nad Nisou" },
    { src: CHILDREN, alt: "Děti si hrají na certifikovaném skákacím hradě HopHrad" },
  ];
  useEffect(() => {
    const t = setInterval(() => setHeroI(i => (i+1) % slides.length), 5200);
    return () => clearInterval(t);
  }, []);
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    ["Co je v ceně pronájmu?","Doprava, instalace i odvoz hradu — v oblasti Liberec a Jablonec nad Nisou vše zcela zdarma. Přivezeme, nainstalujeme a po akci odvezeme."],
    ["Co potřebuji zajistit?","Příjezd k místu konání, elektrické připojení 230 V (standardní zásuvka) a pomoc jedné dospělé osoby při předávání hradu."],
    ["Jak rychle odepíšete na poptávku?","Snažíme se odpovědět co nejdříve. V sezóně (jaro–léto) doporučujeme rezervovat s předstihem 2–3 týdnů."],
    ["Lze hrad použít i na veřejné akci?","Ano! Dodáváme hrady na firemní eventy, školní dny, městské slavnosti i soukromé narozeninové oslavy."],
    ["Co se stane při špatném počasí?","Mírný déšť nevadí. Při bouřce a silném větru (nad 6 Beaufort) je z bezpečnostních důvodů nutné provoz přerušit."],
    ["Jaký věk je pro hrad vhodný?","Naše hrady jsou určeny pro děti od 3 do 13 let. Vždy zajistěte dohled dospělé osoby."],
  ];

  return (
    <main id="main">
      <section style={{ position: "relative", minHeight: "100vh", display: "flex",
        alignItems: "center", overflow: "hidden", background: "#0f0a1e" }}>
        {slides.map((s,i) => (
          <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity 1.2s ease", opacity: i===heroI?1:0 }}>
            <img src={s.src} alt={s.alt} loading={i===0?"eager":"lazy"}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.32)",
                animation: "heroPan 18s ease-in-out infinite" }} />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#fafafa 0%,rgba(250,250,250,.05) 38%,transparent 72%)" }} />
        <div style={{ position: "relative", zIndex: 5, maxWidth: 1200, margin: "0 auto", padding: "120px 5% 100px", width: "100%" }}>
          <div style={{ maxWidth: 680 }}>
            <h1 className="hero-h1 fu d1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(44px,8vw,88px)", fontWeight: 900, color: "#fff",
              lineHeight: 1.02, letterSpacing: -3, marginBottom: 20 }}>
              Pronájem<br/>skákacích<br/>
              <span style={{ backgroundImage: "linear-gradient(135deg,#c4b5fd,#a78bfa,#e879f9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                hradů Liberec
              </span>
            </h1>
            <p className="fu d2" style={{ color: "rgba(255,255,255,.74)", fontSize: 18, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
              Přivezeme, nainstalujeme a odvezeme. <strong style={{ color: "#fff" }}>Doprava i montáž zdarma</strong> po celém okrese. Certifikované hrady pro nezapomenutelná narozeniny.
            </p>
            <div className="fu d3 ctar" style={{ display: "flex", gap: 12 }}>
              <Btn onClick={() => go("kontakt")} size="lg">📅 Rezervovat termín</Btn>
              <Btn onClick={() => go("hrady")} variant="ghost" size="lg">Zobrazit hrady →</Btn>
            </div>
            <div className="fu d4" style={{ display: "flex", gap: 22, marginTop: 36, flexWrap: "wrap" }}>
              {[["EN 14960-1:2019","CE certifikát"],["3 – 13 let","Věk dětí"],["Liberec & Jablonec","Oblast zdarma"]].map(([v,l]) => (
                <div key={l} style={{ borderLeft: "3px solid rgba(167,139,250,.55)", paddingLeft: 12 }}>
                  <div style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15 }}>{v}</div>
                  <div style={{ color: "rgba(255,255,255,.48)", fontSize: 12 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
          {slides.map((_,i) => (
            <button key={i} onClick={() => setHeroI(i)} aria-label={`Snímek ${i+1}`}
              style={{ width: i===heroI?26:8, height: 8, borderRadius: 9999,
                background: i===heroI ? P : "rgba(255,255,255,.28)", border: "none", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
      </section>

      <TrustBar />

      {/* JAK TO FUNGUJE */}
      <section className="sec" style={{ padding: "80px 5%", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Chip>Jak to funguje</Chip>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: TX, marginTop: 14, letterSpacing: -1 }}>Pronájem bez starostí</h2>
            <p style={{ color: MUT, fontSize: 16, marginTop: 10, maxWidth: 420, margin: "10px auto 0" }}>Celý proces zvládnete za pár minut. O zbytek se staráme my.</p>
          </div>
          <div className="col4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {[["01","📞","Zavolejte / napište","Domluvte termín a místo. Odpovídáme rychle."],
              ["02","📅","Potvrďte rezervaci","Zašleme smlouvu a potvrzení termínu."],
              ["03","🚚","Přijedeme & instalujeme","Hrad nainstalujeme zdarma, předáme pokyny."],
              ["04","🎉","Užívejte oslavu","Po akci vše odvezeme. Vy se staráte jen o radost."]].map(([n,icon,title,desc]) => (
              <div key={n} style={{ background: SRF, borderRadius: 18, padding: "26px 20px",
                border: `1px solid ${BRD}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 14, right: 14, fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 48, fontWeight: 900, color: PL, lineHeight: 1, userSelect: "none" }}>{n}</div>
                <span style={{ fontSize: 30, display: "block", marginBottom: 14 }}>{icon}</span>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: TX, marginBottom: 7 }}>{title}</h3>
                <p style={{ color: MUT, fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEZPEČNOST */}
      <section className="sec" style={{ padding: "80px 5%", background: SRFL }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ borderRadius: 22, overflow: "hidden", boxShadow: "0 20px 52px rgba(0,0,0,.11)", position: "relative" }}>
              <img src={CHILDREN} alt="Certifikovaný skákací hrad – bezpečný provoz pro děti Liberec"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} loading="lazy" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.6) 35%,transparent)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 22 }}>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {["EN 14960-1:2019","ISO 9001:2015","PVC Terpaulin 1000D"].map(t => (
                    <span key={t} style={{ background: "rgba(255,255,255,.16)", backdropFilter: "blur(8px)", color: "#fff",
                      padding: "5px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700,
                      border: "1px solid rgba(255,255,255,.24)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Chip>Bezpečnost & certifikace</Chip>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, color: TX, margin: "14px 0", letterSpacing: -.5 }}>
                Vaše děti jsou v bezpečí
              </h2>
              <p style={{ color: MUT, lineHeight: 1.75, marginBottom: 22, fontSize: 15 }}>
                Všechny nafukovací hrady splňují <strong>EN 14960-1:2019</strong> a <strong>ISO 9001:2015</strong>.
                Materiál PVC Terpaulin 1000D — ohnivzdorný, netoxický a UV odolný.
              </p>
              <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 26 }}>
                {[["🔥","Ohnivzdorné"],["🌿","Netoxické & bezolovnaté"],["☀️","UV odolné"],["💧","Voděodolné"]].map(([icon,lbl]) => (
                  <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 10,
                    background: SRF, borderRadius: 12, padding: "11px 13px", border: `1px solid ${BRD}` }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: TX }}>{lbl}</span>
                  </div>
                ))}
              </div>
              <Btn onClick={() => go("kontakt")}>📅 Rezervovat certifikovaný hrad</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* LEGO SPOTLIGHT */}
      <section style={{ padding: "80px 5%", background: "#0f0a1e", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(124,58,237,.26),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <Chip bg="rgba(196,181,253,.18)" color="#c4b5fd">Naše hvězda</Chip>
              <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 900, color: "#fff",
                margin: "14px 0 14px", letterSpacing: -1.5 }}>🧱 LEGO Hrad</h2>
              <p style={{ color: "rgba(255,255,255,.68)", fontSize: 15, lineHeight: 1.72, marginBottom: 24 }}>
                Nafukovací hrad s motivem LEGO — skluzavka, překážky, skákací plocha. Pro věk 3–13 let.
                Průhledné sítě pro nepřetržitý dohled rodičů.
              </p>
              <div className="prow" style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 26,
                background: "rgba(255,255,255,.06)", borderRadius: 14, padding: "16px 18px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,.42)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Cena od</div>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 40, fontWeight: 900, color: "#c4b5fd", letterSpacing: -2 }}>3 000 Kč</span>
                  <span style={{ color: "rgba(255,255,255,.42)", fontSize: 13, marginLeft: 6 }}>/den (všední)</span>
                </div>
                <div style={{ borderLeft: "1px solid rgba(255,255,255,.12)", paddingLeft: 16 }}>
                  <div style={{ color: "#c4b5fd", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20 }}>5 000 Kč</div>
                  <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12 }}>víkend / svátek</div>
                </div>
              </div>
              <div style={{ background: "rgba(167,139,250,.12)", borderRadius: 12, padding: "11px 15px", marginBottom: 22 }}>
                <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13, lineHeight: 1.65 }}>
                  ✓ Doprava zdarma &nbsp;·&nbsp; ✓ Instalace zdarma &nbsp;·&nbsp; ✓ 2. den −50 %
                </p>
              </div>
              <div className="ctar" style={{ display: "flex", gap: 10 }}>
                <Btn onClick={() => go("kontakt")}>📅 Rezervovat LEGO Hrad</Btn>
                <Btn onClick={() => go("hrady")} variant="ghost">Galerie →</Btn>
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 72px rgba(0,0,0,.5)" }}>
              <img src={LEGO1} alt="LEGO skákací hrad HopHrad – pronájem Liberec Jablonec nad Nisou"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CENÍK */}
      <section className="sec" style={{ padding: "80px 5%", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Chip>Ceník</Chip>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: TX, marginTop: 14, letterSpacing: -1 }}>
              Transparentní ceny, žádná překvapení
            </h2>
          </div>
          <div className="col3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 16 }}>
            {[
              { label: "Všední den", price: "3 000", unit: "Kč / den", icon: "📅", note: "Pondělí – Čtvrtek", featured: false },
              { label: "Víkend / Svátek", price: "5 000", unit: "Kč / den", icon: "🎉", note: "Pátek – Neděle, svátky", featured: true },
              { label: "2. den v řadě", price: "−50 %", unit: "sleva z ceny", icon: "💡", note: "Při rezervaci 2+ po sobě", featured: false },
            ].map(({ label, price, unit, icon, note, featured }) => (
              <div key={label} style={{ background: featured ? P : SRF, borderRadius: 20, padding: "30px 24px", textAlign: "center",
                border: featured ? "none" : `1px solid ${BRD}`,
                boxShadow: featured ? "0 14px 36px rgba(124,58,237,.3)" : "0 2px 10px rgba(0,0,0,.04)" }}>
                <span style={{ fontSize: 34, display: "block", marginBottom: 14 }}>{icon}</span>
                <div style={{ color: featured?"rgba(255,255,255,.7)":MUT, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 40, fontWeight: 900, color: featured?"#fff":P, letterSpacing: -2, lineHeight: 1 }}>{price}</div>
                <div style={{ color: featured?"rgba(255,255,255,.6)":MUT, fontSize: 13, marginTop: 5, marginBottom: 14 }}>{unit}</div>
                <div style={{ background: featured?"rgba(255,255,255,.14)":SRFM, borderRadius: 9999, padding: "5px 14px",
                  display: "inline-block", fontSize: 12, color: featured?"rgba(255,255,255,.72)":MUT, fontWeight: 700 }}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{ background: SRFM, borderRadius: 14, padding: "16px 22px", display: "flex",
            alignItems: "center", gap: 12, flexWrap: "wrap", border: `1px solid ${PLM}` }}>
            <span style={{ fontSize: 20 }}>ℹ️</span>
            <p style={{ color: MUT, fontSize: 14, lineHeight: 1.6 }}>
              <strong style={{ color: TX }}>V ceně vždy:</strong> doprava, instalace i odvoz — zdarma v celém okrese Liberec a Jablonec n.N. Uzavíráme smlouvu o krátkodobém pronájmu.
            </p>
          </div>
        </div>
      </section>

      {/* PŘÍLEŽITOSTI + OBLAST */}
      <section className="sec" style={{ padding: "80px 5%", background: SRFL }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <Chip>Pro každou příležitost</Chip>
              <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, color: TX, margin: "14px 0 22px", letterSpacing: -.5 }}>
                Kde se nás hodí objednat?
              </h2>
              <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 26 }}>
                {[["🎂","Narozeninové oslavy"],["🏡","Zahradní party"],["🏫","Školy a školky"],["🏃","Sportovní akce"],["🏢","Firemní eventy"],["🎪","Městské slavnosti"]].map(([icon,lbl]) => (
                  <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 10,
                    background: SRF, padding: "11px 13px", borderRadius: 12, border: `1px solid ${BRD}` }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{lbl}</span>
                  </div>
                ))}
              </div>
              <Btn onClick={() => go("kontakt")}>📅 Poptat pronájem</Btn>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 50px rgba(0,0,0,.10)" }}>
                <img src={INSTALL} alt="Profesionální instalace nafukovacího hradu v zahradě"
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} loading="lazy" />
              </div>
              <div style={{ position: "absolute", bottom: -16, left: -16, background: P, color: "#fff",
                padding: "14px 20px", borderRadius: 16, boxShadow: "0 8px 22px rgba(124,58,237,.4)" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 900 }}>3 – 13</div>
                <div style={{ fontSize: 12, opacity: .84, fontWeight: 600 }}>let věk dětí</div>
              </div>
              <div style={{ position: "absolute", top: -14, right: -14, background: SRF,
                border: `1px solid ${BRD}`, padding: "11px 16px", borderRadius: 14,
                boxShadow: "0 6px 18px rgba(0,0,0,.07)" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 18, color: TX }}>5 × 5 m</div>
                <div style={{ fontSize: 11, color: MUT }}>Rozměr hradu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENZE */}
      <section className="sec" style={{ padding: "80px 5%", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <Chip>Zákazníci říkají</Chip>
          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, color: TX, margin: "14px 0 40px", letterSpacing: -.5 }}>
            Stovky spokojených rodin
          </h2>
          <div className="col3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 40 }}>
            {[
              { name: "Petra K.", loc: "Liberec", text: "Skvělá služba! Hrad přivezli načas, děti byly nadšené celé odpoledne. Vřele doporučuji všem rodičům!" },
              { name: "Martin V.", loc: "Jablonec n. N.", text: "Profesionální přístup, instalace proběhla bez problémů. Určitě si objednáme znovu na příští narozeniny." },
              { name: "Jana H.", loc: "Liberec", text: "Narozeninová párty se povedla na jedničku. Děti skákaly celý den a odcházely s úsměvem. Perfektní!" },
            ].map(({ name, loc, text }) => (
              <article key={name} style={{ background: SRF, borderRadius: 18, padding: "22px 20px",
                border: `1px solid ${BRD}`, textAlign: "left" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(5)].map((_,i) => <span key={i} style={{ fontSize: 13 }}>⭐</span>)}
                </div>
                <blockquote>
                  <p style={{ color: MUT, lineHeight: 1.72, fontSize: 14, marginBottom: 14, fontStyle: "italic" }}>„{text}"</p>
                  <footer>
                    <cite style={{ fontWeight: 800, color: TX, fontSize: 14, fontStyle: "normal" }}>{name}</cite>
                    <span style={{ color: FAINT, fontSize: 13, marginLeft: 6 }}>— {loc}</span>
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ padding: "80px 5%", background: SRFL }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Chip>Nejčastější dotazy</Chip>
            <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, color: TX, marginTop: 14, letterSpacing: -.5 }}>
              Máte otázky? Máme odpovědi.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {faqs.map(([q,a],i) => (
              <div key={i} style={{ background: SRF, borderRadius: 13,
                border: `1px solid ${openFaq===i?P:BRD}`, overflow: "hidden", transition: "border .18s" }}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "15px 18px", background: "none", border: "none", cursor: "pointer", gap: 12 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800,
                    fontSize: 14, color: TX, textAlign: "left" }}>{q}</span>
                  <span style={{ fontSize: 20, color: P, flexShrink: 0, transition: "transform .18s",
                    transform: openFaq===i ? "rotate(45deg)" : "none", lineHeight: 1 }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding: "0 18px 16px", animation: "fadeUp .2s ease" }}>
                    <p style={{ color: MUT, fontSize: 14, lineHeight: 1.72 }}>{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "68px 5%", background: BG }}>
        <div style={{ maxWidth: 860, margin: "0 auto",
          background: "linear-gradient(135deg,#f0e9ff 0%,#fce4f3 100%)",
          borderRadius: 26, padding: "60px 5%", textAlign: "center" }}>
          <span style={{ fontSize: 46, display: "block", marginBottom: 14 }}>🎉</span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: "clamp(22px,4vw,38px)", fontWeight: 900, color: TX, marginBottom: 12, letterSpacing: -.5 }}>
            Připraveni na skvělou oslavu?
          </h2>
          <p style={{ color: MUT, fontSize: 16, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 28px" }}>
            Rezervujte termín ještě dnes. Fungujeme v Liberci, Jablonci nad Nisou a celém okolí.
          </p>
          <div className="ctar" style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Btn onClick={() => go("kontakt")} size="lg">📅 Chci rezervovat termín</Btn>
            <Btn onClick={() => go("hrady")} variant="soft" size="lg"
              s={{ background: "rgba(124,58,237,.09)", border: `1px solid ${PLM}`, color: PD, boxShadow: "none" }}>
              Prohlédnout hrady
            </Btn>
          </div>
        </div>
      </section>
    </main>
  );
}

function CastleCard({ img, name, price, size, capacity, tag, tagBg, tagColor, desc, onDetail }) {
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 20, overflow: "hidden", background: SRF, border: `1px solid ${BRD}`,
        transition: "transform .22s, box-shadow .22s",
        transform: hov ? "translateY(-5px)" : "none",
        boxShadow: hov ? "0 16px 38px rgba(124,58,237,.15)" : "0 3px 10px rgba(0,0,0,.05)" }}>
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        <img src={img} alt={`${name} – pronájem skákacího hradu Liberec`} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover",
            transition: "transform .5s", transform: hov?"scale(1.07)":"scale(1)" }} />
        {tag && <span style={{ position: "absolute", top: 11, left: 11, background: tagBg||PL, color: tagColor||P,
          fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 9999,
          fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{tag}</span>}
        {price && <div style={{ position: "absolute", bottom: 11, right: 11,
          background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)",
          padding: "4px 11px", borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 900, fontSize: 15, color: P }}>{price} Kč<span style={{ fontSize: 11, color: MUT }}>/den</span></div>}
      </div>
      <div style={{ padding: "17px 18px 18px" }}>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: TX, marginBottom: 6 }}>{name}</h3>
        <p style={{ color: MUT, fontSize: 13, lineHeight: 1.6, marginBottom: 13 }}>{desc}</p>
        {size && <div style={{ display: "flex", gap: 14, fontSize: 12, color: MUT, fontWeight: 700, marginBottom: 14 }}>
          <span>📐 {size}</span><span>👥 {capacity}</span>
        </div>}
        <button onClick={onDetail} style={{ width: "100%", padding: "10px", borderRadius: 10,
          background: hov ? P : SRFM, color: hov ? "#fff" : TX, border: "none", cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 13,
          transition: "all .18s" }}>
          {hov && price ? "Zobrazit detail →" : "Detail hradu"}
        </button>
      </div>
    </article>
  );
}

function Hrady({ go }) {
  const [detail, setDetail] = useState(false);
  const [img, setImg] = useState(0);
  const gallery = [LEGO1, LEGO2, CHILDREN, INSTALL];
  const openDetail = () => { setDetail(true); setImg(0); window.scrollTo({top:0,behavior:"smooth"}); };
  const closeDetail = () => { setDetail(false); window.scrollTo({top:0,behavior:"smooth"}); };

  if (detail) return (
    <main id="main" style={{ paddingTop: 88, background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 5% 80px" }}>
        <button onClick={closeDetail} style={{ display: "inline-flex", alignItems: "center", gap: 7,
          background: "none", border: `1px solid ${BRD}`, cursor: "pointer", padding: "7px 16px",
          borderRadius: 9999, fontSize: 13, color: MUT, fontWeight: 600, marginBottom: 26 }}>
          ← Zpět na katalog
        </button>
        <div className="galgrid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 50, alignItems: "start" }}>
          <div>
            <div style={{ borderRadius: 18, overflow: "hidden", aspectRatio: "4/3", marginBottom: 10,
              boxShadow: "0 14px 40px rgba(0,0,0,.11)" }}>
              <img src={gallery[img]} alt={`LEGO skákací hrad – fotografie ${img+1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              {gallery.map((src,i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={`Foto ${i+1}`}
                  style={{ width: 62, height: 48, borderRadius: 8, overflow: "hidden", cursor: "pointer",
                    border: `2px solid ${i===img?P:"transparent"}`,
                    opacity: i===img?1:.5, transition: "all .18s" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", gap: 7, marginBottom: 14, flexWrap: "wrap" }}>
              <span style={{ background: GBG, color: GFG, padding: "3px 11px", borderRadius: 9999, fontWeight: 800, fontSize: 12 }}>✓ Dostupný</span>
              <span style={{ background: PL, color: PD, padding: "3px 11px", borderRadius: 9999, fontWeight: 800, fontSize: 12 }}>CE EN 14960-1:2019</span>
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(28px,4.5vw,42px)",
              fontWeight: 900, color: TX, marginBottom: 8, letterSpacing: -1 }}>🧱 LEGO Hrad</h1>
            <p style={{ color: MUT, marginBottom: 20, fontSize: 14, lineHeight: 1.72 }}>
              Nafukovací skákací hrad s motivem LEGO — skluzavka, překážky, skákací plocha. Pro holky i kluky, věk 3–13 let.
              Průhledné sítě pro nepřetržitý dohled rodičů.
            </p>
            <div className="prow" style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 18,
              background: SRFM, borderRadius: 14, padding: "14px 17px", flexWrap: "wrap",
              border: `1px solid ${PLM}` }}>
              <div>
                <div style={{ fontSize: 11, color: FAINT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Cena od</div>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 36, fontWeight: 900, color: P, letterSpacing: -2 }}>3 000 Kč</span>
                <span style={{ color: FAINT, fontSize: 13, marginLeft: 5 }}>/den (Po–Čt)</span>
              </div>
              <div style={{ borderLeft: `1px solid ${BRD}`, paddingLeft: 14 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 900, color: TX }}>5 000 Kč</span>
                <div style={{ color: FAINT, fontSize: 12 }}>víkend / svátek</div>
              </div>
            </div>
            <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[["📐 Velikost","5 × 5 m"],["📏 Výška","4 m"],["👶 Věk","3–13 let"],["👥 Kapacita","8 dětí"],["⚖️ Váha","100 kg"],["🔄 2. den","−50 % sleva"]].map(([l,v]) => (
                <div key={l} style={{ background: SRFL, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: FAINT, fontWeight: 700, marginBottom: 2 }}>{l}</div>
                  <div style={{ fontWeight: 800, color: TX, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: GBG, borderRadius: 12, padding: "12px 15px", marginBottom: 9 }}>
              <div style={{ fontWeight: 800, color: GFG, marginBottom: 6, fontSize: 13 }}>✓ V ceně pronájmu:</div>
              {["Hrad + fukar","Instalace zdarma","Doprava zdarma (okres Liberec & Jablonec n.N.)","Odvoz po akci zdarma"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, fontSize: 13, color: "#1a4731" }}>
                  <span style={{ color: GFG, fontWeight: 700 }}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{ background: YBG, borderRadius: 12, padding: "10px 15px", marginBottom: 18, fontSize: 13, color: YFG, lineHeight: 1.6 }}>
              📌 <strong>Vy zajistíte:</strong> příjezd k místu, el. připojení 230 V, pomoc jedné dospělé osoby.
            </div>
            <div className="ctar" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn onClick={() => go("kontakt")}>📅 Rezervovat LEGO Hrad</Btn>
              <Btn href="tel:+420774351097" variant="dark">📞 Zavolat</Btn>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main id="main" style={{ paddingTop: 88, background: BG, minHeight: "100vh" }}>
      <header style={{ maxWidth: 1200, margin: "0 auto", padding: "38px 5% 30px" }}>
        <Chip>Katalog hradů – Liberec & Jablonec n.N.</Chip>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(34px,6vw,60px)",
          fontWeight: 900, color: TX, letterSpacing: -1.5, margin: "14px 0 10px" }}>
          Pronájem skákacích hradů
        </h1>
        <p style={{ color: MUT, fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
          Certifikované nafukovací hrady pro narozeninové oslavy, zahradní party, školy i firemní akce.
        </p>
      </header>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5% 80px" }}>
        <div style={{ background: SRFM, borderRadius: 13, padding: "13px 18px", marginBottom: 28,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          flexWrap: "wrap", border: `1px solid ${PLM}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: GFG, borderRadius: 9999, width: 8, height: 8, display: "inline-block" }} />
            <strong style={{ fontSize: 14 }}>LEGO Hrad je momentálně dostupný</strong>
          </div>
          <Btn onClick={() => go("kontakt")} size="sm">📅 Ověřit termín</Btn>
        </div>
        <div className="col3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          <CastleCard img={LEGO1} name="🧱 LEGO Hrad" price="3 000" size="5×5 m" capacity="8 dětí"
            tag="✓ Dostupný" tagBg={GBG} tagColor={GFG}
            desc="Skluzavka, překážky, skákací plocha. Pro věk 3–13 let."
            onDetail={openDetail} />
          <CastleCard img={POHAD} name="🏰 Pohádkový Zámek" price={null} size={null} capacity={null}
            tag="🔜 Připravujeme" tagBg={YBG} tagColor={YFG}
            desc="Nová atrakce brzy v nabídce. Sledujte nás!"
            onDetail={() => {}} />
          <CastleCard img={SAFARI} name="🦁 Safari Expedice" price={null} size={null} capacity={null}
            tag="🔜 Připravujeme" tagBg={YBG} tagColor={YFG}
            desc="Džunglový tematický hrad s motivy zvířat. Brzy!"
            onDetail={() => {}} />
        </div>
      </div>
    </main>
  );
}

function Kontakt({ go }) {
  const [sent, setSent] = useState(false);
  const submit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); };
  const inputStyle = { width: "100%", background: SRFL, border: `1px solid ${BRD}`, borderRadius: 10,
    padding: "12px 13px", fontSize: 14, outline: "none", transition: "border .15s" };
  const focusIn = e => { e.target.style.border = `1px solid ${P}`; };
  const focusOut = e => { e.target.style.border = `1px solid ${BRD}`; };

  return (
    <main id="main" style={{ paddingTop: 88, background: BG, minHeight: "100vh" }}>
      <header style={{ background: "linear-gradient(135deg,#1a0533 0%,#2d0b4e 60%,#1a1a2e 100%)",
        padding: "62px 5% 78px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(124,58,237,.3),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Chip bg="rgba(196,181,253,.18)" color="#c4b5fd">Plánujete oslavu?</Chip>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: "clamp(34px,6vw,60px)", fontWeight: 900, color: "#fff",
            letterSpacing: -1.5, margin: "14px 0 10px" }}>
            Rezervace pronájmu<br/><span style={{ color: "#c4b5fd" }}>skákacího hradu</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,.58)", fontSize: 17, maxWidth: 440, lineHeight: 1.7, marginBottom: 24 }}>
            Pro každý pronájem uzavíráme smlouvu o krátkodobém pronájmu movité věci.
          </p>
          <div className="ctar" style={{ display: "flex", gap: 11 }}>
            <Btn href="tel:+420774351097" size="md">📞 +420 774 351 097</Btn>
            <Btn href="mailto:info@hophrad.cz" variant="ghost" size="md">✉️ info@hophrad.cz</Btn>
          </div>
        </div>
      </header>

      <div className="kgrid" style={{ maxWidth: 1200, margin: "0 auto", padding: "54px 5% 70px",
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 42, alignItems: "start" }}>
        <section>
          <div style={{ background: SRF, borderRadius: 22, padding: "36px 32px",
            boxShadow: "0 16px 50px rgba(0,0,0,.05)", border: `1px solid ${BRD}` }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800,
              marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>📅 Rezervační formulář</h2>
            {sent ? (
              <div style={{ background: GBG, borderRadius: 16, padding: "28px 22px", textAlign: "center" }}>
                <span style={{ fontSize: 44, display: "block", marginBottom: 12 }}>✅</span>
                <h3 style={{ color: GFG, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 19, fontWeight: 800 }}>Odesláno!</h3>
                <p style={{ color: "#166534aa", marginTop: 8, fontSize: 14 }}>Ozveme se vám co nejdříve.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Jméno a příjmení</label>
                    <input required type="text" placeholder="Jan Novák" autoComplete="name" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>E-mail</label>
                    <input required type="email" placeholder="jan@example.cz" autoComplete="email" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                </div>
                <div className="col2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Telefon</label>
                    <input type="tel" placeholder="+420 774 351 097" autoComplete="tel" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Datum akce</label>
                    <input required type="date" min={new Date().toISOString().split("T")[0]} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 5 }}>Místo konání a zpráva</label>
                  <textarea rows={4} placeholder="Místo konání, počet dětí, speciální požadavky..."
                    style={{ ...inputStyle, resize: "vertical" }} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="ctar" style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 2, flexWrap: "wrap" }}>
                  <Btn>Odeslat poptávku →</Btn>
                  <span style={{ color: FAINT, fontSize: 13 }}>✅ Odpovídáme rychle</span>
                </div>
              </form>
            )}
          </div>
        </section>

        <aside style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {[
            ["📞","Zavolejte nám", <a key="t" href="tel:+420774351097" style={{ color: P, fontWeight: 800, fontSize: 17 }}>+420 774 351 097</a>],
            ["✉️","Napište nám", <a key="e" href="mailto:info@hophrad.cz" style={{ color: P, fontWeight: 800, fontSize: 16 }}>info@hophrad.cz</a>],
            ["📍","Oblast dopravy", <><strong key="s" style={{ display: "block", fontWeight: 800, fontSize: 14 }}>Liberec & Jablonec n.N.</strong><span key="ss" style={{ fontSize: 13, color: MUT }}>Celý okres — doprava zdarma</span></>],
            ["🏠","Adresa", <><strong key="a" style={{ display: "block", fontWeight: 800, fontSize: 14 }}>Pekárkova 286/24</strong><span key="aa" style={{ fontSize: 13, color: MUT }}>Liberec 460 01</span></>],
          ].map(([icon,title,content]) => (
            <div key={title} style={{ background: SRF, borderRadius: 13, padding: "14px 16px",
              display: "flex", alignItems: "flex-start", gap: 12, border: `1px solid ${BRD}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: PL,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{icon}</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: FAINT, letterSpacing: .5, marginBottom: 3, textTransform: "uppercase" }}>{title}</p>
                {content}
              </div>
            </div>
          ))}
          <div style={{ background: PL, borderRadius: 13, padding: "14px 16px", border: `1px solid ${PLM}` }}>
            <h3 style={{ fontWeight: 800, color: PD, marginBottom: 7, fontSize: 13,
              display: "flex", alignItems: "center", gap: 6 }}>🛡️ Bezpečnost na prvním místě</h3>
            <p style={{ fontSize: 13, color: MUT, lineHeight: 1.65, marginBottom: 10 }}>
              Splňuje <strong>EN 14960-1:2019</strong> a <strong>ISO 9001:2015</strong>. PVC Terpaulin 1000D.
            </p>
          </div>
          <p style={{ color: FAINT, fontSize: 12, lineHeight: 1.72, paddingTop: 2 }}>
            IČO: 21356220 · Tobiáš Novák<br/>
            Při každém pronájmu uzavíráme smlouvu o krátkodobém pronájmu movité věci.
          </p>
        </aside>
      </div>
    </main>
  );
}

function Footer({ go }) {
  const links = [["Domů","home"],["Hrady","hrady"],["Kontakt","kontakt"]];
  return (
    <footer style={{ background: "#0f0a1e", color: "#fff", padding: "58px 5% 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="fgrid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.3fr", gap: 40, marginBottom: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, background: P, borderRadius: 9, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 17 }}>🏰</div>
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 20, color: P }}>HopHrad</span>
            </div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, lineHeight: 1.8 }}>
              Pronájem nafukovacích skákacích hradů v&nbsp;okrese Liberec a Jablonec n.&nbsp;N. Přivezeme, nainstalujeme — vy si jen užíváte.
            </p>
          </div>
          <nav>
            <h3 style={{ color: "rgba(255,255,255,.28)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Navigace</h3>
            <ul style={{ listStyle: "none" }}>
              {links.map(([l,p]) => (
                <li key={p} style={{ marginBottom: 10 }}>
                  <button onClick={() => go(p)} style={{ background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,.55)", fontSize: 14, fontFamily: "'Manrope',sans-serif", fontWeight: 600 }}>{l}</button>
                </li>
              ))}
            </ul>
          </nav>
          <address style={{ fontStyle: "normal" }}>
            <h3 style={{ color: "rgba(255,255,255,.28)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Kontakt</h3>
            <a href="tel:+420774351097" style={{ display: "block", color: "rgba(255,255,255,.55)", fontSize: 14, marginBottom: 8 }}>📞 +420 774 351 097</a>
            <a href="mailto:info@hophrad.cz" style={{ display: "block", color: "rgba(255,255,255,.55)", fontSize: 14, marginBottom: 8 }}>✉️ info@hophrad.cz</a>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14 }}>📍 Pekárkova 286/24<br/>Liberec 460 01</p>
            <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13, marginTop: 7 }}>IČO: 21356220</p>
          </address>
          <div>
            <h3 style={{ color: "rgba(255,255,255,.28)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Certifikát</h3>
            <a href="mailto:info@hophrad.cz?subject=Žádost o CE certifikát"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(124,58,237,.2)",
                color: PLM, border: "1px solid rgba(124,58,237,.35)", padding: "9px 14px",
                borderRadius: 12, fontSize: 13, fontWeight: 700, marginBottom: 10, width: "100%" }}>
              📄 CE Certifikát EN 14960
            </a>
            <p style={{ color: "rgba(255,255,255,.28)", fontSize: 12, lineHeight: 1.7 }}>EN 14960-1:2019<br/>ISO 9001:2015</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 20,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <small style={{ color: "rgba(255,255,255,.28)", fontSize: 12 }}>
            © 2026 HopHrad.cz – Pronájem skákacích hradů Liberec · Tobiáš Novák · IČO: 21356220
          </small>
          <span style={{ color: "rgba(255,255,255,.28)", fontSize: 12 }}>hophrad.cz</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const go = p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => {
    let el = document.getElementById("hophrad-css");
    if (!el) { el = document.createElement("style"); el.id = "hophrad-css"; document.head.appendChild(el); }
    el.textContent = CSS;
    return () => { try { el.remove(); } catch(e){} };
  }, []);

  return (
    <>
      <a href="#main" style={{ position: "absolute", left: -9999, top: 8, zIndex: 9999,
        background: P, color: "#fff", padding: "8px 14px", borderRadius: 8, fontWeight: 700, fontSize: 13 }}
        onFocus={e => { e.target.style.left = "8px"; }}
        onBlur={e => { e.target.style.left = "-9999px"; }}>
        Přejít na obsah
      </a>
      <NavBar page={page} go={go} />
      {page === "home"    && <Home go={go} />}
      {page === "hrady"   && <Hrady go={go} />}
      {page === "kontakt" && <Kontakt go={go} />}
      <Footer go={go} />
    </>
  );
}