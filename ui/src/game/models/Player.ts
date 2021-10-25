import Card from './Card';

export default interface Player {
  id: String;
  folder: boolean;
  hand: Card[];
  isDealer: boolean;
  points: number;
}
