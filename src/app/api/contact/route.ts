import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const category = formData.get('category') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: '必須項目を入力してください。' },
        { status: 400 }
      );
    }

    // In production, this would send an email or store to database
    // For now, return success
    return NextResponse.json(
      { success: true, message: 'お問い合わせを受け付けました。' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '送信に失敗しました。' },
      { status: 500 }
    );
  }
}
