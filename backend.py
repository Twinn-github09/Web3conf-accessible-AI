from flask import Flask, request, jsonify, Response, send_file
from flask_cors import CORS
from moviepy.editor import VideoFileClip, concatenate_videoclips
import os
import tempfile

server = Flask(__name__)
CORS(server)

@server.route("/convertToSign", methods=["POST", "GET"])
def convertToSign():
    text = request.json.get("text")

    if not text:
        return jsonify({"error": "No text received"}), 400
    
    text = text.lower().split(" ")
    video_clips = []

    for word in text:
        ISL_PATH = f"static/ISL/{word}"
        if os.path.exists(ISL_PATH):
            video_clips.append(VideoFileClip(os.path.join(ISL_PATH, f"{word}.mp4")).speedx(factor=3))
        else:
            split_word = list(word)
            for char in split_word:
                ALPHA_PATH = f"static/alphabet/{char}_small.gif"
                if os.path.exists(ALPHA_PATH):
                    gif_clip = VideoFileClip(ALPHA_PATH).speedx(factor=0.4)
                    video_clips.append(gif_clip)
                else:
                    return jsonify({"error": f"Sign language data not found for '{char}'"}), 404

    if not video_clips:
        return jsonify({"error": "No sign language data found for the given text"}), 404
    
    final_clip = concatenate_videoclips(video_clips, method="compose")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_video:
        temp_path = temp_video.name
        final_clip.write_videofile(temp_path, codec="libx264", fps=24, audio=False)

    return send_file(temp_path, mimetype="video/mp4", as_attachment=False)

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=5000, debug=True)
