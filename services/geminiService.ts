
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function analyzeGameScreenshot(base64Image: string, prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const imagePart = {
    inlineData: {
      mimeType: 'image/png',
      data: base64Image.split(',')[1] || base64Image,
    },
  };
  
  const textPart = {
    text: `你是一位资深的8591游戏交易平台客服专家。请分析这张游戏截图并回答客服的问题：${prompt}。如果截图中包含游戏术语、道具、角色、账号风险信息或错误代码，请详细说明。`
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: [imagePart, textPart] },
    });
    return response.text || "未能生成分析结果。";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "分析失败，请检查网络或图片质量。";
  }
}
