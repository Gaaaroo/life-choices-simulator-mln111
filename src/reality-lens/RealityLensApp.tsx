import { useRealityLensStore } from "./store/realityLensStore";
import { RLLandingPage } from "./pages/RLLandingPage";
import { RLIntroPage } from "./pages/RLIntroPage";
import { RLChapter1Page } from "./pages/RLChapter1Page";
import { RLChapter2Page } from "./pages/RLChapter2Page";
import { RLConclusionPage } from "./pages/RLConclusionPage";

export function RealityLensApp() {
  const phase = useRealityLensStore((s) => s.phase);

  switch (phase) {
    case "landing":
      return <RLLandingPage />;
    case "intro":
      return <RLIntroPage />;
    case "chapter1":
      return <RLChapter1Page />;
    case "chapter2":
      return <RLChapter2Page />;
    case "conclusion":
      return <RLConclusionPage />;
    default:
      return <RLLandingPage />;
  }
}
