import { classNames } from 'shared/lib/classNames/classNames';
import { NavBar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';
import './styles/index.scss';

const App = () => {
    const { theme } = useTheme();
    return (
        <div className={classNames('App', {}, [theme])}>
            <Suspense
            // eslint-disable-next-line i18next/no-literal-string
                fallback="loading"
            >
                <NavBar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
