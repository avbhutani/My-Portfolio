import { useReveal } from '../../hooks/useReveal';

/**
 * Wraps content in the global `.reveal` animation. Fades and lifts the
 * children into view once, then stops observing.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}