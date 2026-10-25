(function () {
  'use strict';

  var CONTENT = window.CONTENT || [];
  var SLIDES = window.SLIDES || {};
  var MASTER_KEY = 'dsa-review-mastery-v1';
  var THEME_KEY = 'dsa-review-theme-v1';
  var PAGE_SIZE = 50;

  var els = {
    nav: document.getElementById('chapterNav'),
    search: document.getElementById('search'),
    searchClear: document.getElementById('searchClear'),
    randomBtn: document.getElementById('randomBtn'),
    themeBtn: document.getElementById('themeBtn'),
    head: document.getElementById('chapterHead'),
    cards: document.getElementById('cards'),
    empty: document.getElementById('empty'),
    clearFilters: document.getElementById('clearFilters'),
    resultMeta: document.getElementById('resultMeta'),
    typeFilter: document.getElementById('typeFilter'),
    unmastered: document.getElementById('unmasteredOnly'),
    expandBtn: document.getElementById('expandBtn'),
    progressPct: document.getElementById('progressPct'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    resetBtn: document.getElementById('resetBtn'),
    quizDialog: document.getElementById('quizDialog'),
    quizSource: document.getElementById('quizSource'),
    quizBody: document.getElementById('quizBody'),
    quizReveal: document.getElementById('quizReveal'),
    quizNext: document.getElementById('quizNext'),
    quizClose: document.getElementById('quizClose'),
    main: document.getElementById('main')
  };

  var state = {
    chapter: 'all',
    view: 'all',
    kind: 'all',
    q: '',
    unmastered: false,
    limit: PAGE_SIZE
  };

  var mastered = loadSet(MASTER_KEY);
  var quizQuestion = null;
  var expandOpen = false;
  var toastTimer = null;

  /* ---------- storage ---------- */

  function loadSet(key) {
    try {
      var raw = localStorage.getItem(key);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveSet(key, set) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) { /* storage unavailable: review still works */ }
  }

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var stripEl = document.createElement('div');
  function plain(html) {
    stripEl.innerHTML = html || '';
    return stripEl.textContent || '';
  }

  function allItems() {
    var items = [];
    CONTENT.forEach(function (ch) {
      (ch.knowledge || []).forEach(function (k) {
        items.push({ type: 'knowledge', ch: ch, data: k, id: k.id, hay: (k.title + ' ' + (k.tags || []).join(' ') + ' ' + plain(k.body) + ' ' + (k.tip || '')).toLowerCase() });
      });
      (ch.questions || []).forEach(function (q) {
        items.push({ type: 'question', ch: ch, data: q, id: q.id, hay: (q.title + ' ' + (q.tags || []).join(' ') + ' ' + plain(q.statement) + ' ' + plain(q.answer) + ' ' + (q.note || '') + ' ' + (q.source || '')).toLowerCase() });
      });
    });
    return items;
  }

  var ALL_ITEMS = allItems();
  var MASTERABLE = ALL_ITEMS.length;

  function chapterById(id) {
    for (var i = 0; i < CONTENT.length; i++) if (CONTENT[i].id === id) return CONTENT[i];
    return null;
  }

  function scopeChapters(globalSearch) {
    if (state.chapter === 'all' || globalSearch) return CONTENT;
    var ch = chapterById(state.chapter);
    return ch ? [ch] : CONTENT;
  }

  function kindList(chapters) {
    var seen = {};
    var out = [];
    chapters.forEach(function (ch) {
      (ch.questions || []).forEach(function (q) {
        var k = q.kind || '题目';
        if (!seen[k]) { seen[k] = 0; out.push(k); }
        seen[k]++;
      });
    });
    return { order: out, counts: seen };
  }

  function matchesQuery(item, terms) {
    if (!terms.length) return true;
    for (var i = 0; i < terms.length; i++) {
      if (item.hay.indexOf(terms[i]) === -1) return false;
    }
    return true;
  }

  function termsOf(q) {
    return q.toLowerCase().split(/\s+/).filter(Boolean);
  }

  /* ---------- theme ---------- */

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    els.themeBtn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
  }

  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(saved);
  })();

  els.themeBtn.addEventListener('click', function () {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* ---------- navigation ---------- */

  function buildNav() {
    var html = '<div class="nav-label">复习目录</div>';
    html += navButton({ id: 'all', num: '∑', title: '课程总览', sub: '全部章节', count: MASTERABLE });
    CONTENT.forEach(function (ch) {
      var count = (ch.knowledge || []).length + (ch.questions || []).length;
      html += navButton({ id: ch.id, num: ch.num, title: ch.title, sub: ch.subtitle || '', count: count });
    });
    els.nav.innerHTML = html;
    els.nav.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-chapter]');
      if (!btn) return;
      selectChapter(btn.dataset.chapter, true);
    });
  }

  function navButton(c) {
    return '<button type="button" data-chapter="' + esc(c.id) + '">' +
      '<span class="num">' + esc(c.num) + '</span>' +
      '<span class="nav-text"><strong>' + esc(c.title) + '</strong><small>' + esc(c.sub) + '</small></span>' +
      '<span class="count">' + c.count + '</span>' +
      '</button>';
  }

  function selectChapter(id, clearSearch) {
    state.chapter = id || 'all';
    state.kind = 'all';
    state.limit = PAGE_SIZE;
    expandOpen = false;
    if (clearSearch && state.q) {
      state.q = '';
      els.search.value = '';
      els.searchClear.hidden = true;
    }
    try { history.replaceState(null, '', '#' + state.chapter); } catch (e) {}
    syncNav();
    render();
    if (window.innerWidth <= 860) {
      els.main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function syncNav() {
    Array.prototype.forEach.call(els.nav.querySelectorAll('button[data-chapter]'), function (b) {
      b.classList.toggle('is-active', b.dataset.chapter === state.chapter);
    });
  }

  function parseHash() {
    var h = (location.hash || '').replace('#', '');
    if (!h) return;
    state.chapter = h === 'all' ? 'all' : (chapterById(h) ? h : 'all');
  }

  /* ---------- header ---------- */

  function renderHead(itemsInScope) {
    var ch = state.chapter === 'all' ? null : chapterById(state.chapter);
    if (ch) {
      var kn = (ch.knowledge || []).length;
      var qn = (ch.questions || []).length;
      var links = '';
      if (ch.pdf) links += '<a href="' + esc(ch.pdf) + '" target="_blank" rel="noopener">课件 PDF</a>';
      (ch.links || []).forEach(function (l) {
        links += '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
      });
      els.head.dataset.num = ch.num;
      els.head.innerHTML =
        '<span class="eyebrow">第 ' + esc(ch.num) + ' 章 · ' + esc(ch.subtitle || '') + '</span>' +
        '<h1>' + esc(ch.title) + '<small>' + esc(ch.subtitle || '') + '</small></h1>' +
        '<p class="intro">' + ch.intro + '</p>' +
        '<div class="head-links">' + links + '</div>' +
        '<div class="head-stats">' +
        '<span><strong>' + kn + '</strong>知识点</span>' +
        '<span><strong>' + qn + '</strong>题目</span>' +
        '<span><strong>' + (ch.cheats || []).length + '</strong>速查表</span>' +
        '<span><strong>' + slideCount(ch.id) + '</strong>页课件</span>' +
        '</div>';
      return;
    }

    var totalK = 0, totalQ = 0, totalC = 0, totalP = 0;
    CONTENT.forEach(function (c) {
      totalK += (c.knowledge || []).length;
      totalQ += (c.questions || []).length;
      totalC += (c.cheats || []).length;
      totalP += slideCount(c.id);
    });

    els.head.dataset.num = 'DSA';
    els.head.innerHTML =
      '<span class="eyebrow">数据结构与算法 A · 期末复习</span>' +
      '<h1>全课程总览<small>7 章 + 附录</small></h1>' +
      '<p class="intro">把课件里的概念、公式与易错点，六次书面作业的完整题目与解答，以及习题讲解中的补充题型整理在一起。' +
      '用顶部搜索查关键词，用“随机抽题”自测，勾选“已掌握”记录进度。</p>' +
      '<div class="head-stats">' +
      '<span><strong>' + totalK + '</strong>知识点</span>' +
      '<span><strong>' + totalQ + '</strong>题目</span>' +
      '<span><strong>' + totalC + '</strong>速查表</span>' +
      '<span><strong>' + totalP + '</strong>页课件</span>' +
      '</div>' +
      '<div class="overview-grid">' +
      CONTENT.map(function (c) {
        return '<button class="overview-card" type="button" data-chapter="' + esc(c.id) + '">' +
          '<span class="oc-num">' + esc(c.num) + '</span>' +
          '<strong>' + esc(c.title) + '</strong>' +
          '<span>' + (c.knowledge || []).length + ' 知识点 · ' + (c.questions || []).length + ' 题</span>' +
          '</button>';
      }).join('') +
      '</div>';
  }

  function slideCount(id) {
    return SLIDES[id] && SLIDES[id].pages ? SLIDES[id].pages.length : 0;
  }

  els.head.addEventListener('click', function (e) {
    var btn = e.target.closest('.overview-card');
    if (btn) selectChapter(btn.dataset.chapter, true);
  });

  /* ---------- filters ---------- */

  function syncToolbar() {
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
      t.classList.toggle('is-active', t.dataset.view === state.view);
    });

    var showKinds = state.view === 'questions' || state.view === 'all';
    els.typeFilter.style.display = showKinds ? '' : 'none';
    els.unmastered.parentElement.style.display = (state.view === 'knowledge' || state.view === 'questions' || state.view === 'all') ? '' : 'none';

    if (showKinds) {
      var chapters = scopeChapters(!!state.q);
      var kl = kindList(chapters);
      var html = '<button class="chip' + (state.kind === 'all' ? ' is-active' : '') + '" data-kind="all">全部来源</button>';
      kl.order.forEach(function (k) {
        html += '<button class="chip' + (state.kind === k ? ' is-active' : '') + '" data-kind="' + esc(k) + '">' + esc(k) + ' ' + kl.counts[k] + '</button>';
      });
      els.typeFilter.innerHTML = html;
    }
  }

  els.typeFilter.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    state.kind = chip.dataset.kind;
    state.limit = PAGE_SIZE;
    render();
  });

  Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
    t.addEventListener('click', function () {
      if (state.view === t.dataset.view) return;
      state.view = t.dataset.view;
      state.limit = PAGE_SIZE;
      state.kind = 'all';
      expandOpen = false;
      render();
    });
  });

  els.unmastered.addEventListener('change', function () {
    state.unmastered = els.unmastered.checked;
    state.limit = PAGE_SIZE;
    render();
  });

  var searchTimer = null;
  els.search.addEventListener('input', function () {
    var v = els.search.value;
    els.searchClear.hidden = !v;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.q = v.trim();
      state.limit = PAGE_SIZE;
      render();
    }, 110);
  });

  els.searchClear.addEventListener('click', function () {
    els.search.value = '';
    els.searchClear.hidden = true;
    state.q = '';
    state.limit = PAGE_SIZE;
    render();
    els.search.focus();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      els.search.focus();
    }
    if (e.key === 'Escape' && document.activeElement === els.search && els.search.value) {
      els.search.value = '';
      els.searchClear.hidden = true;
      state.q = '';
      render();
    }
  });

  els.clearFilters.addEventListener('click', function () {
    state.kind = 'all';
    state.unmastered = false;
    state.q = '';
    els.unmastered.checked = false;
    els.search.value = '';
    els.searchClear.hidden = true;
    state.limit = PAGE_SIZE;
    render();
  });

  /* ---------- items ---------- */

  function collectItems() {
    var chScope = scopeChapters(false);
    if (state.q) chScope = CONTENT;
    var terms = termsOf(state.q);
    var items = [];

    if (state.view === 'knowledge' || state.view === 'all') {
      chScope.forEach(function (ch) {
        (ch.knowledge || []).forEach(function (k) {
          var it = ALL_ITEMS_BY_ID[k.id];
          if (it && matchesQuery(it, terms)) items.push(it);
        });
      });
    }

    if (state.view === 'questions' || state.view === 'all') {
      chScope.forEach(function (ch) {
        (ch.questions || []).forEach(function (q) {
          if (state.kind !== 'all' && (q.kind || '题目') !== state.kind) return;
          var it = ALL_ITEMS_BY_ID[q.id];
          if (it && matchesQuery(it, terms)) items.push(it);
        });
      });
    }

    if (state.unmastered) items = items.filter(function (it) { return !mastered.has(it.id); });
    return items;
  }

  var ALL_ITEMS_BY_ID = {};
  ALL_ITEMS.forEach(function (it) { ALL_ITEMS_BY_ID[it.id] = it; });

  /* ---------- card markup ---------- */

  function insightMarkup(k) {
    var html = '<div class="card-body">' + (k.body || '');
    if (k.tip) html += '<div class="tip">' + k.tip + '</div>';
    if (k.tags && k.tags.length) {
      html += '<div class="tags">' + k.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>';
    }
    return html + '</div>';
  }

  function knowledgeCard(it, index) {
    var k = it.data;
    var on = mastered.has(k.id);
    return '<article class="card knowledge-card' + (on ? ' is-mastered' : '') + '" data-id="' + esc(k.id) + '">' +
      '<div class="card-head">' +
      '<div class="card-head-main">' +
      '<div class="card-kicker">' +
      '<span class="badge knowledge">知识点</span>' +
      '<span class="card-src">第 ' + esc(it.ch.num) + ' 章 · ' + esc(it.ch.title) + '</span>' +
      '<span class="card-src">' + esc(k.id) + '</span>' +
      '</div>' +
      '<h3>' + esc(k.title) + '</h3>' +
      '</div>' +
      masterToggle(k.id, on) +
      '</div>' +
      insightMarkup(k) +
      '</article>';
  }

  function questionCard(it, index) {
    var q = it.data;
    var on = mastered.has(q.id);
    var kind = q.kind || '题目';
    var body = '<div class="card-body">' +
      '<div class="q-statement"><span class="q-label">题目</span>' + (q.statement || '') + '</div>' +
      '<details class="answer"' + (expandOpen ? ' open' : '') + '>' +
      '<summary>查看参考解答</summary>' +
      '<div class="answer-inner"><span class="answer-label">参考解答</span>' + (q.answer || '') +
      (q.note ? '<div class="tip">' + q.note + '</div>' : '') +
      '</div></details>' +
      ((q.tags && q.tags.length) ? '<div class="tags">' + q.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
      '</div>';
    return '<article class="card q-card' + (on ? ' is-mastered' : '') + '" data-id="' + esc(q.id) + '">' +
      '<div class="card-head">' +
      '<div class="card-head-main">' +
      '<div class="card-kicker">' +
      '<span class="badge ' + esc(kind) + '">' + esc(kind) + '</span>' +
      '<span class="card-src">' + esc(q.source || '') + '</span>' +
      (q.star ? '<span class="badge 考试">重点</span>' : '') +
      '</div>' +
      '<h3><span class="q-index">Q' + (index + 1) + '</span>' + esc(q.title) + '</h3>' +
      '</div>' +
      masterToggle(q.id, on) +
      '</div>' +
      body +
      '</article>';
  }

  function masterToggle(id, on) {
    return '<label class="master-toggle" title="标记为已掌握">' +
      '<input type="checkbox" data-master="' + esc(id) + '"' + (on ? ' checked' : '') + '>' +
      '<span class="dot"></span><span>已掌握</span></label>';
  }

  function cheatCard(ch, c) {
    return '<article class="card cheat-card">' +
      '<div class="card-head"><div class="card-head-main">' +
      '<div class="card-kicker"><span class="badge cheat">速查</span>' +
      '<span class="card-src">第 ' + esc(ch.num) + ' 章 · ' + esc(ch.title) + '</span></div>' +
      '<h3>' + esc(c.title) + '</h3></div></div>' +
      '<div class="card-body">' + c.html + '</div>' +
      '</article>';
  }

  function sourceCard(ch, page) {
    var text = (page.text || '').trim();
    return '<article class="source-page' + (text ? '' : ' is-empty') + '">' +
      '<div class="sp-head"><strong>P' + page.p + '</strong>' +
      '<a href="' + esc(ch.pdf) + '#page=' + page.p + '" target="_blank" rel="noopener">打开 PDF 第 ' + page.p + ' 页 ↗</a></div>' +
      '<pre>' + esc(text || '（本页无可提取文字，请查阅 PDF）') + '</pre>' +
      '</article>';
  }

  /* ---------- rendering ---------- */

  function render() {
    renderHead();
    syncToolbar();
    expandOpen = false;
    els.expandBtn.textContent = '展开全部解答';

    if (state.view === 'source') {
      renderSource();
      return;
    }

    els.cards.style.display = '';
    els.empty.hidden = true;

    if (state.view === 'cheats') {
      renderCheats();
      return;
    }

    var items = collectItems();
    var total = items.length;
    var shown = items.slice(0, state.limit);

    if (!total) {
      els.cards.innerHTML = '';
      els.empty.hidden = false;
      els.resultMeta.hidden = false;
      els.resultMeta.innerHTML = '<span>没有匹配的内容</span>';
      els.expandBtn.hidden = true;
      updateProgress();
      return;
    }

    var html = shown.map(function (it, i) {
      return it.type === 'knowledge' ? knowledgeCard(it, i) : questionCard(it, i);
    }).join('');

    if (total > shown.length) {
      html += '<button class="btn btn-ghost" type="button" id="loadMore" style="align-self:center;margin-top:6px">显示更多（已显示 ' +
        shown.length + ' / ' + total + '）</button>';
    }

    els.cards.innerHTML = html;
    els.empty.hidden = true;
    els.expandBtn.hidden = !els.cards.querySelector('details.answer');

    var where = state.q ? '全站搜索' : (state.chapter === 'all' ? '全部章节' : '第 ' + chapterById(state.chapter).num + ' 章');
    var label = state.view === 'questions' ? '道题' : (state.view === 'knowledge' ? '个知识点' : '条内容');
    els.resultMeta.hidden = false;
    els.resultMeta.innerHTML = '<span>' + esc(where) + (state.q ? ' “' + esc(state.q) + '”' : '') + '</span>' +
      '<strong>' + total + '</strong><span>' + label + '</span>' +
      (state.unmastered ? '<span>· 仅未掌握</span>' : '') +
      (state.kind !== 'all' ? '<span>· 来源：' + esc(state.kind) + '</span>' : '');

    var more = document.getElementById('loadMore');
    if (more) {
      more.addEventListener('click', function () {
        state.limit += PAGE_SIZE;
        render();
      });
    }

    updateProgress();
  }

  function renderCheats() {
    var chapters = state.chapter === 'all' ? CONTENT : [chapterById(state.chapter)];
    var terms = termsOf(state.q);
    var html = '';
    var count = 0;
    chapters.forEach(function (ch) {
      if (!ch) return;
      (ch.cheats || []).forEach(function (c) {
        var hay = (c.title + ' ' + plain(c.html)).toLowerCase();
        if (terms.length && !terms.every(function (t) { return hay.indexOf(t) !== -1; })) return;
        count++;
        html += cheatCard(ch, c);
      });
    });
    els.cards.innerHTML = html;
    els.empty.hidden = count > 0;
    els.expandBtn.hidden = true;
    els.resultMeta.hidden = false;
    els.resultMeta.innerHTML = '<span>' + esc(state.q ? '全站搜索' : (state.chapter === 'all' ? '全部章节' : '第 ' + chapterById(state.chapter).num + ' 章')) + '</span>' +
      '<strong>' + count + '</strong><span>张速查表</span>';
    updateProgress();
  }

  function renderSource() {
    if (state.chapter === 'all') {
      els.cards.innerHTML = '<div class="slides-note">请从左侧选择一个章节，再查看课件逐页原文。原文由 PDF 直接提取，公式中的特殊符号可能丢失，点击卡片右上角可打开对应 PDF 页面。</div>' +
        CONTENT.filter(function (c) { return SLIDES[c.id]; }).map(function (c) {
          return '<article class="source-page"><div class="sp-head"><strong>第 ' + esc(c.num) + ' 章 · ' + esc(c.title) + '</strong>' +
            '<a href="' + esc(c.pdf) + '" target="_blank" rel="noopener">打开课件 PDF ↗</a></div>' +
            '<pre>共 ' + slideCount(c.id) + ' 页。选择该章节后可按关键词检索逐页文字。</pre></article>';
        }).join('');
      els.empty.hidden = true;
      els.expandBtn.hidden = true;
      els.resultMeta.hidden = true;
      updateProgress();
      return;
    }

    var ch = chapterById(state.chapter);
    var deck = SLIDES[ch.id];
    if (!deck) {
      els.cards.innerHTML = '<div class="slides-note">本章暂无逐页原文数据，请直接打开课件 PDF。</div>';
      els.empty.hidden = true;
      els.expandBtn.hidden = true;
      els.resultMeta.hidden = true;
      return;
    }

    var terms = termsOf(state.q);
    var pages = deck.pages.filter(function (p) {
      if (!terms.length) return true;
      var t = (p.text || '').toLowerCase();
      return terms.every(function (x) { return t.indexOf(x) !== -1; });
    });
    var total = pages.length;
    var shown = pages.slice(0, state.limit);
    els.cards.innerHTML = shown.map(function (p) { return sourceCard(ch, p); }).join('');
    if (total > shown.length) {
      els.cards.insertAdjacentHTML('beforeend', '<button class="btn btn-ghost" type="button" id="loadMore" style="align-self:center">显示更多（已显示 ' + shown.length + ' / ' + total + '）</button>');
      document.getElementById('loadMore').addEventListener('click', function () {
        state.limit += PAGE_SIZE;
        render();
      });
    }
    els.empty.hidden = total > 0;
    els.expandBtn.hidden = true;
    els.resultMeta.hidden = false;
    els.resultMeta.innerHTML = '<span>' + esc(deck.title || ('第 ' + ch.num + ' 章')) + (state.q ? ' · 关键词 “' + esc(state.q) + '”' : '') + '</span>' +
      '<strong>' + total + '</strong><span>页</span>' +
      (terms.length ? '<span>· 高亮请用浏览器页面内查找</span>' : '');
    updateProgress();
  }

  /* ---------- mastery ---------- */

  els.cards.addEventListener('change', function (e) {
    var cb = e.target.closest('input[data-master]');
    if (!cb) return;
    var id = cb.dataset.master;
    if (cb.checked) mastered.add(id); else mastered.delete(id);
    saveSet(MASTER_KEY, mastered);
    var card = cb.closest('.card');
    if (card) card.classList.toggle('is-mastered', cb.checked);
    updateProgress();
    if (state.unmastered && cb.checked) {
      render();
    }
  });

  function updateProgress() {
    var done = 0;
    ALL_ITEMS.forEach(function (it) { if (mastered.has(it.id)) done++; });
    var pct = MASTERABLE ? Math.round(done / MASTERABLE * 100) : 0;
    els.progressPct.textContent = pct + '%';
    els.progressBar.style.width = pct + '%';
    els.progressText.textContent = done + ' / ' + MASTERABLE;
  }

  els.resetBtn.addEventListener('click', function () {
    if (!mastered.size) return;
    if (!window.confirm('清除所有“已掌握”标记？此操作无法撤销。')) return;
    mastered = new Set();
    saveSet(MASTER_KEY, mastered);
    render();
    toast('已重置复习进度');
  });

  /* ---------- expand / collapse ---------- */

  els.expandBtn.addEventListener('click', function () {
    expandOpen = !expandOpen;
    Array.prototype.forEach.call(els.cards.querySelectorAll('details.answer'), function (d) {
      d.open = expandOpen;
    });
    els.expandBtn.textContent = expandOpen ? '收起全部解答' : '展开全部解答';
  });

  /* ---------- random quiz ---------- */

  function pool() {
    var chapters = state.chapter === 'all' ? CONTENT : [chapterById(state.chapter)];
    var out = [];
    chapters.forEach(function (ch) {
      if (!ch) return;
      (ch.questions || []).forEach(function (q) { out.push({ ch: ch, q: q }); });
    });
    return out.length ? out : ALL_ITEMS.filter(function (i) { return i.type === 'question'; });
  }

  function openQuiz() {
    var p = pool();
    if (!p.length) return;
    var next;
    do {
      next = p[Math.floor(Math.random() * p.length)];
    } while (p.length > 1 && quizQuestion && next.q.id === quizQuestion.q.id);
    quizQuestion = next;
    els.quizSource.textContent = '第 ' + next.ch.num + ' 章 · ' + next.ch.title + ' · ' + (next.q.source || next.q.kind || '');
    els.quizBody.innerHTML = '<h4 style="margin:0 0 8px;font-size:16px">' + esc(next.q.title) + '</h4>' +
      '<div class="q-statement">' + (next.q.statement || '') + '</div>' +
      '<div id="quizAnswerSlot"></div>';
    els.quizReveal.hidden = false;
    els.quizReveal.textContent = '查看解答';
    if (!els.quizDialog.open) els.quizDialog.showModal();
  }

  els.randomBtn.addEventListener('click', openQuiz);

  els.quizReveal.addEventListener('click', function () {
    if (!quizQuestion) return;
    var slot = document.getElementById('quizAnswerSlot');
    if (!slot) return;
    if (slot.dataset.shown === '1') {
      slot.innerHTML = '';
      slot.dataset.shown = '';
      els.quizReveal.textContent = '查看解答';
      return;
    }
    slot.innerHTML = '<details class="answer" open><summary>参考解答</summary><div class="answer-inner">' +
      '<span class="answer-label">参考解答</span>' + (quizQuestion.q.answer || '') +
      (quizQuestion.q.note ? '<div class="tip">' + quizQuestion.q.note + '</div>' : '') +
      '</div></details>';
    slot.dataset.shown = '1';
    els.quizReveal.textContent = '收起解答';
  });

  els.quizNext.addEventListener('click', openQuiz);
  els.quizClose.addEventListener('click', function () { els.quizDialog.close(); });
  els.quizDialog.addEventListener('click', function (e) {
    if (e.target === els.quizDialog) els.quizDialog.close();
  });

  /* ---------- toast ---------- */

  function toast(msg) {
    var t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  /* ---------- boot ---------- */

  parseHash();
  buildNav();
  syncNav();
  els.unmastered.checked = false;
  render();
  updateProgress();

  window.addEventListener('hashchange', function () {
    var before = state.chapter;
    parseHash();
    if (before !== state.chapter) {
      state.kind = 'all';
      state.limit = PAGE_SIZE;
      syncNav();
      render();
    }
  });
})();
