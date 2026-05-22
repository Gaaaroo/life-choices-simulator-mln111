import { AnalysisPage } from "./pages/AnalysisPage";
import { EndingPage } from "./pages/EndingPage";
import { HomePage } from "./pages/HomePage";
import { PlayPage } from "./pages/PlayPage";
import { useGameStore } from "./store/gameStore";

export default function App() {
  const screen = useGameStore((s) => s.screen);

  switch (screen) {
    case "home":
      return <HomePage />;
    case "play":
      return <PlayPage />;
    case "ending":
      return <EndingPage />;
    case "analysis":
      return <AnalysisPage />;
    default:
      return <HomePage />;
  }
}
