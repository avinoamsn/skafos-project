import React, { useRef } from 'react'

import card from './assets/back.png'

const Card = (): React.ReactElement => {
	const cardRef = useRef<HTMLImageElement>(null)

	// ? original card hover logic from: https://codepen.io/richard_w_here/pen/eYmXZMN
	const cardMouseOut = (): void => {
		if (cardRef.current === null) return // typesafe check
		cardRef.current.style.transform = `` // rm hover effect
	}
	const cardMouseMove = (
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

	return (
		<img
			src={card}
			alt="Yu-Gi-Oh card back"
			onMouseMove={(e) => cardMouseMove(e)}
			onMouseOut={cardMouseOut}
			ref={cardRef}
			className="rounded-lg transition-all"
		/>
	)
}

export default Card
