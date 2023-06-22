import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function DashboardDefault() {
  const [name, setName] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    console.log("scan",isScanning);
    setIsScanning(true);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScanResult =  (result) => {
    if(result)
    {
        var data = JSON.parse(result)
        setName(result);
        setIsScanning(false);   
        console.log('Name:', name, 'isScanning:', isScanning);
    }
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </form>
      <button onClick={handleScan}>Scan QR Code</button>
      {isScanning && (
        <QrReader
        delay={1000}
        facingMode="environment"
        onError={handleError}
        onResult={handleScanResult}
        style={{ width: '100%' }}
      />
      )}
    </div>
  );
}

export default DashboardDefault;
