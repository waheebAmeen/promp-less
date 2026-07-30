import { generatePrompt } from './packages/app/engine/PromptGenerator';
import { codingPrompts } from './packages/app/engine/templates/coding';

const answers = {
  projectDescription: 'My Food App',
  techStack: 'Node.js and React',
  architecturePattern: 'Microservices',
  focusArea: 'Security'
};

const result = generatePrompt(codingPrompts.softwareArchitect.template, '', answers, [], 'chatgpt');
console.log(result);
