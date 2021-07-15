import {Notify} from 'notiflix';

export const showSuccesMessage = elemsQuantity => {
    Notify.success(
        `Hooray! We found ${elemsQuantity} images.`,
        {
            timeout: 4000,
        }
    );
};

export const showFailureMessage = (message) => {
    Notify.failure(
        message,
        {
            timeout: 4000,
        }
    );
};