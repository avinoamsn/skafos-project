import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'

const PositionedCard = styled.img<{ distance: number }>`
	${({ distance }) =>
		// push unfocused cards to either side
		distance !== 0
			? `left: ${distance * 1 + (distance > 0 ? 25 : -25)}rem;`
			: `left: 0`}
	${
		// invert z-index for cards in the right-hhand pile
		({ distance }) => (distance > 0 ? `z-index: -${distance}` : ``)
	}
`
const StyledCard = tw(PositionedCard)`
${({ distance }) =>
	distance === 0 ? `-top-6 z-10` : `top-0 pointer-events-none`}
absolute rounded-lg transition-all duration-200 ease-in-out
`

/**
 * An interactive YugHiOh card. Click it to add it to your deck.
 *
 * @note original card mouse-around style logic from: {@link https://codepen.io/richard_w_here/pen/eYmXZMN}
 */
export const Card: FC<{ src: string; distanceFromCursor: number }> = ({
	src,
	distanceFromCursor,
}) => {
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

	return (
		<StyledCard
			src={src}
			alt="Yu-Gi-Oh card back"
			onMouseMove={(e) => mouseOver(e)}
			onMouseOut={mouseOut}
			ref={cardRef}
			distance={distanceFromCursor}
		/>
	)
}

export default Card
