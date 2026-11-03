var T = {
  bn: {
    pageTitle: "MAPS GK | মানচিত্রে ভূগোল শিখুন",
    tag: "বাংলাদেশের ভর্তি পরীক্ষার্থীদের জন্য",
    h1: "মানচিত্র দেখে ভূগোল শিখুন",
    lead: "বাংলাদেশ ও বিশ্বের মানচিত্র, দেশ-রাজধানী, নদী-সাগর, পর্বত-মরুভূমি এবং কুইজ, সবকিছু এক জায়গায়।",
    search: "দেশ, রাজধানী বা স্থান খুঁজুন (শীঘ্রই আসছে)",
    topics: "শেখার বিভাগ",
    soon: "শীঘ্রই আসছে",
    open: "খুলুন →",
    promiseTitle: "আমাদের তথ্য-নীতি",
    promise: "প্রতিটি তথ্য যাচাই করে প্রকাশ করা হবে এবং সাথে উৎস ও সর্বশেষ যাচাইয়ের তারিখ থাকবে। যে বিভাগগুলো এখনো তৈরি হয়নি সেখানে কোনো তথ্য দেওয়া হয়নি।",
    sourcesLink: "উৎস ও নীতিমালা দেখুন →",
    navMap: "বিশ্ব মানচিত্র",
    navSources: "উৎস ও নীতিমালা",
    footer: "© MAPS GK · একটি শিক্ষামূলক প্রকল্প",
    switchTo: "English"
  },
  en: {
    pageTitle: "MAPS GK | Learn Geography with Maps",
    tag: "For Bangladesh university admission candidates",
    h1: "Learn geography through maps",
    lead: "Maps of Bangladesh and the world, countries and capitals, rivers and seas, mountains and deserts, plus quizzes, all in one place.",
    search: "Search a country, capital or place (coming soon)",
    topics: "Learning sections",
    soon: "Coming soon",
    open: "Open →",
    promiseTitle: "Our data policy",
    promise: "Every fact will be verified before publishing, with its source and last verified date shown alongside. Sections that are not built yet contain no data.",
    sourcesLink: "See Sources & Policy →",
    navMap: "World Map",
    navSources: "Sources & Policy",
    footer: "© MAPS GK · An educational project",
    switchTo: "বাংলা"
  }
};

var TOPICS = [
  { i: "🌍", href: "map.html", bn: ["বিশ্ব মানচিত্র", "ইন্টারঅ্যাক্টিভ মানচিত্রে দেশ চিনুন"], en: ["World Map", "Explore countries on an interactive map"] },
  { i: "🇧🇩", bn: ["বাংলাদেশের মানচিত্র", "বিভাগ ও জেলা মানচিত্রে দেখুন"], en: ["Bangladesh Map", "See divisions and districts on the map"] },
  { i: "🧭", bn: ["সাত মহাদেশ", "প্রতিটি মহাদেশ আলাদাভাবে"], en: ["Seven Continents", "Each continent in detail"] },
  { i: "🏛️", bn: ["দেশ ও রাজধানী", "সার্চযোগ্য তালিকা"], en: ["Countries & Capitals", "A searchable list"] },
  { i: "🌊", bn: ["নদী, সাগর ও মহাসাগর", "জলভাগের পরিচয়"], en: ["Rivers, Seas & Oceans", "Know the water bodies"] },
  { i: "⚓", bn: ["প্রণালি ও গুরুত্বপূর্ণ স্থান", "সমুদ্রপথের গুরুত্বপূর্ণ স্থান"], en: ["Straits & Key Places", "Important places on sea routes"] },
  { i: "⛰️", bn: ["পর্বতমালা ও মরুভূমি", "ভূমিরূপের পরিচয়"], en: ["Mountains & Deserts", "Landforms explained"] },
  { i: "📍", bn: ["সীমানা ও অবস্থান", "দেশের প্রতিবেশী ও অবস্থান"], en: ["Borders & Location", "Neighbours and position of countries"] },
  { i: "💡", bn: ["ভূগোল GK", "মানচিত্রভিত্তিক সংক্ষিপ্ত নোট"], en: ["Geography GK", "Short map-based notes"] },
  { i: "📝", bn: ["কুইজ ও মডেল টেস্ট", "ভর্তি পরীক্ষার অনুশীলন"], en: ["Quiz & Model Tests", "Admission test practice"] }
];

var lang = "bn";
try {
  var saved = localStorage.getItem("mapsgk-lang");
  if (saved === "bn" || saved === "en") { lang = saved; }
} catch (e) {}

function render() {
  var t = T[lang];
  document.documentElement.lang = lang;
  document.title = t.pageTitle;

  var nodes = document.querySelectorAll("[data-i18n]");
  for (var n = 0; n < nodes.length; n++) {
    nodes[n].textContent = t[nodes[n].getAttribute("data-i18n")];
  }
  document.getElementById("searchBox").placeholder = t.search;
  document.getElementById("langBtn").textContent = t.switchTo;

  var grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (var k = 0; k < TOPICS.length; k++) {
    var item = TOPICS[k];
    var card;
    if (item.href) {
      card = document.createElement("a");
      card.href = item.href;
      card.className = "card";
    } else {
      card = document.createElement("div");
      card.className = "card";
    }

    var ic = document.createElement("div");
    ic.className = "ic";
    ic.textContent = item.i;

    var h3 = document.createElement("h3");
    h3.textContent = item[lang][0];

    var p = document.createElement("p");
    p.textContent = item[lang][1];

    var b = document.createElement("span");
    b.className = item.href ? "badge on" : "badge";
    b.textContent = item.href ? t.open : t.soon;

    card.appendChild(ic);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(b);
    grid.appendChild(card);
  }
}

document.getElementById("langBtn").addEventListener("click", function () {
  lang = (lang === "bn") ? "en" : "bn";
  try { localStorage.setItem("mapsgk-lang", lang); } catch (e) {}
  render();
});

render();
