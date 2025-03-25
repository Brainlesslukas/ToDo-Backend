import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import process from 'node:process';

const token = process.env.OPENAI_API_KEY;

@Injectable()
export class HelpBotService {
  async test(): Promise<object> {
    return { status: 'ok' };
  }

  async generateText() {
    const client = new OpenAI({
      baseURL: 'https://models.inference.ai.azure.com',
      apiKey: token,
    });

    const response = await client.chat.completions.create({
      messages: [{ role: 'system', content: 'BIst du dumm oder bist du schlau?' }],
      model: 'gpt-4o',
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  }
}
