import axios from "axios";

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

    /*Метод (через async/await) для отправки поискового запроса */
    async fetchArticles(apiKey, pageLimit) {
        const baseUrl = 'https://pixabay.com/api/';
        const params = {
            key: apiKey,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page:pageLimit
        };
        const response = await axios.get(baseUrl,{params});
        return response.data;
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
    incrementRenderedCards(value) {
        this.shownCards += value;
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
    backupSearchData() {
        this.backup.searchQuery = this.searchQuery;
        this.backup.page = this.page;
        this.backup.shownCards = this.shownCards;
    }

    /* Метод для восстановление данных до состояния предыдущего успешного запроса*/
    restoreSearchData() {
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
