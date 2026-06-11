// 导航栏组件
function renderNav() {
    const pathname = window.location.pathname;
    const isSubPage = pathname.includes('/projects/') || pathname.includes('/insights/');
    const isPortfolioPage = pathname.endsWith('/portfolio.html') || pathname.endsWith('portfolio.html');
    const resumeLink = isSubPage ? '../assets/Resume.pdf' : 'assets/Resume.pdf';
    const portfolioLink = isSubPage ? '../portfolio.html' : 'portfolio.html';
    const homeLink = isSubPage ? '../index.html' : isPortfolioPage ? 'index.html#home' : '#home';
    const homeSectionLink = (hash) => {
        if (isSubPage) return `../index.html${hash}`;
        if (isPortfolioPage) return `index.html${hash}`;
        return hash;
    };

    const navLinks = isPortfolioPage
        ? [
            { label: 'Home', href: 'index.html#home' },
            { label: 'Portfolio', href: '#portfolio-home' },
            { label: 'Highlights', href: '#portfolio-highlights' },
            { label: 'Projects', href: '#portfolio-projects' },
            { label: 'Contact', href: '#portfolio-contact' }
        ]
        : [
            { label: 'Home', href: homeLink },
            { label: 'About', href: homeSectionLink('#about') },
            { label: 'Portfolio', href: portfolioLink },
            { label: 'AI Projects', href: homeSectionLink('#ai-projects') },
            { label: 'Growth Projects', href: homeSectionLink('#growth-projects') },
            { label: 'Insights', href: homeSectionLink('#insights') }
        ];

    const desktopLinks = navLinks
        .map(link => `<a class="hover:text-black transition-colors duration-300" href="${link.href}">${link.label}</a>`)
        .join('');

    const mobileLinks = navLinks
        .map(link => `<a class="block text-gray-500 hover:text-black font-medium text-base transition-colors py-1.5" href="${link.href}">${link.label}</a>`)
        .join('');

    const navHTML = `
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <a href="${homeLink}" class="flex items-center space-x-3 group">
                <div class="w-6 h-6 bg-black rounded-md shadow-lg group-hover:scale-105 transition-transform duration-300"></div>
                <span class="font-bold text-lg tracking-tight text-gray-900 group-hover:text-black transition-colors">Wait AI Lab</span>
            </a>
        </div>
        <div class="hidden md:flex items-center space-x-6 text-[15px] font-medium text-gray-500">
            ${desktopLinks}
        </div>
        <div class="hidden md:flex items-center gap-3">
            <a class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-gray-100 hover:bg-white/10 transition-all" href="${resumeLink}" download>下载简历</a>
        </div>
        <div class="md:hidden relative">
            <button id="menu-btn" class="p-2 text-gray-600 hover:text-black transition-colors">
                <span class="iconify text-2xl" data-icon="lucide:menu"></span>
            </button>
            <!-- 移动端菜单列表 (默认隐藏) -->
            <div id="mobile-menu" class="hidden absolute top-full right-0 mt-4 w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 p-5 flex-col space-y-1 transform origin-top-right transition-all duration-200">
                ${mobileLinks}
                <a class="mt-2 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500" href="${resumeLink}" download>下载简历</a>
            </div>
        </div>
    </div>
    `;
    
    const nav = document.createElement('nav');
    nav.className = 'fixed top-0 w-full z-50 apple-blur transition-all duration-500';
    nav.innerHTML = navHTML;
    
    // 插入到 body 的第一个子元素之前
    document.body.insertBefore(nav, document.body.firstChild);
}

// 页脚组件
function renderFooter() {
    const pathname = window.location.pathname;
    const isSubPage = pathname.includes('/projects/') || pathname.includes('/insights/');
    const isPortfolioPage = pathname.endsWith('/portfolio.html') || pathname.endsWith('portfolio.html');
    const homeLink = isSubPage ? '../index.html' : isPortfolioPage ? 'index.html#home' : '#home';
    const portfolioLink = isSubPage ? '../portfolio.html' : 'portfolio.html';
    const resumeLink = isSubPage ? '../assets/Resume.pdf' : 'assets/Resume.pdf';

    const footerHTML = `
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div class="max-w-3xl">
                <h2 class="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-10 text-white">
                    把增长做成结果<br/>
                    <span class="text-gray-500">把执行沉淀成作品。</span>
                </h2>
                <p class="text-gray-400 text-xl font-light mb-12 max-w-xl leading-relaxed">
                    我正在申请运营相关岗位，希望把用户增长、活动执行、数据复盘和 AI 提效能力，放进真实业务里持续迭代。
                </p>
                <div class="space-y-4">
                    <a class="text-3xl font-bold block underline decoration-gray-800 underline-offset-8 hover:decoration-white hover:text-gray-200 transition-all duration-300" href="mailto:WaiTao1229@163.com">
                        WaiTao1229@163.com
                    </a>
                    <p class="text-sm text-gray-500">可沟通岗位：用户增长 / 活动运营 / 社群运营 / AI 运营</p>
                </div>
            </div>
            <div class="space-y-8 pt-4">
                <h4 class="text-gray-600 font-bold uppercase tracking-[0.2em] text-xs">QUICK LINKS</h4>
                <ul class="space-y-4 font-medium text-lg text-gray-400">
                    <li><a class="hover:text-white transition-colors duration-300 flex items-center gap-2 group" href="${homeLink}"><span class="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-white transition-colors"></span>回到首页</a></li>
                    <li><a class="hover:text-white transition-colors duration-300 flex items-center gap-2 group" href="${portfolioLink}"><span class="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-white transition-colors"></span>作品集 / 项目经历</a></li>
                    <li><a class="hover:text-white transition-colors duration-300 flex items-center gap-2 group" href="${resumeLink}" download><span class="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-white transition-colors"></span>下载简历</a></li>
                </ul>
            </div>
        </div>
        <div class="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <span class="font-bold text-white">A</span>
                </div>
                <p class="text-gray-600 text-sm font-medium">© 2026 Wei Tao Portfolio.</p>
            </div>
            <div class="text-gray-600 text-sm font-medium flex items-center gap-6">
                <span>Beijing</span>
                <span class="w-1 h-1 rounded-full bg-gray-800"></span>
                <span>Shanghai</span>
                <span class="w-1 h-1 rounded-full bg-gray-800"></span>
                <span>Remote</span>
            </div>
        </div>
    </div>
    `;

    const footer = document.createElement('footer');
    footer.className = 'bg-[#050505] text-white py-24 border-t border-gray-100/10'; // Darker black for premium feel
    footer.innerHTML = footerHTML;

    // 插入到 script 标签之前，或者 body 的最后
    const script = document.querySelector('script[src*="script.js"]');
    if (script) {
        document.body.insertBefore(footer, script);
    } else {
        document.body.appendChild(footer);
    }
}

// 初始化组件
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('theme-dark');
    // 移除页面中现有的硬编码 nav 和 footer (如果有)
    const existingNav = document.querySelector('nav');
    if (existingNav) existingNav.remove();
    
    const existingFooter = document.querySelector('footer');
    if (existingFooter) existingFooter.remove();

    renderNav();
    renderFooter();

    // 重新绑定菜单事件，因为 DOM 刚刚被替换
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            // 简单的动画效果
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'scale(1)';
                }, 10);
            }
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });
    }
});
