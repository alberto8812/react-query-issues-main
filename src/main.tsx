import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';

//! Remover enable css source maps
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";//se conecta al cliente y muestra todso los que vamos a ocuapar 

const client=new QueryClient(); //maneja toda la informacion del chache

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client} >{/*lugar donde puedo tener acceso al cliente  */}
    <ReactQueryDevtools/>

    <RouterProvider router={ router } />
    
    </QueryClientProvider>
  </React.StrictMode>
)
