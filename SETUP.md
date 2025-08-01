## 🔧 Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-image-describer
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install flask flask-cors transformers pillow torch torchvision
   ```

4. **Run the Flask server**
   ```bash
   python app.py
   ```
   
   The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   mkdir frontend
   cd frontend
   ```

2. **Initialize React app**
   ```bash
   npx create-react-app .
   ```

3. **Install additional dependencies**
   ```bash
   npm install axios
   ```

4. **Replace the contents of `src/App.js`** with the provided React component

5. **Start the development server**
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`