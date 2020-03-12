import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ColorPicker from './components/ColorPicker/ColorPicker';


function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <button
            className={`button set-dark ${darkMode ? 'dark' : ''}`}
            type="button"
            onClick={() => {
              darkMode ? setDarkMode(false) : setDarkMode(true);
            }}
          >
            {darkMode ? 'Dark' : 'Light'}
          </button>
      <ColorPicker darkMode={darkMode}/>
    </div>
  );
}

export default App;
