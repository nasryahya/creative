/* Base behavior: language, reveal, nav, lightbox, form, lazy iframes */
(() => {
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  const header = $("#header");
  // set CSS header offset variable dynamically to match actual header height
  const setHeaderOffset = () => {
    try {
      const h = header ? header.offsetHeight : 0;
      document.documentElement.style.setProperty('--header-offset', h + 'px');
    } catch (err) { /* ignore */ }
  };
  // apply on load and resize (debounced)
  setHeaderOffset();
  let __ro_timer = null;
  window.addEventListener('resize', () => {
    if (__ro_timer) clearTimeout(__ro_timer);
    __ro_timer = setTimeout(setHeaderOffset, 120);
  });
  const nav = $(".nav");
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");
  const navBackdrop = $("#navBackdrop");
  const langToggle = $("#langToggle");
  const langPill = $("#langPill");

  
  const isMobile = () => window.matchMedia("(max-width: 991.98px)").matches;
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxClose = $("#lightboxClose");

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Cross-page navigation between main/programs/girls-only should replace history entry.
  const wireReplaceNavigation = () => {
    $$("a[href]").forEach((a) => {
      const raw = a.getAttribute("href") || "";
      if (!raw || raw.startsWith("#")) return;
      if (!/(^|\/)(index|programs|girls-only)\.html(#.*)?$/i.test(raw)) return;
      if (a.target && a.target.toLowerCase() === "_blank") return;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const urlObj = new URL(raw, window.location.href);
        const currentLang = document.documentElement.lang === "ar" ? "ar" : "en";
        urlObj.searchParams.set("lang", currentLang);
        const url = urlObj.toString();
        window.location.replace(url);
      });
    });
  };
  wireReplaceNavigation();

  // ------- i18n -------
  const translations = {
    en: {
      "nav.about":"About",
      "nav.girlsPage":"Girls Only",
      "nav.programs":"Programs",
      "nav.coaches":"Coaches",
      "nav.gallery":"Gallery",
      "nav.media":"Media",
      "nav.contact":"Contact",
      "nav.home":"Home",
      "nav.backToMain":"Main page",
      "header.cta":"Register",

      "hero.eyebrow":"Qatar • Doha • Al Sadd",
      "hero.title":"Where creativity begins\nChampions are made",
      "hero.sub":"Professional football & basketball training for children in a safe environment.",
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
      "about.m1t":"Players Trained",
      "about.m1s":"Professionally trained with modern methods.",
      "about.m2t":"Years of Experience",
      "about.m2s":"Structured coaching built on proven development plans.",
      "about.m3chip":"Girls Only",
      "about.m3t":"Specialized Training for Girls",
      "about.m3s":"Private sessions led by qualified female coaches.",
      "about.cta1":"Explore programs",
      "about.cta2":"Privacy policy",
      "about.story":"At Creativity Sports Academy in Al Sadd, football and basketball training are a core path to build confidence, discipline, and strong character from an early age.",
      "about.p1":"We celebrate effort before results, reward commitment, and help every child take confident steps toward a stronger athletic future.",
      "about.p2":"Every session combines professional coaching, safety, motivation, and enjoyment to create future leaders on and off the field.",

      "programs.title":"Programs",
      "programs.sub":"Specialized football & basketball training for children — starting from 4 years old.",
      "programs.overview.sub":"Quick look at our football and basketball programs. Full details are available on a dedicated page.",
      "programs.overview.football.text":"A structured path for skills, movement, teamwork, and confidence building.",
      "programs.overview.basketball.text":"Focused sessions to build technical skills, discipline, and game awareness.",
      "programs.side.title":"Why parents choose our academy",
      "programs.side.sub":"We combine safety, discipline, and motivation in every session to help children grow with confidence.",
      "programs.side.l1":"Professional coaching for children.",
      "programs.side.l2":"Girls-only sessions with full privacy.",
      "programs.side.l3":"Focus on character before competition.",
      "programs.side.cta":"Start registration",
      "programs.detailsLink":"View full details",
      "programs.detailsCta":"Open detailed programs page",
      "concerns.title":"Is your child struggling with confidence or focus?",
      "concerns.sub":"Many parents in Doha tell us the same thing: their child is shy, distracted, or spends too much time on screens. Our training turns that into discipline, confidence, and healthy habits.",
      "concerns.painTitle":"What parents notice",
      "concerns.pain1":"Shy or quiet in social situations?",
      "concerns.pain2":"Low confidence and avoids challenges?",
      "concerns.pain3":"Too much screen time and low activity?",
      "concerns.pain4":"Needs structure and discipline?",
      "concerns.solutionTitle":"What your child gains",
      "concerns.solution1":"Confidence & communication",
      "concerns.solution2":"Discipline & focus",
      "concerns.solution3":"Teamwork & respect",
      "concerns.solution4":"Fitness & healthy routine",
      "concerns.cta":"Start Registration",
      "concerns.ctaAlt":"Book Free Trial",
      "journey.title":"Your child’s progress journey",
      "journey.sub":"We don’t just train — we build habits and skills step by step, with age-based groups and clear milestones.",
      "journey.m1month":"Month 1 — Foundation",
      "journey.m1text":"Basic coordination, rules, and confidence in movement.",
      "journey.m3month":"Month 3 — Team Interaction",
      "journey.m3text":"Communication, teamwork, and discipline in sessions.",
      "journey.m6month":"Month 6 — Skill Growth",
      "journey.m6text":"Stronger technique, game awareness, and consistency.",
      "journey.m9month":"Month 9 — Match Readiness",
      "journey.m9text":"Better decisions, leadership, and competitive mindset.",
      "journey.cta":"Start Registration",
      "journey.ctaAlt":"Book Assessment",
      "programs.page.title":"Detailed Programs",
      "programs.page.sub":"Explore our full football and basketball pathways, training focus, and development goals for children.",
      "programs.football.title":"Football Training",
      "programs.football.text":"Professional football training for children — skills, discipline, and teamwork through modern, safe methods.",
      "programs.football.d1":"Ball control, passing, dribbling, and finishing fundamentals.",
      "programs.football.d2":"Decision-making drills and small-sided games for game intelligence.",
      "programs.football.d3":"Physical conditioning suitable for each age group.",
      "programs.football.skills.title":"Key football skills",
      "programs.football.skills.1":"Accurate passing and first touch under pressure.",
      "programs.football.skills.2":"1v1 attacking and defending basics.",
      "programs.football.skills.3":"Game positioning and movement without the ball.",
      "programs.football.gains.title":"What your child gains",
      "programs.football.gains.1":"Higher confidence and positive self-expression.",
      "programs.football.gains.2":"Discipline, focus, and responsibility habits.",
      "programs.football.gains.3":"Stronger teamwork and communication.",
      "programs.basketball.title":"Basketball Training",
      "programs.basketball.text":"Specialized basketball programs for children — skill building, confidence, and leadership in a supportive environment.",
      "programs.basketball.d1":"Dribbling, passing, shooting mechanics, and defensive movement.",
      "programs.basketball.d2":"Coordination and footwork through structured skill stations.",
      "programs.basketball.d3":"Team concepts, communication, and positive competitiveness.",
      "programs.basketball.skills.title":"Key basketball skills",
      "programs.basketball.skills.1":"Ball handling with both hands and control in motion.",
      "programs.basketball.skills.2":"Correct shooting form and finishing around the basket.",
      "programs.basketball.skills.3":"Defensive stance, footwork, and quick reaction.",
      "programs.basketball.gains.title":"What your child gains",
      "programs.basketball.gains.1":"Better coordination and body balance.",
      "programs.basketball.gains.2":"Patience, consistency, and performance mindset.",
      "programs.basketball.gains.3":"Leadership, respect, and team commitment.",
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
      "coaches.sub":"Our coaching team is highly professional and performs at the highest level.",
      "coaches.c1n":"Coach Adam",
      "coaches.c1r":"Football • Kids development",
      "coaches.c2n":"Coach Brian",
      "coaches.c2r":"Basketball • Skills training",
      "coaches.c3n":"Coach Grace",
      "coaches.c3r":"Girls sessions • Female coach",
      "coaches.c4n":"Coach Faris",
      "coaches.c4r":"Fitness • Coordination",

      "gallery.title":"Gallery",
      "gallery.sub":"A glimpse into our training environment and activities.",

      "register.badge":"Book a Free Trial",
      "register.title":"Register",
      "register.sub":"Quick booking form for football and basketball training.",
      "register.promise":"We reply fast on WhatsApp — usually within 2 hours (during working hours).",

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
      "form.requiredNote":"Fields marked with * are required.",
      "form.sendWhatsApp":"Send via WhatsApp",
      "form.sendEmail":"Send via Email",
      "form.submit":"Send via Email",
      "form.whatsappCopy":"Send copy via WhatsApp",
      "form.trust":"No spam — we only use your number to contact you about training.",
      "form.privacyNote":"By submitting, you agree to our",
      "form.privacyLink":"Privacy Policy",
      "form.openingWhatsApp":"Opening WhatsApp...",
      "form.sending":"Sending…",
      "form.sent":"Sent via email successfully.",
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
      "ready.kicker":"Ready to Start?",
      "ready.title":"Join the academy and build skill, confidence, and discipline.",
      "ready.btn":"Book Now",
      "footer.desc":"Professional football and basketball training for children in Doha.",
      "footer.quick.title":"Quick Links",
      "footer.quick.home":"Home",
      "footer.quick.about":"About",
      "footer.quick.programs":"Programs",
      "footer.quick.girls":"Girls Only",
      "footer.quick.register":"Register",
      "footer.contact.title":"Contact",
      "footer.contact.location":"Doha - Al Sadd",
      "footer.contact.whatsapp":"WhatsApp: +974 50149045",
      "footer.contact.email":"Email: nasryahia474@gmail.com",
      "footer.hours.title":"Training Hours",
      "footer.hours.weekdays":"Sun - Thu: 4:00 PM - 9:00 PM",
      "footer.hours.friday":"Friday: 3:00 PM - 8:00 PM",
      "footer.hours.saturday":"Saturday: 9:00 AM - 1:00 PM",
      "footer.rights":"© 2026 Creativity Sports Academy - All rights reserved.",

      "footer.sub":"Al Sadd • Doha • Qatar",
      "footer.privacy":"Privacy",
      "footer.whatsapp":"WhatsApp",
    },

    ar: {
      "nav.about":"من نحن",
      "nav.girlsPage":"قسم البنات",
      "nav.programs":"البرامج",
      "nav.coaches":"المدربين",
      "nav.gallery":"المعرض",
      "nav.media":"ميديا",
      "nav.contact":"تواصل",
      "nav.home":"الرئيسية",
      "nav.backToMain":"العودة للرئيسية",
      "header.cta":"سجّل الآن",

      "hero.eyebrow":"قطر • الدوحة • السد",
      "hero.title":"هنا يبدأ الإبداع\nويُصنع الأبطال",
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
      "about.m1t":"لاعب تم تدريبه",
      "about.m1s":"تدريب احترافي بأساليب حديثة وتطوير مستمر.",
      "about.m2t":"سنوات خبرة",
      "about.m2s":"منهج تدريبي منظم قائم على خبرة عملية طويلة.",
      "about.m3chip":"Girls Only",
      "about.m3t":"تدريب مخصص للفتيات",
      "about.m3s":"جلسات خاصة بإشراف مدربات محترفات وبخصوصية كاملة.",
      "about.cta1":"استكشف البرامج",
      "about.cta2":"سياسة الخصوصية",
      "about.story":"في أكاديمية الإبداع الرياضي بالسد، يشكّل تدريب كرة القدم وكرة السلة مساراً أساسياً لبناء الثقة والانضباط وصناعة شخصية قوية منذ الصغر.",
      "about.p1":"نحتفل بالجهد قبل النتيجة، ونكرّم الالتزام، ونساعد كل طفل على التقدم بثبات نحو مستقبل رياضي أقوى.",
      "about.p2":"كل حصة تجمع بين التدريب الاحترافي، الأمان، التحفيز، والمتعة لصناعة قادة المستقبل داخل الملعب وخارجه.",

      "programs.title":"البرامج",
      "programs.sub":"برامج متخصصة لكرة القدم وكرة السلة للأطفال — ابتداءً من عمر 4 سنوات.",
      "programs.overview.sub":"لمحة سريعة عن برامج كرة القدم وكرة السلة. التفاصيل الكاملة متاحة في صفحة مستقلة.",
      "programs.overview.football.text":"مسار تدريبي منظم لتطوير المهارات والحركة وروح الفريق والثقة.",
      "programs.overview.basketball.text":"حصص مركزة لبناء المهارات الفنية والانضباط وفهم اللعب.",
      "programs.side.title":"لماذا يختار الأهالي أكاديميتنا",
      "programs.side.sub":"نجمع بين الأمان، الانضباط، والتحفيز في كل حصة لمساعدة الأطفال على النمو بثقة.",
      "programs.side.l1":"تدريب احترافي مخصص للأطفال.",
      "programs.side.l2":"جلسات للبنات فقط مع خصوصية كاملة.",
      "programs.side.l3":"تركيز على بناء الشخصية قبل المنافسة.",
      "programs.side.cta":"ابدأ التسجيل",
      "programs.detailsLink":"عرض التفاصيل الكاملة",
      "programs.detailsCta":"فتح صفحة البرامج التفصيلية",
      "concerns.title":"هل طفلك يحتاج دعماً في الثقة أو التركيز؟",
      "concerns.sub":"كثير من الأهالي في الدوحة يشاركوننا نفس الملاحظات: الطفل خجول، مشتت، أو يقضي وقتاً طويلاً أمام الشاشات. تدريبنا يحوّل ذلك إلى انضباط وثقة وعادات صحية.",
      "concerns.painTitle":"ماذا يلاحظ الأهالي",
      "concerns.pain1":"خجول أو هادئ في المواقف الاجتماعية؟",
      "concerns.pain2":"ثقة منخفضة ويتجنب التحديات؟",
      "concerns.pain3":"وقت شاشات كثير ونشاط بدني أقل؟",
      "concerns.pain4":"يحتاج إلى تنظيم وانضباط؟",
      "concerns.solutionTitle":"ماذا يكتسب طفلك",
      "concerns.solution1":"ثقة وتواصل أفضل",
      "concerns.solution2":"انضباط وتركيز",
      "concerns.solution3":"عمل جماعي واحترام",
      "concerns.solution4":"لياقة وعادات صحية",
      "concerns.cta":"ابدأ التسجيل",
      "concerns.ctaAlt":"احجز تجربة مجانية",
      "journey.title":"رحلة تطور طفلك",
      "journey.sub":"لا نقدّم حصصاً فقط، بل نبني عادات ومهارات خطوة بخطوة ضمن مجموعات عمرية واضحة ومراحل تطوير محددة.",
      "journey.m1month":"الشهر 1 — التأسيس",
      "journey.m1text":"تناسق حركي أساسي، قواعد التدريب، وثقة أولية في الحركة.",
      "journey.m3month":"الشهر 3 — التفاعل الجماعي",
      "journey.m3text":"تواصل أفضل، عمل جماعي، وانضباط داخل الحصص.",
      "journey.m6month":"الشهر 6 — نمو المهارة",
      "journey.m6text":"تكنيك أقوى، فهم أفضل للعب، واستمرارية في الأداء.",
      "journey.m9month":"الشهر 9 — جاهزية المباريات",
      "journey.m9text":"قرارات أفضل، قيادة أكبر، وعقلية تنافسية متزنة.",
      "journey.cta":"ابدأ التسجيل",
      "journey.ctaAlt":"احجز تقييم",
      "programs.page.title":"البرامج التفصيلية",
      "programs.page.sub":"تعرّف على تفاصيل برامج كرة القدم وكرة السلة وأهداف التطوير لكل فئة عمرية.",
      "programs.football.title":"تدريب كرة القدم",
      "programs.football.text":"تدريب احترافي للأطفال لتطوير المهارات والانضباط وروح الفريق بأسلوب حديث وآمن.",
      "programs.football.d1":"أساسيات التحكم بالكرة والتمرير والمراوغة وإنهاء الهجمات.",
      "programs.football.d2":"تدريبات اتخاذ القرار وألعاب مصغرة لرفع ذكاء اللعب.",
      "programs.football.d3":"إعداد بدني مناسب لكل مرحلة عمرية.",
      "programs.football.skills.title":"مهارات كرة القدم الأساسية",
      "programs.football.skills.1":"دقة التمرير والاستلام الأول تحت الضغط.",
      "programs.football.skills.2":"أساسيات المواجهات الفردية 1 ضد 1 هجومًا ودفاعًا.",
      "programs.football.skills.3":"التمركز الصحيح والتحرك بدون كرة.",
      "programs.football.gains.title":"ماذا سيكتسب طفلك",
      "programs.football.gains.1":"ثقة أعلى بالنفس وقدرة أفضل على التعبير الإيجابي.",
      "programs.football.gains.2":"عادات الانضباط والتركيز وتحمل المسؤولية.",
      "programs.football.gains.3":"روح فريق أقوى وتواصل أفضل مع الآخرين.",
      "programs.basketball.title":"تدريب كرة السلة",
      "programs.basketball.text":"برامج متخصصة للأطفال لبناء المهارات والثقة والقيادة في بيئة داعمة.",
      "programs.basketball.d1":"المراوغة والتمرير والتصويب والتحرك الدفاعي بشكل صحيح.",
      "programs.basketball.d2":"تطوير التناسق والعمل الحركي عبر محطات تدريبية منظمة.",
      "programs.basketball.d3":"بناء مفاهيم اللعب الجماعي والتواصل وروح المنافسة الإيجابية.",
      "programs.basketball.skills.title":"مهارات كرة السلة الأساسية",
      "programs.basketball.skills.1":"التحكم بالكرة بكلتا اليدين أثناء الحركة.",
      "programs.basketball.skills.2":"أساسيات التصويب الصحيح وإنهاء الهجمة قرب السلة.",
      "programs.basketball.skills.3":"وضعية الدفاع الصحيحة وحركة القدمين وسرعة الاستجابة.",
      "programs.basketball.gains.title":"ماذا سيكتسب طفلك",
      "programs.basketball.gains.1":"تناسق حركي أفضل وتوازن بدني أعلى.",
      "programs.basketball.gains.2":"الصبر والاستمرارية وعقلية الأداء المنضبط.",
      "programs.basketball.gains.3":"القيادة والاحترام والالتزام داخل الفريق.",
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
      "coaches.sub":"نمتلك فريقًا من المدربين المحترفين يعمل وفق أعلى المعايير.",
      "coaches.c1n":"المدرب آدم",
      "coaches.c1r":"كرة قدم • تطوير الأطفال",
      "coaches.c2n":"المدرب براين",
      "coaches.c2r":"كرة سلة • تطوير المهارات",
      "coaches.c3n":"المدربة غريس",
      "coaches.c3r":"جلسات البنات • مدربة محترفة",
      "coaches.c4n":"المدرب فارس",
      "coaches.c4r":"لياقة • تناسق وحركة",

      "gallery.title":"المعرض",
      "gallery.sub":"لمحة عن بيئة التدريب والأنشطة.",

      "register.badge":"احجز حصة تجريبية مجانية",
      "register.title":"التسجيل",
      "register.sub":"نموذج حجز سريع لتدريب كرة القدم وكرة السلة.",
      "register.promise":"نرد بسرعة على واتساب، غالباً خلال ساعتين (خلال أوقات العمل).",

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
      "form.requiredNote":"الحقول المعلّمة بـ * مطلوبة.",
      "form.sendWhatsApp":"إرسال عبر واتساب",
      "form.sendEmail":"إرسال عبر الإيميل",
      "form.submit":"إرسال عبر الإيميل",
      "form.whatsappCopy":"إرسال نسخة عبر واتساب",
      "form.trust":"بدون إزعاج — نستخدم رقمك فقط للتواصل معك بخصوص التدريب.",
      "form.privacyNote":"بالإرسال أنت توافق على",
      "form.privacyLink":"سياسة الخصوصية",
      "form.openingWhatsApp":"جاري فتح واتساب...",
      "form.sending":"جارٍ الإرسال…",
      "form.sent":"تم الإرسال عبر الإيميل بنجاح.",
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
      "ready.kicker":"جاهز للانطلاق؟",
      "ready.title":"انضم للأكاديمية وابنِ المهارة والثقة والانضباط.",
      "ready.btn":"احجز الآن",
      "footer.desc":"تدريب احترافي لكرة القدم وكرة السلة للأطفال في الدوحة.",
      "footer.quick.title":"روابط سريعة",
      "footer.quick.home":"الرئيسية",
      "footer.quick.about":"عن الأكاديمية",
      "footer.quick.programs":"البرامج",
      "footer.quick.girls":"قسم البنات",
      "footer.quick.register":"التسجيل",
      "footer.contact.title":"تواصل",
      "footer.contact.location":"الدوحة - السد",
      "footer.contact.whatsapp":"واتساب: +974 50149045",
      "footer.contact.email":"البريد: nasryahia474@gmail.com",
      "footer.hours.title":"أوقات التدريب",
      "footer.hours.weekdays":"الأحد - الخميس: 4:00 م - 9:00 م",
      "footer.hours.friday":"الجمعة: 3:00 م - 8:00 م",
      "footer.hours.saturday":"السبت: 9:00 ص - 1:00 م",
      "footer.rights":"© 2026 Creativity Sports Academy - جميع الحقوق محفوظة.",

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

  const pagePath = (window.location.pathname || "").toLowerCase();
  const hasDedicatedPageI18n = /(?:^|\/)(programs|girls-only)\.html$/.test(pagePath);

  // programs.html and girls-only.html manage language switching with page-specific scripts.
  if (!hasDedicatedPageI18n) {
    const initialLang = (() => {
      try {
        const qs = new URLSearchParams(window.location.search);
        const qLang = qs.get("lang");
        if (qLang === "ar" || qLang === "en") return qLang;
      } catch {}
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
  }

  // ------- Header scroll state (glass -> solid) -------
  const setHeaderScrolled = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  // ------- Mobile menu -------
  const setMenuOpen = (open) => {
    if (navToggle) navToggle.setAttribute("aria-expanded", String(open));
    if (nav) nav.classList.toggle("is-open", open);
    if (navMenu) navMenu.classList.toggle("open", open);
    // Visual open state only (no scroll lock in CSS).
    document.body.classList.toggle("menu-open", open);
    document.documentElement.classList.toggle("menu-open", open);
    if (navBackdrop) navBackdrop.classList.toggle("active", open);
  };
  // Ensure no stale overlay/lock state survives refresh or route changes.
  setMenuOpen(false);
  window.addEventListener("pageshow", () => setMenuOpen(false));
  if (navToggle) {
    navToggle.addEventListener("click", (e) => {
      if (isMobile()) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "menu.html";
        return;
      }
      e.stopPropagation();
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
    navMenu.addEventListener("click", (e) => e.stopPropagation());
    // Close menu on any in-menu link (not only .nav-link) to avoid stuck body scroll lock.
    $$("a[href]", navMenu).forEach((a) => {
      a.addEventListener("click", () => setMenuOpen(false));
    });
  }

  // Safety: if hash navigation or desktop resize occurs, ensure menu lock is cleared.
  window.addEventListener("hashchange", () => setMenuOpen(false));
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) setMenuOpen(false);
  });
  // No global scroll lock: keep touch scrolling native.

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

  // ------- About counters -------
  const counterNodes = $$(".count-up");
  const runCounter = (el) => {
    if (!el || el.dataset.counted === "true") return;
    const to = Number(el.getAttribute("data-count-to") || "0");
    const duration = Number(el.getAttribute("data-count-duration") || "1400");
    if (!Number.isFinite(to) || to <= 0) return;

    const locale = document.documentElement.lang === "ar" ? "ar" : "en-US";
    const startAt = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min(1, (now - startAt) / duration);
      const value = Math.round(to * easeOut(progress));
      el.textContent = value.toLocaleString(locale);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = to.toLocaleString(locale);
        el.dataset.counted = "true";
      }
    };
    requestAnimationFrame(tick);
  };

  if (counterNodes.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      counterNodes.forEach((el) => {
        const to = Number(el.getAttribute("data-count-to") || "0");
        const locale = document.documentElement.lang === "ar" ? "ar" : "en-US";
        el.textContent = Number.isFinite(to) ? to.toLocaleString(locale) : "0";
        el.dataset.counted = "true";
      });
    } else {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      counterNodes.forEach((el) => counterObserver.observe(el));
    }
  }

  // On-load reveal (first section without waiting for scroll)
  window.addEventListener("load", () => {
    const onLoadItems = $$(".reveal.on-load");
    onLoadItems.forEach((el, i) => {
      window.setTimeout(() => el.classList.add("is-visible"), 120 + i * 80);
    });
  });

  // ------- Active nav on scroll -------
  const sections = ["about","programs","football-program","basketball-program","coaches","gallery","media","contact","register"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = $$(".nav-link");
  const setActive = (id) => {
    navLinks.forEach((l) => {
      const isActive = l.getAttribute("data-nav") === id;
      l.classList.toggle("active", isActive);
      if (isActive) l.setAttribute("aria-current", "page");
      else l.removeAttribute("aria-current");
    });
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
    const isPhoneView = window.matchMedia("(max-width: 991.98px)").matches;
    if (isPhoneView) {
      lazyIframes.forEach(loadIframe);
    } else if (!prefersReduced && "IntersectionObserver" in window) {
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
  const waBtn = $("#waSendBtn");
  const submitBtn = $("#emailSubmitBtn");

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
    if (waBtn) {
      waBtn.addEventListener("click", (e) => {
        const lang = document.documentElement.lang || "en";
        const d = getFormData();
        if (!validate(d)) {
          e.preventDefault();
          if (status) status.textContent = translations[lang]["form.invalid"];
          return;
        }
        const text = encodeURIComponent(buildWhatsAppText(d, lang));
        waBtn.href = `https://wa.me/${academyPhone}?text=${text}`;
        if (status) status.textContent = translations[lang]["form.openingWhatsApp"];
      });
    }

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
