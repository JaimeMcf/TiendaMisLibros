import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

export default function ItemListContainer() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "libros"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setLibros(lista);
      } catch (err) {
        console.error("Error al obtener libros:", err);
        setError("No se pudieron cargar los libros desde la base de datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Cargando catálogo... 🔄</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Catálogo de Libros (Firebase Firestore)</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {libros.map((libro) => (
          <div key={libro.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "200px", background: "#fff" }}>
            <img 
              src={libro.imagen} 
              alt={libro.nombre} 
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} 
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0 5px" }}>{libro.nombre}</h3>
            <p style={{ margin: "0 0 10px" }}><b>Precio:</b> ${libro.precio}</p>
            <Link to={`/data/${libro.id}`}>
              <button style={{ background: "blue", color: "white", padding: "5px 10px", border: "none", cursor: "pointer", width: "100%", borderRadius: "4px" }}>
                Ver Detalle
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
