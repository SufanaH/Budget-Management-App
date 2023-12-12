import { BrowserRouter, Routes, Route } from "react-router-dom";
import BudgetApp from "./components/BudgetApp";

import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BudgetApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
