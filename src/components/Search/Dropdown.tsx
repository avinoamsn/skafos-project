import React, { FC, Fragment } from 'react'
import { useRecoilState } from 'recoil'
import tw from 'tailwind-styled-components'

import { Menu, Transition } from '@headlessui/react'

import { deckState } from '../../recoil'

const StyledButton = tw.button<{ active?: boolean }>`
${({ active }) => (active ? `bg-gray-100 text-gray-900` : `text-gray-700`)}
w-full text-left block px-4 py-2 text-sm
`

/**
 * Dropdown that lists matching YuGiOh cards.
 *
 * @note original styles from TailwindUI {@link https://tailwindui.com/components/application-ui/elements/dropdowns}
 */
export const Dropdown: FC<{
	searchText: string
	results: any
}> = ({ searchText, results }) => {
	const [deck, setDeck] = useRecoilState(deckState)

	return (
		<Menu as="div" className="absolute inline-block text-left">
			<Transition
				show={!!searchText.length}
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					static
					className="origin-top mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div className="py-1">
						{results === `loading` ? (
							<Menu.Item>
								<StyledButton active={false}>Loading...</StyledButton>
							</Menu.Item>
						) : results === undefined ? (
							<Menu.Item>
								<StyledButton active={false}>No matches.</StyledButton>
							</Menu.Item>
						) : results.length > 0 ? (
							results
								.slice(0, 10) // only top 10 results, to make selection easy
								.map((card: any) => (
									<Menu.Item
										key={card.id}
										onClick={() => {
											const newDeck = [...deck, card.card_images[0].image_url]
											setDeck(newDeck)
											localStorage.deck = JSON.stringify(newDeck)
										}}
									>
										{({ active }) => (
											<StyledButton active={active}>{card.name}</StyledButton>
										)}
									</Menu.Item>
								))
						) : null}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default Dropdown
