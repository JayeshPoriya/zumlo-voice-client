import { CARTESIA } from "../../utils/Constants";

export const sendMessageToCartesia = async (text) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cartesia-Version": "2025-04-16",
        "X-API-Key": CARTESIA.API_KEY,
      },
      body: JSON.stringify({
        model_id: "sonic-llm-1", // Replace with YOUR LLM ID
        messages: [{ role: "user", content: text }],
        max_tokens: 150,
      }),
    });

    const textResponse = await response.text();

    console.log("Raw response:", textResponse);

    if (!response.ok) {
      return "Sorry, I couldn't understand that.";
    }

    // The API returns plain text (not JSON)
    return textResponse;
  } catch (err) {
    console.log("Cartesia Chat Error:", err);
    return "Something went wrong.";
  }
};
