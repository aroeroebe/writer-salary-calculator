/**
 * common.js — 共通コンポーネント
 *
 * 自動で行うこと:
 *   1. GA4スクリプトの挿入
 *   2. ツールページのヘッダー生成
 *   3. パンくずナビの挿入
 *   4. フッターの挿入
 *
 * 各HTMLの<body>に以下を設定するだけ:
 *   data-page     : "home" | "tool"
 *   data-title    : ページ名（ヘッダーh1 & パンくず）
 *   data-subtitle : ヘッダーの説明文（ツールページ）
 */

/* ── 1. GA4 ── */
var GA_ID = 'G-QZP3DCGL40';
var _gaScript = document.createElement('script');
_gaScript.async = true;
_gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
document.head.appendChild(_gaScript);
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA_ID);

/* ── 2〜4. コンポーネント ── */
(function () {
  'use strict';

  var body         = document.body;
  var pageType     = body.getAttribute('data-page')     || 'home';
  var pageTitle    = body.getAttribute('data-title')    || '';
  var pageSubtitle = body.getAttribute('data-subtitle') || '';

  /* ── ツールヘッダー生成 ── */
  function renderHeader() {
    if (pageType !== 'tool') return;
    var header = document.createElement('header');
    header.className = 'page-header';
    header.innerHTML =
      '<div class="page-header-label">ライター向けツール</div>' +
      '<h1>' + pageTitle + '</h1>' +
      (pageSubtitle ? '<p>' + pageSubtitle + '</p>' : '');
    document.body.insertBefore(header, document.body.firstChild);
  }

  /* ── パンくずナビ ── */
  function renderBreadcrumb() {
    if (pageType !== 'tool') return;
    var nav = document.createElement('nav');
    nav.className = 'breadcrumb-nav';
    nav.setAttribute('aria-label', 'パンくずリスト');
    nav.innerHTML =
      '<div class="breadcrumb-inner">' +
        '<a href="/" class="breadcrumb-item">' +
          '<span class="breadcrumb-home-icon" aria-hidden="true">' +
            '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M1 5.5L6 1L11 5.5V11H7.5V8H4.5V11H1V5.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>' +
            '</svg>' +
          '</span>' +
          'ホーム' +
        '</a>' +
        '<span class="breadcrumb-sep" aria-hidden="true">/</span>' +
        '<span class="breadcrumb-item current" aria-current="page">' + pageTitle + '</span>' +
      '</div>';
    var header = document.querySelector('header.page-header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    } else if (header) {
      header.parentNode.appendChild(nav);
    }
  }

  /* ── フッター ── */
  function renderFooter() {
    var footer = document.createElement('footer');
    footer.innerHTML =
      '<nav class="footer-nav" aria-label="フッターナビ">' +
        '<a href="/">トップページ</a>' +
        '<a href="/real-jikyuu.html">実質時給計算機</a>' +
        '<a href="/raise-price.html">単価アップ診断</a>' +
      　'<a href="/word-count.html">文字数カウンター</a>' +
      　'<a href="/line-count.html">行数カウンター</a>' +
        '<a href="/punctuation-count.html">句読点カウンター</a>' +
      '</nav>' +
      '<p class="footer-copy">&copy; 2025 Webライター向け無料ツール</p>';
    document.body.appendChild(footer);
  }

  /* ── GA4 イベント送信ヘルパー ── */
  window.trackCalc = function (label) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'calculate', { event_category: 'tool', event_label: label });
      }
    } catch (e) {}
  };

  /* ── 初期化 ── */
  function init() {
    renderHeader();
    renderBreadcrumb();
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
