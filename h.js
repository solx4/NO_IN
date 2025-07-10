document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // فتح القائمة عند الضغط على الأيقونة
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // إغلاق القائمة عند الضغط على أي رابط
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // تفعيل العنصر حسب التمرير
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    sections.forEach(section => {
      let sectionTop = section.offsetTop - 150;
      let sectionHeight = section.offsetHeight;
      let sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        links.forEach(link => link.classList.remove('active'));
        const currentLink = document.querySelector(`.nav-link[href*='${sectionId}']`);
        if (currentLink) currentLink.classList.add('active');
      }
    });
  });



    // ================== قسم التقييم ==================

  const ratingItems = document.querySelectorAll('.rating-item');        // جميع عناصر التقييم
  const currentRating = document.getElementById('current-rating');      // الرقم المختار
  const ratingDescription = document.getElementById('rating-description'); // وصف التقييم
  const feedbackText = document.getElementById('feedback-text');        // مربع الملاحظات
  const charCount = document.getElementById('char-count');              // عداد الأحرف
  const submitBtn = document.getElementById('submit-btn');              // زر الإرسال

  // الوصف الخاص بكل تقييم من 1 إلى 10
  const ratingDescriptions = {
    1: "ضعيف جدًا",
    2: "ضعيف",
    3: "متوسط",
    4: "مقبول",
    5: "جيد",
    6: "جيد جدًا",
    7: "رائع",
    8: "ممتاز",
    9: "مذهل",
    10: "استثنائي"
  };

  // عند اختيار تقييم
  ratingItems.forEach(item => {
    item.addEventListener('click', function () {
      ratingItems.forEach(r => r.classList.remove('selected')); // إزالة التحديد
      this.classList.add('selected'); // تحديد العنصر المختار

      const value = this.getAttribute('data-value');
      currentRating.textContent = value;
      ratingDescription.textContent = ratingDescriptions[value];
    });
  });

  // تحديد تقييم افتراضي (رقم 3)
  ratingItems[2].classList.add('selected');

  // عداد الأحرف في مربع الملاحظات
  feedbackText.addEventListener('input', function () {
    const text = this.value;
    charCount.textContent = text.length;

    // تحديد الحد الأقصى بـ 500 حرف
    if (text.length > 500) {
      this.value = text.substring(0, 500);
      charCount.textContent = 500;
    }
  });

  // إرسال التقييم
  submitBtn.addEventListener('click', function () {
    const selectedRating = currentRating.textContent;
    const feedback = feedbackText.value;

    // تغيير شكل الزر بعد الإرسال
    this.innerHTML = '<i class="fas fa-check"></i> تم الإرسال!';
    this.classList.remove('pulse');
    this.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';

    // عرض رسالة الشكر
    setTimeout(() => {
      alert(`شكرًا لتقييمك! لقد أعطيتنا ${selectedRating} من 10.\nملاحظاتك: ${feedback || "لم تقدم ملاحظات"}`);

      // إعادة تعيين النموذج
      this.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال التقييم';
      this.classList.add('pulse');
      this.style.background = 'linear-gradient(135deg, #00d2ff, #3a7bd5)';
      feedbackText.value = '';
      charCount.textContent = '0';
    }, 1000);
  });


  // ============ قسم "قراءة المزيد" للفريق ============

  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const box = this.closest('.team-box'); // الصندوق المحيط بالعضو
      box.classList.toggle('expanded'); // توسيع/تصغير
      this.textContent = box.classList.contains('expanded') ? 'Hide' : 'Learn More ';
    });
  });


  // ============ قسم التحكم بالفيديو ============

  const video = document.getElementById("customVideo");              // الفيديو نفسه
  const playPauseBtn = document.getElementById("playPauseBtn");      // زر تشغيل/إيقاف
  const progressBar = document.getElementById("progressBar");        // شريط التقدم
  const currentTimeText = document.getElementById("currentTime");    // الوقت الحالي
  const durationText = document.getElementById("duration");          // مدة الفيديو
  const volumeControl = document.getElementById("volumeControl");    // التحكم في الصوت
  const videoPlayer = document.querySelector(".video-player");       // العنصر المغلف للفيديو

  // عند تحميل الفيديو – نعرض مدته
  video.addEventListener("loadedmetadata", () => {
    progressBar.max = video.duration;
    durationText.textContent = formatTime(video.duration);
  });

  // زر تشغيل/إيقاف الفيديو
  playPauseBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = "⏸"; // عند التشغيل
    } else {
      video.pause();
      playPauseBtn.textContent = "▶"; // عند الإيقاف
    }
  });

  // تحديث شريط التقدم أثناء التشغيل
  video.addEventListener("timeupdate", () => {
    progressBar.value = video.currentTime;
    currentTimeText.textContent = formatTime(video.currentTime);
  });

  // تغيير وقت الفيديو عند تحريك الشريط
  progressBar.addEventListener("input", () => {
    video.currentTime = progressBar.value;
  });

  // التحكم في مستوى الصوت
  volumeControl.addEventListener("input", () => {
    video.volume = volumeControl.value;
  });


  // ============ إخفاء/إظهار أدوات الفيديو ============

  let hideTimeout;

  function showControls() {
    videoPlayer.classList.remove("hide-controls"); // إظهار الأدوات
    clearTimeout(hideTimeout); // إلغاء المؤقت السابق

    // إخفاء الأدوات بعد 3 ثواني من عدم الحركة
    hideTimeout = setTimeout(() => {
      videoPlayer.classList.add("hide-controls");
    }, 3000);
  }

  // عند تحريك الماوس فوق الفيديو
  videoPlayer.addEventListener("mousemove", showControls);
  videoPlayer.addEventListener("mouseenter", showControls);

  // عند خروج المؤشر – إخفاء سريع
  videoPlayer.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      videoPlayer.classList.add("hide-controls");
    }, 800);
  });

  // عند بداية تشغيل الفيديو – إظهار الأدوات مؤقتًا
  video.addEventListener("play", showControls);


  // ============ دالة لتحويل الوقت إلى دقائق:ثواني ============

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }
});
 