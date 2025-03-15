import json
import random

from flask import Flask, jsonify, render_template, request, send_from_directory

app = Flask(__name__)

def load_words():
    with open("words.json", "r") as f:
        return json.load(f)

game_data = load_words()

def generate_grid():
    letters = list(game_data["letters"]) 
    size = 9  # 9x9 grid
    return [letters[i * size:(i + 1) * size] for i in range(size)]

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route("/")
def index():
    grid = generate_grid()
    return render_template("index.html", grid=grid)

@app.route("/check", methods=["POST"])
def check_word():
    word = request.json.get("word", "").upper()
    if word in game_data["valid_words"]:
        return jsonify({"valid": True})
    return jsonify({"valid": False})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
