import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import BookList from './components/bookList';
import BookForm from './components/bookform';
import CategoriesPage from './components/categories/CategoriesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul className="header-ul">
            <li>
              <h1 className="headerName">BookStore</h1>
            </li>
            <li>
              <Link to="/">BOOKS</Link>
            </li>
            <li>
              <Link to="/categories">CATEGORIES</Link>
            </li>
            <li className="img">
              <img src="profile.svg" alt="img" />
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={(
              <div>
                <BookList />
                <BookForm />
              </div>
          )}
          />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
