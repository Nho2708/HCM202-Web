# Implementation Plan - Enhancing QA Section and UI/UX

## Objective
To provide a more "premium" and "wow" experience for the Tư tưởng Hồ Chí Minh web application, specifically focusing on the AI Chat feature (QASection) and overall polish.

## Improvements

### 1. QASection (AI Chatbot)
- **Visual Overhaul**: Use a glassmorphism design for the chat container.
- **Suggested Questions**: Add quick-action chips for common questions (e.g., "What is Ho Chi Minh Thought?", "Ethics in HCM Thought?", etc.).
- **Message Animations**: Smooth entry animations for new messages.
- **Better Loading State**: A tailored typing indicator.
- **Improved AI Prompting**: Refine the prompt sent to Gemini with explicit instructions on tone and content.
- **Code Refinement**: Clean up the model-switching logic and use the SDK if possible, or a cleaner fetch utility.

### 2. General UI Polish
- **Smooth Scrolling**: Ensure all internal links have smooth scrolling.
- **Typography**: Check if fonts are correctly applied across all components.
- **Empty States/Fallbacks**: Better handling of missing images or API errors.

### 3. Interactive Elements
- **Game Feedback**: Ensure the game feedback ('correct' / 'wrong') feels punchy.

## Tasks

### Phase 1: QASection Polish
1.  Add `suggestedQuestions` array to `QASection.jsx`.
2.  Update the UI to include these suggestions as clickable chips.
3.  Rewrite the `handleSend` to support both typed and clicked questions.
4.  Apply premium CSS styles (glassmorphism, better shadows).

### Phase 2: AI Prompt Engineering
1.  Define a `SYSTEM_INSTRUCTION` for the AI.
2.  Ensure responses are structured and respectful.

### Phase 3: Final Touches
1.  Check responsiveness.
2.  Verify `npm run dev` works without issues.
