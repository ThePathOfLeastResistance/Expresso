from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
import cv2
import io
import base64
import sys
import torch
from saliency import generate_maps, setup_model
from typing import Literal, Any

import os

from util import image_analysis

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    image = request.form.get('image', None)
    if not image:
        return jsonify({'error': 'image null'})

    response = image_analysis(image)
    print(response, file=sys.stdout)
    return jsonify({'feedback': response})

@app.route('/saliency', methods=['POST'])
def saliency():
    image = request.form.get('image', None)
    condition = request.form.get('condition', None)
    condition: Any = int(condition) if condition else 1

    if not image:
        return jsonify({'error': 'image null'})
    
    # Decode image string from base64
    decoded_bytes = base64.b64decode(image)
    img = Image.open(io.BytesIO(decoded_bytes))
    orig_size = img.size

    output_img = generate_maps(img, orig_size, condition, model, device)
    # Encode image to base64 JPEG
    _, buffer = cv2.imencode('.jpg', output_img)
    encoded_image = base64.b64encode(buffer).decode('utf-8')
    # TODO: Fix this garbage

    print(encoded_image, file=sys.stdout)
    return jsonify({'image': encoded_image})

@app.route('/test', methods=['POST'])
def test():
    return jsonify({'data': 'ok'})

if __name__ == '__main__':
    context = ('server.crt', 'server.key') #certificate and key files
    # app.run(debug=True, ssl_context=context
    app.run('localhost', 5436, ssl_context=context)

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = setup_model(device)

# Method 2: https://kracekumar.com/post/54437887454/ssl-for-flask-local-development/
