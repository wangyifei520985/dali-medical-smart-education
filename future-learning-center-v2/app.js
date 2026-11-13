const app = document.getElementById("app");

const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

const routeMeta = {
  "student/home": { section: "学生端", title: "学习首页", desc: "聚合课程、任务与考证进度" },
  "student/knowledge": { section: "学生端", title: "医学知识中心", desc: "六个课程群与专业知识森林" },
  "student/exam": { section: "学生端", title: "执医考证与岗位能力", desc: "能力、课程、知识点、测评形成闭环" },
  "student/tasks": { section: "学生端", title: "任务与提醒", desc: "统一管理课程、考试与活动提醒" },
  "student/research": { section: "学生端", title: "科研探索", desc: "一期提供统一科研资源入口" },
  "teacher/home": { section: "教师端", title: "我教的课", desc: "课程、班级、教学任务与常用工具" },
  "teacher/prepare": { section: "教师端", title: "医学课程智慧备课", desc: "从教学主题到课堂结构、教案与题目" },
  "teacher/tools": { section: "教师端", title: "教学工具箱", desc: "课堂互动、随堂测与学情反馈" },
  "teacher/growth": { section: "教师端", title: "课程建设与教师发展", desc: "课程运营、培训评选与成果档案" },
  "teacher/analytics": { section: "教师端", title: "学情分析", desc: "整合课堂、课程、作业与评价数据" },
  "teacher/research": { section: "教师端", title: "我的科研", desc: "科研项目、团队、成果与资源入口" },
  "admin/home": { section: "管理端", title: "运行总览", desc: "监测课程、专业、学院与基地运行状态" },
  "admin/integration": { section: "管理端", title: "教学监管与教务协同", desc: "连接教务、课程、专业、教发与考试系统" },
  "admin/assessment": { section: "管理端", title: "测评与考核管理", desc: "执医、课程、技能与 OSCE 统一管理" },
  "admin/data": { section: "管理端", title: "数据管理与质量报告", desc: "学生、教师、课程与专业画像" },
  "admin/resources": { section: "管理端", title: "资源治理与运营", desc: "课程、题库、知识和智能体统一治理" },
  "gallery": { section: "原型总览", title: "全部页面", desc: "按角色快速浏览产品页面" },
};

const navGroups = {
  student: [
    {
      title: "学习",
      links: [
        ["student/home", "home", "学习首页"],
        ["student/knowledge", "library-big", "医学知识中心"],
        ["student/exam", "badge-check", "执医考证"],
      ],
    },
    {
      title: "支持",
      links: [
        ["student/tasks", "bell-ring", "任务与提醒"],
        ["student/research", "search-code", "科研探索"],
      ],
    },
  ],
  teacher: [
    {
      title: "教师端",
      links: [
        ["teacher/home", "book-open-check", "我教的课"],
        ["teacher/analytics", "chart-no-axes-combined", "学情分析"],
        ["teacher/research", "search-code", "我的科研"],
      ],
    },
  ],
  admin: [
    {
      title: "治理",
      links: [
        ["admin/home", "layout-dashboard", "运行总览"],
        ["admin/integration", "network", "教务协同"],
        ["admin/assessment", "clipboard-list", "测评考核"],
      ],
    },
    {
      title: "数据与资源",
      links: [
        ["admin/data", "database", "数据管理"],
        ["admin/resources", "archive", "资源治理"],
      ],
    },
  ],
};

const navShortLabels = {
  "student/home": "首页",
  "student/knowledge": "知识中心",
  "student/exam": "执医考证",
  "student/tasks": "任务提醒",
  "student/research": "科研",
  "teacher/home": "我教的课",
  "teacher/analytics": "学情分析",
  "teacher/research": "我的科研",
  "admin/home": "运行总览",
  "admin/integration": "教务协同",
  "admin/assessment": "测评考核",
  "admin/data": "数据管理",
  "admin/resources": "资源治理",
};

const screenCatalog = [
  ["", "门户首页", "品牌、角色与统一入口", "portal"],
  ["#/student/home", "学生学习首页", "学习、任务与考证进度聚合", "dashboard"],
  ["#/student/knowledge", "医学知识中心", "课程群与知识森林", "split"],
  ["#/student/exam", "执医考证与岗位能力", "能力画像与思维阶梯", "dashboard"],
  ["#/student/tasks", "任务与提醒", "统一消息与任务过载控制", "dashboard"],
  ["#/student/research", "科研探索", "科研资源轻入口", "grid"],
  ["#/teacher/home", "我教的课", "课程、班级、教学任务与教师发展", "dashboard"],
  ["#/teacher/prepare", "智慧备课", "教学设计与资源生成", "split"],
  ["#/teacher/tools", "教学工具箱", "课堂互动与随堂测", "split"],
  ["#/teacher/growth", "课程建设与教师发展", "培训、评选与成果档案", "dashboard"],
  ["#/teacher/analytics", "学情分析", "课程运行与质量分析", "dashboard"],
  ["#/teacher/research", "我的科研", "项目、团队、成果与科研资源", "grid"],
  ["#/admin/home", "管理端运行总览", "校级运行与教学质量", "dashboard"],
  ["#/admin/integration", "教学监管与教务协同", "多系统集成与排课监管", "diagram"],
  ["#/admin/assessment", "测评与考核管理", "题库、组卷与成绩分析", "table"],
  ["#/admin/data", "数据管理与质量报告", "学生、教师与课程画像", "dashboard"],
  ["#/admin/resources", "资源治理与运营", "课程、题库与智能体治理", "table"],
];

function pageHead(route) {
  const meta = routeMeta[route];
  const actions = {
    "student/home": `${button("下载学习周报", "download", "soft")}${button("开始学习", "book-open", "primary", "#/student/knowledge")}`,
    "student/knowledge": `${button("资源收藏", "bookmark", "soft")}${button("继续学习", "play", "primary")}`,
    "student/exam": `${button("错题回顾", "rotate-ccw", "soft")}${button("开始模拟测评", "play-circle", "primary")}`,
    "student/tasks": `${button("全部标为已读", "check-check", "soft")}`,
    "student/research": `${button("我的收藏", "bookmark", "soft")}${button("发起检索", "search", "primary")}`,
    "teacher/home": `${button("发布教学任务", "plus", "primary")}`,
    "teacher/prepare": `${button("保存草稿", "save", "soft")}${button("生成教学设计", "sparkles", "primary", "", "generate-design")}`,
    "teacher/tools": `${button("投屏", "screen-share", "soft")}${button("发布互动", "send", "primary")}`,
    "teacher/growth": `${button("上传成果", "upload", "soft")}${button("查看教师画像", "user-round-search", "primary")}`,
    "teacher/analytics": `${button("导出报告", "download", "soft")}`,
    "teacher/research": `${button("我的成果", "folder-open", "soft")}${button("发起科研检索", "search", "primary")}`,
    "admin/home": `${button("导出运行简报", "download", "soft")}`,
    "admin/integration": `${button("查看接口日志", "list-tree", "soft")}${button("同步数据", "refresh-cw", "primary", "", "sync-data")}`,
    "admin/assessment": `${button("导入题库", "upload", "soft")}${button("新建考试", "plus", "primary")}`,
    "admin/data": `${button("导出报告", "download", "soft")}${button("自定义视图", "settings-2", "primary")}`,
    "admin/resources": `${button("资源巡检", "scan-search", "soft")}${button("新增资源", "plus", "primary")}`,
    "gallery": `${button("返回门户", "undo-2", "soft", "")}`,
  };

  return `
    <div class="page-head">
      <div>
        <h2>${meta.title}</h2>
        <p>${meta.desc}</p>
      </div>
      <div class="page-head__actions">${actions[route] || ""}</div>
    </div>
  `;
}

function button(label, iconName, variant = "", route = "", action = "") {
  const cls = `btn${variant ? ` btn--${variant}` : ""}`;
  if (route) {
    return `<a class="${cls}" href="${route}">${icon(iconName)}<span>${label}</span></a>`;
  }
  return `<button class="${cls}" type="button"${action ? ` data-action="${action}"` : ""}>${icon(iconName)}<span>${label}</span></button>`;
}

function stat(label, value, note, iconName, suffix = "") {
  return `
    <div class="stat">
      <div class="stat__label"><span>${label}</span>${icon(iconName)}</div>
      <div class="stat__value">${value}${suffix ? `<small>${suffix}</small>` : ""}</div>
      <div class="stat__note">${note}</div>
    </div>
  `;
}

function surface(title, body, desc = "", action = "") {
  return `
    <section class="surface">
      <div class="surface__head">
        <div><h3>${title}</h3>${desc ? `<p>${desc}</p>` : ""}</div>
        ${action}
      </div>
      <div class="surface__body">${body}</div>
    </section>
  `;
}

function taskRow(iconName, title, desc, tagText, tagClass = "") {
  return `
    <div class="task-row">
      <div class="task-row__icon">${icon(iconName)}</div>
      <div><h4>${title}</h4><p>${desc}</p></div>
      <span class="tag ${tagClass}">${tagText}</span>
    </div>
  `;
}

function progressRow(label, value, tone = "") {
  return `
    <div class="metric-row">
      <span>${label}</span>
      <div class="progress ${tone}"><span style="width:${value}%"></span></div>
      <strong>${value}%</strong>
    </div>
  `;
}

function miniPreview(kind) {
  if (kind === "portal") {
    return `
      <div class="mini-shell">
        <div class="mini-content">
          <div class="mini-title"></div>
          <div class="mini-stats"><span></span><span></span><span></span></div>
          <div class="mini-body"><span></span><span></span></div>
        </div>
      </div>
    `;
  }
  return `
    <div class="mini-shell">
      <div class="mini-sidebar"></div>
      <div class="mini-content">
        <div class="mini-title"></div>
        <div class="mini-stats"><span></span><span></span><span></span></div>
        <div class="mini-body"><span></span><span></span></div>
      </div>
    </div>
  `;
}

function renderPortal() {
  return `
    <main class="portal">
      <header class="portal__topbar">
        <a class="brand" href="#/" aria-label="返回门户">
          <img src="assets/dali-mark-official.png" alt="大理大学校徽">
          <span class="brand__text">
            <strong>大理大学未来学习中心</strong>
            <small>DALI UNIVERSITY FUTURE LEARNING CENTER</small>
          </span>
        </a>
        <div class="portal__top-actions">
          <a class="portal__top-link" href="#/gallery">${icon("layout-grid")}<span>全部页面</span></a>
          <a class="portal__top-link" href="#/student/home" data-action="enter-role" data-role="student">${icon("log-in")}<span>进入原型</span></a>
        </div>
      </header>

      <section class="portal__main">
        <div class="portal__copy">
          <h1><span>大理大学</span>未来学习中心</h1>
          <p>围绕本科医学教学和执业医师考试，让学习资源统一入口、教学过程真正运行、管理数据有据可查。</p>
          <div class="portal__principles">
            <span>应用为本</span>
            <span>学生会用</span>
            <span>教师减负</span>
            <span>数据可管</span>
            <span>先一期落地</span>
          </div>
        </div>

        <section class="role-panel" aria-label="角色入口">
          <div class="role-panel__heading">
            <div>
              <h2>选择使用角色</h2>
              <p>登录后仅展示该角色最基本的常用功能</p>
            </div>
            <a class="role-panel__gallery" href="#/gallery">${icon("panels-top-left")}页面总览</a>
          </div>
          <div class="role-list">
            <a class="role-entry" href="#/student/home" data-action="enter-role" data-role="student">
              <span class="role-entry__icon">${icon("graduation-cap")}</span>
              <span><h3>学生</h3><p>课程资源、执医考证、统一入口与任务提醒</p></span>
              <span class="role-entry__arrow">${icon("arrow-right")}</span>
            </a>
            <a class="role-entry" href="#/teacher/home" data-action="enter-role" data-role="teacher">
              <span class="role-entry__icon">${icon("presentation")}</span>
              <span><h3>教师</h3><p>课程教学、智慧备课、课程建设与教师发展</p></span>
              <span class="role-entry__arrow">${icon("arrow-right")}</span>
            </a>
            <a class="role-entry" href="#/admin/home" data-action="enter-role" data-role="admin">
              <span class="role-entry__icon">${icon("settings-2")}</span>
              <span><h3>管理者</h3><p>运行监管、教务协同、测评考核与数据治理</p></span>
              <span class="role-entry__arrow">${icon("arrow-right")}</span>
            </a>
          </div>
        </section>
      </section>

      <footer class="portal__footer">
        <span>大理大学未来学习中心 · 产品原型</span>
        <span>一期聚焦：执医考证、统一入口、教学减负、数据监管</span>
      </footer>
    </main>
  `;
}

function renderGallery() {
  const catalog = screenCatalog.map(([route, title, desc, kind]) => `
    <a class="screen-preview ${kind === "portal" ? "portal-preview" : ""}" href="${route || "#/"}">
      <div class="screen-preview__canvas">${miniPreview(kind)}</div>
      <div class="screen-preview__meta">
        <div><h3>${title}</h3><p>${desc}</p></div>
        ${icon("arrow-up-right")}
      </div>
    </a>
  `).join("");

  return `
    <div class="page-head">
      <div>
        <h2>全部页面原型</h2>
        <p>共 ${screenCatalog.length} 个页面，覆盖门户、学生端、教师端和管理端。点击任意页面进入可交互原型。</p>
      </div>
      <div class="page-head__actions">${button("返回门户", "undo-2", "soft", "#/")}</div>
    </div>
    <div class="gallery-grid">${catalog}</div>
  `;
}

function renderOnboarding(role) {
  const hidden = true;

  const configs = {
    student: {
      eyebrow: "学习体验全新升级",
      title: "欢迎来到未来学习中心~",
      copy: "平台已按“能力 - 课程 - 知识点 - 学习资源”重新组织。你可以查看薄弱能力，快速找到对应课程、期刊、知识点和题库，也可以按推荐顺序完成学习。",
      features: [
        ["route", "能力关联", "从薄弱能力直接查看需要学习的课程、知识点和推荐资源。", "network"],
        ["sparkles", "个性推荐", "根据测评表现推荐课程、期刊、题库与学习顺序。", "sparkles"],
        ["badge-check", "学习提醒", "课程、考试和任务统一聚合，减少重复提醒。", "bell-ring"],
      ],
    },
    teacher: {
      eyebrow: "教师工作台已精简",
      title: "欢迎来到教师端~",
      copy: "一级导航只保留“我教的课、学情分析、我的科研”。备课、课堂工具、课程建设和教师发展收进“我教的课”，当前页面更聚焦。",
      features: [
        ["book-open-check", "我教的课", "课程、班级、任务、备课、课堂工具与课程建设集中管理。", "presentation"],
        ["chart-no-axes-combined", "学情分析", "查看课程运行、学生参与、作业完成与教学预警。", "trending-up"],
        ["search-code", "我的科研", "统一进入项目、团队、成果、文献和研究工具。", "flask-conical"],
      ],
    },
    admin: {
      eyebrow: "治理视图已精简",
      title: "欢迎来到管理端~",
      copy: "平台只保留运行总览、教务协同、测评考核、数据管理和资源治理五类一级页面，优先呈现课程是否真正运行和关键质量信号。",
      features: [
        ["layout-dashboard", "运行总览", "集中查看用户、课程、资源和服务运行情况。", "activity"],
        ["database", "数据管理", "形成学生、教师、课程与专业画像和质量报告。", "chart-no-axes-combined"],
        ["network", "系统协同", "连接教务、课程、专业、教发和考试系统。", "link-2"],
      ],
    },
  };
  const config = configs[role] || configs.student;

  return `
    <div class="onboarding-backdrop" data-onboarding ${hidden ? "hidden" : ""}>
      <section class="onboarding-window" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <div class="onboarding-window__top">
          <strong>${config.eyebrow}</strong>
          <button class="onboarding-close" type="button" data-action="close-onboarding" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="onboarding-hero">
          <h2 id="onboarding-title">${config.title.replace("~", "<span>~</span>")}</h2>
          <p>${config.copy}</p>
        </div>
        <div class="onboarding-grid">
          ${config.features.map(([featureIcon, title, desc, illustrationIcon]) => `
            <article class="onboarding-feature">
              <div class="onboarding-feature__title">
                <span class="onboarding-feature__icon">${icon(featureIcon)}</span>
                <span>${title}</span>
              </div>
              <p>${desc}</p>
              <div class="onboarding-illustration">
                <span>${icon("circle-dot")}</span>
                <span>${icon(illustrationIcon)}</span>
                <span>${icon("arrow-up-right")}</span>
              </div>
            </article>
          `).join("")}
        </div>
        <div class="onboarding-footer">
          <div class="onboarding-footer__left">
            <button class="onboarding-guide" type="button" data-action="onboarding-guide">${icon("book-open")}使用手册 ${icon("chevron-right")}</button>
            <label class="onboarding-check"><input type="checkbox" id="onboarding-weekly">本周内不再提醒</label>
          </div>
          <div class="onboarding-actions">
            <button class="btn btn--accent" type="button" data-action="accept-onboarding">我知道了</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderRoleMenu(role) {
  const hidden = sessionStorage.getItem("dali-role-menu-open") !== role;
  const roleName = { student: "学生", teacher: "教师", admin: "管理者" }[role];
  const roleIcon = { student: "graduation-cap", teacher: "presentation", admin: "settings-2" }[role];
  const descriptions = {
    "student/home": "课程、任务、考证与学习进度",
    "student/knowledge": "课程群、数字教材与专业知识森林",
    "student/exam": "薄弱能力、对应课程、知识点与资源推荐",
    "student/tasks": "课程、考试与活动提醒统一聚合",
    "student/research": "文献、方向、项目与科研工具入口",
    "teacher/home": "我教的课、备课工具与教师发展",
    "teacher/analytics": "课程运行、学习参与与质量预警",
    "teacher/research": "项目、团队、成果与科研资源",
    "admin/home": "用户、课程、资源与服务运行状态",
    "admin/integration": "教务、课程、专业、教发和考试协同",
    "admin/assessment": "执医、课程、技能与 OSCE 管理",
    "admin/data": "画像、达成度与质量报告",
    "admin/resources": "课程、题库、知识库与智能体治理",
  };
  const items = (navGroups[role] || navGroups.student).flatMap((group) => group.links);

  return `
    <div class="role-menu-backdrop" data-role-menu ${hidden ? "hidden" : ""}>
      <section class="role-menu-window" role="dialog" aria-modal="true" aria-labelledby="role-menu-title">
        <div class="role-menu-window__top">
          <div class="role-menu-window__identity">
            <span>${icon(roleIcon)}</span>
            <div><strong>${roleName}端</strong><small>已进入未来学习中心</small></div>
          </div>
          <button class="onboarding-close" type="button" data-action="close-role-menu" aria-label="关闭">${icon("x")}</button>
        </div>
        <div class="role-menu-window__hero">
          <h2 id="role-menu-title">选择要前往的页面</h2>
          <p>导航小窗悬浮在画面上方，选择后可直接进入对应功能。之后可通过左侧图标导航随时切换。</p>
        </div>
        <div class="role-menu-grid">
          ${items.map(([path, iconName, label]) => `
            <a class="role-menu-card" href="#/${path}" data-action="close-role-menu">
              <span class="role-menu-card__icon">${icon(iconName)}</span>
              <span><strong>${label}</strong><small>${descriptions[path] || "进入功能页面"}</small></span>
              ${icon("arrow-up-right")}
            </a>
          `).join("")}
        </div>
        <div class="role-menu-window__footer">
          <a class="btn" href="#/" data-action="close-role-menu">${icon("undo-2")}返回门户</a>
          <button class="btn btn--primary" type="button" data-action="close-role-menu">${icon("check")}先进入当前首页</button>
        </div>
      </section>
    </div>
  `;
}

function renderShell(route) {
  const meta = routeMeta[route];
  const role = route.startsWith("student") ? "student" : route.startsWith("teacher") ? "teacher" : route.startsWith("admin") ? "admin" : "student";
  const groups = navGroups[role] || navGroups.student;
  const roleName = { student: "学生", teacher: "教师", admin: "管理者" }[role];
  const rolePill = { student: "我学的课", teacher: "我教的课", admin: "管理工作台" }[role];
  const navItems = groups.flatMap((group) => group.links);
  const nav = navItems.map(([path, iconName, label]) => `
    <a class="floating-nav__item ${route === path ? "active" : ""}" href="#/${path}">
      ${icon(iconName)}<span>${navShortLabels[path] || label}</span>
    </a>
  `).join("");

  return `
    <div class="app-shell">
      <main class="workspace">
        <header class="topbar">
          <div class="topbar__left">
            <div class="topbar__title">
              <h1>${meta.title}</h1>
              <p>${meta.section} / ${meta.desc}</p>
            </div>
            <span class="topbar__pill">${rolePill}</span>
          </div>
          <div class="topbar__actions">
            <label class="global-search">
              <span class="sr-only">全局搜索</span>
              ${icon("search")}
              <input id="global-search-input" type="search" placeholder="搜索课程、知识点、题目或资源">
            </label>
            <a class="icon-button" href="#/gallery" aria-label="全部页面">${icon("layout-grid")}</a>
            <button class="icon-button" type="button" data-action="open-onboarding" aria-label="查看新手引导">${icon("sparkles")}</button>
            <button class="user-chip" type="button" data-action="profile">
              <span class="user-chip__avatar">${roleName.slice(0, 1)}</span>
              <span>${roleName}账号</span>
            </button>
          </div>
        </header>
        <div class="page">${renderPage(route)}</div>
      </main>

      <nav class="floating-nav" aria-label="${roleName}端一级导航">
        ${nav}
      </nav>
      ${renderRoleMenu(role)}
      ${renderOnboarding(role)}
    </div>
  `;
}

function renderPage(route) {
  const pages = {
    "student/home": studentHome,
    "student/knowledge": studentKnowledge,
    "student/exam": studentExam,
    "student/tasks": studentTasks,
    "student/research": studentResearch,
    "teacher/home": teacherHome,
    "teacher/prepare": teacherPrepare,
    "teacher/tools": teacherTools,
    "teacher/growth": teacherGrowth,
    "teacher/analytics": teacherAnalytics,
    "teacher/research": teacherResearch,
    "admin/home": adminHome,
    "admin/integration": adminIntegration,
    "admin/assessment": adminAssessment,
    "admin/data": adminData,
    "admin/resources": adminResources,
  };
  return `${pageHead(route)}${pages[route] ? pages[route]() : `<div class="surface"><div class="empty-state"><div class="empty-state__icon">${icon("map")}</div><h3>页面正在建设中</h3><p>该页面尚未配置原型内容。</p></div></div>`}`;
}

function studentHome() {
  return `
    <div class="stat-grid">
      ${stat("本周学习时长", "12.6", "较上周增加 1.8 小时", "clock-3", "小时")}
      ${stat("执医能力达成", "68", "薄弱模块 4 个", "badge-check", "%")}
      ${stat("本周学习任务", "7", "其中 2 项今日截止", "list-checks", "项")}
      ${stat("待完成任务", "7", "其中 2 项今日截止", "list-checks", "项")}
    </div>

    <div class="dashboard-grid">
      <div class="stack">
        ${surface("今日学习", `
          <div class="task-list">
            ${taskRow("book-open-check", "内科学：心力衰竭诊疗路径", "线上课程 · 预计 42 分钟", "进行中", "tag--primary")}
            ${taskRow("file-check-2", "内科学循环系统作业", "线上作业 · 今日 23:59 截止", "今日截止", "tag--accent")}
            ${taskRow("badge-check", "执医专项训练：心电图判读", "25 题 · 预计 30 分钟", "待开始", "tag--amber")}
          </div>
        `, "已按优先级自动排序", `<a class="text-link" href="#/student/tasks">全部任务 ${icon("arrow-right")}</a>`)}

        ${surface("我的课程", `
          <div class="course-list">
            ${courseRow("heart-pulse", "内科学", "第 12 周 · 循环系统疾病", 76)}
            ${courseRow("scan-heart", "医学影像学", "第 11 周 · 胸部影像诊断", 63)}
            ${courseRow("activity", "诊断学", "第 13 周 · 检体诊断", 88)}
          </div>
        `, "", `<a class="text-link" href="#/student/knowledge">知识中心 ${icon("arrow-right")}</a>`)}
      </div>

      <div class="stack">
        ${surface("考证进度", `
          <div class="stack">
            ${progressRow("基础医学", 82)}
            ${progressRow("临床医学", 71, "progress--accent")}
            ${progressRow("预防医学", 57, "progress--amber")}
            ${progressRow("医学人文", 74)}
          </div>
        `, "岗位能力图谱实时计算")}

        ${surface("学习提醒", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>内科学阶段测评</h4><p>11 月 18 日 19:00 · 线上考试</p></div><span class="tag tag--amber">3 天后</span></div>
            <div class="alert-row"><div><h4>技能中心开放预约</h4><p>心肺听诊训练 · 剩余 12 个名额</p></div><span class="tag tag--primary">可预约</span></div>
            <div class="alert-row"><div><h4>课程资源已更新</h4><p>内科学 · 循环系统疾病新增 3 个知识点</p></div><span class="tag tag--primary">已更新</span></div>
          </div>
        `)}
      </div>
    </div>
  `;
}

function courseRow(iconName, title, desc, value) {
  return `
    <div class="course-row" style="grid-template-columns:36px minmax(0,1fr) 150px">
      <div class="course-row__icon">${icon(iconName)}</div>
      <div><h4>${title}</h4><p>${desc}</p></div>
      <div><div class="progress"><span style="width:${value}%"></span></div><p>已完成 ${value}%</p></div>
    </div>
  `;
}

function studentKnowledge() {
  const groups = [
    ["01", "结构与功能基础群", "人体解剖、组织胚胎、生理、生化", "31 门课程", "12 个知识图谱"],
    ["02", "疾病机制与病原学群", "病理、病理生理、微生物、免疫", "24 门课程", "9 个知识图谱"],
    ["03", "临床诊断与技术群", "诊断学、影像、检验、超声", "28 门课程", "14 个知识图谱"],
    ["04", "内科系统疾病群", "心血管、呼吸、消化、内分泌", "34 门课程", "18 个知识图谱"],
    ["05", "外科与运动系统群", "外科学、骨科学、麻醉、康复", "22 门课程", "7 个知识图谱"],
    ["06", "妇儿与专科疾病群", "妇产、儿科、口腔、眼耳鼻喉", "26 门课程", "11 个知识图谱"],
  ];
  return `
    <div class="course-groups" style="margin-bottom:16px">
      ${groups.map(([no, title, desc, c1, c2], index) => `
        <button class="course-group ${index === 3 ? "active" : ""}" type="button" data-action="select-course-group">
          <div class="course-group__number">课程群 ${no}</div>
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="course-group__footer"><span>${c1}</span><span>${c2}</span></div>
        </button>
      `).join("")}
    </div>

    <div class="split-layout">
      <section class="surface">
        <div class="surface__head"><div><h3>内科系统疾病群</h3><p>课程与知识点层级</p></div></div>
        <div class="tree">
          <div class="tree-item active">${icon("folder-open")}内科学</div>
          <div class="tree-item tree-item--sub">${icon("book-open")}循环系统疾病</div>
          <div class="tree-item tree-item--sub">${icon("book-open")}呼吸系统疾病</div>
          <div class="tree-item tree-item--sub">${icon("book-open")}消化系统疾病</div>
          <div class="tree-item">${icon("folder")}诊断学</div>
          <div class="tree-item">${icon("folder")}医学影像学</div>
          <div class="tree-item">${icon("folder")}临床技能学</div>
        </div>
      </section>

      <section class="surface knowledge-detail">
        <div class="knowledge-hero">
          <div>
            <span class="tag tag--primary">智慧课程</span>
            <h2>内科学 · 循环系统疾病</h2>
            <p>从基础机制、临床表现、辅助检查到诊断治疗形成完整知识路径，并关联执医能力点与测评题目。</p>
          </div>
          <div class="knowledge-meta">
            <div><span>课程负责人</span><strong>李利华</strong></div>
            <div><span>学习进度</span><strong>76%</strong></div>
            <div><span>关联能力点</span><strong>28 个</strong></div>
            <div><span>关联题目</span><strong>1,246 道</strong></div>
          </div>
        </div>
        <div class="chapter-list">
          <div class="chapter-row">
            <span class="chapter-row__index">01</span>
            <div><h4>心力衰竭的病因与分类</h4><p>知识点 8 个 · 视频 4 段 · 执医题目 82 道</p></div>
            <span class="tag tag--success">已完成</span>
          </div>
          <div class="chapter-row">
            <span class="chapter-row__index">02</span>
            <div><h4>心力衰竭的临床表现与评估</h4><p>知识点 11 个 · 病例 3 个 · 执医题目 116 道</p></div>
            <span class="tag tag--primary">进行中</span>
          </div>
          <div class="chapter-row">
            <span class="chapter-row__index">03</span>
            <div><h4>心力衰竭的治疗与管理</h4><p>知识点 13 个 · 虚拟仿真 2 个 · 执医题目 154 道</p></div>
            <span class="tag">未开始</span>
          </div>
          <div class="chapter-row">
            <span class="chapter-row__index">04</span>
            <div><h4>常见心律失常</h4><p>知识点 16 个 · 心电图训练 24 组 · 执医题目 188 道</p></div>
            <span class="tag">未开始</span>
          </div>
        </div>
      </section>
    </div>
  `;
}

function studentExam() {
  const weaknesses = [
    {
      id: "ddx",
      title: "临床思维 · 鉴别诊断",
      reason: "病例分析题正确率偏低",
      score: 58,
      courses: ["内科学 · 循环系统疾病", "诊断学 · 常见症状鉴别", "病理生理学 · 心功能不全"],
      points: ["胸痛鉴别诊断路径", "急性左心衰与 COPD 鉴别", "心绞痛与急性心梗鉴别"],
      journals: ["中华心血管病杂志", "中国实用内科杂志", "临床指南与专家共识"],
      questions: ["关联错题 36 道", "同类强化题 80 道", "模拟病例 12 个"],
      path: ["补知识点", "复习课程", "精读期刊", "题库训练", "阶段回测"],
    },
    {
      id: "decision",
      title: "临床思维 · 处置决策",
      reason: "处置顺序与紧急程度判断不稳定",
      score: 62,
      courses: ["内科学 · 心力衰竭", "急诊医学 · 急危重症处置", "临床药理学 · 心血管用药"],
      points: ["急性心衰初始处置", "容量状态评估", "抗凝与出血风险评估"],
      journals: ["中华急诊医学杂志", "中国循环杂志", "心血管急症专家共识"],
      questions: ["关联错题 28 道", "处置决策题 64 道", "病例推演 9 个"],
      path: ["识别危险信号", "复习处置流程", "病例推演", "专项做题", "复核决策"],
    },
    {
      id: "cardio",
      title: "医学知识 · 心血管系统",
      reason: "知识掌握不稳定，迁移应用不足",
      score: 69,
      courses: ["内科学 · 循环系统疾病", "生理学 · 循环生理", "病理生理学 · 心血管病理"],
      points: ["心衰病理生理机制", "冠状动脉循环", "心功能分级与评估"],
      journals: ["中华心血管病杂志", "中国动脉硬化杂志", "临床心血管病杂志"],
      questions: ["关联错题 42 道", "知识辨析题 96 道", "图谱练习 18 组"],
      path: ["补齐机制", "串联课程", "知识图谱", "题目验证", "形成总结"],
    },
    {
      id: "ecg",
      title: "临床技能 · 心电图判读",
      reason: "复杂心律识别正确率偏低",
      score: 72,
      courses: ["诊断学 · 心电图", "内科学 · 心律失常", "临床技能学 · 心肺评估"],
      points: ["心房颤动识别", "室性心动过速识别", "房室传导阻滞分型"],
      journals: ["中华心律失常学杂志", "临床心电学杂志", "心电图教学案例集"],
      questions: ["关联错题 24 道", "图谱判读题 72 道", "动态心电图 16 组"],
      path: ["基础波形", "典型图例", "疑难图例", "限时判读", "错题复测"],
    },
  ];

  const chipList = (items, iconName) => items.map((item) => `<span class="resource-chip">${icon(iconName)}${item}</span>`).join("");
  const recommendationPanels = weaknesses.map((item, index) => `
    <div class="recommendation-panel" data-recommendation="${item.id}" ${index === 0 ? "" : "hidden"}>
      <div class="relation-panel__head">
        <div>
          <span class="tag tag--accent">当前薄弱能力</span>
          <h3>${item.title}</h3>
          <p>${item.reason}。系统已按“能力 - 课程 - 知识点 - 资源”生成推荐路径。</p>
        </div>
        <button class="btn btn--primary" type="button" data-action="start-weakness-plan">${icon("route")}加入学习计划</button>
      </div>

      <div class="relation-chain">
        <div class="relation-node">
          <span>薄弱能力</span>
          <strong>${item.title.split(" · ")[1]}</strong>
          <small>当前掌握度 ${item.score}%</small>
        </div>
        <span class="relation-arrow">${icon("arrow-right")}</span>
        <div class="relation-node">
          <span>对应课程</span>
          <strong>${item.courses.length} 门课程</strong>
          <small>${item.courses[0]}</small>
        </div>
        <span class="relation-arrow">${icon("arrow-right")}</span>
        <div class="relation-node">
          <span>关键知识点</span>
          <strong>${item.points.length} 个知识点</strong>
          <small>${item.points[0]}</small>
        </div>
        <span class="relation-arrow">${icon("arrow-right")}</span>
        <div class="relation-node">
          <span>推荐资源</span>
          <strong>${item.questions.length + 2} 项资源</strong>
          <small>课程 / 期刊 / 知识点 / 题库</small>
        </div>
      </div>

      <div class="recommendation-grid">
        <div class="recommendation-block">
          <div class="recommendation-block__title">${icon("book-open")}对应课程</div>
          <div class="resource-chip-list">${chipList(item.courses, "play-circle")}</div>
        </div>
        <div class="recommendation-block">
          <div class="recommendation-block__title">${icon("network")}关键知识点</div>
          <div class="resource-chip-list">${chipList(item.points, "circle-dot")}</div>
        </div>
        <div class="recommendation-block">
          <div class="recommendation-block__title">${icon("newspaper")}期刊与指南</div>
          <div class="resource-chip-list">${chipList(item.journals, "file-text")}</div>
        </div>
        <div class="recommendation-block">
          <div class="recommendation-block__title">${icon("badge-check")}题库与病例</div>
          <div class="resource-chip-list">${chipList(item.questions, "circle-check-big")}</div>
        </div>
      </div>

      <div class="learning-sequence">
        ${item.path.map((step, stepIndex) => `<div class="learning-step"><span>STEP ${stepIndex + 1}</span><strong>${step}</strong></div>`).join("")}
      </div>
    </div>
  `).join("");

  return `
    <div class="stat-grid">
      ${stat("能力达成度", "68", "临床思维是当前主要短板", "target", "%")}
      ${stat("模拟考试", "426", "最近一次提高 18 分", "file-check-2", "分")}
      ${stat("累计做题", "2,836", "正确率 74%", "circle-check-big", "题")}
      ${stat("待强化知识点", "17", "优先推送 5 个", "list-filter", "个")}
    </div>

    <section class="surface" style="margin-bottom:16px">
      <div class="surface__head">
        <div><h3>薄弱能力与学习资源关联</h3><p>点击左侧薄弱能力，查看对应课程、知识点和学习资源</p></div>
        <span class="tag tag--primary">最近更新：今天 09:30</span>
      </div>
      <div class="weakness-layout">
        <div class="weakness-list">
          ${weaknesses.map((item, index) => `
            <button class="weakness-button ${index === 0 ? "active" : ""}" type="button" data-action="select-weakness" data-weakness="${item.id}">
              <span><h4>${item.title}</h4><p>${item.reason}</p></span>
              <span class="weakness-score"><strong>${item.score}</strong><span>掌握度</span></span>
            </button>
          `).join("")}
        </div>
        <div>
          ${recommendationPanels}
        </div>
      </div>
    </section>

    <section class="surface" style="margin-bottom:16px">
      <div class="surface__head">
        <div><h3>能力、课程与知识点对应关系</h3><p>完整展示每个能力点从课程学习到资源推荐的映射</p></div>
        <button class="btn btn--soft" type="button" data-action="export-relation">${icon("download")}导出对应表</button>
      </div>
      <div class="surface__body table-scroll">
        <table class="resource-table relation-table">
          <thead>
            <tr><th>岗位能力</th><th>对应课程</th><th>关键知识点</th><th>推荐资源</th><th>当前掌握度</th></tr>
          </thead>
          <tbody>
            ${weaknesses.map((item) => `
              <tr>
                <td><strong>${item.title}</strong></td>
                <td><div class="tag-list">${item.courses.map((value) => `<span class="tag">${value}</span>`).join("")}</div></td>
                <td><div class="tag-list">${item.points.map((value) => `<span class="tag tag--primary">${value}</span>`).join("")}</div></td>
                <td><div class="tag-list"><span class="tag tag--success">课程</span><span class="tag tag--amber">期刊</span><span class="tag tag--primary">知识点</span><span class="tag tag--accent">题库</span></div></td>
                <td><div class="progress"><span style="width:${item.score}%"></span></div><p style="margin:5px 0 0;color:var(--muted);font-size:9px">${item.score}%</p></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <div class="dashboard-grid dashboard-grid--equal">
      ${surface("岗位能力画像", `
        <div class="radar-wrap" style="min-height:300px">
          <svg class="radar" viewBox="0 0 360 300" role="img" aria-label="五维岗位能力雷达图">
            <polygon class="radar__grid" points="180,28 308,122 259,274 101,274 52,122"></polygon>
            <polygon class="radar__grid" points="180,65 276,135 240,246 120,246 84,135"></polygon>
            <polygon class="radar__grid" points="180,102 244,149 220,219 140,219 116,149"></polygon>
            <line class="radar__axis" x1="180" y1="150" x2="180" y2="28"></line>
            <line class="radar__axis" x1="180" y1="150" x2="308" y2="122"></line>
            <line class="radar__axis" x1="180" y1="150" x2="259" y2="274"></line>
            <line class="radar__axis" x1="180" y1="150" x2="101" y2="274"></line>
            <line class="radar__axis" x1="180" y1="150" x2="52" y2="122"></line>
            <polygon class="radar__shape" points="180,56 268,137 222,230 126,242 91,132"></polygon>
            <text class="radar__label" x="180" y="16" text-anchor="middle">医学知识 82</text>
            <text class="radar__label" x="325" y="126" text-anchor="end">临床技能 71</text>
            <text class="radar__label" x="272" y="292" text-anchor="middle">临床思维 58</text>
            <text class="radar__label" x="88" y="292" text-anchor="middle">沟通协作 66</text>
            <text class="radar__label" x="35" y="126" text-anchor="start">职业发展 73</text>
          </svg>
        </div>
      `, "依据课程学习、题目训练和阶段测评动态计算")}

      ${surface("思维阶梯训练", `
        <div class="question-card" style="padding:0">
          <div class="question-card__type"><span>心电图判读 · 中等难度</span><span>第 3 / 5 题</span></div>
          <h3>患者突发心悸，心电图提示不规则窄 QRS 波，最可能的诊断是？</h3>
          <div class="option-list">
            <button class="option" type="button" data-action="select-option"><span class="option__letter">A</span>窦性心动过速</button>
            <button class="option" type="button" data-action="select-option"><span class="option__letter">B</span>心房颤动</button>
            <button class="option" type="button" data-action="select-option"><span class="option__letter">C</span>室性心动过速</button>
            <button class="option" type="button" data-action="select-option"><span class="option__letter">D</span>二度房室传导阻滞</button>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px">
            <span style="color:var(--muted);font-size:10px">答错后自动推送对应课程、知识点和期刊</span>
            ${button("提交答案", "send", "primary", "", "submit-answer")}
          </div>
        </div>
      `, "从错题反向追溯能力、课程与知识资源")}
    </div>
  `;
}

function studentTasks() {
  return `
    <div class="filter-bar">
      <button class="filter-chip active" type="button" data-action="filter-chip">全部 5</button>
      <button class="filter-chip" type="button" data-action="filter-chip">课程任务 2</button>
      <button class="filter-chip" type="button" data-action="filter-chip">考试测评 1</button>
      <button class="filter-chip" type="button" data-action="filter-chip">活动提醒 1</button>
    </div>

    <div class="dashboard-grid dashboard-grid--wide-left">
      <section class="surface">
        <div class="surface__head">
          <div><h3>我的任务</h3><p>所有课程、考试与活动统一聚合</p></div>
          <span class="tag tag--accent">2 项今日截止</span>
        </div>
        <div class="surface__body">
          <div class="task-list">
            ${taskRow("book-open-check", "内科学循环系统作业", "教师：李老师 · 今日 23:59 截止", "今日截止", "tag--accent")}
            ${taskRow("badge-check", "执医专项训练：心电图判读", "25 题 · 建议用时 30 分钟", "待开始", "tag--amber")}
            ${taskRow("video", "观看临床技能演示：心肺听诊", "课程资源 · 11月16日截止", "未开始", "")}
            ${taskRow("clipboard-list", "内科学阶段测评", "11月18日 19:00 · 线上考试", "3 天后", "tag--primary")}
            ${taskRow("calendar-check", "参加教学查房", "11月19日 08:00 · 心内科一病区", "已确认", "tag--success")}
          </div>
        </div>
      </section>

      <div class="stack">
        ${surface("任务负载", `
          <div class="stack">
            ${progressRow("本周任务量", 72, "progress--amber")}
            ${progressRow("本周已完成", 43)}
            ${progressRow("重复提醒", 8)}
          </div>
          <p style="margin:14px 0 0;color:var(--muted);font-size:10px">系统已合并 3 条重复提醒，避免同一课程重复下发。</p>
        `)}
        ${surface("消息中心", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>课程提醒</h4><p>内科学第 12 周课程已更新</p></div><span class="tag tag--primary">课程</span></div>
            <div class="alert-row"><div><h4>考试提醒</h4><p>阶段测评将于 3 天后开始</p></div><span class="tag tag--amber">考试</span></div>
            <div class="alert-row"><div><h4>线下提醒</h4><p>明日 08:00 心内科一病区教学查房</p></div><span class="tag tag--success">活动</span></div>
          </div>
        `)}
      </div>
    </div>
  `;
}

function studentResearch() {
  const cards = [
    ["library-big", "文献检索", "聚合医学期刊、指南、循证数据库与校内外文献入口。"],
    ["compass", "研究方向", "按临床问题、区域疾病与学科方向浏览研究主题。"],
    ["folder-kanban", "科研项目", "查看在研项目、招募任务、阶段成果与团队协作信息。"],
    ["users-round", "导师 / 团队", "按学院、方向与成果寻找导师和科研团队。"],
    ["wrench", "科研工具", "统计分析、文献管理、数据可视化与伦理申请。"],
    ["scale", "医学伦理", "伦理审查流程、模板、培训与常见问题。"],
    ["chart-no-axes-combined", "数据分析", "从数据清洗、统计分析到结果解释。"],
    ["file-pen-line", "成果表达", "论文写作、海报制作、汇报与成果归档。"],
  ];
  return `
    <div class="search-band">
      <label class="search-band__input">
        ${icon("search")}
        <input type="search" placeholder="输入医学研究问题、疾病名称、研究方向或导师姓名">
      </label>
      ${button("开始探索", "arrow-right", "primary", "", "start-research")}
    </div>
    <div class="filter-bar" style="margin-top:14px">
      <button class="filter-chip active" type="button" data-action="filter-chip">探索</button>
      <button class="filter-chip" type="button" data-action="filter-chip">研究任务</button>
      <button class="filter-chip" type="button" data-action="filter-chip">Deep Research</button>
      <button class="filter-chip" type="button" data-action="filter-chip">更多模式</button>
    </div>

    <div class="research-grid">
      ${cards.map(([iconName, title, desc]) => `
        <button class="research-card" type="button" data-action="research-card">
          <span class="research-card__icon">${icon(iconName)}</span>
          <h3>${title}</h3>
          <p>${desc}</p>
        </button>
      `).join("")}
    </div>

    <div class="dashboard-grid dashboard-grid--equal" style="margin-top:16px">
      ${surface("科研探索路径", `
        <div class="timeline">
          <div class="timeline-item"><h4>提出问题</h4><p>明确临床问题与研究对象</p></div>
          <div class="timeline-item"><h4>检索证据</h4><p>文献、指南与数据库综合检索</p></div>
          <div class="timeline-item timeline-item--muted"><h4>方案设计</h4><p>研究设计、伦理与样本估算</p></div>
          <div class="timeline-item timeline-item--muted"><h4>分析解释</h4><p>数据处理与结果解释</p></div>
          <div class="timeline-item timeline-item--muted"><h4>成果转化</h4><p>论文、汇报、项目与临床应用</p></div>
        </div>
      `)}
      ${surface("最近浏览", `
        <div class="resource-list">
          <div class="resource-row"><div class="resource-row__icon">${icon("file-text")}</div><div><h4>高原地区高血压管理研究进展</h4><p>文献 · 中华高血压杂志</p></div><span class="tag">收藏</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("folder-open")}</div><div><h4>边境地区传染病监测研究团队</h4><p>导师 / 团队 · 公共卫生学院</p></div><span class="tag tag--primary">关注</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("book-marked")}</div><div><h4>医学研究伦理审查申请指南</h4><p>科研工具 · 校内制度</p></div><span class="tag">已读</span></div>
        </div>
      `)}
    </div>
  `;
}

function teacherHome() {
  return `
    <div class="stat-grid">
      ${stat("本学期课程", "4", "其中 2 门正在运行", "book-open")}
      ${stat("所带班级", "7", "学生 326 人", "users-round")}
      ${stat("待处理任务", "12", "含 5 项作业批改", "clipboard-check")}
      ${stat("课程活跃度", "81", "高于学院均值 6 个百分点", "trending-up", "%")}
    </div>

    <div class="dashboard-grid">
      <div class="stack">
        <section class="surface">
          <div class="surface__head">
            <div><h3>我教的课</h3><p>按教学运行状态组织</p></div>
            <a class="text-link" href="#/teacher/analytics">学情分析 ${icon("arrow-right")}</a>
          </div>
          <div class="surface__body class-panel">
            ${classCard("heart-pulse", "内科学", "临床医学 2023 级 1-2 班", "第 12 周", 86)}
            ${classCard("scan-heart", "医学影像学", "临床医学 2023 级 3-4 班", "第 11 周", 78)}
            ${classCard("activity", "诊断学", "临床医学 2024 级 1-3 班", "第 13 周", 91)}
          </div>
        </section>

        ${surface("待处理教学任务", `
          <div class="task-list">
            ${taskRow("file-check-2", "内科学循环系统作业", "86 份待批改 · 11月16日截止", "待批改", "tag--amber")}
            ${taskRow("clipboard-list", "影像学阶段测验", "已完成 205 人 · 待发布成绩", "待发布", "tag--primary")}
            ${taskRow("archive", "课程资源更新", "内科学 3 个知识点资源待补充", "课程建设", "tag--accent")}
            ${taskRow("message-square-text", "课程讨论区待回复", "7 条学生提问", "互动", "")}
          </div>
        `)}
      </div>

      <div class="stack">
        ${surface("学情预警", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>12 名学生连续两周未登录</h4><p>内科学 · 临床医学 2023 级</p></div><span class="tag tag--accent">需关注</span></div>
            <div class="alert-row"><div><h4>循环系统作业正确率偏低</h4><p>班级平均正确率 62%</p></div><span class="tag tag--amber">教学建议</span></div>
            <div class="alert-row"><div><h4>3 门课程资源连续 14 天未更新</h4><p>建议进入课程运营处理</p></div><span class="tag">已提醒</span></div>
          </div>
        `)}
        ${surface("快捷入口", `
          <div class="stack">
            <a class="role-entry" style="min-height:78px;grid-template-columns:38px 1fr auto" href="#/teacher/prepare">
              <span class="role-entry__icon" style="width:38px;height:38px">${icon("sparkles")}</span>
              <span><h3 style="font-size:13px">开始智慧备课</h3><p>生成课堂结构与教学资源</p></span>
              ${icon("chevron-right")}
            </a>
            <a class="role-entry" style="min-height:78px;grid-template-columns:38px 1fr auto" href="#/teacher/tools">
              <span class="role-entry__icon" style="width:38px;height:38px">${icon("presentation")}</span>
              <span><h3 style="font-size:13px">进入课堂工具</h3><p>签到、互动、随堂测与反馈</p></span>
              ${icon("chevron-right")}
            </a>
            <a class="role-entry" style="min-height:78px;grid-template-columns:38px 1fr auto" href="#/teacher/growth">
              <span class="role-entry__icon" style="width:38px;height:38px">${icon("graduation-cap")}</span>
              <span><h3 style="font-size:13px">课程建设与教师发展</h3><p>课程运营、培训评选与成果档案</p></span>
              ${icon("chevron-right")}
            </a>
          </div>
        `)}
      </div>
    </div>
  `;
}

function classCard(iconName, title, desc, week, active) {
  return `
    <article class="class-card">
      <div class="class-card__top">
        <span class="class-card__cover">${icon(iconName)}</span>
        <span class="tag tag--success">运行中</span>
      </div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="class-card__meta"><span>${week}</span><span>活跃度 ${active}%</span></div>
      <div class="progress" style="margin-top:10px"><span style="width:${active}%"></span></div>
    </article>
  `;
}

function teacherPrepare() {
  return `
    <div class="prep-layout">
      <section class="surface">
        <div class="surface__head"><div><h3>教学需求</h3><p>优先复用已有课程与知识图谱</p></div></div>
        <div class="surface__body">
          <div class="form-grid">
            <div class="field">
              <label for="course-topic">课程主题</label>
              <input id="course-topic" value="心力衰竭的临床表现与治疗">
            </div>
            <div class="field">
              <label for="course-target">授课对象</label>
              <select id="course-target">
                <option>临床医学 2023 级本科生</option>
                <option>护理学 2023 级本科生</option>
                <option>临床医学专业留学生</option>
              </select>
            </div>
            <div class="field">
              <label for="course-goal">教学目标</label>
              <textarea id="course-goal">掌握心力衰竭的临床分型、评估方法与基本治疗原则，能够完成典型病例的初步判断。</textarea>
            </div>
            <div class="field">
              <label for="course-hours">建议学时</label>
              <select id="course-hours">
                <option>2 学时</option>
                <option>3 学时</option>
                <option>4 学时</option>
              </select>
            </div>
            <div class="field">
              <label for="course-style">教学范式</label>
              <select id="course-style">
                <option>混合式教学</option>
                <option>案例驱动教学</option>
                <option>项目式教学</option>
              </select>
            </div>
            <button class="btn btn--primary btn-block" type="button" data-action="generate-design">${icon("sparkles")}生成教学设计</button>
          </div>
        </div>
      </section>

      <section class="surface">
        <div class="result-document">
          <div class="result-document__head">
            <div><span class="tag tag--primary">AI 生成草案</span><h2>心力衰竭的临床表现与治疗</h2><p>临床医学 2023 级本科生 · 2 学时 · 混合式教学</p></div>
            <div>${button("复制", "copy", "soft")}</div>
          </div>

          <div class="document-section">
            <h3>一、课堂结构建议</h3>
            <ul>
              <li>课前 15 分钟：观看“心力衰竭分型与代偿机制”微课，完成 5 道诊断前测。</li>
              <li>课中 55 分钟：从典型病例切入，完成病史、体征、辅助检查与初步处置的病例推演。</li>
              <li>课中 20 分钟：分组讨论治疗策略，结合指南解释药物选择与监测要点。</li>
              <li>课后 10 分钟：发布思维阶梯练习，推送错题关联知识点与同类病例。</li>
            </ul>
          </div>

          <div class="document-section">
            <h3>二、重点与难点</h3>
            <p><strong>重点：</strong>心力衰竭的临床分型、NYHA 心功能分级、基础治疗药物与监测指标。</p>
            <p><strong>难点：</strong>从症状和体征推导血流动力学状态，并形成可解释的处置决策。</p>
          </div>

          <div class="document-section">
            <h3>三、课堂互动</h3>
            <p>使用“病例决策到站式”活动：学生依次完成临床表现判断、检查选择、治疗策略和随访计划，系统自动汇总每个决策点的高频错误。</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function teacherTools() {
  const tabs = [
    ["vote", "课堂投票", true],
    ["circle-help", "随机提问", false],
    ["timer", "课堂计时", false],
    ["clipboard-pen-line", "随堂测", false],
    ["bar-chart-3", "即时结果", false],
  ];
  return `
    <div class="tool-tabs">
      ${tabs.map(([iconName, label, active]) => `<button class="tool-tab ${active ? "active" : ""}" type="button" data-action="tool-tab">${icon(iconName)}${label}</button>`).join("")}
    </div>
    <div class="tool-stage">
      <div class="poll-card">
        <div class="poll-card__number">课堂投票 · 第 2 题</div>
        <h2>患者出现端坐呼吸、双肺湿啰音和颈静脉怒张，下一步最优先的处理是？</h2>
        <div class="poll-options">
          <button class="poll-option" type="button" data-action="select-poll"><span>A</span>立即补液</button>
          <button class="poll-option selected" type="button" data-action="select-poll"><span>B</span>取坐位并给予吸氧</button>
          <button class="poll-option" type="button" data-action="select-poll"><span>C</span>等待心脏超声结果</button>
          <button class="poll-option" type="button" data-action="select-poll"><span>D</span>口服降压药后观察</button>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-top:22px">
          <span style="color:var(--muted);font-size:10px">已提交 76 / 82 人</span>
          <button class="btn btn--primary" type="button" data-action="publish-poll">${icon("send")}发布结果</button>
        </div>
      </div>
    </div>
    <div class="dashboard-grid dashboard-grid--equal" style="margin-top:16px">
      ${surface("课堂参与", `
        <div class="stack">
          ${progressRow("已签到", 94)}
          ${progressRow("参与互动", 86)}
          ${progressRow("题目提交", 93)}
          ${progressRow("讨论区发言", 48, "progress--amber")}
        </div>
      `)}
      ${surface("即时反馈", `
        <div class="alert-list">
          <div class="alert-row"><div><h4>选项 B 正确率 68%</h4><p>多数学生能识别急性左心衰竭的初步处理</p></div><span class="tag tag--success">已掌握</span></div>
          <div class="alert-row"><div><h4>选项 C 干扰明显</h4><p>14 名学生选择等待检查，需解释“先稳定后诊断”</p></div><span class="tag tag--accent">重点讲解</span></div>
        </div>
      `)}
    </div>
  `;
}

function teacherGrowth() {
  return `
    <section class="surface" style="margin-bottom:16px">
      <div class="growth-hero">
        <div class="teacher-avatar">
          <div class="teacher-avatar__image">李</div>
          <h2>李利华</h2>
          <p>临床医学院 · 副教授</p>
          <span class="tag tag--primary">内科学课程负责人</span>
        </div>
        <div>
          <h3 style="margin:0;font-size:18px">教师发展档案</h3>
          <p style="margin:8px 0 0;color:var(--muted);font-size:11px;line-height:1.8">以课程建设、教学实施、学生反馈、资源贡献和教师培训形成可追溯的教师发展记录。</p>
          <div class="growth-stat">
            <div><strong>4</strong><span>在建课程</span></div>
            <div><strong>86</strong><span>课程活跃度</span></div>
            <div><strong>2</strong><span>教学成果奖</span></div>
          </div>
        </div>
        <div class="stack">
          ${button("生成教师画像", "user-round-search", "primary", "", "teacher-profile")}
          ${button("导出个人档案", "download", "soft")}
        </div>
      </div>
    </section>

    <div class="dashboard-grid dashboard-grid--equal">
      ${surface("课程建设进展", `
        <div class="stack">
          ${progressRow("内科学智慧课程", 86)}
          ${progressRow("医学影像学知识图谱", 72, "progress--accent")}
          ${progressRow("临床技能数字资源", 64, "progress--amber")}
          ${progressRow("课程思政案例库", 78)}
        </div>
      `, "课程运行状态与资源完成度")}
      ${surface("教师发展路径", `
        <div class="timeline">
          <div class="timeline-item"><h4>教学认知</h4><p>完成医学课程思政专题培训</p></div>
          <div class="timeline-item"><h4>课程设计</h4><p>主持内科学混合式课程建设</p></div>
          <div class="timeline-item"><h4>教学实施</h4><p>课程活跃度连续两学期高于学院均值</p></div>
          <div class="timeline-item timeline-item--muted"><h4>评价反馈</h4><p>形成课程质量报告与改进计划</p></div>
          <div class="timeline-item timeline-item--muted"><h4>课程改进</h4><p>重点优化循环系统病例推演</p></div>
        </div>
      `)}
    </div>

    <div class="dashboard-grid dashboard-grid--equal" style="margin-top:16px">
      ${surface("培训与评选", `
        <div class="resource-list">
          <div class="resource-row"><div class="resource-row__icon">${icon("award")}</div><div><h4>2026 年校级教学创新比赛</h4><p>报名截止：11月30日</p></div><span class="tag tag--primary">可报名</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("graduation-cap")}</div><div><h4>临床医学课程数字化建设研修</h4><p>线上 + 线下 · 12 学时</p></div><span class="tag tag--success">已完成</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("medal")}</div><div><h4>智慧课程优秀案例评选</h4><p>材料提交中</p></div><span class="tag tag--amber">进行中</span></div>
        </div>
      `)}
      ${surface("教学成果", `
        <div class="resource-list">
          <div class="resource-row"><div class="resource-row__icon">${icon("book-open")}</div><div><h4>内科学数字教材</h4><p>数字教材 · 2026</p></div><span class="tag tag--success">已出版</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("file-badge")}</div><div><h4>临床思维训练课程案例</h4><p>校级优秀案例</p></div><span class="tag tag--primary">已获奖</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("presentation")}</div><div><h4>混合式教学公开课</h4><p>2026 年春季学期</p></div><span class="tag">已归档</span></div>
        </div>
      `)}
    </div>
  `;
}

function teacherAnalytics() {
  return `
    <div class="stat-grid">
      ${stat("课程活跃度", "86", "学院均值 78%", "activity", "%")}
      ${stat("资源使用率", "73", "使用资源 268 个", "archive", "%")}
      ${stat("作业完成率", "92", "按时提交 301 / 326", "clipboard-check", "%")}
      ${stat("平均正确率", "76", "较上周提升 3 个百分点", "target", "%")}
    </div>

    <div class="dashboard-grid dashboard-grid--wide-left">
      <section class="surface">
        <div class="surface__head">
          <div><h3>课程运行趋势</h3><p>最近 8 周学习、互动与作业完成情况</p></div>
          <div class="chart-legend">
            <span><i class="legend-dot"></i>访问量</span>
            <span><i class="legend-dot legend-dot--accent"></i>互动量</span>
          </div>
        </div>
        <div class="surface__body">
          <svg class="line-chart" viewBox="0 0 760 240" role="img" aria-label="课程运行趋势折线图">
            ${[40,80,120,160,200].map(y => `<line class="grid" x1="50" y1="${y}" x2="740" y2="${y}"></line>`).join("")}
            <text class="axis-text" x="14" y="44">400</text><text class="axis-text" x="14" y="84">300</text><text class="axis-text" x="14" y="124">200</text><text class="axis-text" x="14" y="164">100</text><text class="axis-text" x="24" y="204">0</text>
            <path class="series-area" d="M50 172 L145 154 L240 142 L335 116 L430 124 L525 86 L620 74 L715 58 L715 200 L50 200 Z"></path>
            <polyline class="series-primary" points="50,172 145,154 240,142 335,116 430,124 525,86 620,74 715,58"></polyline>
            <polyline class="series-accent" points="50,184 145,176 240,152 335,148 430,132 525,120 620,104 715,92"></polyline>
            <text class="axis-text" x="50" y="226">第5周</text><text class="axis-text" x="240" y="226">第6周</text><text class="axis-text" x="430" y="226">第7周</text><text class="axis-text" x="620" y="226">第8周</text>
          </svg>
        </div>
      </section>

      <div class="stack">
        ${surface("课程学习完成度", `
          <div class="stack">
            ${progressRow("课前学习", 91)}
            ${progressRow("课堂互动", 84)}
            ${progressRow("课后作业", 78, "progress--accent")}
            ${progressRow("阶段测评", 73, "progress--amber")}
          </div>
        `)}
        ${surface("质量预警", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>循环系统作业正确率偏低</h4><p>平均正确率 62%</p></div><span class="tag tag--accent">重点关注</span></div>
            <div class="alert-row"><div><h4>12 名学生连续两周未学习</h4><p>已生成教学提醒</p></div><span class="tag tag--amber">已提醒</span></div>
            <div class="alert-row"><div><h4>课堂互动参与稳定</h4><p>第 8 周较第 5 周提升 19%</p></div><span class="tag tag--success">表现良好</span></div>
          </div>
        `)}
      </div>
    </div>

    <div class="dashboard-grid dashboard-grid--equal" style="margin-top:16px">
      ${surface("班级学习对比", `
        <div class="bar-chart">
          ${barRow("临床 1 班", 91)}
          ${barRow("临床 2 班", 86)}
          ${barRow("临床 3 班", 79, "accent")}
          ${barRow("留学生班", 74, "amber")}
        </div>
      `)}
      ${surface("教学建议", `
        <div class="resource-list">
          <div class="resource-row"><div class="resource-row__icon">${icon("lightbulb")}</div><div><h4>增加心力衰竭病例推演</h4><p>针对班级错误集中点补充课堂练习</p></div><span class="tag tag--accent">建议</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("message-square-text")}</div><div><h4>发布课前概念辨析</h4><p>帮助学生区分急性左心衰与慢性心衰</p></div><span class="tag tag--primary">可执行</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("bell-ring")}</div><div><h4>提醒低参与学生</h4><p>建议使用聚合提醒，避免重复通知</p></div><span class="tag">已生成</span></div>
        </div>
      `)}
    </div>
  `;
}

function barRow(label, value, tone = "") {
  return `
    <div class="bar-chart__row">
      <span>${label}</span>
      <div class="bar-chart__track"><div class="bar-chart__bar ${tone ? `bar-chart__bar--${tone}` : ""}" style="width:${value}%"></div></div>
      <strong>${value}%</strong>
    </div>
  `;
}

function teacherResearch() {
  const cards = [
    ["folder-kanban", "我的项目", "查看在研项目、项目成员、任务进度与阶段成果。"],
    ["users-round", "科研团队", "管理团队成员、合作导师与校内外协作关系。"],
    ["file-text", "论文与成果", "归档论文、专利、奖项、报告和教学科研成果。"],
    ["library-big", "文献检索", "聚合医学期刊、指南与循证数据库入口。"],
    ["chart-no-axes-combined", "数据分析", "科研统计、数据清洗、可视化与结果解释。"],
    ["scale", "医学伦理", "伦理审查流程、申请模板与培训材料。"],
    ["flask-conical", "研究工具", "文献管理、实验记录、统计分析等工具集合。"],
    ["upload", "成果申报", "科研项目申报、成果登记与材料归档。"],
  ];
  return `
    <div class="stat-grid">
      ${stat("在研项目", "3", "主持 1 项 · 参与 2 项", "folder-kanban", "项")}
      ${stat("团队成员", "12", "覆盖 4 个学科方向", "users-round", "人")}
      ${stat("年度成果", "8", "论文 5 · 案例 2 · 专利 1", "file-badge", "项")}
      ${stat("待办任务", "4", "含 1 项结题材料", "clipboard-check", "项")}
    </div>

    <div class="search-band" style="margin-bottom:16px">
      <label class="search-band__input">
        ${icon("search")}
        <input type="search" placeholder="检索科研项目、文献、团队、成果或研究问题">
      </label>
      ${button("开始检索", "arrow-right", "primary", "", "start-research")}
    </div>

    <div class="research-grid">
      ${cards.map(([iconName, title, desc]) => `
        <button class="research-card" type="button" data-action="research-card">
          <span class="research-card__icon">${icon(iconName)}</span>
          <h3>${title}</h3>
          <p>${desc}</p>
        </button>
      `).join("")}
    </div>

    <div class="dashboard-grid dashboard-grid--wide-left" style="margin-top:16px">
      <section class="surface">
        <div class="surface__head">
          <div><h3>我的科研项目</h3><p>项目进度、成员与下一步任务</p></div>
          <button class="text-link" type="button" data-action="table-action">全部项目 ${icon("arrow-right")}</button>
        </div>
        <div class="surface__body table-scroll">
          <table class="resource-table">
            <thead><tr><th>项目名称</th><th>角色</th><th>项目周期</th><th>进度</th><th>下一步</th><th>状态</th></tr></thead>
            <tbody>
              <tr><td>高原地区高血压连续管理研究</td><td>负责人</td><td>2025-2027</td><td>62%</td><td>完成随访数据分析</td><td><span class="tag tag--success">正常</span></td></tr>
              <tr><td>临床思维训练智能体应用研究</td><td>核心成员</td><td>2026-2028</td><td>34%</td><td>补充病例评价标准</td><td><span class="tag tag--primary">进行中</span></td></tr>
              <tr><td>云南边境地区慢病健康教育模式研究</td><td>参与人</td><td>2026-2027</td><td>48%</td><td>准备中期材料</td><td><span class="tag tag--amber">需跟进</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div class="stack">
        ${surface("科研待办", `
          <div class="task-list">
            ${taskRow("file-text", "结题报告初稿", "高原地区高血压研究 · 11月20日", "待提交", "tag--accent")}
            ${taskRow("users-round", "团队例会", "11月18日 15:00 · 临床医学院", "会议", "tag--primary")}
            ${taskRow("scale", "伦理材料补充", "补充知情同意书版本", "待处理", "tag--amber")}
          </div>
        `)}
        ${surface("最近成果", `
          <div class="resource-list">
            <div class="resource-row"><div class="resource-row__icon">${icon("file-text")}</div><div><h4>基于岗位能力图谱的临床教学评价研究</h4><p>中文核心期刊 · 2026</p></div><span class="tag tag--success">已收录</span></div>
            <div class="resource-row"><div class="resource-row__icon">${icon("file-badge")}</div><div><h4>临床思维智能体教学案例</h4><p>校级优秀案例 · 2026</p></div><span class="tag tag--primary">已获奖</span></div>
            <div class="resource-row"><div class="resource-row__icon">${icon("lightbulb")}</div><div><h4>医学知识图谱构建方法</h4><p>技术报告 · 初稿</p></div><span class="tag">撰写中</span></div>
          </div>
        `)}
      </div>
    </div>
  `;
}

function adminHome() {
  return `
    <div class="stat-grid">
      ${stat("活跃用户", "8,426", "今日较昨日增加 6.3%", "users-round", "人")}
      ${stat("课程访问", "42,816", "近 7 日累计", "book-open", "次")}
      ${stat("资源调用", "18,492", "题库调用占 36%", "archive", "次")}
      ${stat("服务可用率", "99.96", "今日无异常中断", "activity", "%")}
    </div>

    <div class="dashboard-grid dashboard-grid--wide-left">
      <section class="surface">
        <div class="surface__head">
          <div><h3>平台运行趋势</h3><p>近 7 日用户访问与课程学习趋势</p></div>
          <div class="chart-legend">
            <span><i class="legend-dot"></i>活跃用户</span>
            <span><i class="legend-dot legend-dot--accent"></i>课程访问</span>
          </div>
        </div>
        <div class="surface__body">
          <svg class="line-chart" viewBox="0 0 760 240" role="img" aria-label="平台运行趋势折线图">
            ${[40,80,120,160,200].map(y => `<line class="grid" x1="50" y1="${y}" x2="740" y2="${y}"></line>`).join("")}
            <text class="axis-text" x="12" y="44">9k</text><text class="axis-text" x="12" y="84">6k</text><text class="axis-text" x="12" y="124">3k</text><text class="axis-text" x="24" y="164">0</text>
            <path class="series-area" d="M50 168 L165 148 L280 154 L395 112 L510 120 L625 70 L715 62 L715 176 L50 176 Z"></path>
            <polyline class="series-primary" points="50,168 165,148 280,154 395,112 510,120 625,70 715,62"></polyline>
            <polyline class="series-accent" points="50,182 165,170 280,160 395,144 510,138 625,118 715,104"></polyline>
            <text class="axis-text" x="50" y="226">11/07</text><text class="axis-text" x="280" y="226">11/09</text><text class="axis-text" x="510" y="226">11/11</text><text class="axis-text" x="675" y="226">11/13</text>
          </svg>
        </div>
      </section>

      <div class="stack">
        ${surface("课程运行质量", `
          <div class="stack">
            ${progressRow("正常运行", 84)}
            ${progressRow("需要干预", 11, "progress--accent")}
            ${progressRow("停滞课程", 5, "progress--amber")}
          </div>
        `, "面向课程运营，不只看建设数量")}
        ${surface("系统服务状态", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>统一身份认证</h4><p>响应 126ms</p></div><span class="tag tag--success">正常</span></div>
            <div class="alert-row"><div><h4>课程平台同步</h4><p>最近同步：09:42</p></div><span class="tag tag--success">正常</span></div>
            <div class="alert-row"><div><h4>考试系统</h4><p>最近同步：09:35</p></div><span class="tag tag--primary">正常</span></div>
          </div>
        `)}
      </div>
    </div>

    <div class="dashboard-grid dashboard-grid--equal" style="margin-top:16px">
      ${surface("学院运行概览", `
        <div class="table-scroll">
          <table class="system-table">
            <thead><tr><th>学院</th><th>课程数</th><th>活跃课程</th><th>学生活跃度</th><th>状态</th></tr></thead>
            <tbody>
              <tr><td>临床医学院</td><td>96</td><td>84</td><td>88%</td><td><span class="tag tag--success">正常</span></td></tr>
              <tr><td>护理学院</td><td>52</td><td>46</td><td>82%</td><td><span class="tag tag--success">正常</span></td></tr>
              <tr><td>公共卫生学院</td><td>34</td><td>29</td><td>76%</td><td><span class="tag tag--primary">关注</span></td></tr>
            </tbody>
          </table>
        </div>
      `)}
      ${surface("待处理事项", `
        <div class="task-list">
          ${taskRow("triangle-alert", "12 门课程连续 14 天无更新", "课程运营 · 临床医学院", "需督办", "tag--accent")}
          ${taskRow("list-tree", "3 个系统接口待确认", "教务、教发、考试系统", "待处理", "tag--amber")}
          ${taskRow("file-badge", "教学质量月报待审核", "11月运行报告", "待审核", "tag--primary")}
        </div>
      `)}
    </div>
  `;
}

function adminIntegration() {
  return `
    <div class="stat-grid">
      ${stat("已接入系统", "7", "6 个同步正常，1 个待确认", "network")}
      ${stat("今日同步任务", "286", "成功 282 · 待重试 4", "refresh-cw")}
      ${stat("数据同步延迟", "42", "低于 60 秒阈值", "timer", "秒")}
      ${stat("接口可用率", "99.94", "近 7 日平均", "activity", "%")}
    </div>

    <div class="dashboard-grid dashboard-grid--wide-left">
      <section class="surface">
        <div class="surface__head">
          <div><h3>多系统集成关系</h3><p>保护学校已有资源，统一身份与数据入口</p></div>
          <span class="tag tag--success">总体运行正常</span>
        </div>
        <div class="integration-map">
          <div class="integration-core">${icon("building-2")}<strong>大理大学未来学习中心</strong></div>
          <div class="integration-node"><b>教务系统</b><span>排课、教学任务、学生</span></div>
          <div class="integration-node"><b>课程平台</b><span>泛雅、学银在线课程</span></div>
          <div class="integration-node"><b>专业平台</b><span>智慧专业门户</span></div>
          <div class="integration-node"><b>教发平台</b><span>培训、评选、能力档案</span></div>
          <div class="integration-node"><b>考试系统</b><span>考试、题库、成绩</span></div>
          <div class="integration-node"><b>统一消息中心</b><span>任务、提醒与消息聚合</span></div>
        </div>
      </section>

      <div class="stack">
        ${surface("同步任务", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>学生与教师主数据</h4><p>09:42 完成 · 8,536 条</p></div><span class="tag tag--success">成功</span></div>
            <div class="alert-row"><div><h4>课程与选课数据</h4><p>09:40 完成 · 1,248 条</p></div><span class="tag tag--success">成功</span></div>
            <div class="alert-row"><div><h4>考试题库增量</h4><p>待确认科目权限</p></div><span class="tag tag--amber">待确认</span></div>
          </div>
        `)}
        ${surface("接口日志", `
          <div class="resource-list">
            <div class="resource-row"><div class="resource-row__icon">${icon("circle-check")}</div><div><h4>教务系统</h4><p>09:42 · 响应 86ms</p></div><span class="tag tag--success">200</span></div>
            <div class="resource-row"><div class="resource-row__icon">${icon("circle-check")}</div><div><h4>课程平台</h4><p>09:40 · 响应 118ms</p></div><span class="tag tag--success">200</span></div>
            <div class="resource-row"><div class="resource-row__icon">${icon("circle-alert")}</div><div><h4>考试系统</h4><p>09:35 · 权限校验失败</p></div><span class="tag tag--accent">403</span></div>
          </div>
        `)}
      </div>
    </div>
  `;
}

function adminAssessment() {
  return `
    <div class="stat-grid">
      ${stat("本周考试", "18", "涵盖 5 个专业", "clipboard-list", "场")}
      ${stat("题库总量", "42,680", "执医题库占 61%", "database", "题")}
      ${stat("待阅卷", "326", "主观题 84 份", "file-pen-line", "份")}
      ${stat("平均达成度", "76", "较上月提升 4 个百分点", "target", "%")}
    </div>

    <section class="surface" style="margin-bottom:16px">
      <div class="surface__head">
        <div><h3>考试与测评任务</h3><p>统一管理执医、课程、技能与 OSCE 考核</p></div>
        <div class="tab-bar">
          <button class="tab-button active" type="button" data-action="tab-button">全部</button>
          <button class="tab-button" type="button" data-action="tab-button">执医测评</button>
          <button class="tab-button" type="button" data-action="tab-button">课程考试</button>
          <button class="tab-button" type="button" data-action="tab-button">技能考核</button>
        </div>
      </div>
      <div class="surface__body table-scroll">
        <table class="exam-table">
          <thead><tr><th>考试名称</th><th>类型</th><th>适用对象</th><th>考试时间</th><th>完成情况</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>临床医学阶段测评</td><td>课程考试</td><td>临床医学 2023 级</td><td>11月18日 19:00</td><td>312 / 326</td><td><span class="tag tag--primary">待考试</span></td><td><button class="btn" type="button" data-action="table-action">管理</button></td></tr>
            <tr><td>执业医师模拟考试</td><td>执医测评</td><td>临床医学 2022 级</td><td>11月20日 09:00</td><td>286 / 310</td><td><span class="tag tag--success">准备完成</span></td><td><button class="btn" type="button" data-action="table-action">管理</button></td></tr>
            <tr><td>心肺听诊技能考核</td><td>技能考核</td><td>临床医学 2023 级</td><td>11月22日 14:00</td><td>0 / 82</td><td><span class="tag tag--amber">待配置</span></td><td><button class="btn" type="button" data-action="table-action">配置</button></td></tr>
            <tr><td>OSCE 站点考核</td><td>OSCE</td><td>2023 级临床医学</td><td>11月26日 08:30</td><td>0 / 326</td><td><span class="tag">编排中</span></td><td><button class="btn" type="button" data-action="table-action">查看</button></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="dashboard-grid dashboard-grid--equal">
      ${surface("题库结构", `
        <div class="bar-chart">
          ${barRow("临床综合", 61)}
          ${barRow("基础医学", 18, "accent")}
          ${barRow("预防医学", 12, "amber")}
          ${barRow("医学人文", 9)}
        </div>
      `)}
      ${surface("能力点与题目关联", `
        <div class="stack">
          ${progressRow("医学知识", 94)}
          ${progressRow("临床技能", 82)}
          ${progressRow("临床思维", 73, "progress--accent")}
          ${progressRow("沟通协作", 61, "progress--amber")}
        </div>
        <p style="margin:14px 0 0;color:var(--muted);font-size:10px">沟通协作与职业发展相关题量仍偏少，建议后续补充病例与情境题。</p>
      `)}
    </div>
  `;
}

function adminData() {
  return `
    <div class="stat-grid">
      ${stat("学生画像", "8,426", "覆盖 12 个专业", "graduation-cap", "人")}
      ${stat("教师画像", "682", "覆盖 14 个学院", "presentation", "人")}
      ${stat("课程画像", "214", "运行课程 178 门", "book-open", "门")}
      ${stat("数据完整度", "91", "主数据完整度", "database", "%")}
    </div>

    <div class="dashboard-grid dashboard-grid--wide-left">
      <section class="surface">
        <div class="surface__head">
          <div><h3>学生能力达成度分布</h3><p>按专业与年级统计岗位能力达成情况</p></div>
          <span class="tag">最近更新：今天 09:30</span>
        </div>
        <div class="surface__body">
          <div class="bar-chart">
            ${barRow("医学知识", 82)}
            ${barRow("临床技能", 71, "accent")}
            ${barRow("临床思维", 64, "amber")}
            ${barRow("沟通协作", 69)}
            ${barRow("职业发展", 74)}
          </div>
        </div>
      </section>

      <div class="stack">
        ${surface("质量报告", `
          <div class="resource-list">
            <div class="resource-row"><div class="resource-row__icon">${icon("file-chart-column")}</div><div><h4>11 月教学质量月报</h4><p>课程运行、学习参与与达成情况</p></div><span class="tag tag--primary">待审核</span></div>
            <div class="resource-row"><div class="resource-row__icon">${icon("file-text")}</div><div><h4>临床医学专业运行报告</h4><p>课程、师资、资源与学生数据</p></div><span class="tag tag--success">已生成</span></div>
            <div class="resource-row"><div class="resource-row__icon">${icon("file-badge")}</div><div><h4>课程资源使用分析</h4><p>资源调用、更新与课程应用效果</p></div><span class="tag">待生成</span></div>
          </div>
        `)}
        ${surface("数据治理提醒", `
          <div class="alert-list">
            <div class="alert-row"><div><h4>3 个课程缺少知识图谱</h4><p>影响能力达成计算</p></div><span class="tag tag--amber">待补充</span></div>
            <div class="alert-row"><div><h4>2 个学院教师信息未同步</h4><p>教发平台主数据</p></div><span class="tag tag--accent">待处理</span></div>
          </div>
        `)}
      </div>
    </div>

    <section class="surface" style="margin-top:16px">
      <div class="surface__head">
        <div><h3>课程运行画像</h3><p>关注课程是否真正运行，而不仅是建设数量</p></div>
        <div class="tab-bar">
          <button class="tab-button active" type="button" data-action="tab-button">运行课程</button>
          <button class="tab-button" type="button" data-action="tab-button">待干预课程</button>
          <button class="tab-button" type="button" data-action="tab-button">停滞课程</button>
        </div>
      </div>
      <div class="surface__body table-scroll">
        <table class="resource-table">
          <thead><tr><th>课程</th><th>学院</th><th>资源使用率</th><th>任务完成率</th><th>活跃度</th><th>状态</th></tr></thead>
          <tbody>
            <tr><td>内科学</td><td>临床医学院</td><td>84%</td><td>91%</td><td>86%</td><td><span class="tag tag--success">运行良好</span></td></tr>
            <tr><td>医学影像学</td><td>临床医学院</td><td>76%</td><td>83%</td><td>78%</td><td><span class="tag tag--success">运行良好</span></td></tr>
            <tr><td>基础护理学</td><td>护理学院</td><td>68%</td><td>72%</td><td>64%</td><td><span class="tag tag--primary">正常</span></td></tr>
            <tr><td>医学微生物学</td><td>临床医学院</td><td>31%</td><td>42%</td><td>36%</td><td><span class="tag tag--accent">需干预</span></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function adminResources() {
  return `
    <div class="stat-grid">
      ${stat("课程资源", "1,286", "本月新增 42 个", "book-open", "个")}
      ${stat("题库题目", "42,680", "已关联能力点 68%", "database", "题")}
      ${stat("知识库文档", "8,412", "覆盖 10 个知识库", "library-big", "篇")}
      ${stat("智能体", "12", "运行中 9 个", "bot", "个")}
    </div>

    <div class="page-head" style="margin-bottom:14px">
      <div class="tab-bar">
        <button class="tab-button active" type="button" data-action="tab-button">课程资源</button>
        <button class="tab-button" type="button" data-action="tab-button">专业知识库</button>
        <button class="tab-button" type="button" data-action="tab-button">题库</button>
        <button class="tab-button" type="button" data-action="tab-button">智能体</button>
      </div>
    </div>

    <section class="surface">
      <div class="surface__head">
        <div><h3>资源清单</h3><p>资源目录、应用状态与课程运营情况</p></div>
        <span class="tag tag--primary">本周巡检完成</span>
      </div>
      <div class="surface__body table-scroll">
        <table class="resource-table">
          <thead><tr><th>资源名称</th><th>类型</th><th>所属课程 / 知识库</th><th>使用次数</th><th>最近更新</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>心力衰竭诊疗路径</td><td>知识图谱</td><td>内科学</td><td>2,418</td><td>11月12日</td><td><span class="tag tag--success">正常</span></td><td><button class="btn" type="button" data-action="table-action">查看</button></td></tr>
            <tr><td>心电图判读题库</td><td>题库</td><td>临床技能中心</td><td>6,892</td><td>11月11日</td><td><span class="tag tag--success">正常</span></td><td><button class="btn" type="button" data-action="table-action">查看</button></td></tr>
            <tr><td>临床诊疗知识库</td><td>知识库</td><td>医师智脑</td><td>8,126</td><td>11月10日</td><td><span class="tag tag--primary">更新中</span></td><td><button class="btn" type="button" data-action="table-action">管理</button></td></tr>
            <tr><td>医学影像诊断智能体</td><td>智能体</td><td>医学影像学</td><td>1,234</td><td>11月09日</td><td><span class="tag tag--amber">待优化</span></td><td><button class="btn" type="button" data-action="table-action">配置</button></td></tr>
            <tr><td>医学微生物学课件包</td><td>课件</td><td>医学微生物学</td><td>186</td><td>10月22日</td><td><span class="tag tag--accent">低频使用</span></td><td><button class="btn" type="button" data-action="table-action">提醒</button></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="dashboard-grid dashboard-grid--equal" style="margin-top:16px">
      ${surface("课程运营体检", `
        <div class="stack">
          ${progressRow("资源更新及时", 81)}
          ${progressRow("课程互动活跃", 76)}
          ${progressRow("题库关联完整", 68, "progress--accent")}
          ${progressRow("智能体反馈闭环", 59, "progress--amber")}
        </div>
      `)}
      ${surface("运营干预建议", `
        <div class="resource-list">
          <div class="resource-row"><div class="resource-row__icon">${icon("triangle-alert")}</div><div><h4>12 门课程资源连续 30 天未更新</h4><p>建议通知课程负责人并安排更新</p></div><span class="tag tag--accent">重点</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("link-2")}</div><div><h4>1,286 道题目未关联能力点</h4><p>影响岗位能力分析准确度</p></div><span class="tag tag--amber">待处理</span></div>
          <div class="resource-row"><div class="resource-row__icon">${icon("bot")}</div><div><h4>3 个智能体待补充评价数据</h4><p>建议启动使用反馈采集</p></div><span class="tag tag--primary">建议</span></div>
        </div>
      `)}
    </div>
  `;
}

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, "");
  if (!hash || hash === "portal") return "";
  return hash;
}

function render() {
  const route = currentRoute();
  document.body.classList.remove("nav-open");
  if (!route) {
    document.title = "大理大学未来学习中心 - 产品原型";
    app.innerHTML = renderPortal();
  } else if (route === "gallery") {
    document.title = "全部页面 - 大理大学未来学习中心";
    app.innerHTML = renderGallery();
  } else {
    const meta = routeMeta[route];
    if (!meta) {
      location.hash = "#/";
      return;
    }
    document.title = `${meta.title} - 大理大学未来学习中心`;
    app.innerHTML = renderShell(route);
  }
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { width: 17, height: 17 } });
  }
}

function showToast(title, message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

function closeOnboarding() {
  const panel = document.querySelector("[data-onboarding]");
  if (!panel) return;
  const weekly = document.querySelector("#onboarding-weekly");
  if (weekly?.checked) {
    localStorage.setItem("dali-onboarding-weekly-until", String(Date.now() + 7 * 24 * 60 * 60 * 1000));
  } else {
    sessionStorage.setItem("dali-onboarding-dismissed", "1");
  }
  panel.hidden = true;
}

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-onboarding]")) {
    closeOnboarding();
    return;
  }

  if (event.target.matches("[data-role-menu]")) {
    sessionStorage.removeItem("dali-role-menu-open");
    const menu = document.querySelector("[data-role-menu]");
    if (menu) menu.hidden = true;
    return;
  }

  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  if (action === "enter-role") {
    event.preventDefault();
    const role = actionEl.dataset.role;
    const homeRoutes = { student: "#/student/home", teacher: "#/teacher/home", admin: "#/admin/home" };
    sessionStorage.setItem("dali-role-menu-open", role);
    sessionStorage.removeItem("dali-onboarding-dismissed");
    location.hash = homeRoutes[role];
    return;
  }

  if (action === "close-role-menu") {
    sessionStorage.removeItem("dali-role-menu-open");
    const menu = document.querySelector("[data-role-menu]");
    if (menu) menu.hidden = true;
    if (actionEl.tagName !== "A") return;
  }

  if (action === "open-nav") {
    document.body.classList.add("nav-open");
  }

  if (action === "close-nav") {
    document.body.classList.remove("nav-open");
  }

  if (action === "notifications") {
    showToast("消息通知", "你有 3 条未读消息：考试提醒、课程更新和教学任务。");
  }

  if (action === "profile") {
    showToast("个人中心", "身份、提醒偏好和个人档案将在这里统一管理。");
  }

  if (action === "open-onboarding") {
    const panel = document.querySelector("[data-onboarding]");
    if (panel) panel.hidden = false;
  }

  if (action === "close-onboarding" || action === "accept-onboarding") {
    closeOnboarding();
  }

  if (action === "onboarding-guide") {
    showToast("使用手册", "已打开当前角色的功能说明与操作指南。");
  }

  if (action === "select-option" || action === "select-poll") {
    const parent = actionEl.closest(".option-list, .poll-options");
    parent?.querySelectorAll(".option, .poll-option").forEach((btn) => btn.classList.remove("selected"));
    actionEl.classList.add("selected");
  }

  if (action === "submit-answer") {
    const selected = document.querySelector(".option.selected");
    showToast(selected ? "答案已提交" : "请先选择答案", selected ? "系统将根据错题自动推送知识点与强化练习。" : "选择选项后再提交。");
  }

  if (action === "filter-chip") {
    const parent = actionEl.parentElement;
    parent?.querySelectorAll(".filter-chip").forEach((btn) => btn.classList.remove("active"));
    actionEl.classList.add("active");
  }

  if (action === "tool-tab" || action === "tab-button") {
    const parent = actionEl.parentElement;
    parent?.querySelectorAll(`.${action === "tool-tab" ? "tool-tab" : "tab-button"}`).forEach((btn) => btn.classList.remove("active"));
    actionEl.classList.add("active");
    showToast("视图已更新", `已切换到“${actionEl.textContent.trim()}”。`);
  }

  if (action === "generate-design") {
    showToast("教学设计已更新", "课堂结构、重点难点和课堂互动已重新生成。");
  }

  if (action === "generate-training") {
    showToast("强化训练已生成", "已根据薄弱能力点生成 5 组递进题目。");
  }

  if (action === "select-weakness") {
    const selected = actionEl.dataset.weakness;
    document.querySelectorAll(".weakness-button").forEach((button) => button.classList.remove("active"));
    actionEl.classList.add("active");
    document.querySelectorAll("[data-recommendation]").forEach((panel) => {
      panel.hidden = panel.dataset.recommendation !== selected;
    });
  }

  if (action === "start-weakness-plan") {
    showToast("已加入学习计划", "系统将按知识点、课程、期刊和题库顺序生成学习任务。");
  }

  if (action === "export-relation") {
    showToast("对应表已生成", "能力、课程、知识点和推荐资源对应表已准备导出。");
  }

  if (action === "publish-poll") {
    showToast("投票结果已发布", "学生端将立即显示选项分布与课堂反馈。");
  }

  if (action === "start-research" || action === "research-card") {
    showToast("科研入口已打开", "已进入科研资源与检索模式。");
  }

  if (action === "sync-data") {
    actionEl.classList.add("is-loading");
    showToast("同步任务已启动", "正在同步教务、课程与考试系统数据。");
  }

  if (action === "table-action" || action === "teacher-profile") {
    showToast("原型交互", "该操作将在正式版本中打开详情或管理面板。");
  }
});

document.addEventListener("keydown", (event) => {
  const search = event.target.closest("#global-search-input");
  if (search && event.key === "Enter" && search.value.trim()) {
    showToast("全局检索", `正在查找“${search.value.trim()}”相关的课程、知识点、题目和资源。`);
  }
});

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
render();
