// test/assistantTest.test.js
import { expect } from 'chai';
import {
  DLPFCAssistant,
  VMPFCAssistant,
  OFCAssistant,
  MPFCAssistant,
  ACCAssistant,
  createAssistants,
} from '../src/lib/pfc';
import dotenv from 'dotenv';

dotenv.config();

describe('Assistant Tests', function () {
  this.timeout(60000); // Increase the timeout to 60 seconds

  describe('DLPFCAssistant', function () {
    it('should provide planning and prioritization strategies', async function () {
      const assistant = await DLPFCAssistant.createInstance();
      const response = await assistant.analyze('How do I manage my time better?');
      expect(response).to.be.a('string');
      expect(response).to.match(/planning|prioritization|strategies/i);
    });
  });

  // ... Other assistant tests

  describe('QLearningAssistant', function () {
    it('should synthesize responses from all agents', async function () {
      const assistants = await createAssistants();
      const inputText =
        'How do I manage my time, assess risks, understand rewards, resolve conflicts, and improve relationships?';
      const otherAgentOutputs = {
        DLPFC: await assistants.DLPFC.analyze(inputText),
        VMPFC: await assistants.VMPFC.analyze(inputText),
        OFC: await assistants.OFC.analyze(inputText),
        MPFC: await assistants.MPFC.analyze(inputText),
        ACC: await assistants.ACC.analyze(inputText),
      };
      const response = await assistants.QLearning.analyze(inputText, otherAgentOutputs);
      console.log('QLearningAssistant Response:', response);
      expect(response).to.be.a('string');
      expect(response).to.include('DLPFC');
      expect(response).to.include('VMPFC');
      expect(response).to.include('OFC');
      expect(response).to.include('MPFC');
      expect(response).to.include('ACC');
    });
  });
});
