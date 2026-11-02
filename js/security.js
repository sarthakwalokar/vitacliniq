/**
 * BlueBase / VitaCliniq Global CRO - Advanced Security & Anti-Duplication Suite
 * Multi-layer protection against:
 * 1. Code Inspection & Developer Tools (F12, Ctrl+Shift+I, Console, Debugger)
 * 2. Right-Click Context Menus
 * 3. Text Selection, Copying, Cutting, Dragging, and Printing
 * 4. AI Crawlers, Automated Scrapers, Headless Browsers, and Duplication Bots
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Bot, Headless Browser & AI Scraping Trap
     ========================================================================== */
  function detectAutomatedAgent() {
    const isHeadless =
      navigator.webdriver === true ||
      window.__nightmare ||
      window.callPhantom ||
      window._phantom ||
      window.__puppeteer_evaluation_script__ ||
      /HeadlessChrome|PhantomJS|Bytespider|ClaudeBot|GPTBot|CCBot|PerplexityBot/i.test(navigator.userAgent);

    if (isHeadless) {
      document.documentElement.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>403 Forbidden - Security Shield Active</title>
          <style>
            body {
              background: #0a192f;
              color: #f8fafc;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              text-align: center;
              padding: 20px;
            }
            .card {
              max-width: 580px;
              background: #0e1e38;
              border: 1px solid rgba(242, 98, 36, 0.4);
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            h1 { color: #f26224; margin-top: 0; font-size: 26px; }
            p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>403 Forbidden — Intellectual Property Protected</h1>
            <p>Automated crawling, AI data scraping, headless extraction, and content duplication are strictly prohibited on this domain.</p>
            <p>Proprietary Clinical Research System &copy; 2026. All rights reserved.</p>
          </div>
        </body>
        </html>
      `;
      throw new Error("Access restricted: Automated scraping prohibited.");
    }
  }

  try {
    detectAutomatedAgent();
  } catch (e) {}

  /* ==========================================================================
     2. Frame Busting (Prevent embedding in AI Web Viewers / iframes)
     ========================================================================== */
  if (window.top !== window.self) {
    try {
      window.top.location = window.self.location;
    } catch (e) {
      if (document.body) {
        document.body.innerHTML = '';
      }
    }
  }

  /* ==========================================================================
     3. Security Toast Notification
     ========================================================================== */
  let toastTimer = null;
  function showSecurityToast(message) {
    let toast = document.getElementById('security-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'security-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #0a192f;
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 50px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.2px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(242, 98, 36, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000000;
        pointer-events: none;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        opacity: 0;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f26224" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      <span>${message}</span>
    `;

    // Show
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2800);
  }

  /* ==========================================================================
     4. Disable Right-Click Context Menu
     ========================================================================== */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityToast('Right-click is disabled to protect proprietary assets.');
    return false;
  }, true);

  /* ==========================================================================
     5. Disable Text Selection, Copy, Cut & Drag
     ========================================================================== */
  // Block copy
  document.addEventListener('copy', function (e) {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', 'Notice: Content duplication and AI scraping are prohibited by intellectual property safeguards.');
    }
    showSecurityToast('Content copying is disabled on this site.');
  }, true);

  // Block cut
  document.addEventListener('cut', function (e) {
    e.preventDefault();
    showSecurityToast('Action disabled: Content is protected.');
  }, true);

  // Block drag & drop (e.g. dragging images/links to desktop or AI prompt)
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  }, true);

  // Block selection on non-input elements
  document.addEventListener('selectstart', function (e) {
    const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
    if (targetTag !== 'INPUT' && targetTag !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  }, true);

  /* ==========================================================================
     6. Disable Keyboard Shortcuts (Inspect, View Source, Save, Print)
     ========================================================================== */
  document.addEventListener('keydown', function (e) {
    const key = e.key;
    const ctrl = e.ctrlKey || e.metaKey; // Windows Ctrl or Mac Cmd
    const shift = e.shiftKey;
    const alt = e.altKey;

    // F12 -> DevTools
    if (key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Developer tools are disabled.');
      return false;
    }

    // Ctrl+Shift+I / Cmd+Opt+I (Inspect Element)
    if ((ctrl && shift && (key === 'I' || key === 'i' || e.keyCode === 73)) ||
        (ctrl && alt && (key === 'I' || key === 'i' || e.keyCode === 73))) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Inspect Element is disabled.');
      return false;
    }

    // Ctrl+Shift+J / Cmd+Opt+J (Console)
    if ((ctrl && shift && (key === 'J' || key === 'j' || e.keyCode === 74)) ||
        (ctrl && alt && (key === 'J' || key === 'j' || e.keyCode === 74))) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Developer Console is disabled.');
      return false;
    }

    // Ctrl+Shift+C / Cmd+Opt+C (Inspect Element selector)
    if ((ctrl && shift && (key === 'C' || key === 'c' || e.keyCode === 67)) ||
        (ctrl && alt && (key === 'C' || key === 'c' || e.keyCode === 67))) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Inspect Element is disabled.');
      return false;
    }

    // Ctrl+U / Cmd+Opt+U (View Source)
    if (ctrl && (key === 'U' || key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('View Page Source is disabled.');
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if (ctrl && (key === 'S' || key === 's' || e.keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Page saving is disabled.');
      return false;
    }

    // Ctrl+P / Cmd+P (Print Page / Save as PDF)
    if (ctrl && (key === 'P' || key === 'p' || e.keyCode === 80)) {
      e.preventDefault();
      e.stopPropagation();
      showSecurityToast('Page printing and export are disabled.');
      return false;
    }

    // Ctrl+A / Cmd+A outside inputs
    if (ctrl && (key === 'A' || key === 'a' || e.keyCode === 65)) {
      const activeTag = document.activeElement ? document.activeElement.tagName.toUpperCase() : '';
      if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, true);

  /* ==========================================================================
     7. DevTools Shield Notice (Triggered on shortcut or inspection attempts)
     ========================================================================== */
  let devToolsShield = null;

  function createDevToolsShield() {
    if (document.getElementById('devtools-lockout-shield')) return;

    devToolsShield = document.createElement('div');
    devToolsShield.id = 'devtools-lockout-shield';
    devToolsShield.style.cssText = `
      position: fixed;
      inset: 0;
      background: #050d1a;
      z-index: 9999999;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 30px;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    devToolsShield.innerHTML = `
      <div style="max-width: 520px; background: #0a192f; border: 1px solid rgba(242, 98, 36, 0.4); padding: 40px; border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
        <div style="width: 60px; height: 60px; background: rgba(242, 98, 36, 0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f26224" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h2 style="color: #ffffff; margin-top: 0; margin-bottom: 12px; font-size: 22px;">Security Alert: Inspection Prohibited</h2>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
          Developer tools and DOM inspection are disabled to safeguard proprietary clinical research architecture and copyright assets.
        </p>
        <p style="color: #64748b; font-size: 13px;">Please close developer tools and reload to resume viewing.</p>
      </div>
    `;

    document.body.appendChild(devToolsShield);
  }

  function setDevToolsLock(active) {
    if (!devToolsShield) {
      if (document.body) createDevToolsShield();
      else return;
    }
    if (active) {
      devToolsShield.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else {
      devToolsShield.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  /* ==========================================================================
     8. Wipe & Disable Console
     ========================================================================== */
  try {
    const noop = function () {};
    ['log', 'warn', 'error', 'info', 'debug', 'table', 'dir', 'trace'].forEach(method => {
      console[method] = noop;
    });
    setInterval(() => {
      try { console.clear(); } catch (e) {}
    }, 2000);
  } catch (e) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createDevToolsShield();
    });
  } else {
    createDevToolsShield();
  }
})();

