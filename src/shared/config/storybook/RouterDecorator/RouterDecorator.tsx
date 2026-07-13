import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (Storycomponent: Story) => (
    <BrowserRouter>
        <Storycomponent />
    </BrowserRouter>
);
