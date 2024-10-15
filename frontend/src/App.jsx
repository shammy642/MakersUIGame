//imports needed
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";// docs: https://reactrouter.com/en/main/start/overview

//imports of pages
import { HomePage } from "./pages/HomePage";
import { InGame } from "./pages/InGame";
import { Lobby } from "./pages/Lobby";
import { RoundEnd } from "./pages/RoundEnd";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/in-game",
    element: <InGame />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/round-end",
    element: <RoundEnd />,
  }      
]);


// the app with the above-defined routes
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;