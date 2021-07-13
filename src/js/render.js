import templatePhotoCardList from '../templates/photo-card-tmp.hbs';
import refs from './refs';

/*Функция включения отображения кнопки LoadMore*/
export const LoadMoreButtonShow = () => {
    refs.loadMoreButton.classList.remove('is-hidden');
};

/*Функция отключения отображения кнопки LoadMore*/
export const LoadMoreButtonHide = () => {
    refs.loadMoreButton.classList.add('is-hidden');
};

/*Функция добавления разметки в галлерею*/
export const appendPhotoCardsMarkup = data => {
    const isNothing = data.length === 0;

    if (isNothing) {
        alert("Sorry, there are no images matching your search query. Please try again.");
        return;
    }

    refs.gallery.insertAdjacentHTML('beforeend', templatePhotoCardList(data));
    LoadMoreButtonShow();
};

/*Функция очистки галлереи*/
export const clearPhotoCardsMarkup = () => {
    refs.gallery.innerHTML = '';
};

