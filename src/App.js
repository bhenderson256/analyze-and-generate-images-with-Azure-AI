import React, {useRef} from 'react';
import { imageAnalysis } from './azure-image-analysis.js';
import { imageGeneration } from './azure-image-generation.js';

function App() {
  const nameForm = useRef(null);

  if  (!imageAnalysis.isConfigured() || !imageGeneration.isConfigured()) {
    return (
      <div>
        Key and/or endpoint not configured for cognitive services
      </div>
    )
  } else  {
    return (
      <div>
        <h1>Computer Vision</h1>
        <UrlForm />
        <div>
          <img id='image' src="" alt="" />
        </div>
        <div>
          <p id='results'></p>
        </div>
      </div>
    );
  }
  // create an input textbox that gets a url value from the user
  function UrlInputBox() {
    return <input type="url" name="url"/>;
  }

  // create a react form that uses the UrlInputBox component to get a url from the user
  function UrlForm() {
    return (
      <form ref={nameForm}>
        Insert URL or type prompt:
        <br/><UrlInputBox />
        <br/><button type="submit" onClick={handleAnalyze}>Analyze</button>
        <button type="submit" onClick={handleGenerate}>Generate</button>
      </form>
    );
  }

  function handleGenerate(event) {
    event.preventDefault();
    // Handle generate logic here
    const form = nameForm.current;
    console.log(form.elements.url.value);
    imageGeneration.generateImage(form.elements.url.value).then(results => {
      document.getElementById('results').innerHTML = JSON.stringify(results);
      if (results.output) {
        document.getElementById('image').src = results.output[0].image;
      } else {
        document.getElementById('image').src = '';
      }
    });
  }

  function handleAnalyze(event) {
    event.preventDefault();
    // Handle analyze logic here
    const form = nameForm.current;
    imageAnalysis.analyzeImage(form.elements.url.value).then(results => {
      document.getElementById('results').innerHTML = JSON.stringify(results);
      document.getElementById('image').src = form.elements.url.value;
    });
  }
}



export default App;
