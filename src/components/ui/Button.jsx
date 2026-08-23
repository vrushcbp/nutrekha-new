/**
 * Reusable Button Component
 *
 * Variants:
 *  - "primary"   → filled dark green pill button
 *  - "secondary" → outlined pill button
 *
 * Props:
 *  - variant: "primary" | "secondary"
 *  - href: if provided, renders as <a> link; otherwise renders <button>
 *  - icon: optional React node to render before children
 *  - children: button label
 *  - className: additional classes
 *  - ...rest: passed to the underlying element
 */

export default function Button({
  variant = 'primary',
  href,
  icon,
  children,
  className = '',
  id,
  ...rest
}) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const combinedClass = `${baseClass} ${className}`.trim();

  const content = (
    <>
      {icon && icon}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClass} id={id} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClass} id={id} {...rest}>
      {content}
    </button>
  );
}
