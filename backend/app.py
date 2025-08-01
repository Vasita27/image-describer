from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
import io

app = Flask(__name__)
CORS(app)

print("⏳ Loading BLIP model...")
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
print(f"✅ Model loaded on {device.upper()}")

@app.route("/describe", methods=["POST"])
def describe_image():
    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read())).convert("RGB")

    inputs = processor(image, return_tensors="pt").to(device)
    output = model.generate(**inputs, max_length=100)
    caption = processor.decode(output[0], skip_special_tokens=True)

    return jsonify({"description": caption})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
