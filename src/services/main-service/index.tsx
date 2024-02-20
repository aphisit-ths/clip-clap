"use client";

import { useState } from "react";

// Custom hook to manage cards
export const useCardState = (initialState: CardState[]) => {
    const [cards, setCards] = useState(initialState);
    const [selectedCard, setSelectedCard] = useState<CardState | null>();

    const addCard = (newCard: CardState) => {
        setCards([...cards, newCard]);
    };

    const toggleSelected = (environment: string) => {
        const updatedCards = cards.map((card) =>
            card.environment === environment
                ? { ...card, selected: true }
                : { ...card, selected: false }
        );
        setSelectedCard(cards.find((ele) => ele.environment === environment));
        setCards(updatedCards);
    };

    return { cards, addCard, toggleSelected, selectedCard };
};

export interface CardState {
    environment: string;
    server: string;
    username: string;
    password: string;
    database: string;
    selected?: boolean;
}
