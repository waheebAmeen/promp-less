export const generatePrompt = (
  template: string,
  idea: string,
  answers: Record<string, string>,
  boosters: string[] = []
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
    // Append before any Midjourney-style parameters (starting with --)
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

  // Final cleanup for commas and spaces
  prompt = prompt.replace(/,(\s*,)+/g, ','); // replace multiple commas with one
  prompt = prompt.replace(/\s+/g, ' ').trim(); // normalize spaces
  prompt = prompt.replace(/,\s*,/g, ','); // double comma fix
  prompt = prompt.replace(/^,\s*/, ''); // remove leading comma
  prompt = prompt.replace(/,\s*(?=--)/, ' '); // remove comma before parameters
  prompt = prompt.replace(/,\s*$/, ''); // remove trailing comma

  return prompt;
};
