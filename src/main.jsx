import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowDownToLine, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Clock3, CloudSun, Code2, Copy, FileCode2, FileImage, Gauge, Hash,
  Image as ImageIcon, LayoutGrid, Menu, Moon, Search, ShieldCheck, Sun,
  Type, WandSparkles, X, Play, RotateCcw, Calculator, QrCode, Timer,
  Shuffle, Wind, Droplets, MapPin, Terminal, Download, PanelLeftClose
} from "lucide-react";
import "./styles.css";

const toolGroups = [
  { id: "text", name: "Văn bản", icon: Type, color: "violet", desc: "Đếm từ, đổi chữ hoa/thường, bỏ dấu tiếng Việt", tags: "đếm từ ký tự chữ hoa thường tiếng việt" },
  { id: "numbers", name: "Số & tính toán", icon: Calculator, color: "blue", desc: "Máy tính, phần trăm, BMI và mật khẩu", tags: "máy tính phần trăm bmi mật khẩu" },
  { id: "images", name: "Ảnh & QR", icon: FileImage, color: "orange", desc: "Resize ảnh, tạo mã QR nhanh chóng", tags: "ảnh resize kích thước qr code" },
  { id: "code", name: "Lập trình", icon: Code2, color: "green", desc: "Soạn và xem trước mã nguồn 5 ngôn ngữ", tags: "html css javascript js python c++ code" },
  { id: "weather", name: "Thời tiết", icon: CloudSun, color: "sky", desc: "Nhiệt độ, độ ẩm, gió và dự báo 3 ngày", tags: "thời tiết nhiệt độ mưa gió" },
  { id: "life", name: "Đời sống", icon: Clock3, color: "pink", desc: "Bấm giờ, đếm ngược, chọn ngẫu nhiên", tags: "đồng hồ bấm giờ đếm ngược ngẫu nhiên" },
];
const pages = {
  home: ["Không gian tiện ích", "Những công cụ nhỏ giúp bạn làm việc nhanh hơn."],
  text: ["Công cụ văn bản", "Xử lý nội dung ngay trên trình duyệt."],
  numbers: ["Số & tính toán", "Tính nhanh, rõ ràng, không cần cài đặt."],
  images: ["Ảnh & mã QR", "Chỉnh ảnh và tạo QR ngay trong trình duyệt."],
  code: ["Code Studio", "Viết, xem trước và tải xuống đoạn mã của bạn."],
  weather: ["Thời tiết", "Thông tin thời tiết theo thành phố hoặc vị trí hiện tại."],
  life: ["Tiện ích đời sống", "Những công cụ nhỏ cho nhịp sống hằng ngày."],
};
const samples = {
  html: `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trang web đầu tiên</title>
</head>
<body>
  <main>
    <h1>Xin chào, thế giới!</h1>
    <p>Chào mừng bạn đến với All-in-One Tool.</p>
    <button onclick="alert('Xin chào!')">Bấm thử</button>
  </main>
</body>
</html>`,
  css: `body {
  font-family: Inter, sans-serif;
  background: #f3f6ff;
  color: #182230;
  padding: 2rem;
}
h1 { color: #356df3; }
button {
  border: 0;
  border-radius: 10px;
  padding: 10px 16px;
  background: #356df3;
  color: white;
  cursor: pointer;
}`,
  javascript: `const greeting = "Xin chào, All-in-One Tool!";
console.log(greeting);

function add(a, b) {
  return a + b;
}
console.log("2 + 3 =", add(2, 3));`,
  python: `# Python mẫu
def chao(ten):
    return f"Xin chào, {ten}!"

print(chao("bạn"))
for so in range(1, 6):
    print(f"Bình phương của {so}: {so ** 2}")`,
  cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string ten = "All-in-One Tool";
    cout << "Xin chao tu " << ten << "!" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << i << " x 2 = " << i * 2 << endl;
    }
    return 0;
}`,
};
const extensions = { html: "html", css: "css", javascript: "js", python: "py", cpp: "cpp" };
const weatherCodes = {
  0:["Trời quang","☀️"],1:["Ít mây","🌤️"],2:["Có mây","⛅"],3:["Nhiều mây","☁️"],
  45:["Sương mù","🌫️"],48:["Sương mù","🌫️"],51:["Mưa phùn nhẹ","🌦️"],53:["Mưa phùn","🌦️"],
  55:["Mưa phùn dày","🌧️"],61:["Mưa nhẹ","🌦️"],63:["Mưa vừa","🌧️"],65:["Mưa lớn","🌧️"],
  71:["Tuyết nhẹ","🌨️"],73:["Tuyết vừa","🌨️"],75:["Tuyết lớn","❄️"],80:["Mưa rào nhẹ","🌦️"],
  81:["Mưa rào","🌧️"],82:["Mưa rào mạnh","⛈️"],95:["Dông","⛈️"],96:["Dông có mưa đá","⛈️"],99:["Dông mạnh","⛈️"]
};

function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [text, setText] = useState("");
  const [expr, setExpr] = useState("(125 + 75) * 1.08");
  const [calcResult, setCalcResult] = useState("");
  const [pct, setPct] = useState("15");
  const [base, setBase] = useState("240");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [bmi, setBmi] = useState("");
  const [passLen, setPassLen] = useState(16);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("html");
  const [code, setCode] = useState(samples.html);
  const [previewKey, setPreviewKey] = useState(0);
  const [city, setCity] = useState("Hà Nội");
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imgWidth, setImgWidth] = useState(800);
  const [imgHeight, setImgHeight] = useState(600);
  const [keepRatio, setKeepRatio] = useState(true);
  const [qrText, setQrText] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [swMs, setSwMs] = useState(0);
  const [swOn, setSwOn] = useState(false);
  const [laps, setLaps] = useState([]);
  const [timerInput, setTimerInput] = useState(60);
  const [timerLeft, setTimerLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const [choices, setChoices] = useState("Cà phê\nTrà sữa\nNước ép");
  const [chosen, setChosen] = useState("");

  const notify = (msg) => { setToast(msg); window.setTimeout(() => setToast(""), 2200); };
  const navigate = (id) => { setPage(id); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const filteredTools = useMemo(() => toolGroups.filter(t => `${t.name} ${t.desc} ${t.tags}`.toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi"))), [query]);

  useEffect(() => {
    if (!swOn) return;
    const start = Date.now() - swMs;
    const id = window.setInterval(() => setSwMs(Date.now() - start), 100);
    return () => window.clearInterval(id);
  }, [swOn]);
  useEffect(() => {
    if (!timerOn) return;
    if (timerLeft <= 0) { setTimerOn(false); notify("Hết giờ!"); return; }
    const id = window.setTimeout(() => setTimerLeft(v => v - 1), 1000);
    return () => window.clearTimeout(id);
  }, [timerOn, timerLeft]);

  async function fetchWeather(searchCity = city) {
    setWeatherLoading(true); setWeatherError(""); setWeather(null);
    try {
      let lat, lon, placeName = searchCity;
      if (typeof searchCity === "object") {
        lat = searchCity.latitude; lon = searchCity.longitude; placeName = "Vị trí hiện tại";
      } else {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1&language=vi&format=json`);
        if (!geoRes.ok) throw new Error("Không thể tìm địa điểm.");
        const geo = await geoRes.json();
        if (!geo.results?.length) throw new Error("Không tìm thấy thành phố. Hãy thử tên khác.");
        lat = geo.results[0].latitude; lon = geo.results[0].longitude;
        placeName = [geo.results[0].name, geo.results[0].admin1].filter(Boolean).join(", ");
      }
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=3`);
      if (!res.ok) throw new Error("Không tải được dữ liệu thời tiết.");
      const data = await res.json();
      setWeather({ ...data, placeName });
    } catch (e) { setWeatherError(e.message || "Có lỗi khi tải dữ liệu thời tiết."); }
    finally { setWeatherLoading(false); }
  }

  function changeLanguage(next) { setLang(next); setCode(samples[next]); }
  function runCode() { setPreviewKey(k => k + 1); }
  const previewSrc = useMemo(() => {
    if (lang === "html") return code;
    if (lang === "css") return `<!doctype html><html><head><style>${code}</style></head><body><h1>Xin chào!</h1><p>Đây là bản xem trước CSS.</p><button>Nút mẫu</button></body></html>`;
    if (lang === "javascript") return `<!doctype html><html><body style="font:14px Inter, sans-serif;padding:20px"><h2>JavaScript preview</h2><pre id="out"></pre><script>const log=console.log;console.log=(...a)=>document.querySelector('#out').textContent+=a.join(' ')+'\\n';try{${code.replace(/<\/script/gi, "<\\/script")}}catch(e){document.querySelector('#out').textContent=e.message}</script></body></html>`;
    return `<!doctype html><html><body style="font:14px Inter, sans-serif;padding:20px;color:#334"><h3>Chưa hỗ trợ chạy trực tiếp ${lang === "python" ? "Python" : "C++"}</h3><p>Bạn có thể soạn, sao chép hoặc tải file mã nguồn. Để chạy chương trình, hãy dùng môi trường Python/C++ trên máy tính.</p></body></html>`;
  }, [lang, code, previewKey]);

  async function copyText(value) {
    try { await navigator.clipboard.writeText(value); notify("Đã sao chép vào clipboard"); }
    catch { notify("Trình duyệt không cho phép sao chép tự động"); }
  }
  function downloadFile(filename, content, type = "text/plain") {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }
  function handleTextAction(action) {
    if (action === "upper") setText(text.toLocaleUpperCase("vi"));
    if (action === "lower") setText(text.toLocaleLowerCase("vi"));
    if (action === "title") setText(text.toLocaleLowerCase("vi").replace(/(^|\s)\S/g, m => m.toLocaleUpperCase("vi")));
    if (action === "strip") setText(text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D"));
    if (action === "clear") setText("");
    if (action === "copy") copyText(text);
  }
  function calculate() {
    if (!/^[\d+\-*/().%\s]+$/.test(expr) || !expr.trim()) { setCalcResult("Chỉ nhập số và phép toán + − × ÷ % ngoặc."); return; }
    try {
      // A restricted arithmetic parser avoids eval() and arbitrary code execution.
      const tokens = expr.match(/\d+(?:\.\d+)?|[()+\-*/%]/g) || []; let i = 0;
      function factor() { if (tokens[i] === "+") { i++; return factor(); } if (tokens[i] === "-") { i++; return -factor(); } if (tokens[i] === "(") { i++; const v = sum(); if (tokens[i++] !== ")") throw Error(); return v; } const t = tokens[i++]; if (!t || !/^\d/.test(t)) throw Error(); return Number(t); }
      function term() { let v = factor(); while (["*", "/", "%"].includes(tokens[i])) { const op = tokens[i++], r = factor(); if ((op === "/" || op === "%") && r === 0) throw Error(); v = op === "*" ? v*r : op === "/" ? v/r : v%r; } return v; }
      function sum() { let v = term(); while (tokens[i] === "+" || tokens[i] === "-") { const op = tokens[i++], r = term(); v = op === "+" ? v+r : v-r; } return v; }
      const result = sum(); if (i !== tokens.length || !Number.isFinite(result)) throw Error();
      setCalcResult(String(result));
    } catch { setCalcResult("Biểu thức chưa hợp lệ hoặc có phép chia cho 0."); }
  }
  function makePassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789" + (symbols ? "!@#$%^&*()-_=+?" : "");
    const random = new Uint32Array(passLen); crypto.getRandomValues(random);
    setPassword(Array.from(random, n => chars[n % chars.length]).join(""));
  }
  function bmiCalc() {
    const h = Number(height) / 100, w = Number(weight);
    if (h <= 0 || w <= 0) { setBmi("Nhập chiều cao và cân nặng hợp lệ."); return; }
    const n = w / (h * h); setBmi(`BMI ${n.toFixed(1)} · ${n < 18.5 ? "Thiếu cân" : n < 25 ? "Bình thường" : n < 30 ? "Thừa cân" : "Béo phì"}. Chỉ số tham khảo.`);
  }
  function onImagePick(file) {
    if (!file) return;
    const url = URL.createObjectURL(file); const img = new Image();
    img.onload = () => { setImageFile(file); setImageUrl(url); setImgWidth(img.naturalWidth); setImgHeight(img.naturalHeight); };
    img.src = url;
  }
  function resizeImage() {
    if (!imageUrl) { notify("Hãy chọn ảnh trước"); return; }
    const img = new Image(); img.onload = () => {
      const canvas = document.createElement("canvas"); canvas.width = Number(imgWidth); canvas.height = Number(imgHeight);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      const a = document.createElement("a"); a.href = canvas.toDataURL("image/png"); a.download = "nova-resized.png"; a.click();
    }; img.src = imageUrl;
  }
  const tempTextStats = { words: (text.trim().match(/\S+/g) || []).length, chars: text.length, compact: text.replace(/\s/g, "").length, lines: text ? text.split(/\r\n|\r|\n/).length : 0 };
  const currentWeather = weather?.current;
  const weatherInfo = currentWeather ? (weatherCodes[currentWeather.weather_code] || ["Thời tiết thay đổi", "🌤️"]) : null;
  const clock = (ms) => { const t = Math.floor(ms / 100); return `${String(Math.floor(t / 600)).padStart(2,"0")}:${String(Math.floor(t / 10) % 60).padStart(2,"0")}.${t % 10}`; };
  const mmss = (sec) => `${String(Math.floor(Math.max(0, sec) / 60)).padStart(2,"0")}:${String(Math.max(0, sec) % 60).padStart(2,"0")}`;

  return <div className={dark ? "app dark" : "app"}>
    <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><WandSparkles size={20}/></div><div>all-in-one<span>tool</span><small>YOUR DAILY TOOLKIT</small></div><button className="mobile-close icon-btn" onClick={() => setMobileNav(false)} aria-label="Đóng menu"><X size={18}/></button></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="nav-list">
        <button className={page === "home" ? "nav-item active" : "nav-item"} onClick={() => navigate("home")}><LayoutGrid size={18}/>Tổng quan</button>
        {toolGroups.map(t => <button key={t.id} className={page === t.id ? "nav-item active" : "nav-item"} onClick={() => navigate(t.id)}><t.icon size={18}/>{t.name}{t.id === "weather" && <span className="nav-live"/>}</button>)}
      </nav>
      <div className="sidebar-bottom"><div className="privacy-icon"><ShieldCheck size={18}/></div><div><strong>Ưu tiên quyền riêng tư</strong><p>Công cụ chạy trực tiếp trên thiết bị khi có thể.</p></div></div>
      <div className="sidebar-foot">ALL-IN-ONE TOOL <span>·</span> v1.0</div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div className="top-left"><button className="icon-btn mobile-menu" onClick={() => setMobileNav(v => !v)} aria-label="Mở menu"><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><strong>{page === "home" ? "Tổng quan" : pages[page][0]}</strong></div></div>
        <div className="top-actions"><label className="searchbox"><Search size={17}/><input value={query} onChange={e => { setQuery(e.target.value); if (e.target.value) setPage("home"); }} placeholder="Tìm tiện ích..." /><kbd>⌘ K</kbd></label><button className="icon-btn theme-btn" onClick={() => setDark(v => !v)} aria-label="Đổi giao diện">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><div className="profile-avatar">N</div></div>
      </header>
      <div className="content">
        <div className="page-heading"><div><div className="overline">ALL-IN-ONE TOOL <span>•</span> WORK SMARTER</div><h1>{pages[page][0]}</h1><p>{pages[page][1]}</p></div><div className="heading-date"><span className="status-dot"/> Tất cả hệ thống sẵn sàng</div></div>

        {page === "home" && <div className="home-view">
          <section className="hero">
            <div className="hero-copy"><div className="hero-pill"><WandSparkles size={14}/> BỘ CÔNG CỤ TẤT CẢ TRONG MỘT</div><h2>Ít thao tác hơn.<br/><span>Nhiều điều hoàn thành hơn.</span></h2><p>Mọi tiện ích hằng ngày, từ xử lý văn bản đến viết code và xem thời tiết — trong cùng một không gian.</p><button className="hero-btn" onClick={() => navigate("code")}>Mở Code Studio <ArrowRight size={16}/></button><div className="hero-proof"><span><Check size={13}/> Miễn phí</span><span><Check size={13}/> Dễ sử dụng</span><span><Check size={13}/> Không cần tài khoản</span></div></div>
            <div className="hero-visual"><div className="orb orb-one"/><div className="orb orb-two"/><div className="floating-card fc-top"><div className="fc-icon"><Code2 size={19}/></div><div><b>Code Studio</b><small>Ready to build</small></div><span className="mini-green"/></div><div className="glass-panel"><div className="glass-top"><i/><i/><i/><span>your-workspace.jsx</span></div><div className="fake-code"><span><em>01</em> <b>const</b> tools = [</span><span><em>02</em> &nbsp; <i>"create"</i>,</span><span><em>03</em> &nbsp; <i>"explore"</i>,</span><span><em>04</em> &nbsp; <i>"build"</i></span><span><em>05</em> ];</span><span><em>06</em> <b className="pink">ready</b> <strong>=</strong> <i>true</i></span></div></div><div className="floating-card fc-bottom"><div className="weather-mini">☀️</div><div><b>28°</b><small>Hà Nội · Nắng nhẹ</small></div><span className="weather-spark">↗</span></div><div className="sparkle s1">✳</div><div className="sparkle s2">✦</div></div>
          </section>
          <div className="metrics-row"><div className="metric"><div className="metric-icon purple"><LayoutGrid size={19}/></div><div><strong>6 nhóm</strong><span>Công cụ tiện ích</span></div><div className="metric-end"><ArrowUpRight size={16}/></div></div><div className="metric"><div className="metric-icon blue"><Code2 size={19}/></div><div><strong>5 ngôn ngữ</strong><span>HTML · CSS · JS · Python · C++</span></div><div className="metric-end"><ArrowUpRight size={16}/></div></div><div className="metric"><div className="metric-icon orange"><CloudSun size={19}/></div><div><strong>Thời tiết live</strong><span>Dữ liệu trực tuyến</span></div><div className="metric-end"><span className="status-dot"/></div></div></div>
          <section className="section-block"><div className="section-title"><div><h2>Khám phá tiện ích</h2><p>Chọn một công cụ và bắt đầu ngay.</p></div><span className="section-count">{filteredTools.length} CÔNG CỤ</span></div><div className="tool-grid">{filteredTools.map((t, i) => <button key={t.id} className="tool-card" onClick={() => navigate(t.id)}><div className={`tool-icon ${t.color}`}><t.icon size={21}/></div><div className="tool-card-main"><h3>{t.name}</h3><p>{t.desc}</p></div><div className="tool-card-foot"><span>Khám phá công cụ</span><span className="arrow-circle"><ArrowUpRight size={15}/></span></div><div className="card-index">0{i+1}</div></button>)}</div></section>
          <section className="bottom-banner"><div className="banner-icon"><Terminal size={21}/></div><div><strong>Đang xây dựng điều gì đó?</strong><p>Mở Code Studio để viết, thử nghiệm và tải mã nguồn của bạn.</p></div><button onClick={() => navigate("code")}>Mở trình soạn mã <ArrowRight size={15}/></button></section>
        </div>}

        {page === "text" && <div className="panel single-panel"><PanelTitle icon={Type} title="Trình xử lý văn bản" subtitle="Thống kê và chuyển đổi văn bản theo nhu cầu."/><label className="field-label">Nội dung văn bản</label><textarea className="input textarea" rows="8" value={text} onChange={e => setText(e.target.value)} placeholder="Nhập hoặc dán văn bản của bạn..."/><div className="action-row">{[["upper","CHỮ HOA"],["lower","chữ thường"],["title","Viết Hoa Đầu Từ"],["strip","Bỏ dấu tiếng Việt"],["copy","Sao chép"],["clear","Xóa nội dung"]].map(([a,l]) => <button key={a} className="btn btn-soft" onClick={() => handleTextAction(a)}>{l}</button>)}</div><div className="text-stats"><MiniStat label="Số từ" value={tempTextStats.words}/><MiniStat label="Ký tự" value={tempTextStats.chars}/><MiniStat label="Không khoảng trắng" value={tempTextStats.compact}/><MiniStat label="Số dòng" value={tempTextStats.lines}/></div></div>}

        {page === "numbers" && <div className="feature-grid">
          <div className="panel"><PanelTitle icon={Calculator} title="Máy tính nhanh" subtitle="Các phép toán cơ bản."/><label className="field-label">Biểu thức</label><input className="input" value={expr} onChange={e => setExpr(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()}/><button className="btn btn-primary full-btn" onClick={calculate}>Tính kết quả <ArrowRight size={16}/></button><div className="result-box"><span>KẾT QUẢ</span><strong>{calcResult || "—"}</strong></div></div>
          <div className="panel"><PanelTitle icon={Gauge} title="Tính phần trăm" subtitle="Tính X% của một giá trị."/><div className="two-fields"><div><label className="field-label">Phần trăm (%)</label><input className="input" type="number" value={pct} onChange={e => setPct(e.target.value)}/></div><div><label className="field-label">Giá trị gốc</label><input className="input" type="number" value={base} onChange={e => setBase(e.target.value)}/></div></div><div className="result-box"><span>KẾT QUẢ</span><strong>{(Number(pct)*Number(base)/100).toLocaleString("vi-VN")}</strong></div></div>
          <div className="panel"><PanelTitle icon={Activity} title="Chỉ số BMI" subtitle="Tham khảo cho người trưởng thành."/><div className="two-fields"><div><label className="field-label">Chiều cao (cm)</label><input className="input" type="number" value={height} onChange={e => setHeight(e.target.value)}/></div><div><label className="field-label">Cân nặng (kg)</label><input className="input" type="number" value={weight} onChange={e => setWeight(e.target.value)}/></div></div><button className="btn btn-primary full-btn" onClick={bmiCalc}>Tính BMI</button>{bmi && <div className="inline-result">{bmi}</div>}</div>
          <div className="panel"><PanelTitle icon={ShieldCheck} title="Mật khẩu ngẫu nhiên" subtitle="Tạo mật khẩu với độ dài tùy chỉnh."/><div className="range-label"><label className="field-label">Độ dài mật khẩu</label><strong>{passLen} ký tự</strong></div><input type="range" min="8" max="40" value={passLen} onChange={e => setPassLen(Number(e.target.value))} className="range"/><label className="check-label"><input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)}/> Bao gồm ký tự đặc biệt</label><button className="btn btn-primary full-btn" onClick={makePassword}>Tạo mật khẩu <WandSparkles size={16}/></button>{password && <button className="password-result" onClick={() => copyText(password)}>{password}<Copy size={16}/></button>}</div>
        </div>}

        {page === "code" && <div className="code-layout"><section className="panel code-panel"><div className="code-panel-head"><PanelTitle icon={Code2} title="Code Studio" subtitle="Soạn mã nguồn trong không gian riêng."/><span className="saved-label"><span className="status-dot"/> Local workspace</span></div><div className="editor-toolbar"><div className="language-tabs">{Object.entries({html:"HTML",css:"CSS",javascript:"JavaScript",python:"Python","cpp":"C++"}).map(([id,label]) => <button key={id} className={lang===id?"lang-tab selected":"lang-tab"} onClick={() => changeLanguage(id)}>{label}</button>)}</div><button className="icon-btn copy-btn" onClick={() => copyText(code)} title="Sao chép mã"><Copy size={16}/></button></div><div className="code-editor"><div className="line-numbers">{code.split("\n").map((_,i)=><span key={i}>{i+1}</span>)}</div><textarea spellCheck="false" aria-label="Mã nguồn" value={code} onChange={e => setCode(e.target.value)}/></div><div className="editor-bottom"><span>{code.split("\n").length} dòng <span>·</span> {code.length} ký tự</span><div><button className="btn btn-soft" onClick={() => {setCode(samples[lang]);notify("Đã khôi phục mã mẫu")}}><RotateCcw size={14}/> Khôi phục</button><button className="btn btn-soft" onClick={() => downloadFile(`nova-code.${extensions[lang]}`,code)}><Download size={14}/> Tải file</button></div></div><div className="code-note"><ShieldCheck size={16}/><span>Python và C++ hiện hỗ trợ soạn/lưu mã; cần môi trường chạy riêng để thực thi. Không chạy mã người dùng trên máy chủ.</span></div></section><section className="panel preview-panel"><div className="preview-heading"><div><h3><Play size={17}/> Live Preview</h3><p>Xem kết quả ngay trong sandbox.</p></div><button className="btn btn-primary" onClick={runCode}><Play size={14} fill="currentColor"/> Chạy thử</button></div><div className="preview-window"><div className="preview-window-bar"><span/><span/><span/><small>localhost / preview</small></div><iframe key={previewKey} title="Xem trước mã nguồn" sandbox="allow-scripts" srcDoc={previewSrc}/></div><div className="preview-foot"><span className="status-dot"/> Preview sandbox</div></section></div>}

        {page === "weather" && <div className="panel weather-panel"><PanelTitle icon={CloudSun} title="Thời tiết trực tuyến" subtitle="Dữ liệu từ Open-Meteo · không cần API key."/><form className="weather-search" onSubmit={e => {e.preventDefault();fetchWeather(city)}}><div className="search-city"><MapPin size={18}/><input value={city} onChange={e => setCity(e.target.value)} placeholder="Nhập thành phố, ví dụ Đà Nẵng"/></div><button className="btn btn-primary" disabled={weatherLoading}>{weatherLoading ? "Đang tải..." : "Tra cứu thời tiết"}</button><button type="button" className="btn btn-soft" onClick={() => {if (!navigator.geolocation) {notify("Trình duyệt không hỗ trợ định vị");return;}navigator.geolocation.getCurrentPosition(p => fetchWeather({latitude:p.coords.latitude,longitude:p.coords.longitude}), () => notify("Không lấy được vị trí. Hãy nhập thành phố."))}}>Vị trí của tôi</button></form>{weatherError && <div className="error-box">{weatherError}</div>}{weatherLoading && <div className="loading-box">Đang tải thông tin thời tiết...</div>}{weather && currentWeather && <><div className="weather-current"><div><span className="weather-location"><MapPin size={14}/>{weather.placeName}</span><div className="weather-temperature">{Math.round(currentWeather.temperature_2m)}<span>°C</span></div><h3>{weatherInfo[0]}</h3><p>Cảm giác như {Math.round(currentWeather.apparent_temperature)}°C · Cập nhật {currentWeather.time.replace("T"," ")}</p></div><div className="weather-emoji">{weatherInfo[1]}</div></div><div className="weather-facts"><WeatherFact icon={Droplets} label="Độ ẩm" value={`${currentWeather.relative_humidity_2m}%`}/><WeatherFact icon={Wind} label="Tốc độ gió" value={`${currentWeather.wind_speed_10m} km/h`}/><WeatherFact icon={CloudSun} label="Lượng mưa" value={`${currentWeather.precipitation} mm`}/></div><div className="forecast-head"><h3>Dự báo 3 ngày</h3><span>Nhiệt độ cao / thấp</span></div><div className="forecast-grid">{weather.daily.time.map((d,i)=><div className="forecast-day" key={d}><span>{new Date(d+"T12:00:00").toLocaleDateString("vi-VN",{weekday:"short",day:"2-digit",month:"2-digit"})}</span><b>{Math.round(weather.daily.temperature_2m_max[i])}° / {Math.round(weather.daily.temperature_2m_min[i])}°</b><small>Khả năng mưa {weather.daily.precipitation_probability_max[i] ?? "—"}%</small></div>)}</div></>}{!weather && !weatherLoading && !weatherError && <div className="weather-empty"><div>🌤️</div><h3>Thời tiết đang chờ bạn</h3><p>Nhập thành phố và nhấn tra cứu để xem điều kiện hiện tại cùng dự báo 3 ngày.</p></div>}</div>}

        {page === "images" && <div className="feature-grid"><div className="panel"><PanelTitle icon={ImageIcon} title="Resize ảnh" subtitle="Ảnh được xử lý ngay trong trình duyệt."/><label className="upload-box"><FileImage size={26}/><strong>{imageFile ? imageFile.name : "Chọn ảnh từ thiết bị"}</strong><span>PNG, JPG, WebP</span><input type="file" accept="image/*" onChange={e => onImagePick(e.target.files?.[0])}/></label>{imageUrl && <img className="image-thumb" src={imageUrl} alt="Ảnh đã chọn"/>}<div className="two-fields"><div><label className="field-label">Chiều rộng (px)</label><input className="input" type="number" min="1" value={imgWidth} onChange={e => {const w=Number(e.target.value);setImgWidth(w);if(keepRatio&&imageUrl){const im=new Image();im.onload=()=>setImgHeight(Math.round(w*im.naturalHeight/im.naturalWidth));im.src=imageUrl;}}}/></div><div><label className="field-label">Chiều cao (px)</label><input className="input" type="number" min="1" value={imgHeight} onChange={e => setImgHeight(Number(e.target.value))}/></div></div><label className="check-label"><input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)}/> Giữ tỷ lệ ảnh</label><button className="btn btn-primary full-btn" onClick={resizeImage}>Tạo & tải ảnh PNG <Download size={16}/></button></div><div className="panel"><PanelTitle icon={QrCode} title="Tạo mã QR" subtitle="Chuyển văn bản hoặc URL thành QR."/><label className="field-label">Nội dung hoặc đường dẫn</label><textarea className="input textarea" rows="4" value={qrText} onChange={e => {setQrText(e.target.value);setQrGenerated(false)}} placeholder="https://example.com"/><button className="btn btn-primary full-btn" onClick={() => {if (!qrText.trim()) {notify("Hãy nhập nội dung cần tạo QR");return;}setQrGenerated(true)}}>Tạo mã QR <ArrowRight size={16}/></button>{qrGenerated && <div className="qr-output"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrText)}`} alt="Mã QR được tạo"/><a href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrText)}`} target="_blank" rel="noreferrer" className="btn btn-soft">Mở / tải QR <Download size={15}/></a></div>}<p className="helper-text">Tạo QR cần kết nối internet; nội dung được gửi tới dịch vụ tạo mã QR bên ngoài.</p></div></div>}

        {page === "life" && <div className="feature-grid"><div className="panel"><PanelTitle icon={Timer} title="Đồng hồ bấm giờ" subtitle="Đo thời gian và ghi lại các vòng."/><div className="stopwatch-display">{clock(swMs)}</div><div className="action-row"><button className="btn btn-primary" onClick={() => setSwOn(v => !v)}>{swOn ? "Tạm dừng" : swMs ? "Tiếp tục" : "Bắt đầu"}</button><button className="btn btn-soft" onClick={() => {setLaps(v => [`Vòng ${v.length+1} · ${clock(swMs)}`,...v]);}} disabled={!swMs}>Ghi vòng</button><button className="btn btn-soft" onClick={() => {setSwOn(false);setSwMs(0);setLaps([])}}>Đặt lại</button></div>{laps.length > 0 && <div className="laps">{laps.map((l,i)=><div key={i}>{l}</div>)}</div>}<div className="divider-line"/><h3>Đếm ngược</h3><label className="field-label">Thời lượng (giây)</label><div className="timer-controls"><input className="input" type="number" min="1" value={timerInput} onChange={e => {setTimerInput(e.target.value);if(!timerOn)setTimerLeft(Number(e.target.value)||0)}}/><strong>{mmss(timerLeft)}</strong></div><div className="action-row"><button className="btn btn-primary" onClick={() => {if(timerOn){setTimerOn(false)}else{if(timerLeft<=0)setTimerLeft(Math.max(1,Number(timerInput)||60));setTimerOn(true)}}}>{timerOn ? "Tạm dừng" : "Bắt đầu"}</button><button className="btn btn-soft" onClick={() => {setTimerOn(false);setTimerLeft(Math.max(1,Number(timerInput)||60))}}>Đặt lại</button></div></div><div className="panel"><PanelTitle icon={Shuffle} title="Chọn ngẫu nhiên" subtitle="Để Nova chọn giúp bạn."/><label className="field-label">Mỗi lựa chọn trên một dòng</label><textarea className="input textarea" rows="7" value={choices} onChange={e => setChoices(e.target.value)} placeholder={"Cà phê\nTrà sữa\nNước ép"}/><button className="btn btn-primary full-btn" onClick={() => {const list=choices.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);setChosen(list.length ? list[Math.floor(Math.random()*list.length)] : "Hãy nhập ít nhất một lựa chọn.")}}><Shuffle size={16}/> Chọn ngay</button><div className="random-result">{chosen || "✨"}<small>{chosen ? "KẾT QUẢ ĐƯỢC CHỌN" : "KẾT QUẢ SẼ HIỆN Ở ĐÂY"}</small></div></div></div>}

        <footer className="footer"><span>© 2026 All-in-One Tool</span><span><ShieldCheck size={14}/> Được thiết kế để đơn giản hóa công việc hằng ngày</span></footer>
      </div>
    </main>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}

function PanelTitle({ icon: Icon, title, subtitle }) { return <div className="panel-title"><div className="panel-title-icon"><Icon size={19}/></div><div><h2>{title}</h2><p>{subtitle}</p></div></div>; }
function MiniStat({label,value}) { return <div className="mini-stat"><span>{label}</span><strong>{value}</strong></div>; }
function WeatherFact({icon:Icon,label,value}) { return <div className="weather-fact"><div><Icon size={17}/><span>{label}</span></div><strong>{value}</strong></div>; }

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
