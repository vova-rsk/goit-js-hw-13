
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';

import 'modern-normalize';
import './sass/main.scss';

import refs from './js/refs';
import PhotoApiService from './js/photo-service';
import { appendPhotoCardsMarkup, clearPhotoCardsMarkup, LoadMoreButtonHide, } from './js/render';

const photoApiService = new PhotoApiService();

/*Функция применения базовых настроек при отрисовке DOM-дерева*/
const onPageLoadind = () => {
    LoadMoreButtonHide();
};

/*Обработчик клика на кнопку Search*/
const onSearchButtonClick = e => {
    e.preventDefault();

    LoadMoreButtonHide();

    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

    if (searchQuery === '') {
        alert('Задайте данные для поиска!!');
        return;
    }

    photoApiService.getSearchQuery(searchQuery);
    photoApiService.resetPage();
    photoApiService.resetShownCards();
    photoApiService.fetchArticles()
        .then(hits => {
            clearPhotoCardsMarkup();
            appendPhotoCardsMarkup(hits);
            console.log(photoApiService);
        });
};

/*Обработчик клика на кнопку LoadMore*/
const onLoadMoreButtonClick = () => {
    photoApiService.fetchArticles().then(appendPhotoCardsMarkup);
};


document.addEventListener('DOMContentLoaded', onPageLoadind);
refs.searchForm.addEventListener('submit', onSearchButtonClick);
refs.loadMoreButton.addEventListener('click',onLoadMoreButtonClick);