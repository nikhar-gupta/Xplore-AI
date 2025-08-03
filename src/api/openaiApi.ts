// src/api/openaiApi.ts

import axios from "axios";
import type { TravelFormData, ItineraryDay } from "../types/itinenary";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const generateItinerary = async (
  formData: TravelFormData
): Promise<ItineraryDay[]> => {
  const prompt = `Create a ${formData.days}-day travel itinerary for a ${
    formData.travelType
  } trip to ${
    formData.destination
  }. Focus on interests like ${formData.interests.join(", ")}.

Return ONLY a JSON array in this format:
[
  { "day": 1, "plan": "Visit Eiffel Tower, then have lunch near the Seine." },
  { "day": 2, "plan": "Explore the Louvre Museum and walk around Montmartre." }
]`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content: string = response.data.choices[0].message.content;

  let itinerary: ItineraryDay[] = [];

  try {
    itinerary = JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse OpenAI response", err);
    throw new Error("AI response could not be parsed. Please try again.");
  }

  return itinerary;
};
