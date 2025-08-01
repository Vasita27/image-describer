import { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
  if (!image) return;
  setLoading(true);

  const formData = new FormData();
  formData.append("image", image);

  try {
    // ✅ Call Flask backend
    const res = await fetch("http://localhost:5000/describe", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to get description");
    }

    const data = await res.json();
    setDescription(data.description); // ✅ backend sends { description: "..." }
  } catch (error) {
    console.error(error);
    setDescription("❌ Error analyzing image.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.icon}>🖼️</span>
            Image Analyzer
          </h1>
          <p style={styles.subtitle}>Upload an image to get AI-powered analysis</p>
        </div>

        <div style={styles.uploadSection}>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={styles.hiddenInput}
            id="imageInput"
          />
          <label htmlFor="imageInput" style={styles.uploadButton}>
            <span style={styles.uploadIcon}>📁</span>
            Choose Image
          </label>
        </div>

        {preview && (
          <div style={styles.previewContainer}>
            <img 
              src={preview} 
              alt="Preview" 
              style={styles.previewImage}
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !image}
          style={{
            ...styles.analyzeButton,
            ...(loading || !image ? styles.buttonDisabled : {})
          }}
        >
          {loading ? (
            <>
              <div style={styles.spinner}></div>
              Analyzing...
            </>
          ) : (
            <>
              <span style={styles.buttonIcon}>🔍</span>
              Analyze Image
            </>
          )}
        </button>

        {description && (
          <div style={styles.resultContainer}>
            <h3 style={styles.resultTitle}>Analysis Result</h3>
            <p style={styles.resultText}>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center'
  },
  
  header: {
    marginBottom: '30px'
  },
  
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    margin: '0 0 10px 0',
    marginRight: '30px',
    padding: '10px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  },
  
  icon: {
    fontSize: '2rem',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  },
  
  subtitle: {
    color: '#666',
    fontSize: '1rem',
    marginLeft: '10px',
    margin: 0,
    fontWeight: '400'
  },
  
  uploadSection: {
    marginBottom: '25px'
  },
  
  hiddenInput: {
    display: 'none'
  },
  
  uploadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)'
  },
  
  uploadIcon: {
    fontSize: '1.2rem'
  },
  
  previewContainer: {
    margin: '25px 0',
    position: 'relative'
  },
  
  previewImage: {
    width: '100%',
    maxWidth: '300px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    border: '3px solid rgba(255, 255, 255, 0.8)'
  },
  
  analyzeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
    marginBottom: '25px'
  },
  
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  
  buttonIcon: {
    fontSize: '1.2rem'
  },
  
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid transparent',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  
  resultContainer: {
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    borderRadius: '16px',
    padding: '25px',
    marginTop: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  
  resultTitle: {
    margin: '0 0 15px 0',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#444'
  },
  
  resultText: {
    margin: 0,
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555',
    textAlign: 'left'
  }
};

// Add keyframe animation for spinner
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 600px) {
    .container {
      padding: 15px;
    }
  }
  
  @media (hover: hover) {
    label:hover,
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    }
  }
`;
document.head.appendChild(styleSheet);