import { useState, useRef, useCallback } from "react";

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const C = {
  name: "NIKOLA DAMNJANOVIĆ",
  initials: "ND",
  position: "Sales Director",
  company: "EKO ELEKTROFRIGO",
  tagline: "Your partner since 1996...",
  activities: ["Refrigeration", "Air Conditioning", "CA Rooms"],
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
  whatsapp: "https://wa.me/381648222606?text=Hello%2C%20I%20got%20your%20contact%20from%20QR%20code.",
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

/* ════════════════════════════════════════
   PREMIUM ICONS  (Phosphor-style, 2px stroke, round caps)
════════════════════════════════════════ */

/* Person with a plus – "Add to Contacts" */
function IcoUserPlus() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="16" y1="11" x2="22" y2="11"/>
    </svg>
  );
}

/* Phone handset with signal arc */
function IcoPhone({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      <path d="M14.05 2a9 9 0 0 1 7.94 7.94" opacity="0.5"/>
      <path d="M14.05 6A5 5 0 0 1 18 10" opacity="0.5"/>
    </svg>
  );
}

/* Envelope with decorative flap */
function IcoMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

/* Globe with latitude/longitude lines */
function IcoGlobe() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  );
}

/* Location pin with inner dot */
function IcoPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

/* Overlapping pages — copy */
function IcoCopy() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  );
}

/* Checkmark */
function IcoCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* Arrow top-right — external link */
function IcoExternal() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

/* Share — box with arrow pointing up */
function IcoShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  );
}

/* WhatsApp brand mark */
function IcoWA() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

/* ════════════════════════════════════════
   RIPPLE HOOK
════════════════════════════════════════ */
function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const fire = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
    const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
    const id = Date.now() + Math.random();
    setRipples(r => [...r, { id, x: cx - rect.left, y: cy - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 650);
  }, []);
  const els = ripples.map(rp => (
    <span key={rp.id} className="ripple" style={{ left: rp.x, top: rp.y }} />
  ));
  return { fire, els };
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function VCard() {
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const callRipple = useRipple();
  const waRipple = useRipple();
  const emailRipple = useRipple();
  const saveRipple = useRipple();
  const shareRipple = useRipple();

  function showMsg(msg: string) {
    setToast(msg);
    setShowToast(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShowToast(false), 2300);
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
    showMsg("Contact saved to your device ✓");
  }

  async function shareCard() {
    const shareData = {
      title: "Nikola Damnjanović | EKO Elektrofrigo",
      text: "Sales Director – EKO Elektrofrigo\nRefrigeration • Air Conditioning • CA Rooms",
      url: window.location.href,
    };
    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showMsg("Link copied to clipboard ✓");
      }
    } catch {
      // user cancelled
    }
  }

  function copyPhone() {
    navigator.clipboard.writeText(C.primaryPhoneDisplay).then(() => {
      setCopiedPhone(true);
      showMsg("Phone number copied ✓");
      setTimeout(() => setCopiedPhone(false), 2100);
    });
  }

  function copyEmail() {
    navigator.clipboard.writeText(C.email).then(() => {
      setCopiedEmail(true);
      showMsg("Email address copied ✓");
      setTimeout(() => setCopiedEmail(false), 2100);
    });
  }

  return (
    <>
      {/* HVAC photo background */}
      <div className="bg-photo" />
      <div className="bg-overlay" />
      <div className="bg-noise" />

      {/* ── Card ── */}
      <div className="card-wrap">
        <div className="card-surface">

          <div className="top-bar" />

          {/* Logo */}
          <div className="header-zone anim-fade-up d1">
            <img src="/eko-logo.png" alt="EKO Elektrofrigo" className="logo-img" />
          </div>

          <div className="divider anim-fade-in d1" />

          {/* Avatar */}
          <div className="avatar-zone anim-fade-up d2">
            <div className="avatar-ring">
              <div className="avatar-inner">{C.initials}</div>
              <span className="avatar-dot" />
            </div>
          </div>

          {/* Identity */}
          <div className="identity-zone anim-fade-up d2">
            <h1 className="name-text">{C.name}</h1>
            <p className="position-text">{C.position}</p>
            <p className="company-text">{C.company}</p>
          </div>

          <div className="divider anim-fade-in d3" />

          {/* ── Primary Actions ── */}
          <div className="actions-zone anim-fade-up d3">

            {/* Call — primary */}
            <a href={`tel:${C.primaryPhone}`} className="btn btn-call"
              onClick={callRipple.fire} onTouchStart={callRipple.fire} aria-label="Call">
              <IcoPhone size={20} />
              Call {C.primaryPhoneDisplay}
              {callRipple.els}
            </a>

            {/* Call — office */}
            <a href={`tel:${C.secondaryPhone}`} className="btn btn-call btn-call-sm" aria-label="Office">
              <IcoPhone size={16} />
              <span style={{ color:"rgba(255,255,255,0.46)", fontSize:"0.7rem", marginRight:"0.15rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>Office</span>
              {C.secondaryPhoneDisplay}
            </a>

            {/* WhatsApp */}
            <a href={C.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"
              onClick={waRipple.fire} onTouchStart={waRipple.fire} aria-label="WhatsApp">
              <IcoWA />
              WhatsApp
              {waRipple.els}
            </a>

            {/* Email */}
            <a href={`mailto:${C.email}`} className="btn btn-email"
              onClick={emailRipple.fire} onTouchStart={emailRipple.fire} aria-label="Email">
              <span className="btn-email-label"><IcoMail />Email</span>
              <span className="btn-email-addr">{C.email}</span>
              {emailRipple.els}
            </a>

            {/* Share */}
            <button className="btn btn-share"
              onClick={(e) => { shareRipple.fire(e); shareCard(); }}
              onTouchStart={shareRipple.fire} aria-label="Share this card">
              <IcoShare />
              Share This Card
              {shareRipple.els}
            </button>

          </div>

          <div className="divider anim-fade-in d4" />

          {/* ── Secondary Info ── */}
          <div className="secondary-zone anim-fade-up d4" style={{ paddingTop:"1.125rem" }}>

            {/* Websites */}
            <div>
              <span className="section-label">Websites</span>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <a href={C.website1} target="_blank" rel="noopener noreferrer" className="btn-website">
                  <IcoGlobe />{C.website1Display}
                  <span className="ext-arrow"><IcoExternal /></span>
                </a>
                <a href={C.website2} target="_blank" rel="noopener noreferrer" className="btn-website">
                  <IcoGlobe />{C.website2Display}
                  <span className="ext-arrow"><IcoExternal /></span>
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="address-card">
              <div className="address-icon"><IcoPin /></div>
              <div>
                <span className="section-label">Wholesales</span>
                <p className="address-street">{C.address}</p>
                <p className="address-city">{C.city}</p>
              </div>
            </div>

            {/* Copy row */}
            <div className="copy-row">
              <button className="btn-copy" onClick={copyPhone}>
                {copiedPhone ? <IcoCheck /> : <IcoCopy />}
                {copiedPhone ? "Copied!" : "Copy Phone"}
              </button>
              <button className="btn-copy" onClick={copyEmail}>
                {copiedEmail ? <IcoCheck /> : <IcoCopy />}
                {copiedEmail ? "Copied!" : "Copy Email"}
              </button>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="footer-zone anim-fade-up d6">
            <div className="divider" style={{ margin:"0 0 1rem" }} />
            <p className="footer-tagline">{C.tagline}</p>
            <div className="activity-chips">
              {C.activities.map(a => <span key={a} className="chip">{a}</span>)}
            </div>
          </div>

          {/* ── SAVE CONTACT — at bottom ── */}
          <div className="save-wrap">
            <div className="save-pulse" />
            <div className="save-pulse save-pulse-2" />
            <button className="btn btn-save"
              onClick={(e) => { saveRipple.fire(e); saveContact(); }}
              onTouchStart={saveRipple.fire}
              aria-label="Save Contact">
              <IcoUserPlus />
              Save Contact
              {saveRipple.els}
            </button>
          </div>

          <div className="bottom-bar" />

        </div>
      </div>

      {/* Toast */}
      <div className={`toast-pill ${showToast ? "show" : ""}`}>{toast}</div>
    </>
  );
}
