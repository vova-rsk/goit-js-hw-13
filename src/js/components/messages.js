import {Notify} from 'notiflix';

const TIMEOUT = 3000;

export const showSuccesMessage = elemsQuantity => {
    Notify.success(
        `Hooray! We found ${elemsQuantity} images.`,
        {
            timeout:TIMEOUT,
        }
    );
};

export const showFailureMessage = message => {
    Notify.failure(
        message,
        {
            timeout: TIMEOUT,
        }
    );
};