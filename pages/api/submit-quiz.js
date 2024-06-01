// api/submitQuiz.js
import fetch from 'node-fetch';

export default async function handler(request, response) {
  console.log('Submitting quiz:', request.body);
  const { q2, q3, q4, q5, q6, q7, q8 } = request.body;

  const chatGPTRequest = `
    I have the following responses to some questions:
    1. What do you believe about the world? ${q2.join(', ')}
    2. What makes you come alive? ${q3.join(', ')}
    3. When have you felt the most fulfilled and satisfied? ${q4.join(', ')}
    4. What impact do you want to make on the world or in the lives of others? ${q5.join(', ')}
    5. Who are the people you admire the most and why? ${q6.join(', ')}
    6. What are the challenges or hardships that you feel most driven to solve or overcome? ${q7.join(', ')}
    7. What is a cause or belief that you would stand up for no matter what? ${q8.join(', ')}
    
    Can you help me generate a 'Why' statement based on these responses? DO NOT HAVE ANYT WORDS OR BEGINING OUTSIDE OF JUST THE WHY STATEMENT. Perhaps use something inspired by “To use my [strengths] to [contribution], driven by my passion for [passion], so that I can [vision].”
  `;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: chatGPTRequest },
        ],
      }),
    });
    console.log('OpenAI API response:', res.status, res.statusText)
    if (!res.ok) {
      const errorData = await res.json();
      console.error('OpenAI API request failed:', errorData);
      throw new Error(errorData);
    }

    const data = await res.json();
    response.status(200).json({ data: data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API request failed:', error);
    response.status(500);
  }
}
