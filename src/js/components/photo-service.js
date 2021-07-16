const API_KEY = '22441039-e3c3a22ef42346706974d6393';
const BASE_URL = 'https://pixabay.com/api/';
const QUANTITY_PER_PAGE = 40;

/*Класс для работы с Pixabay API*/
export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.shownCards = 0;
        this.totalCards = 0;
        this.backup = {};
    }

    /*Метод для фиксации ключа поиска*/
    getSearchQuery(searchQuery) {
        this.searchQuery = searchQuery;
    }

    /*Метод для отправки поискового запроса*/
    fetchArticles() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${QUANTITY_PER_PAGE}`;
        
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                this.incrementPage();
                this.incrementRenderedCards(data);
                
                return data;
            })
            .catch(error => console.error(error));
    }

    /*Метод для фиксации макс. количества найденных фотографий*/
    getMaxCards(value) {
        this.totalCards = value;
    }

    /*Метод для фиксации актуального номера страницы в следующем запросе*/
    incrementPage() {
        this.page += 1;
    }

    /*Метод для сброса актуального номера страницы*/
    resetPage() {
        this.page = 1;
    }

    /*Метод для вычисления текущего значения количества отрендеренных фото-карточек*/
    incrementRenderedCards(data) {
        this.shownCards += data.hits.length;
    }

    /*Метод для сброса текущего значения количества отрендеренных фото-карточек*/
    resetRenderedCards() {
        this.shownCards = 0;
    }

    /* Метод для проверки или получено максимальное количество картинок текущего поискового запроса*/
    isFinishChecking() {
        return (this.shownCards >= this.totalCards);
    }

    /* Метод для бекапа данных*/
    backupSearchInfo() {
        this.backup.searchQuery = this.searchQuery;
        this.backup.page = this.page;
        this.backup.shownCards = this.shownCards;
    }

    /* Метод для восстановление данных до состояния предыдущего успешного запроса*/
    restoreSearchInfo() {
        this.searchQuery = this.backup.searchQuery;
        this.page = this.backup.page;
        this.shownCards = this.backup.shownCards;
    }

    /*Геттер и сеттер*/
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};
