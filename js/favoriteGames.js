class SavedGamesManager {
    constructor() {
        this.saveBtns = document.querySelectorAll('.fa-heart');
        this.savedGamesSection = document.getElementById('newGameContainer');
        this.savedGames = [];

        this.initialize();
    }

    initialize() {
        this.updateHeartIcons();
        this.setupEventListeners();
    }

    updateHeartIcons() {
        for (let i = 0; i < this.saveBtns.length; i++) {
            let gameIndex = this.saveBtns[i].getAttribute('data-index');
            let isGameSaved = this.savedGames.some(obj => obj.indx === gameIndex);

            if (isGameSaved) {
                this.saveBtns[i].classList.replace('fa-regular', 'fa-solid');
            } else {
                this.saveBtns[i].classList.replace('fa-solid', 'fa-regular');
            }
        }
    }

    setupEventListeners() {
        for (let i = 0; i < this.saveBtns.length; i++) {
            this.saveBtns[i].addEventListener('click', () => this.handleSaveButtonClick(i));
        }
    }

    handleSaveButtonClick(index) {
        let newGame = {
            indx: this.saveBtns[index].getAttribute('data-index'),
            imgSrc: this.saveBtns[index].parentElement.children[0].src,
            name: this.saveBtns[index].parentElement.children[1].innerHTML,
        };

        if (this.saveBtns[index].classList.contains('fa-regular')) {
            if (this.savedGames.every(obj => obj.indx !== newGame.indx)) {
                this.saveBtns[index].classList.replace('fa-regular', 'fa-solid');
                this.savedGames.push(newGame);
                this.saveGame();
                this.updateHeartIcons();
            }
        } else {
            let gameIndex = this.saveBtns[index].getAttribute('data-index');
            if (this.savedGames.some(obj => obj.indx === gameIndex)) {
                let removeIndex = this.savedGames.findIndex(obj => obj.indx === gameIndex);
                this.savedGames.splice(removeIndex, 1);
                this.saveBtns[index].classList.replace('fa-solid', 'fa-regular');
                this.saveGame();
                this.updateHeartIcons();
            }
        }
    }

    saveGame() {
        this.savedGamesSection.innerHTML = '';

        for (let i = 0; i < this.savedGames.length; i++) {
            let savedGamesCard = document.createElement('div');
            savedGamesCard.classList.add('col-6', 'gx-2', 'mb-2', 'saved-game-card');

            savedGamesCard.innerHTML = `
                <div class="saved-games-card position-relative">
                    <img src="${this.savedGames[i].imgSrc}" class="w-100" alt="">
                    <a class="game-name">${this.savedGames[i].name}</a>
                    <i class="fa-solid fa-heart end-0 bottom-0 position-absolute" data-index="${this.savedGames[i].indx}"></i>
                </div>
            `;
            this.savedGamesSection.appendChild(savedGamesCard);
        }

        console.log(this.savedGames);
    }
}

export default SavedGamesManager;
