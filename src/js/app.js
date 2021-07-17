import { appendPhotoCardsMarkup, clearPhotoCardsMarkup } from './components/render';
import { showSuccesMessage, showFailureMessage } from './components/messages';
import refs from './components/refs';
import PhotoApiService from './api/photo-service';
import makeSmoothScroll from './components/smooth-scroll';
import lightboxRefresh from './components/lightbox';

const API_KEY = '22441039-e3c3a22ef42346706974d6393';
const QUANTITY_PER_PAGE = 40;
const search = new PhotoApiService();

/*Функция включения отображения кнопки LoadMore*/
export const LoadMoreButtonShow = () => {
    refs.loadMoreButton.classList.remove('is-hidden');
};

/*Функция отключения отображения кнопки LoadMore*/
export const LoadMoreButtonHide = () => {
    refs.loadMoreButton.classList.add('is-hidden');
};

/*Функция применения базовых настроек при отрисовке DOM-дерева*/
export const onPageLoading = () => {
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

    search.backupSearchData();
    search.resetPage();
    search.resetRenderedCards();
    search.getSearchQuery(searchQuery);
    search.fetchArticles(API_KEY, QUANTITY_PER_PAGE)
        .then(data => {
            if (data.hits.length === 0) {
                showFailureMessage('Sorry, there are no images matching your search query. Please try again.');
                
                /*костыль на случай возможности продолжить поиск с loadMoreButton, если вдруг с новым поиском не сложилось..*/
                search.restoreSearchData();

                if (!search.isFinishChecking()) {
                    LoadMoreButtonShow();
                } 
                return;
            }
            
            search.incrementPage();
            search.incrementRenderedCards(data.hits.length);
            search.getMaxCards(data.totalHits);
            
            showSuccesMessage(data.totalHits);
            clearPhotoCardsMarkup();
            appendPhotoCardsMarkup(data.hits);
            
            if (search.isFinishChecking()) {
                showFailureMessage("We're sorry, but you've reached the end of search results.");
                return;
            }

            LoadMoreButtonShow();
            makeSmoothScroll();
            lightboxRefresh();
        })
        .catch(error => console.log(error));
};

/*Обработчик клика на кнопку LoadMore (не через async)*/
export const onLoadMoreButtonClick = () => {
    search.fetchArticles(API_KEY, QUANTITY_PER_PAGE)
        .then(data => {
          
            search.incrementPage();
            search.incrementRenderedCards(data.hits.length);
            
            appendPhotoCardsMarkup(data.hits);
            
            if (search.isFinishChecking()) {
                showFailureMessage("We're sorry, but you've reached the end of search results.");
                LoadMoreButtonHide();
                return;
            }
            
            LoadMoreButtonShow();
            makeSmoothScroll();
            lightboxRefresh();
        })
        .catch(error => console.log(error));
};