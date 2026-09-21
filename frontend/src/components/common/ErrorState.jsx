import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Sensor Telemetry Error',
  message = 'An error occurred while loading maritime surveillance data.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-ocean-danger/10 border border-ocean-danger/30 rounded-xl ${className}`}>
      <div className="w-12 h-12 rounded-full bg-ocean-danger/20 flex items-center justify-center text-red-400 mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-ocean-textPrimary mb-1">{title}</h4>
      <p className="text-xs text-ocean-textSecondary max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" icon={RefreshCw} onClick={onRetry}>
          Retry Ingestion
        </Button>
      )}
    </div>
  );
}
