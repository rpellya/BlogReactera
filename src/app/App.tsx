import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTheme } from './providers/ThemeProvider'
import { AppRouter } from './providers/router'
import './styles/index.scss'

const App = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={classNames('App', {}, [theme])}>
			<Link to={'/'}>Main</Link>
			<Link to={'/about'}>About the site</Link>
			<button onClick={toggleTheme}>toggleTheme</button>
			<AppRouter />
		</div>
	)
}

export default App