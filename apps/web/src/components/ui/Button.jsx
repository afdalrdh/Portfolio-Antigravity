import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'text' | 'whatsapp'
  href,
  to,
  onClick,
  showArrow = false,
  icon,
  className = '',
  style = {},
  type = 'button',
  disabled = false,
  target,
  rel,
  ...props
}) {
  let variantClass = 'btn-primary';
  if (variant === 'secondary') variantClass = 'btn-secondary';
  if (variant === 'dark') variantClass = 'btn-dark';
  if (variant === 'outline-light') variantClass = 'btn-outline-light';
  if (variant === 'text') variantClass = 'btn-text';
  if (variant === 'whatsapp') variantClass = 'btn-whatsapp';

  const content = (
    <>
      {variant === 'whatsapp' && !icon && <FaWhatsapp style={{ fontSize: '1.1rem' }} />}
      {icon && icon}
      <span>{children}</span>
      {showArrow && <FiArrowRight style={{ fontSize: '1rem', transition: 'transform 0.2s ease' }} className="btn-arrow" />}
    </>
  );

  const combinedClassName = `btn-base ${variantClass} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName} style={style} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName} style={style} target={target} rel={rel} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName} style={style} {...props}>
      {content}
    </button>
  );
}
