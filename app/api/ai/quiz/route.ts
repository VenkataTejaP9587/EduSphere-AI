import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { subject, topic, difficulty, numQuestions, referenceText } = await req.json();

    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const nQuestions = Math.min(Math.max(Number(numQuestions) || 5, 2), 15);
    const apiKey = process.env.GEMINI_API_KEY;
    const isDemo = !apiKey || apiKey.includes('your_gemini_api_key_here');

    if (!isDemo) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey as string);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            responseMimeType: 'application/json',
          },
        });

        const systemPrompt = `You are an expert academic test generator.
Generate a multiple-choice quiz based on the following parameters:
- Course: ${subject}
- Topic: ${topic}
- Difficulty Level: ${difficulty}
- Number of Questions: ${nQuestions}
${referenceText ? `- Reference Material to target questions: ${referenceText}` : ''}

You MUST return a JSON array containing exactly ${nQuestions} quiz question objects.
Return ONLY raw JSON. Do not wrap in markdown format or add any surrounding text.
The JSON array must match this schema structure:
[
  {
    "id": 1,
    "question": "Clear question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0, // 0-indexed correct option (e.g. 0 corresponds to first option, 1 to second, etc.)
    "explanation": "Why this option is correct and others are not"
  }
]`;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();
        const quizData = JSON.parse(responseText);

        if (Array.isArray(quizData)) {
          return NextResponse.json({ quiz: quizData, isDemo: false });
        }
      } catch (err: any) {
        console.warn('Real Gemini API call failed. Falling back to Demo Mode:', err);
      }
    }

    // --- Demo Mode Fallback (Smart Dynamic Generator) ---
    const subjectName =
      subject === 'crs-001'
        ? 'Full Stack Web Development'
        : subject === 'crs-002'
        ? 'Data Structures & Algorithms'
        : 'Machine Learning Fundamentals';

    let sentences: string[] = [];
    if (referenceText && referenceText.trim()) {
      sentences = referenceText
        .split(/[.!?]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 15);
    }

    const quiz = [];
    for (let i = 1; i <= nQuestions; i++) {
      let qText = '';
      let options = [];
      let answer = 0;
      let explanation = '';

      // Use reference notes if available to customize questions
      if (sentences.length > 0) {
        const sentence = sentences[(i - 1) % sentences.length];
        qText = `In reference to "${sentence}", which option represents a valid conclusion or application of "${topic}"?`;
        options = [
          `Implementing optimizing compilers to validate the logic directly`,
          `Using dynamic runtime abstraction wrappers for safety constraints`,
          `Adhering to standard ${subjectName} conventions and execution bounds`,
          `All of the above`
        ];
        answer = 3;
        explanation = `The reference material explicitly highlights: "${sentence}". At a ${difficulty} difficulty, all options contribute to verifying the context of ${topic}.`;
      } else {
        // Generic topics templates
        if (i % 3 === 1) {
          qText = `What is a primary system design constraint when implementing "${topic}" in "${subjectName}"?`;
          options = [
            `Ensuring low latency and high availability across distributed nodes`,
            `Caching computed responses to reduce memory footprints`,
            `Restricting type conversions in dynamic runtime loops`,
            `Enforcing static allocation profiles for active client calls`
          ];
          answer = 0;
          explanation = `For ${topic} inside ${subjectName}, maintaining low latency is critical to operational performance.`;
        } else if (i % 3 === 2) {
          qText = `At a "${difficulty}" level, what is the most typical bottleneck or error pattern seen with "${topic}"?`;
          options = [
            `Inter-process communication bounds under load`,
            `Database connection pool exhaustion`,
            `Memory leak vulnerabilities during async cycles`,
            `Incorrect algorithmic complexity scaling`
          ];
          answer = 3;
          explanation = `With ${difficulty} level operations on ${topic}, understanding and avoiding incorrect algorithmic scaling is key to efficiency.`;
        } else {
          qText = `Which of the following architectural patterns represents the recommended approach to scaling "${topic}"?`;
          options = [
            `Horizontal scaling with load balanced request routing`,
            `Vertical scaling on a single database write instance`,
            `Replacing compile time type checking with dynamic bindings`,
            `Bypassing client validation checks for instant updates`
          ];
          answer = 0;
          explanation = `Horizontal scaling ensures that ${topic} configurations can handle increased loads smoothly without single-point failures.`;
        }
      }

      quiz.push({
        id: i,
        question: qText,
        options,
        answer,
        explanation,
      });
    }

    return NextResponse.json({ quiz, isDemo: true });
  } catch (error: any) {
    console.error('Quiz generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
