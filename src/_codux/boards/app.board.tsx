/* eslint-disable react-refresh/only-export-components -- Codux board files always export a createBoard config, not a component module */
import { createBoard } from "@wixc3/react-board";
import GameBoard from "../../components/VideoPoker/GameBoard";
import { useVideoPoker } from "../../hooks/useVideoPoker";

const GameBoardPreview = () => {
  const { gameState, actions, computed } = useVideoPoker(1000);
  return <GameBoard gameState={gameState} actions={actions} computed={computed} />;
};

export default createBoard({
  name: "App",
  Board: GameBoardPreview,
  isSnippet: true,
  environmentProps: {
    windowHeight: 676,
    windowWidth: 1166,
  },
});
