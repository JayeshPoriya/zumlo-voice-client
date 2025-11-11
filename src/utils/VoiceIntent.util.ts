export function detectNavigationIntent(text: string) {
  const t = text.toLowerCase();

  if (t.includes("dashboard")) return "Dashboard";
  if (t.includes("journal") || t.includes("journaling")) return "Journaling";
  if (t.includes("goal")) return "Goals";
  if (t.includes("wellness")) return "WellnessPlans";
  if (t.includes("mood")) return "MoodTracker";

  return null; // No navigation intent found
}

export function detectEmotion(text: string) {
  const t = text.toLowerCase();

  if (t.includes("sad") || t.includes("depressed") || t.includes("down"))
    return "sad";
  if (t.includes("anxious") || t.includes("nervous") || t.includes("panic"))
    return "anxiety";
  if (t.includes("angry") || t.includes("frustrated")) return "anger";

  return "neutral";
}

export function getCalmingVoiceResponse(emotion: string) {
  switch (emotion) {
    case "sad":
      return "I'm here with you. Take a breath with me. You're not alone.";
    case "anxiety":
      return "Let's slow down together. Try inhaling gently for 4 seconds.";
    case "anger":
      return "I feel your frustration. Let's take a steady breath together.";
    default:
      return "I'm listening. What would you like to explore next?";
  }
}
