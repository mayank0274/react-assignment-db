import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateCourseMainForm } from "./components/form/CreateCourseMainForm";
import { List } from "./components/list/List";
import { ProductsList } from "./components/e-comm/ProductsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateCourseMainForm />} />
        <Route path="/list" element={<List />} />
        <Route path="e-comm-products" element={<ProductsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
