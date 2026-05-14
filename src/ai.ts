import { GoogleAIBackend, getAI, getGenerativeModel } from 'firebase/ai'
import { app } from './firebase'

const ai = getAI(app, { backend: new GoogleAIBackend() })
const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' })

export async function generate(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt)
  return result.response.text()
}
