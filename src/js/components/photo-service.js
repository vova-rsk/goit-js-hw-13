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
    fetchArticles(apiKey, pageLimit) {
        const urlParams = {
            baseUrl: 'https://pixabay.com/api/',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page:pageLimit
        };

        return fetch(`${urlParams.baseUrl}?key=${apiKey}&q=${this.searchQuery}&image_type=${urlParams.image_type}&orientation=${urlParams.orientation}&safesearch=${urlParams.safesearch}&page=${this.page}&per_page=${pageLimit}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => data)
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
