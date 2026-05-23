interface AuthorProfileProps {
  name: string;
  avatarUrl?: string;
  bio: string;
  expertise?: string[];
}

export default function AuthorProfile({ name, avatarUrl, bio, expertise }: AuthorProfileProps) {
  return (
    <div
      style={{
        marginTop: '48px',
        padding: '28px',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
      }}
    >
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#64748B',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '20px',
        }}
      >
        ✍️ この記事を書いた人
      </h3>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #E8643A, #D05530)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>
              {name.charAt(0)}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '8px',
            }}
          >
            {name}
          </div>
          <p
            style={{
              fontSize: '14px',
              color: '#475569',
              lineHeight: 1.7,
              margin: '0 0 12px 0',
            }}
          >
            {bio}
          </p>
          {expertise && expertise.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {expertise.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: '3px 12px',
                    background: '#EEF2FF',
                    color: '#4338CA',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '9999px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
