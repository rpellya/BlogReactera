import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

// for example
// const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'https://yandex.ru';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});
