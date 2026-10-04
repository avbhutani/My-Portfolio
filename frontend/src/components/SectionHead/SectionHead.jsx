/**
 * Consistent section header: small uppercase eyebrow, title, optional subtitle.
 * Uses global utility classes so every section lines up typographically.
 */
export default function SectionHead({ eyebrow, title, subtitle, id, center = false }) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <div className={`sectionHead ${center ? 'sectionHead--center' : ''}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="sectionTitle" id={headingId} data-section-focus>
        {title}
      </h2>
      {subtitle && <p className="sectionSubtitle">{subtitle}</p>}
    </div>
  );
}