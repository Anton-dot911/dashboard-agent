// src/components/App.jsx
// Command Dashboard — мобільна адаптація + великий текст

import { useState, useEffect } from "react";

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
    trend: "+12%",
    metric: "$42/год",
    metricLabel: "Рекомендована ставка",
    dataSource: "mock",
    features: ["Аналіз ринку", "Рекомендація ставки", "Audit Log"],
  },
  {
    id: "zora",
    name: "Zora Agent",
    sub: "NFT + Creator Coin",
    icon: "◈",
    color: "#1A56FF",
    colorLight: "#4D7FFF",
    url: "https://zora-agent-v3.netlify.app",
    lastRec: "Free mint зараз — gas на мінімумі",
    confidence: 87,
    trend: "+142%",
    metric: "~412",
    metricLabel: "Прогноз колекторів",
    dataSource: "live",
    features: ["Zora GraphQL API", "Base Gas RPC", "$ANTLAB Creator Coin", "How-To інструкції"],
  },
  {
    id: "trade",
    name: "Trade Agent",
    sub: "DEX Market Optimizer",
    icon: "◆",
    color: "#0A1628",
    colorLight: "#1E3A5F",
    url: "https://trader-agent.netlify.app",
    lastRec: "ETH — BUY сигнал на Uniswap",
    confidence: 81,
    trend: "+5.1%",
    metric: "BUY",
    metricLabel: "Поточний сигнал",
    dataSource: "live",
    features: ["CoinGecko Live", "Fear & Greed Index", "DexScreener DEX", "How-To інструкції"],
  },
];

const ACTIVITY = [
  { time: "21:14", agent: "Trade",  action: "ETH BUY на Uniswap рекомендовано",    decision: "confirmed" },
  { time: "20:54", agent: "Zora",   action: "Free mint $ANTLAB рекомендовано",      decision: "confirmed" },
  { time: "19:32", agent: "Trade",  action: "SOL — очікування сигналу",             decision: "rejected"  },
  { time: "18:11", agent: "Profit", action: "Ставка $42/год підтверджена",          decision: "confirmed" },
  { time: "16:45", agent: "Zora",   action: "$ANTLAB — опублікуй контент сьогодні", decision: "confirmed" },
];

const agentColor = (n) => n === "Zora" ? "#1A56FF" : n === "Trade" ? "#00C2FF" : "#FF6B00";

export default function Dashboard() {
  const [time, setTime]         = useState(new Date());
  const [mounted, setMounted]   = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const totalRecs = AGENTS.reduce((s, a) => s + (a.id === "profit" ? 24 : a.id === "zora" ? 18 : 31), 0);
  const avgConf   = Math.round(AGENTS.reduce((s, a) => s + a.confidence, 0) / AGENTS.length);
  const liveCount = AGENTS.filter(a => a.dataSource === "live").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(150deg, #E4EAF4 0%, #CDD8EC 50%, #DDE5F0 100%)",
      padding: "12px",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .card { transition: transform 0.18s ease; cursor: pointer; }
        .card:active { transform: scale(0.985); }
        .run-btn { transition: all 0.18s ease; -webkit-tap-highlight-color: transparent; }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Ambient */}
      <div style={{ position:"fixed", top:"4%", left:"0", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,255,0.09) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"4%", right:"0", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{
        maxWidth: 600,
        margin: "0 auto",
        background: "rgba(255,255,255,0.60)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        borderRadius: 22,
        border: "1.5px solid rgba(255,255,255,0.92)",
        boxShadow: "0 6px 48px rgba(80,100,140,0.15), 0 2px 0 rgba(255,255,255,0.92) inset",
        padding: "20px 16px 24px",
        opacity: mounted ? 1 : 0,
        animation: mounted ? "fadeUp 0.45s ease forwards" : "none",
      }}>

        {/* ── HEADER ── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ fontSize:12, letterSpacing:"3px", color:"#3A5A78", marginBottom:4, fontWeight:600, fontFamily:"'DM Sans', sans-serif" }}>
              PROFIT AGENT SYSTEM
            </div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontSize:28, fontWeight:800, color:"#0A1628", letterSpacing:"-0.5px", lineHeight:1 }}>
              Dashboard
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ fontSize:14, color:"#1A3A52", padding:"8px 14px", background:"rgba(255,255,255,0.72)", borderRadius:20, border:"1px solid rgba(255,255,255,0.88)", fontWeight:600, fontFamily:"'DM Sans', sans-serif" }}>
              {time.toLocaleTimeString("uk-UA", { hour:"2-digit", minute:"2-digit" })}
            </div>
            <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,0.72)", border:"1.5px solid rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ width:12, height:12, borderRadius:"50%", background:"#00E5A0", boxShadow:"0 0 8px #00E5A0", animation:"blink 2s infinite" }} />
            </div>
          </div>
        </div>

        {/* ── SUMMARY STRIP ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:18 }}>
          {[
            { label:"Всього аналізів", value:totalRecs,    icon:"◈", color:"#1A56FF" },
            { label:"Confidence",      value:`${avgConf}%`, icon:"◆", color:"#FF6B00" },
            { label:"Live агентів",    value:`${liveCount}/3`, icon:"●", color:"#00A070" },
            { label:"Agents Online",   value:"3/3",         icon:"⬡", color:"#00B8D9" },
          ].map((s,i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.68)", border:"1.5px solid rgba(255,255,255,0.92)", borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:44, height:44, borderRadius:13, background:`${s.color}18`, border:`1.5px solid ${s.color}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:s.color, flexShrink:0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize:28, fontWeight:800, color:"#0A1628", lineHeight:1, fontFamily:"'Syne', sans-serif" }}>{s.value}</div>
                <div style={{ fontSize:13, color:"#1A3A52", marginTop:3, fontWeight:500, fontFamily:"'DM Sans', sans-serif" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── AGENT CARDS ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:18 }}>
          {AGENTS.map((agent, i) => (
            <div
              key={agent.id}
              className="card"
              onClick={() => setSelected(selected === agent.id ? null : agent.id)}
              style={{
                background: agent.id === "trade"
                  ? "linear-gradient(145deg,#0D1E38,#1E3A5F)"
                  : `linear-gradient(145deg,${agent.color},${agent.colorLight})`,
                borderRadius:20,
                padding:"20px",
                border:"1.5px solid rgba(255,255,255,0.2)",
                boxShadow:`0 4px 24px ${agent.color}35`,
                position:"relative",
                overflow:"hidden",
                animation:`fadeUp 0.45s ease ${i*0.08}s both`,
              }}
            >
              {/* Sheen */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"35%", background:"linear-gradient(180deg,rgba(255,255,255,0.13) 0%,transparent 100%)", pointerEvents:"none" }} />

              {/* Live badge */}
              <div style={{ position:"absolute", top:16, right:16, fontSize:12, padding:"4px 11px", borderRadius:10, background: agent.dataSource === "live" ? "rgba(0,229,160,0.25)" : "rgba(255,255,255,0.18)", color: agent.dataSource === "live" ? "#00E5A0" : "rgba(255,255,255,0.8)", fontWeight:700, letterSpacing:"1px" }}>
                {agent.dataSource === "live" ? "● LIVE" : "○ MOCK"}
              </div>

              {/* Icon + Name */}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                <div style={{ width:50, height:50, borderRadius:15, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#fff", border:"1px solid rgba(255,255,255,0.3)", flexShrink:0 }}>
                  {agent.icon}
                </div>
                <div style={{ paddingRight:70 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1.2, fontFamily:"'Syne', sans-serif" }}>{agent.name}</div>
                  <div style={{ fontSize:15, color:"rgba(255,255,255,0.88)", marginTop:2, fontFamily:"'DM Sans', sans-serif" }}>{agent.sub}</div>
                </div>
              </div>

              {/* Metric + Trend */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"12px 14px" }}>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.78)", marginBottom:4, fontFamily:"'DM Sans', sans-serif" }}>{agent.metricLabel}</div>
                  <div style={{ fontSize:26, fontWeight:800, color:"#fff", fontFamily:"'Syne', sans-serif", lineHeight:1 }}>{agent.metric}</div>
                </div>
                <div style={{ background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"12px 14px" }}>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.78)", marginBottom:4, fontFamily:"'DM Sans', sans-serif" }}>ТРЕНД</div>
                  <div style={{ fontSize:26, fontWeight:800, color:"#fff", fontFamily:"'Syne', sans-serif", lineHeight:1 }}>{agent.trend}</div>
                </div>
              </div>

              {/* Last rec */}
              <div style={{ fontSize:15, color:"rgba(255,255,255,0.92)", lineHeight:1.5, marginBottom:14, fontFamily:"'DM Sans', sans-serif" }}>
                {agent.lastRec}
              </div>

              {/* Confidence bar */}
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.78)", fontFamily:"'DM Sans', sans-serif" }}>CONFIDENCE</div>
                  <div style={{ fontSize:16, color:"#fff", fontWeight:700, fontFamily:"'Syne', sans-serif" }}>{agent.confidence}%</div>
                </div>
                <div style={{ height:5, background:"rgba(255,255,255,0.2)", borderRadius:3 }}>
                  <div style={{ height:"100%", width:`${agent.confidence}%`, background:"rgba(255,255,255,0.88)", borderRadius:3 }} />
                </div>
              </div>

              {/* Expanded */}
              {selected === agent.id && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", letterSpacing:"2px", marginBottom:10 }}>МОЖЛИВОСТІ</div>
                  {agent.features.map((f,fi) => (
                    <div key={fi} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, fontSize:15, color:"rgba(255,255,255,0.92)", fontFamily:"'DM Sans', sans-serif" }}>
                      <span style={{ color:"rgba(255,255,255,0.55)", fontSize:10 }}>◆</span>{f}
                    </div>
                  ))}
                  <a
                    href={agent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display:"block", marginTop:14, padding:"14px 16px", background:"rgba(255,255,255,0.2)", borderRadius:12, fontSize:16, color:"#fff", textDecoration:"none", textAlign:"center", border:"1px solid rgba(255,255,255,0.32)", fontWeight:700, fontFamily:"'DM Sans', sans-serif" }}
                  >
                    Відкрити агента ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── ACTIVITY FEED ── */}
        <div style={{ background:"rgba(255,255,255,0.58)", border:"1.5px solid rgba(255,255,255,0.9)", borderRadius:20, padding:"18px 16px", marginBottom:14 }}>
          <div style={{ fontSize:13, letterSpacing:"2px", color:"#1A3A52", marginBottom:14, fontWeight:700, fontFamily:"'DM Sans', sans-serif" }}>
            ACTIVITY FEED
          </div>
          {ACTIVITY.map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 0", borderBottom: i < ACTIVITY.length-1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
              <div style={{ fontSize:13, color:"#1A3A52", width:44, flexShrink:0, fontWeight:600, fontFamily:"'DM Sans', sans-serif" }}>{a.time}</div>
              <div style={{ width:9, height:9, borderRadius:"50%", background:agentColor(a.agent), flexShrink:0, boxShadow:`0 0 5px ${agentColor(a.agent)}` }} />
              <div style={{ flex:1, fontSize:15, color:"#0A1E30", fontFamily:"'DM Sans', sans-serif", lineHeight:1.4 }}>{a.action}</div>
              <div style={{ fontSize:14, padding:"4px 11px", borderRadius:10, flexShrink:0, background: a.decision==="confirmed" ? "rgba(0,180,130,0.14)" : "rgba(220,60,80,0.1)", color: a.decision==="confirmed" ? "#008A60" : "#CC2A40", fontWeight:700 }}>
                {a.decision === "confirmed" ? "✓" : "✕"}
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM ROW ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>

          {/* Status */}
          <div style={{ background:"rgba(255,255,255,0.58)", border:"1.5px solid rgba(255,255,255,0.9)", borderRadius:20, padding:"16px" }}>
            <div style={{ fontSize:13, letterSpacing:"2px", color:"#1A3A52", marginBottom:14, fontWeight:700, fontFamily:"'DM Sans', sans-serif" }}>STATUS</div>
            {AGENTS.map(agent => (
              <div key={agent.id} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:11 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background: agent.dataSource === "live" ? "#00E5A0" : "#FFB830", flexShrink:0, animation:"blink 2s infinite" }} />
                <div style={{ fontSize:15, color:"#0A1E30", flex:1, fontFamily:"'DM Sans', sans-serif", fontWeight:500 }}>{agent.name}</div>
                <div style={{ fontSize:13, color: agent.dataSource === "live" ? "#008A60" : "#7A6020", fontWeight:700 }}>
                  {agent.dataSource === "live" ? "LIVE" : "MOCK"}
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <button
              className="run-btn"
              onClick={() => AGENTS.forEach(a => window.open(a.url, "_blank"))}
              style={{ background:"#0A1628", border:"none", borderRadius:16, padding:"18px 14px", color:"#fff", fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:16, cursor:"pointer", boxShadow:"0 8px 28px rgba(10,22,40,0.22)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
            >
              ▶ Run All
            </button>

            <div style={{ background:"rgba(26,86,255,0.12)", border:"1.5px solid rgba(26,86,255,0.2)", borderRadius:16, padding:"14px", textAlign:"center", flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <div style={{ fontSize:34, fontWeight:800, color:"#1A56FF", fontFamily:"'Syne', sans-serif", lineHeight:1 }}>3/3</div>
              <div style={{ fontSize:13, color:"#1A3A52", letterSpacing:"1px", marginTop:6, fontWeight:600, fontFamily:"'DM Sans', sans-serif" }}>ONLINE</div>
            </div>

            <div style={{ background:"rgba(0,180,130,0.12)", border:"1.5px solid rgba(0,180,130,0.2)", borderRadius:16, padding:"14px", textAlign:"center" }}>
              <div style={{ fontSize:34, fontWeight:800, color:"#008A60", fontFamily:"'Syne', sans-serif", lineHeight:1 }}>{liveCount}/3</div>
              <div style={{ fontSize:13, color:"#1A3A52", letterSpacing:"1px", marginTop:6, fontWeight:600, fontFamily:"'DM Sans', sans-serif" }}>LIVE DATA</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
