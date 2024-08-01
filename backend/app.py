from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load models for each plant
models = {
    'apple': tf.keras.models.load_model('apple_disease.h5'),
    'grapes': tf.keras.models.load_model('grapes_disease.h5'),
    'rice': tf.keras.models.load_model('rice_disease.h5'),
    'potato': tf.keras.models.load_model('potato_disease.h5')
}

# Class names for each plant
class_names = {
    'apple': [
        'Apple Scab',
        'Apple Black Rot',
        'Apple Cedar Rust',
        'Apple Healthy'
    ],
    'grapes': [
        'Grape Black Rot',
        'Grape Healthy',
        'Grape Esca'
    ],
    'rice': [
        'Rice Blast',
        'Rice Brown Spot',
        'Rice Healthy'
    ],
    'potato': [
        'Potato Early Blight',
        'Potato Late Blight',
        'Potato Healthy'
    ]
}

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img /= 255.0
    return img

@app.route('/predict/<plant>', methods=['POST'])
def predict(plant):
    if plant not in models:
        return jsonify({'error': 'Model not found'}), 400

    try:
        file = request.files['file']
        file_path = os.path.join('./uploads', file.filename)
        file.save(file_path)

        img = preprocess_image(file_path)
        model = models[plant]
        prediction = model.predict(img)[0]

        # Define a threshold for confidence level
        threshold = 0.5  # Adjust as needed
        predicted_class_index = np.argmax(prediction)
        predicted_class_name = class_names[plant][predicted_class_index]
        predicted_probability = prediction[predicted_class_index]

        # Check if the highest confidence is below the threshold
        if predicted_probability < threshold:
            return jsonify({'message': 'Confidence level is low. This may be a new or unknown disease.'})

        return jsonify({
            'class': predicted_class_name,
            'probability': float(predicted_probability)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('./uploads'):
        os.makedirs('./uploads')
    app.run(debug=True)

