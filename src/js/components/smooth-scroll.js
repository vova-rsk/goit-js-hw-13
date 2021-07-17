export default ({ newSearch }) => {
    if (newSearch) {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        })
        return;
    }

    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};

