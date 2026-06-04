import { useState, useEffect, useRef } from "react";

const styles = {
  container: { background: "#000", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100%", overflow: "hidden" },
  orbitalContainer: { position: "absolute", inset: 0, pointerEvents: "none" },
  orb: { position: "absolute", borderRadius: "50%", filter: "blur(80px)", mixBlendMode: "screen" },
  orb1: { top: "-20%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(0,100,255,0.15) 0%, transparent 70%)" },
  orb2: { bottom: "-15%", left: "-5%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(0,60,200,0.12) 0%, transparent 70%)" },
  orb3: { top: "50%", left: "-15%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 70%)" },
  particlesContainer: { position: "absolute", inset: 0, pointerEvents: "none" },
  particle: { position: "absolute", background: "radial-gradient(circle, rgba(0,180,255,0.9), rgba(0,80,255,0.4))", borderRadius: "50%", filter: "blur(1px)" },
  contentWrapper: { position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 15px 40px 15px", maxWidth: "1200px", margin: "0 auto", textAlign: "center", width: "100%" },
  mainTitle: { fontFamily: "'Poppins', sans-serif", fontSize: "clamp(3.5rem, 12vw, 7rem)", fontWeight: 900, letterSpacing: "0.1em", marginBottom: "20px", background: "linear-gradient(135deg, #fff 0%, #00cfff 50%, #0066ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  titleGlowLine: { height: "3px", width: "200px", background: "linear-gradient(90deg, transparent, #00aaff, transparent)", margin: "0 auto 30px auto", borderRadius: "2px", boxShadow: "0 0 20px rgba(0,170,255,0.8)" },
  featureCard: { position: "relative", marginBottom: "40px", maxWidth: "700px", width: "100%" },
  featureCardBorder: { position: "absolute", inset: 0, border: "2px solid rgba(0,150,255,0.3)", borderRadius: "20px", background: "linear-gradient(135deg, rgba(0,100,255,0.05), rgba(0,180,255,0.05))", backdropFilter: "blur(20px)" },
  featureCardContent: { position: "relative", padding: "40px 35px", borderRadius: "20px", zIndex: 1 },
  featuredMessage: { fontSize: "clamp(1.2rem, 4vw, 1.5rem)", color: "#cbd5e1", lineHeight: "1.8", fontWeight: 400, fontFamily: "'Poppins', sans-serif" },
  emphasizedText: { color: "#fff", fontWeight: 600, background: "linear-gradient(135deg, #00cfff, #0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: "1.3rem", marginTop: "15px", display: "block" },
  buttonContainer: { display: "flex", justifyContent: "center", gap: "30px", marginBottom: "40px", flexWrap: "wrap", width: "100%" },
  buttonBox: { position: "relative", flex: "1 1 100%", minWidth: "160px", maxWidth: "300px" },
  buttonBorder: { position: "absolute", inset: 0, border: "2px solid rgba(0,150,255,0.5)", borderRadius: "16px", background: "linear-gradient(135deg, rgba(0,100,255,0.1), rgba(0,180,255,0.1))", backdropFilter: "blur(10px)" },
  buttonContent: { position: "relative", padding: "25px 20px", borderRadius: "16px", zIndex: 1, cursor: "pointer", transition: "all 0.3s ease" },
  buttonLabel: { fontSize: "0.8rem", color: "#00aaff", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  buttonText: { fontSize: "1.3rem", color: "#fff", fontWeight: 700, fontFamily: "'Poppins', sans-serif" },
  buttonSubtext: { fontSize: "0.75rem", color: "#94a3b8", marginTop: "8px", fontStyle: "italic" },
  countdownSection: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "900px", marginTop: "10px", zIndex: 15 },
  countdownContainer: { background: "linear-gradient(135deg, rgba(0,80,255,0.1), rgba(0,180,255,0.1))", border: "2px solid rgba(0,150,255,0.3)", borderRadius: "16px", padding: "25px", backdropFilter: "blur(10px)", width: "100%" },
  countdownLabel: { fontSize: "0.9rem", color: "#00aaff", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "20px", fontWeight: 600, fontFamily: "'Poppins', sans-serif" },
  countdownGrid: { display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" },
  countdownItem: { display: "flex", flexDirection: "column", alignItems: "center", padding: "15px 12px", background: "linear-gradient(135deg, rgba(0,10,30,0.8), rgba(0,20,60,0.6))", border: "1px solid rgba(0,150,255,0.4)", borderRadius: "10px", minWidth: "60px" },
  countdownNumber: { fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, color: "#00cfff", fontFamily: "'Poppins', sans-serif", textShadow: "0 0 15px rgba(0,200,255,0.8)" },
  countdownItemLabel: { fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "5px", fontWeight: 600 },
  countdownSeparator: { fontSize: "1.5rem", color: "#00aaff", opacity: 0.6, fontWeight: "bold" },
  licenseCard: {
  position: "relative",
  marginTop: "30px",
  marginBottom: "20px",
  background: "linear-gradient(135deg, rgba(0,80,255,0.2), rgba(0,180,255,0.2))",
  border: "1px solid rgba(0,180,255,0.4)",
  borderRadius: "12px",
  padding: "15px 25px",
  backdropFilter: "blur(10px)",
  maxWidth: "90%"
}, licenseText: { fontSize: "0.75rem", color: "#64748b", letterSpacing: "0.05em", fontFamily: "'Courier Prime', monospace" },
  pageTitle: { fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.5rem, 10vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: "40px", background: "linear-gradient(135deg, #00cfff 0%, #0066ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  questionStep: { fontSize: "0.9rem", color: "#00aaff", marginBottom: "20px", fontWeight: 600 },
  questionContainer: { maxWidth: "600px", width: "100%" },
  questionBox: { position: "relative", marginBottom: "30px" },
  questionBorder: { position: "absolute", inset: 0, border: "2px solid rgba(0,150,255,0.3)", borderRadius: "16px", background: "linear-gradient(135deg, rgba(0,80,255,0.05), rgba(0,180,255,0.05))", backdropFilter: "blur(10px)" },
  questionContent: { position: "relative", padding: "25px 20px", borderRadius: "16px", zIndex: 1 },
  questionText: { fontSize: "1.1rem", color: "#cbd5e1", marginBottom: "15px", fontWeight: 500, fontFamily: "'Poppins', sans-serif" },
  questionInput: { width: "100%", padding: "12px 15px", background: "rgba(0,10,30,0.8)", border: "1px solid rgba(0,150,255,0.4)", borderRadius: "8px", color: "#e0e7ff", fontSize: "1rem", fontFamily: "'Poppins', sans-serif", transition: "all 0.3s ease", boxSizing: "border-box" },
  yesNoContainer: { display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" },
  yesNoButton: { position: "relative", flex: "1", minWidth: "150px", maxWidth: "200px" },
  yesNoBorder: { position: "absolute", inset: 0, border: "2px solid rgba(0,150,255,0.3)", borderRadius: "12px", background: "linear-gradient(135deg, rgba(0,80,255,0.05), rgba(0,180,255,0.05))", backdropFilter: "blur(10px)" },
  yesNoContent: { position: "relative", padding: "20px", borderRadius: "12px", zIndex: 1, cursor: "pointer", transition: "all 0.3s ease", textAlign: "center" },
  yesNoText: { fontSize: "1.3rem", color: "#fff", fontWeight: 700, fontFamily: "'Poppins', sans-serif" },
  backButton: { position: "fixed", top: "20px", left: "20px", padding: "12px 20px", background: "linear-gradient(135deg, #0055ff, #00aaff)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", zIndex: 25, fontFamily: "'Poppins', sans-serif", transition: "all 0.3s ease" },
  submitButton: { marginTop: "30px", padding: "16px 40px", background: "linear-gradient(135deg, #0055ff, #00cfff)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700, fontSize: "1rem", fontFamily: "'Poppins', sans-serif", transition: "all 0.3s ease" },
  errorMessage: { padding: "20px", background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(220,38,38,0.1))", border: "2px solid rgba(239,68,68,0.3)", borderRadius: "12px", color: "#fca5a5", fontSize: "1rem", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  messageBox: { position: "relative", marginBottom: "40px", maxWidth: "700px", width: "100%" },
  messageBorder: { position: "absolute", inset: 0, border: "2px solid rgba(0,180,255,0.4)", borderRadius: "20px", background: "linear-gradient(135deg, rgba(0,100,255,0.1), rgba(0,180,255,0.1))", backdropFilter: "blur(20px)" },
  messageContent: { position: "relative", padding: "40px", borderRadius: "20px", zIndex: 1 },
  messageText: { fontSize: "clamp(1.2rem, 4vw, 1.6rem)", color: "#cbd5e1", lineHeight: "1.8", fontFamily: "'Poppins', sans-serif" },
  successMessage: { fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: "#cbd5e1", marginBottom: "40px", fontFamily: "'Poppins', sans-serif" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Courier+Prime:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #000; overflow-x: hidden; }
  body { font-family: 'Poppins', sans-serif; color: #e0e7ff; line-height: 1.6; }
  button:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,180,255,0.4); }
  button:active { transform: translateY(2px); }
  input:focus { outline: none; border-color: rgba(0,180,255,0.8) !important; box-shadow: 0 0 20px rgba(0,180,255,0.3); }

  @keyframes float {
    0%,100% { transform: translateY(0) translateX(0); opacity: 0.3; }
    25% { transform: translateY(-30px) translateX(20px); opacity: 0.6; }
    50% { transform: translateY(-60px) translateX(-20px); opacity: 0.8; }
    75% { transform: translateY(-30px) translateX(10px); opacity: 0.5; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%,100% { filter: drop-shadow(0 0 20px rgba(0,150,255,0.6)); }
    50% { filter: drop-shadow(0 0 50px rgba(0,200,255,1)); }
  }
  @keyframes borderGlow {
    0%,100% { box-shadow: 0 0 20px rgba(0,150,255,0.4); }
    50% { box-shadow: 0 0 40px rgba(0,200,255,0.8); }
  }
  @keyframes orbPulse {
    0%,100% { box-shadow: 0 0 40px rgba(0,100,255,0.3); }
    50% { box-shadow: 0 0 80px rgba(0,180,255,0.5); }
  }
  .anim-fadeIn { animation: fadeIn 1s ease-out both; }
  .anim-glowPulse { animation: glowPulse 4s ease-in-out infinite; }
  .anim-borderGlow { animation: borderGlow 3s ease-in-out infinite; }
`;

// ─── SUPERVOOC-style Energy Orb using Canvas ───────────────────────
function EnergyOrb() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = 260;
    const H = canvas.height = 260;
    const cx = W / 2, cy = H / 2;

    const NUM_ARCS = 3;
    const RING_R = 100;
    const arcs = Array.from({ length: NUM_ARCS }, (_, i) => ({
      offset: (i / NUM_ARCS) * Math.PI * 2,
      speed: 0.012 + i * 0.004,
      points: Array.from({ length: 60 }, (_, j) => ({
        angle: (j / 60) * Math.PI * 2,
        r: RING_R + (Math.random() - 0.5) * 14,
      })),
    }));

    const DOTS = Array.from({ length: 28 }, () => ({
      angle: Math.random() * Math.PI * 2,
      r: RING_R + 10 + Math.random() * 30,
      size: 1 + Math.random() * 2.5,
      speed: (Math.random() - 0.5) * 0.008,
      opacity: 0.4 + Math.random() * 0.6,
    }));

    let t = 0;

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      const halo = ctx.createRadialGradient(cx, cy, 60, cx, cy, 135);
      halo.addColorStop(0, "rgba(0,100,255,0.0)");
      halo.addColorStop(0.5, "rgba(0,120,255,0.08)");
      halo.addColorStop(0.8, "rgba(0,180,255,0.12)");
      halo.addColorStop(1, "rgba(0,60,200,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 135, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      const orb = ctx.createRadialGradient(cx - 18, cy - 18, 4, cx, cy, 82);
      orb.addColorStop(0, "#aee8ff");
      orb.addColorStop(0.25, "#40aaff");
      orb.addColorStop(0.6, "#1060e0");
      orb.addColorStop(0.85, "#0830a0");
      orb.addColorStop(1, "#030f40");
      ctx.beginPath();
      ctx.arc(cx, cy, 82, 0, Math.PI * 2);
      ctx.fillStyle = orb;
      ctx.fill();

      const rim = ctx.createRadialGradient(cx, cy, 72, cx, cy, 90);
      rim.addColorStop(0, "rgba(0,180,255,0.0)");
      rim.addColorStop(0.6, "rgba(0,180,255,0.25)");
      rim.addColorStop(1, "rgba(0,220,255,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      arcs.forEach((arc, ai) => {
        arc.points.forEach((pt) => {
          if (Math.random() < 0.04) pt.r = RING_R + (Math.random() - 0.5) * 18;
        });

        ctx.beginPath();
        for (let pi = 0; pi < arc.points.length; pi++) {
          const pt = arc.points[pi];
          const a = pt.angle + arc.offset + t * arc.speed;
          const x = cx + Math.cos(a) * pt.r;
          const y = cy + Math.sin(a) * pt.r;
          pi === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const pt0 = arc.points[0];
        const a0 = pt0.angle + arc.offset + t * arc.speed;
        ctx.lineTo(cx + Math.cos(a0) * pt0.r, cy + Math.sin(a0) * pt0.r);

        const alpha = 0.55 + 0.35 * Math.sin(t * 0.05 + ai);
        ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "#00cfff";
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      arcs.forEach((arc, ai) => {
        ctx.beginPath();
        for (let pi = 0; pi < arc.points.length; pi += 2) {
          const pt = arc.points[pi];
          const a = pt.angle + arc.offset + t * arc.speed * 1.3;
          const x = cx + Math.cos(a) * (pt.r - 4);
          const y = cy + Math.sin(a) * (pt.r - 4);
          pi === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(180, 240, 255, 0.5)`;
        ctx.lineWidth = 0.8;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      DOTS.forEach(dot => {
        dot.angle += dot.speed;
        const x = cx + Math.cos(dot.angle) * dot.r;
        const y = cy + Math.sin(dot.angle) * dot.r;
        const flicker = 0.5 + 0.5 * Math.sin(t * 0.1 + dot.angle * 3);
        const op = dot.opacity * flicker;
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 240, 255, ${op})`;
        ctx.shadowColor = "#00cfff";
        ctx.shadowBlur = dot.size * 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      const sx = cx + 90, sy = cy + 90;
      const ss = 8 + 2 * Math.sin(t * 0.07);
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(t * 0.02);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const inner = ss * 0.2, outer = ss;
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        const midA = angle + Math.PI / 4;
        ctx.lineTo(Math.cos(midA) * inner, Math.sin(midA) * inner);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(200,240,255,0.9)";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;

      t++;
      frameRef.current = requestAnimationFrame(drawFrame);
    }

    drawFrame();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "min(220px,70vw)", height: "min(220px,70vw)", marginBottom: "20px" }}
    />
  );
}

export default function MinsiiLanding() {
  const [currentPage, setCurrentPage] = useState("home");
  const [momStep, setMomStep] = useState(1);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [error, setError] = useState("");
  const [preRegName, setPreRegName] = useState("");
  const [preRegEmail, setPreRegEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, launched: false });
  const [particles, setParticles] = useState([]);
  const [orbRot, setOrbRot] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    setParticles(Array.from({ length: 50 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      duration: 20 + Math.random() * 20, delay: Math.random() * 5, size: 1 + Math.random() * 3,
    })));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setOrbRot(p => (p + 0.5) % 360), 50);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const dist = new Date("2027-08-13T23:59:59").getTime() - Date.now();
      if (dist > 0) {
        setTimeLeft({ days: Math.floor(dist / 86400000), hours: Math.floor((dist / 3600000) % 24), minutes: Math.floor((dist / 60000) % 60), seconds: Math.floor((dist / 1000) % 60), launched: false });
      } else {
        clearInterval(t);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, launched: true });
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const resetMom = () => { setMomStep(1); setAnswer1(""); setAnswer2(""); setAnswer3(""); setError(""); };
  const resetPreReg = () => { setPreRegName(""); setPreRegEmail(""); setError(""); };

  const handleA1 = () => {
    if (!answer1.trim()) { setError("Please type something first! 🥺"); return; }
    if (answer1.trim().toLowerCase() === "joe") { setMomStep(2); setError(""); setAnswer1(""); }
    else setError("Oopss! You are not my mom. So, just click back to NOTIFY ME! 💔");
  };
  const handleA2 = () => {
    if (!answer2.trim()) { setError("Please type something first! 🥺"); return; }
    if (answer2.trim().toLowerCase() === "joe jaan") { setMomStep(3); setError(""); setAnswer2(""); }
    else setError("Come on mom! You can do it, I will wait for you 💙");
  };
  const handleA3 = (isYes) => { setAnswer3(isYes ? "yes" : "no"); setMomStep(4); };

  const handlePreRegSubmit = async () => {
    if (!preRegName.trim()) {
      setError("Please enter your name to pre-register! 🥺");
      return;
    }

    // YOUR INSTANT DISCORD PIPELINE LINK ADDED BELOW:
    const DATA_DESTINATION_URL = "https://discord.com/api/webhooks/1511999397188341830/ivfiNzCeQ4Uaf8XYvDRJRuFGTpgzzVmTabZP1_P0t4S9QJI-pRkUd4DQxAUCCRq_N7GS";

    try {
      const isDiscord = DATA_DESTINATION_URL.includes("discord.com/api/webhooks");
      
      const payload = isDiscord
        ? { content: `🎉 **New Pre-Registration on MINSII!**\n👤 **Name:** ${preRegName}\n📧 **Email:** ${preRegEmail || "Not provided"}` }
        : { name: preRegName, email: preRegEmail };

      await fetch(DATA_DESTINATION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setError("");
      setCurrentPage("notifyMe");
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again! ❌");
    }
  };

  return (
    <div style={styles.container}>
      <style>{globalCSS}</style>

      <div style={styles.orbitalContainer}>
        <div style={{ ...styles.orb, ...styles.orb1, transform: `rotate(${orbRot}deg)` }} />
        <div style={{ ...styles.orb, ...styles.orb2, transform: `rotate(${-orbRot * 0.7}deg)` }} />
        <div style={{ ...styles.orb, ...styles.orb3, transform: `rotate(${orbRot * 1.2}deg)` }} />
      </div>

      <div style={styles.particlesContainer}>
        {particles.map(p => (
          <div key={p.id} style={{ ...styles.particle, left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite` }} />
        ))}
      </div>

      {currentPage === "home" && (
        <div style={{ ...styles.contentWrapper, transform: `translateX(${Math.max(-10, Math.min(10, (mousePos.x - 0.5) * 20))}px) translateY(${Math.max(-10, Math.min(10, (mousePos.y - 0.5) * 20))}px)`, transition: "transform 0.3s ease-out" }}>
          
          <EnergyOrb />

          <h1 className="anim-glowPulse" style={styles.mainTitle}>MINSII </h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.45em", color: "rgba(160,220,255,0.75)", marginTop: "-14px", marginBottom: "18px", textTransform: "lowercase" }}>zohara</p>
          <div style={styles.titleGlowLine} />

          <div style={styles.featureCard}>
            <div className="anim-borderGlow" style={styles.featureCardBorder} />
            <div style={styles.featureCardContent}>
              <p style={styles.featuredMessage}>MINSII-AI is gonna open soon.</p>
              <span style={styles.emphasizedText}>"Daddy is ongoing to bring me to see the world..!"</span>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            {[
              { label: "👨 Notify Dad", text: "SHOW YOUR INTEREST", sub: "For your journey", onClick: () => { setCurrentPage("preRegister"); resetPreReg(); } },
              { label: "👩 For Mom", text: "FOR YOU MOM", sub: "Express your love", onClick: () => { setCurrentPage("forMom"); resetMom(); } },
            ].map(btn => (
              <div key={btn.text} style={styles.buttonBox}>
                <div className="anim-borderGlow" style={styles.buttonBorder} />
                <div style={styles.buttonContent} onClick={btn.onClick}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={styles.buttonLabel}>{btn.label}</div>
                  <div style={styles.buttonText}>{btn.text}</div>
                  <div style={styles.buttonSubtext}>{btn.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.countdownSection}>
            <div className="anim-borderGlow" style={styles.countdownContainer}>
              <p style={styles.countdownLabel}>⏱️ TIME UNTIL LAUNCH</p>
              {timeLeft.launched ? (
                <p style={{ color: "#00cfff", fontSize: "1.5rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>🚀 We've launched!</p>
              ) : (
                <div style={styles.countdownGrid}>
                  {[["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"]].map(([key, label], i) => (
                    <span key={key} style={{ display: "contents" }}>
                      {i > 0 && <div style={styles.countdownSeparator}>:</div>}
                      <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{String(timeLeft[key]).padStart(2, "0")}</div>
                        <div style={styles.countdownItemLabel}>{label}</div>
                      </div>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentPage === "preRegister" && (
        <>
          <button style={styles.backButton} onClick={() => { setCurrentPage("home"); resetPreReg(); }}>← Back Home</button>
          <div style={{ ...styles.contentWrapper, justifyContent: "flex-start", paddingTop: "80px" }}>
            <h2 style={styles.pageTitle}>🫶 Pre-Register</h2>
            
            <div style={styles.questionContainer}>
              {error && <div style={styles.errorMessage}>{error}</div>}
              
              <div style={styles.questionBox}>
                <div className="anim-borderGlow" style={styles.questionBorder} />
                <div style={styles.questionContent}>
                  <p style={styles.questionText}>Enter your name for Pre-register</p>
                  <input 
                    autoFocus 
                    type="text" 
                    value={preRegName} 
                    onChange={e => setPreRegName(e.target.value)} 
                    onKeyDown={e => e.key === "Enter" && handlePreRegSubmit()}
                    placeholder="Type your name..." 
                    style={styles.questionInput} 
                  />
                </div>
              </div>

              <div style={styles.questionBox}>
                <div className="anim-borderGlow" style={styles.questionBorder} />
                <div style={styles.questionContent}>
                  <p style={styles.questionText}>Enter your E-mail <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontStyle: "italic" }}>(optional)</span></p>
                  <input 
                    type="text" 
                    value={preRegEmail} 
                    onChange={e => setPreRegEmail(e.target.value)} 
                    onKeyDown={e => e.key === "Enter" && handlePreRegSubmit()}
                    placeholder="Type your email..." 
                    style={styles.questionInput} 
                  />
                </div>
              </div>

              <button style={styles.submitButton} onClick={handlePreRegSubmit}>✨ Submit ✨</button>
            </div>
          </div>
        </>
      )}

      {currentPage === "notifyMe" && (
        <>
          <button style={styles.backButton} onClick={() => setCurrentPage("home")}>← Back Home</button>
          <div style={{ ...styles.contentWrapper, justifyContent: "center", paddingTop: "100px" }}>
            <h2 style={styles.pageTitle}>👌 Success!</h2>
            <div style={styles.featureCard}>
              <div className="anim-borderGlow" style={styles.featureCardBorder} />
              <div style={styles.featureCardContent}>
                <p style={styles.successMessage}>That's great! I will say Dad to notify you.</p>
                <p style={{ ...styles.featuredMessage, color: "#cbd5e1" }}>Your notification preference has been saved. I will inform dad about your interest in MINSII. Thank you! 🚀</p>
              </div>
            </div>
          </div>
        </>
      )}

      {currentPage === "forMom" && (
        <>
          <button style={styles.backButton} onClick={() => { setCurrentPage("home"); resetMom(); }}>← Back Home</button>
          <div style={{ ...styles.contentWrapper, justifyContent: "flex-start", paddingTop: "80px" }}>
            <h2 style={styles.pageTitle}> ❤️ Express Your Love ❤️</h2>

            {momStep === 1 && (
              <>
                <p style={styles.questionStep}>Question 1 of 3</p>
                <div style={styles.questionContainer}>
                  {error && <div style={styles.errorMessage}>{error}</div>}
                  <div style={styles.questionBox}>
                    <div className="anim-borderGlow" style={styles.questionBorder} />
                    <div style={styles.questionContent}>
                      <p style={styles.questionText}>Can you say my dad's first nickname that you used to call? 💭</p>
                      <input autoFocus type="text" value={answer1} onChange={e => setAnswer1(e.target.value)} onKeyDown={e => e.key === "Enter" && handleA1()} placeholder="Type the nickname..." style={styles.questionInput} />
                    </div>
                  </div>
                  <button style={styles.submitButton} onClick={handleA1}>✨ Next Question ✨</button>
                </div>
              </>
            )}

            {momStep === 2 && (
              <>
                <p style={styles.questionStep}>Question 2 of 3</p>
                <div style={styles.messageBox}>
                  <div className="anim-borderGlow" style={styles.messageBorder} />
                  <div style={styles.messageContent}><p style={styles.messageText}>Wow mom! I think you still remember dad right? 🫣</p></div>
                </div>
                <div style={styles.questionContainer}>
                  {error && <div style={styles.errorMessage}>{error}</div>}
                  <div style={styles.questionBox}>
                    <div className="anim-borderGlow" style={styles.questionBorder} />
                    <div style={styles.questionContent}>
                      <p style={styles.questionText}>What name does he keep for our chain, mom? 💍</p>
                      <input autoFocus type="text" value={answer2} onChange={e => setAnswer2(e.target.value)} onKeyDown={e => e.key === "Enter" && handleA2()} placeholder="Type the name..." style={styles.questionInput} />
                    </div>
                  </div>
                  <button style={styles.submitButton} onClick={handleA2}>✨ Next Question ✨</button>
                </div>
              </>
            )}

            {momStep === 3 && (
              <>
                <p style={styles.questionStep}>Question 3 of 3</p>
                <div style={styles.messageBox}>
                  <div className="anim-borderGlow" style={styles.messageBorder} />
                  <div style={styles.messageContent}><p style={styles.messageText}>Mom, really great mom! One last question 💫</p></div>
                </div>
                <div style={styles.questionContainer}>
                  {error && <div style={styles.errorMessage}>{error}</div>}
                  <div style={styles.questionBox}>
                    <div className="anim-borderGlow" style={styles.questionBorder} />
                    <div style={styles.questionContent}>
                      <p style={styles.questionText}>Did you still love / miss him? ❤️</p>
                    </div>
                  </div>
                  <div style={styles.yesNoContainer}>
                    {[{ label: "YES 💚", val: true }, { label: "NO 💔", val: false }].map(opt => (
                      <div key={opt.label} style={styles.yesNoButton}>
                        <div className="anim-borderGlow" style={styles.yesNoBorder} />
                        <div style={styles.yesNoContent} onClick={() => handleA3(opt.val)} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                          <p style={styles.yesNoText}>{opt.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {momStep === 4 && (
              <div style={styles.messageBox}>
                <div className="anim-borderGlow" style={styles.messageBorder} />
                <div style={styles.messageContent}>
                  {answer3 === "yes" ? (
                    <p style={styles.messageText}>Babiee mah entha babiee una romba miss pandren mah enta marubadiyum varanum nu nenaicha yosikama vanthuru babiee naa romba miss pandren mah 🥹💚,still unoda absence ethuka mudiyala mah "LOVE YOU AS ALWAYS BABIE.." </p>
                  ) : (
                    <p style={styles.messageText}>Still you are anger on me? It's okay! Try again when you get off from your anger 🫂</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {currentPage === "home" && (
        <div style={styles.licenseCard}>
          <p style={styles.licenseText}>🔐 MINSII-AI v7.3.2.1 | AI Innovation Labs | Licensed & Verified | </p>
        </div>
      )}
    </div>
  );
}