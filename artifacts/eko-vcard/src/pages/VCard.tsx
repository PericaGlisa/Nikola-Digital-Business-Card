import { useState, useEffect } from "react";

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
  whatsapp: "https://wa.me/381648222606?text=Hello%2C%20I%20got%20your%20contact%20from%20QR%20code.",
};

const VCFCONTENT = `BEGIN:VCARD
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

function SnowflakeSVG({ size = 120, opacity = 0.06 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Arms at 0°, 30°, 60°, 90°, 120°, 150°, 180°, 210°, 240°, 270°, 300°, 330° */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 60 60)`}>
          <line x1="60" y1="60" x2="60" y2="10" stroke="#1E3A8A" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="60" y1="28" x2="48" y2="20" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="28" x2="72" y2="20" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="60" cy="60" r="6" fill="#1E3A8A" />
    </svg>
  );
}

export default function VCard() {
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showSecondaryCall, setShowSecondaryCall] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  function handleSaveContact() {
    const blob = new Blob([VCFCONTENT], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Nikola_Damnjanovic_EKO.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      setToast(`${label} copied!`);
      setShowToast(true);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex justify-center items-start py-0 relative">
      {/* Snowflake background pattern */}
      <div className="snowflake-bg">
        <div style={{ position: "absolute", top: "-30px", right: "-20px" }}>
          <SnowflakeSVG size={200} opacity={0.05} />
        </div>
        <div style={{ position: "absolute", bottom: "60px", left: "-40px" }}>
          <SnowflakeSVG size={180} opacity={0.04} />
        </div>
        <div style={{ position: "absolute", top: "40%", right: "10px" }}>
          <SnowflakeSVG size={100} opacity={0.035} />
        </div>
      </div>

      {/* Card */}
      <div
        className="glass-card relative w-full max-w-sm mx-auto min-h-screen flex flex-col shadow-2xl"
        style={{ zIndex: 1 }}
      >
        {/* Header gradient bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 50%, #22C55E 100%)" }}
        />

        {/* Header: Logo */}
        <div className="animate-fade-in-up delay-100 flex justify-center pt-7 pb-4 px-6">
          <img
            src="/eko-logo.png"
            alt="EKO Elektrofrigo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Gradient divider */}
        <div className="px-6">
          <div className="gradient-divider animate-fade-in delay-200" />
        </div>

        {/* Identity */}
        <div className="animate-fade-in-up delay-200 text-center px-6 pt-5 pb-4">
          <h1
            className="font-bold tracking-wide text-2xl"
            style={{ color: "#0F172A", letterSpacing: "0.04em" }}
          >
            {CONTACT.name}
          </h1>
          <p
            className="mt-1 text-sm font-medium uppercase tracking-widest"
            style={{ color: "#3B82F6" }}
          >
            {CONTACT.position}
          </p>
          <p
            className="mt-0.5 text-sm font-semibold tracking-wider"
            style={{ color: "#1E3A8A" }}
          >
            {CONTACT.company}
          </p>
        </div>

        {/* Gradient divider */}
        <div className="px-6 pb-4">
          <div className="gradient-divider" />
        </div>

        {/* Primary Actions */}
        <div className="animate-fade-in-up delay-300 px-5 flex flex-col gap-3">
          {/* Save Contact */}
          <button
            className="btn-action btn-save"
            onClick={handleSaveContact}
            aria-label="Save Contact"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Contact
          </button>

          {/* Call */}
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${CONTACT.primaryPhone}`}
              className="btn-action btn-call"
              aria-label="Call primary phone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 7.59 7.59l.95-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {CONTACT.primaryPhoneDisplay}
            </a>

            {!showSecondaryCall ? (
              <button
                className="text-sm font-medium text-center py-1"
                style={{ color: "#1E3A8A" }}
                onClick={() => setShowSecondaryCall(true)}
              >
                + Office: {CONTACT.secondaryPhoneDisplay}
              </button>
            ) : (
              <a
                href={`tel:${CONTACT.secondaryPhone}`}
                className="btn-action btn-call animate-fade-in"
                style={{ minHeight: "44px", fontSize: "0.875rem" }}
                aria-label="Call office phone"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 7.59 7.59l.95-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Office {CONTACT.secondaryPhoneDisplay}
              </a>
            )}
          </div>

          {/* WhatsApp */}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action btn-whatsapp"
            aria-label="WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="btn-action btn-email"
            aria-label="Send email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {CONTACT.email}
          </a>
        </div>

        {/* Divider */}
        <div className="px-5 py-5">
          <div className="gradient-divider" />
        </div>

        {/* Secondary Info */}
        <div className="animate-fade-in-up delay-400 px-5 flex flex-col gap-3">
          {/* Websites */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
              Websites
            </p>
            <a
              href={CONTACT.website1}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action btn-website"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {CONTACT.website1Display}
            </a>
            <a
              href={CONTACT.website2}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action btn-website"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {CONTACT.website2Display}
            </a>
          </div>

          {/* Address */}
          <div
            className="rounded-xl p-4 flex items-start gap-3"
            style={{ background: "linear-gradient(135deg, rgba(30,58,138,0.06) 0%, rgba(34,197,94,0.06) 100%)", border: "1px solid rgba(30,58,138,0.1)" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-0.5"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#6B7280" }}>
                Wholesales
              </p>
              <p className="text-sm font-medium" style={{ color: "#0F172A" }}>
                {CONTACT.address}
              </p>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                {CONTACT.city}
              </p>
            </div>
          </div>

          {/* Copy shortcuts */}
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(CONTACT.primaryPhoneDisplay, "Phone")}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium py-2.5 transition-all"
              style={{ background: "rgba(30,58,138,0.07)", color: "#1E3A8A", border: "1px solid rgba(30,58,138,0.12)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Phone
            </button>
            <button
              onClick={() => copyToClipboard(CONTACT.email, "Email")}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg text-xs font-medium py-2.5 transition-all"
              style={{ background: "rgba(30,58,138,0.07)", color: "#1E3A8A", border: "1px solid rgba(30,58,138,0.12)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Email
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="animate-fade-in-up delay-500 mt-auto px-5 py-6 text-center">
          <div className="gradient-divider mb-5" />

          {/* Small snowflake icon */}
          <div className="flex justify-center mb-3" style={{ opacity: 0.3 }}>
            <SnowflakeSVG size={32} opacity={1} />
          </div>

          <p
            className="text-sm font-semibold italic mb-1.5"
            style={{ color: "#1E3A8A" }}
          >
            {CONTACT.tagline}
          </p>
          <p
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "#22C55E", letterSpacing: "0.12em" }}
          >
            {CONTACT.activities}
          </p>
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #22C55E 0%, #3B82F6 50%, #1E3A8A 100%)" }}
        />
      </div>

      {/* Copy toast */}
      <div className={`copy-toast ${showToast ? "show" : ""}`}>
        ✓ {toast}
      </div>
    </div>
  );
}
