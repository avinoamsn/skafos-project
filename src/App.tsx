import './App.css'

import React, { ReactElement } from 'react'

import Card from './Card'

export const App = (): ReactElement => {
	return (
		<div className="App">
			<header className="App-header">
				<Card />
			</header>
		</div>
	)
}

export default App
