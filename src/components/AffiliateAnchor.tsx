import type { AnchorHTMLAttributes } from 'react';

type AffiliateAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const RAKUTEN_HOSTS = [
  'hb.afl.rakuten.co.jp',
  'affiliate.rakuten.co.jp',
  'item.rakuten.co.jp',
  'www.rakuten.co.jp',
];

export default function AffiliateAnchor({ href = '', rel, target, ...props }: AffiliateAnchorProps) {
  const isRakuten = RAKUTEN_HOSTS.some((host) => href.includes(host));

  return (
    <a
      {...props}
      href={href}
      rel={isRakuten ? 'sponsored nofollow noopener' : rel}
      target={isRakuten ? '_blank' : target}
    />
  );
}
