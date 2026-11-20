const readerPaths = {
  leadership: {
    title: "先看战略与成果",
    items: [
      "执行摘要：未来学习中心为什么现在",
      "总报告：学习方式六个转变",
      "建设路径：四步走与学校特色",
      "案例图谱：哪些学校已经跑起来",
    ],
  },
  academic: {
    title: "先看范式与评价",
    items: [
      "三类学习范式：个性化、项目化、自主学习",
      "新评价：过程可见、成长可证",
      "新工具：如何进入教学流程",
      "建设路径：先试点再推广",
    ],
  },
  college: {
    title: "先看场景与工具",
    items: [
      "新资源：专业课程如何重新组织",
      "项目化学习：真实项目怎么跑",
      "新伙伴：AI 老师如何帮助学生",
      "案例图谱：寻找可对标的学院做法",
    ],
  },
  it: {
    title: "先看架构与治理",
    items: [
      "AI 老师能力架构",
      "新基座：数据、模型与安全",
      "开放集成和学校数据归属",
      "学校专属建设与持续运营",
    ],
  },
};

const assessmentStates = [
  {
    max: 2,
    label: "资源汇聚期",
    hint: "先把资源、入口和统一数据基础梳理清楚。",
  },
  {
    max: 4,
    label: "场景试点期",
    hint: "选择一个专业或学院，让资源、AI 伙伴、工具和评价真正跑起来。",
  },
  {
    max: 6,
    label: "能力融合期",
    hint: "已经具备向校级能力平台和千校千面持续演进的基础。",
  },
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.8,
      },
    });
  }
}

function initMobileMenu() {
  const button = $("#mobileMenuButton");
  const menu = $("#mobileMenu");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open", !expanded);
  });

  $$("a", menu).forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    });
  });
}

function initPresenterMode() {
  const button = $("#presenterToggle");
  if (!button) return;
  button.addEventListener("click", () => {
    const active = !document.body.classList.contains("presenter");
    document.body.classList.toggle("presenter", active);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    const label = $("span", button);
    if (label) label.textContent = active ? "退出投屏" : "投屏模式";
    showToast(active ? "已进入投屏模式" : "已退出投屏模式");
  });
}

function initReaderPaths() {
  const container = $("#readerPath");
  const title = $("#readerPathTitle");
  const list = $("#readerPathList");
  if (!container || !title || !list) return;

  function render(role) {
    const data = readerPaths[role] ?? readerPaths.leadership;
    title.textContent = data.title;
    list.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");
    $$(".segmented__item", container).forEach((button) => {
      button.classList.toggle("active", button.dataset.role === role);
    });
  }

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".segmented__item");
    if (!button) return;
    render(button.dataset.role);
  });

  render("leadership");
}

function initReadingModes() {
  const buttons = $$(".reading-mode");
  if (!buttons.length) return;

  function apply(mode, options = {}) {
    document.body.dataset.reading = mode;
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.reading === mode);
    });
    if (!options.silent) {
      const label = buttons.find((button) => button.dataset.reading === mode)?.querySelector("strong");
      if (label) showToast(`已切换为${label.textContent}阅读`);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.reading));
  });

  apply("standard", { silent: true });
}

function initProgress() {
  const bar = $("#progressBar");
  const value = $("#progressValue");
  if (!bar || !value) return;

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max <= 0 ? 100 : Math.min(100, Math.max(0, (window.scrollY / max) * 100));
    bar.style.width = `${percent}%`;
    value.textContent = `${Math.round(percent)}%`;
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initNavigation() {
  const links = $$(".nav-link");
  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-18% 0px -62% 0px",
      threshold: [0.1, 0.3, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function initCounters() {
  const counters = $$("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.done === "true") return;
        const target = Number(entry.target.dataset.count || 0);
        entry.target.dataset.done = "true";
        let current = 0;
        const duration = 900;
        const start = performance.now();
        const step = (time) => {
          const ratio = Math.min(1, (time - start) / duration);
          current = Math.round(target * (1 - Math.pow(1 - ratio, 3)));
          entry.target.textContent = String(current);
          if (ratio < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initAssessment() {
  const inputs = $$("#assessment .assessment-list input");
  const value = $("#scoreValue");
  const label = $("#scoreLabel");
  const hint = $("#scoreHint");
  if (!inputs.length || !value || !label || !hint) return;

  function update() {
    const score = inputs.filter((input) => input.checked).reduce((sum, input) => sum + Number(input.value), 0);
    const state = assessmentStates.find((item) => score <= item.max) ?? assessmentStates.at(-1);
    value.textContent = String(score);
    label.textContent = state.label;
    hint.textContent = state.hint;
  }

  inputs.forEach((input) => input.addEventListener("change", update));
  update();
}

function initDiscussion() {
  const cards = $$("#questionGrid .question-card");
  const count = $("#discussedCount");
  const progress = $("#discussionProgress");
  if (!cards.length || !count || !progress) return;

  function update() {
    const total = cards.filter((card) => $("input", card)?.checked).length;
    count.textContent = String(total);
    progress.style.width = `${(total / cards.length) * 100}%`;
  }

  cards.forEach((card) => {
    const input = $("input", card);
    input?.addEventListener("change", update);
  });

  update();

  const copyButton = $("#copyQuestions");
  copyButton?.addEventListener("click", async () => {
    const text = cards.map((card, index) => `${index + 1}. ${$("strong", card)?.textContent ?? ""}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      showToast("研讨题已复制");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      showToast("研讨题已复制");
    }
  });
}

function initTimer() {
  const display = $("#timerValue");
  const toggle = $("#timerToggle");
  const reset = $("#timerReset");
  if (!display || !toggle || !reset) return;

  let remaining = 10 * 60;
  let running = false;
  let interval = null;

  function render() {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function tick() {
    if (remaining <= 0) {
      window.clearInterval(interval);
      interval = null;
      running = false;
      display.textContent = "00:00";
      showToast("讨论时间到");
      return;
    }
    remaining -= 1;
    render();
  }

  toggle.addEventListener("click", () => {
    running = !running;
    if (running && !interval) interval = window.setInterval(tick, 1000);
    if (!running && interval) {
      window.clearInterval(interval);
      interval = null;
    }
    showToast(running ? "计时开始" : "计时暂停");
  });

  reset.addEventListener("click", () => {
    window.clearInterval(interval);
    interval = null;
    running = false;
    remaining = 10 * 60;
    render();
    showToast("计时已重置");
  });

  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initMobileMenu();
  initPresenterMode();
  initReaderPaths();
  initReadingModes();
  initProgress();
  initNavigation();
  initCounters();
  initAssessment();
  initDiscussion();
  initTimer();
});
