/* ===================================================================
   SKILLS PASSPORT (স্কিলস পাসপোর্ট) - CORE APPLICATION LOGIC
   Features: 3D Tilt, Passport Generator, Full Language Engine (BN/EN),
   Web Audio Synthesizer, Workshop Filter & Registration Modal, B2B MoU
   =================================================================== */

// Sound FX Synthesizer using Web Audio API
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playBeep(freq = 600, type = 'sine', duration = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playChime() {
    if (!this.enabled) return;
    this.playBeep(520, 'triangle', 0.12);
    setTimeout(() => this.playBeep(780, 'sine', 0.18), 70);
  }

  playFlip() {
    if (!this.enabled) return;
    this.playBeep(340, 'sine', 0.1);
    setTimeout(() => this.playBeep(480, 'sine', 0.12), 60);
  }
}

const sfx = new SoundFX();

// ===================================================================
// COMPREHENSIVE BILINGUAL TRANSLATION DICTIONARY
// ===================================================================
const i18n = {
  bn: {
    // Navbar
    nav_home: "হোম",
    nav_brand_tagline: "HI × AI আপস্কিলিং",
    nav_objectives: "অবজেকটিভস",
    nav_framework: "HI + AI মডেল",
    nav_generator: "পাসপোর্ট আইডি",
    nav_pathways: "পাথওয়েজ",
    nav_workshops: "লাইভ ওয়ার্কশপ",
    nav_partners: "MoU ও পার্টনারস",
    nav_community: "কমিউনিটি",
    nav_cta: "পাসপোর্ট তৈরি করুন",

    // Hero Section
    hero_badge: "হিউম্যান ইন্টেলিজেন্স × আর্টিফিশিয়াল ইন্টেলিজেন্স",
    hero_title: "ফিউচার-রেডি ক্যারিয়ারের <span class='gradient-text'>ডিজিটাল পাসপোর্ট</span>",
    hero_desc: "ইন্ডাস্ট্রি ও একাডেমিয়ার গ্যাপ কমিয়ে ফ্রেশ গ্র্যাজুয়েট এবং ইয়াং প্রফেশনালদের এআই-চালিত আধুনিক জব মার্কেটের জন্য নিখুঁতভাবে আপস্কিল করতে স্কিলস পাসপোর্ট প্রস্তুত। হার্ড স্কিল এবং ইমোশনাল ইন্টেলিজেন্সের অনন্য সমন্বয়।",
    hero_btn_explore: "ওয়ার্কশপ এক্সপ্লোর করুন",
    hero_btn_pass: "আপনার পাসপোর্ট প্রিভিউ",
    hero_stats_label: "ঢাকা ও বাংলাদেশের প্রথম সমন্বিত HI + AI ক্যারিয়ার ইকোসিস্টেম",
    hero_stats_sub: "৫,০০০+ তরুণ প্রফেশনাল কমিউনিটি ড্রাইভ",
    hero_card_flip_prompt: "ক্লিক করুন (Flip to view Skill Matrix)",

    // Metrics Ribbon
    metric_community: "১০,০০০+",
    metric_community_label: "কমিউনিটি টার্গেট মেম্বার",
    metric_workshops: "৪+",
    metric_workshops_label: "প্রতি মাসে লাইভ ওয়ার্কশপ",
    metric_partners: "B2B & MoU",
    metric_partners_label: "স্কুল, BECPS ও SME ফাউন্ডেশন",
    metric_blend: "১০০%",
    metric_blend_label: "ইন্ডাস্ট্রি-অ্যালাইন্ড স্কিলস",

    // Core Objectives
    obj_badge: "আমরা কেন কাজ করছি?",
    obj_title: "কোর অবজেকটিভস <span class='gradient-text'>ও মিশন</span>",
    obj_subtitle: "আমাদের প্রতিটি পদক্ষেপের লক্ষ্য বাংলাদেশের তরুণ প্রজন্মকে গ্লোবাল স্ট্যান্ডার্ডে উন্নীত করা।",

    obj_1_title: "ইন্ডাস্ট্রি-একাডেমিয়া গ্যাপ কমানো",
    obj_1_desc: "ফ্রেশ গ্র্যাজুয়েট ও তরুণদের এমনভাবে আপস্কিল করা, যা সরাসরি বর্তমান এআই-ড্রিভেন বাস্তব জব মার্কেটের চাহিদার সাথে মিলে যায়।",
    obj_1_f1: "মার্কেট-রেডি প্র্যাকটিক্যাল কারিকুলাম",
    obj_1_f2: "রিয়েল-ওয়ার্ল্ড প্রজেক্ট ও পোর্টফোলিও",
    obj_1_f3: "টপ ইন্ডাস্ট্রি মেন্টরদের ডিরেক্ট গাইডলাইন",

    obj_2_title: "ফিউচার-রেডি প্রফেশনাল তৈরি",
    obj_2_desc: "শুধু টেকনিক্যাল কোড বা হার্ড স্কিল নয়, বরং ইমোশনাল ইন্টেলিজেন্স (EQ), অ্যাডাপটেবিলিটি ও প্রফেশনাল কমিউনিকেশনের নিখুঁত ব্লেন্ডিং।",
    obj_2_f1: "হাই-ইমপ্যাক্ট বিজনেস কমিউনিকেশন",
    obj_2_f2: "ইমোশনাল রেজিলিয়েন্স ও লিডারশিপ",
    obj_2_f3: "অ্যাডাপটেবিলিটি ও জটিল প্রবলেম সলভিং",

    obj_3_title: "অ্যাক্সেসিবল লার্নিং ইকোসিস্টেম",
    obj_3_desc: "স্কুল ও এনজিও লেভেলের গ্রাসরুট ওয়ার্কশপ থেকে শুরু করে এক্সক্লুসিভ করপোরেট ট্রেনিং পর্যন্ত একটি ধারাবাহিক লার্নিং পাথওয়ে প্রতিষ্ঠা করা।",
    obj_3_f1: "স্কুল ও কলেজ লেভেল ইউথ অ্যাক্টিভেশন",
    obj_3_f2: "এডুকেশনাল সোসাইটি (যেমন- BECPS) পার্টনারশিপ",
    obj_3_f3: "কর্পোরেট হাউজ ও SME ফাউন্ডেশন বুটক্যাম্প",

    // HI + AI Framework
    frame_badge: "স্কিলস পাসপোর্ট মেথডলজি",
    frame_title: "HI + AI <span class='gradient-text'>ফিউশন মডেল</span>",
    frame_desc: "যেখানে মানুষের সহজাত বুদ্ধিমত্তা এবং কৃত্রিম বুদ্ধিমত্তা মিলে তৈরি হয় অনন্য দক্ষতা।",
    frame_hi_title: "সহজাত মানুষের ক্ষমতা (HI)",
    frame_hi_desc: "এআই টুল যত শক্তিশালীই হোক, ডিসিশন মেকিং, লিডারশিপ ও মানুষের সাথে সম্পর্কের জন্য দরকার হাই ইমোশনাল ইন্টেলিজেন্স।",
    frame_hi_s1: "💡 ইমোশনাল ইন্টেলিজেন্স (EQ)",
    frame_hi_s2: "🎯 অ্যাডাপটেবিলিটি (Adaptability)",
    frame_hi_s3: "🗣️ এক্সিকিউটিভ কমিউনিকেশন",
    frame_hi_s4: "🤝 ক্রিয়েটিভ প্রবলেম সলভিং",
    frame_ai_title: "এআই ও অটোমেশন শক্তি (AI)",
    frame_ai_desc: "দৈনন্দিন পুনরাবৃত্তিমূলক কাজ স্বয়ংক্রিয় করা এবং স্মার্ট এআই কো-পাইলট দিয়ে নিজের কার্যক্ষমতা বহুগুণ বাড়িয়ে নেওয়া।",
    frame_ai_s1: "⚡ প্রম্পট ইঞ্জিনিয়ারিং ২.০",
    frame_ai_s2: "📊 ডেটা-ড্রিভেন ইনসাইট",
    frame_ai_s3: "⚙️ ওয়ার্কফ্লো অটোমেশন",
    frame_ai_s4: "🎨 মাল্টিমডাল এআই টুলস",
    frame_result_bar: "🚀 <strong>রেজাল্ট:</strong> ১০ গুণ দ্রুত এক্সিকিউশন + গভীর স্ট্র্যাটেজিক চিন্তাশক্তি = অপ্রতিদ্বন্দ্বী আধুনিক প্রফেশনাল",

    // 3D Passport Generator
    gen_badge: "ইন্টারেক্টিভ টুল",
    gen_title: "আপনার নিজস্ব <span class='cyan-gradient-text'>৩ডি পাসপোর্ট</span> তৈরি করুন",
    gen_subtitle: "আপনার প্রফেশনাল রোল ও টপ স্কিল সিলেক্ট করে লাইভ ডিজিটাল আইডি জেনারেট করুন।",
    gen_label_name: "👤 আপনার নাম (Full Name)",
    gen_label_track: "🎯 আপনার ক্যারিয়ার ট্র্যাক (Career Track)",
    gen_label_skills: "⚡ আপনার শীর্ষ দক্ষতাগুলো সিলেক্ট করুন (Select Skills)",
    gen_btn_issue: "পাসপোর্ট আইডি ইস্যু করুন",
    gen_card_location: "ঢাকা, বাংলাদেশ",

    // Strategic Pathways
    path_badge: "স্ট্র্যাটেজিক পার্টনারশিপ",
    path_title: "কাদের জন্য আমাদের <span class='gradient-text'>পাথওয়েজ?</span>",
    path_subtitle: "B2C শিক্ষার্থী থেকে শুরু করে B2B কর্পোরেট অর্গানাইজেশন পর্যন্ত সবার জন্য কাস্টমাইজড সমাধান।",
    path_tab_1: "🎓 ফ্রেশ গ্র্যাজুয়েট ও তরুণ প্রফেশনাল",
    path_tab_2: "🏫 স্কুল ও এডুকেশনাল সোসাইটি (BECPS)",
    path_tab_3: "🏢 কর্পোরেট অর্গানাইজেশন ও SME ফাউন্ডেশন",

    path_1_title: "ক্যাম্পাস-টু-কর্পোরেট এক্সেলেশন",
    path_1_desc: "বিশ্ববিদ্যালয়ের সনাতনী সিলেবাস ও বর্তমান এআই জবের বাস্তব চাহিদার মধ্যে যে বিস্তর দূরত্ব রয়েছে, তা ঘুচিয়ে দিয়ে আত্মবিশ্বাসী ক্যারিয়ার নিশ্চিত করা।",
    path_1_b1: "প্র্যাকটিক্যাল প্রজেক্ট ও রিয়েল পোর্টফোলিও বিল্ডিং",
    path_1_b2: "এআই ও প্রম্পটিং টুল দিয়ে দ্রুত স্মার্ট আউটপুট বের করা",
    path_1_b3: "ইন্টারভিউ রেজিলিয়েন্স ও কনফিডেন্ট স্পিকিং আর্ট",
    path_1_btn: "ওয়ার্কশপ শিডিউল দেখুন",

    path_2_title: "স্কুল ও সোসাইটি লেভেল পার্টনারশিপ (MoU)",
    path_2_desc: "বিভিন্ন নামকরা স্কুল, কলেজ এবং এডুকেশনাল সোসাইটি (যেমন- BECPS) এর সাথে আনুষ্ঠানিক মেমোরেন্ডাম অব আন্ডারস্ট্যান্ডিং (MoU) স্বাক্ষরের মাধ্যমে তরুণদের শুরু থেকেই ফিউচার-রেডি করা।",
    path_2_b1: "ক্যাম্পাস-ওয়াইড হ্যান্ডস-অন এআই ও স্কিলস বুটক্যাম্প",
    path_2_b2: "স্টুডেন্ট লিডারশিপ ও এডুকেশনাল সোসাইটি এনগেজমেন্ট",
    path_2_b3: "স্কুল টু কর্পোরেট ক্যারিয়ার রোডম্যাপ সেমিনার",
    path_2_btn: "MoU পার্টনারশিপ প্রপোজাল দিন",

    path_3_title: "কর্পোরেট ট্রেইনিং লিডারশিপ ও SME বুটক্যাম্প",
    path_3_desc: "দেশের শীর্ষস্থানীয় করপোরেট হাউজ, স্টার্টআপ এবং প্রতিষ্ঠানগুলোর (যেমন- SME ফাউন্ডেশন) সাথে ট্রেনিং ও মেন্টরশিপ পার্টনার হিসেবে কাজ করে উৎপাদনশীলতা বৃদ্ধি করা।",
    path_3_b1: "কর্পোরেট ওয়ার্কফ্লোতে এআই টুলস ইন্টিগ্রেশন ট্রেইনিং",
    path_3_b2: "এক্সিকিউটিভদের ইমোশনাল ইন্টেলিজেন্স ও টিম লিডারশিপ",
    path_3_b3: "টেইলর-মেড কর্পোরেট আপস্কিলিং কন্ট্রাক্ট ও MoU",
    path_3_btn: "কর্পোরেট ট্রেইনিং রিকোয়েস্ট করুন",

    // Monthly Workshops
    workshops_badge: "রেগুলার শিডিউল",
    workshops_title: "মাসিক ৪টি <span class='gradient-text'>লাইভ ওয়ার্কশপ</span>",
    workshops_subtitle: "প্রতি মাসে সরাসরি অভিজ্ঞ মেন্টরদের সাথে হ্যান্ডস-অন প্র্যাকটিস ও বাস্তব স্কিল ডেভেলপমেন্ট।",
    filter_all: "সবগুলো ওয়ার্কশপ (All)",
    filter_ai: "AI & Automation",
    filter_soft: "ইমোশনাল ইন্টেলিজেন্স (HI)",
    filter_career: "ক্যাম্পাস-টু-কর্পোরেট",
    filter_corporate: "কর্পোরেট স্ট্র্যাটেজি",

    // MoU & Partnerships
    partners_badge: "অফিসিয়াল পার্টনারশিপ",
    partners_title: "কর্পোরেট ও ইনস্টিটিউশনাল <span class='gradient-text'>MoU পোর্টাল</span>",
    partners_desc: "আপনার প্রতিষ্ঠান, স্কুল, ক্লাব বা কর্পোরেট হাউজের সাথে স্কিলস পাসপোর্টের আনুষ্ঠানিক মেমোরেন্ডাম অব আন্ডারস্ট্যান্ডিং (MoU) সাইন করুন।",
    partner_network_label: "স্ট্র্যাটেজিক পার্টনারশিপ নেটওয়ার্ক",
    partner_becps: "BECPS (এডুকেশনাল সোসাইটি)",
    partner_sme: "SME ফাউন্ডেশন (কর্পোরেট ও এন্টারপ্রাইজ)",
    partner_schools: "স্কুল ও কলেজ এলায়েন্স",
    partner_startups: "স্টার্টআপ ইকোসিস্টেম ঢাকা",

    mou_box_title: "কর্পোরেট ও প্রাতিষ্ঠানিক প্রপোজাল সাবমিট করুন",
    mou_box_desc: "আমরা স্কুল, বিশ্ববিদ্যালয়, এডুকেশনাল সোসাইটি (যেমন- BECPS) এবং করপোরেট প্রতিষ্ঠানগুলোর (যেমন- SME ফাউন্ডেশন) চাহিদামতো কাস্টমাইজড ট্রেনিং মডিউল ও আনুষ্ঠানিক MoU বাস্তবায়ন করি।",
    mou_s1_t: "প্রপোজাল রিকোয়েস্ট",
    mou_s1_d: "আপনার প্রতিষ্ঠানের প্রাথমিক তথ্য ও প্রয়োজনীয় স্কিল এরিয়া সিলেক্ট করে সাবমিট করুন।",
    mou_s2_t: "কনসালটেশন ও কারিকুলাম ম্যাপিং",
    mou_s2_d: "আমাদের এক্সিকিউটিভ টিম আপনার সাথে বসে কারিকুলাম ও লক্ষ্য নির্দিষ্ট করবে।",
    mou_s3_t: "আনুষ্ঠানিক MoU সম্পাদন",
    mou_s3_d: "দীর্ঘমেয়াদী আপস্কিলিং ও যৌথ সার্টিফিকেট প্রদানের মাধ্যমে আনুষ্ঠানিক চুক্তি সাইন।",

    form_org_name: "সংস্থার নাম (Organization Name)",
    form_org_type: "অর্গানাইজেশনের ধরন (Type)",
    form_type_society: "Educational Society (যেমন- BECPS)",
    form_type_corp: "Corporate / SME (যেমন- SME Foundation)",
    form_type_school: "School / College",
    form_type_startup: "Tech Startup",
    form_contact: "যোগাযোগকারীর নাম (Contact Person)",
    form_email: "অফিসিয়াল ইমেইল (Official Email)",
    form_phone: "ফোন নম্বর / WhatsApp",
    form_req: "প্রস্তাবনার বিস্তারিত বা ট্রেইনিং রিকোয়ারমেন্ট",
    form_btn_submit: "অফিসিয়াল MoU প্রপোজাল পাঠান",

    // Community
    comm_badge: "আমাদের সাথে যুক্ত হোন",
    comm_title: "স্কিলস পাসপোর্ট <span class='cyan-gradient-text'>কমিউনিটিতে যোগ দিন</span>",
    comm_desc: "আমাদের অফিশিয়াল ফেসবুক পেজ, লিঙ্কডইন ও ইউটিউবে ভ্যালু-ড্রিভেন কন্টেন্ট উপভোগ করুন এবং ৫,০০০+ তরুণ প্রফেশনালদের পরিবারের অংশ হোন।",
    comm_growth_label: "বর্তমান কমিউনিটি গ্রোথ",
    comm_growth_target: "টার্গেট: ১০,০০০ মেম্বার",
    comm_fb_btn: "ফেসবুক পেজ ফলো করুন",
    comm_yt_btn: "ইউটিউব চ্যানেল",
    comm_yt_sub: "লার্নিং ও কেস স্টাডিজ",
    comm_li_btn: "লিঙ্কডইন নেটওয়ার্ক",
    comm_li_sub: "প্রফেশনাল অপরচুনিটি",

    // Footer
    footer_desc: "হিউম্যান ইন্টেলিজেন্স (HI) ও আর্টিফিশিয়াল ইন্টেলিজেন্সের (AI) সমন্বয়ে ফিউচার-রেডি ক্যারিয়ার গড়ে তোলার শীর্ষস্থানীয় এডটেক প্ল্যাটফর্ম।",
    footer_city: "📍 ঢাকা, বাংলাদেশ • Empowering Global Professionals",
    footer_col1_title: "কোর ফিচার",
    footer_col2_title: "ওয়ার্কশপ ও B2B",
    footer_col3_title: "যোগাযোগ",
    footer_back_top: "টপ-এ ফিরে যান ↑",
    footer_copyright: "© 2026 Skills Passport (স্কিলস পাসপোর্ট). সর্বস্বত্ব সংরক্ষিত।",
    footer_tagline_bottom: "Human Intelligence (HI) × Artificial Intelligence (AI) Upskilling Platform",

    // Modal
    modal_badge: "লাইভ ওয়ার্কশপ রেজিস্ট্রেশন",
    modal_sub: "আপনার সিট নিশ্চিত করতে নিচের তথ্যগুলো পূরণ করুন।",
    modal_name: "আপনার পুরো নাম (Full Name)",
    modal_email: "ইমেইল এড্রেস (Email Address)",
    modal_phone: "মোবাইল / WhatsApp নম্বর",
    modal_org: "আপনার বর্তমান প্রফেশন / প্রতিষ্ঠান",
    modal_submit: "রেজিস্ট্রেশন কনফার্ম করুন ও পাস পান",

    // Subpage Deep-Dive Keys (BN)
    step_1: "১",
    step_2: "২",
    step_3: "৩",

    obj_p1_b1_t: "🎯 রিয়েল মার্কেট সিনক্রোনাইজেশন",
    obj_p1_b1_d: "বিশ্ববিদ্যালয়ের সনাতনী কারিকুলাম ও আধুনিক করপোরেট চাহিদার মধ্যে সেতুবন্ধন তৈরি।",
    obj_p1_b2_t: "💻 প্রুফ-অব-ওয়ার্ক ও পোর্টফোলিও",
    obj_p1_b2_d: "সনাতনী সিভির পরিবর্তে হ্যান্ডস-অন এআই প্রজেক্ট ও রিয়েল কেস স্টাডি দিয়ে কাজ প্রদর্শনী।",
    obj_p1_b3_t: "👥 ডিরেক্ট ইন্ডাস্ট্রি মেন্টরশিপ",
    obj_p1_b3_d: "শীর্ষস্থানীয় করপোরেট লিডারদের কাছ থেকে সরাসরি ক্যারিয়ার গাইডলাইন ও প্র্যাকটিস।",

    obj_p2_b1_t: "🗣️ এক্সিকিউটিভ কমিউনিকেশন",
    obj_p2_b1_d: "জটিল আইডিয়া সহজে উপস্থাপন, কনভিন্সিং প্রেজেন্টেশন ও কর্পোরেট নেগোসিয়েশন আর্ট।",
    obj_p2_b2_t: "💡 ইমোশনাল রেজিলিয়েন্স",
    obj_p2_b2_d: "অনিশ্চয়তা ও চাপের মুখে মানসিক স্থিরতা ও সিদ্ধান্ত গ্রহণের দৃঢ় মানসিকতা।",
    obj_p2_b3_t: "⚡ দ্রুত অ্যাডাপটেবিলিটি",
    obj_p2_b3_d: "নতুন প্রযুক্তি বা মার্কেট পরিবর্তনের সাথে দ্রুত খাপ খাইয়ে প্রতিষ্ঠানকে এগিয়ে নেওয়া।",

    obj_p3_b1_t: "🏫 স্কুল ও কলেজ এক্টিভেশন",
    obj_p3_b1_d: "কৈশোর থেকেই যৌক্তিক চিন্তা ও ডিজিটাল লিটারেসির ভিত তৈরি করা।",
    obj_p3_b2_t: "🤝 এডুকেশনাল সোসাইটি (BECPS)",
    obj_p3_b2_d: "যুব ও সামাজিক সংগঠনগুলোর সাথে যৌথ আপস্কিলিং ড্রাইভ ও সেমিনার।",
    obj_p3_b3_t: "🏢 কর্পোরেট লিডারশিপ ও SME",
    obj_p3_b3_d: "SME ফাউন্ডেশন ও করপোরেট টিমগুলোর প্রোডাক্টিভিটি ১০ গুণ বাড়ানোর বিশেষ বুটক্যাম্প।",

    obj_comp_title: "সনাতনী শিক্ষা বনাম স্কিলস পাসপোর্ট মডেল",
    obj_comp_desc: "কেন চিরাচরিত একাডেমিয়া একা বর্তমান এআই যুগের জন্য যথেষ্ট নয় এবং স্কিলস পাসপোর্ট কীভাবে এই শূন্যতা পূরণ করে:",
    obj_th_1: "মূল মাপকাঠি",
    obj_th_2: "সনাতনী একাডেমিয়া মডেল",
    obj_th_3: "স্কিলস পাসপোর্ট (HI + AI)",
    obj_tr1_c1: "লার্নিং অ্যাপ্রোচ",
    obj_tr1_c2: "তত্ত্ব ও মুখস্থ নির্ভর সিলেবাস",
    obj_tr1_c3: "রিয়েল-ওয়ার্ল্ড কেস ও প্র্যাকটিক্যাল হ্যান্ডস-অন",
    obj_tr2_c1: "এআই ব্যবহারের দৃষ্টিভঙ্গি",
    obj_tr2_c2: "এআইকে উপেক্ষা বা শুধুই থিওরি হিসেবে দেখা",
    obj_tr2_c3: "দৈনন্দিন কাজের গতি ১০ গুণ বাড়াতে কো-পাইলট ব্যবহার",
    obj_tr3_c1: "ইমোশনাল ইন্টেলিজেন্স (EQ)",
    obj_tr3_c2: "কোন প্রাতিষ্ঠানিক ফোকাস নেই",
    obj_tr3_c3: "কমিউনিকেশন, রেজিলিয়েন্স ও লিডারশিপের বিশেষ ট্রেনিং",
    obj_tr4_c1: "চাকরির প্রস্তুতি",
    obj_tr4_c2: "সিভি পাঠিয়ে অনন্ত অপেক্ষা",
    obj_tr4_c3: "লাইভ ডিজিটাল পাসপোর্ট আইডি ও প্রুফ-অব-ওয়ার্ক পোর্টফোলিও",

    frame_mult_title: "কেন HI এবং AI এর গুণফল (Multiplication) আবশ্যক?",
    frame_mult_desc: "বিশ্বজুড়ে কাজের ধরণ বদলে গেছে। একা শুধুমাত্র এআই দিয়ে যেমন কোনো মানুষ সফল হতে পারে না, ঠিক তেমনই এআই না জেনে শুধুই গতানুগতিক দক্ষতায় টিকে থাকা সম্ভব নয়।",
    frame_mult_b1_t: "🤖 শুধু এআই জানলে কী ঘটে?",
    frame_mult_b1_d: "এআই আউটপুট দিতে পারে, কিন্তু তার নৈতিকতা, প্রাতিষ্ঠানিক গ্রহণযোগ্যতা ও মানবিক স্পর্শ যাচাই করার মত বিচারবুদ্ধি থাকে না।",
    frame_mult_b2_t: "🧠 শুধু সফট স্কিলস জানলে কী ঘটে?",
    frame_mult_b2_d: "যোগাযোগ ভালো হলেও আধুনিক এআই অটোমেশনের যুগে কাজের গতি ও ডেটা প্রসেসিংয়ে অন্যরা তাকে বহুদূর পেছনে ফেলে দেয়।",
    frame_mult_b3_t: "🌟 HI × AI সমন্বয় হলে কী ঘটে?",
    frame_mult_b3_d: "দ্রুততম সময়ে নিখুঁত এক্সিকিউশন এবং উচ্চতর মানবিক সিদ্ধান্তের সমন্বয়ে প্রতিষ্ঠান ও ক্যারিয়ারের শীর্ষ নেতৃত্ব অর্জন করা যায়।",

    gen_verify_title: "🔍 পাসপোর্ট আইডি ভেরিফিকেশন পোর্টাল",
    gen_verify_desc: "যেকোনো স্কিলস পাসপোর্ট আইডির সত্যতা ও ভেরিফিকেশন স্ট্যাটাস সাথে সাথে চেক করুন:",
    gen_verify_btn: "ভেরিফাই করুন",

    ws_why_title: "কেন স্কিলস পাসপোর্টের লাইভ ওয়ার্কশপ সবার চেয়ে আলাদা?",
    ws_why_desc: "আমাদের প্রতিটি ওয়ার্কশপ শুধুমাত্র লেকচার নয়, বরং হ্যান্ডস-অন বাস্তব প্রজেক্টভিত্তিক সিমুলেশন।",
    ws_why_b1_t: "🛠️ হ্যান্ডস-অন লাইভ ল্যাব",
    ws_why_b1_d: "লাইভ ক্লাসেই প্রম্পটিং, টুলস কনফিগারেশন এবং কেস স্টাডি সমাধান নিশ্চিত করা হয়।",
    ws_why_b2_t: "📜 ভেরিফায়েড ডিজিটাল ব্যাজ",
    ws_why_b2_d: "সফল সমাপ্তির পর আপনার স্কিলস পাসপোর্ট আইডিতে সরাসরি ভেরিফায়েড ব্যাজ যুক্ত হয়।",
    ws_why_b3_t: "📼 লাইফটাইম রেকর্ডিং এক্সেস",
    ws_why_b3_d: "লাইভ সেশনের পর ফুল হাই-ডেফিনিশন রেকর্ডিং ও রিসোর্স ফাইল লাইব্রেরিতে উন্মুক্ত থাকে।",

    comm_hq_title: "হেডকোয়ার্টার ও সরাসরি যোগাযোগ",
    comm_hq_desc: "স্কিলস পাসপোর্ট টিমের সাথে যেকোনো অনুসন্ধান, পার্টনারশিপ আলোচনা বা পরামর্শের জন্য যোগাযোগ করুন।",
    comm_hq_loc: "<strong>অবস্থান:</strong> ঢাকা, বাংলাদেশ (Dhaka, Bangladesh)",
    comm_hq_email: "<strong>ইমেইল:</strong> info@skillspassport.org",
    comm_hq_page: "<strong>অফিসিয়াল পেজ:</strong> <a href='https://www.facebook.com/share/19V3SoLGBw/' target='_blank' style='color: var(--accent-cyan);'>facebook.com/SkillsPassportBD</a>",
    comm_hq_yt: "<strong>ইউটিউব চ্যানেল:</strong> <a href='https://www.youtube.com/@skills-passport' target='_blank' rel='noopener noreferrer' style='color: var(--accent-cyan);'>youtube.com/@skills-passport</a>",
    comm_form_title: "সরাসরি বার্তা পাঠান",
    comm_ph_name: "আপনার নাম",
    comm_ph_email: "আপনার ইমেইল",
    comm_ph_msg: "আপনার বার্তা বা প্রশ্ন...",
    comm_form_btn: "বার্তা পাঠান"
  },

  en: {
    // Navbar
    nav_home: "Home",
    nav_brand_tagline: "HI × AI Upskilling",
    nav_objectives: "Objectives",
    nav_framework: "HI + AI Model",
    nav_generator: "Passport ID",
    nav_pathways: "Pathways",
    nav_workshops: "Live Workshops",
    nav_partners: "MoU & Partners",
    nav_community: "Community",
    nav_cta: "Create Passport",

    // Hero Section
    hero_badge: "Human Intelligence × Artificial Intelligence",
    hero_title: "Your Digital Passport to <span class='gradient-text'>Future-Ready Careers</span>",
    hero_desc: "Skills Passport bridges the gap between academia and modern AI-driven industries. We empower fresh graduates and young professionals with a seamless blend of Human Intelligence (EQ, Adaptability) and cutting-edge Artificial Intelligence.",
    hero_btn_explore: "Explore Workshops",
    hero_btn_pass: "Preview 3D Passport",
    hero_stats_label: "Dhaka's premier integrated HI + AI career upskilling platform",
    hero_stats_sub: "5,000+ Young Professional Community Drive",
    hero_card_flip_prompt: "Click anywhere to flip & view Skill Matrix",

    // Metrics Ribbon
    metric_community: "10,000+",
    metric_community_label: "Target Community Members",
    metric_workshops: "4+",
    metric_workshops_label: "Live Monthly Workshops",
    metric_partners: "B2B & MoU",
    metric_partners_label: "Schools, BECPS & SME Foundation",
    metric_blend: "100%",
    metric_blend_label: "Industry-Aligned Skills",

    // Core Objectives
    obj_badge: "Why We Exist",
    obj_title: "Core Objectives <span class='gradient-text'>& Mission</span>",
    obj_subtitle: "Every initiative is engineered to elevate young talent to global competitive standards.",

    obj_1_title: "Bridging Industry-Academia Gap",
    obj_1_desc: "Upskilling fresh graduates and young professionals in precise alignment with the demands of today's AI-driven employment ecosystem.",
    obj_1_f1: "Market-aligned practical curriculum",
    obj_1_f2: "Real-world projects and proof-of-work",
    obj_1_f3: "Direct mentorship from industry leaders",

    obj_2_title: "Building Future-Ready Talent",
    obj_2_desc: "Beyond technical or hard skills, instilling a synergy of Emotional Intelligence (EQ), rapid adaptability, and executive communication.",
    obj_2_f1: "High-impact professional communication",
    obj_2_f2: "Emotional resilience and leadership mindset",
    obj_2_f3: "Complex problem solving & adaptability",

    obj_3_title: "Accessible Learning Ecosystem",
    obj_3_desc: "Establishing an unbroken learning continuum from grassroot school/NGO workshops to elite corporate training masterclasses.",
    obj_3_f1: "School & college youth activation drives",
    obj_3_f2: "Educational Society (e.g. BECPS) partnerships",
    obj_3_f3: "Corporate houses & SME Foundation bootcamps",

    // HI + AI Framework
    frame_badge: "Skills Passport Methodology",
    frame_title: "HI + AI <span class='gradient-text'>Fusion Model</span>",
    frame_desc: "Where human intuition meets artificial intelligence to produce unstoppable career leverage.",
    frame_hi_title: "Innate Human Intelligence (HI)",
    frame_hi_desc: "No matter how advanced AI becomes, high emotional intelligence is essential for leadership, nuanced decision-making, and relationship building.",
    frame_hi_s1: "💡 Emotional Intelligence (EQ)",
    frame_hi_s2: "🎯 Rapid Adaptability",
    frame_hi_s3: "🗣️ Executive Communication",
    frame_hi_s4: "🤝 Creative Problem Solving",
    frame_ai_title: "AI & Automation Power (AI)",
    frame_ai_desc: "Automating routine tasks and leveraging smart AI co-pilots to amplify individual output and productivity tenfold.",
    frame_ai_s1: "⚡ Prompt Engineering 2.0",
    frame_ai_s2: "📊 Data-Driven Insights",
    frame_ai_s3: "⚙️ Workflow Automation",
    frame_ai_s4: "🎨 Multimodal AI Tools",
    frame_result_bar: "🚀 <strong>Result:</strong> 10× Execution Speed + Deep Strategic Vision = The Unstoppable Modern Professional",

    // 3D Passport Generator
    gen_badge: "Interactive Tool",
    gen_title: "Craft Your <span class='cyan-gradient-text'>3D Digital Passport</span>",
    gen_subtitle: "Select your career track and top competencies to generate an interactive real-time digital credential.",
    gen_label_name: "👤 Full Name",
    gen_label_track: "🎯 Career Track",
    gen_label_skills: "⚡ Select Your Top Competencies",
    gen_btn_issue: "Issue Passport ID Badge",
    gen_card_location: "DHAKA, BANGLADESH",

    // Strategic Pathways
    path_badge: "Strategic Offerings",
    path_title: "Who Are Our <span class='gradient-text'>Pathways For?</span>",
    path_subtitle: "Customized tracks engineered for students, youth societies, and enterprise leadership.",
    path_tab_1: "🎓 Fresh Grads & Young Talent",
    path_tab_2: "🏫 Schools & Societies (BECPS)",
    path_tab_3: "🏢 Corporates & SME Foundation",

    path_1_title: "Campus-to-Corporate Accelerator",
    path_1_desc: "Bridging the gap between traditional university syllabi and the modern AI job market to build confident, hireable professionals.",
    path_1_b1: "Hands-on projects and real-world portfolio building",
    path_1_b2: "Leveraging generative AI for ultra-productive output",
    path_1_b3: "Interview resilience and confident executive presence",
    path_1_btn: "View Workshop Schedule",

    path_2_title: "School & Youth Society Partnerships (MoU)",
    path_2_desc: "Collaborating with renowned schools, colleges, and educational societies (such as BECPS) through formal Memorandums of Understanding (MoU).",
    path_2_b1: "Campus-wide hands-on AI & skill bootcamps",
    path_2_b2: "Student leadership & youth society engagement",
    path_2_b3: "School-to-corporate career navigation seminars",
    path_2_btn: "Submit MoU Proposal",

    path_3_title: "Corporate Upskilling Leadership & SME Sprints",
    path_3_desc: "Serving as trusted talent development partners for Bangladesh's leading corporate houses, tech startups, and entities like SME Foundation.",
    path_3_b1: "AI tools & workflow integration for corporate teams",
    path_3_b2: "Emotional intelligence and team leadership coaching",
    path_3_b3: "Tailor-made workforce upskilling contracts & MoUs",
    path_3_btn: "Request Corporate Training",

    // Monthly Workshops
    workshops_badge: "Monthly Calendar",
    workshops_title: "4 Monthly <span class='gradient-text'>Live Workshops</span>",
    workshops_subtitle: "Interactive, hands-on, live cohort sessions addressing genuine market bottlenecks.",
    filter_all: "All Workshops",
    filter_ai: "AI & Automation",
    filter_soft: "Emotional Intelligence (HI)",
    filter_career: "Campus to Corporate",
    filter_corporate: "Corporate Strategy",

    // MoU & Partnerships
    partners_badge: "Official Alliances",
    partners_title: "Corporate & Institutional <span class='gradient-text'>MoU Portal</span>",
    partners_desc: "Partner with Skills Passport for institutional upskilling, university MoU signing, or corporate workforce transformation.",
    partner_network_label: "Strategic Partnership Network",
    partner_becps: "BECPS (Educational Society)",
    partner_sme: "SME Foundation (Enterprise & Corporate)",
    partner_schools: "School & College Alliance",
    partner_startups: "Dhaka Startup Ecosystem",

    mou_box_title: "Submit an Institutional / Corporate Proposal",
    mou_box_desc: "We customize bespoke training modules and execute formal MoUs with schools, universities, educational societies (like BECPS), and corporate bodies (like SME Foundation).",
    mou_s1_t: "Proposal Request",
    mou_s1_d: "Share your institutional details and desired competencies.",
    mou_s2_t: "Consultation & Curriculum Mapping",
    mou_s2_d: "Our executive team aligns the syllabus with your goals.",
    mou_s3_t: "Formal MoU Execution",
    mou_s3_d: "Official agreement signing, joint certification, and launch.",

    form_org_name: "Organization Name",
    form_org_type: "Organization Type",
    form_type_society: "Educational Society (e.g. BECPS)",
    form_type_corp: "Corporate / SME (e.g. SME Foundation)",
    form_type_school: "School / College",
    form_type_startup: "Tech Startup",
    form_contact: "Contact Person & Designation",
    form_email: "Official Email Address",
    form_phone: "Phone / WhatsApp Number",
    form_req: "Proposal Details or Training Requirement",
    form_btn_submit: "Send Official MoU Proposal",

    // Community
    comm_badge: "Join The Movement",
    comm_title: "Join the Skills Passport <span class='cyan-gradient-text'>Community</span>",
    comm_desc: "Engage with value-driven content across Facebook, LinkedIn, and YouTube. Become part of 5,000+ forward-thinking professionals.",
    comm_growth_label: "Active Community Growth",
    comm_growth_target: "Target: 10,000 Members",
    comm_fb_btn: "Follow Facebook Page",
    comm_yt_btn: "YouTube Channel",
    comm_yt_sub: "Case Studies & Masterclasses",
    comm_li_btn: "LinkedIn Network",
    comm_li_sub: "Career Opportunities",

    // Footer
    footer_desc: "Leading EdTech platform in Dhaka bridging the academia-industry gap through Human Intelligence (HI) & Artificial Intelligence (AI).",
    footer_city: "📍 Dhaka, Bangladesh • Empowering Global Professionals",
    footer_col1_title: "Core Features",
    footer_col2_title: "Workshops & B2B",
    footer_col3_title: "Connect",
    footer_back_top: "Back to Top ↑",
    footer_copyright: "© 2026 Skills Passport. All rights reserved.",
    footer_tagline_bottom: "Human Intelligence (HI) × Artificial Intelligence (AI) Upskilling Platform",

    // Modal
    modal_badge: "Live Workshop Registration",
    modal_sub: "Fill in the details below to secure your live cohort seat.",
    modal_name: "Full Name",
    modal_email: "Email Address",
    modal_phone: "Phone / WhatsApp Number",
    modal_org: "Current Profession / Institution",
    modal_submit: "Confirm Registration & Get Pass",

    // Subpage Deep-Dive Keys (EN)
    step_1: "1",
    step_2: "2",
    step_3: "3",

    obj_p1_b1_t: "🎯 Real Market Synchronization",
    obj_p1_b1_d: "Building a direct bridge between traditional university syllabi and modern corporate demands.",
    obj_p1_b2_t: "💻 Proof-of-Work & Portfolio",
    obj_p1_b2_d: "Showcasing competency through hands-on AI projects and real-world case studies instead of static CVs.",
    obj_p1_b3_t: "👥 Direct Industry Mentorship",
    obj_p1_b3_d: "Actionable career guidance and live coaching directly from top corporate leaders.",

    obj_p2_b1_t: "🗣️ Executive Communication",
    obj_p2_b1_d: "Articulating complex ideas clearly, delivering persuasive presentations, and mastering corporate negotiation.",
    obj_p2_b2_t: "💡 Emotional Resilience",
    obj_p2_b2_d: "Maintaining mental composure and decisive leadership under uncertainty and high-stakes pressure.",
    obj_p2_b3_t: "⚡ Rapid Adaptability",
    obj_p2_b3_d: "Quickly adapting to emerging technologies and market shifts to drive organizational growth.",

    obj_p3_b1_t: "🏫 School & College Activation",
    obj_p3_b1_d: "Building the foundation of critical thinking and digital literacy from an early stage.",
    obj_p3_b2_t: "🤝 Educational Societies (BECPS)",
    obj_p3_b2_d: "Joint upskilling drives, bootcamps, and career seminars with youth and educational societies.",
    obj_p3_b3_t: "🏢 Corporate Leadership & SME",
    obj_p3_b3_d: "Specialized bootcamps with SME Foundation and corporate teams to multiply workforce productivity 10×.",

    obj_comp_title: "Traditional Academia vs. Skills Passport Model",
    obj_comp_desc: "Why traditional education alone isn't enough for the modern AI era, and how Skills Passport bridges the gap:",
    obj_th_1: "Core Dimension",
    obj_th_2: "Traditional Academia Model",
    obj_th_3: "Skills Passport (HI + AI)",
    obj_tr1_c1: "Learning Approach",
    obj_tr1_c2: "Theory-heavy & rote memorization syllabus",
    obj_tr1_c3: "Real-world cases & practical hands-on execution",
    obj_tr2_c1: "AI Adoption Mindset",
    obj_tr2_c2: "Ignoring AI or treating it purely as theory",
    obj_tr2_c3: "Using AI Co-Pilots to accelerate daily output 10×",
    obj_tr3_c1: "Emotional Intelligence (EQ)",
    obj_tr3_c2: "No structured institutional focus",
    obj_tr3_c3: "Dedicated training in communication, resilience & leadership",
    obj_tr4_c1: "Career Readiness",
    obj_tr4_c2: "Sending CVs & waiting indefinitely",
    obj_tr4_c3: "Live Digital Passport ID & proof-of-work portfolio",

    frame_mult_title: "Why the Multiplication (HI × AI) Is Essential",
    frame_mult_desc: "The global workplace has transformed. Just as AI alone cannot replace human judgment, traditional skills without AI fluency are no longer sufficient.",
    frame_mult_b1_t: "🤖 What happens with AI alone?",
    frame_mult_b1_d: "AI generates output, but lacks ethical judgment, organizational context, and authentic human empathy.",
    frame_mult_b2_t: "🧠 What happens with Soft Skills alone?",
    frame_mult_b2_d: "Even with strong communication, professionals fall behind in execution speed and data processing without AI automation.",
    frame_mult_b3_t: "🌟 What happens when HI × AI combine?",
    frame_mult_b3_d: "Ultra-fast execution paired with high-level strategic human judgment unlocks top-tier career and enterprise leadership.",

    gen_verify_title: "🔍 Passport ID Verification Portal",
    gen_verify_desc: "Instantly verify the authenticity and active status of any Skills Passport ID:",
    gen_verify_btn: "Verify Credential",

    ws_why_title: "Why Skills Passport Live Workshops Stand Apart",
    ws_why_desc: "Every workshop is designed not as a passive lecture, but as an interactive, project-driven live simulation.",
    ws_why_b1_t: "🛠️ Hands-On Live Lab",
    ws_why_b1_d: "Real-time prompting, tool configuration, and live case study problem-solving during the session.",
    ws_why_b2_t: "📜 Verified Digital Badge",
    ws_why_b2_d: "Upon completion, a verified competency badge is directly added to your Skills Passport ID.",
    ws_why_b3_t: "📼 Lifetime Recording Access",
    ws_why_b3_d: "Full HD session recordings, prompt templates, and resource kits remain accessible in your library.",

    comm_hq_title: "Headquarters & Direct Contact",
    comm_hq_desc: "Reach out to the Skills Passport team for institutional inquiries, MoU partnerships, or career guidance.",
    comm_hq_loc: "<strong>Location:</strong> Dhaka, Bangladesh",
    comm_hq_email: "<strong>Email:</strong> info@skillspassport.org",
    comm_hq_page: "<strong>Official Page:</strong> <a href='https://www.facebook.com/share/19V3SoLGBw/' target='_blank' style='color: var(--accent-cyan);'>facebook.com/SkillsPassportBD</a>",
    comm_hq_yt: "<strong>YouTube Channel:</strong> <a href='https://www.youtube.com/@skills-passport' target='_blank' rel='noopener noreferrer' style='color: var(--accent-cyan);'>youtube.com/@skills-passport</a>",
    comm_form_title: "Send a Direct Message",
    comm_ph_name: "Your Full Name",
    comm_ph_email: "Your Email Address",
    comm_ph_msg: "Your message or inquiry...",
    comm_form_btn: "Send Message"
  }
};

let currentLang = 'bn';
let currentWorkshopFilter = 'all';

function setLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  document.body.classList.toggle('lang-bn', lang === 'bn');
  localStorage.setItem('sp_lang', lang);

  // Update switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      el.innerHTML = i18n[lang][key];
    }
  });

  // Update Placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      el.setAttribute('placeholder', i18n[lang][key]);
    }
  });

  // Re-render workshops so their cards and CTA buttons translate immediately
  renderWorkshops(currentWorkshopFilter);

  // Update generator role if active
  const trackSelect = document.getElementById('gen-track-select');
  const cardRole = document.getElementById('gen-card-role');
  if (trackSelect && cardRole) {
    cardRole.textContent = trackSelect.options[trackSelect.selectedIndex].text;
  }

  sfx.playChime();
}

// ===================================================================
// 3D PASSPORT CARD INTERACTION (HERO SECTION)
// ===================================================================
function initHero3DCard() {
  const cardWrap = document.getElementById('hero-passport-wrap');
  if (!cardWrap) return;

  const cardInner = cardWrap.querySelector('.passport-card-inner');
  const glare = cardWrap.querySelector('.card-glare');

  // Mouse tilt physics
  cardWrap.addEventListener('mousemove', (e) => {
    const rect = cardWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 18;

    const isFlipped = cardWrap.classList.contains('flipped');
    const finalRotY = isFlipped ? 180 + rotateY : rotateY;

    cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${finalRotY}deg)`;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
    }
  });

  cardWrap.addEventListener('mouseleave', () => {
    const isFlipped = cardWrap.classList.contains('flipped');
    cardInner.style.transform = isFlipped ? 'rotateX(0deg) rotateY(180deg)' : 'rotateX(0deg) rotateY(0deg)';
    if (glare) {
      glare.style.background = '';
    }
  });

  // Flip Card on Click
  cardWrap.addEventListener('click', () => {
    cardWrap.classList.toggle('flipped');
    sfx.playFlip();
  });
}

// ===================================================================
// INTERACTIVE 3D PASSPORT GENERATOR
// ===================================================================
function initPassportGenerator() {
  const nameInput = document.getElementById('gen-name-input');
  const trackSelect = document.getElementById('gen-track-select');
  const cardName = document.getElementById('gen-card-name');
  const cardRole = document.getElementById('gen-card-role');
  const skillsContainer = document.getElementById('gen-skills-container');
  const downloadBtn = document.getElementById('gen-download-btn');
  const skillChips = document.querySelectorAll('.skill-toggle-chip');

  let selectedSkills = ['Generative AI', 'EQ & Leadership', 'Data Fluency'];

  function updateGeneratorCard() {
    const name = nameInput.value.trim() || 'Tanvir Ahmed';
    if (cardName) cardName.textContent = name;

    if (trackSelect && cardRole) {
      cardRole.textContent = trackSelect.options[trackSelect.selectedIndex].text;
    }

    // Update skills tag list
    if (skillsContainer) {
      skillsContainer.innerHTML = '';
      selectedSkills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'gen-skill-tag';
        tag.textContent = skill;
        skillsContainer.appendChild(tag);
      });
    }
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      updateGeneratorCard();
      sfx.playBeep(450, 'sine', 0.05);
    });
  }

  if (trackSelect) {
    trackSelect.addEventListener('change', () => {
      updateGeneratorCard();
      sfx.playBeep(550, 'triangle', 0.08);
    });
  }

  skillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const skillName = chip.dataset.skill;
      if (selectedSkills.includes(skillName)) {
        if (selectedSkills.length > 1) {
          selectedSkills = selectedSkills.filter(s => s !== skillName);
          chip.classList.remove('active');
        }
      } else {
        if (selectedSkills.length < 5) {
          selectedSkills.push(skillName);
          chip.classList.add('active');
        } else {
          alert(currentLang === 'bn' ? 'সর্বোচ্চ ৫টি দক্ষতা নির্বাচন করতে পারবেন।' : 'You can select up to 5 top skills.');
        }
      }
      updateGeneratorCard();
      sfx.playBeep(650, 'sine', 0.06);
    });
  });

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function downloadPassportCardAsPNG(passportId) {
    const scale = 2;
    const width = 360 * scale;
    const height = 520 * scale;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const name = (nameInput && nameInput.value.trim()) || 'Tanvir Ahmed';
    const role = (trackSelect && trackSelect.options[trackSelect.selectedIndex].text) || '💼 Corporate Executive';
    const locationText = currentLang === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'DHAKA, BANGLADESH';

    const drawCard = (logoImg) => {
      ctx.clearRect(0, 0, width, height);

      const pad = 16;
      const cardX = pad;
      const cardY = pad;
      const cardW = width - pad * 2;
      const cardH = height - pad * 2;
      const radius = 28 * scale;

      // Card background gradient
      ctx.save();
      roundRectPath(ctx, cardX, cardY, cardW, cardH, radius);
      const bgGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
      bgGrad.addColorStop(0, '#161036');
      bgGrad.addColorStop(0.55, '#0D1025');
      bgGrad.addColorStop(1, '#0A0D1E');
      ctx.fillStyle = bgGrad;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.35)';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();

      // Subtle holographic glare overlay
      ctx.save();
      roundRectPath(ctx, cardX, cardY, cardW, cardH, radius);
      ctx.clip();
      const glareGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      glareGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
      glareGrad.addColorStop(0.65, 'rgba(0, 242, 254, 0.08)');
      glareGrad.addColorStop(1, 'rgba(138, 43, 226, 0.12)');
      ctx.fillStyle = glareGrad;
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.restore();

      // Cyan glowing border
      ctx.save();
      roundRectPath(ctx, cardX, cardY, cardW, cardH, radius);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.65)';
      ctx.stroke();
      ctx.restore();

      // Top Header: SKILLS PASSPORT BD & ID
      const headerY = cardY + 42 * scale;
      ctx.font = `800 ${15 * scale}px Outfit, sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'left';
      ctx.fillText('SKILLS PASSPORT BD', cardX + 26 * scale, headerY);

      ctx.font = `600 ${13 * scale}px monospace`;
      ctx.fillStyle = '#00F2FE';
      ctx.textAlign = 'right';
      ctx.fillText(passportId, cardX + cardW - 26 * scale, headerY);

      // Center Avatar Circle with Cyan Glow
      const centerX = width / 2;
      const avatarY = cardY + 158 * scale;
      const avatarR = 46 * scale;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 242, 254, 0.65)';
      ctx.shadowBlur = 28;
      ctx.fill();
      ctx.lineWidth = 3 * scale;
      ctx.strokeStyle = '#00F2FE';
      ctx.stroke();
      ctx.restore();

      if (logoImg) {
        const iconSize = avatarR * 1.45;
        ctx.drawImage(logoImg, centerX - iconSize / 2, avatarY - iconSize / 2, iconSize, iconSize);
      }

      // Holder Name
      const nameY = avatarY + avatarR + 36 * scale;
      ctx.font = `800 ${22 * scale}px Outfit, "Hind Siliguri", sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(name, centerX, nameY);

      // Holder Career Track Role
      const roleY = nameY + 26 * scale;
      ctx.font = `600 ${14.5 * scale}px Outfit, "Hind Siliguri", sans-serif`;
      ctx.fillStyle = '#38BDF8';
      ctx.fillText(role, centerX, roleY);

      // Skills Chips (Wrapped Rows)
      ctx.font = `600 ${12 * scale}px Outfit, sans-serif`;
      const chipPadX = 12 * scale;
      const chipH = 26 * scale;
      const chipGapX = 8 * scale;
      const chipGapY = 10 * scale;
      const maxRowWidth = cardW - 48 * scale;

      const rows = [];
      let currentRow = [];
      let currentRowWidth = 0;

      selectedSkills.forEach(skill => {
        const textW = ctx.measureText(skill).width;
        const chipW = textW + chipPadX * 2;
        if (currentRow.length > 0 && currentRowWidth + chipGapX + chipW > maxRowWidth) {
          rows.push({ items: currentRow, width: currentRowWidth });
          currentRow = [{ text: skill, width: chipW }];
          currentRowWidth = chipW;
        } else {
          if (currentRow.length > 0) currentRowWidth += chipGapX;
          currentRow.push({ text: skill, width: chipW });
          currentRowWidth += chipW;
        }
      });
      if (currentRow.length > 0) {
        rows.push({ items: currentRow, width: currentRowWidth });
      }

      let chipStartY = roleY + 24 * scale;
      rows.forEach(row => {
        let startX = centerX - row.width / 2;
        row.items.forEach(item => {
          ctx.save();
          roundRectPath(ctx, startX, chipStartY, item.width, chipH, 6 * scale);
          ctx.fillStyle = 'rgba(138, 43, 226, 0.28)';
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(138, 43, 226, 0.55)';
          ctx.stroke();
          ctx.fillStyle = '#E2E8F0';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.text, startX + item.width / 2, chipStartY + chipH / 2 + 1);
          ctx.restore();
          startX += item.width + chipGapX;
        });
        chipStartY += chipH + chipGapY;
      });

      // Footer Divider Line
      const footerLineY = cardY + cardH - 72 * scale;
      ctx.beginPath();
      ctx.moveTo(cardX + 24 * scale, footerLineY);
      ctx.lineTo(cardX + cardW - 24 * scale, footerLineY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Footer Left Status Box
      ctx.textAlign = 'left';
      ctx.font = `600 ${11.5 * scale}px Outfit, sans-serif`;
      ctx.fillStyle = '#64748B';
      ctx.fillText('HI + AI VERIFIED', cardX + 26 * scale, footerLineY + 26 * scale);

      ctx.font = `700 ${14 * scale}px "Hind Siliguri", Outfit, sans-serif`;
      ctx.fillStyle = '#00F5A0';
      ctx.fillText(locationText, cardX + 26 * scale, footerLineY + 48 * scale);

      // Footer Right Barcode
      ctx.textAlign = 'right';
      ctx.font = `600 ${14 * scale}px monospace`;
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('||| | |||| | |||', cardX + cardW - 26 * scale, footerLineY + 38 * scale);

      // Trigger PNG Download
      const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '-') || 'Holder';
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Skills-Passport-${safeName}-${passportId}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => drawCard(img);
    img.onerror = () => drawCard(null);
    img.src = 'assets/logo-icon.png';
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      sfx.playChime();
      const randomId = 'SP-2026-BD' + Math.floor(1000 + Math.random() * 9000);
      const cardIdEl = document.getElementById('gen-card-id');
      if (cardIdEl) cardIdEl.textContent = randomId;
      const verifyInputEl = document.getElementById('verify-input');
      if (verifyInputEl) verifyInputEl.value = randomId;

      downloadPassportCardAsPNG(randomId);

      showToast(currentLang === 'bn' 
        ? `🎉 ডিজিটাল স্কিলস পাসপোর্ট PNG আকারে ডাউনলোড হয়েছে! (${randomId})`
        : `🎉 Digital Skills Passport downloaded as PNG! (${randomId})`
      );
    });
  }

  // 3D Tilt on Generated Card
  const genCard = document.getElementById('generated-passport-card');
  if (genCard) {
    genCard.addEventListener('mousemove', (e) => {
      const rect = genCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
      const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 14;
      genCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    genCard.addEventListener('mouseleave', () => {
      genCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}

// ===================================================================
// PATHWAYS TABS CONTROLLER
// ===================================================================
function initPathwaysTabs() {
  const tabs = document.querySelectorAll('.path-tab-btn');
  const panes = document.querySelectorAll('.pathway-content-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      sfx.playChime();
    });
  });
}

// ===================================================================
// WORKSHOP DATA & REGISTRATION MODAL
// ===================================================================
const workshopsData = [
  {
    id: 'ws-1',
    category: 'ai',
    catLabelBn: 'AI & অটোমেশন',
    catLabelEn: 'AI & Workflow Automation',
    titleBn: 'AI-Powered Professional Workflow Mastery',
    titleEn: 'AI-Powered Professional Workflow Mastery',
    descBn: 'ChatGPT, Claude, Midjourney ও আধুনিক এআই টুলস ব্যবহার করে কাজের প্রোডাক্টিভিটি ১০ গুণ বাড়ানোর বাস্তব প্র্যাকটিক্যাল গাইডলাইন।',
    descEn: 'Hands-on live workshop teaching workflow automation with Claude, ChatGPT, and AI agents for modern knowledge workers.',
    dateBn: '১ম শনিবার (মাসিক)',
    dateEn: '1st Saturday of Month',
    time: '8:00 PM - 10:30 PM (BST)',
    modeBn: 'লাইভ অনলাইন + রেকর্ডিং',
    modeEn: 'Live Online + Recording',
    seatsBn: 'আর মাত্র ১৪টি সিট বাকি',
    seatsEn: 'Last 14 Seats Left',
    takeawaysBn: ['প্রম্পট ইঞ্জিনিয়ারিং ২.০', 'ডকুমেন্ট অটোমেশন', 'লাইভ প্রশ্নোত্তর সেশন'],
    takeawaysEn: ['Prompt Engineering 2.0', 'Document Automation', 'Live Q&A Session']
  },
  {
    id: 'ws-2',
    category: 'soft',
    catLabelBn: 'হিউম্যান ইন্টেলিজেন্স (HI)',
    catLabelEn: 'Human Intelligence (HI)',
    titleBn: 'ইমোশনাল ইন্টেলিজেন্স ও এক্সিকিউটিভ কমিউনিকেশন',
    titleEn: 'Emotional Intelligence & Executive Communication',
    descBn: 'করপোরেট ক্যারিয়ারে দ্রুত প্রমোশন ও টিম লিড করতে প্রয়োজনীয় EQ, অ্যাক্টিভ লিসেনিং এবং প্রেজেন্টেশন আর্ট।',
    descEn: 'Mastering EQ, high-stakes communication, and leadership negotiation in modern high-pressure corporate environments.',
    dateBn: '২য় শনিবার (মাসিক)',
    dateEn: '2nd Saturday of Month',
    time: '8:00 PM - 10:30 PM (BST)',
    modeBn: 'লাইভ ইন্টারঅ্যাক্টিভ (ঢাকা ও অনলাইন)',
    modeEn: 'Live Interactive (Dhaka & Online)',
    seatsBn: 'সিট দ্রুত বুকিং হচ্ছে (৯টি বাকি)',
    seatsEn: 'Filling Fast (9 Left)',
    takeawaysBn: ['পারসুয়েসিভ স্পিচ', 'কনফ্লিক্ট রেজোলিউশন', 'এক্সিকিউটিভ প্রেজেন্স'],
    takeawaysEn: ['Persuasive Speech', 'Conflict Resolution', 'Executive Presence']
  },
  {
    id: 'ws-3',
    category: 'career',
    catLabelBn: 'ক্যাম্পাস-টু-কর্পোরেট',
    catLabelEn: 'Campus to Corporate',
    titleBn: 'ক্যাম্পাস-টু-কর্পোরেট ব্লুপ্রিন্ট: ফ্রেশারদের ফার্স্ট জব হ্যাকস',
    titleEn: 'Campus-to-Corporate: First Job Mastery for Fresh Grads',
    descBn: 'বিশ্ববিদ্যালয় পাশ করার পর সিভির বদলে কীভাবে বাস্তব পোর্টফোলিও ও লিঙ্কডইন অপ্টিমাইজেশনের মাধ্যমে টপ জবে ঢুকবেন।',
    descEn: 'A battle-tested blueprint to bridge the academia gap and land dream roles through proof-of-work and strategic branding.',
    dateBn: '৩য় শনিবার (মাসিক)',
    dateEn: '3rd Saturday of Month',
    time: '8:00 PM - 10:30 PM (BST)',
    modeBn: 'অনলাইন জুম কোহোর্ট',
    modeEn: 'Online Zoom Cohort',
    seatsBn: 'ফ্রেশারদের জন্য উন্মুক্ত',
    seatsEn: 'Open for Freshers',
    takeawaysBn: ['ATS রেজ্যুমে হ্যাকিং', 'AI মক ইন্টারভিউ', 'পোর্টফোলিও আর্কিটেকচার'],
    takeawaysEn: ['ATS Resume Hacking', 'AI Mock Interview', 'Portfolio Architecture']
  },
  {
    id: 'ws-4',
    category: 'corporate',
    catLabelBn: 'এন্টারপ্রাইজ ও স্টার্টআপ',
    catLabelEn: 'Enterprise & Startups',
    titleBn: 'স্ট্র্যাটেজিক প্রবলেম সলভিং ও অ্যাডাপটেবিলিটি স্প্রিন্ট',
    titleEn: 'Strategic Problem Solving & Corporate Adaptability',
    descBn: 'জটিল ব্যবসায়িক সমস্যা ও আকস্মিক পরিবর্তনকে সুযোগে রূপান্তর করার কৌশল — ফ্রেমওয়ার্ক-বেজড ডিসিশন মেকিং।',
    descEn: 'First-principles thinking and agility frameworks for corporate executives and aspiring startup founders.',
    dateBn: '৪র্থ শনিবার (মাসিক)',
    dateEn: '4th Saturday of Month',
    time: '8:00 PM - 10:30 PM (BST)',
    modeBn: 'এক্সিকিউটিভ হাইব্রিড (ঢাকা হাব)',
    modeEn: 'Executive Hybrid (Dhaka Hub)',
    seatsBn: 'সীমিত ২০টি সিট',
    seatsEn: 'Limited 20 Seats',
    takeawaysBn: ['ফার্স্ট প্রিন্সিপলস থিংকিং', 'এজাইল এক্সিকিউশন', 'কেস সিমুলেশন'],
    takeawaysEn: ['First Principles Thinking', 'Agile Execution', 'Case Simulations']
  }
];

function renderWorkshops(filter = 'all') {
  currentWorkshopFilter = filter;
  const container = document.getElementById('workshops-cards-grid');
  if (!container) return;

  container.innerHTML = '';
  const filtered = filter === 'all' ? workshopsData : workshopsData.filter(w => w.category === filter);

  filtered.forEach(ws => {
    const card = document.createElement('div');
    card.className = 'workshop-card';
    
    const isBn = currentLang === 'bn';
    const title = isBn ? ws.titleBn : ws.titleEn;
    const desc = isBn ? ws.descBn : ws.descEn;
    const cat = isBn ? ws.catLabelBn : ws.catLabelEn;
    const date = isBn ? ws.dateBn : ws.dateEn;
    const mode = isBn ? ws.modeBn : ws.modeEn;
    const seats = isBn ? ws.seatsBn : ws.seatsEn;
    const takeaways = isBn ? ws.takeawaysBn : ws.takeawaysEn;
    const btnLabel = isBn ? 'রেজিস্টার করুন' : 'Register Now';

    card.innerHTML = `
      <div class="workshop-card-top">
        <div class="workshop-meta-date">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>${date}</span>
        </div>
        <span class="workshop-seats-badge">${seats}</span>
      </div>
      <div class="workshop-card-body">
        <span class="workshop-category">${cat}</span>
        <h4 class="workshop-card-title">${title}</h4>
        <p class="workshop-card-desc">${desc}</p>
        <div class="workshop-takeaways">
          ${takeaways.map(t => `<span class="takeaway-chip">⚡ ${t}</span>`).join('')}
        </div>
      </div>
      <div class="workshop-card-footer">
        <span class="workshop-mode">🌐 ${mode}</span>
        <button class="btn btn-secondary btn-sm register-ws-btn" data-id="${ws.id}" data-title="${title}">
          ${btnLabel}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach modal trigger listeners
  container.querySelectorAll('.register-ws-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title;
      openRegistrationModal(title);
    });
  });
}

function initWorkshopFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      renderWorkshops(cat);
      sfx.playChime();
    });
  });

  renderWorkshops('all');
}

// Registration Modal Controller
function openRegistrationModal(workshopTitle) {
  const modal = document.getElementById('reg-modal');
  const titleDisplay = document.getElementById('modal-ws-name');
  if (modal && titleDisplay) {
    titleDisplay.textContent = workshopTitle;
    modal.classList.add('active');
    sfx.playChime();
  }
}

function closeRegistrationModal() {
  const modal = document.getElementById('reg-modal');
  if (modal) {
    modal.classList.remove('active');
    sfx.playBeep(400, 'sine', 0.08);
  }
}

// ===================================================================
// B2B MOU PROPOSAL FORM HANDLER
// ===================================================================
function initB2BForm() {
  const form = document.getElementById('b2b-mou-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const org = form.querySelector('[name="org_name"]').value;
    const email = form.querySelector('[name="org_email"]').value;

    sfx.playChime();
    const msg = currentLang === 'bn'
      ? `✅ ধন্যবাদ! "${org}" এর জন্য পার্টনারশিপ প্রস্তাব গৃহীত হয়েছে। স্কিলস পাসপোর্ট টিম শীঘ্রই ${email} ঠিকানায় যোগাযোগ করবে।`
      : `✅ Thank you! Partnership proposal initiated for "${org}". Skills Passport team will contact ${email} shortly with the draft MoU.`;
    showToast(msg);
    form.reset();
  });
}

// Simple Toast Notification
function showToast(message) {
  let toast = document.getElementById('sp-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sp-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #161033, #0c1024);
      color: #FFFFFF;
      padding: 16px 24px;
      border-radius: 14px;
      border: 1px solid rgba(0, 242, 254, 0.4);
      box-shadow: 0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(0, 242, 254, 0.3);
      z-index: 10000;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.3s ease;
      transform: translateY(100px);
      opacity: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 90vw;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 4500);
}

// Global exposure
window.setLanguage = setLanguage;

// ===================================================================
// NAVBAR & GENERAL SETUP
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Check URL param first, then stored language
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const savedLang = (langParam === 'en' || langParam === 'bn') ? langParam : (localStorage.getItem('sp_lang') || 'bn');
  setLanguage(savedLang);

  // Language buttons direct binding
  const btnBn = document.getElementById('lang-btn-bn');
  const btnEn = document.getElementById('lang-btn-en');
  if (btnBn) {
    btnBn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('bn');
    });
  }
  if (btnEn) {
    btnEn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('en');
    });
  }

  // Also bind all .lang-btn just in case
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      if (lang) setLanguage(lang);
    });
  });

  // Sound Toggle Button
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      soundBtn.innerHTML = sfx.enabled
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      if (sfx.enabled) sfx.playChime();
    });
  }

  // Dark / Light Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function applyTheme(theme, playSound = false) {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('light-mode', isLight);
    document.body.classList.toggle('light-mode', isLight);
    localStorage.setItem('sp_theme', isLight ? 'light' : 'dark');
    if (themeBtn) {
      themeBtn.innerHTML = isLight ? moonIcon : sunIcon;
      themeBtn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    }
    if (playSound) sfx.playChime();
  }

  const savedTheme = localStorage.getItem('sp_theme') || 'dark';
  applyTheme(savedTheme, false);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      applyTheme(nextTheme, true);
    });
  }

  // Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      sfx.playBeep(450, 'triangle', 0.08);
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && e.target !== mobileBtn) {
        navMenu.classList.remove('open');
      }
    });
  }

  // Navbar Scroll Shadow & active link tracker
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  // Modal Close Listeners
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('reg-modal');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeRegistrationModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeRegistrationModal();
    });
  }

  const modalForm = document.getElementById('modal-reg-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeRegistrationModal();
      sfx.playChime();
      const msg = currentLang === 'bn'
        ? '🎟️ রেজিস্ট্রেশন কনফার্ম হয়েছে! আপনার ইমেইলে ওয়ার্কশপ এক্সেস লিঙ্ক পাঠানো হয়েছে।'
        : '🎟️ Registration Confirmed! Workshop access pass sent to your email.';
      showToast(msg);
      modalForm.reset();
    });
  }

  // Initialize Modules
  initHero3DCard();
  initPassportGenerator();
  initPathwaysTabs();
  initWorkshopFilter();
  initB2BForm();
});
