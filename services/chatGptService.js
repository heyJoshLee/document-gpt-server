import { ChatGPTAPI } from 'chatgpt'

export const chatGptRequestWithHtml = async (prompt) => {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })
  const res = await api.sendMessage(`${prompt}` + 'Provide the correct html markup. Include the response in the correct HTML format with no other text. Do not provide additional text like \```html. Start with <!DOCTYPE html> and include the correct tags.')
  const removedExtraText = res.text.replace(/```html/g, '').replace(/```/g, '');
  return removedExtraText;
}