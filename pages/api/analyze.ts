import Groq from "groq-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { jobDescription, currentLevel, currentStack, technologies } =
      req.body;

    const userPrompt = [
      "Você é um assistente útil com o intuito de ajudar desenvolvedores a traçar um plano de desenvolvimento com base em descrições de vagas.",
      `Aqui está a descrição da vaga: ${jobDescription}.`,
      currentLevel ? `O nível atual do candidato é: ${currentLevel}.` : "",
      currentStack ? `O stack atual do candidato é: ${currentStack}.` : "",
      technologies
        ? `Tecnologias dominadas pelo candidato: ${technologies.join(", ")}.`
        : "",
      "Com base nessas informações, forneça um plano de desenvolvimento detalhado para o candidato. Responda sempre em Português do Brasil",
    ]
      .filter(Boolean)
      .join(" ");

    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "system", content: userPrompt }],
        model: process.env.MODEL_AI ?? "llama3-8b-8192",
        temperature: parseFloat(process.env.TEMPERATURE_AI ?? "0.5"),
        max_tokens: parseInt(process.env.MAX_TOKENS_AI ?? "8192"),
        top_p: 1,
        stop: null,
        stream: false,
      });

      res.status(200).json({ analysis: response.choices[0].message.content });
    } catch (error) {
      console.log("AQUI", error);
      res.status(500).json({ error: "Erro ao obter análise." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido." });
  }
}
