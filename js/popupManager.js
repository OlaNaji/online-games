import ApiFetcher from './apiFetcher.js';
import UI from './UI.js';


class PopupManager {
    constructor(gemeDetailsPage) {
        this.loading = document.querySelector(".loading");
        this.gemeDetailsPage = document.getElementById('gameDetails');
        this.gameDetailsText = '';

        this.initializePopupClickEvents();
    }

    initializePopupClickEvents() {
        let clickImg = document.querySelectorAll('[data-index] img');
        for (let i = 0; i < clickImg.length; i++) {
            let gameID = clickImg[i].parentElement.attributes[1].value;
            clickImg[i].addEventListener('click', () => {
                this.togglePopup(gameID);
            });
        }

        document.body.addEventListener('click', (event) => {
            if (event.target.classList.contains('fa-multiply')) {
                this.closePopup();
            }
        });
    }




    popupDusplay(dataID) {
        console.log(dataID);
        this.gameDetailsText = '';
        this.gameDetailsText += `
            <i class="fa-solid fa-multiply position-absolute"></i>
            <div class="container row d-flex justify-content-center align-items-center ">
                <div class="col-lg-4">
                    <div class="image-container">
                        <img src="${dataID.thumbnail}" class="w-100 " alt="">
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="gameDetails-caption text-white ">
                        <figcaption class="text-start py-2 ">
                            <h2 class="game-name">${dataID.title}</h2>
                            <p class="game-description fw-bold ">${dataID.description}</p>
                            <p><span class="text-uppercase fw-bold ">developer:</span> ${dataID.developer}</p>
                            <p><span class="text-uppercase fw-bold ">publisher:</span> ${dataID.publisher}</p>
                            <p><span class="text-uppercase fw-bold ">release date:</span> ${dataID.release_date}</p>
                            <p>available on: <i class="fa-brands fa-windows"></i></p>
                            <a href="${dataID.game_url}" class="btn play-btn rounded-5 px-4 ">play now</a>
                        </figcaption>
                    </div>
                </div>
            </div>
        `;
        this.gemeDetailsPage.innerHTML = this.gameDetailsText;
    }

    async togglePopup(gameID) {
        if (this.gemeDetailsPage.classList.contains('hideBox')) {
            this.loading.classList.remove('hideBox')
            this.loading.classList.add('showBox');
            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'

            let result = await ApiFetcher.fetchSpecificGame(gameID);
            this.popupDusplay(result)

            this.gemeDetailsPage.classList.remove('hideBox');
            this.gemeDetailsPage.classList.add('showBox');
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            const ui = new UI()
            ui.initializeCarousels()
        } else {
            this.closePopup();
        }

        this.loading.classList.remove('showBox')
        this.loading.classList.add('hideBox')
        document.documentElement.style.overflow = 'auto'
        document.body.style.overflow = 'auto'
    }

    closePopup() {
        this.gemeDetailsPage.classList.remove('showBox');
        this.gemeDetailsPage.classList.add('hideBox');
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';

        const ui = new UI()
        ui.initializeCarousels()
    }
}

export default PopupManager;