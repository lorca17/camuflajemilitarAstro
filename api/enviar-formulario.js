// src/pages/api/enviar-formulario.js

import nodemailer from 'nodemailer';

export async function post({ request }) {
    try {
        // Obtener los datos del formulario
        const formData = await request.formData();
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const mensaje = formData.get('mensaje');

        // Configuración de transporte de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puedes usar otro servicio de correo como Outlook o configurar SMTP
            auth: {
                user: process.env.EMAIL_USER, // Correo electrónico desde el cual se enviará
                pass: process.env.EMAIL_PASS, // Contraseña o app password del correo electrónico
            },
        });

        // Configuración del correo electrónico
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'tu-correo@ejemplo.com', // Dirección a la cual quieres recibir el mensaje
            subject: 'Nuevo mensaje de contacto en Deneopreno.com',
            text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${mensaje}`,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Mensaje enviado con éxito' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        return new Response(JSON.stringify({ error: 'Error al enviar el mensaje' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
