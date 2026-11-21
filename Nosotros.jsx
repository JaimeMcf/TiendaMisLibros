import { useState, useEffect } from "react";

export default function Nosotros() {
  const [escritores, setEscritores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/escritores.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar la información de los escritores.");
        }
        return response.json();
      })
      .then((data) => {
        setEscritores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al hacer fetch:", err);
        setError("Error al cargar los datos de la sección Nosotros.");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Cargando escritores... 🔄</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      
     
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img 
          src="./preD/d.jpg" 
          alt="La mágia de la escritura" 
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} 
        />
      </div>

      <h2 style={{ textAlign: "center" }}>Sobre Nosotros - Los Escritores</h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Conoce a las mentes creativas detrás de nuestras historias y universos.
      </p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {escritores.map((escritor) => (
          <div 
            key={escritor.id} 
            style={{ 
              border: "1px solid #ccc", 
              padding: "20px", 
              borderRadius: "8px", 
              width: "250px", 
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <img 
              src={escritor.imagen} 
              alt={escritor.nombre} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", marginBottom: "15px" }} 
            />
            <h3 style={{ fontSize: "18px", margin: "10px 0 5px" }}>{escritor.nombre}</h3>
            <p style={{ fontSize: "14px", color: "#555", margin: "0" }}>{escritor.biografia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}