import React, { useEffect, useState } from 'react';
import SVGEditor from './views/SVGEditor';

const App = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="dark:bg-slate-800 dark:text-slate-100 p-5">
      <button
        className="flex flex-col border rounded-lg p-5"
        onClick={handleThemeSwitch}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
        {' '}
        Mode
      </button>
      <SVGEditor />
    </div>
  );
}

export default App;
