import React, { FC } from 'react'
import { RecoilRoot } from 'recoil'

import { Card, Search } from './components'

export const App: FC = () => {
	return (
		<RecoilRoot>
			<Search />
			<Card />
		</RecoilRoot>
	)
}

export default App
