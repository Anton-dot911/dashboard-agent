// src/components/App.jsx
// Command Dashboard v2 — актуальні посилання і статус агентів

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
    confirmRate: 85,
    totalRecs: 24,
    trend: "+12%",
    metric: "$42/год",
    metricLabel: "Рекомендована ставка",
    dataSource: "mock",
    version: "v1",
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
    confirmRate: 92,
    totalRecs: 18,
    trend: "+142%",
    metric: "~412",
    metricLabel: "Прогноз колекторів",
    dataSource: "live",
    version: "v3",
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
    confirmRate: 76,
    totalRecs: 31,
    trend: "+5.1%",
    metric: "BUY",
    metricLabel: "Поточний сигнал",
    dataSource: "live",
    version: "v2",
    features: ["CoinGecko Live", "Fear & Greed Index", "DexScreener DEX", "How-To інструкції"],
  },
];

const ACTIVITY = [
  { time: "21:14", agent: "Trade",  action: "ETH BUY на Uniswap рекомендовано",    decision: "confirmed", conf: 81 },
  { time: "20:54", agent: "Zora",   action: "Free mint $ANTLAB рекомендовано",      decision: "confirmed", conf: 87 },
  { time: "19:32", agent: "Trade",  action: "SOL — очікування сигналу",             decision: "rejected",  conf: 44 },
  { time: "18:11", agent: "Profit", action: "Ставка $42/год підтверджена",          decision: "confirmed", conf: 78 },
  { time: "16:45", agent: "Zora",   action: "$ANTLAB — опублікуй контент сьогодні", decision: "confirmed", conf: 74 },
];

const agentColor = (n) => n === "Zora" ? "#1A56FF" : n === "Trade" ? "#00C2FF" : "#FF6B00";

export default function Dashboard() {
  const [time, setTime]       = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const totalRecs = AGENTS.reduce((s, a) => s + a.totalRecs, 0);
  const avgConf   = Math.round(AGENTS.reduce((s, a) => s + a.confidence, 0) / AGENTS.length);
  const avgRate   = Math.round(AGENTS.reduce((s, a) => s + a.confirmRate, 0) / AGENTS.length);
  const liveCount = AGENTS.filter(a => a.dataSource === "live").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #E8EDF5 0%, #D0D9E8 50%, #E2E8F2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .agent-card { transition: transform 0.22s ease, box-shadow 0.22s ease; cursor: pointer; }
        .agent-card:hover { transform: translateY(-5px) scale(1.015); }
        .sum-card { transition: transform 0.18s ease; }
        .sum-card:hover { transform: translateY(-2px); }
        .run-btn { transition: all 0.18s ease; }
        .run-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(10,22,40,0.38) !important; }
      `}</style>

      {/* Ambient */}
      <div style={{ position:"fixed", top:"6%", left:"3%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,255,0.09) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"6%", right:"3%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* Glass panel */}
      <div style={{
        width:"100%", maxWidth:960,
        background:"rgba(255,255,255,0.56)",
        backdropFilter:"blur(36px) saturate(190%)",
        WebkitBackdropFilter:"blur(36px) saturate(190%)",
        borderRadius:28,
        border:"1.5px solid rgba(255,255,255,0.9)",
        boxShadow:"0 8px 60px rgba(80,100,140,0.17), 0 2px 0 rgba(255,255,255,0.92) inset",
        padding:"28px 28px 24px",
        opacity: mounted ? 1 : 0,
        animation: mounted ? "fadeUp 0.55s ease forwards" : "none",
      }}>

        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"4px", color:"#8A9BB0", marginBottom:5, fontWeight:500 }}>
              PROFIT AGENT SYSTEM · v2
            </div>
            <div style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:800, color:"#0A1628", letterSpacing:"-0.5px", lineHeight:1, fontFamily:"'Syne', sans-serif" }}>
              Command Dashboard
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ fontSize:11, color:"#6A7E96", padding:"6px 13px", background:"rgba(255,255,255,0.65)", borderRadius:20, border:"1px solid rgba(255,255,255,0.85)" }}>
              {time.toLocaleTimeString("uk-UA", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
            </div>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.72)", border:"1.5px solid rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 12px rgba(0,200,120,0.18)" }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#00E5A0", boxShadow:"0 0 8px #00E5A0", animation:"blink 2s infinite" }} />
            </div>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.72)", border:"1.5px solid rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                {[0,1,2].map(i => <div key={i} style={{ width:13, height:1.5, background:"#0A1628", borderRadius:2 }} />)}
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY STRIP */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
          {[
            { label:"Всього аналізів",     value:totalRecs,    icon:"◈", color:"#1A56FF" },
            { label:"Середній confidence", value:`${avgConf}%`, icon:"◆", color:"#FF6B00" },
            { label:"Confirmation rate",   value:`${avgRate}%`, icon:"⬡", color:"#00B8D9" },
            { label:"Live агентів",        value:`${liveCount}/3`, icon:"●", color:"#00E5A0" },
          ].map((s,i) => (
            <div key={i} className="sum-card" style={{ background:"rgba(255,255,255,0.62)", border:"1.5px solid rgba(255,255,255,0.92)", borderRadius:16, padding:"12px 14px", boxShadow:"0 2px 18px rgba(80,100,140,0.07)", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:11, background:`${s.color}14`, border:`1.5px solid ${s.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, color:s.color, flexShrink:0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize:19, fontWeight:800, color:"#0A1628", lineHeight:1, fontFamily:"'Syne', sans-serif" }}>{s.value}</div>
                <div style={{ fontSize:9, color:"#8A9BB0", marginTop:3, letterSpacing:"1px" }}>{s.label.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AGENT CARDS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:12, marginBottom:18 }}>
          {AGENTS.map((agent, i) => (
            <div
              key={agent.id}
              className="agent-card"
              onMouseEnter={() => setHovered(agent.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === agent.id ? null : agent.id)}
              style={{
                background: agent.id === "trade"
                  ? "linear-gradient(145deg,#0A1628,#1E3A5F)"
                  : `linear-gradient(145deg,${agent.color}E6,${agent.colorLight}CC)`,
                borderRadius:20, padding:"20px",
                border: hovered === agent.id ? "2px solid rgba(255,255,255,0.65)" : "1.5px solid rgba(255,255,255,0.22)",
                boxShadow: hovered === agent.id ? `0 14px 50px ${agent.color}55` : `0 4px 22px ${agent.color}28`,
                position:"relative", overflow:"hidden",
                animation:`fadeUp 0.5s ease ${i*0.1}s both`,
              }}
            >
              {/* Glass sheen */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"38%", background:"linear-gradient(180deg,rgba(255,255,255,0.14) 0%,transparent 100%)", borderRadius:"20px 20px 0 0", pointerEvents:"none" }} />

              {/* Data source badge */}
              <div style={{ position:"absolute", top:14, right:14, fontSize:9, padding:"2px 8px", borderRadius:10, background: agent.dataSource === "live" ? "rgba(0,229,160,0.2)" : "rgba(255,255,255,0.15)", color: agent.dataSource === "live" ? "#00E5A0" : "rgba(255,255,255,0.6)", border:`1px solid ${agent.dataSource === "live" ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.2)"}`, letterSpacing:"2px" }}>
                {agent.dataSource === "live" ? "● LIVE" : "○ MOCK"}
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div style={{ width:42, height:42, borderRadius:13, background:"rgba(255,255,255,0.2)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:21, color:"#fff", border:"1px solid rgba(255,255,255,0.28)" }}>
                  {agent.icon}
                </div>
                <div style={{ textAlign:"right", marginRight:60 }}>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.55)", letterSpacing:"2px" }}>TREND</div>
                  <div style={{ fontSize:14, color:"#fff", fontWeight:"bold", fontFamily:"'Syne', sans-serif" }}>{agent.trend}</div>
                </div>
              </div>

              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:2, fontFamily:"'Syne', sans-serif" }}>{agent.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.58)" }}>{agent.sub}</div>
              </div>

              <div style={{ background:"rgba(0,0,0,0.2)", borderRadius:11, padding:"9px 13px", marginBottom:12 }}>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.48)", letterSpacing:"2px", marginBottom:3 }}>{agent.metricLabel.toUpperCase()}</div>
                <div style={{ fontSize:20, fontWeight:800, color:"#fff", fontFamily:"'Syne', sans-serif" }}>{agent.metric}</div>
              </div>

              <div style={{ fontSize:12, color:"rgba(255,255,255,0.72)", lineHeight:1.5, marginBottom:12 }}>
                {agent.lastRec}
              </div>

              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.48)", letterSpacing:"2px" }}>CONFIDENCE</div>
                  <div style={{ fontSize:12, color:"#fff", fontWeight:"bold", fontFamily:"'Syne', sans-serif" }}>{agent.confidence}%</div>
                </div>
                <div style={{ height:3, background:"rgba(255,255,255,0.15)", borderRadius:2 }}>
                  <div style={{ height:"100%", width:`${agent.confidence}%`, background:"rgba(255,255,255,0.82)", borderRadius:2, transition:"width 1.2s ease" }} />
                </div>
              </div>

              {/* Expanded features */}
              {selected === agent.id && (
                <div style={{ marginTop:12, padding:"10px 0 0", borderTop:"1px solid rgba(255,255,255,0.15)" }}>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.45)", letterSpacing:"2px", marginBottom:6 }}>FEATURES</div>
                  {agent.features.map((f, fi) => (
                    <div key={fi} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, fontSize:11, color:"rgba(255,255,255,0.7)" }}>
                      <span style={{ color:"rgba(255,255,255,0.4)", fontSize:8 }}>◆</span>{f}
                    </div>
                  ))}
                  <a href={agent.url} target="_blank" rel="noopener noreferrer" style={{ display:"block", marginTop:10, padding:"7px 14px", background:"rgba(255,255,255,0.15)", borderRadius:8, fontSize:11, color:"#fff", textDecoration:"none", textAlign:"center", border:"1px solid rgba(255,255,255,0.25)", letterSpacing:"1px" }}>
                    Відкрити ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"start" }}>

          {/* Activity feed */}
          <div style={{ background:"rgba(255,255,255,0.52)", border:"1.5px solid rgba(255,255,255,0.88)", borderRadius:20, padding:"16px 18px", boxShadow:"0 2px 18px rgba(80,100,140,0.07)" }}>
            <div style={{ fontSize:10, letterSpacing:"3px", color:"#8A9BB0", marginBottom:12, fontWeight:500 }}>ACTIVITY FEED</div>
            {ACTIVITY.map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom: i < ACTIVITY.length-1 ? "1px solid rgba(0,0,0,0.045)" : "none", animation:`fadeUp 0.4s ease ${i*0.07}s both` }}>
                <div style={{ fontSize:10, color:"#A0B0C0", width:36, flexShrink:0 }}>{a.time}</div>
                <div style={{ width:7, height:7, borderRadius:"50%", background:agentColor(a.agent), flexShrink:0, boxShadow:`0 0 5px ${agentColor(a.agent)}` }} />
                <div style={{ flex:1, fontSize:12, color:"#3A5068" }}>{a.action}</div>
                <div style={{ fontSize:10, padding:"2px 7px", borderRadius:10, flexShrink:0, background: a.decision==="confirmed" ? "rgba(0,229,160,0.11)" : "rgba(255,77,106,0.09)", color: a.decision==="confirmed" ? "#00B882" : "#FF4D6A", border:`1px solid ${a.decision==="confirmed" ? "rgba(0,229,160,0.2)" : "rgba(255,77,106,0.18)"}` }}>
                  {a.decision === "confirmed" ? "✓" : "✕"}
                </div>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, minWidth:155 }}>

            {/* Status */}
            <div style={{ background:"rgba(255,255,255,0.52)", border:"1.5px solid rgba(255,255,255,0.88)", borderRadius:20, padding:"14px 16px", boxShadow:"0 2px 18px rgba(80,100,140,0.07)" }}>
              <div style={{ fontSize:10, letterSpacing:"3px", color:"#8A9BB0", marginBottom:10, fontWeight:500 }}>STATUS</div>
              {AGENTS.map(agent => (
                <div key={agent.id} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:8 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background: agent.dataSource === "live" ? "#00E5A0" : "#FFB830", flexShrink:0, animation:"blink 2s infinite" }} />
                  <div style={{ fontSize:11, color:"#3A5068", flex:1 }}>{agent.name}</div>
                  <div style={{ fontSize:9, color: agent.dataSource === "live" ? "#00B882" : "#8A9BB0" }}>
                    {agent.dataSource === "live" ? "LIVE" : "MOCK"}
                  </div>
                </div>
              ))}
            </div>

            {/* Run All */}
            <button
              className="run-btn"
              onClick={() => AGENTS.forEach(a => window.open(a.url, "_blank"))}
              style={{ background:"#0A1628", border:"none", borderRadius:14, padding:"15px 18px", color:"#fff", fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:12, cursor:"pointer", letterSpacing:"0.5px", boxShadow:"0 8px 28px rgba(10,22,40,0.22)", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}
            >
              ▶ Run All
            </button>

            {/* Agents online */}
            <div style={{ background:"linear-gradient(135deg,#1A56FF1A,#1A56FF08)", border:"1.5px solid #1A56FF1E", borderRadius:14, padding:"13px 14px", textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:800, color:"#1A56FF", fontFamily:"'Syne', sans-serif" }}>3/3</div>
              <div style={{ fontSize:9, color:"#8A9BB0", letterSpacing:"2px", marginTop:4 }}>AGENTS ONLINE</div>
            </div>

            {/* Live count */}
            <div style={{ background:"linear-gradient(135deg,#00E5A01A,#00E5A008)", border:"1.5px solid #00E5A01E", borderRadius:14, padding:"13px 14px", textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:800, color:"#00E5A0", fontFamily:"'Syne', sans-serif" }}>{liveCount}/3</div>
              <div style={{ fontSize:9, color:"#8A9BB0", letterSpacing:"2px", marginTop:4 }}>LIVE DATA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
