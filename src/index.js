import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import 'modern-normalize';
import './sass/main.scss';

import refs from './js/components/refs';
import { onPageLoading, onSearchButtonClick, onLoadMoreButtonClick } from './js/app';

document.addEventListener('DOMContentLoaded', onPageLoading);
refs.searchForm.addEventListener('submit', onSearchButtonClick);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
