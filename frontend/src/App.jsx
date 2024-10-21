//imports needed
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { NumberGame } from "./pages/new/NumberGame";
import { Home } from "./pages/new/Home";

// router

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/NumberGame", element: <NumberGame /> },
    { path: "/NumberGame/:roomId", element: <NumberGame /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
