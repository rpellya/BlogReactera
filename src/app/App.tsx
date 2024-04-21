import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { NavBar } from 'widgets/NavBar';
import './styles/index.scss';

const App = () => {
	const { theme } = useTheme();
	return (
		<div className={classNames('App', {}, [theme])}>
			<NavBar />
			<AppRouter />
		</div>
	);
};

export default App;
