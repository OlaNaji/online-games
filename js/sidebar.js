import UI from "./UI.js";

class Sidebar {
    constructor() {
        this.sidebarBtn = document.querySelector('.sidebar-btn');
        this.sidebar = document.querySelector('.sidebar');
        this.mainContainer = document.getElementById('main-content');

        this.sidebarBtn.addEventListener('click', this.sidebarToggle.bind(this));
        window.addEventListener('resize', this.sidebarToggle.bind(this));

        this.ui = new UI()

    }


    sidebarToggle() {
        if (window.innerWidth < 768) {
            if (this.sidebar.style.left === '-95%') {
                this.openSidebarSM();
                this.ui.initializeCarousels()


            } else {
                this.closeSidebarSM();
                this.ui.initializeCarousels()

            }
        } else if (this.sidebar.style.left === '0%' || this.sidebar.style.left === '') {
            this.ui.initializeCarousels()
            this.closeSidebarLg();

        } else if (this.sidebar.style.left === '-20%' || this.sidebar.style.left === '-95%') {
            this.openSidebarLg();
            this.ui.initializeCarousels()

        }

        this.ui.initializeCarousels()
        this.sidebar.style.transition = 'left 0.3s';
        this.mainContainer.style.transition = 'all 0.3s';
    }


    openSidebarSM() {
        this.sidebar.style.left = '0%';
        this.sidebar.style.paddingRight = '1rem';
        this.sidebar.style.backgroundColor = '#1B1F26';
        this.sidebarBtn.style.right = '10px';
    }
    closeSidebarSM() {
        this.sidebar.style.left = '-95%';
        this.mainContainer.style.marginLeft = '0';
        this.mainContainer.style.width = '100%';
        this.sidebarBtn.style.right = '-10px';
        this.sidebar.style.backgroundColor = '#12151950';
    }


    openSidebarLg() {
        this.mainContainer.style.marginLeft = '25%';
        this.mainContainer.style.width = '75%';
        this.sidebar.style.left = '0%';
        this.sidebar.style.paddingRight = '1rem';
    }
    closeSidebarLg() {
        this.mainContainer.style.marginLeft = '5%';
        this.mainContainer.style.width = '95%';
        this.sidebar.style.left = '-20%';
        this.sidebar.style.paddingRight = '8rem';

    }
}

export default Sidebar;