import { TargetModel } from './types';

export const generateQuestions = (query: string): string[] => {
  // Example: Generate 5 questions based on the query
  return [
    `What is the main idea behind "${query}"?`,
    `How would you describe "${query}" in detail?`,
    `What are the key elements of "${query}"?`,
    `Can you provide examples related to "${query}"?`,
    `What are the potential applications of "${query}"?`
  ];
};

export const formatPromptForModel = (basePrompt: string, targetModel: TargetModel = 'midjourney'): string => {
  let formatted = basePrompt;

  // Extract any --ar parameters if present
  let arMatch = formatted.match(/--ar\s+([0-9]+:[0-9]+)/i);
  let aspectRatio = arMatch ? arMatch[1] : null;

  switch (targetModel) {
    case 'midjourney':
      // Ensure Midjourney parameter format is active
      if (!formatted.includes('--v 6.0') && !formatted.includes('--v')) {
        formatted = formatted.replace(/(--ar\s+[0-9]+:[0-9]+)?$/, (match) => {
          return match ? `${match} --v 6.0 --style raw` : ' --v 6.0 --style raw';
        });
      }
      break;

    case 'flux':
      // Flux prefers clean natural text descriptions without -- flags
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      if (aspectRatio) {
        formatted = `${formatted}, ${aspectRatio} aspect ratio frame`;
      }
      formatted = `A high quality, photorealistic image of ${formatted}`;
      break;

    case 'sdxl':
      // SDXL prefers comma-separated weighted tags
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      if (aspectRatio) {
        formatted = `${formatted}, ${aspectRatio} ratio`;
      }
      if (!formatted.toLowerCase().includes('trending on artstation')) {
        formatted = `${formatted}, masterpiece, highly detailed, 8k resolution, trending on artstation`;
      }
      break;

    case 'dalle3':
      // DALL-E 3 works best with descriptive sentences
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      if (aspectRatio) {
        formatted = `A wide ${aspectRatio} composition showing ${formatted}`;
      } else {
        formatted = `A vivid and detailed image of ${formatted}`;
      }
      break;

    case 'ideogram':
      // Ideogram excels at typography and graphic clarity
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      if (aspectRatio) {
        formatted = `${formatted}, aspect ratio ${aspectRatio}`;
      }
      formatted = `${formatted}, crisp typography, vivid layout, graphic excellence`;
      break;

    case 'recraft':
      // Recraft vector / brand / product style formatting
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      if (aspectRatio) {
        formatted = `${formatted}, canvas ratio ${aspectRatio}`;
      }
      formatted = `${formatted}, professional vector and graphic composition, ultra crisp finish`;
      break;

    case 'leonardo':
      // Leonardo AI PhotoReal / Alchemy enhancement
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      if (aspectRatio) {
        formatted = `${formatted}, ${aspectRatio} framing`;
      }
      formatted = `${formatted}, Leonardo PhotoReal style, cinematic lighting, 8k render, octane detail`;
      break;

    case 'chatgpt':
    case 'claude':
      // Text generation models
      formatted = formatted.replace(/--ar\s+[0-9]+:[0-9]+/gi, '');
      formatted = formatted.replace(/--[a-z0-9-]+\s+\S+/gi, '');
      formatted = `${formatted}\n\nPlease format your response using Markdown with clear headings and bullet points where appropriate.`;
      break;
  }

  // Final cleanup for commas and spaces
  formatted = formatted.replace(/,(\s*,)+/g, ','); // replace multiple commas with one
  formatted = formatted.replace(/\s+/g, ' ').trim(); // normalize spaces
  formatted = formatted.replace(/,\s*,/g, ','); // double comma fix
  formatted = formatted.replace(/^,\s*/, ''); // remove leading comma
  formatted = formatted.replace(/,\s*(?=--)/, ' '); // remove comma before parameters
  formatted = formatted.replace(/,\s*$/, ''); // remove trailing comma

  return formatted;
};

export const generatePrompt = (
  template: string,
  idea: string,
  answers: Record<string, string>,
  boosters: string[] = [],
  targetModel: TargetModel = 'midjourney'
): string => {
  let prompt = template;
  
  // Replace ${idea}
  prompt = prompt.replace(/\$\{idea\}/g, idea);
  
  // Replace other variables like ${style}, ${lighting}
  Object.entries(answers).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    prompt = prompt.replace(regex, value);
  });

  // If there's a custom input that wasn't part of the template, append it
  if (answers.custom && !template.includes('${custom}')) {
    if (prompt.includes(' --')) {
      const parts = prompt.split(' --');
      prompt = `${parts[0]}, ${answers.custom} --${parts.slice(1).join(' --')}`;
    } else {
      prompt = `${prompt}, ${answers.custom}`;
    }
  }

  // Clean up any unanswered placeholders
  prompt = prompt.replace(/\$\{.*?\}/g, '');
  
  // Professional quality boosters (added only if not already present)
  boosters.forEach(booster => {
    if (!prompt.toLowerCase().includes(booster.toLowerCase())) {
        if (prompt.includes(' --')) {
          const parts = prompt.split(' --');
          prompt = `${parts[0]}, ${booster} --${parts.slice(1).join(' --')}`;
        } else {
          prompt = `${prompt}, ${booster}`;
        }
    }
  });

  // Apply model-specific formatting
  return formatPromptForModel(prompt, targetModel);
};

