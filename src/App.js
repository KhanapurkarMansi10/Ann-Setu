import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ──────────────────────────────────────────── */
const C = {
  cream: "#FDF6EC",
  paper: "#FFF9F2",
  green: "#1B4332",
  greenMid: "#2D6A4F",
  greenLight: "#52B788",
  greenPale: "#D8F3DC",
  orange: "#E76F00",
  orangeLight: "#FFA040",
  orangePale: "#FFF0D9",
  red: "#C1121F",
  redPale: "#FFE5E7",
  gold: "#F4A500",
  text: "#1A1A1A",
  muted: "#6B7280",
  border: "#E5D9C8",
  white: "#FFFFFF",
  shadow: "0 4px 24px rgba(27,67,50,0.10)",
  shadowLg: "0 12px 40px rgba(27,67,50,0.16)",
};

/* ─── REAL FOOD IMAGES (Unsplash) ───────────────────────────────*/
const IMG = {
  biryani:    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&fit=crop&auto=format",
  dal:        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&fit=crop&auto=format",
  bread:      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&fit=crop&auto=format",
  paneer:     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&fit=crop&auto=format",
  volunteers: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&fit=crop&auto=format",
  restaurant: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop&auto=format",
  delivery:   "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&fit=crop&auto=format",
  ngo:        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&fit=crop&auto=format",
  food4:      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&fit=crop&auto=format",
  food5:      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&fit=crop&auto=format",
};

/* ─── GLOBAL CSS ─────────────────────────────────────────────── */
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${C.cream}; font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.15)} }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes scan { 0%{top:0%} 50%{top:90%} 100%{top:0%} }
    @keyframes moveVehicle { 0%{left:8%;top:65%} 25%{left:28%;top:42%} 50%{left:50%;top:55%} 75%{left:68%;top:38%} 100%{left:82%;top:52%} }
    @keyframes ripple { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(3);opacity:0} }
    @keyframes countUp { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
    .fadeUp { animation: fadeUp .45s ease both; }
    .card-hover { transition: transform .2s, box-shadow .2s; cursor:pointer; }
    .card-hover:hover { transform: translateY(-3px); box-shadow: ${C.shadowLg}; }
    button { cursor:pointer; transition: all .18s; }
    button:active { transform: scale(.97); }
  `}</style>
);

/* ─── REUSABLE COMPONENTS ────────────────────────────────────── */
const Badge = ({ color, bg, children }) => (
  <span style={{ background: bg, color, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
    {children}
  </span>
);

const Btn = ({ children, onClick, style = {}, secondary = false, small = false }) => (
  <button onClick={onClick} style={{
    background: secondary ? "transparent" : `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
    color: secondary ? C.green : C.white,
    border: secondary ? `2px solid ${C.greenLight}` : "none",
    borderRadius: 10, fontFamily: "inherit",
    padding: small ? "8px 16px" : "13px 24px",
    fontSize: small ? 12 : 14, fontWeight: 600,
    boxShadow: secondary ? "none" : "0 4px 14px rgba(231,111,0,.35)",
    ...style
  }}>{children}</button>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.greenLight, marginBottom: 10 }}>{children}</div>
);

/* ─── SCREEN 1 · ROLE SELECTION ──────────────────────────────── */
function RoleScreen({ onRole }) {
  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
        <img src={IMG.food5} alt="food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(27,67,50,.55) 0%, rgba(27,67,50,.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px 24px" }}>
          <div style={{ fontSize: 11, color: C.greenLight, letterSpacing: "3px", fontWeight: 700, marginBottom: 8 }}>AI-POWERED , Bhopal , MP</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900, color: C.white, lineHeight: 1.1, marginBottom: 10 }}>
            Excess<br />To Access.
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.7 }}>
            AI connects surplus food from restaurants to NGOs — in under 30 minutes.
          </div>
        </div>
      </div>

      {/* Role Cards */}
      <div style={{ padding: "28px 20px" }}>
        <SectionLabel>Choose Your Role to Continue</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { role: "donor", emoji: "🍽️", title: "I'm a Restaurant / Donor", desc: "Post surplus food, get AI freshness check, track delivery", img: IMG.restaurant, color: C.orangePale, accent: C.orange },
            { role: "ngo", emoji: "🤝", title: "I'm an NGO / Receiver", desc: "Receive AI-matched food requests, assign volunteers", img: IMG.volunteers, color: C.greenPale, accent: C.greenMid },
            { role: "track", emoji: "📦", title: "Track Live Delivery", desc: "Real-time volunteer tracking like Zomato", img: IMG.delivery, color: "#EEF2FF", accent: "#4F46E5" },
            { role: "dashboard", emoji: "📊", title: "Impact Dashboard", desc: "View meals served, waste reduced, community impact", img: IMG.ngo, color: C.orangePale, accent: C.gold },
          ].map(r => (
            <div key={r.role} className="card-hover fadeUp" onClick={() => onRole(r.role)}
              style={{ background: C.white, borderRadius: 16, overflow: "hidden", boxShadow: C.shadow, display: "flex", alignItems: "center", border: `1px solid ${C.border}` }}>
              <img src={r.img} alt="" style={{ width: 90, height: 90, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ padding: "14px 16px", flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{r.emoji} {r.title}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{r.desc}</div>
              </div>
              <div style={{ paddingRight: 16, color: C.muted, fontSize: 20 }}>›</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ margin: "0 20px 32px", background: C.green, borderRadius: 16, padding: "18px 20px", display: "flex", justifyContent: "space-around" }}>
        {[["48K+", "Meals Served"], ["342", "Donors"], ["28", "NGOs"], ["94%", "AI Accuracy"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: C.gold, fontWeight: 700 }}>{n}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SCREEN 2 · DONOR PORTAL ────────────────────────────────── */
const donorListings = [
  { id: 1, name: "Biryani", qty: "80 plates", img: IMG.biryani, freshness: 91, urgency: "LOW", expires: "4 hrs", status: "matched", ngo: "Akshaya Patra" },
  { id: 2, name: "Dal Makhani + Rice", qty: "60 portions", img: IMG.dal, freshness: 78, urgency: "MEDIUM", expires: "2 hrs", status: "pending", ngo: null },
  { id: 3, name: "Assorted Breads", qty: "120 pieces", img: IMG.bread, freshness: 55, urgency: "HIGH", expires: "45 min", status: "pending", ngo: null },
];

function DonorPortal({ onBack }) {
  const [view, setView] = useState("list"); // list | addForm | scanning | result | posted
  const [scanPct, setScanPct] = useState(0);
  const [form, setForm] = useState({ name: "", qty: "", type: "Cooked Meal", time: "2" });
  const [freshResult, setFreshResult] = useState(null);

  const startScan = () => {
    setView("scanning");
    setScanPct(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 2;
      setScanPct(p);
      if (p >= 100) { clearInterval(iv); setFreshResult({ score: 82, urgency: "MEDIUM", shelf: "~2.5 hrs", safe: true }); setView("result"); }
    }, 40);
  };

  const urgColor = (u) => u === "HIGH" ? C.red : u === "MEDIUM" ? C.orange : C.greenMid;
  const urgBg = (u) => u === "HIGH" ? C.redPale : u === "MEDIUM" ? C.orangePale : C.greenPale;

  return (
    <div style={{ minHeight: "100vh", background: C.cream, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: C.green, padding: "20px 20px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.white, fontSize: 22, padding: 0 }}>←</button>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: C.white, fontWeight: 700 }}>Donor Portal</div>
          <div style={{ fontSize: 11, color: C.greenLight }}>🏠 Hotel Surya, Bhopal</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Badge color={C.greenLight} bg="rgba(255,255,255,.15)">✅ Verified</Badge>
        </div>
      </div>

      {/* Restaurant banner */}
      {view === "list" && (
        <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
          <img src={IMG.restaurant} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(27,67,50,.85), rgba(27,67,50,.3))" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 20px", gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.white, fontFamily: "'Playfair Display',serif" }}>Good Morning! 🌤️</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", marginTop: 4 }}>You have 3 items listed today</div>
              <div style={{ marginTop: 10 }}>
                <Btn small onClick={() => setView("addForm")} style={{ padding: "8px 18px", fontSize: 12 }}>+ Add Surplus Food</Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LISTINGS */}
      {view === "list" && (
        <div style={{ padding: "20px" }} className="fadeUp">
          <SectionLabel>Your Active Listings</SectionLabel>
          {donorListings.map(item => (
            <div key={item.id} style={{ background: C.white, borderRadius: 16, overflow: "hidden", marginBottom: 14, boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex" }}>
                <img src={item.img} alt={item.name} style={{ width: 110, height: 110, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ padding: "14px 14px 10px", flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>📦 {item.qty}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Badge color={urgColor(item.urgency)} bg={urgBg(item.urgency)}>
                      {item.urgency === "HIGH" ? "🔴" : item.urgency === "MEDIUM" ? "🟡" : "🟢"} {item.urgency}
                    </Badge>
                    <Badge color={C.muted} bg={C.cream}>⏱ {item.expires}</Badge>
                  </div>
                  {/* Freshness bar */}
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted, marginBottom: 3 }}>
                      <span>AI Freshness</span><span style={{ fontWeight: 700, color: item.freshness > 80 ? C.greenMid : item.freshness > 60 ? C.orange : C.red }}>{item.freshness}%</span>
                    </div>
                    <div style={{ background: C.border, borderRadius: 99, height: 5 }}>
                      <div style={{ width: `${item.freshness}%`, height: "100%", borderRadius: 99, background: item.freshness > 80 ? C.greenLight : item.freshness > 60 ? C.orange : C.red, transition: "width 1.2s ease" }} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Status footer */}
              <div style={{ background: item.status === "matched" ? C.greenPale : C.orangePale, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: item.status === "matched" ? C.greenMid : C.orange }}>
                  {item.status === "matched" ? `✅ Matched → ${item.ngo}` : "⏳ AI Searching for NGO..."}
                </span>
                {item.status === "pending" && <div style={{ width: 14, height: 14, border: `2px solid ${C.orange}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD FOOD FORM */}
      {view === "addForm" && (
        <div style={{ padding: "24px 20px" }} className="fadeUp">
          <div style={{ marginBottom: 20 }}>
            <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: C.greenMid, fontSize: 13, fontWeight: 600, padding: 0 }}>← Back</button>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: C.text, marginTop: 8 }}>Add Surplus Food</div>
            <div style={{ fontSize: 13, color: C.muted }}>AI will scan freshness after you submit</div>
          </div>

          {/* Image upload mock */}
          <div onClick={startScan} style={{ background: C.green, borderRadius: 16, height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 20, cursor: "pointer", position: "relative", overflow: "hidden" }}>
            <img src={IMG.biryani} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 6 }}>📸</div>
              <div style={{ color: C.white, fontWeight: 600, fontSize: 14 }}>Tap to Scan Food with AI</div>
              <div style={{ color: "rgba(255,255,255,.6)", fontSize: 11, marginTop: 4 }}>Camera will check freshness automatically</div>
            </div>
          </div>

          {[
            { label: "Food Name", placeholder: "e.g. Wedding Biryani, Dal Fry...", key: "name" },
            { label: "Quantity / Servings", placeholder: "e.g. 80 plates, 5 kg...", key: "qty" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{f.label}</div>
              <input placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width: "100%", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "13px 14px", fontSize: 14, fontFamily: "inherit", color: C.text, outline: "none" }} />
            </div>
          ))}

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Food Category</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {["🍛 Cooked", "🥬 Veggies", "🍞 Baked", "🥛 Dairy", "📦 Packed", "🍱 Tiffin"].map((t, i) => (
                <button key={i} onClick={() => setForm({ ...form, type: t })}
                  style={{ background: form.type === t ? C.greenPale : C.white, border: `1.5px solid ${form.type === t ? C.greenLight : C.border}`, borderRadius: 8, padding: "10px 6px", fontSize: 11, fontFamily: "inherit", color: form.type === t ? C.greenMid : C.text, fontWeight: form.type === t ? 700 : 400 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Available For</div>
            <select style={{ width: "100%", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "13px 14px", fontSize: 14, fontFamily: "inherit", color: C.text, outline: "none" }}
              value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
              {["1 hour", "2 hours", "3 hours", "4 hours", "6 hours"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <Btn onClick={startScan} style={{ width: "100%" }}>🤖 Submit & Run AI Freshness Scan</Btn>
        </div>
      )}

      {/* AI SCANNING */}
      {view === "scanning" && (
        <div style={{ padding: "40px 24px", textAlign: "center" }} className="fadeUp">
          <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto 28px", borderRadius: 16, overflow: "hidden", border: `3px solid ${C.greenLight}` }}>
            <img src={IMG.biryani} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {/* Scan line */}
            <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.greenLight}, transparent)`, animation: "scan 1.8s ease-in-out infinite", boxShadow: `0 0 12px ${C.greenLight}` }} />
            {/* Corner markers */}
            {[[0, 0], [0, "auto"], ["auto", 0], ["auto", "auto"]].map(([t, b], i) => (
              <div key={i} style={{ position: "absolute", top: t === 0 ? 6 : "auto", bottom: b === "auto" ? "auto" : 6, left: i < 2 ? 6 : "auto", right: i >= 2 ? 6 : "auto", width: 16, height: 16, borderTop: i < 2 ? `3px solid ${C.greenLight}` : "none", borderBottom: i >= 2 ? `3px solid ${C.greenLight}` : "none", borderLeft: i % 2 === 0 ? `3px solid ${C.greenLight}` : "none", borderRight: i % 2 !== 0 ? `3px solid ${C.greenLight}` : "none" }} />
            ))}
            {/* Pct overlay */}
            <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", fontSize: 28, fontWeight: 700, color: C.white, fontFamily: "'Playfair Display',serif", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>{scanPct}%</div>
          </div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>AI Scanning Food...</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
            {scanPct < 30 && "Analyzing color and texture..."}
            {scanPct >= 30 && scanPct < 60 && "Checking moisture & freshness indicators..."}
            {scanPct >= 60 && scanPct < 85 && "Estimating shelf life..."}
            {scanPct >= 85 && "Calculating urgency level..."}
          </div>
          <div style={{ marginTop: 20, background: C.border, borderRadius: 99, height: 6, overflow: "hidden" }}>
            <div style={{ width: `${scanPct}%`, height: "100%", background: `linear-gradient(90deg, ${C.greenMid}, ${C.greenLight})`, borderRadius: 99, transition: "width .1s linear" }} />
          </div>
        </div>
      )}

      {/* SCAN RESULT */}
      {view === "result" && freshResult && (
        <div style={{ padding: "24px 20px" }} className="fadeUp">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🤖</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: C.text }}>AI Freshness Report</div>
          </div>

          {/* Score ring */}
          <div style={{ background: C.white, borderRadius: 20, padding: 24, marginBottom: 16, boxShadow: C.shadow, textAlign: "center", border: `1px solid ${C.border}` }}>
            <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 16px" }}>
              <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke={C.border} strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={C.greenLight} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50 * freshResult.score / 100} 999`} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.greenMid, fontFamily: "'Playfair Display',serif" }}>{freshResult.score}</div>
                <div style={{ fontSize: 10, color: C.muted }}>/ 100</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <Badge color={C.orange} bg={C.orangePale}>🟡 MEDIUM Urgency</Badge>
              <Badge color={C.greenMid} bg={C.greenPale}>✅ Safe to Distribute</Badge>
              <Badge color={C.muted} bg={C.cream}>⏱ ~2.5 hrs shelf life</Badge>
            </div>
          </div>

          {/* AI details */}
          <div style={{ background: C.greenPale, borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${C.greenLight}33` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.greenMid, marginBottom: 10 }}>🤖 AI Analysis Details</div>
            {[
              ["Color Score", "82/100", "Normal browning, no spoilage"],
              ["Texture", "Good", "No visible mold or drying"],
              ["Estimated Cook Time", "3.5 hrs ago", "Within safe window"],
              ["Distribution Priority", "Medium", "Should be dispatched in 1hr"],
            ].map(([k, v, d]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${C.greenLight}33`, paddingBottom: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{k}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{d}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.greenMid }}>{v}</span>
              </div>
            ))}
          </div>

          <Btn onClick={() => setView("posted")} style={{ width: "100%" }}>✅ Confirm & Find Nearest NGO</Btn>
          <button onClick={() => setView("list")} style={{ width: "100%", marginTop: 10, background: "none", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "13px", fontSize: 14, fontFamily: "inherit", color: C.muted }}>Retake Scan</button>
        </div>
      )}

      {/* POSTED + AI MATCHING */}
      {view === "posted" && (
        <div style={{ padding: "32px 20px" }} className="fadeUp">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>✅</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: C.text }}>Food Posted!</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>AI Matching Engine is finding the best NGO</div>
          </div>

          {/* Matching animation */}
          <div style={{ background: C.green, borderRadius: 20, padding: 20, marginBottom: 16, color: C.white }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 18, height: 18, border: `2.5px solid ${C.greenLight}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>AI Matching Engine Running...</span>
            </div>
            {[
              { icon: "📍", text: "Scanning 12 NGOs within 5 km", done: true },
              { icon: "📊", text: "Checking real-time capacity & demand", done: true },
              { icon: "🛣️", text: "Calculating optimal pickup route", done: true },
              { icon: "🎯", text: "Best match found: Akshaya Patra (98%)", done: true, highlight: true },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, opacity: s.done ? 1 : 0.4 }}>
                <span style={{ fontSize: 14 }}>{s.done ? "✓" : "○"}</span>
                <span style={{ fontSize: 12, color: s.highlight ? C.gold : "rgba(255,255,255,.85)", fontWeight: s.highlight ? 700 : 400 }}>{s.text}</span>
              </div>
            ))}
          </div>

          {/* Matched NGO card */}
          <div style={{ background: C.white, borderRadius: 16, padding: 16, boxShadow: C.shadow, marginBottom: 16, border: `2px solid ${C.greenLight}` }}>
            <div style={{ fontSize: 11, color: C.greenLight, fontWeight: 700, letterSpacing: "1.5px", marginBottom: 10 }}>🎯 BEST MATCH FOUND</div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <img src={IMG.volunteers} alt="" style={{ width: 60, height: 60, borderRadius: 10, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Akshaya Patra Foundation</div>
                <div style={{ fontSize: 12, color: C.muted }}>📍 1.4 km · Awaits pickup · ETA 22 min</div>
                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  <Badge color={C.greenMid} bg={C.greenPale}>98% Match</Badge>
                  <Badge color={C.orange} bg={C.orangePale}>⚡ Fast Pickup</Badge>
                </div>
              </div>
            </div>
          </div>

          <Btn onClick={() => setView("list")} style={{ width: "100%" }}>🏠 Back to My Listings</Btn>
        </div>
      )}
    </div>
  );
}

/* ─── SCREEN 3 · NGO PORTAL ──────────────────────────────────── */
const ngoRequests = [
  { id: 1, food: "Biryani", qty: "80 plates", donor: "Hotel Surya", dist: "1.4 km", img: IMG.biryani, urgency: "LOW", match: 98, eta: "22 min" },
  { id: 2, food: "Assorted Breads", qty: "120 pieces", donor: "Mehta Bakery", dist: "2.1 km", img: IMG.bread, urgency: "HIGH", match: 91, eta: "15 min" },
  { id: 3, food: "Dal Makhani", qty: "60 portions", donor: "Rajmahal Hotel", dist: "3.0 km", img: IMG.dal, urgency: "MEDIUM", match: 87, eta: "30 min" },
];

const volunteers = [
  { id: 1, name: "Rahul Verma", rating: 4.8, trips: 142, img: "🧑", status: "available" },
  { id: 2, name: "Priya Singh", rating: 4.9, trips: 208, img: "👩", status: "available" },
  { id: 3, name: "Amit Joshi", rating: 4.7, trips: 89, img: "🧔", status: "busy" },
];

function NGOPortal({ onBack, onTrack }) {
  const [view, setView] = useState("list");
  const [accepted, setAccepted] = useState(null);
  const [assignedVol, setAssignedVol] = useState(null);
  const urgColor = (u) => u === "HIGH" ? C.red : u === "MEDIUM" ? C.orange : C.greenMid;
  const urgBg = (u) => u === "HIGH" ? C.redPale : u === "MEDIUM" ? C.orangePale : C.greenPale;

  return (
    <div style={{ minHeight: "100vh", background: C.cream, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: C.greenMid, padding: "20px 20px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.white, fontSize: 22, padding: 0 }}>←</button>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: C.white, fontWeight: 700 }}>NGO Portal</div>
            <div style={{ fontSize: 11, color: C.greenLight }}>🏛️ Akshaya Patra Foundation</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge color={C.greenLight} bg="rgba(255,255,255,.2)">🟢 Online</Badge>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {[["3", "Incoming"], ["1", "Active"], ["28", "Today"], ["980", "This Month"]].map(([n, l]) => (
            <div key={l} style={{ flex: 1, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.white }}>{n}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.6)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {view === "list" && (
        <div style={{ padding: "20px" }} className="fadeUp">
          <SectionLabel>AI-Matched Incoming Requests</SectionLabel>
          {ngoRequests.map(req => (
            <div key={req.id} style={{ background: C.white, borderRadius: 16, overflow: "hidden", marginBottom: 14, boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex" }}>
                <img src={req.img} alt={req.food} style={{ width: 110, height: 110, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ padding: "14px 14px 10px", flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{req.food}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>📦 {req.qty} · 🏠 {req.donor}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Badge color={urgColor(req.urgency)} bg={urgBg(req.urgency)}>
                      {req.urgency === "HIGH" ? "🔴" : req.urgency === "MEDIUM" ? "🟡" : "🟢"} {req.urgency}
                    </Badge>
                    <Badge color="#4F46E5" bg="#EEF2FF">🤖 {req.match}% match</Badge>
                    <Badge color={C.muted} bg={C.cream}>📍 {req.dist}</Badge>
                  </div>
                </div>
              </div>
              <div style={{ padding: "10px 14px", display: "flex", gap: 8, borderTop: `1px solid ${C.border}` }}>
                <Btn small style={{ flex: 1 }} onClick={() => { setAccepted(req); setView("assign"); }}>✅ Accept</Btn>
                <button style={{ flex: 1, background: "none", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px", fontSize: 12, fontFamily: "inherit", color: C.muted }}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "assign" && accepted && (
        <div style={{ padding: "24px 20px" }} className="fadeUp">
          <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: C.greenMid, fontSize: 13, fontWeight: 600, padding: "0 0 16px", display: "block" }}>← Back</button>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Assign Volunteer</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Pickup: {accepted.food} from {accepted.donor}</div>

          {/* Food summary */}
          <div style={{ background: C.white, borderRadius: 14, display: "flex", gap: 12, padding: 14, marginBottom: 20, border: `1px solid ${C.border}`, alignItems: "center" }}>
            <img src={accepted.img} alt="" style={{ width: 60, height: 60, borderRadius: 10, objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{accepted.food}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{accepted.qty} · {accepted.dist} away · ETA {accepted.eta}</div>
            </div>
          </div>

          <SectionLabel>Available Volunteers</SectionLabel>
          {volunteers.map(vol => (
            <div key={vol.id} style={{ background: C.white, borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: C.shadow, display: "flex", alignItems: "center", gap: 12, border: assignedVol?.id === vol.id ? `2px solid ${C.greenLight}` : `1px solid ${C.border}`, opacity: vol.status === "busy" ? 0.5 : 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{vol.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{vol.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>⭐ {vol.rating} · {vol.trips} deliveries</div>
              </div>
              {vol.status === "busy"
                ? <Badge color={C.red} bg={C.redPale}>Busy</Badge>
                : <Btn small onClick={() => setAssignedVol(vol)}>Assign</Btn>
              }
            </div>
          ))}

          {assignedVol && (
            <div style={{ background: C.greenPale, borderRadius: 14, padding: 16, marginTop: 10, border: `1px solid ${C.greenLight}33` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.greenMid, marginBottom: 6 }}>✅ {assignedVol.name} Assigned!</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>Volunteer notified. Pickup will begin shortly.</div>
              <Btn onClick={onTrack} style={{ width: "100%" }}>📍 Track Live Delivery</Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── SCREEN 4 · LIVE TRACKING ───────────────────────────────── */
function TrackingScreen({ onBack }) {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return p + 0.8;
      });
    }, 80);
    return () => clearInterval(iv);
  }, [started]);

  const steps = [
    { label: "Order Accepted by NGO", icon: "✅", pct: 0 },
    { label: "Volunteer Dispatched", icon: "🧑‍🦽", pct: 20 },
    { label: "Reached Donor Location", icon: "📍", pct: 45 },
    { label: "Food Picked Up", icon: "📦", pct: 60 },
    { label: "En Route to NGO", icon: "🛵", pct: 75 },
    { label: "Delivered!", icon: "🎉", pct: 100 },
  ];

  const activeStep = steps.filter(s => progress >= s.pct).length - 1;

  const vX = 8 + (progress / 100) * 74;
  const vY = 65 - Math.sin((progress / 100) * Math.PI) * 30;

  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>
      <div style={{ background: C.green, padding: "20px 20px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.white, fontSize: 22, padding: 0 }}>←</button>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: C.white, fontWeight: 700 }}>Live Tracking</div>
          <div style={{ fontSize: 11, color: C.greenLight }}>Rahul Verma · Volunteer</div>
        </div>
        {progress < 100 && progress > 0 && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.greenLight, animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 11, color: C.greenLight, fontWeight: 600 }}>LIVE</span>
          </div>
        )}
      </div>

      {/* MAP */}
      <div style={{ position: "relative", height: 280, background: "#e8f5e9", overflow: "hidden" }}>
        {/* Map grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* Roads */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#c8e6c9" strokeWidth="8" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#c8e6c9" strokeWidth="8" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#c8e6c9" strokeWidth="5" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#c8e6c9" strokeWidth="5" />
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#c8e6c9" strokeWidth="5" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#c8e6c9" strokeWidth="5" />
          {/* Path */}
          <polyline points="8%,65% 28%,42% 50%,55% 68%,38% 82%,52%" fill="none" stroke={C.greenLight} strokeWidth="3" strokeDasharray="8 4" />
          {/* Donor pin */}
          <circle cx="8%" cy="65%" r="10" fill={C.orange} />
          <text x="8%" y="65%" textAnchor="middle" dy="4" fill="white" fontSize="10">D</text>
          {/* NGO pin */}
          <circle cx="82%" cy="52%" r="10" fill={C.greenMid} />
          <text x="82%" y="52%" textAnchor="middle" dy="4" fill="white" fontSize="10">N</text>
          {/* Ripple on NGO */}
          <circle cx="82%" cy="52%" r="18" fill="none" stroke={C.greenLight} strokeWidth="2" style={{ animation: "ripple 2s infinite" }} />
        </svg>

        {/* Volunteer dot */}
        <div style={{ position: "absolute", left: `${vX}%`, top: `${vY}%`, transform: "translate(-50%,-50%)", transition: "left .3s, top .3s", zIndex: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.green, border: `3px solid ${C.white}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: `0 4px 12px rgba(27,67,50,.4)` }}>🛵</div>
          <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", background: C.green, color: C.white, fontSize: 9, padding: "2px 6px", borderRadius: 6, whiteSpace: "nowrap", fontWeight: 600 }}>Rahul</div>
        </div>

        {/* ETA badge */}
        <div style={{ position: "absolute", top: 12, right: 12, background: C.white, borderRadius: 10, padding: "8px 12px", boxShadow: C.shadow }}>
          <div style={{ fontSize: 10, color: C.muted }}>ETA</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>{progress >= 100 ? "Done!" : `${Math.max(1, Math.round(22 * (1 - progress / 100)))} min`}</div>
        </div>
      </div>

      {/* Volunteer info */}
      <div style={{ margin: "16px 16px 0", background: C.white, borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "center", boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🧑</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Rahul Verma</div>
          <div style={{ fontSize: 11, color: C.muted }}>⭐ 4.8 · 142 deliveries · Honda Activa</div>
        </div>
        <button style={{ width: 38, height: 38, borderRadius: "50%", background: C.greenPale, border: `1.5px solid ${C.greenLight}`, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>📞</button>
      </div>

      {/* Timeline steps */}
      <div style={{ padding: "16px 16px" }}>
        {steps.map((s, i) => {
          const done = progress >= s.pct;
          const active = i === activeStep;
          return (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, opacity: done ? 1 : 0.4 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? (active ? C.orange : C.green) : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, transition: "background .3s" }}>{s.icon}</div>
                {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: done && i < activeStep ? C.greenLight : C.border, marginTop: 4, minHeight: 16 }} />}
              </div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? C.orange : done ? C.text : C.muted }}>{s.label}</div>
                {active && progress < 100 && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>In progress...</div>}
              </div>
            </div>
          );
        })}
      </div>

      {!started && <div style={{ padding: "0 16px 16px" }}><Btn onClick={() => setStarted(true)} style={{ width: "100%" }}>▶ Start Delivery Simulation</Btn></div>}
      {progress >= 100 && (
        <div style={{ margin: "0 16px 24px", background: C.greenPale, borderRadius: 14, padding: 20, textAlign: "center", border: `1px solid ${C.greenLight}33` }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.greenMid, fontFamily: "'Playfair Display',serif" }}>Delivered Successfully!</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>80 meals delivered · Impact logged to dashboard</div>
        </div>
      )}
    </div>
  );
}

/* ─── SCREEN 5 · IMPACT DASHBOARD ───────────────────────────── */
function Dashboard({ onBack }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  const bars = [
    { label: "Mon", val: 65 }, { label: "Tue", val: 82 }, { label: "Wed", val: 54 },
    { label: "Thu", val: 91 }, { label: "Fri", val: 78 }, { label: "Sat", val: 95 }, { label: "Sun", val: 88 },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.cream, paddingBottom: 40 }}>
      {/* Header with hero image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={IMG.ngo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(27,67,50,.6) 0%, rgba(27,67,50,.95) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "18px 20px" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.white, fontSize: 22, padding: 0, alignSelf: "flex-start" }}>←</button>
          <div>
            <div style={{ fontSize: 10, color: C.greenLight, letterSpacing: "2px", fontWeight: 700 }}>COMMUNITY IMPACT · BHOPAL</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: C.white, lineHeight: 1 }}>
              {loaded ? "48,320" : "0"} <span style={{ fontSize: 14, fontWeight: 400, color: C.greenLight }}>Meals Served</span>
            </div>
            <Badge color={C.greenLight} bg="rgba(255,255,255,.15)">↑ 23% this month</Badge>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Big 4 stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { emoji: "🍽️", num: "48,320", label: "Meals Served", color: C.orange },
            { emoji: "♻️", num: "9.6 Tons", label: "Food Waste Saved", color: C.greenMid },
            { emoji: "🏠", num: "1,204", label: "Families Helped", color: "#4F46E5" },
            { emoji: "🌱", num: "4.2T CO₂", label: "Emissions Reduced", color: C.greenLight },
          ].map((s, i) => (
            <div key={i} className="fadeUp" style={{ background: C.white, borderRadius: 16, padding: 16, boxShadow: C.shadow, border: `1px solid ${C.border}`, animationDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: s.color }}>{s.num}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly bar chart */}
        <div style={{ background: C.white, borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
          <SectionLabel>Weekly Meals Delivered</SectionLabel>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: `linear-gradient(to top, ${C.green}, ${C.greenLight})`, height: loaded ? `${b.val}%` : "0%", transition: `height .8s ease ${i * .08}s` }} />
                <div style={{ fontSize: 9, color: C.muted }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI features */}
        <div style={{ background: C.green, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <SectionLabel>🤖 AI Features Performance</SectionLabel>
          {[
            { label: "Donor–NGO Matching Accuracy", pct: 94 },
            { label: "Route Optimization Savings", pct: 68 },
            { label: "Freshness Scan Precision", pct: 87 },
            { label: "Demand Prediction Accuracy", pct: 81 },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.8)" }}>{f.label}</span>
                <span style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{f.pct}%</span>
              </div>
              <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 99, height: 6 }}>
                <div style={{ width: loaded ? `${f.pct}%` : "0%", height: "100%", background: `linear-gradient(90deg, ${C.greenLight}, ${C.gold})`, borderRadius: 99, transition: `width 1s ease ${i * .15}s` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: C.shadow, border: `1px solid ${C.border}` }}>
          <SectionLabel>Recent Deliveries</SectionLabel>
          {[
            { food: IMG.biryani, text: "80 plates Biryani → Akshaya Patra", time: "12 min ago", tag: "Delivered" },
            { food: IMG.bread, text: "120 Breads → Robin Hood Army", time: "1 hr ago", tag: "Delivered" },
            { food: IMG.dal, text: "60 portions Dal → Roti Bank", time: "2 hrs ago", tag: "Delivered" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 12, marginBottom: 12, borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
              <img src={a.food} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{a.text}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{a.time}</div>
              </div>
              <Badge color={C.greenMid} bg={C.greenPale}>{a.tag}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", background: C.paper, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <GlobalCSS />
      {screen === "home"      && <RoleScreen   onRole={setScreen} />}
      {screen === "donor"     && <DonorPortal  onBack={() => setScreen("home")} />}
      {screen === "ngo"       && <NGOPortal    onBack={() => setScreen("home")} onTrack={() => setScreen("track")} />}
      {screen === "track"     && <TrackingScreen onBack={() => setScreen("home")} />}
      {screen === "dashboard" && <Dashboard    onBack={() => setScreen("home")} />}
    </div>
  );
}