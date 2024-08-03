from flask import Flask, jsonify, request
from flask_cors import CORS
import sys

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

@app.route('/test', methods=['POST'])
def test():
    return jsonify({'data': 'ok'})

if __name__ == '__main__':
    context = ('server.crt', 'server.key') #certificate and key files
    # app.run(debug=True, ssl_context=context
    app.run('localhost', 5436, ssl_context=context)

# Method 2: https://kracekumar.com/post/54437887454/ssl-for-flask-local-development/
