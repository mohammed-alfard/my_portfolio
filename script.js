// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                const duration = 800;
                const start = window.pageYOffset;
                const distance = offsetPosition - start;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeOutQuad(timeElapsed, start, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeOutQuad(t, b, c, d) {
                    t /= d;
                    return -c * t*(t-2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });

    // 2. التحكم في سرعة التمرير
    let lastKnownScrollPosition = 0;
    let ticking = false;
    let scrollSpeed = 1;

    window.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.scrollY;
                const delta = (currentScroll - lastKnownScrollPosition) * scrollSpeed;
                window.scrollTo(0, lastKnownScrollPosition + delta);
                ticking = false;
            });
            
            ticking = true;
        }
    });

    // 3. تأثير القصور الذاتي
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 100);
        
        if (!isScrolling) {
            const currentScroll = window.scrollY;
            const deceleration = 0.95;
            
            function slowScroll() {
                window.scrollTo(0, currentScroll * deceleration);
                if (Math.abs(currentScroll - window.scrollY) > 1) {
                    requestAnimationFrame(slowScroll);
                }
            }
            
            requestAnimationFrame(slowScroll);
        }
    });

    // 4. تأثير الالتقاط للأقسام
    const sections = document.querySelectorAll('section');
    let isAnimating = false;

    window.addEventListener('wheel', function(e) {
        if (isAnimating) return;
        
        const currentScroll = window.scrollY;
        const deltaY = e.deltaY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                if (deltaY > 0 && currentScroll < sectionTop + sectionHeight - window.innerHeight) {
                    return;
                } else if (deltaY < 0 && currentScroll > sectionTop) {
                    return;
                } else {
                    e.preventDefault();
                    isAnimating = true;
                    
                    let targetScroll;
                    if (deltaY > 0) {
                        targetScroll = sectionTop + sectionHeight;
                    } else {
                        targetScroll = sectionTop - window.innerHeight;
                    }
                    
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1000);
                }
            }
        });
    }, { passive: false });
    // تهيئة تأثيرات الجسيمات
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

        // Wait for window load
        window.addEventListener('load', function() {
            // Add a slight delay for smoother transition
            setTimeout(function() {
                document.body.classList.add('loaded');
                
                // Remove loader from DOM after animation completes
                setTimeout(function() {
                    const loader = document.getElementById('loader');
                    if (loader) {
                        loader.remove();
                    }
                }, 500); // Match this with the CSS transition time
            }, 500);
        });
        
        // Fallback in case load event doesn't fire
        setTimeout(function() {
            if (!document.body.classList.contains('loaded')) {
                document.body.classList.add('loaded');
                
                setTimeout(function() {
                    const loader = document.getElementById('loader');
                    if (loader) {
                        loader.remove();
                    }
                }, 500);
            }
        }, 4000); // 4 seconds max loading time

    // شريط التنقل
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // تغيير لون الشريط عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // تبديل القائمة على الأجهزة الصغيرة
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // زر العودة للأعلى
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // فلترة المشاريع
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة التنشيط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // تنشيط الزر الحالي
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // تنشيط أشرطة المهارات عند التمرير
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    }

    // رسم مخطط الرادار للمهارات
    function initSkillsChart() {
      const radarCanvas = document.getElementById('skillsRadar');
      if (!radarCanvas) return; // تحقق من وجود العنصر قبل استخدامه
      const ctx = radarCanvas.getContext('2d');
      const skillsChart = new Chart(ctx, {
          type: 'radar',
          data: {
              labels: ['Flutter', 'React Native', 'UI/UX', 'JavaScript', 'Node.js', 'Python'],
              datasets: [{
                  label: 'مستوى المهارة',
                  data: [95, 85, 90, 80, 75, 70],
                  backgroundColor: 'rgba(108, 99, 255, 0.2)',
                  borderColor: 'rgba(108, 99, 255, 1)',
                  borderWidth: 2,
                  pointBackgroundColor: 'rgba(108, 99, 255, 1)',
                  pointBorderColor: '#fff',
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(108, 99, 255, 1)',
              }]
          },
          options: {
              scales: {
                  r: {
                      angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                      suggestedMin: 0,
                      suggestedMax: 100,
                      ticks: { display: false }
                  }
              },
              plugins: {
                  legend: { display: false }
              }
          }
      });
    }

    // تأثيرات الظهور عند التمرير
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .about-container, .skills-container, .timeline-item, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
                
                if (element.classList.contains('skills-container')) {
                    animateSkillBars();
                    initSkillsChart();
                }
            }
        });
    }

    // إرسال نموذج التواصل
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود إرسال النموذج
            const formData = new FormData(this);
            
            // عرض رسالة نجاح
            Swal.fire({
                icon: 'success',
                title: 'تم إرسال رسالتك!',
                text: 'سأرد عليك في أقرب وقت ممكن.',
                confirmButtonColor: 'var(--primary-color)'
            });
            
            // إعادة تعيين النموذج
            this.reset();
        });
    }

    // تبديل السمة (فاتح/غامق)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // التحقق من السمة المحفوظة
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // تهيئة تأثيرات GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // تأثيرات للعناصر الرئيسية
    gsap.from('.hero-text h1', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-text h2', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-text p', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-actions', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    // تأثيرات التمرير للأقسام
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // تشغيل تأثيرات التمرير
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيله مرة واحدة عند التحميل
});

// شريط التقدم
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
});




// تبديل السمة مع تأثيرات متقدمة
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// تأثير تحول السمة
function toggleThemeWithEffect() {
  body.classList.add('theme-transition');
  
  setTimeout(() => {
    body.classList.toggle('dark-theme');
    
    // تحديث الأيقونة
    if (body.classList.contains('dark-theme')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
      
      // تأثير جمالي عند التبديل للوضع المظلم
      gsap.fromTo("body", 
        { backgroundColor: "#f8f9fa" },
        { backgroundColor: "#0f0f1a", duration: 0.8, ease: "power2.inOut" }
      );
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
      
      // تأثير جمالي عند التبديل للوضع الفاتح
      gsap.fromTo("body", 
        { backgroundColor: "#0f0f1a" },
        { backgroundColor: "#f8f9fa", duration: 0.8, ease: "power2.inOut" }
      );
    }
    
    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 500);
  }, 10);
}

// التحقق من السمة المحفوظة
function checkSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// تهيئة السمة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  checkSavedTheme();
  
  // إضافة حدث النقر على زر التبديل
  themeToggle.addEventListener('click', toggleThemeWithEffect);
  
  // مراقبة تغيير تفضيلات النظام
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      toggleThemeWithEffect();
    }
  });
});

// تأثيرات GSAP للتبديل بين السمات
function animateThemeChange() {
  const tl = gsap.timeline();
  
  tl.to("body", {
    duration: 0.5,
    ease: "power2.inOut",
    "--primary-color": body.classList.contains('dark-theme') ? "#7d76ff" : "#6c63ff",
    "--primary-dark": body.classList.contains('dark-theme') ? "#6a63e6" : "#564fd8",
  });
  
  tl.to(".btn-primary, .highlight", {
    duration: 0.5,
    backgroundColor: body.classList.contains('dark-theme') ? "#7d76ff" : "#6c63ff",
    ease: "power2.inOut"
  }, "<");
}


document.addEventListener('DOMContentLoaded', function() {
    // كود Dart الذي سيتم عرضه مع تأثير الكتابة
    const dartCode = `import 'package:flutter/material.dart';

void main() {
  runApp(MyPortfolioApp());
}

class MyPortfolioApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'محفظة أعمالي',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Tajawal',
      ),
      home: HomePage(),
    );
  }
}
`;

    // إنشاء أرقام الأسطر
    const lineNumbers = document.querySelector('.line-numbers');
    const codeLines = dartCode.split('\n').length;
    
    for (let i = 1; i <= codeLines; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
    }

    // إضافة تلوين الجملة للكود
    function highlightCode(code) {
        return code
            .replace(/(import|void|main|runApp|class|extends|return|build|override|Widget|StatelessWidget|MaterialApp|Scaffold|AppBar|Text|Column|Container|SizedBox|EdgeInsets|TextStyle|FontWeight|@override)/g, '<span class="keyword">$1</span>')
            .replace(/(MyPortfolioApp|HomePage|HeroSection|ProjectsSection|SkillsSection|ContactSection)/g, '<span class="type">$1</span>')
            .replace(/(BuildContext|context)/g, '<span class="type">$1</span>')
            .replace(/(child|children|title|theme|home|appBar|body|padding|style|fontSize|fontWeight)/g, '<span class="function">$1</span>')
            .replace(/('.*?')/g, '<span class="string">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    }

    // تأثير الكتابة حرفًا بحرف
    const codeElement = document.getElementById('dart-code');
    let i = 0;
    let currentLine = 1;
    
    function typeWriter() {
        if (i < dartCode.length) {
            // تحديث موضع المؤشر
            document.querySelector('.cursor-position').textContent = `Ln ${currentLine}, Col ${i - dartCode.lastIndexOf('\n', i) + 1}`;
            
            // إضافة الحرف التالي
            const char = dartCode.charAt(i);
            codeElement.innerHTML = highlightCode(dartCode.substring(0, i + 1));
            
            // التمرير لأسفل عند الحاجة
            if (char === '\n') {
                currentLine++;
                codeElement.parentElement.scrollTop = codeElement.scrollHeight;
            }
            
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 20); // سرعة عشوائية بين 20-70ms
        } else {
            // إضافة مؤشر وامض بعد انتهاء الكتابة
            codeElement.innerHTML = highlightCode(dartCode) + '<span class="cursor">|</span>';
            startCursorBlink();
        }
    }

    // تأثير وميض المؤشر
    function startCursorBlink() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }, 500);
        }
    }

    // بدء تأثير الكتابة بعد 1 ثانية
    setTimeout(typeWriter, 1000);

    // محاكاة زر التشغيل
    document.querySelector('.run-button').addEventListener('click', function() {
        this.classList.add('running');
        setTimeout(() => {
            this.classList.remove('running');
        }, 2000);
    });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // بيانات النموذج
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();

    // رقم الواتساب (بدون "+" فقط رمز الدولة والرقم)
    var phone = "966593025707";
    
    // نص الرسالة مع الإيموجيات
    var text = `👤 الاسم: ${name}\n📧 البريد: ${email}\n📝 الموضوع: ${subject}\n💬 الرسالة: ${message}`;

    // ترميز النص
    var encodedText = encodeURIComponent(text);

    // فتح واتساب
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
});


// الترجمات
const translations = {
  ar: {
    loading_portfolio: "جاري تحميل ...",
    page_title: "معرض أعمالي البرمجية | مطور تطبيقات محترف",
    loading: "جاري التحميل...",
    logo_name: "محمد الفرد",
    logo_job: "مطور تطبيقات",
    nav_home: "الرئيسية",
    nav_projects: "أعمالي",
    nav_skills: "مهاراتي",
    nav_about: "عني",
    nav_contact: "تواصل",
    welcome: "مرحباً، أنا",
    my_name: "محمد الفرد",
    job_title: "مطور تطبيقات",
    welcome_desc: "أصمم وأطور تطبيقات عالية الجودة تلبي احتياجات المستخدمين وتقدم تجربة فريدة",
    view_projects: "عرض أعمالي",
    contact_me: "تواصل معي",
    projects_title: "أعمالي البرمجية",
    projects_subtitle: "أحدث المشاريع التي قمت بتطويرها",
    filter_all: "الكل",
    filter_mobile: "تطبيقات موبايل",
    filter_web: "تطبيقات ويب",
    project1_title: "تطبيق عقاركم",
    project1_desc: "تطبيق يخدم العرض والطلب في السوق العقاري ويقدم تجربة مستخدم متميزة. مملوك لشركة عقاركم التابعة لاعمال النضة القابضة",
    ios_version: "نسخة IOS",
    android_version: "نسخة Android",
    project2_title: "تطبيق أفرز عقارك",
    project2_desc: "تطبيق يساعد ملاك العقارات على فرز عقاراتهم بشكل فعال وسهل",
    under_test: "(التطبيق تحت الاختبار )",
    skills_title: "مهاراتي التقنية",
    skills_subtitle: "الأدوات والتقنيات التي أتقنها",
    about_title: "تعرف عليّ",
    about_subtitle: "من أنا وماذا أقدم",
    about_hello: "مرحباً، أنا محمد الفرد",
    about_desc: "مطور تطبيقات  بخبرة تزيد عن 5 سنوات في تصميم وتطوير حلول برمجية مبتكرة. أتمتع بشغف كبير لتحويل الأفكار إلى تطبيقات عملية تلبي احتياجات المستخدمين.",
    full_name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    location: "الموقع",
    languages: "اللغات",
    languages_list: "العربية، الإنجليزية",
    contact_me_btn: "تواصل معي",
    journey_title: "رحلتي المهنية",
    journey_subtitle: "خبراتي الأكاديمية والعملية",
    flutter_dev: "مطور Flutter",
    company_renaissance: "شركة أعمال النهضة القابضة ",
    freelance_dev: "مطور برمجيات حر",
    company_freelance: "عمل مستقل",
    teacher: "معلم حاسب آلي",
    company_school: "مدارس التميز الإبداعية",
    intern: "متدرب مطور خلفية",
    company_tribinnov: "Tribinnov Africa (عن بُعد)",
    bachelor: "بكالوريوس في نظم المعلومات",
    company_kku: "جامعة الملك خالد",
    contact_title: "تواصل معي",
    contact_subtitle: "أنا متاح للعمل الحر والعقود",
    contact_email: "البريد الإلكتروني",
    send_email: "ارسال رسالة",
    contact_phone: "الهاتف",
    call_me: "اتصل بي",
    form_name: "اسمك الكامل",
    form_email: "بريدك الإلكتروني",
    form_subject: "موضوع الرسالة",
    form_message: "رسالتك",
    send_message: "إرسال الرسالة",
    footer_links: "روابط سريعة",
    footer_services: "خدماتي",
    footer_rights: "جميع الحقوق محفوظة  محمد الفرد",
    back_to_top: "أعلى",
    project4_title: "نظام لوجستي",
    project4_desc: "نظام متكامل مخصص لمؤسسات النقل البترولي مملوك لشركة الرجف للنقليات",
    to_view_version:"لعرض نسخة يرجاء التواصل ",
    mobile_development: "تطوير تطبيقات موبايل",
    web_development: "تطوير تطبيقات ويب",
    date_flutter_dev: "سبتمبر 2024 - يوليو 2025",
            flutter_dev_desc: `تطوير تطبيقات عالية الأداء لأنظمة iOS وAndroid باستخدام Flutter وDart.
    تصميم واجهات تدعم الوضع الليلي، الاتجاه من اليمين لليسار، وتجربة مستخدم حديثة.
    دمج واجهات RESTful باستخدام بنية BLoC وProvider.
    تحسين الأداء وإدارة الحالة والذاكرة بكفاءة.
    دعم الترجمة وسهولة الوصول داخل التطبيق.`,
    date_freelance_dev:"مارس 2023 - حتى الآن",
    freelance_dev_desc:`                        تنفيذ تطبيقات كاملة باستخدام Angular 17 وTypeScript و.NET 6 Web API.
                        إنشاء واجهات تفاعلية باستخدام Reactive Forms وRxJS.
                        تطبيق مصادقة JWT آمنة، ودعم التحديثات اللحظية عبر SignalR.
                        الالتزام بالمعمارية الطبقية لكتابة كود منظم وقابل للتوسع.`,
                        date_computer_teacher:'أغسطس 2022 - يونيو 2024',
                        computer_teacher_desc: `تدريس مواد علوم الحاسب لطلاب المرحلة المتوسطة والثانوية، مع التركيز على أساسيات البرمجة ومبادئ تطوير البرمجيات.
                        تطوير خطط دراسية جذابة وتمارين عملية لتعزيز فهم الطلاب واهتمامهم بالتكنولوجيا.`,
    date_intern: 'يونيو 2021 - أغسطس 2021',
    intern_desc: `متدرب مطور خلفية في Tribinnov Africa، حيث عملت على تطوير واجهات برمجة التطبيقات باستخدام .NET وC#.
    اكتسبت خبرة في العمل مع قواعد البيانات وتحسين أداء التطبيقات.`,
    date_education: 'سبتمبر 2016 - يونيو 2021',
    education_desc: `بكالوريوس في نظم المعلومات من جامعة الملك خالد، حيث درست تطوير البرمجيات، إدارة قواعد البيانات، وتحليل النظم.
    شاركت في مشاريع متنوعة عززت مهاراتي في البرمجة وفهمي لمبادئ هندسة البرمجيات.`,

  },
  en: {
    loading_portfolio: "Loading Portfolio...",
    page_title: "My Coding Portfolio | Professional App Developer",
    loading: "Loading...",
    logo_name: "Mohammed Alfard",
    logo_job: "App Developer",
    nav_home: "Home",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_about: "About",
    nav_contact: "Contact",
    welcome: "Hello, I'm",
    my_name: "Mohammed Alfard",
    job_title: "App Developer",
    welcome_desc: "I design and develop high-quality apps that meet user needs and deliver a unique experience.",
    view_projects: "View My Work",
    contact_me: "Contact Me",
    projects_title: "My Coding Projects",
    projects_subtitle: "Latest projects I've developed",
    filter_all: "All",
    filter_mobile: "Mobile Apps",
    filter_web: "Web Apps",
    project1_title: "Aqarcom App",
    project1_desc: "An app serving supply and demand in the real estate market, offering a distinguished user experience. Owned by Aqarcom, part of Renaissance Holding.",
    ios_version: "IOS Version",
    android_version: "Android Version",
    project2_title: "Afriz Aqark App",
    project2_desc: "An app that helps property owners sort their properties efficiently and easily.",
    under_test: "(App under testing)",
    skills_title: "My Technical Skills",
    skills_subtitle: "Tools and technologies I master",
    about_title: "About Me",
    about_subtitle: "Who I am and what I offer",
    about_hello: "Hello, I'm Mohammed Alfard",
    about_desc: "App developer with over 5 years of experience in designing and developing innovative software solutions. Passionate about turning ideas into practical apps that meet user needs.",
    full_name: "Full Name",
    email: "Email",
    location: "Location",
    languages: "Languages",
    languages_list: "Arabic, English",
    contact_me_btn: "Contact Me",
    journey_title: "My Career Journey",
    journey_subtitle: "Academic and professional experiences",
    flutter_dev: "Flutter Developer",
    company_renaissance: "Renaissance Holding Company",
    freelance_dev: "Freelance Software Developer",
    company_freelance: "Freelance",
    teacher: "Computer Teacher",
    company_school: "Tamayuz Creativity Schools",
    intern: "Backend Developer Intern",
    company_tribinnov: "Tribinnov Africa (Remote)",
    bachelor: "Bachelor in Information Systems",
    company_kku: "King Khalid University",
    contact_title: "Contact Me",
    contact_subtitle: "Available for freelance and contracts",
    contact_email: "Email",
    send_email: "Send Message",
    contact_phone: "Phone",
    call_me: "Call Me",
    form_name: "Your Full Name",
    form_email: "Your Email",
    form_subject: "Message Subject",
    form_message: "Your Message",
    send_message: "Send Message",
    footer_links: "Quick Links",
    footer_services: "My Services",
    footer_rights: "All rights reserved Mohammed Alfard",
    back_to_top: "Back to Top",
    project4_title: "Logistics System",
    project4_desc: "An integrated system dedicated to petroleum transport institutions, owned by Al Raj Transport Company.",
    to_view_version: "To view the version, please contact ",
    mobile_development: "Mobile App Development",
    web_development: "Web App Development",
    date_flutter_dev: "September 2024 - July 2025",
    flutter_dev_desc: `Developed high-performance applications for iOS and Android using Flutter and Dart. Designed interfaces with support for dark mode, right-to-left layout, and modern user experience. Integrated RESTful APIs using BLoC and Provider architecture. Optimized performance with efficient state and memory management. Implemented localization and accessibility support within the app.`,
    date_freelance_dev: "March 2023 - Present",
    freelance_dev_desc: `Implemented full-stack applications using Angular 17, TypeScript, and .NET 6 Web API. Created interactive interfaces with Reactive Forms and RxJS. Applied secure JWT authentication and real-time updates via SignalR. Adhered to layered architecture for organized and scalable code.`,
    date_computer_teacher: 'August 2022 - June 2024',
    computer_teacher_desc: `Taught computer science subjects to middle and high school students, focusing on programming fundamentals and software development principles. Developed engaging lesson plans and practical exercises to enhance student understanding and interest in technology.`,
    date_intern: 'June 2021 - August 2021',
    intern_desc: `Backend developer intern at Tribinnov Africa, where I worked on developing APIs using .NET and C#. Gained experience in working with databases and optimizing application performance.`,
    date_education: 'September 2016 - June 2021',
    education_desc: `Bachelor's degree in Information Systems from King Khalid University, where I studied software development, database management, and system analysis. Participated in various projects that enhanced my programming skills and understanding of software engineering principles.`,
  }
};

// دالة الترجمة
function translate(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // تغيير عنوان الصفحة
  if (translations[lang].page_title) {
    document.title = translations[lang].page_title;
  }
}

// تطبيق الترجمة عند تغيير اللغة
document.getElementById('langSwitcher').addEventListener('change', function() {
  translate(this.value);
});

// تطبيق الترجمة عند تحميل الصفحة (افتراضي العربية)
document.addEventListener('DOMContentLoaded', function() {
  translate(document.documentElement.lang || 'ar');
});

// تفعيل اختيار اللغة من القائمة التفاعلية
document.querySelectorAll('#languageOptions li').forEach(li => {
  li.addEventListener('click', function () {
    const lang = this.getAttribute('data-value');
    // تغيير قيمة السلكت المخفي
    document.getElementById('langSwitcher').value = lang;
    // تطبيق الترجمة
    translate(lang);

    // تحديث الشكل
    document.querySelectorAll('#languageOptions li').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    document.getElementById('selectedFlag').textContent = this.querySelector('.language-flag').textContent;
    document.getElementById('selectedText').textContent = this.querySelector('.language-text').textContent;
  });
});

// إظهار/إخفاء قائمة اللغات عند الضغط على المحدد
document.getElementById('selectedLanguage').addEventListener('click', function () {
  const options = document.getElementById('languageOptions');
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
});

// إغلاق القائمة عند الضغط خارجها
document.addEventListener('click', function (e) {
  const selector = document.querySelector('.selector-container');
  if (!selector.contains(e.target)) {
    document.getElementById('languageOptions').style.display = 'none';
  }
});




