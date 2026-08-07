import { studyPrompts } from './study';
import { codingPrompts } from './coding';
import { marketingPrompts } from './marketing';
import { writingPrompts } from './writing';
import { videoPrompts } from './video';
import { cinematicPrompts } from './cinematic';
import { photographyPrompts } from './photography';
import { charactersPrompts } from './characters';
import { productsPrompts } from './products';
import { architecturePrompts } from './architecture';
import { fashionPrompts } from './fashion';
import { social_thumbPrompts } from './social_thumb';
import { ai_influencerPrompts } from './ai_influencer';
import { poster_artPrompts } from './poster_art';
import { arabic_heritagePrompts } from './arabic_heritage';
import { otherPrompts } from './other';

export const categoryTemplates: Record<string, Record<string, any>> = {
  study: studyPrompts,
  coding: codingPrompts,
  marketing: marketingPrompts,
  writing: writingPrompts,
  video: videoPrompts,
  cinematic: cinematicPrompts,
  photography: photographyPrompts,
  characters: charactersPrompts,
  products: productsPrompts,
  architecture: architecturePrompts,
  fashion: fashionPrompts,
  social_thumb: social_thumbPrompts,
  ai_influencer: ai_influencerPrompts,
  poster_art: poster_artPrompts,
  arabic_heritage: arabic_heritagePrompts,
   other: otherPrompts,
};
