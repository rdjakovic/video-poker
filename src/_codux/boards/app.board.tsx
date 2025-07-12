import { createBoard } from "@wixc3/react-board";
import GameBoard from "../../components/VideoPoker/GameBoard";
import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "../../components/home";
import routes from "tempo-routes";

export default createBoard({
  name: "App",
  Board: () => <GameBoard />,
  isSnippet: true,
  environmentProps: {
    windowHeight: 676,
    windowWidth: 1166,
  },
});
