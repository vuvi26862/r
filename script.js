window.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form loading
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const button = contactForm.querySelector('button[type="submit"]');
            const btnText = button.querySelector('.btn-text');
            const btnLoading = button.querySelector('.btn-loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            button.disabled = true;
            setTimeout(() => {
                btnText.style.display = '';
                btnLoading.style.display = 'none';
                button.disabled = false;
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
                contactForm.reset();
            }, 1200);
        });
    }

    // Scroll animation
    function handleScrollAnimation() {
        document.querySelectorAll('.scroll-animate').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60 && rect.bottom > 60) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // Dark mode toggle
    const darkBtn = document.getElementById('toggle-dark');
    if (darkBtn) {
        darkBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // Typing effect for slogan
    const text = "Khởi nguồn cảm hứng - Vững bước tương lai";
    const el = document.getElementById('typing-slogan');
    if (el) {
        let i = 0;
        function type() {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 60);
            } else {
                el.classList.add('done');
            }
        }
        type();
    }

    // Easter Egg: Click logo 5 lần hiện mascot
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
        mascotAudio.currentTime = 0;
        mascotAudio.play();
        mascotMusic.classList.add('active');
        // Ẩn tất cả form khi mở mascot
        document.querySelectorAll('form').forEach(f => f.classList.add('hide-on-easter-egg'));
    }
    function hideMascotEgg() {
        mascotEgg.classList.add('mascot-easter-egg-hidden');
        document.body.classList.remove('special-theme');
        mascotAudio.pause();
        mascotMusic.classList.remove('active');
        // Hiện lại tất cả form khi đóng mascot
        document.querySelectorAll('form').forEach(f => f.classList.remove('hide-on-easter-egg'));
    }
    if (mascotClose) mascotClose.onclick = hideMascotEgg;
    if (mascotMusic) mascotMusic.onclick = function () {
        if (mascotAudio.paused) {
            mascotAudio.play();
            mascotMusic.classList.add('active');
        } else {
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
    }
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('shake');
            logoHovered = true;
            setTimeout(() => logo.classList.remove('shake'), 500);
        });
    }

    // Leaves falling effect
    let leavesEnabled = false;
    let leavesInterval = null;

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = (3 + Math.random() * 3) + 's';
        leaf.style.opacity = 0.7 + Math.random() * 0.3;
        leaf.style.fontSize = (18 + Math.random() * 18) + 'px';
        leaf.innerText = '🍂';
        document.body.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, 6000);
    }

    function startLeaves() {
        if (leavesInterval) return;
        leavesInterval = setInterval(createLeaf, 500);
    }

    function stopLeaves() {
        clearInterval(leavesInterval);
        leavesInterval = null;
        document.querySelectorAll('.falling-leaf').forEach(e => e.remove());
    }

    document.getElementById('toggle-leaves').addEventListener('click', function () {
        leavesEnabled = !leavesEnabled;
        this.classList.toggle('active', leavesEnabled);
        if (leavesEnabled) {
            startLeaves();
        } else {
            stopLeaves();
        }
    });


    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';

        // Random vị trí ngang (left) từ 0vw đến 100vw
        const left = Math.random() * 100;
        leaf.style.left = left + 'vw';
        leaf.style.top = '-40px';

        // Thời gian rơi và hiệu ứng
        const duration = 4 + Math.random() * 2.5; // 4-6.5s
        leaf.style.animation = `leaf-fall-vertical ${duration}s linear forwards`;

        // Tùy chỉnh lá
        leaf.style.opacity = 0.7 + Math.random() * 0.3;
        leaf.style.fontSize = (20 + Math.random() * 18) + 'px';
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Random 1 trong 3 emoji lá
        const leaves = ['🍂', '🍁', '🍃'];
        leaf.innerText = leaves[Math.floor(Math.random() * leaves.length)];

        document.body.appendChild(leaf);

        setTimeout(() => {
            leaf.remove();
        }, duration * 1000 + 500);
    }

    // Events filter
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
                today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

                eventCards.forEach(card => {
                    const category = card.dataset.category;
                    const dateStr = card.dataset.date; // Expects YYYY-MM-DD format
                    const eventDate = new Date(dateStr);

                    let show = false;

                    if (filter === 'all') {
                        show = true;
                    } else if (filter === 'upcoming') {
                        if (eventDate >= today) show = true;
                    } else if (filter === 'past') {
                        if (eventDate < today) show = true;
                    } else { // Category filter
                        if (category === filter) show = true;
                    }

                    if (show) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Alumni Slider
    const alumniSlider = document.querySelector('.alumni-section');
    if (alumniSlider) {
        const track = alumniSlider.querySelector('.alumni-slider-track');
        const prevBtn = alumniSlider.querySelector('#alumni-prev-btn');
        const nextBtn = alumniSlider.querySelector('#alumni-next-btn');
        let currentIndex = 0;
        let autoSlideInterval;
        const slideInterval = 4000; // 4 seconds

        function updateSlider() {
            const cards = track.querySelectorAll('.alumni-card');
            if (cards.length === 0) return;
            const cardWidth = cards[0].offsetWidth;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        function moveToNext() {
            const cards = track.querySelectorAll('.alumni-card');
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(moveToNext, slideInterval);
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

        nextBtn.addEventListener('click', () => {
            moveToNext();
        });

        prevBtn.addEventListener('click', () => {
            const cards = track.querySelectorAll('.alumni-card');
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        });

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
        
        window.addEventListener('resize', updateSlider);

        startAutoSlide();
        updateSlider();
    }


});