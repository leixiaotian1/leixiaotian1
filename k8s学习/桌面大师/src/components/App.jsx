import React, { useState, useEffect } from 'react';
import SystemInfo from './SystemInfo';

const App = () => {
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-system-info')
      .then(info => setSystemInfo(info))
      .catch(err => console.error('Failed to get system info:', err));
  }, []);

  return (
    <div className="app-container">
      <h1>桌面大师 - 系统信息</h1>
      {systemInfo ? (
        <SystemInfo data={systemInfo} />
      ) : (
        <p>正在加载系统信息...</p>
      )}
    </div>
  );
};

export default App;
