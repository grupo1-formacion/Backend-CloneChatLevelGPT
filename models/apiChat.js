const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  organization: process.env.ORG_API
});

const ContentGenerate = async (solicitud, lenguaje) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Quiero que me des la información de minimo 4 lineas sobre ${solicitud} en el contexto de programación de ${lenguaje} responde solamente lo solicitado`
    }],
  });

  const [{message: {content}}] = response.choices
  return content
}


//---------------------------------------------------------

const ExampleGenerate = async (solicitud, lenguaje) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Quiero que me des 5 ejemplos sobre ${solicitud} con el lenguaje de programación ${lenguaje}, también que me digas como mejorar en estos`
    }],
  });

  const [{message: {content}}] = response.choices
  return content
}

//---------------------------------------------------------

const ExerciseGenerate = async (solicitud, lenguaje) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Quiero que me des 5 ejercicios sobre ${solicitud} con el lenguaje de programación ${lenguaje}, también que al final se muestren las respuestas`
    }],
  });

  const [{message: {content}}] = response.choices
  return content
}


const QuestionGenerate = async (solicitud, lenguaje) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Quiero que me des 10 preguntas sobre ${solicitud} con el contexto del lenguaje de programacíon de ${lenguaje}, con su resultado hasta el final pero que esten ocultos`
    }],
  });

  const [{message: {content}}] = response.choices
  return content
} 


module.exports = {
  ContentGenerate,
  ExampleGenerate,
  ExerciseGenerate,
  QuestionGenerate
}