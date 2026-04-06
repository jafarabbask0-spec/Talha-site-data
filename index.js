javascript:(async()=>{
  // Unique ID nikalna ya banana
  let i = localStorage.getItem('talha_script_uid') || Array.from({length:20},()=>Math.floor(Math.random()*10)).join('');
  localStorage.setItem('talha_script_uid', i);

  // Aapki Vercel App ka URL (Yahan apna sahi Vercel URL likhein)
  const v_url = `https://talha-site-data.vercel.app/api/server?id=${i}`;

  try {
    let r = await fetch(v_url);
    if (!r.ok) throw new Error('Lock');
    
    let t = await r.text();
    
    // Script ko page par chalana
    let n = document.createElement('script');
    n.textContent = t;
    document.body.appendChild(n);
    console.log("Talha Trader Active | ID:", i);
    
    // 1 second baad script tag remove kar dena (safai ke liye)
    setTimeout(() => n.remove(), 1000);

  } catch (e) {
    // Agar ID database mein nahi mili to yeh Alert ya Lock dikhayega
    alert("LOCKED! Binance ID 957546361 to Unlock. Your ID: " + i);
  }
})();