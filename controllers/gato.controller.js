// Controlador de gatos
import db from "../firebase.js";

export const registrarGato = async (req, res) => {
    try {
        const { nombre, edad, peso, raza } = req.body;

        // Validación básica
        if (!nombre || !edad || !peso || !raza) {
            return res.status(400).json({
                mensaje:
                    "Todos los campos son obligatorios: nombre, edad, peso y raza."
            });
        }

        // Guardar gato en Firebase Firestore
        const docRef = await db.collection("gatos").add({
            nombre: nombre,
            edad: Number(edad),
            peso: Number(peso),
            raza: raza,
            fecha: new Date().toISOString()
        });

        // Respuesta
        const mensaje =
            `¡Gato registrado con éxito en Firebase! ` +
            `ID: ${docRef.id} | ` +
            `Nombre: ${nombre} | ` +
            `Edad: ${edad} años | ` +
            `Peso: ${peso} kg | ` +
            `Raza: ${raza}`;

        res.status(201).json({
            mensaje: mensaje
        });

    } catch (error) {
        console.error("Error al guardar en Firebase:", error);

        res.status(500).json({
            mensaje: "Error al guardar en Firebase: " + error.message
        });
    }
};