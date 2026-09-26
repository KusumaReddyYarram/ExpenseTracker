import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 mb-4 flex items-start justify-between">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-rose-900">Action Required</h4>
          <p className="text-xs text-rose-700 mt-0.5">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-xs font-semibold text-rose-700 hover:text-rose-900 ml-4"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
