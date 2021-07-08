import React, { FC, useEffect, useState } from 'react'

import { Dropdown } from './'

/**
 * Search box to search for desired YuGiHo cards.
 *
 * @note original styles from TailwindUI {@link https://tailwindui.com/components/application-ui/forms/input-groups}
 */
export const Search: FC = () => {
	const endpoint = `https://db.ygoprodeck.com/api/v7/cardinfo.php`

	const [searchText, setSearchText] = useState(``)
	const [results, setResults] = useState({})

	useEffect(() => {
		let didCancel = false // avoid race conditions

		const search = async (): Promise<void> => {
			const res = await fetch(`${endpoint}?fname=${searchText}`)
			const cards = await res.json()
			if (!didCancel) setResults(cards.data)
		}

		// avoid searching short strings
		if (searchText.length > 2) {
			setResults(`loading`) // used as a quick-n-dirty loading state
			search()
		}

		return () => {
			didCancel = true
		}
	}, [endpoint, searchText])

	return (
		<div className="w-96">
			<label htmlFor="name" className="block text-sm font-medium text-gray-700">
				Card name
			</label>

			<div className="mt-1">
				<input
					type="text"
					name="name"
					id="name"
					className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
					placeholder="Tornado Dragon"
					aria-describedby="name-description"
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>

			<Dropdown searchText={searchText} results={results} />

			<p className="mt-2 text-sm text-gray-500" id="name-description">
				Fuzzy search by card name.
			</p>

			<p className="mt-2 text-sm text-gray-500" id="name-description">
				Use arrow keys to scroll thru selected cards. Hover to inspect selected
				card more closely.
			</p>
		</div>
	)
}

export default Search
