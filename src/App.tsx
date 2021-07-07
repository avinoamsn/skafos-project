import './App.css'

import React from 'react'

import Card from './Card'

export const App = (): React.ReactElement => {
	return (
		<div className="App">
			<header className="App-header">
				<Card />
			</header>
		</div>
	)
}

export default App
