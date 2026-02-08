/* Base behavior: language, reveal, nav, lightbox, form, lazy iframes */
(() => {
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  const header = $("#header");
  const nav = $(".nav");
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");
  const navBackdrop = $("#navBackdrop");
  const langToggle = $("#langToggle");
  const langPill = $("#langPill");

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxClose = $("#lightboxClose");

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // ------- i18n -------
  const translations = {
    en: {
      "nav.about":"About",
      "nav.programs":"Programs",
      "nav.coaches":"Coaches",
      "nav.gallery":"Gallery",
      "nav.media":"Media",
      "nav.contact":"Contact",
      "header.cta":"Register",

      "hero.eyebrow":"Qatar • Doha • Al Sadd",
      "hero.title":"Where creativity begins… and champions are made.",
      "hero.sub":"Professional football and basketball training for children, in a safe and motivating environment.",
      "hero.primary":"Register now",
      "hero.whatsapp":"WhatsApp",
      "hero.badge1":"From 4 years+",
      "hero.badge2":"Girls-only sessions",
      "hero.badge3":"Values before competition",

      "strip.football":"Football training",
      "strip.footballSub":"Modern methods • Fun • Discipline",
      "strip.basketball":"Basketball programs",
      "strip.basketballSub":"Skills • Confidence • Teamwork",
      "strip.safe":"Safe environment",
      "strip.safeSub":"Children-first • Supportive coaching",

      "about.title":"About the Academy",
      "about.lead":"We believe every child has a unique talent — our role is to discover it and develop it with knowledge, discipline, and enjoyment.",
      "about.f1t":"Building confidence",
      "about.f1s":"Because confidence starts early.",
      "about.f2t":"Teamwork & discipline",
      "about.f2s":"We develop values before performance.",
      "about.f3t":"Girls-only training",
      "about.f3s":"Full privacy with qualified female coaches.",
      "about.cta1":"Explore programs",
      "about.cta2":"Privacy policy",

      "programs.title":"Programs",
      "programs.sub":"Specialized football & basketball training for children — starting from 4 years old.",
      "programs.football.title":"Football Training",
      "programs.football.text":"Professional football training for children — skills, discipline, and teamwork through modern, safe methods.",
      "programs.basketball.title":"Basketball Training",
      "programs.basketball.text":"Specialized basketball programs for children — skill building, confidence, and leadership in a supportive environment.",
      "programs.values.title":"Values & Development",
      "programs.values.text":"We focus on building character first — respect, responsibility, and confidence — to create future leaders.",
      "programs.b1":"Physical development",
      "programs.b2":"Confidence & discipline",
      "programs.b3":"Team spirit",
      "programs.b4":"Skills & coordination",
      "programs.b5":"Self-confidence",
      "programs.b6":"Discipline & focus",
      "programs.b7":"Safe & motivating",
      "programs.b8":"Girls-only options",
      "programs.b9":"Modern methodology",
      "programs.link":"Register",
      "programs.link2":"Contact us",

      "coaches.title":"Coaches",
      "coaches.sub":"Placeholder profiles will be replaced with your official coaches once you provide names and details.",
      "coaches.c1n":"Coach A",
      "coaches.c1r":"Football • Kids development",
      "coaches.c2n":"Coach B",
      "coaches.c2r":"Basketball • Skills training",
      "coaches.c3n":"Coach G",
      "coaches.c3r":"Girls sessions • Female coach",
      "coaches.c4n":"Coach F",
      "coaches.c4r":"Fitness • Coordination",

      "gallery.title":"Gallery",
      "gallery.sub":"A glimpse into our training environment and activities.",

      "register.title":"Register",
      "register.sub":"Fill in the form and we will contact you. Your details will be sent to our email and you can also send a copy via WhatsApp.",

      "form.name":"Child name",
      "form.age":"Age",
      "form.gender":"Gender",
      "form.sport":"Sport",
      "form.contact":"Phone / WhatsApp",
      "form.notes":"Notes (optional)",
      "form.choose":"Choose",
      "form.boy":"Boy",
      "form.girl":"Girl",
      "form.football":"Football",
      "form.basketball":"Basketball",
      "form.req":"Required",
      "form.submit":"Submit",
      "form.whatsappCopy":"Send copy via WhatsApp",
      "form.privacyNote":"By submitting, you agree to our",
      "form.privacyLink":"Privacy Policy",
      "form.sending":"Sending…",
      "form.sent":"Submitted. You can now send a copy via WhatsApp.",
      "form.invalid":"Please complete all required fields.",

      "contact.title":"Contact",
      "contact.sub":"Al Sadd – Doha, Qatar • Tarik Bin Ziyad School",
      "contact.whatsapp":"WhatsApp",
      "contact.email":"Email",
      "contact.location":"Location",
      "contact.locSub":"Open in Google Maps",
      "contact.openMaps":"Open in Maps",

      "cta.sub":"Professional football and basketball training for children.",
      "cta.location":"Doha - Al Sadd",
      "cta.whatsapp":"WhatsApp: +974 50149045",
      "cta.email":"Email: nasryahia474@gmail.com",

      "footer.sub":"Al Sadd • Doha • Qatar",
      "footer.privacy":"Privacy",
      "footer.whatsapp":"WhatsApp",
    },

    ar: {
      "nav.about":"من نحن",
      "nav.programs":"البرامج",
      "nav.coaches":"المدربين",
      "nav.gallery":"المعرض",
      "nav.media":"ميديا",
      "nav.contact":"تواصل",
      "header.cta":"سجّل الآن",

      "hero.eyebrow":"قطر • الدوحة • السد",
      "hero.title":"حيث يبدأ الإبداع… ويُصنع الأبطال",
      "hero.sub":"تدريب احترافي لكرة القدم وكرة السلة للأطفال في بيئة آمنة ومحفّزة.",
      "hero.primary":"سجّل الآن",
      "hero.whatsapp":"واتساب",
      "hero.badge1":"ابتداءً من 4 سنوات",
      "hero.badge2":"خصوصية للبنات",
      "hero.badge3":"بناء الشخصية أولاً",

      "strip.football":"تدريب كرة القدم",
      "strip.footballSub":"أساليب حديثة • متعة • انضباط",
      "strip.basketball":"برامج كرة السلة",
      "strip.basketballSub":"مهارات • ثقة • عمل جماعي",
      "strip.safe":"بيئة آمنة",
      "strip.safeSub":"الأطفال أولاً • تدريب داعم",

      "about.title":"عن الأكاديمية",
      "about.lead":"نؤمن أن كل طفل يمتلك موهبة فريدة، ودورنا هو اكتشافها وصقلها بالعلم، الانضباط، والمتعة.",
      "about.f1t":"بناء الثقة",
      "about.f1s":"الثقة تُبنى منذ الصغر.",
      "about.f2t":"روح الفريق والانضباط",
      "about.f2s":"نبني القيم قبل المنافسة.",
      "about.f3t":"تدريب للبنات فقط",
      "about.f3s":"خصوصية تامة مع مدربات محترفات.",
      "about.cta1":"استكشف البرامج",
      "about.cta2":"سياسة الخصوصية",

      "programs.title":"البرامج",
      "programs.sub":"برامج متخصصة لكرة القدم وكرة السلة للأطفال — ابتداءً من عمر 4 سنوات.",
      "programs.football.title":"تدريب كرة القدم",
      "programs.football.text":"تدريب احترافي للأطفال لتطوير المهارات والانضباط وروح الفريق بأسلوب حديث وآمن.",
      "programs.basketball.title":"تدريب كرة السلة",
      "programs.basketball.text":"برامج متخصصة للأطفال لبناء المهارات والثقة والقيادة في بيئة داعمة.",
      "programs.values.title":"القيم والتطوير",
      "programs.values.text":"نركّز على بناء الشخصية أولاً — الاحترام والمسؤولية والثقة — لصناعة قادة المستقبل.",
      "programs.b1":"تطوير المهارات البدنية",
      "programs.b2":"تعزيز الثقة والانضباط",
      "programs.b3":"تنمية روح الفريق",
      "programs.b4":"مهارات وتناسق",
      "programs.b5":"بناء الثقة بالنفس",
      "programs.b6":"انضباط وتركيز",
      "programs.b7":"بيئة آمنة ومحفزة",
      "programs.b8":"خصوصية للبنات",
      "programs.b9":"منهجية حديثة",
      "programs.link":"سجّل",
      "programs.link2":"تواصل معنا",

      "coaches.title":"المدربين",
      "coaches.sub":"هذه أسماء افتراضية مؤقتاً وسيتم تحديثها عند تزويدنا بمعلومات المدربين الرسمية.",
      "coaches.c1n":"المدرب A",
      "coaches.c1r":"كرة قدم • تطوير الأطفال",
      "coaches.c2n":"المدرب B",
      "coaches.c2r":"كرة سلة • تطوير المهارات",
      "coaches.c3n":"المدربة G",
      "coaches.c3r":"جلسات البنات • مدربة محترفة",
      "coaches.c4n":"المدرب F",
      "coaches.c4r":"لياقة • تناسق وحركة",

      "gallery.title":"المعرض",
      "gallery.sub":"لمحة عن بيئة التدريب والأنشطة.",

      "register.title":"التسجيل",
      "register.sub":"املأ النموذج وسنتواصل معك. ستصل البيانات إلى بريدنا ويمكنك إرسال نسخة عبر واتساب.",

      "form.name":"اسم الطفل",
      "form.age":"العمر",
      "form.gender":"الجنس",
      "form.sport":"اللعبة",
      "form.contact":"رقم الهاتف / واتساب",
      "form.notes":"ملاحظات (اختياري)",
      "form.choose":"اختر",
      "form.boy":"ولد",
      "form.girl":"بنت",
      "form.football":"كرة قدم",
      "form.basketball":"كرة سلة",
      "form.req":"مطلوب",
      "form.submit":"إرسال",
      "form.whatsappCopy":"إرسال نسخة عبر واتساب",
      "form.privacyNote":"بالإرسال أنت توافق على",
      "form.privacyLink":"سياسة الخصوصية",
      "form.sending":"جارٍ الإرسال…",
      "form.sent":"تم الإرسال. يمكنك الآن إرسال نسخة عبر واتساب.",
      "form.invalid":"يرجى تعبئة جميع الحقول المطلوبة.",

      "contact.title":"تواصل معنا",
      "contact.sub":"السد – الدوحة، قطر • مدرسة طارق بن زياد",
      "contact.whatsapp":"واتساب",
      "contact.email":"البريد",
      "contact.location":"الموقع",
      "contact.locSub":"فتح في خرائط جوجل",
      "contact.openMaps":"افتح الخريطة",

      "cta.sub":"تدريب احترافي لكرة القدم وكرة السلة للأطفال.",
      "cta.location":"الدوحة - السد",
      "cta.whatsapp":"واتساب: +974 50149045",
      "cta.email":"البريد: nasryahia474@gmail.com",

      "footer.sub":"السد • الدوحة • قطر",
      "footer.privacy":"الخصوصية",
      "footer.whatsapp":"واتساب",
    }
  };

  const nodes = $$("[data-i18n]");
  const setLang = (lang) => {
    const isAr = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    langPill && (langPill.textContent = isAr ? "EN" : "AR");

    nodes.forEach(n => {
      const k = n.getAttribute("data-i18n");
      const v = (translations[lang] || {})[k];
      if (v) n.textContent = v;
    });

    // also update select placeholder options that use data-i18n inside <option>
    $$("option[data-i18n]").forEach(opt => {
      const k = opt.getAttribute("data-i18n");
      const v = (translations[lang] || {})[k];
      if (v) opt.textContent = v;
    });

    // Persist
    try { localStorage.setItem("lang", lang); } catch {}
  };

  const initialLang = (() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "ar" || saved === "en") return saved;
    } catch {}
    return "en"; // default per user request
  })();
  setLang(initialLang);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = document.documentElement.lang || "en";
      setLang(current === "en" ? "ar" : "en");
    });
  }

  // ------- Mobile menu -------
  const setMenuOpen = (open) => {
    if (navToggle) navToggle.setAttribute("aria-expanded", String(open));
    if (nav) nav.classList.toggle("is-open", open);
    if (navMenu) navMenu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    if (navBackdrop) navBackdrop.classList.toggle("active", open);
  };
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!open);
    });
  }
  if (navBackdrop) navBackdrop.addEventListener("click", () => setMenuOpen(false));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  });

  // Close mobile menu when clicking outside the nav/menu
  document.addEventListener("click", (e) => {
    try {
      const isOpen = nav && nav.classList.contains("is-open");
      if (!isOpen) return;
      const target = e.target;
      if (nav && nav.contains(target)) return; // click inside nav — keep open
      setMenuOpen(false);
    } catch (err) { /* ignore */ }
  });
  if (navMenu) {
    $$(".nav-link", navMenu).forEach(a => a.addEventListener("click", () => setMenuOpen(false)));
  }

  // ------- Scroll reveal -------
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = $$(".reveal");
  if (prefersReduced) {
    revealItems.forEach(el => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    revealItems.forEach((el, i) => {
      const hasDirection =
        el.classList.contains("from-left") ||
        el.classList.contains("from-right") ||
        el.classList.contains("from-up") ||
        el.classList.contains("from-down");
      if (!hasDirection) {
        const mod = i % 4;
        el.classList.add(mod === 0 ? "from-left" : mod === 1 ? "from-right" : mod === 2 ? "from-up" : "from-down");
      }
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          revealObserver.unobserve(e.target); // once only
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(el => revealObserver.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  // On-load reveal (first section without waiting for scroll)
  window.addEventListener("load", () => {
    const onLoadItems = $$(".reveal.on-load");
    onLoadItems.forEach((el, i) => {
      window.setTimeout(() => el.classList.add("is-visible"), 120 + i * 80);
    });
  });

  // ------- Active nav on scroll -------
  const sections = ["about","programs","coaches","gallery","media","contact","register"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = $$(".nav-link");
  const setActive = (id) => {
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("data-nav") === id));
  };

  if (sections.length) {
    const sio = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) setActive(visible.target.id);
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0.06, 0.12, 0.2] });

    sections.forEach(s => sio.observe(s));
  }

  // ------- Lightbox -------
  const openLightbox = (src) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImage) lightboxImage.src = "";
  };

  $$("[data-lightbox]").forEach(btn => {
    btn.addEventListener("click", () => openLightbox(btn.getAttribute("data-lightbox")));
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // ------- Lazy iframe (facebook) -------
  const lazyIframes = $$("iframe[data-lazy-iframe]");
  if (lazyIframes.length) {
    const loadIframe = (ifr) => {
      const src = ifr.getAttribute("data-src");
      if (src && !ifr.src) ifr.src = src;
    };
    if (!prefersReduced && "IntersectionObserver" in window) {
      const iio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            loadIframe(e.target);
            iio.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      lazyIframes.forEach(ifr => iio.observe(ifr));
    } else {
      lazyIframes.forEach(loadIframe);
    }
  }

  // ------- Form: validate + build WhatsApp copy -------
  const form = $("#registerForm");
  const status = $("#formStatus");
  const waBtn = $("#waCopyBtn");
  const submitBtn = $("#submitBtn");

  const academyPhone = "97450149045";

  const buildWhatsAppText = (data, lang) => {
    const isAr = lang === "ar";
    if (isAr) {
      return [
        "مرحباً، أرغب بتسجيل طفلي في أكاديمية الإبداع الرياضية.",
        `اسم الطفل: ${data.childName}`,
        `العمر: ${data.age}`,
        `الجنس: ${data.gender}`,
        `اللعبة: ${data.sport}`,
        `رقم التواصل: ${data.contact}`,
        data.notes ? `ملاحظات: ${data.notes}` : ""
      ].filter(Boolean).join("\n");
    }
    return [
      "Hello, I would like to register my child at Creativity Sports Academy – Qatar.",
      `Child name: ${data.childName}`,
      `Age: ${data.age}`,
      `Gender: ${data.gender}`,
      `Sport: ${data.sport}`,
      `Contact number: ${data.contact}`,
      data.notes ? `Notes: ${data.notes}` : ""
    ].filter(Boolean).join("\n");
  };

  const getFormData = () => {
    const childName = (($("#childName") && $("#childName").value) || "").trim();
    const age = (($("#age") && $("#age").value) || "").trim();
    const gender = (($("#gender") && $("#gender").value) || "").trim();
    const sport = (($("#sport") && $("#sport").value) || "").trim();
    const contact = (($("#contact") && $("#contact").value) || "").trim();
    const notes = (($("#notes") && $("#notes").value) || "").trim();
    return { childName, age, gender, sport, contact, notes };
  };

  const validate = (d) => {
    return Boolean(d.childName && d.age && d.gender && d.sport && d.contact);
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      const lang = document.documentElement.lang || "en";
      const d = getFormData();

      if (!validate(d)) {
        e.preventDefault();
        if (status) status.textContent = translations[lang]["form.invalid"];
        return;
      }

      // Keep default submit (to hidden iframe), but show instant UI feedback
      if (status) status.textContent = translations[lang]["form.sending"];
      if (submitBtn) submitBtn.disabled = true;

      // Prepare WhatsApp copy button
      const text = encodeURIComponent(buildWhatsAppText(d, lang));
      const waUrl = `https://wa.me/${academyPhone}?text=${text}`;
      if (waBtn) {
        waBtn.href = waUrl;
        waBtn.classList.remove("hidden");
      }

      // Success message after short delay (we can't reliably detect cross-origin iframe completion)
      window.setTimeout(() => {
        if (status) status.textContent = translations[lang]["form.sent"];
        if (submitBtn) submitBtn.disabled = false;
        // Gentle reset keeps fields? better keep for user confidence; do partial reset after message
      }, 900);
    });
  }

  // ------- Gallery Carousel (mobile-safe + infinite loop) -------
  const carousel = $("#galleryCarousel");
  if (carousel) {
    const inner = $(".carousel-inner", carousel);
    const baseItems = $$(".carousel-item", carousel);
    const prevBtn = $("[data-carousel-prev]", carousel);
    const nextBtn = $("[data-carousel-next]", carousel);

    if (!inner || baseItems.length < 2) return;

    const getPerView = () => window.matchMedia("(min-width: 992px)").matches ? 2 : 1;

    let perView = getPerView();
    let itemCount = baseItems.length;
    let itemWidth = carousel.clientWidth / perView;
    let currentIndex = perView;
    let autoplayTimer = null;
    const AUTOPLAY_INTERVAL = 4000;
    let isTransitioning = false;
    let touchStartX = 0;
    let resizeTimer = null;

    const clearClones = () => {
      $$(".carousel-item.is-clone", inner).forEach((node) => node.remove());
    };

    const setPosition = (smooth = true) => {
      inner.classList.toggle("smooth", smooth);
      inner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    const setupLoop = () => {
      clearClones();
      perView = getPerView();
      const realItems = $$(".carousel-item:not(.is-clone)", inner);
      itemCount = realItems.length;
      itemWidth = carousel.clientWidth / perView;

      const head = realItems.slice(0, perView).map((node) => {
        const clone = node.cloneNode(true);
        clone.classList.add("is-clone");
        clone.setAttribute("aria-hidden", "true");
        return clone;
      });
      const tail = realItems.slice(-perView).map((node) => {
        const clone = node.cloneNode(true);
        clone.classList.add("is-clone");
        clone.setAttribute("aria-hidden", "true");
        return clone;
      });

      head.forEach((clone) => inner.appendChild(clone));
      tail.reverse().forEach((clone) => inner.insertBefore(clone, inner.firstChild));

      currentIndex = perView;
      setPosition(false);
    };

    const startAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => moveTo(currentIndex + 1), AUTOPLAY_INTERVAL);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = null;
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    const moveTo = (nextIndex) => {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = nextIndex;
      setPosition(true);
      restartAutoplay();
    };

    inner.addEventListener("transitionend", () => {
      if (currentIndex >= itemCount + perView) {
        currentIndex = perView;
        setPosition(false);
      } else if (currentIndex < perView) {
        currentIndex = itemCount + perView - 1;
        setPosition(false);
      }
      isTransitioning = false;
    });

    if (prevBtn) prevBtn.addEventListener("click", () => moveTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => moveTo(currentIndex + 1));

    // Mobile: swipe without live dragging to prevent showing side images.
    inner.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    inner.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      const threshold = 36;
      if (Math.abs(diff) > threshold) {
        moveTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      } else {
        setPosition(true);
        restartAutoplay();
      }
    }, { passive: true });

    // Ensure cloned nodes still open lightbox.
    carousel.addEventListener("click", (e) => {
      const cloneBtn = e.target.closest(".carousel-item.is-clone");
      if (!cloneBtn) return;
      const src = cloneBtn.getAttribute("data-lightbox");
      if (src) openLightbox(src);
    });

    window.addEventListener("resize", () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setupLoop(), 120);
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    setupLoop();
    startAutoplay();
  }

})();

