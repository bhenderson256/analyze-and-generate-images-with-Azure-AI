// create a function called 'analyzeImage' that calls the Azure Computer Vision Analyze 4.0 API with the url passed in
async function analyzeImage(url) {
    // call the fetch() function and pass in the url to the Computer Vision Analyze 4.0 API
    const response = await fetch(getAzureCognitiveServicesAPIEndpoint(), {
        // set the method to 'POST'
        method: 'POST',
        // set the headers to include the Cognitive Services subscription key
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': getAzureCognitiveServicesAPIKey()
        },
        body: JSON.stringify({
            'url': url
        })
    });
    console.log('response=' + JSON.stringify(response));
    const data = await response.json();
    console.log('data=' + JSON.stringify(data));
    return data;
}

function getAzureCognitiveServicesAPIKey() {
    return process.env.REACT_APP_AZURE_COGNITIVE_SERVICES_API_KEY;
}

function getAzureCognitiveServicesAPIEndpoint() {
    return process.env.REACT_APP_AZURE_COGNITIVE_SERVICES_API_ENDPOINT;
}

function isConfigured() {
    return getAzureCognitiveServicesAPIKey() && getAzureCognitiveServicesAPIEndpoint();
}

export const imageAnalysis = {analyzeImage, isConfigured}
