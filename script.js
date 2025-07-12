window.addEventListener('DOMContentLoaded', () => {
    // Responsive utilities
    const isMobile = () => window.innerWidth <= 768;
    const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = () => window.innerWidth > 1024;

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle responsive layout changes
    function handleResponsiveLayout() {
        const container = document.querySelector('.container');
        const header = document.querySelector('.header');
        const hero = document.querySelector('.hero');

        if (isMobile()) {
            // Mobile optimizations
            document.body.classList.add('mobile-view');
            document.body.classList.remove('tablet-view', 'desktop-view');

            // Adjust scroll behavior for mobile
            if (header) {
                header.style.minHeight = '100vh';
            }

            // Optimize touch interactions
            const touchElements = document.querySelectorAll('.major-card, .bento-item, .event-card, .alumni-card');
            touchElements.forEach(el => {
                el.style.cursor = 'pointer';
            });

        } else if (isTablet()) {
            // Tablet optimizations
            document.body.classList.add('tablet-view');
            document.body.classList.remove('mobile-view', 'desktop-view');

        } else {
            // Desktop optimizations
            document.body.classList.add('desktop-view');
            document.body.classList.remove('mobile-view', 'tablet-view');
        }
    }

    // Initialize responsive layout
    handleResponsiveLayout();

    // Handle window resize
    window.addEventListener('resize', debounce(handleResponsiveLayout, 250));

    // Smooth scroll with responsive considerations
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offset = isMobile() ? headerHeight : headerHeight * 0.8;

                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form loading with responsive feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const button = contactForm.querySelector('button[type="submit"]');
            const btnText = button.querySelector('.btn-text');
            const btnLoading = button.querySelector('.btn-loading');

            // Disable form during submission
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => input.disabled = true);

            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            button.disabled = true;

            setTimeout(() => {
                btnText.style.display = '';
                btnLoading.style.display = 'none';
                button.disabled = false;
                inputs.forEach(input => input.disabled = false);

                // Responsive alert
                if (isMobile()) {
                    // Use a more mobile-friendly notification
                    showMobileNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
                } else {
                    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
                }
                contactForm.reset();
            }, 1200);
        });
    }

    // Mobile-friendly notification
    function showMobileNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #fbbf24;
            color: #fff;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 90%;
            text-align: center;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Enhanced scroll animation with responsive considerations
    function handleScrollAnimation() {
        const scrollElements = document.querySelectorAll('.scroll-animate');
        const windowHeight = window.innerHeight;
        const triggerOffset = isMobile() ? 50 : 100;

        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top;
            const elementBottom = rect.bottom;

            if (elementTop < windowHeight - triggerOffset && elementBottom > triggerOffset) {
                el.classList.add('visible');
            } else {
                // Only remove visible class on desktop for better performance
                if (!isMobile()) {
                    el.classList.remove('visible');
                }
            }
        });
    }

    window.addEventListener('scroll', debounce(handleScrollAnimation, 10));
    handleScrollAnimation();

    // Dark mode toggle with responsive considerations
    const darkBtn = document.getElementById('toggle-dark');
    if (darkBtn) {
        darkBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            darkBtn.textContent = '☀️';
        }
    }

    // Enhanced typing effect with responsive speed
    const text = "Khởi nguồn cảm hứng - Vững bước tương lai";
    const el = document.getElementById('typing-slogan');
    if (el) {
        let i = 0;
        const typingSpeed = isMobile() ? 80 : 60; // Slower on mobile for better readability

        function type() {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                el.classList.add('done');
            }
        }
        type();
    }

    // Easter Egg: Click logo 5 lần hiện mascot with responsive considerations
    const logo = document.querySelector('.logo-btec-fixed');
    let clickCount = 0;
    let timer = null;
    let logoHovered = false;

    const mascotEgg = document.getElementById('mascot-easter-egg');
    const mascotClose = document.getElementById('close-mascot');
    const mascotMusic = document.getElementById('toggle-music');
    const mascotAudio = document.getElementById('egg-music');

    function showMascotEgg() {
        mascotEgg.classList.remove('mascot-easter-egg-hidden');
        document.body.classList.add('special-theme');

        // Responsive audio handling
        if (mascotAudio) {
            mascotAudio.currentTime = 0;
            // Only autoplay on desktop due to mobile restrictions
            if (!isMobile()) {
                mascotAudio.play().catch(e => console.log('Audio autoplay blocked'));
            }
        }

        mascotMusic.classList.add('active');
        document.querySelectorAll('form').forEach(f => f.classList.add('hide-on-easter-egg'));
    }

    function hideMascotEgg() {
        mascotEgg.classList.add('mascot-easter-egg-hidden');
        document.body.classList.remove('special-theme');

        if (mascotAudio) {
            mascotAudio.pause();
        }

        mascotMusic.classList.remove('active');
        document.querySelectorAll('form').forEach(f => f.classList.remove('hide-on-easter-egg'));
    }

    if (mascotClose) mascotClose.onclick = hideMascotEgg;
    if (mascotMusic) mascotMusic.onclick = function () {
        if (mascotAudio && mascotAudio.paused) {
            mascotAudio.play().catch(e => console.log('Audio play failed'));
            mascotMusic.classList.add('active');
        } else if (mascotAudio) {
            mascotAudio.pause();
            mascotMusic.classList.remove('active');
        }
    };

    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            clearTimeout(timer);
            timer = setTimeout(() => clickCount = 0, 2000);
            if (clickCount === 5) {
                showMascotEgg();
                clickCount = 0;
            }
        });

        // Only add hover effect on desktop
        if (!isMobile()) {
            logo.addEventListener('mouseenter', () => {
                logo.classList.add('shake');
                logoHovered = true;
                setTimeout(() => logo.classList.remove('shake'), 500);
            });
        }
    }

    // Responsive leaves falling effect
    let leavesEnabled = false;
    let leavesInterval = null;

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';

        // Responsive positioning
        const left = Math.random() * 100;
        leaf.style.left = left + 'vw';
        leaf.style.top = '-40px';

        // Responsive timing
        const duration = isMobile() ? (3 + Math.random() * 2) : (4 + Math.random() * 2.5);
        leaf.style.animation = `leaf-fall-vertical ${duration}s linear forwards`;

        // Responsive sizing
        const baseSize = isMobile() ? 16 : 20;
        const sizeVariation = isMobile() ? 12 : 18;
        leaf.style.fontSize = (baseSize + Math.random() * sizeVariation) + 'px';

        leaf.style.opacity = 0.7 + Math.random() * 0.3;
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

        const leaves = ['🍂', '🍁', '🍃'];
        leaf.innerText = leaves[Math.floor(Math.random() * leaves.length)];

        document.body.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, duration * 1000 + 500);
    }

    function startLeaves() {
        if (leavesInterval) return;
        // Responsive interval
        const interval = isMobile() ? 800 : 500;
        leavesInterval = setInterval(createLeaf, interval);
    }

    function stopLeaves() {
        clearInterval(leavesInterval);
        leavesInterval = null;
        document.querySelectorAll('.falling-leaf').forEach(e => e.remove());
    }

    const leavesBtn = document.getElementById('toggle-leaves');
    if (leavesBtn) {
        leavesBtn.addEventListener('click', function () {
            leavesEnabled = !leavesEnabled;
            this.classList.toggle('active', leavesEnabled);
            if (leavesEnabled) {
                startLeaves();
            } else {
                stopLeaves();
            }
        });
    }

    // Responsive events filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                eventCards.forEach(card => {
                    const category = card.dataset.category;
                    const dateStr = card.dataset.date;
                    const eventDate = new Date(dateStr);

                    let show = false;

                    if (filter === 'all') {
                        show = true;
                    } else if (filter === 'upcoming') {
                        if (eventDate >= today) show = true;
                    } else if (filter === 'past') {
                        if (eventDate < today) show = true;
                    } else {
                        if (category === filter) show = true;
                    }

                    // Responsive animation
                    if (show) {
                        card.style.display = 'block';
                        if (!isMobile()) {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.3s, transform 0.3s';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Enhanced responsive alumni slider
    const alumniSlider = document.querySelector('.alumni-section');
    if (alumniSlider) {
        const track = alumniSlider.querySelector('.alumni-slider-track');
        const prevBtn = alumniSlider.querySelector('#alumni-prev-btn');
        const nextBtn = alumniSlider.querySelector('#alumni-next-btn');
        let currentIndex = 0;
        let autoSlideInterval;
        const slideInterval = isMobile() ? 5000 : 4000; // Slower on mobile

        function updateSlider() {
            const cards = track.querySelectorAll('.alumni-card');
            if (cards.length === 0) return;

            const cardWidth = cards[0].offsetWidth;
            const gap = isMobile() ? 10 : 20;
            track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        }

        function moveToNext() {
            const cards = track.querySelectorAll('.alumni-card');
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }

        function startAutoSlide() {
            if (!isMobile()) { // Only auto-slide on desktop
                autoSlideInterval = setInterval(moveToNext, slideInterval);
            }
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Clone cards for infinite loop effect
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveToNext();
                // Reset auto-slide timer
                stopAutoSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const cards = track.querySelectorAll('.alumni-card');
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateSlider();
                // Reset auto-slide timer
                stopAutoSlide();
                startAutoSlide();
            });
        }

        // Touch/swipe support for mobile
        if (isMobile()) {
            let startX = 0;
            let endX = 0;

            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;

                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        // Swipe left - next
                        moveToNext();
                    } else {
                        // Swipe right - previous
                        const cards = track.querySelectorAll('.alumni-card');
                        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                        updateSlider();
                    }
                }
            });
        }

        alumniSlider.addEventListener('mouseenter', stopAutoSlide);
        alumniSlider.addEventListener('mouseleave', startAutoSlide);

        // Reset transition when looping
        track.addEventListener('transitionend', () => {
            const cards = track.querySelectorAll('.alumni-card');
            const originalCardCount = cards.length / 2;
            if (currentIndex >= originalCardCount) {
                track.style.transition = 'none';
                currentIndex = currentIndex % originalCardCount;
                updateSlider();
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }
        });

        // Responsive resize handling
        window.addEventListener('resize', debounce(updateSlider, 100));

        startAutoSlide();
        updateSlider();
    }

    // Performance optimization for mobile
    if (isMobile()) {
        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('.major-card, .bento-item, .event-card');
        animatedElements.forEach(el => {
            el.style.willChange = 'auto';
        });

        // Disable some heavy animations on mobile
        const heavyAnimations = document.querySelectorAll('.hero-img, .section-img');
        heavyAnimations.forEach(el => {
            el.style.transition = 'none';
        });
    }

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            handleResponsiveLayout();
            // Recalculate slider positions
            const alumniSlider = document.querySelector('.alumni-section');
            if (alumniSlider) {
                const track = alumniSlider.querySelector('.alumni-slider-track');
                if (track) {
                    const cards = track.querySelectorAll('.alumni-card');
                    if (cards.length > 0) {
                        const cardWidth = cards[0].offsetWidth;
                        const gap = isMobile() ? 10 : 20;
                        track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
                    }
                }
            }
        }, 500);
    });

});