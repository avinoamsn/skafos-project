import React, { FC } from 'react'

/**
 * Search box to search for desired YuGiHo cards.
 *
 * @note original styles from TailwindUI {@link https://tailwindui.com/components/application-ui/forms/input-groups}
 */
export const Search: FC = () => {
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
					placeholder="you@example.com"
					aria-describedby="email-description"
				/>
			</div>

			<p className="mt-2 text-sm text-gray-500" id="email-description">
				This is used for a fuzzy search, and doesn&apos;t have to be an exact
				match.
			</p>
		</div>
	)
}

export default Search
