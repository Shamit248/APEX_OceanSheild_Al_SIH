import React from 'react';
import { getStatusStyle } from '../../utils/formatters';

export default function Badge({ 
  children, 
  variant, 
  status, 
  className = '', 
  showDot = true,
  size = 'md' 
}) {
  const style = status ? getStatusStyle(status) : null;

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }[size] || 'text-xs px-2.5 py-1';

  let customClasses = '';
  if (style) {
    customClasses = `${style.bg} ${style.text} ${style.border}`;
  } else if (variant === 'cyan') {
    customClasses = 'bg-ocean-cyan/15 text-ocean-cyan border-ocean-cyan/30';
  } else if (variant === 'danger') {
    customClasses = 'bg-ocean-danger/15 text-red-400 border-ocean-danger/30';
  } else if (variant === 'warning') {
    customClasses = 'bg-ocean-warning/15 text-amber-400 border-ocean-warning/30';
  } else if (variant === 'green') {
    customClasses = 'bg-ocean-green/15 text-emerald-400 border-ocean-green/30';
  } else {
    customClasses = 'bg-ocean-card text-ocean-textSecondary border-ocean-border';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-full uppercase tracking-wider font-mono ${sizeClasses} ${customClasses} ${className}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${style?.dot || 'bg-current'}`} />
      )}
      {children || status}
    </span>
  );
}
