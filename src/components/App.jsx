// src/components/App.jsx
// Profit Agent · Command Dashboard
// Glassmorphism UI — спільна точка входу для всіх трьох агентів

import { useState, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────
const AGENTS = [
  {
    id: "profit",
    name: "Profit Agent",
    sub: "Freelance Optimizer",
    icon: "⬡",
    color: "#FF6B00",
    colorLight: "#FF8C3A",
    url: "https://agent-profit.netlify.app",
    lastRec: "Підніми ставку до $42/год",
    confidence: 78,
    confirmRate: 85,
    totalRecs: 24,
    status: "active",
    trend: "+12%",
    metric: "$42/год",
    metricLabel: "Рекомендована ставка",
  },
  {
    id: "zora",
    name: "Zora Agent",
    sub: "NFT Mint Optimizer",
    icon: "◈",
    color: "#1A56FF",
    colorLight: "#4D7FFF",
    url: "https://zora-agent.netlify.app",
    lastRec: "Free mint зараз — gas на мінімумі",
    confidence: 87,
    confirmRate: 92,
    totalRecs: 18,
    status: "active",
    trend: "+142%",
    metric: "~412",
    metricLabel: "Прогноз колекторів",
  },
  {
    id: "trade",
    name: "Trade Agent",
    sub: "Market Optimizer",
    icon: "◆",
    color: "#0A1628",
    colorLight: "#1E3A5F",
    url: "https://trade-agent.netlify.app",
    lastRec: "BTC — сигнал BUY, RSI 62",
    confidence: 81,
    confirmRate: 76,
    totalRecs: 31,
    status: "active",
    trend: "+5.1%",
    metric: "BUY",
    metricLabel: "Поточний сигнал",
  },
];

const ACTIVITY = [
  { time: "20:54", agent: "Zora",   action: "Free mint рекомендовано",     decision: "confirmed", conf: 87 },
  { time: "19:32", agent: "Trade",  action: "ETH — вхід $3,840",           decision: "confirmed", conf: 81 },
  { time: "18:11", agent: "Profit", action: "Ставка $42/год підтверджена", decision: "confirmed", conf: 78 },
  { time: "16:45", agent: "Trade",  action: "SOL — очікування",            decision: "rejected",  conf: 44 },
  { time: "15:20", agent: "Zora",   action: "Animation mint відхилено",    decision: "rejected",  conf: 61 },
];

const agentColor = (name) => {
  if (name === "Zora")   return "#1A56FF";
  if (name === "Trade")  return "#00C2FF";
  if (name === "Profit") return "#FF6B00";
  return "#888";
};

// ── COMPONENT ────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive]   = useState(null);
  const [time, setTime]       = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const totalRecs = AGENTS.reduce((s, a) => s + a.totalRecs, 0);
  const avgConf   = Math.round(AGENTS.reduce((s, a) => s + a.confidence, 0) / AGENTS.length);
  const avgRate   = Math.round(AGENTS.reduce((s, a) => s + a.confirmRate, 0) / AGENTS.length);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E8EDF5 0%, #D4DCE8 40%, #E2E8F2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeSlide { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse2    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.95)} }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: pointer; }
        .card-hover:hover { transform: translateY(-4px) scale(1.01); }
        .btn-hover  { transition: all 0.2s ease; }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(10,22,40,0.4) !important; }
        .fade-in    { animation: fadeSlide 0.5s ease forwards; }
        .pulse-dot  { animation: pulse2 2s infinite; }
      `}</style>

      {/* Ambient blobs */}
      <div style={{ position: "fixed", top: "8%",    left: "4%",   width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "8%", right: "4%",  width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Main glass panel */}
      <div style={{
        width: "100%",
        maxWidth: 960,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        borderRadius: 28,
        border: "1.5px solid rgba(255,255,255,0.88)",
        boxShadow: "0 8px 64px rgba(80,100,140,0.18), 0 2px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(200,210,230,0.4) inset",
        padding: "32px",
        opacity: mounted ? 1 : 0,
        animation: mounted ? "fadeSlide 0.6s ease forwards" : "none",
      }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "4px", color: "#8A9BB0", marginBottom: 6, fontWeight: 500 }}>
              PROFIT AGENT SYSTEM
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 800, margin: 0,
              color: "#0A1628", letterSpacing: "-0.5px", lineHeight: 1,
            }}>
              Command Dashboard
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: "#6A7E96", padding: "6px 14px", background: "rgba(255,255,255,0.6)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.8)" }}>
              {time.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div className="pulse-dot" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,200,120,0.2)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00E5A0", boxShadow: "0 0 8px #00E5A0" }} />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 14, height: 1.5, background: "#0A1628", borderRadius: 2 }} />)}
              </div>
            </div>
          </div>
        </div>

        {/* ── SUMMARY STRIP ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Всього аналізів",    value: totalRecs,   icon: "◈", color: "#1A56FF" },
            { label: "Середній confidence", value: `${avgConf}%`, icon: "◆", color: "#FF6B00" },
            { label: "Confirmation rate",   value: `${avgRate}%`, icon: "⬡", color: "#00C2FF" },
          ].map((s, i) => (
            <div key={i} className="card-hover" style={{
              background: "rgba(255,255,255,0.6)",
              border: "1.5px solid rgba(255,255,255,0.9)",
              borderRadius: 16, padding: "14px 18px",
              boxShadow: "0 2px 20px rgba(80,100,140,0.08)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}15`, border: `1.5px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: s.color, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 22, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#0A1628", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#8A9BB0", marginTop: 3, letterSpacing: "1px" }}>{s.label.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── AGENT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 14, marginBottom: 20 }}>
          {AGENTS.map((agent, i) => (
            <div
              key={agent.id}
              className="card-hover"
              onClick={() => {
                setActive(active === agent.id ? null : agent.id);
                window.open(agent.url, "_blank");
              }}
              style={{
                background: agent.id === "trade"
                  ? "linear-gradient(145deg, #0A1628, #1E3A5F)"
                  : `linear-gradient(145deg, ${agent.color}E8, ${agent.colorLight}CC)`,
                borderRadius: 20, padding: "22px",
                border: active === agent.id ? "2px solid rgba(255,255,255,0.6)" : "1.5px solid rgba(255,255,255,0.25)",
                boxShadow: active === agent.id ? `0 12px 48px ${agent.color}50` : `0 4px 24px ${agent.color}30`,
                position: "relative", overflow: "hidden",
                animation: `fadeSlide 0.5s ease ${i * 0.1}s both`,
              }}
            >
              {/* Glass reflection */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)", borderRadius: "20px 20px 0 0", pointerEvents: "none" }} />

              {/* Card header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
                  {agent.icon}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "2px" }}>TREND</div>
                  <div style={{ fontSize: 15, color: "#fff", fontWeight: "bold", fontFamily: "'Syne', sans-serif" }}>{agent.trend}</div>
                </div>
              </div>

              {/* Name */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 17, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", marginBottom: 2 }}>{agent.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{agent.sub}</div>
              </div>

              {/* Metric */}
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", marginBottom: 4 }}>{agent.metricLabel.toUpperCase()}</div>
                <div style={{ fontSize: 22, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff" }}>{agent.metric}</div>
              </div>

              {/* Last rec */}
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 14 }}>
                {agent.lastRec}
              </div>

              {/* Confidence bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}>CONFIDENCE</div>
                  <div style={{ fontSize: 12, color: "#fff", fontWeight: "bold", fontFamily: "'Syne', sans-serif" }}>{agent.confidence}%</div>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${agent.confidence}%`, background: "rgba(255,255,255,0.85)", borderRadius: 2, transition: "width 1s ease" }} />
                </div>
              </div>

              {/* Live badge */}
              <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: 9, padding: "3px 8px", borderRadius: 10, background: "rgba(0,229,160,0.2)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.3)", letterSpacing: "2px" }}>
                LIVE ↗
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM SECTION ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "start" }}>

          {/* Activity feed */}
          <div style={{ background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.85)", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 20px rgba(80,100,140,0.08)" }}>
            <div style={{ fontSize: 10, letterSpacing: "3px", color: "#8A9BB0", marginBottom: 14, fontWeight: 500 }}>ACTIVITY FEED</div>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
                borderBottom: i < ACTIVITY.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                animation: `fadeSlide 0.4s ease ${i * 0.08}s both`,
              }}>
                <div style={{ fontSize: 10, color: "#A0B0C0", width: 38, flexShrink: 0 }}>{a.time}</div>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: agentColor(a.agent), flexShrink: 0, boxShadow: `0 0 6px ${agentColor(a.agent)}` }} />
                <div style={{ flex: 1, fontSize: 12, color: "#3A5068" }}>{a.action}</div>
                <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, flexShrink: 0, background: a.decision === "confirmed" ? "rgba(0,229,160,0.12)" : "rgba(255,77,106,0.1)", color: a.decision === "confirmed" ? "#00B882" : "#FF4D6A", border: `1px solid ${a.decision === "confirmed" ? "rgba(0,229,160,0.2)" : "rgba(255,77,106,0.2)"}` }}>
                  {a.decision === "confirmed" ? "✓" : "✕"}
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 160 }}>

            {/* System status */}
            <div style={{ background: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.85)", borderRadius: 20, padding: "16px 18px", boxShadow: "0 2px 20px rgba(80,100,140,0.08)" }}>
              <div style={{ fontSize: 10, letterSpacing: "3px", color: "#8A9BB0", marginBottom: 12, fontWeight: 500 }}>STATUS</div>
              {AGENTS.map(agent => (
                <div key={agent.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#00E5A0", boxShadow: "0 0 6px #00E5A080", flexShrink: 0 }} />
                  <div style={{ fontSize: 11, color: "#3A5068", flex: 1 }}>{agent.name}</div>
                  <div style={{ fontSize: 10, color: "#8A9BB0" }}>LIVE</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className="btn-hover"
              onClick={() => AGENTS.forEach(a => window.open(a.url, "_blank"))}
              style={{
                background: "#0A1628", border: "none", borderRadius: 16,
                padding: "16px 20px", color: "#fff",
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13,
                cursor: "pointer", letterSpacing: "0.5px",
                boxShadow: "0 8px 32px rgba(10,22,40,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              ▶ Run All
            </button>

            {/* Agents online */}
            <div style={{ background: "linear-gradient(135deg, #1A56FF20, #1A56FF08)", border: "1.5px solid #1A56FF20", borderRadius: 16, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#1A56FF" }}>3/3</div>
              <div style={{ fontSize: 10, color: "#8A9BB0", letterSpacing: "2px", marginTop: 4 }}>AGENTS ONLINE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
