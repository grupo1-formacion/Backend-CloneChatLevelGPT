const fs = require('fs');
const { response, request } = require('express');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const { ContentGenerate, ExampleGenerate, ExerciseGenerate, QuestionGenerate } = require('../models/apiChat');
const path = require('path');

const URL = 'C:/Users/Geovanni/Desktop/BackEnd-OpenIa/Controllers'

const generateDocument = async (req = request, res = response) => {
  try {
    const { solicitud } = req.body;
    const { contexto } = req.body;

    const content = fs.readFileSync(path.resolve(URL, "./Membrete.docx"))

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const contenido = await ContentGenerate(solicitud, contexto);
    console.log(contenido);

    const ejemplos = await ExampleGenerate(solicitud, contexto);
    console.log(ejemplos);

    const ejercicios = await ExerciseGenerate(solicitud, contexto);
    console.log(ejercicios);

    const preguntas = await QuestionGenerate(solicitud, contexto);
    console.log(preguntas);

    doc.render({
      titulo: solicitud,
      explicacion: contenido,
      ejemplos: ejemplos,
      ejercicios: ejercicios,
      preguntas: preguntas,
    });

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    
    const pathExterno = `C:/Users/Geovanni/Desktop/DocumentGenerate/`

    // Crear el directorio si no existe
    if (!fs.existsSync(pathExterno)){
        fs.mkdirSync(pathExterno);
    }

    const filePath = path.join(pathExterno, `${solicitud}.docx`);

    // Guardar el buffer como un archivo .docx
    fs.writeFileSync(filePath, buf);

    // Descargar el archivo
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: 'Error al descargar el archivo'
        })
      }
    });

  } catch (error) {

    console.error(error);
    res.status(401).json({
      error: 'No se pudo generar el documento'
    });
  }
}

module.exports = generateDocument;
