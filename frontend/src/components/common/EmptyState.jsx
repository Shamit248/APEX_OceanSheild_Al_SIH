import React from 'react';
import { Compass } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'No records found',
  description = 'There are no items matching the selected criteria in this sector.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-ocean-card/50 border border-ocean-border/60 rounded-xl ${className}`}>
      <div className="w-12 h-12 rounded-full bg-ocean-secondary flex items-center justify-center text-ocean-cyan/60 border border-ocean-border mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-ocean-textPrimary mb-1">{title}</h4>
      <p className="text-xs text-ocean-textSecondary max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
