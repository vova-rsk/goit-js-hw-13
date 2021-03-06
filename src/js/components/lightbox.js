import SimpleLightbox from "simplelightbox";
import '../../../node_modules/simplelightbox/src/simple-lightbox.scss';

let gallery = new SimpleLightbox('.gallery a');

gallery.on('show.simplelightbox', () => {
    gallery.refresh();
});

gallery.on('error.simplelightbox', e => {
	console.log(e);
});

 const lightboxRefresh = () => {
    gallery.refresh();
};

export default lightboxRefresh;