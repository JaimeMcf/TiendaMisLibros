import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./Home";
import ItemListContainer from "./ItemListContainer";
import ItemDetail from "./ItemDetail";
import Cart from "./Cart";
import Layout from "./Layout";
import { FormularioContainer } from "./FormularioContainer";
import { FormularioLibroContainer } from "./FormularioLibroContainer";
import Login from "./Login";
import Nosotros from "./Nosotros";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="data" element={<ItemListContainer />} />
              <Route path="data/:id" element={<ItemDetail />} />
              <Route path="carrito" element={<Cart />} />
              <Route path="FormularioContainer" element={<FormularioContainer />} />
              <Route path="login" element={<Login />} />
              <Route path="nosotros" element={<Nosotros />} />
              
              <Route 
                path="cargar-libro" 
                element={
                  <ProtectedRoute>
                    <FormularioLibroContainer />
                  </ProtectedRoute>
                } 
              />
            </Route>

            <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Página no encontrada</h2>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}