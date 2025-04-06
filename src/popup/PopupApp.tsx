import React, { useState } from 'react';

/**
 * Placeholder component for the extension popup.
 * Features to be implemented based on .windsurfrules:
 * - Display visited sites list and counts.
 * - Clear button.
 * - Enable/disable toggle.
 * - Open options button.
 * - Open help button.
 */
function PopupApp(): React.JSX.Element {
  // Placeholder state
  const [enabled, setEnabled] = useState<boolean>(true);

  return (
    <div className="popup-container" style={{ padding: '10px' }}>
      <h2>v3 Extension Template</h2>

      {/* Placeholder for Visited Sites List */}
      <div data-testid="visited-sites-list">
        <h2>Visited Sites</h2>
      </div>

      {/* Placeholder Buttons/Controls */}
      <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button data-testid="clear-button">Clear Visits</button>
        <button data-testid="toggle-button" onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Disable' : 'Enable'} Extension
        </button>
        <button data-testid="options-button">Open Options</button>
        <button data-testid="help-button">Help</button>
      </div>
    </div>
  );
}

export default PopupApp;
