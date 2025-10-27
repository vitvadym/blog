import { generateText } from '../utils/generateText.js';
import ApiError from '../utils/apiError.js';
import { parse } from 'marked';

const generatePostContent = async (req, res, next) => {
  const { title } = req.body;

  try {
    if (!title) {
      return next(new ApiError(400, 'Title is required'));
    }

    const prompt = `Write a detailed blog post based on the following title: "${title}".

                  The blog post should include:
                  - An engaging introduction
                  - 4-6 informative sections with subheadings
                  - A short conclusion that summarizes the key points
                  - Relevant examples or case studies to illustrate concepts
                  - The tone should be friendly and professional
                  - Use markdown formatting for headings, subheadings, bullet points, tables, indentation and links
                  - Add spacing between paragraphs for better readability and flow
                  `;

    const text = await generateText(prompt);

    const html = parse(text);

    return res.status(200).json({ message: 'Success', content: html });
  } catch (error) {
    next(error);
  }
};

export { generatePostContent };
