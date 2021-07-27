import templatePhotoCardList from '../../templates/photo-card-tmp.hbs';
import refs from './refs';

/*Функция добавления разметки в галлерею*/
export const appendPhotoCardsMarkup = hits => {
    refs.gallery.insertAdjacentHTML('beforeend', templatePhotoCardList(hits));
};

/*Функция очистки галлереи*/
export const clearPhotoCardsMarkup = () => {
    refs.gallery.innerHTML = '';
};

