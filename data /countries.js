<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>দেশ ও রাজধানী | MAPS GK</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    h1.pt { font-size: clamp(1.5rem, 5vw, 2.2rem); text-align: left; margin: 14px 0 6px; }
    .status { background: var(--card); border: 1px solid var(--line); border-left: 5px solid var(--accent); border-radius: 14px; padding: 12px 16px; margin: 14px 0; color: var(--muted); font-size: .95rem; }
    .search { margin: 14px 0 4px; }
    .search input { max-width: 100%; }
    .region h2 { margin: 24px 0 12px; }
    .c { animation: rise .35s ease both; }
    .c h3 { margin: 0 0 6px; color: var(--brand); font-size: 1.15rem; }
    .c .cap { font-size: 1.05rem; margin: 0 0 6px; color: var(--text); }
    .c .cap span { color: var(--muted); font-size: .88rem; display: block; }
    .c .nt { font-size: .88rem; color: var(--muted); margin: 6px 0; border-top: 1px dashed var(--line); padding-top: 6px; }
    .c .meta { font-size: .82rem; color: var(--muted); margin: 8px 0 0; }
    .srcs { margin-top: 26px; font-size: .92rem; }
    .srcs a { color: var(--brand); word-break: break-word; }
    .srcs li { margin-bottom: 6px; }
    .empty { color: var(--muted); padding: 16px 0; }
    @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @media (prefers-reduced-motion: reduce) { .c { animation: none; } }
  </style>
</head>
<body>
  <header class="top">
    <a class="brand" href="home.html">🌍 MAPS GK</a>
    <button id="langBtn" type="button">English</button>
  </header>

  <main>
    <h1 class="pt" id="title"></h1>
    <div class="status" id="status"></div>
    <div class="search"><input id="q" type="search"></div>
    <div id="out"></div>
    <div class="srcs">
      <h2 id="srcTitle"></h2>
      <ol id="srcList"></ol>
    </div>
  </main>

  <footer>
    <a href="home.html" style="color:inherit" id="backLink"></a>
  </footer>

  <script src="data/countries.js"></script>
  <script>
    var D = window.MAPSGK_DATA;
    var lang = "bn";
    try {
      var saved = localStorage.getItem("mapsgk-lang");
      if (saved === "bn" || saved === "en") { lang = saved; }
    } catch (e) {}

    var UI = {
      bn: { title: "দেশ ও রাজধানী", search: "দেশ বা রাজধানীর নাম খুঁজুন", cap: "রাজধানী", checked: "যাচাই", src: "সূত্র", srcTitle: "এই পেজের উৎস", none: "কিছু পাওয়া যায়নি।", back: "← হোমপেজ", sw: "English", loadErr: "তথ্য ফাইল লোড হয়নি। data/countries.js ফাইলটি আছে কি না দেখুন।" },
      en: { title: "Countries & Capitals", search: "Search a country or capital", cap: "Capital", checked: "Checked", src: "Sources", srcTitle: "Sources for this page", none: "Nothing found.", back: "← Home", sw: "বাংলা", loadErr: "Data file did not load. Check that data/countries.js exists." }
    };

    function el(tag, cls, text) {
      var e = document.createElement(tag);
      if (cls) { e.className = cls; }
      if (text !== undefined) { e.textContent = text; }
      return e;
    }

    function render() {
      var u = UI[lang];
      document.documentElement.lang = lang;
      document.title = u.title + " | MAPS GK";
      document.getElementById("title").textContent = u.title;
      document.getElementById("q").placeholder = u.search;
      document.getElementById("langBtn").textContent = u.sw;
      document.getElementById("backLink").textContent = u.back;
      document.getElementById("srcTitle").textContent = u.srcTitle;

      var out = document.getElementById("out");
      out.innerHTML = "";

      if (!D) {
        out.appendChild(el("p", "empty", u.loadErr));
        return;
      }

      document.getElementById("status").textContent = D.status[lang];

      var q = document.getElementById("q").value.trim().toLowerCase();
      var total = 0;

      for (var r = 0; r < D.regions.length; r++) {
        var reg = D.regions[r];
        var sec = el("section", "region");
        sec.appendChild(el("h2", "", reg[lang]));
        var grid = el("div", "grid");
        var count = 0;

        for (var i = 0; i < D.countries.length; i++) {
          var c = D.countries[i];
          if (c.region !== reg.id) { continue; }
          var hay = (c.en + " " + c.bn + " " + c.capital.en + " " + c.capital.bn).toLowerCase();
          if (q && hay.indexOf(q) === -1) { continue; }
          count++;

          var card = el("div", "card c");
          card.appendChild(el("h3", "", c[lang]));
          var cap = el("p", "cap", u.cap + ": " + c.capital[lang]);
          var alt = el("span", "", lang === "bn" ? c.en + " · " + c.capital.en : c.bn + " · " + c.capital.bn);
          cap.appendChild(alt);
          card.appendChild(cap);
          if (c.note) { card.appendChild(el("p", "nt", c.note[lang])); }
          var refs = [];
          for (var s = 0; s < c.src.length; s++) { refs.push("[" + c.src[s] + "]"); }
          card.appendChild(el("p", "meta", u.src + ": " + refs.join(" ") + " · " + u.checked + ": " + D.checkedLabel[lang]));
          grid.appendChild(card);
        }

        if (count > 0) { sec.appendChild(grid); out.appendChild(sec); }
        total += count;
      }

      if (total === 0) { out.appendChild(el("p", "empty", u.none)); }

      var list = document.getElementById("srcList");
      list.innerHTML = "";
      for (var k = 0; k < D.sources.length; k++) {
        var li = el("li");
        var a = el("a", "", D.sources[k].title);
        a.href = D.sources[k].url;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        list.appendChild(li);
      }
    }

    document.getElementById("langBtn").addEventListener("click", function () {
      lang = (lang === "bn") ? "en" : "bn";
      try { localStorage.setItem("mapsgk-lang", lang); } catch (e) {}
      render();
    });
    document.getElementById("q").addEventListener("input", render);

    render();
  </script>
</body>
</html>
