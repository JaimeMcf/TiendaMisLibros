import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f4f4f4" }}>
     
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#333", color: "#fff" }}>
        <h2>📖 Librería</h2>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
          <Link to="/data" style={{ color: "#fff", textDecoration: "none" }}>Catálogo</Link>
          <Link to="/carrito" style={{ color: "#fff", textDecoration: "none" }}>Carrito</Link>
          <Link to="/login" style={{ color: "#ffcc00", textDecoration: "none", fontWeight: "bold" }}>Admin / Login</Link>
        </nav>
      </header>

      
      
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>

      
      <footer style={{ textAlign: "center", padding: "15px", background: "#222", color: "#aaa" }}>
        © 2026 - Todos los derechos reservados.
      </footer>
    </div>
  );
}