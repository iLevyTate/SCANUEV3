// src/lib/logging.js
import fs from 'fs';
import path from 'path';

// Define paths for storing logs
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const interactionLogPath = path.join(logsDir, 'interactionLog.json');
const qLearningLogPath = path.join(logsDir, 'qLearningLog.json');

// Utility function to write logs to a file
function writeLogToFile(filePath, logData) {
  fs.writeFileSync(filePath, JSON.stringify(logData, null, 2));
}

// Utility function to load logs from a file
function loadLogsFromFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const logData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(logData);
    }
    return [];
  } catch (error) {
    console.error(`Error loading logs from ${filePath}:`, error);
    return [];
  }
}

// Function to log interaction data
export function logInteraction(input, agentOutputs, unifiedOutput) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    input,
    agentOutputs,
    unifiedOutput,
    timestamp,
  };

  const interactionLogs = loadLogsFromFile(interactionLogPath);
  interactionLogs.push(logEntry);
  writeLogToFile(interactionLogPath, interactionLogs);
  console.log(`Logged Interaction at ${timestamp}`);
}

// Function to log Q-Learning data
export function logQLearningInteraction(
  state,
  actions,
  reward,
  nextState,
  combinedOutput
) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    state,
    actions,
    reward,
    nextState,
    output: combinedOutput,
    timestamp,
  };

  const qLearningLogs = loadLogsFromFile(qLearningLogPath);
  qLearningLogs.push(logEntry);
  writeLogToFile(qLearningLogPath, qLearningLogs);
  console.log(`Logged Q-Learning Interaction at ${timestamp}`);
}

// Function to retrieve interaction logs
export function getInteractionLogs() {
  return loadLogsFromFile(interactionLogPath);
}

// Function to retrieve Q-Learning logs
export function getQLearningLogs() {
  return loadLogsFromFile(qLearningLogPath);
}
