class Pagination {
    constructor(allGamesSection) {
        this.maxItems = 12;
        this.index = 1;

        // Use the passed allGamesSection or fetch it from the DOM
        this.allGamesSection = allGamesSection || document.getElementById('displayGames');

        if (!this.allGamesSection) {
            throw new Error("Unable to find 'displayGames' element.");
        }

        this.allGames = this.allGamesSection.children;
        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');
        this.paginationItems = document.querySelectorAll('.page-link:not(.prev):not(.next)');

        this.prev.addEventListener('click', this.handlePrev.bind(this));
        this.next.addEventListener('click', this.handleNext.bind(this));
        this.paginationItems.forEach(item => {
            item.addEventListener('click', this.handlePagination.bind(this));
        });
    }

    handlePrev() {
        this.index = Math.max(this.index - 1, 1);
        this.showItems();
        this.updatePagination();
    }

    handleNext() {
        this.index = Math.min(this.index + 1, Math.ceil(this.allGames.length / this.maxItems));
        this.showItems();
        this.updatePagination();
    }

    handlePagination() {
        this.index = Math.max(this.index, 1);
        this.index = Math.min(this.index, Math.ceil(this.allGames.length / this.maxItems));
        this.showItems();
        this.updatePagination();
    }

    showItems() {
        for (let i = 0; i < this.allGames.length; i++) {
            this.allGames[i].classList.remove('show');
            this.allGames[i].classList.add('hide');
            if (i >= (this.index * this.maxItems) - this.maxItems && i < this.index * this.maxItems) {
                this.allGames[i].classList.remove('hide');
                this.allGames[i].classList.add('show');
            }
        }
    }

    updatePagination() {
        this.paginationItems.forEach((item, i) => {
            const pageNumber = this.index + i - 1;
            item.textContent = pageNumber;
            item.parentNode.classList.toggle('active', pageNumber === this.index);
        });
    }
}

export default Pagination;