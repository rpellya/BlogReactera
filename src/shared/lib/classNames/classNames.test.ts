import { classNames } from './classNames';

describe('classNames', () => {
    test('with other parameters', () => {
        expect(classNames('someClasses')).toBe('someClasses');
    });

    test('with other parameters', () => {
        const expected = 'someClasses class1 class2';
        expect(classNames('someClasses', {}, ['class1', 'class2']))
            .toBe(expected);
    });

    test('with mods parameters', () => {
        const expected = 'someClasses class1 class2 width hight';
        expect(classNames(
            'someClasses',
            { width: true, hight: true },
            ['class1', 'class2'],
        )).toBe(expected);
    });

    test('with mods parameters false', () => {
        const expected = 'someClasses class1 class2 width';
        expect(classNames(
            'someClasses',
            { width: true, hight: false, flex: false },
            ['class1', 'class2'],
        )).toBe(expected);
    });

    test('with mods parameters undefined', () => {
        const expected = 'someClasses class1 class2 width';
        expect(classNames(
            'someClasses',
            { width: true, hight: false, display: undefined },
            ['class1', 'class2'],
        )).toBe(expected);
    });
});
