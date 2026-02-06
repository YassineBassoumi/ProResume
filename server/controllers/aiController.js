import OpenAI from 'openai';

// Initialize NVIDIA AI client
const getAIClient = () => {
    const apiKey = process.env.NVIDIA_API_KEY;
    
    if (!apiKey) {
        throw new Error('NVIDIA API key is not configured. Please set NVIDIA_API_KEY in your .env file.');
    }
    
    return new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://integrate.api.nvidia.com/v1',
    });
};

// Generate professional summary
export const generateSummary = async (req, res) => {
    try {
        console.log('Generate Summary Request:', req.body);
        const { jobTitle, experience, skills, industry } = req.body;

        if (!jobTitle) {
            return res.status(400).json({
                success: false,
                message: 'Job title is required'
            });
        }

        console.log('Initializing AI client...');
        const openai = getAIClient();
        console.log('AI client initialized successfully');

        const prompt = `Write a professional resume summary for a ${jobTitle}${experience ? ` with ${experience} years of experience` : ''}${industry ? ` in the ${industry} industry` : ''}${skills ? `. Key skills include: ${skills}` : ''}. 

The summary should be:
- 3-4 sentences long
- Professional and impactful
- Highlight key achievements and value proposition
- Use action words and quantifiable results where appropriate
- Written in first person without using "I"

Return only the summary text, no additional formatting or explanations.`;

        console.log('Sending prompt to AI...');
        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
            stream: false
        });

        const summary = completion.choices[0].message.content.trim();
        console.log('Summary generated successfully:', summary.substring(0, 50) + '...');

        res.json({
            success: true,
            data: summary
        });
    } catch (error) {
        console.error('AI Summary Generation Error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        
        if (error.message?.includes('API key')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid API key. Please check your configuration.',
                error: 'invalid_api_key'
            });
        }
        
        if (error.message?.includes('quota')) {
            return res.status(429).json({
                success: false,
                message: 'API quota exceeded. Please try again later.',
                error: 'quota_exceeded'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to generate summary',
            error: error.message
        });
    }
};

// Improve job description
export const improveDescription = async (req, res) => {
    try {
        const { description, jobTitle, company } = req.body;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }

        const openai = getAIClient();

        const prompt = `Improve this job description for a ${jobTitle || 'professional'}${company ? ` at ${company}` : ''}:

"${description}"

Make it more professional and impactful by:
- Using strong action verbs
- Adding quantifiable achievements where possible
- Making it concise and clear
- Highlighting key responsibilities and accomplishments
- Using bullet points format

Return the improved description as HTML bullet points using <ul> and <li> tags. Keep it to 3-5 bullet points.`;

        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
            stream: false
        });

        const improvedDescription = completion.choices[0].message.content.trim();

        res.json({
            success: true,
            data: improvedDescription
        });
    } catch (error) {
        console.error('AI Description Improvement Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to improve description',
            error: error.message
        });
    }
};

// Generate bullet points from text
export const generateBulletPoints = async (req, res) => {
    try {
        const { text, context } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required'
            });
        }

        const openai = getAIClient();

        const prompt = `Convert this text into professional resume bullet points${context ? ` for a ${context}` : ''}:

"${text}"

Requirements:
- Create 3-5 concise bullet points
- Start each with a strong action verb
- Include quantifiable results where possible
- Make them achievement-focused
- Keep each bullet point to 1-2 lines

Return as HTML using <ul> and <li> tags.`;

        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
            stream: false
        });

        const bulletPoints = completion.choices[0].message.content.trim();

        res.json({
            success: true,
            data: bulletPoints
        });
    } catch (error) {
        console.error('AI Bullet Points Generation Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate bullet points',
            error: error.message
        });
    }
};

// Suggest skills based on job title
export const suggestSkills = async (req, res) => {
    try {
        const { jobTitle, industry } = req.body;

        if (!jobTitle) {
            return res.status(400).json({
                success: false,
                message: 'Job title is required'
            });
        }

        const openai = getAIClient();

        const prompt = `List 10-15 relevant skills for a ${jobTitle}${industry ? ` in the ${industry} industry` : ''}.

Include a mix of:
- Technical skills
- Soft skills
- Industry-specific tools/technologies

Return as a simple comma-separated list of skills only, no explanations or categories.`;

        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 512,
            stream: false
        });

        const skillsText = completion.choices[0].message.content.trim();
        const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);

        res.json({
            success: true,
            data: skills
        });
    } catch (error) {
        console.error('AI Skills Suggestion Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to suggest skills',
            error: error.message
        });
    }
};

// Optimize content for ATS (Applicant Tracking Systems)
export const optimizeForATS = async (req, res) => {
    try {
        const { content, jobDescription } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }

        const openai = getAIClient();

        const prompt = `Optimize this resume content for ATS (Applicant Tracking Systems)${jobDescription ? ` based on this job description: "${jobDescription}"` : ''}:

"${content}"

Make it ATS-friendly by:
- Using standard section headings
- Including relevant keywords
- Avoiding special characters and graphics
- Using clear, simple formatting
- Incorporating industry-standard terminology

Return the optimized content as HTML using appropriate tags (<p>, <ul>, <li>).`;

        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 2048,
            stream: false
        });

        const optimizedContent = completion.choices[0].message.content.trim();

        res.json({
            success: true,
            data: optimizedContent
        });
    } catch (error) {
        console.error('AI ATS Optimization Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to optimize for ATS',
            error: error.message
        });
    }
};

// Tailor resume to job description
export const tailorToJob = async (req, res) => {
    try {
        const { resumeContent, jobDescription } = req.body;

        if (!resumeContent || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: 'Both resume content and job description are required'
            });
        }

        const openai = getAIClient();

        const prompt = `Analyze this resume against the job description and identify missing keywords and skills.

RESUME:
${resumeContent}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed analysis in the following JSON format:
{
  "missingKeywords": ["keyword1", "keyword2", ...],
  "presentKeywords": ["keyword1", "keyword2", ...],
  "suggestions": [
    "Specific suggestion 1",
    "Specific suggestion 2"
  ],
  "matchScore": 75,
  "summary": "Brief summary of the analysis"
}

Focus on:
- Technical skills and tools mentioned in the JD but missing from the resume
- Important keywords and buzzwords from the JD
- Certifications or qualifications mentioned
- Soft skills emphasized in the JD
- Industry-specific terminology

Return ONLY valid JSON, no additional text.`;

        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-8b-instruct",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 2048,
            stream: false
        });

        let analysisText = completion.choices[0].message.content.trim();
        
        // Remove markdown code blocks if present
        analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        
        const analysis = JSON.parse(analysisText);

        res.json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('AI Tailor to Job Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze resume against job description',
            error: error.message
        });
    }
};
