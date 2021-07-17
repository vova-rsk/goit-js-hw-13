export default () => {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
    console.log({ height: cardHeight });
    
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};

