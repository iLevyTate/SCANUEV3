// src/app/api/analyze/route.js
import { NextResponse } from 'next/server';
import { createAssistants } from '@/lib/pfc';

export async function POST(req) {
  try {
    const { inputText, context } = await req.json();

    if (!inputText) {
      return NextResponse.json({ error: 'Input text is required.' }, { status: 400 });
    }

    const assistants = await createAssistants();

    // Collect outputs from the assistants
    const otherAgentOutputs = {
      DLPFC: await assistants.DLPFC.analyze(inputText),
      VMPFC: await assistants.VMPFC.analyze(inputText),
      OFC: await assistants.OFC.analyze(inputText),
      MPFC: await assistants.MPFC.analyze(inputText),
      ACC: await assistants.ACC.analyze(inputText),
    };

    const qLearningOutput = await assistants.QLearning.analyze(
      inputText,
      otherAgentOutputs
    );

    return NextResponse.json({
      response: qLearningOutput,
      assistantOutputs: otherAgentOutputs,
    });
  } catch (error) {
    console.error('Error during analysis:', error);
    return NextResponse.json(
      { error: 'An error occurred during analysis.' },
      { status: 500 }
    );
  }
}
