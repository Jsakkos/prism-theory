import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const data = await resend.emails.send({
            from: 'contact@prism-theory.com',
            to: 'jonathansakkos@gmail.com',
            subject: `New contact form submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `,
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
