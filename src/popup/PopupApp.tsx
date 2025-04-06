import React, { useState, useEffect } from 'react';

/**
 * Popup component for the extension.
 * Features implemented:
 * - Enable/disable toggle for the rating panel
 * - Clear ratings button
 * - Open options button
 * - Open help button
 */
function PopupApp(): React.JSX.Element {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch the current extension state when the popup opens
  useEffect(() => {
    // Skip API calls during testing
    if (!chrome?.runtime?.sendMessage) {
      return;
    }
    
    const fetchExtensionState = async () => {
      try {
        setIsLoading(true);
        const response = await chrome.runtime.sendMessage({
          type: 'extension',
          subType: 'getState',
          data: { enabled: undefined },
        });
        
        if (response && response.statusCode === 200) {
          setEnabled(response.data);
        }
      } catch (error) {
        console.error('Error fetching extension state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExtensionState();
  }, []);

  // Toggle the extension state (show/hide rating panel)
  const handleToggleExtension = async () => {
    try {
      setIsLoading(true);
      const newState = !enabled;
      
      const response = await chrome.runtime.sendMessage({
        type: 'extension',
        subType: 'setState',
        data: { enabled: newState },
      });
      
      if (response && response.statusCode === 200) {
        setEnabled(newState);
      }
    } catch (error) {
      console.error('Error toggling extension state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all ratings from storage
  const handleClearRatings = async () => {
    try {
      setIsLoading(true);
      
      const response = await chrome.runtime.sendMessage({
        type: 'extension',
        subType: 'clearRatings',
        data: {},
      });
      
      if (response && response.statusCode === 200) {
        console.log('All ratings cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing ratings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open options page
  const handleOpenOptions = () => {
    if (chrome?.runtime?.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  };

  // Open help page
  const handleOpenHelp = () => {
    if (chrome?.tabs?.create) {
      chrome.tabs.create({ url: 'https://github.com/aeberts/site-review-extension' });
    }
  };

  return (
    <div className="popup-container" style={{ padding: '10px', width: '250px' }}>
      <h2>v3 Extension Template</h2>

      {/* Visited Sites List */}
      <div data-testid="visited-sites-list">
        <h2>Visited Sites</h2>
      </div>

      {/* Controls */}
      <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          data-testid="clear-button" 
          onClick={handleClearRatings}
          disabled={isLoading}
        >
          Clear Ratings
        </button>
        
        <button 
          data-testid="toggle-button" 
          onClick={handleToggleExtension}
          disabled={isLoading}
          style={{ 
            backgroundColor: enabled ? '#4CAF50' : '#f44336',
            color: 'white',
            padding: '8px',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Loading...' : enabled ? 'Hide Rating Panel' : 'Show Rating Panel'}
        </button>
        
        <button 
          data-testid="options-button"
          onClick={handleOpenOptions}
        >
          Open Options
        </button>
        
        <button 
          data-testid="help-button"
          onClick={handleOpenHelp}
        >
          Help
        </button>
      </div>
    </div>
  );
}

export default PopupApp;
