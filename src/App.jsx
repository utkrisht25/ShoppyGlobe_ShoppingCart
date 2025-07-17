import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';

// Lazy load components
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-r from-red-100 via-yellow-100 to-green-100">
          <Header />
          <Suspense
            fallback={
              <div className="container py-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }
            // this is the loader spinner for the lazy loaded components
          >
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
