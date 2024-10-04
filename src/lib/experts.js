// src/lib/experts.js

export class Assistant {
  constructor(config) {
    this.config = config;
  }

  async analyze(input) {
    // To be overridden by subclasses
    throw new Error('analyze method not implemented');
  }
}
