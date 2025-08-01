# 🖼️ AI Image Describer

A modern web application that uses AI to analyze and describe images. Built with React frontend and Flask backend, powered by Salesforce's BLIP (Bootstrapping Language-Image Pre-training) model.

## ✨ Features

- **AI-Powered Analysis**: Uses state-of-the-art BLIP model for accurate image captioning
- **Modern UI**: Sleek, responsive design with glassmorphism effects
- **Real-time Processing**: Instant image analysis with loading states
- **Cross-Platform**: Works on desktop and mobile devices
- **GPU Acceleration**: Automatically uses CUDA if available for faster processing

## 🚀 Demo

Upload any image and get an AI-generated description in seconds!

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Modern CSS** - Custom styling with gradients and animations
- **Responsive Design** - Works on all screen sizes

### Backend
- **Flask** - Python web framework
- **Transformers** - Hugging Face transformers library
- **PyTorch** - Deep learning framework
- **BLIP Model** - Salesforce's image captioning model

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **GPU** (optional, for faster processing)

## 📁 Project Structure

```
ai-image-analyzer/
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
└── frontend/
    ├── src/
    │   ├── App.js        # Main React component
    │   └── index.js      # React entry point
    ├── public/
    └── package.json      # Node.js dependencies
```

## 💻 Usage

1. **Start the backend server**
   ```bash
   python app.py
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

4. **Upload an image** using the file picker

5. **Click "Analyze Image"** to get AI-generated description

## ⚙️ Configuration

### GPU Support
The application automatically detects and uses CUDA if available. To force CPU usage, modify the device selection in `app.py`:

```python
device = "cpu"  # Force CPU usage
```

### Model Configuration
You can experiment with different BLIP models by changing the model name:

```python
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
```

## 📦 Dependencies

### Backend (requirements.txt)
```txt
flask==2.3.3
flask-cors==4.0.0
transformers==4.35.0
pillow==10.0.1
torch==2.1.0
torchvision==0.16.0
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "axios": "^1.5.0"
  }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `flask-cors` is installed and CORS is enabled
2. **Model Loading Issues**: Ensure you have sufficient RAM (4GB+ recommended)
3. **Slow Processing**: Install CUDA for GPU acceleration
4. **Port Conflicts**: Change ports in the configuration if 3000 or 5000 are occupied

### Performance Tips

- **Use GPU**: Install CUDA for 3-5x faster processing
- **Optimize Images**: Resize large images before upload for faster processing
- **Cache Models**: Models are cached after first download

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Salesforce** for the BLIP model
- **Hugging Face** for the transformers library
- **React Team** for the amazing frontend framework
- **Flask Team** for the lightweight web framework

---

**Made with ❤️ using AI and modern web technologies**