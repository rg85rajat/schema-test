import React, { useState, useEffect } from 'react';

function ToggleButton() {
  // State to track the toggle status
  const [isToggled, setIsToggled] = useState(false);

  // Function to handle toggle
  const handleToggle = () => {
    const newToggleStatus = !isToggled;
    setIsToggled(newToggleStatus); // Toggle the state
    localStorage.setItem('toggleStatus', JSON.stringify(newToggleStatus));
  };

  useEffect(() => {
    // Fetch the toggle status from local storage
    const savedToggleStatus = JSON.parse(localStorage.getItem('toggleStatus'));
        console.log('')

    if (savedToggleStatus !== null) {
      setIsToggled(savedToggleStatus);
    }
  }, []);

  return (
    <div>
      {/* Display the status */}
      <h2>The Logic is: {isToggled ? 'Enabled' : 'Disabled'}</h2>
      
      {/* Button to toggle */}
      <button 
        onClick={handleToggle} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isToggled ? '#f44336': '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {isToggled ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}

export default ToggleButton;
