import Card from './Card';
import Player from './Player';

export default interface Game {
  id: String;
  pot: number;
  roundCount: number;
  status: string;
  players: Player[];
  deck: Card[];
}
