import { appendPhotoCardsMarkup, clearPhotoCardsMarkup } from './components/render';
import { showSuccesMessage, showFailureMessage } from './components/messages';

import refs from './components/refs';
import PhotoApiService from './components/photo-service';

const photoApiService = new PhotoApiService();

/*Функция включения отображения кнопки LoadMore*/
export const LoadMoreButtonShow = () => {
    refs.loadMoreButton.classList.remove('is-hidden');
};

/*Функция отключения отображения кнопки LoadMore*/
export const LoadMoreButtonHide = () => {
    refs.loadMoreButton.classList.add('is-hidden');
};

/*Функция применения базовых настроек при отрисовке DOM-дерева*/
export const onPageLoadind = () => {
    LoadMoreButtonHide();
};

/*Обработчик клика на кнопку Search*/
export const onSearchButtonClick = e => {
    e.preventDefault();
    LoadMoreButtonHide();
    const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

    if (searchQuery === '') {
        showFailureMessage('Please type your query and try again.');
        return;
    }

    photoApiService.backupSearchInfo();
    photoApiService.getSearchQuery(searchQuery);
    photoApiService.resetPage();
    photoApiService.resetRenderedCards();

    photoApiService.fetchArticles()
        .then(data => {
            
            if (data.hits.length === 0) {
                showFailureMessage('Sorry, there are no images matching your search query. Please try again.');
                if (!photoApiService.isFinishChecking()) {
                    photoApiService.restoreSearchInfo();
                    LoadMoreButtonShow();
                }
                return;
            }
            
            photoApiService.getMaxCards(data.totalHits);
            showSuccesMessage(data.totalHits);
            clearPhotoCardsMarkup();
            appendPhotoCardsMarkup(data.hits);
            
            if (photoApiService.isFinishChecking()) {
                showFailureMessage("We're sorry, but you've reached the end of search results.");
                LoadMoreButtonHide();
                return;
            }
            
            LoadMoreButtonShow();
        });
};

/*Обработчик клика на кнопку LoadMore*/
export const onLoadMoreButtonClick = () => {
    photoApiService.fetchArticles()
        .then(data => {
        
            if (data.hits.length === 0) {
                showFailureMessage('Oops, something went wrong');
                return;
            }
            
            appendPhotoCardsMarkup(data.hits);
            
            if (photoApiService.isFinishChecking()) {
                showFailureMessage("We're sorry, but you've reached the end of search results.");
                LoadMoreButtonHide();
                return;
            }
            
            LoadMoreButtonShow();
        });
};