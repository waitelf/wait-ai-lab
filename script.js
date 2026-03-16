document.addEventListener('DOMContentLoaded', () => {
    const navLinks = [...document.querySelectorAll('nav a')];
    const sectionsWithId = [...document.querySelectorAll('section[id]')];

    if (navLinks.length && sectionsWithId.length) {
        const updateActiveNav = () => {
            let current = '';
            sectionsWithId.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id') || '';
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-black', 'font-bold');
                const href = link.getAttribute('href') || '';
                if (current && href.includes(`#${current}`)) {
                    link.classList.add('text-black', 'font-bold');
                }
            });
        };

        updateActiveNav();
        window.addEventListener('scroll', updateActiveNav);
    }

    const reveals = [...document.querySelectorAll('.reveal')];
    if (reveals.length) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('inview');
                });
            },
            { threshold: 0.1 }
        );

        reveals.forEach(el => observer.observe(el));
    }

    const stage = document.querySelector('.avatar-stage');
    const glass = stage ? stage.querySelector('.avatar-glass') : null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (stage && glass && !reduceMotion) {
        stage.addEventListener('mousemove', e => {
            const r = stage.getBoundingClientRect();
            const rx = (e.clientX - r.left) / r.width - 0.5;
            const ry = (e.clientY - r.top) / r.height - 0.5;
            glass.style.transform = `rotateX(${-ry * 10}deg) rotateY(${rx * 10}deg) translateZ(0)`;
        });

        stage.addEventListener('mouseleave', () => {
            glass.style.transform = 'none';
        });
    }

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', e => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        document.addEventListener('click', e => {
            if (
                !mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });
    }

    if (!reduceMotion && window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        const createSplitSpans = (container, mode) => {
            const source = document.createElement('div');
            source.innerHTML = container.innerHTML;
            container.innerHTML = '';

            const spans = [];
            const pushText = text => {
                if (!text) return;

                const units = mode === 'words'
                    ? text.split(/(\s+)/)
                    : Array.from(text);

                for (const unit of units) {
                    if (unit === '\n') {
                        container.appendChild(document.createElement('br'));
                        continue;
                    }

                    if (mode === 'words' && /^\s+$/.test(unit)) {
                        container.appendChild(document.createTextNode(unit));
                        continue;
                    }

                    const span = document.createElement('span');
                    span.className = mode === 'words' ? 'split-word' : 'split-char';
                    span.textContent = unit;
                    container.appendChild(span);
                    spans.push(span);
                }
            };

            const walk = node => {
                node.childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        pushText(child.textContent || '');
                        return;
                    }

                    if (child.nodeType === Node.ELEMENT_NODE) {
                        if (child.tagName === 'BR') {
                            container.appendChild(document.createElement('br'));
                            return;
                        }
                        pushText(child.textContent || '');
                    }
                });
            };

            walk(source);
            return spans;
        };

        const animateSplit = el => {
            const mode = el.getAttribute('data-split') || 'chars';
            const targets = createSplitSpans(el, mode);
            if (!targets.length) return;

            window.gsap.set(targets, { opacity: 0, y: 40, force3D: true });

            const inHero = Boolean(el.closest('#home'));
            if (inHero) {
                window.gsap.to(targets, {
                    opacity: 1,
                    y: 0,
                    duration: 1.25,
                    ease: 'power3.out',
                    stagger: 0.05,
                    delay: 0.15,
                    force3D: true
                });
                return;
            }

            window.gsap.fromTo(
                targets,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.25,
                    ease: 'power3.out',
                    stagger: 0.05,
                    force3D: true,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        once: true,
                        fastScrollEnd: true,
                        anticipatePin: 0.4
                    }
                }
            );
        };

        const run = () => {
            document.querySelectorAll('.js-split').forEach(el => {
                if (el.getAttribute('data-split-ready') === '1') return;
                el.setAttribute('data-split-ready', '1');
                animateSplit(el);
            });
        };

        if (document.fonts && document.fonts.status !== 'loaded') {
            document.fonts.ready.then(run).catch(run);
        } else {
            run();
        }
    }
});
