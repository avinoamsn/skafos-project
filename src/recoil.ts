import { atom } from 'recoil'

export const deckState = atom({
	key: `deck`,
	default: localStorage.deck ? JSON.parse(localStorage.deck) : [],
})
