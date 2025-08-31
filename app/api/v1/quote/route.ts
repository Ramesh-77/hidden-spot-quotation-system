import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Resend } from "resend";
import { z } from "zod";

// resend api key
const resend = new Resend(process.env.RESEND_API_KEY)


const bodySchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Valid email required")
});

type Body = z.infer<typeof bodySchema> //this will tell to typescript of bodyschema type
export async function POST(req: NextRequest) {
    try {
        const body: Body = await req.json();

        const result = bodySchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues },
                { status: 400 }
            );
        }

        const { fullName, email } = result.data;

        //   generate pdf
        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage([600, 400])
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const fontSize = 14;
        const text = `New Quote Request\n\nFull Name: ${fullName}\nEmail: ${email}`;
        ;
        page.drawText(text, {
            x: 50,
            y: 350,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
            maxWidth: 500,
            lineHeight: 20,
        });
        const pdfBytes = await pdfDoc.save()
        const pdfBase64 = Buffer.from(pdfBytes).toString("base64")

        // send email to service provider i.e., company/restaurant with pdf attached
        await resend.emails.send({
            from: "Quote System <noreply@pathak1.online>",
            to: "contact@pathak1.online",
            subject: "New Quote Request",
            html: `<p>You have received a new quote request from <strong>${fullName}</strong> (${email}).</p>`,
            attachments: [
                {
                    filename: "quote.pdf",
                    content: pdfBase64,
                    contentType: "application/pdf"
                },
            ],
        })

        // send acknowledgment email to client
        await resend.emails.send({
            from: "Quote System <noreply@pathak1.online>",
            to: email,
            subject: "We Received Your Quote Request",
            html: `<p>Hi ${fullName},<br/>Thanks for reaching out! We've received your request and will get back to you soon.</p>`,
        });
        return NextResponse.json({
            message: "Form submitted successfully",
            data: { fullName, email },
        });
    } catch (error) {
        console.error("Error in POST /api/quote", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}



