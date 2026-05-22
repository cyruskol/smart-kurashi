'use client';

export default function ContactForm() {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1px solid #E2E8F0' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>お問い合わせ</h1>
      <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '32px' }}>取材依頼、広告掲載、コンテンツに関するご質問など、お気軽にご連絡ください。</p>

      <form action="/api/contact" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>お名前 <span style={{ color: '#E8643A' }}>*</span></label>
          <input type="text" id="name" name="name" required placeholder="山田 太郎" style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', background: '#F8FAFC' }} className="focus:border-orange-400 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>メールアドレス <span style={{ color: '#E8643A' }}>*</span></label>
          <input type="email" id="email" name="email" required placeholder="example@email.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', background: '#F8FAFC' }} className="focus:border-orange-400 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="category" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>お問い合わせ種別</label>
          <select id="category" name="category" style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', background: '#F8FAFC' }}>
            <option value="">選択してください</option>
            <option value="取材依頼">取材依頼</option>
            <option value="広告掲載">広告掲載のご相談</option>
            <option value="コンテンツについて">コンテンツについて</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>お問い合わせ内容 <span style={{ color: '#E8643A' }}>*</span></label>
          <textarea id="message" name="message" required rows={6} placeholder="お問い合わせ内容をご記入ください。" style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', background: '#F8FAFC', resize: 'vertical' }} className="focus:border-orange-400 focus:outline-none" />
        </div>
        <button type="submit" style={{ padding: '12px 32px', background: '#E8643A', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }} className="hover:bg-orange-600 transition-colors">
          送信する
        </button>
      </form>
    </div>
  );
}
