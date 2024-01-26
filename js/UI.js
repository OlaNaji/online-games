import ApiFetcher from './apiFetcher.js';
import Display from './displayManager.js'
import Sidebar from './sidebar.js';


class UI {
    constructor() {
        this.loading = document.querySelector(".loading");

        this.attachNavbarLinksListener();
        this.initializeCarousels();
        this.initializeScrollEvent();
        this.addEventListeners();
        this.closeSidebar()
        this.scrollToSection
    }

    initializeCarousels() {
        var swiperPopular = new Swiper('.popular-game-carousel', {
            slidesPerView: 1,
            spaceBetween: 120,
            loop: true,
            autoplay: {
                delay: 2000,
            }
        });

        var swiperNew = new Swiper('.new-game-carousel', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: false,
            breakpoints: {
                576: {
                    slidesPerView: 3,
                },
            },
        });
    }

    initializeScrollEvent() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        if (window.scrollY > 132) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            let navbar_height = document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
        } else {
            document.getElementById('navbar_top').classList.remove('fixed-top');
            document.body.style.paddingTop = '0';
        }
    }

    closeSidebar() {
        document.querySelector('.navbar-toggler').classList.toggle('collapsed', true);
        document.querySelector('.navbar-collapse').classList.remove('show');
    }

    attachNavbarLinksListener() {
        let navbarItem = document.querySelectorAll('.dropdown-item');

        for (let i = 0; i < navbarItem.length; i++) {
            navbarItem[i].addEventListener('click', async (event) => {
                await this.handleNavbarLinkClick(event);
            });
        }
    }

    async handleNavbarLinkClick(event) {
        
        this.loading.classList.remove('hideBox')
        this.loading.classList.add('showBox');
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'


        let category = event.target.text;
        try {
            const categoryData = await ApiFetcher.fetchGamesByCategory(category);
            const display = new Display();
            display.displayCategory(categoryData);
        } catch (error) {
            console.error('Error fetching games by category:', error);
        }

        this.loading.classList.remove('showBox')
        this.loading.classList.add('hideBox')
        document.documentElement.style.overflow = 'auto'
        document.body.style.overflow = 'auto'

        let navbarItem = document.querySelectorAll('.dropdown-item');
        for (let j = 0; j < navbarItem.length; j++) {
            navbarItem[j].classList.remove('active');
        }

        console.log(event);
        if (event.target) {
            event.target.classList.add('active');
        }



    }



    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
            });
            this.closeSidebar();
        }
    }

    addEventListeners() {
        document.querySelectorAll('.dropdown-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('href').substring(1);
                this.scrollToSection(sectionId);
            });
        });

        document.querySelectorAll('.sidebar-card a').forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('href').substring(1);
                this.scrollToSection(sectionId);

                const sidebar = new Sidebar();
                sidebar.sidebarToggle();
            });
        });
    }
}

export default UI;