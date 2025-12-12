import React from 'react';
import { rollbar } from '../../rollbar.js';

const DebugRollbar = () => {
  const token = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN || '';
  if (!token) return null;

  const handleSend = () => {
    try {
      rollbar.error('Test error from DebugRollbar');
      // eslint-disable-next-line no-console
      console.info('Rollbar test sent (if token valid)');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Rollbar test failed', e);
    }
  };

  return (
    <div className="m-2">
      <button type="button" className="btn btn-outline-secondary" onClick={handleSend}>
        Send Rollbar test
      </button>
    </div>
  );
};

export default DebugRollbar;
