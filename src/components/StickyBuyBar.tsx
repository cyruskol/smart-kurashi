interface StickyBuyBarProps {
  links: Array<{
    label: string;
    href: string;
    retailer?: string;
  }>;
}

export default function StickyBuyBar({ links }: StickyBuyBarProps) {
  if (!links.length) return null;

  const displayLinks = links.slice(0, 3);

  return (
    <div className="sk-sticky-buybar">
      {displayLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className={link.retailer
            ? `product-button product-button--${link.retailer}`
            : 'product-button'}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}