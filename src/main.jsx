import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router.jsx'
import AuthProvider from './Contexts/AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import LoadingHydrate from './Loader/LoadingHydrate.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<LoadingHydrate />}>
      <RouterProvider router={router}>

    </RouterProvider>
     <Toaster />
     </Suspense>
      
    </AuthProvider>
  </StrictMode>
)


