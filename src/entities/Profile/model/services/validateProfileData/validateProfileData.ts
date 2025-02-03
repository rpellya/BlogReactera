import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const { age, country, firstname, username, lastname } = profile;
    const errors: ValidateProfileError[] = [];

    if (!firstname || !lastname || !username) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    if (!Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }
    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_COUNTRY);
    }

    return errors;
};
