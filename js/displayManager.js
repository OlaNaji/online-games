import SavedGamesManager from './favoriteGames.js';
import Pagination from './pagination.js'; 
import PopupManager from './popupManager.js';


class DisplayManager {
    constructor(allGamesSection, popularGamesSection, newGamesSection) {
        this.allGamesSection = document.getElementById('displayGames')
        this.popularGamesSection = document.getElementById('popular-games')
        this.newGamesSection = document.getElementById('new-games')
        this.gemeDetailsPage = document.getElementById('gameDetails')

        this.popupManager = new PopupManager();
        this.popupManager.initializePopupClickEvents();
    }

    createGameCard(data) {
        return `
            <div class="col-sm-6 col-md-3 allGames-card">
                <div class="game-container position-relative" data-index='${data.id}'>
                    <img src="${data.thumbnail}" class="w-100" alt="">
                    <a href="${data.game_url}" class="game-name">${data.title}</a>
                    <i class="fa-regular fa-heart end-0 bottom-0 position-absolute" data-index='${data.id}'></i>
                </div>
            </div>
        `;
    }

    createPopularGameCard(data) {
        return `
        <div class="swiper-slide">
        <div class="row justify-content-center w-100 m-auto">
          <div class="col-md-6 col-lg-8 p-2 d-md-flex align-items-md-center justify-content-center">
            <figure class="m-0" data-index='${data.id}'>
              <img src="${data.thumbnail}" class="w-100" alt="">
            </figure>
          </div>
          <div class="col-md-4 col-lg-4">
            <figcaption class="text-start py-2 pb-2">
              <h2 class="game-name">${data.title}</h2>
              <p class="game-description">${data.short_description}</p>
              <p><span class="text-uppercase fw-bold ">developer:</span> ${data.developer}</p>
              <p><span class="text-uppercase fw-bold ">publisher:</span> ${data.publisher}</p>
              <p><span class="text-uppercase fw-bold ">release date:</span> ${data.release_date}</p>
              <p>available on: <i class="fa-brands fa-windows"></i></p>
              <a href="${data.game_url}" target="_blank" class="btn play-btn rounded-5 px-4 ">play now</a>
            </figcaption>
          </div>
        </div>
      </div>
        `;
    }

    createNewGameCard(data) {
        return `
            <div class="swiper-slide text-start" data-index='${data.id}'>
                <img src="${data.thumbnail}" class="w-100" alt="">
                <a href="${data.game_url}" class="game-name">${data.title}</a>
                <i class="fa-regular fa-heart end-0 bottom-0 position-absolute" data-index='${data.id}'></i>
            </div>
        `;
    }

    createCategoryCard(data) {
        let categoryText = '';
        for (let i = 0; i < data.length; i++) {
            categoryText += `
                <div class="col-md-3 allGames-card">
                    <div class="game-container position-relative" data-index='${data[i].id}'>
                        <img src="${data[i].thumbnail}" class="w-100 " alt="">
                        <a href="${data.game_url}" class="game-name"> ${data[i].title} </a>
                        <i class="fa-regular fa-heart end-0 bottom-0  position-absolute"  data-index='${data[i].id}'></i>
                    </div>
                </div>
            `;
        }
        return categoryText;
    }

    displayGames(data, section, createCardFunction) {
        let gamesText = '';
        for (let i = 0; i < data.length; i++) {
            gamesText += createCardFunction(data[i]);
        }
        section.innerHTML = gamesText;
    }

    display(result, resultPopular, resultNew) {
        this.displayGames(result, this.allGamesSection, this.createGameCard);
        this.displayGames(resultPopular, this.popularGamesSection, this.createPopularGameCard);
        this.displayGames(resultNew, this.newGamesSection, this.createNewGameCard);

        const pagination = new Pagination()
        pagination.showItems();

        const savedGamesManager = new SavedGamesManager();
        savedGamesManager.saveGame()

        this.popupManager.initializePopupClickEvents();

    }

    displayCategory(data) {
        const categoryText = this.createCategoryCard(data);
        this.allGamesSection.innerHTML = categoryText;

        const pagination = new Pagination()
        pagination.showItems();

        const savedGamesManager = new SavedGamesManager();
        savedGamesManager.saveGame()


        this.popupManager.initializePopupClickEvents();
    }
}

export default DisplayManager;