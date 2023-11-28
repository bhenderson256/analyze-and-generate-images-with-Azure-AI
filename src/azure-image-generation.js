async function generateImage(prompt) {
    const apiKey = getOpenAIAPIKey(); 
    const model = 'dall-e-3';
    
    // make API call to generate image based on prompt using OpenAI API
    const response = await fetch(`https://api.openai.com/v1/images/generations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        })
    });
    
    const data = await response.json();
    return data;
}

function getOpenAIAPIKey() {
    return process.env.REACT_APP_OPENAI_API_KEY;
}

function isConfigured() {
    return getOpenAIAPIKey();
}

export const imageGeneration = {generateImage, isConfigured}

