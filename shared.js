/* ============================================================
   shared.js · 全站公共交互
   主题 / 语言 / 自定义光标 / 滚动渐显 / 导航吸顶+scrollspy /
   移动端菜单 / 开屏动画（回访跳过）/ Hero 视差（rAF 节流）/ 复制
   用法见各页尾部 YZ.init* 调用
   ============================================================ */
window.LANG = "zh";
var YZ = (function(){
  "use strict";
  var api = {};

  /* ---------- 安全执行：单个初始化失败不拖垮其他模块 ---------- */
  api.safe = function(fn){ try{ fn(); }catch(e){ console.error("YZ init error:", e); } };

  /* ---------- 主题 ---------- */
  var THEME_BG = { dark: "#0d0c0a", light: "#f2eee6" };
  function syncThemeColor(){
    var m = document.querySelector('meta[name="theme-color"]');
    if(m) m.setAttribute("content", THEME_BG[document.documentElement.getAttribute("data-theme")] || THEME_BG.light);
  }
  /* 绑定主题按钮；页面头部内联脚本已先行设置初始主题 */
  api.bindTheme = function(){
    var btn = document.getElementById("themeBtn");
    var html = document.documentElement;
    function syncIcon(){ if(btn) btn.textContent = html.getAttribute("data-theme") === "dark" ? "◐" : "☾"; }
    syncIcon(); syncThemeColor();
    if(btn && !btn.dataset.bound){
      btn.dataset.bound = "1";
      btn.onclick = function(){
        var cur = html.getAttribute("data-theme");
        html.classList.add("switching");
        html.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
        syncIcon(); syncThemeColor();
        try{ localStorage.setItem("yz-theme", html.getAttribute("data-theme")); }catch(e){}
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ html.classList.remove("switching"); }); });
      };
    }
  };

  /* ---------- 语言 ----------
     页面持有 I18N 字典与 applyLang()，此处只管 LANG 值、按钮与持久化 */
  api.getLang = function(){ return window.LANG || "zh"; };
  api.bindLang = function(apply){
    var lb = document.getElementById("langBtn");
    try{
      var s = localStorage.getItem("yz-lang");
      if(s === "en" || s === "zh") window.LANG = s;
    }catch(e){}
    apply();
    if(lb && !lb.dataset.bound){
      lb.dataset.bound = "1";
      lb.addEventListener("click", function(){
        window.LANG = (window.LANG === "zh") ? "en" : "zh";
        apply();
        try{ localStorage.setItem("yz-lang", window.LANG); }catch(e){}
      });
    }
  };

  /* ---------- 用户字号档位（A → A+ → A++ 循环） ---------- */
  api.bindFontSize = function(){
    var btn = document.getElementById("fsBtn");
    var KEY = "yz-fs", ORDER = ["", "lg", "xl"], LABEL = { "": "A", lg: "A+", xl: "A++" };
    var cur = "";
    try{ cur = localStorage.getItem(KEY) || ""; }catch(e){}
    if(ORDER.indexOf(cur) < 0) cur = "";
    function apply(){
      if(cur) document.documentElement.setAttribute("data-fs", cur);
      else document.documentElement.removeAttribute("data-fs");
      if(btn) btn.textContent = LABEL[cur];
    }
    apply();
    if(btn && !btn.dataset.bound){
      btn.dataset.bound = "1";
      btn.addEventListener("click", function(){
        cur = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
        try{ localStorage.setItem(KEY, cur); }catch(e){}
        apply();
      });
    }
  };

  /* ---------- 复制到剪贴板（提示语跟随当前语言） ---------- */
  api.copyText = function(txt, btn){
    function done(){
      var o = btn.textContent;
      btn.textContent = (window.LANG === "en") ? "Copied ✓" : "已复制 ✓";
      setTimeout(function(){ btn.textContent = o; }, 1600);
    }
    function fallback(){
      var ta = document.createElement("textarea");
      ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand("copy"); done(); }
      catch(e){ alert((window.LANG === "en" ? "Copy failed, please copy manually: " : "复制失败，请手动复制：") + txt); }
      document.body.removeChild(ta);
    }
    if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(txt).then(done).catch(fallback); }
    else{ fallback(); }
  };

  /* ---------- 自定义光标（桌面端） ----------
     初始化成功后给 <html> 加 .cursor-on，CSS 才会隐藏原生光标 */
  api.initCursor = function(opts){
    opts = opts || {};
    if(!window.matchMedia("(pointer:fine)").matches) return;
    var dot = document.getElementById("curDot"), fol = document.getElementById("curFollow");
    if(!dot || !fol) return;
    document.documentElement.classList.add("cursor-on");
    var mx = innerWidth/2, my = innerHeight/2, fx = mx, fy = my;
    document.addEventListener("mousemove", function(e){
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function loop(){
      fx += (mx - fx) * .16; fy += (my - fy) * .16;
      fol.style.left = fx + "px"; fol.style.top = fy + "px";
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", function(e){
      var t = e.target.closest(opts.hover || "a,button,[data-copy]");
      fol.classList.toggle("hover", !!t);
      if(opts.view) fol.classList.toggle("view", !!e.target.closest(opts.view));
    });
  };

  /* ---------- 滚动渐显（IntersectionObserver） ---------- */
  api.initReveal = function(){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: .1 });
    document.querySelectorAll(".rv,.stagger").forEach(function(el){ io.observe(el); });
    api.io = io; window.__io = io; /* 供页面在动态插入节点后重新 observe */
  };

  /* ---------- 导航吸顶 + 进度条 + scrollspy ---------- */
  api.initNav = function(spyIds){
    var nav = document.getElementById("nav");
    var bar = document.getElementById("scrollbar");
    var links = document.querySelectorAll("#navLinks a");
    function onScroll(){
      var y = window.pageYOffset;
      if(nav) nav.classList.toggle("scrolled", y > 30);
      if(bar){
        var h = document.body.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? y / h * 100 : 0) + "%";
      }
      if(spyIds && spyIds.length){
        var cur = spyIds[0];
        spyIds.forEach(function(id){
          var s = document.getElementById(id);
          if(s && s.offsetTop <= y + 120) cur = id;
        });
        links.forEach(function(a){ a.classList.toggle("active", a.getAttribute("data-sec") === cur); });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  };

  /* ---------- 移动端菜单 ---------- */
  api.initBurger = function(){
    var burger = document.getElementById("burger"), links = document.getElementById("navLinks");
    if(!burger || !links) return;
    burger.onclick = function(){ links.classList.toggle("show"); };
    links.querySelectorAll("a").forEach(function(a){
      a.onclick = function(){ links.classList.remove("show"); };
    });
  };

  /* ---------- 开屏打字动画（同一浏览器会话内回访直接跳过） ---------- */
  api.initPreloader = function(){
    var pl = document.getElementById("preloader");
    if(!pl) return;
    var inner = document.getElementById("heroInner");
    var KEY = "yz-preload-seen";
    var seen = false;
    try{ seen = sessionStorage.getItem(KEY) === "1"; }catch(e){}
    function finish(){
      pl.classList.add("done");
      document.documentElement.classList.add("yz-entered"); /* 触发导航入场 */
      if(inner) inner.classList.add("entered");
    }
    if(seen){ finish(); return; } /* 回访：跳过动画直达主页 */
    try{ sessionStorage.setItem(KEY, "1"); }catch(e){}
    var pc = document.getElementById("pinyinContainer"),
        cc = document.getElementById("chineseContainer"),
        cur = document.getElementById("cursor");
    var letters = ["Y","U","Z","E","K","A","I"], idx = 0;
    function typeNext(){
      if(idx < letters.length){
        if(cur) cur.classList.add("is-typing");
        var s = document.createElement("span");
        s.className = "char-item"; s.textContent = letters[idx];
        pc.appendChild(s); idx++;
        setTimeout(function(){
          if(cur) cur.classList.remove("is-typing");
          setTimeout(typeNext, 90);
        }, 130);
      }else{ setTimeout(morph, 400); }
    }
    function morph(){
      pc.classList.add("fade-out"); cc.classList.add("is-visible");
      setTimeout(function(){
        if(cur) cur.style.opacity = "0";
        setTimeout(finish, 1000);
      }, 1000);
    }
    setTimeout(typeNext, 300);
    setTimeout(finish, 4400); /* 异常兜底 */
  };

  /* ---------- Hero 视差（rAF 节流） ---------- */
  api.initParallax = function(sel){
    var el = typeof sel === "string" ? document.querySelector(sel) : sel;
    if(!el) return;
    var ticking = false;
    window.addEventListener("scroll", function(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var y = window.pageYOffset;
        ticking = false;
        if(y > window.innerHeight) return;
        el.style.transform = "translateY(" + (y * .32) + "px)";
        el.style.opacity = String(1 - y / window.innerHeight * 1.2);
      });
    }, { passive: true });
  };

  return api;
})();
