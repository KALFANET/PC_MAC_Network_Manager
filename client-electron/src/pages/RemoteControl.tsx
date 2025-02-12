import React from 'react';

const RemoteControl: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2>Remote Control</h2>
      <button className="bg-green-500 text-white p-2 rounded">Start Remote Control</button>
    </div>
  );
};

export default RemoteControl;