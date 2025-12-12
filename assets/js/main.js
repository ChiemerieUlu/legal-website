document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    const practiceCarousel = document.getElementById('practiceCarousel');
    if (practiceCarousel) {
        const practiceCards = practiceCarousel.querySelectorAll('.practice-card');
        const practiceControls = document.querySelector('.practice-areas .carousel-controls');

        if (practiceControls && practiceCards.length > 0) {
            let currentIndex = 0;
            const cardsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4;

            practiceControls.querySelector('.prev').addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + practiceCards.length) % practiceCards.length;
                updatePracticeCarousel();
            });

            practiceControls.querySelector('.next').addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % practiceCards.length;
                updatePracticeCarousel();
            });

            function updatePracticeCarousel() {
                practiceCards.forEach((card, index) => {
                    if (index === currentIndex) {
                        card.style.display = 'block';
                    }
                });
            }
        }
    }

    const attorneysCarousel = document.getElementById('attorneysCarousel');
    if (attorneysCarousel) {
        const track = attorneysCarousel.querySelector('.attorneys-track');
        const prevBtn = attorneysCarousel.querySelector('.carousel-btn.prev');
        const nextBtn = attorneysCarousel.querySelector('.carousel-btn.next');
        let currentPosition = 0;

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPosition > 0) {
                    currentPosition--;
                    updateAttorneysCarousel();
                }
            });

            nextBtn.addEventListener('click', function() {
                const cards = track.querySelectorAll('.attorney-card');
                const maxPosition = cards.length - (window.innerWidth < 768 ? 1 : 4);
                if (currentPosition < maxPosition) {
                    currentPosition++;
                    updateAttorneysCarousel();
                }
            });
        }

        function updateAttorneysCarousel() {
            const cardWidth = track.querySelector('.attorney-card').offsetWidth;
            const gap = 32;
            track.style.transform = `translateX(-${currentPosition * (cardWidth + gap)}px)`;
        }
    }

    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        const track = testimonialsCarousel.querySelector('.testimonials-track');
        const prevBtn = testimonialsCarousel.querySelector('.carousel-btn.prev');
        const nextBtn = testimonialsCarousel.querySelector('.carousel-btn.next');
        let currentSlide = 0;

        if (prevBtn && nextBtn && track) {
            const cards = track.querySelectorAll('.testimonial-card');

            function updateTestimonialsCarousel() {
                cards.forEach((card, index) => {
                    card.style.opacity = '0.5';
                    card.style.transform = 'scale(0.9)';
                    card.style.transition = 'all 0.3s ease';
                });

                if (cards[currentSlide]) {
                    cards[currentSlide].style.opacity = '1';
                    cards[currentSlide].style.transform = 'scale(1)';
                }
            }

            prevBtn.addEventListener('click', function() {
                currentSlide = currentSlide > 0 ? currentSlide - 1 : cards.length - 1;
                updateTestimonialsCarousel();
            });

            nextBtn.addEventListener('click', function() {
                currentSlide = currentSlide < cards.length - 1 ? currentSlide + 1 : 0;
                updateTestimonialsCarousel();
            });

            updateTestimonialsCarousel();

            setInterval(function() {
                currentSlide = currentSlide < cards.length - 1 ? currentSlide + 1 : 0;
                updateTestimonialsCarousel();
            }, 5000);
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const formGroups = contactForm.querySelectorAll('.form-group');

            formGroups.forEach(function(group) {
                group.classList.remove('error');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = '';
                }
            });

            const name = document.getElementById('name');
            if (name && name.value.trim().length < 2) {
                showError(name, 'Please enter a valid name');
                isValid = false;
            }

            const email = document.getElementById('email');
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    showError(email, 'Please enter a valid email address');
                    isValid = false;
                }
            }

            const phone = document.getElementById('phone');
            if (phone) {
                const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
                if (!phoneRegex.test(phone.value.trim()) || phone.value.trim().length < 10) {
                    showError(phone, 'Please enter a valid phone number');
                    isValid = false;
                }
            }

            const service = document.getElementById('service');
            if (service && service.value === '') {
                showError(service, 'Please select a practice area');
                isValid = false;
            }

            const message = document.getElementById('message');
            if (message && message.value.trim().length < 10) {
                showError(message, 'Please provide more details about your case (at least 10 characters)');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;

                setTimeout(function() {
                    alert('Thank you for contacting us! We will get back to you within 24 hours.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }

    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]');
            if (email && email.value.trim()) {
                alert('Thank you for subscribing to our newsletter!');
                form.reset();
            }
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                faqItems.forEach(function(faq) {
                    faq.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }

            lastScroll = currentScroll;
        });
    }

    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = '';
                }
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

});
