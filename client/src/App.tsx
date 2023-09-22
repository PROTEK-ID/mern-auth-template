import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASENAME || "/"}>
      <></>
    </BrowserRouter>
  );
}

export default App;
