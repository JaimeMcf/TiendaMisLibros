import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";

export default function ItemDetail() {
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const docRef = doc(db, "libros", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLibro({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("El libro no existe!");
        }
      } catch (err) {
        console.error("Error al obtener detalle:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
  }, [id]);

  if (loading) return <h2>Cargando detalle...</h2>;
  if (!libro) return <h2>Libro no encontrado.</h2>;

  return (
    <div style={{ padding: "20px", background: "#fff", maxWidth: "600px", margin: "20px auto", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <img src={libro.imagen} alt={libro.nombre} style={{ width: "100%", maxHeight: "300px", objectFit: "contain", marginBottom: "15px" }} />
      <h2>{libro.nombre}</h2>
      <p><b>Autor:</b> {libro.autor}</p>
      <p>{libro.descripcion}</p>
      <p><b>Precio:</b> ${libro.precio}</p>
      <button 
        onClick={() => addItem(libro, 1)}
        style={{ background: "green", color: "white", padding: "10px 15px", border: "none", cursor: "pointer", borderRadius: "4px" }}
      >
        Agregar al Carrito
      </button>
      <br /><br />
      <Link to="/data" style={{ color: "blue", textDecoration: "none" }}>← Volver al catálogo</Link>
    </div>
  );
}
