// ApiFetcher.js

class ApiFetcher {
    static async fetchGames(genre) {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        const popularGamesURL = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity';
        const newGamesURL = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=date';
        const IDGamesURL = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${genre}`;


        this.loading = document.querySelector(".loading");

        this.loading.classList.remove('hideBox')
        this.loading.classList.add('showBox');
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8080d723eemsh97bb02598c64e1dp12fdd8jsn819bb5c86a66',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // Fetch other game categories
            const responsePopular = await fetch(popularGamesURL, options);
            const resultPopular = await responsePopular.json();
            const slicedResultPopular = resultPopular.slice(0, 3);

            const responseNew = await fetch(newGamesURL, options);
            const resultNew = await responseNew.json();
            const slicedResultNew = resultNew.slice(0, 10);

            const responseID = await fetch(IDGamesURL, options);
            const resultID = await responseID.json();

            return {
                result,
                resultPopular: slicedResultPopular,
                resultNew: slicedResultNew,
                resultID
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async fetchSpecificGame(gameID) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8080d723eemsh97bb02598c64e1dp12fdd8jsn819bb5c86a66',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async fetchGamesByCategory(category) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8080d723eemsh97bb02598c64e1dp12fdd8jsn819bb5c86a66',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ApiFetcher;