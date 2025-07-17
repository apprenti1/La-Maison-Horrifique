import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    console.log('🌐 Mode production - pas de mocks')
    return;
  }

  console.log('🔧 Initialisation des mocks...')
  
  try {
    const { worker } = await import("./mocks/browser");
    
    await worker.start({
      onUnhandledRequest: 'warn',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    
    console.log('✅ MSW Worker démarré avec succès')
    
    // Test de l'API
    console.log('🧪 Test de l\'API...')
    fetch('/api/escape-games')
      .then(response => {
        console.log('📡 Réponse API test:', response.status, response.statusText)
        return response.json()
      })
      .then(data => {
        console.log('📊 Données test reçues:', data.length, 'escape games')
      })
      .catch(error => {
        console.error('❌ Erreur test API:', error)
      })
      
  } catch (error) {
    console.error('❌ Erreur lors du démarrage de MSW:', error)
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </StrictMode>
  );
})