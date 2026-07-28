import { createBoard } from "@wixc3/react-board";
import GameBoard from "../../components/VideoPoker/GameBoard";

export default createBoard({
  name: "App",
  Board: () => <GameBoard />,
  isSnippet: true,
  environmentProps: {
    windowHeight: 676,
    windowWidth: 1166,
  },
});
