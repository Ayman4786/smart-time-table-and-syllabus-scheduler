import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY_HERE");

export async function extractCalendarEvents(file: File) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const fileData = await file.arrayBuffer();
  const base64File = btoa(
    new Uint8Array(fileData).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const prompt = `
  You are an assistant that extracts academic calendar information.
  Convert document into JSON with fields: date, title, time, type.
  Types: Holiday | Event | Exam
  If time missing → leave as empty string "".

  Example Output:
  [
    {"date": "2025-12-24", "title": "Christmas Eve", "time": "09:00", "type": "Holiday"},
    {"date": "2025-12-25", "title": "Christmas", "time": "09:00", "type": "Holiday"}
  ]
  `;

  const result = await model.generateContent([
    { inlineData: { mimeType: file.type, data: base64File } },
    prompt,
  ]);

  const response = result.response.text();

  try {
    return JSON.parse(response);
  } catch (err) {
    console.error("Gemini returned non-JSON output:", response);
    throw new Error("Event parsing failed");
  }
}
