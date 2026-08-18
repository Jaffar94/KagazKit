import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Removed deprecated Edge runtime

// We'll enforce a strict JSON schema for the response
const responseSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Name of the item purchased' },
          quantity: { type: 'number', description: 'Quantity of the item' },
          price: { type: 'number', description: 'Total price for this line item, if found' }
        },
        required: ['name']
      }
    },
    subtotal: { type: 'number', description: 'Subtotal amount before tax' },
    tax: { type: 'number', description: 'Total tax amount' },
    total: { type: 'number', description: 'Final total amount paid' },
    merchant: { type: 'string', description: 'Name of the store or merchant' },
    date: { type: 'string', description: 'Date of the transaction in YYYY-MM-DD format if available' }
  },
  required: ['items']
};

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
    }

    // Server-side security check: Prevent massively oversized payloads (DoS protection)
    // 5MB limit in base64 is roughly 7,000,000 characters
    if (imageBase64.length > 7000000) {
      return NextResponse.json({ error: 'Payload too large. Maximum size is 5MB.' }, { status: 413 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Call Gemini 1.5 Flash Vision Model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Extract the items, prices, tax, and total from this receipt.' },
            {
              inlineData: {
                data: imageBase64,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.1, // Keep it deterministic for data extraction
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response text from Gemini");
    }

    // Parse the strict JSON response
    const data = JSON.parse(resultText);

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Error extracting receipt:', error);
    return NextResponse.json({ 
      error: 'Failed to extract data. Please ensure the image is clear and try again.' 
    }, { status: 500 });
  }
}
