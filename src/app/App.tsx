import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTheme } from './providers/ThemeProvider'
import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import './styles/index.scss'

const App = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={classNames('App', {}, [theme])}>
			<Link to={'/'}>Main</Link>
			<Link to={'/about'}>About the site</Link>
			<button onClick={toggleTheme}>toggleTheme</button>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/'} element={<MainPage />} />
					<Route path={'/about'} element={<AboutPage />} />
				</Routes>
			</Suspense>
		</div>
	)
}

export default App