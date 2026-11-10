(function () {
  const page = document.body.dataset.page || "";
  const navItems = [
    { id: "home", label: "首页", href: "index.html", icon: "house" },
    { id: "knowledge", label: "医学知识中心", href: "knowledge.html", icon: "book-open" },
    { id: "clinical", label: "医师智脑执业中心", href: "clinical.html", icon: "stethoscope" },
    { id: "personal", label: "个性化学习", href: "personal.html", icon: "graduation-cap" },
    { id: "teacher", label: "未来教师中心", href: "teacher.html", icon: "presentation" }
  ];
  const moreItems = [
    { id: "project", label: "项目式学习", href: "project.html", icon: "folder-kanban", note: "真实病例与任务驱动" },
    { id: "research", label: "科研探索", href: "research.html", icon: "search-code", note: "医学证据与研究支持" }
  ];

  const headerHost = document.querySelector("[data-site-header]");
  if (headerHost) {
    headerHost.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner">
          <a class="brand" href="index.html" aria-label="返回首页">
            <img src="assets/dali-mark-official.png" alt="大理大学校徽">
            <span>
              <strong>大理大学医学智慧教育平台</strong>
              <small>DALI UNIVERSITY · MEDICAL SMART EDUCATION PLATFORM</small>
            </span>
          </a>
          <nav class="main-nav" id="mainNav" aria-label="主要导航">
            ${navItems.map(item => `
              <a class="${page === item.id ? "active" : ""}" href="${item.href}">
                <i data-lucide="${item.icon}" aria-hidden="true"></i>
                <span>${item.label}</span>
              </a>
            `).join("")}
            <div class="more-nav" id="moreNav">
              <button type="button" aria-controls="moreMenu" aria-expanded="false">
                <i data-lucide="layout-grid" aria-hidden="true"></i>
                <span>更多场景</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <div class="more-menu" id="moreMenu">
                ${moreItems.map(item => `
                  <a class="${page === item.id ? "active" : ""}" href="${item.href}">
                    <i data-lucide="${item.icon}" aria-hidden="true"></i>
                    <span><b>${item.label}</b><span>${item.note}</span></span>
                  </a>
                `).join("")}
              </div>
            </div>
          </nav>
          <div class="header-tools">
            <div class="role-wrap" id="roleWrap">
              <button class="role-trigger" id="roleTrigger" type="button" aria-controls="roleMenu" aria-expanded="false">
                <i data-lucide="user-round" aria-hidden="true"></i>
                <span data-role-label>角色选择</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <div class="role-menu" id="roleMenu">
                <button type="button" data-role="student"><i data-lucide="graduation-cap"></i><span><b>学生</b><span>课程学习 · 能力成长</span></span><em>进入</em></button>
                <button type="button" data-role="teacher"><i data-lucide="presentation"></i><span><b>教师</b><span>智慧教学 · 学情分析</span></span><em>进入</em></button>
                <button type="button" data-role="border-worker"><i data-lucide="briefcase-medical"></i><span><b>沿边医疗工作者</b><span>继续教育 · 临床支持</span></span><em>进入</em></button>
              </div>
            </div>
            <button class="icon-button" type="button" aria-label="个人中心" data-toast="个人中心为演示入口">
              <i data-lucide="circle-user-round" aria-hidden="true"></i>
            </button>
            <button class="mobile-toggle" id="mobileToggle" type="button" aria-controls="mainNav" aria-expanded="false" aria-label="打开导航">
              <i data-lucide="menu" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  const footerHost = document.querySelector("[data-site-footer]");
  if (footerHost) {
    footerHost.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <div class="site-footer__brand">
            <img src="assets/dali-mark-official.png" alt="">
            <span>大理大学医学部 · 医学智慧教育平台</span>
          </div>
          <span>智慧赋能医学教育 · 仁心守护生命未来</span>
        </div>
      </footer>
    `;
  }

  const roleLabelMap = {
    student: "学生",
    teacher: "教师",
    "border-worker": "沿边医疗工作者"
  };

  const roleTrigger = document.getElementById("roleTrigger");
  const roleWrap = document.getElementById("roleWrap");
  const roleMenu = document.getElementById("roleMenu");
  if (roleTrigger && roleWrap && roleMenu) {
    const storedRole = localStorage.getItem("dali-med-role");
    if (storedRole && roleLabelMap[storedRole]) {
      const label = roleWrap.querySelector("[data-role-label]");
      if (label) label.textContent = roleLabelMap[storedRole];
      roleMenu.querySelectorAll("[data-role]").forEach(button => {
        button.classList.toggle("active", button.dataset.role === storedRole);
      });
    }

    roleTrigger.addEventListener("click", event => {
      event.stopPropagation();
      roleWrap.classList.toggle("open");
      roleTrigger.setAttribute("aria-expanded", String(roleWrap.classList.contains("open")));
    });

    roleMenu.querySelectorAll("[data-role]").forEach(button => {
      button.addEventListener("click", () => {
        const role = button.dataset.role;
        localStorage.setItem("dali-med-role", role);
        const label = roleWrap.querySelector("[data-role-label]");
        if (label) label.textContent = roleLabelMap[role] || "角色选择";
        roleMenu.querySelectorAll("[data-role]").forEach(item => item.classList.toggle("active", item === button));
        roleWrap.classList.remove("open");
        roleTrigger.setAttribute("aria-expanded", "false");
        showToast(`已切换为：${roleLabelMap[role] || "学生"}`);
      });
    });
  }

  document.addEventListener("click", event => {
    if (roleWrap && !roleWrap.contains(event.target)) {
      roleWrap.classList.remove("open");
      if (roleTrigger) roleTrigger.setAttribute("aria-expanded", "false");
    }
    const moreNav = document.getElementById("moreNav");
    if (moreNav && !moreNav.contains(event.target)) {
      moreNav.classList.remove("open");
      const trigger = moreNav.querySelector("button");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  });

  const moreNav = document.getElementById("moreNav");
  if (moreNav) {
    const button = moreNav.querySelector("button");
    if (button) {
      button.addEventListener("click", event => {
        event.stopPropagation();
        moreNav.classList.toggle("open");
        button.setAttribute("aria-expanded", String(moreNav.classList.contains("open")));
      });
    }
  }

  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(mainNav.classList.contains("open")));
    });
  }

  document.querySelectorAll("[data-toast]").forEach(element => {
    element.addEventListener("click", event => {
      event.preventDefault();
      showToast(element.dataset.toast || "功能演示");
    });
  });

  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.style.cssText = "position:fixed;left:50%;bottom:28px;z-index:220;padding:11px 16px;border-radius:12px;background:#071c3a;color:#fff;font-size:12px;box-shadow:0 16px 40px rgba(2,21,42,.3);opacity:0;pointer-events:none;transform:translate(-50%,12px);transition:.22s;";
  document.body.appendChild(toast);
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%,0)";
    toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%,12px)";
    }, 1800);
  }
  window.showToast = showToast;

  const roleHotspot = document.querySelector("[data-poster-role-trigger]");
  const posterRoleMenu = document.querySelector("[data-poster-role-menu]");
  if (roleHotspot && posterRoleMenu) {
    roleHotspot.addEventListener("click", event => {
      event.preventDefault();
      posterRoleMenu.classList.toggle("show");
    });
    document.addEventListener("click", event => {
      if (!posterRoleMenu.contains(event.target) && !roleHotspot.contains(event.target)) {
        posterRoleMenu.classList.remove("show");
      }
    });
    posterRoleMenu.querySelectorAll("[data-poster-role]").forEach(button => {
      button.addEventListener("click", () => {
        const label = button.querySelector("b")?.textContent || "学生";
        localStorage.setItem("dali-med-role", button.dataset.posterRole);
        posterRoleMenu.classList.remove("show");
        showToast(`已切换为：${label}`);
      });
    });
  }

  function initFilters(scope) {
    scope.querySelectorAll("[data-filter-group]").forEach(group => {
      const targetSelector = group.dataset.filterTarget;
      const buttons = group.querySelectorAll("[data-filter]");
      const items = document.querySelectorAll(`${targetSelector} [data-category]`);
      const search = group.querySelector("[data-filter-search]");
      let active = "all";

      function apply() {
        const query = (search?.value || "").trim().toLowerCase();
        items.forEach(item => {
          const categoryMatch = active === "all" || item.dataset.category === active;
          const textMatch = !query || item.textContent.toLowerCase().includes(query);
          item.hidden = !(categoryMatch && textMatch);
        });
      }

      buttons.forEach(button => {
        button.addEventListener("click", () => {
          active = button.dataset.filter;
          buttons.forEach(item => item.classList.toggle("active", item === button));
          apply();
        });
      });
      if (search) search.addEventListener("input", apply);
    });
  }
  initFilters(document);

  document.querySelectorAll("[data-tabs]").forEach(tabs => {
    const buttons = tabs.querySelectorAll("[data-tab]");
    const scope = document.querySelector(tabs.dataset.tabs);
    if (!scope) return;
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(item => item.classList.toggle("active", item === button));
        scope.querySelectorAll("[data-tab-panel]").forEach(panel => {
          panel.hidden = panel.dataset.tabPanel !== button.dataset.tab;
        });
      });
    });
  });

  document.querySelectorAll("[data-console]").forEach(consoleRoot => {
    const input = consoleRoot.querySelector("textarea");
    const output = consoleRoot.querySelector("[data-console-output]");
    const send = consoleRoot.querySelector("[data-console-send]");
    consoleRoot.querySelectorAll("[data-prompt]").forEach(button => {
      button.addEventListener("click", () => {
        if (input) input.value = button.dataset.prompt || "";
        input?.focus();
      });
    });
    send?.addEventListener("click", () => {
      const value = input?.value.trim();
      if (!value) {
        showToast("请先输入一个医学教学或临床学习问题");
        input?.focus();
        return;
      }
      if (output) {
        output.innerHTML = `<strong>智脑建议已生成</strong>围绕“${value.slice(0, 48)}${value.length > 48 ? "…" : ""}”，系统已将知识证据、学习目标、临床情境与练习任务组织为一份可执行的学习方案。可通过右侧任务卡继续调整难度与学习时长。`;
        output.hidden = false;
      }
      showToast("已生成演示建议");
    });
  });

  const assessment = document.querySelector("[data-assessment]");
  if (assessment) {
    const questions = [
      {
        title: "面对一个新的临床问题，你会优先怎么做？",
        options: ["先检索指南与循证证据", "先回顾课堂知识", "先向带教老师询问", "先观察同类病例"]
      },
      {
        title: "你更希望通过哪种方式提升能力？",
        options: ["真实病例推演与复盘", "系统课程与章节测试", "同伴讨论与导师反馈", "技能操作与模拟训练"]
      },
      {
        title: "你目前最希望补强的方向是？",
        options: ["临床推理与决策", "基础医学知识体系", "医患沟通与人文关怀", "边境常见病与公共卫生"]
      }
    ];
    let current = 0;
    const answers = [];
    const title = assessment.querySelector("[data-question-title]");
    const options = assessment.querySelector("[data-question-options]");
    const result = assessment.querySelector("[data-assessment-result]");
    const prev = assessment.querySelector("[data-assessment-prev]");
    const next = assessment.querySelector("[data-assessment-next]");

    function renderQuestion() {
      const question = questions[current];
      if (title) title.textContent = `${current + 1}. ${question.title}`;
      if (options) {
        options.innerHTML = question.options.map((option, index) => `
          <button class="answer-card ${answers[current] === index ? "selected" : ""}" type="button" data-answer="${index}">${option}</button>
        `).join("");
        options.querySelectorAll("[data-answer]").forEach(button => {
          button.addEventListener("click", () => {
            answers[current] = Number(button.dataset.answer);
            options.querySelectorAll("[data-answer]").forEach(item => item.classList.toggle("selected", item === button));
          });
        });
      }
      assessment.querySelectorAll("[data-step]").forEach(step => {
        const index = Number(step.dataset.step);
        step.classList.toggle("active", index === current);
        step.classList.toggle("done", index < current);
      });
      if (prev) prev.disabled = current === 0;
      if (next) next.textContent = current === questions.length - 1 ? "生成方案" : "下一题";
      if (result) result.classList.remove("show");
    }

    prev?.addEventListener("click", () => {
      if (current > 0) {
        current -= 1;
        renderQuestion();
      }
    });

    next?.addEventListener("click", () => {
      if (answers[current] === undefined) {
        showToast("请选择一个答案后继续");
        return;
      }
      if (current < questions.length - 1) {
        current += 1;
        renderQuestion();
        return;
      }
      if (result) result.classList.add("show");
      assessment.querySelectorAll("[data-step]").forEach(step => step.classList.add("done"));
      showToast("个性化学习方案已生成");
    });
    renderQuestion();
  }

  document.querySelectorAll("[data-submit-project]").forEach(button => {
    button.addEventListener("click", () => {
      button.textContent = "方案已提交";
      button.disabled = true;
      showToast("项目方案已进入教师评审");
    });
  });

  document.querySelectorAll("[data-join-alliance]").forEach(button => {
    button.addEventListener("click", () => {
      button.textContent = "已申请加入";
      button.disabled = true;
      showToast("协作申请已提交");
    });
  });

  document.querySelectorAll("[data-research-mode]").forEach(button => {
    button.addEventListener("click", () => {
      const siblings = button.parentElement?.querySelectorAll("[data-research-mode]") || [];
      siblings.forEach(item => item.classList.toggle("active", item === button));
    });
  });

  document.querySelectorAll("[data-research-send]").forEach(button => {
    button.addEventListener("click", () => {
      const shell = button.closest(".research-search");
      const input = shell?.querySelector("textarea");
      const value = input?.value.trim();
      if (!value) {
        showToast("请输入研究问题或关键词");
        input?.focus();
        return;
      }
      showToast(`正在检索：${value.slice(0, 22)}${value.length > 22 ? "…" : ""}`);
    });
  });

  document.querySelectorAll("[data-counter]").forEach(element => {
    const target = Number(element.dataset.counter || 0);
    let started = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || started) return;
      started = true;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 34));
      const timer = setInterval(() => {
        current = Math.min(target, current + step);
        element.textContent = String(current);
        if (current >= target) clearInterval(timer);
      }, 24);
      observer.disconnect();
    }, { threshold: .5 });
    observer.observe(element);
  });

  const homeCarousel = document.querySelector(".medical-home-carousel");
  if (homeCarousel) {
    const slides = Array.from(homeCarousel.querySelectorAll(".medical-home-slide"));
    const dots = Array.from(homeCarousel.querySelectorAll(".medical-home-carousel__dots span"));
    let activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains("active")));
    if (slides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.setInterval(() => {
        slides[activeIndex].classList.remove("active");
        dots[activeIndex]?.classList.remove("active");
        activeIndex = (activeIndex + 1) % slides.length;
        slides[activeIndex].classList.add("active");
        dots[activeIndex]?.classList.add("active");
      }, 9000);
    }
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
