// src/lib/pfc.js

import { Assistant } from './experts'; // Correct named import
import { Configuration, OpenAIApi } from 'openai';
import { MultiAgentQLearning } from './qlearning';
import { refinedWordLists } from './refinedWordLists';

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class PFCAssistant extends Assistant {
  constructor(config) {
    super(config);
  }

  async analyze(input) {
    try {
      const response = await openai.createChatCompletion({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.instructions },
          { role: 'user', content: input },
        ],
        temperature: this.config.temperature,
      });
      return response.data.choices[0].message?.content.trim() || '';
    } catch (error) {
      throw new Error(`Error in ${this.config.name}.analyze: ${error.message}`);
    }
  }
}

// DLPFCAssistant
class DLPFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'DLPFC Assistant',
      instructions: `You are an expert on the Dorsolateral Prefrontal Cortex (DLPFC). Focus on executive functions, working memory, and cognitive control. Provide insights on task complexity, attention allocation, and goal-directed behavior.`,
      model: 'gpt-4',
      temperature: 0.7,
    };
    return new DLPFCAssistant(config);
  }
}

// VMPFCAssistant
class VMPFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'VMPFC Assistant',
      instructions: `You are an expert on the Ventromedial Prefrontal Cortex (VMPFC). Focus on emotion regulation, decision-making, and value-based choices. Provide insights on risk assessment, social context, and personal relevance.`,
      model: 'gpt-4',
      temperature: 0.7,
    };
    return new VMPFCAssistant(config);
  }
}

// OFCAssistant
class OFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'OFC Assistant',
      instructions: `You are an expert on the Orbitofrontal Cortex (OFC). Focus on reward processing, expectation, and adaptive behavior. Provide insights on value representation, outcome evaluation, and flexible decision-making.`,
      model: 'gpt-4',
      temperature: 0.7,
    };
    return new OFCAssistant(config);
  }
}

// MPFCAssistant
class MPFCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'MPFC Assistant',
      instructions: `You are an expert on the Medial Prefrontal Cortex (MPFC). Focus on social cognition, self-referential processing, and theory of mind. Provide insights on social decision-making, empathy, and self-awareness.`,
      model: 'gpt-4',
      temperature: 0.7,
    };
    return new MPFCAssistant(config);
  }
}

// ACCAssistant
class ACCAssistant extends PFCAssistant {
  static async createInstance() {
    const config = {
      name: 'ACC Assistant',
      instructions: `You are an expert on the Anterior Cingulate Cortex (ACC). Focus on conflict monitoring, error detection, and cognitive control. Provide insights on performance monitoring, emotional regulation, and decision-making under uncertainty.`,
      model: 'gpt-4',
      temperature: 0.7,
    };
    return new ACCAssistant(config);
  }
}

// QLearningAssistant
class QLearningAssistant extends PFCAssistant {
  constructor(config) {
    super(config);
    this.qlearning = new MultiAgentQLearning(30, 5);
    this.stateSize = 30;
    this.actionSize = 5;
  }

  static async createInstance() {
    const config = {
      name: 'QLearning Assistant',
      instructions: `You are an expert in reinforcement learning and prefrontal cortex functions. Analyze inputs to provide strategies for decision-making and learning in multi-agent environments.`,
      model: 'gpt-4',
      temperature: 0.7,
    };
    return new QLearningAssistant(config);
  }

  async analyze(input, otherAgentOutputs) {
    try {
      // Preprocess input and agent outputs to create a state representation
      const state = this.preprocessInput(input, otherAgentOutputs);
      // Decide on actions using Q-learning
      const actions = await this.qlearning.act(state);
      // Normalize actions to probabilities
      const actionProbabilities = this.softmax(actions);
      // Combine outputs from other agents based on actions
      const combinedOutput = this.combineOutputs(otherAgentOutputs, actionProbabilities);
      // Simulate environment to get next state
      const nextState = this.simulateEnvironment(state, actionProbabilities);
      // Calculate reward
      const reward = this.calculateReward(state, actionProbabilities, nextState, combinedOutput);
      // Learn from the experience
      await this.qlearning.learn(state, actionProbabilities, reward, nextState);
      // Update the target network periodically
      this.qlearning.updateTargetNetwork();
      // Return the combined output
      return combinedOutput;
    } catch (error) {
      console.error('Error in QLearningAssistant.analyze:', error);
      throw error;
    }
  }

  preprocessInput(input, otherAgentOutputs) {
    // Implement preprocessing logic
    // We'll create a state vector based on word counts from refined word lists
    const state = [];
    const inputWords = input.toLowerCase().split(/\W+/);
    for (const category in refinedWordLists) {
      const words = refinedWordLists[category];
      const count = inputWords.filter((word) => words.includes(word)).length;
      state.push(count);
    }
    // Include additional features if necessary
    // Ensure the state vector has the correct size
    while (state.length < this.stateSize) {
      state.push(0);
    }
    return state.slice(0, this.stateSize);
  }

  softmax(values) {
    const maxVal = Math.max(...values);
    const exps = values.map((v) => Math.exp(v - maxVal));
    const sumExps = exps.reduce((sum, v) => sum + v, 0);
    return exps.map((v) => v / sumExps);
  }

  combineOutputs(otherAgentOutputs, actionProbabilities) {
    const regions = Object.keys(otherAgentOutputs);
    let combinedText = '';
    regions.forEach((region, index) => {
      const weight = actionProbabilities[index];
      combinedText += `### ${region} (Weight: ${weight.toFixed(2)})\n${otherAgentOutputs[region]}\n\n`;
    });
    return combinedText;
  }

  simulateEnvironment(state, actionProbabilities) {
    // Simulate the environment's response to the actions
    // For this example, we'll assume the next state depends on the current state and actions
    const nextState = state.map((s, i) => s + actionProbabilities[i % actionProbabilities.length]);
    return nextState.slice(0, this.stateSize);
  }

  calculateReward(state, actions, nextState, combinedOutput) {
    // Reward is based on the quality of the combined output
    // For simplicity, we'll use the length of the combined output and diversity of content
    const outputLengthReward = Math.min(combinedOutput.length / 1000, 1);
    const uniqueRegions = new Set(
      combinedOutput.match(/### (\w+)/g)?.map((match) => match.replace('### ', '')) || []
    ).size;
    const diversityReward = uniqueRegions / this.actionSize;
    const reward = 0.5 * outputLengthReward + 0.5 * diversityReward;
    return reward;
  }
}

// Create Assistants
export const createAssistants = async () => {
  try {
    const dlpfc = await DLPFCAssistant.createInstance();
    const vmpfc = await VMPFCAssistant.createInstance();
    const ofc = await OFCAssistant.createInstance();
    const mpfc = await MPFCAssistant.createInstance();
    const acc = await ACCAssistant.createInstance();
    const qlearning = await QLearningAssistant.createInstance();
    return {
      DLPFC: dlpfc,
      VMPFC: vmpfc,
      OFC: ofc,
      MPFC: mpfc,
      ACC: acc,
      QLearning: qlearning,
    };
  } catch (error) {
    console.error('Error creating assistants:', error);
    throw error;
  }
};