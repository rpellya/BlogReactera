import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const { t } = useTranslation();
    const dispacth = useDispatch();
    const counterValue = useSelector(getCounterValue);
    const increment = () => {
        dispacth(counterActions.increment());
    };

    const decrement = () => {
        dispacth(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                data-testid="increment-btn"
                theme={ButtonVariant.OUTLINE}
                onClick={increment}
            >
                {t('Increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                theme={ButtonVariant.OUTLINE}
                onClick={decrement}
            >
                {t('Decrement')}
            </Button>
        </div>
    );
};
