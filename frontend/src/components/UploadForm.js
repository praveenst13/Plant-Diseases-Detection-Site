import React, { useState } from 'react';

// Detailed recommendations for each disease and plant with tips and treatment ideas
const recommendations = {
  'apple': {
    'Apple Scab': {
      description: 'Apple Scab is a fungal disease causing dark, sunken lesions on leaves and fruit.',
      treatment: 'Remove infected leaves and fruits. Use fungicides like captan or chlorothalonil. Ensure good air circulation around plants to reduce humidity.',
      tips: [
        'Prune trees to improve airflow.',
        'Avoid overhead watering.',
        'Use resistant apple varieties if possible.'
      ]
    },
    'Apple Black Rot': {
      description: 'Apple Black Rot causes dark lesions on fruits and leaves.',
      treatment: 'Remove infected fruits and leaves. Apply fungicides such as myclobutanil or propiconazole. Maintain good orchard sanitation.',
      tips: [
        'Clean up fallen leaves and fruit.',
        'Ensure proper spacing between trees.',
        'Monitor and treat early to prevent spread.'
      ]
    },
    'Apple Cedar Rust': {
      description: 'Apple Cedar Rust causes orange, gelatinous galls on leaves and twigs.',
      treatment: 'Use rust-resistant apple varieties. Apply fungicides like azoxystrobin or triadimefon. Remove nearby cedar trees if possible.',
      tips: [
        'Regularly inspect plants for early signs.',
        'Maintain good plant hygiene and sanitation.',
        'Apply fungicides at the correct timing for best results.'
      ]
    },
    'Apple Healthy': {
      description: 'The plant is healthy. Continue regular care to maintain its well-being.',
      treatment: 'Continue with your regular care routine, including proper watering, fertilization, and pest monitoring.',
      tips: [
        'Regularly check for pests and diseases.',
        'Follow a balanced fertilization program.',
        'Ensure adequate watering without over-watering.'
      ]
    }
  },
  'grapes': {
    'Grape Black Rot': {
      description: 'Grape Black Rot results in dark, sunken lesions on berries and leaves.',
      treatment: 'Remove affected berries and leaves. Apply fungicides like sulfur or copper-based products. Practice good vineyard hygiene.',
      tips: [
        'Regularly inspect vines for symptoms.',
        'Use drip irrigation to avoid wetting foliage.',
        'Practice crop rotation and clean up fallen plant debris.'
      ]
    },
    'Grape Healthy': {
      description: 'The plant is healthy. Maintain good vineyard practices.',
      treatment: 'Continue with regular vineyard management practices including pest monitoring and proper irrigation.',
      tips: [
        'Monitor for pests and diseases regularly.',
        'Maintain proper soil fertility.',
        'Ensure vines have adequate support and space.'
      ]
    },
    'Grape Esca': {
      description: 'Grape Esca causes vine decline and symptoms like leaf necrosis.',
      treatment: 'Prune affected vines and avoid excessive watering. Use fungicides if necessary. Consider using resistant grape varieties.',
      tips: [
        'Prune dead or diseased wood promptly.',
        'Improve field drainage to prevent waterlogging.',
        'Monitor vines closely for any changes in health.'
      ]
    }
  },
  'rice': {
    'Rice Blast': {
      description: 'Rice Blast causes lesions on leaves, necks, and grains.',
      treatment: 'Use resistant rice varieties. Apply fungicides like tricyclazole. Maintain proper field sanitation and water management.',
      tips: [
        'Avoid excessive nitrogen fertilization.',
        'Rotate crops and maintain field hygiene.',
        'Monitor for symptoms early and treat promptly.'
      ]
    },
    'Rice Brown Spot': {
      description: 'Rice Brown Spot results in brown lesions on leaves.',
      treatment: 'Improve field drainage. Apply fungicides such as carbendazim. Avoid over-fertilizing with nitrogen.',
      tips: [
        'Ensure proper irrigation and field drainage.',
        'Avoid overcrowding plants.',
        'Regularly inspect for signs of disease.'
      ]
    },
    'Rice Healthy': {
      description: 'The plant is healthy. Continue with regular monitoring and care practices.',
      treatment: 'Maintain your regular care practices including pest monitoring and proper irrigation.',
      tips: [
        'Regularly check for pests and diseases.',
        'Follow recommended planting and care practices.',
        'Ensure balanced fertilization and proper field management.'
      ]
    }
  },
  'potato': {
    'Potato Early Blight': {
      description: 'Potato Early Blight causes dark spots on leaves and stems.',
      treatment: 'Apply fungicides like chlorothalonil or mancozeb. Rotate crops to reduce disease pressure. Remove infected plants promptly.',
      tips: [
        'Use resistant potato varieties.',
        'Ensure good plant spacing to reduce humidity.',
        'Regularly monitor plants and apply treatments as needed.'
      ]
    },
    'Potato Late Blight': {
      description: 'Potato Late Blight results in rapid decay of tubers and leaves.',
      treatment: 'Remove infected plants immediately. Apply fungicides like metalaxyl. Use resistant varieties if available.',
      tips: [
        'Avoid planting potatoes in the same field consecutively.',
        'Regularly inspect for symptoms and treat promptly.',
        'Maintain proper field sanitation.'
      ]
    },
    'Potato Healthy': {
      description: 'The plant is healthy. Continue with regular inspection and care.',
      treatment: 'Continue with your usual care practices including pest monitoring and proper irrigation.',
      tips: [
        'Inspect plants regularly for any signs of disease.',
        'Maintain balanced fertilization and irrigation.',
        'Practice good crop rotation and field management.'
      ]
    }
  }
};

const UploadForm = ({ plant }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(previewUrl);
  };

  const handleCancel = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:5000/predict/${plant}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message) {
        setResult({ message: data.message });
      } else {
        setResult({
          class: data.class,
          probability: data.probability.toFixed(4),
          recommendation: recommendations[plant][data.class]
        });
      }
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the image.');
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Upload
        </button>
        {file && (
          <button type="button" onClick={handleCancel} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        )}
      </form>
      {previewUrl && (
        <div className="mt-4">
          <h4 className="text-lg font-bold">Image Preview:</h4>
          <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md" />
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <h4 className="text-lg font-bold">Error:</h4>
          <pre>{error}</pre>
        </div>
      )}
      {result && (
        <div className="mt-4">
          {result.message ? (
            <div className="text-yellow-500">
              <h4 className="text-lg font-bold">Message:</h4>
              <pre>{result.message}</pre>
            </div>
          ) : (
            <div>
              <h4 className="text-lg font-bold">Prediction:</h4>
              <p><strong>Class:</strong> {result.class}</p>
              <p><strong>Probability:</strong> {result.probability}</p>
              {result.recommendation && (
                <div>
                  <h4 className="text-lg font-bold">Recommendations:</h4>
                  <p><strong>Description:</strong> {result.recommendation.description}</p>
                  <p><strong>Treatment:</strong> {result.recommendation.treatment}</p>
                  <ul className="list-disc pl-5">
                    {result.recommendation.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;

