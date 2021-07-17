import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import 'modern-normalize';
import './sass/main.scss';

import refs from './js/components/refs';
import { onSearchButtonClick, onLoadMoreButtonClick } from './js/app';

refs.searchForm.addEventListener('submit', onSearchButtonClick);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
