from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
import cv2
import io
import base64
import sys
import torch
from saliency import generate_maps, setup_model
from typing import Literal

from mail import run

import os

from util import image_analysis

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
CORS(app)

@app.route('/feedback', methods=['POST'])
def feedback():
    image = request.form.get('image', None)
    if not image:
        return jsonify({'error': 'image null'})

    response = image_analysis(image, 'feedback')
    print(response, file=sys.stdout)
    return jsonify({'data': response})

@app.route('/description', methods=['POST'])
def description():
    image = request.form.get('image', None)
    if not image:
        return jsonify({'error': 'image null'})

    response = image_analysis(image, 'description')
    print(response, file=sys.stdout)
    return jsonify({'data': response})

@app.route('/tags', methods=['POST'])
def tags():
    image = request.form.get('image', None)
    if not image:
        return jsonify({'error': 'image null'})

    response = image_analysis(image, 'tags')
    print(response, file=sys.stdout)
    return jsonify({'data': response})

@app.route('/email', methods=['POST'])
def email():
    image = request.form.get('image', None)
    to = request.form.get('to', None)
    if not image:
        return jsonify({'error': 'image null'})

    run(image, to)

    return jsonify({'data': 'OK'})

@app.route('/heatmap', methods=['POST'])
def saliency():
    image = request.form.get('image', None)
    condition: Literal[1, 2, 3, 4] = int(request.form.get('condition', 1))  # type: ignore
    # condition = int(condition) if condition else 1
    print(image, file=sys.stdout)
    print(condition, file=sys.stdout)
    
    if not image:
        return jsonify({'error': 'image null'})

    # Decode image string from base64
    decoded_bytes = base64.b64decode(image.lstrip('data:image/png;base64'))
    # img = Image.open(io.BytesIO(decoded_bytes)).convert('RGB')
    
    img = Image.open(io.BytesIO(decoded_bytes)).convert('RGB')

    # === Debug ===
    # img.save('images/response_1234.jpg')
    # === Debug ===

    # TODO: Comment back in
    _heatmap_img, overlay_img = generate_maps(img, condition, model, device)
    # overlay_img = cv2.imread('images/response_1234.jpg') # TODO: Remove

    # Encode image to base64 JPEG
    _, buffer = cv2.imencode('.jpg', overlay_img)
    buffer_bytes = buffer.tobytes()
    encoded_image = base64.b64encode(buffer_bytes).decode('utf-8')
    data_url = f'data:image/jpeg;base64,{encoded_image}'

    print(data_url, file=sys.stdout)
    # import pathlib
    # with open(pathlib.Path(__file__).parent / 'test.jpg', 'wb') as f:
    #     f.write(buffer_bytes) # TODO: WTF A

    return jsonify({'image': data_url})

@app.route('/test', methods=['POST'])
def test():
    return jsonify({'data': 'ok'})

if __name__ == '__main__':
    # app.run(debug=True, ssl_context=context
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = setup_model(device)

    context = ('server.crt', 'server.key') #certificate and key files
    app.run('localhost', 5436, ssl_context=context)


# Method 2: https://kracekumar.com/post/54437887454/ssl-for-flask-local-development/
# This is needed to run the app (creating server.crt/key)
