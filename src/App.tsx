import React, { FC } from 'react'
import { RecoilRoot } from 'recoil'

import { Deck, Search } from './components'

/**
 * @note all components are exported both as a named & default export for flexibility's sake, and to make it easy for use with barrel files
 */
export const App: FC = () => {
	return (
		<RecoilRoot>
			<div className="h-screen grid grid-cols-1 grid-rows-4 place-items-center">
				<Search />
				<Deck />
			</div>
		</RecoilRoot>
	)
}

export default App
