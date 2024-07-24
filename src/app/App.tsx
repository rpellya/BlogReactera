import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';
import './styles/index.scss';

const App = () => {
    const { theme } = useTheme();
    return (
        <div className={classNames('App', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
