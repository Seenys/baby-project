type GiftFactory = {
    name: string;
    gift: string;
}

type SelectedGiftFactory = {
    name: string;
    gift: GiftFactory[];
    displaySelected: boolean;
    setGift: (gift: GiftFactory[]) => void;
    setIsSelected: (isDisplaySelected: boolean) => void;
}

export type State = SelectedGiftFactory;