# Project: Promptless AI Image Prompt OS

## Core Identity
This is a specialized AI image prompt operating system. It is NOT a generic prompt tool. Every feature, category, and workflow must focus on helping users create professional-grade visual prompts for models like Midjourney, Flux, and SDXL.

## Architectural Conventions

### Product Workflows
- **Guided Art Direction:** Questionnaires should act as a "Creative Director" workflow (Cinema, Photography, Characters, etc.).
- **Professional Terminology:** Use industry-standard terms (e.g., lens types, lighting setups, cinematic composition).

### Mobile UX & Design
- **Locked Root Pattern:** To ensure a native-like experience on mobile web, the root `html`, `body`, and `#next` containers must be locked to `100%` height/width with `overflow: hidden`.
- **Dynamic Viewport:** Use `100dvh` (Dynamic Viewport Height) in CSS to handle mobile browser toolbars correctly.
- **Safe Area Awareness:** Components that float at the bottom (like navigation bars) MUST use the `useSafeArea` hook to account for system indicators and browser chrome.
- **Inner Scrolling:** Only internal `ScrollView` or `FlatList` components should handle vertical scrolling. Use `paddingBottom` buffers (at least `100px-150px`) to prevent content from being hidden by floating bars.

### Prompt Generation
- **Quality Boosters:** The `PromptGenerator.ts` should automatically inject professional keywords (hyper-realistic, 8k, etc.) if they improve coherence without making the prompt unnecessarily long.
- **Cleanup Logic:** Always maintain strict cleanup for commas and double-spaces to ensure AI models parse the output correctly.
