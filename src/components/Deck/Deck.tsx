import React, { FC, useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Card } from '.'

import { deckState } from '../../recoil'

export const Deck: FC = () => {
	const deck = useRecoilValue(deckState)
	const [cursor, setCursor] = useState(deck.length !== 0 ? deck.length - 1 : 0)

	// listen for arrow presses to move the deck cursor
	useEffect(() => {
		const moveCursor = (e: KeyboardEvent): void => {
			console.log(`hit!`)
			if (e.key === `ArrowLeft`) setCursor(Math.max(cursor - 1, 0))
			if (e.key === `ArrowRight`)
				setCursor(Math.min(cursor + 1, deck.length - 1))
		}

		window.addEventListener(`keydown`, moveCursor)

		return () => {
			window.removeEventListener(`keydown`, moveCursor)
		}
	})

	return (
		<section className="w-96 h-full relative flex overflow-visible">
			{deck.map((url: string, i: number) => (
				<Card key={url} src={url} distanceFromCursor={i - cursor} />
			))}
		</section>
	)
}

export default Deck
