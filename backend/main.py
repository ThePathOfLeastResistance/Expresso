from flask import Flask, jsonify, request
from flask_cors import CORS

from util import image_analysis

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    response = image_analysis(data)
    return jsonify({'data': response})

if __name__ == '__main__':
    app.run('localhost', 5436)
