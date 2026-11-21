import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";

export function FormularioLibroContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    autor: "",
    precio: "",
    imagen: "",
    descripcion: ""
  });

  const [loading, setLoading] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm({ ...datosForm, [name]: value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (Number(datosForm.precio) <= 0) {
      alert("El precio debe ser mayor a 0.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "libros"), {
        ...datosForm,
        precio: Number(datosForm.precio)
      });
      alert("¡Libro guardado exitosamente en Firebase!");
      setDatosForm({ nombre: "", autor: "", precio: "", imagen: "", descripcion: "" });
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert("Hubo un error al guardar el libro.");
    } finally {
      setLoading(false);
    }
  };

  const FormStyle = {
    display: "flex", flexDirection: "column", maxWidth: "30rem",
    margin: "2rem auto", padding: "20px", border: "1px solid #ccc",
    borderRadius: "8px", gap: "12px", background: "#fff",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
  };

  return (
    <form style={FormStyle} onSubmit={manejarEnvio}>
      <h3>Agregar Nuevo Libro (Firebase + ImgBB)</h3>
      <div>
        <label>Nombre del libro</label>
        <input type="text" name="nombre" value={datosForm.nombre} onChange={manejarCambio} placeholder="Ej. Relatos de terror" required style={{width: "100%", padding: "8px"}} />
      </div>
      <div>
        <label>Autor</label>
        <input type="text" name="autor" value={datosForm.autor} onChange={manejarCambio} placeholder="Autor" required style={{width: "100%", padding: "8px"}} />
      </div>
      <div>
        <label>Precio</label>
        <input type="number" name="precio" value={datosForm.precio} onChange={manejarCambio} placeholder="12000" required style={{width: "100%", padding: "8px"}} />
      </div>
      <div>
        <label>URL de ImgBB (Imagen)</label>
        <input type="text" name="imagen" value={datosForm.imagen} onChange={manejarCambio} placeholder="https://i.ibb.co/..." required style={{width: "100%", padding: "8px"}} />
      </div>
      <div>
        <label>Descripción</label>
        <textarea name="descripcion" value={datosForm.descripcion} onChange={manejarCambio} placeholder="Sinopsis..." required style={{width: "100%", padding: "8px"}} />
      </div>
      <button type="submit" disabled={loading} style={{ background: "blue", color: "white", padding: "10px", border: "none", cursor: "pointer", borderRadius: "4px" }}>
        {loading ? "Guardando..." : "Guardar Libro"}
      </button>
    </form>
  );
}