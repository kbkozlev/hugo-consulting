
/* Base theme toggle (icon-only) */
(function(){
  const cfg = window.__THEME_CFG__ || {mode:"auto", showToggle:true};
  const ICONS = {
    light:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a1 1 0 0 1 1-1h0a1 1 0 1 1-2 0h0a1 1 0 0 1 1 1Zm0 17a1 1 0 0 1 1 1h0a1 1 0 1 1-2 0h0a1 1 0 0 1 1-1Zm9-9a1 1 0 0 1 1 1h0a1 1 0 1 1-2 0h0a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1 1 1h0a1 1 0 1 1-2 0h0a1 1 0 0 1 1-1Zm12.95 6.364a1 1 0 1 1 1.414 1.414h0a1 1 0 1 1-1.414-1.414Zm0-12.728a1 1 0 1 1 1.414-1.414h0a1 1 0 1 1-1.414 1.414ZM5.636 17.95a1 1 0 1 1 1.414 1.414h0A1 1 0 0 1 5.636 17.95Zm0-11.314A1 1 0 1 1 7.05 5.222h0a1 1 0 1 1-1.414 1.414ZM12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Z"/></svg>',
    dark:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3c.2 0 .4.01.6.03A7 7 0 0 0 21 12.79Z"/></svg>',
    auto:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20a10 10 0 0 0 0-20Z"/><path d="M12 2a10 10 0 0 0 0 20V2Z" opacity=".35"/></svg>'
  };
  const getStored = () => localStorage.getItem('site-theme-mode');
  const setStored = (m) => localStorage.setItem('site-theme-mode', m);
  const resolved = (m)=> m==='auto' ? ((matchMedia && matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark') : m;
  function apply(m){ document.documentElement.setAttribute('data-theme', resolved(m)==='light'?'light':'dark'); }
  const start = getStored() || cfg.mode || 'auto'; apply(start);
  if(!getStored() && start==='auto' && window.matchMedia){
    const mq = matchMedia('(prefers-color-scheme: light)'); mq.addEventListener('change', ()=>{ apply('auto'); update(); });
  }
  function next(m){ return m==='auto'?'dark':(m==='dark'?'light':'auto'); }
  function mount(){
    const btn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-toggle-icon');
    if(!btn || !icon) return;
    function updateIcon(){
      const m = getStored() || cfg.mode || 'auto';
      const eff = resolved(m);
      icon.innerHTML = (m==='auto') ? ICONS.auto : (eff==='light'?ICONS.light:ICONS.dark);
      btn.setAttribute('aria-label', 'Theme: '+m);
      btn.title = 'Theme: '+m+' (click to change)';
    }
    window.update = updateIcon;
    updateIcon();
    btn.addEventListener('click', ()=>{
      const cur = getStored() || cfg.mode || 'auto';
      const n = next(cur); setStored(n); apply(n); updateIcon();
    });
  }
  document.addEventListener('DOMContentLoaded', mount);
})();
