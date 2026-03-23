import { useState, useEffect, useRef } from "react";

const CONTACT = {
  name: "NIKOLA DAMNJANOVIĆ",
  position: "Sales Director",
  company: "EKO ELEKTROFRIGO",
  tagline: "Your partner since 1996...",
  activities: "REFRIGERATION • AIR CONDITIONING • CA ROOMS",
  primaryPhone: "+381648222606",
  primaryPhoneDisplay: "+381 64 822 26 06",
  secondaryPhone: "+381113757288",
  secondaryPhoneDisplay: "+381 11 375 72 88",
  email: "damnjanovic.nikola@eef.rs",
  website1: "https://www.eef.rs",
  website1Display: "www.eef.rs",
  website2: "https://www.ekoelektrofrigo.rs",
  website2Display: "www.ekoelektrofrigo.rs",
  address: "Svetolika Nikačevića 11",
  city: "Zemun, Belgrade",
  whatsapp:
    "https://wa.me/381648222606?text=Hello%2C%20I%20got%20your%20contact%20from%20QR%20code.",
};

const VCF = `BEGIN:VCARD
VERSION:3.0
FN:NIKOLA DAMNJANOVIĆ
ORG:EKO ELEKTROFRIGO
TITLE:Sales Director
TEL:+381648222606
TEL:+381113757288
EMAIL:damnjanovic.nikola@eef.rs
URL:https://www.eef.rs
URL:https://www.ekoelektrofrigo.rs
ADR:;;Svetolika Nikačevića 11;Zemun;Belgrade;;
NOTE:Your partner since 1996...
END:VCARD`;

/* ── Icons ── */
function IconSave() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconWA() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ── Snowflake SVG ── */
function Snowflake({ size = 100, opacity = 0.05, rotation = 0 }: { size?: number; opacity?: number; rotation?: number }) {
  const arms = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity, transform: `rotate(${rotation}deg)`, display: "block" }}>
      {arms.map((a) => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="26" x2="41" y2="18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="26" x2="59" y2="18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="17" x2="44" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="17" x2="56" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="50" cy="50" r="4.5" fill="white" />
      <circle cx="50" cy="50" r="2.5" fill="#1E3A8A" />
    </svg>
  );
}

/* ── Particle field ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ── Main Component ── */
export default function VCard() {
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function triggerToast(msg: string) {
    setToast(msg);
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 2200);
  }

  function saveContact() {
    const blob = new Blob([VCF], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Nikola_Damnjanovic_EKO.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => triggerToast(`${label} copied ✓`));
  }

  return (
    <>
      {/* Dark gradient background */}
      <div className="bg-scene" />
      {/* Floating particles */}
      <ParticleField />

      {/* Floating snowflakes in background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px" }}>
          <Snowflake size={220} opacity={0.04} rotation={15} />
        </div>
        <div style={{ position: "absolute", bottom: "80px", left: "-50px" }}>
          <Snowflake size={190} opacity={0.035} rotation={-20} />
        </div>
        <div style={{ position: "absolute", top: "38%", right: "-15px" }}>
          <Snowflake size={110} opacity={0.03} rotation={8} />
        </div>
        <div style={{ position: "absolute", top: "15%", left: "5%" }}>
          <Snowflake size={60} opacity={0.04} rotation={30} />
        </div>
      </div>

      {/* Card */}
      <div className="card-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="card-surface">

          {/* Top bar */}
          <div className="top-bar" />

          {/* ── Logo ── */}
          <div className="header-zone anim-fade-up d1">
            <img
              src="/eko-logo.png"
              alt="EKO Elektrofrigo"
              className="logo-glow"
              style={{ height: "72px", width: "auto", objectFit: "contain" }}
            />
          </div>

          {/* ── Divider ── */}
          <div className="divider-gradient anim-fade-in d2" />

          {/* ── Identity ── */}
          <div className="identity-zone anim-fade-up d2">
            <h1 className="name-text">{CONTACT.name}</h1>
            <p className="position-text">{CONTACT.position}</p>
            <p className="company-text">{CONTACT.company}</p>
          </div>

          {/* ── Divider ── */}
          <div className="divider-gradient anim-fade-in d3" />

          {/* ── Primary actions ── */}
          <div className="actions-zone anim-fade-up d3">

            {/* Save Contact */}
            <button className="btn btn-save" onClick={saveContact} aria-label="Save Contact">
              <IconSave />
              Save Contact
            </button>

            {/* Call */}
            <a href={`tel:${CONTACT.primaryPhone}`} className="btn btn-call" aria-label="Call">
              <IconPhone />
              Call {CONTACT.primaryPhoneDisplay}
            </a>

            {/* Office phone */}
            {!showOffice ? (
              <button className="secondary-call-trigger" onClick={() => setShowOffice(true)}>
                + Office: {CONTACT.secondaryPhoneDisplay}
              </button>
            ) : (
              <a
                href={`tel:${CONTACT.secondaryPhone}`}
                className="btn btn-call anim-fade-up"
                style={{ minHeight: "46px", fontSize: "0.875rem" }}
                aria-label="Office phone"
              >
                <IconPhone />
                Office {CONTACT.secondaryPhoneDisplay}
              </a>
            )}

            {/* WhatsApp */}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" aria-label="WhatsApp">
              <IconWA />
              WhatsApp
            </a>

            {/* Email */}
            <a href={`mailto:${CONTACT.email}`} className="btn btn-email" aria-label="Email">
              <IconMail />
              {CONTACT.email}
            </a>

          </div>

          {/* ── Divider ── */}
          <div className="divider-gradient anim-fade-in d4" />

          {/* ── Secondary info ── */}
          <div className="secondary-zone anim-fade-up d4" style={{ paddingTop: "1.25rem" }}>

            {/* Websites */}
            <div>
              <p className="section-label">Websites</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href={CONTACT.website1} target="_blank" rel="noopener noreferrer" className="btn-website">
                  <IconGlobe />
                  {CONTACT.website1Display}
                </a>
                <a href={CONTACT.website2} target="_blank" rel="noopener noreferrer" className="btn-website">
                  <IconGlobe />
                  {CONTACT.website2Display}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="address-card">
              <div className="address-card-icon">
                <IconPin />
              </div>
              <div>
                <p className="section-label" style={{ marginBottom: "0.3rem" }}>Wholesales</p>
                <p style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.4 }}>
                  {CONTACT.address}
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem" }}>
                  {CONTACT.city}
                </p>
              </div>
            </div>

            {/* Copy shortcuts */}
            <div className="copy-row">
              <button className="btn-copy" onClick={() => copy(CONTACT.primaryPhoneDisplay, "Phone")}>
                <IconCopy />
                Copy Phone
              </button>
              <button className="btn-copy" onClick={() => copy(CONTACT.email, "Email")}>
                <IconCopy />
                Copy Email
              </button>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="footer-zone anim-fade-up d6">
            <div className="divider-gradient" style={{ marginBottom: "1.25rem", margin: "0 0 1.25rem 0" }} />

            {/* Mini snowflake */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
              <Snowflake size={28} opacity={0.25} />
            </div>

            <p className="footer-tagline">{CONTACT.tagline}</p>
            <p className="footer-activities">{CONTACT.activities}</p>
          </div>

          {/* Bottom bar */}
          <div className="bottom-bar" />

        </div>
      </div>

      {/* Toast */}
      <div className={`toast-pill ${showToast ? "show" : ""}`}>
        {toast}
      </div>
    </>
  );
}
