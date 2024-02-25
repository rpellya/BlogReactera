import { Suspense, useCallback, useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AboutPageAsync } from './pages/About/AboutPage.async'
import { MainPageAsync } from './pages/MainPage/MainPage.async'
import { useTheme } from './theme/useTheme'
import './styles/index.scss'

export function App() {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={`App ${theme}`}>
			<Link to={'/'}>Main</Link>
			<Link to={'/about'}>About the site</Link>
			<button onClick={toggleTheme}>toggleTheme</button>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/'} element={<MainPageAsync />} />
					<Route path={'/about'} element={<AboutPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	)
}
