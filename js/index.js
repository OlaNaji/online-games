import UI from './UI.js';
import Pagination from './pagination.js';
import Sidebar from './sidebar.js'
import ApiFetcher from './apiFetcher.js';
import Display from './displayManager.js'

const loading = document.querySelector(".loading");


document.addEventListener('DOMContentLoaded', async function () {
    const sidebar = new Sidebar()
    const display = new Display()
    const uiManager = new UI()

    window.addEventListener('resize', function () {
        sidebar.sidebarToggle()
        uiManager.initializeCarousels()
    })


    try {
        const {
            result,
            resultPopular,
            resultNew,
        } = await ApiFetcher.fetchGames();

        display.display(result, resultPopular, resultNew);

    } catch (error) {
        console.error(error);
    }


    loading.classList.remove('showBox')
    loading.classList.add('hideBox')
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
});


const pagination = new Pagination()
window.onload = pagination.showItems();













