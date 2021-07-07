import React, { FC, useRef } from 'react'

import card from '../assets/back.png'

/**
 * An interactive YugHiOh card. Click it to add it to your deck.
 *
 * @note original card mouse-around style logic from: {@link https://codepen.io/richard_w_here/pen/eYmXZMN}
 * @note component is exported both as a named & default export for flexibility's sake, and to make it easy for use with barrel files
 */
export const Card: FC = () => {
	const cardRef = useRef<HTMLImageElement>(null)

	// ANCHOR mouse-around styles
	const mouseOut = (): void => {
		if (cardRef.current === null) return // typesafe check
		cardRef.current.style.transform = `` // rm hover effect
	}
	const mouseOver = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	): void => {
		if (cardRef.current === null) return // typesafe check

		// calculate vars that'll be used to update style
		const xOffset = e.nativeEvent.offsetX
		const yOffset = e.nativeEvent.offsetY
		const cardHeight = cardRef.current.clientHeight
		const cardWidth = cardRef.current.clientWidth
		const heightCenter = Math.round(cardHeight / 2)
		const widthCenter = Math.round(cardWidth / 2)
		const rotateBaseValue = 20
		const rotateXValue =
			((yOffset - heightCenter) / heightCenter) * rotateBaseValue
		const rotateYValue =
			((widthCenter - xOffset) / widthCenter) * rotateBaseValue

		// update the card's style
		cardRef.current.style.transform = `scale(1.1) rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg)`
	}

	// ANCHOR interactivity
	const addCardToDeck = (): void => {
		console.log(`clicked!`)
	}

	return (
		<img
			src={card}
			alt="Yu-Gi-Oh card back"
			onMouseMove={(e) => mouseOver(e)}
			onMouseOut={mouseOut}
			onClick={addCardToDeck}
			ref={cardRef}
			className="rounded-lg transition-transform duration-200 ease-linear"
		/>
	)
}

export default Card
