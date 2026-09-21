import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger', 'ghost'
  size = 'md',        // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }[size] || 'text-sm px-4 py-2 gap-2';

  const variantStyles = {
    primary: 'bg-ocean-cyan text-ocean-main font-semibold hover:bg-cyan-300 shadow-glow-cyan focus:ring-2 focus:ring-ocean-cyan/50',
    secondary: 'bg-ocean-card hover:bg-ocean-cardHover text-ocean-textPrimary border border-ocean-border hover:border-ocean-cyan/50',
    outline: 'border border-ocean-cyan text-ocean-cyan hover:bg-ocean-cyan/10 focus:ring-2 focus:ring-ocean-cyan/30',
    danger: 'bg-ocean-danger/20 text-red-400 border border-ocean-danger/40 hover:bg-ocean-danger/30 hover:border-ocean-danger',
    ghost: 'text-ocean-textSecondary hover:text-ocean-textPrimary hover:bg-ocean-cardHover',
  }[variant] || '';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
