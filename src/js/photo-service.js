const API_KEY = '22441039-e3c3a22ef42346706974d6393';
const BASE_URL = 'https://pixabay.com/api/';
const QUANTITY_PER_PAGE = 40;

/*Класс для работы с Pixabay API*/
export default class PhotoApiService {
    #searchQuery;
    #page;
    #shownCards;

    constructor() {
        this.#searchQuery = '';
        this.#page = 1;
    }

    /*Метод для фиксации ключа поиска*/
    getSearchQuery(searchQuery) {
        this.#searchQuery = searchQuery;
    }

    /*Метод для отправки поискового запроса*/
    fetchArticles() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.#searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.#page}&per_page=${QUANTITY_PER_PAGE}`;
        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                this.incrementPage();
                this.incrementShownCards(data);
                return data.hits;
            })
            .catch(error => console.error(error));
    }

    /*Метод для фиксации актуального номера страницы в следующем запросе*/
    incrementPage() {
        this.#page += 1;
    }

    /*Метод для сброса актуального номера страницы*/
    resetPage() {
        this.#page = 1;
    }

    incrementShownCards(data) {
        this.#shownCards += data.totalHits;
    }

    resetShownCards() {
        this.#shownCards = 0;
    }

    /*Геттер и сеттер*/
    get query() {
        return this.#searchQuery;
    }

    set query(newQuery) {
        this.#searchQuery = newQuery;
    }
};
