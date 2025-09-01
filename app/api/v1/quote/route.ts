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

        // new start
const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text: string, x: number, y: number, options = {}) => {
      page.drawText(text, { x, y, size: 11, font: regularFont, ...options });
    };

    let y = 800;

    // Header
    page.drawText('CATERING QUOTATION', {
      x: 180,
      y,
      size: 18,
      font,
      color: rgb(0.5, 0, 0.2),
    });
    y -= 40;

    // Company Info
    drawText('Birite Foodservice Distr', 50, y);
    drawText('Catering Services & Event Supplies', 50, y - 15);
    drawText('All your catering needs - in one!', 50, y - 30);
    drawText('3717 Hamann Industrial Pky', 350, y);
    drawText('San Francisco, CA 94104', 350, y - 15);
    drawText('stephaine@cox.net', 350, y - 30);
    drawText('415-767-6596', 350, y - 45);

    y -= 80;

    // Quote Info
    drawText('Date Issued: 4/12/2022', 50, y);
    drawText('Valid Until: 4/26/2022', 50, y - 15);
    drawText('Quote No.: 1274', 350, y);

    y -= 50;

    // Client Info
    drawText('CLIENT DETAILS', 50, y, { font });
    drawText(`Name: ${fullName}`, 50, y - 15);
    drawText('Address: 123 Main St, San Francisco, CA', 50, y - 30);
    drawText('Company: Your Company Inc.', 50, y - 45);
    drawText('Contact Number: 415-000-1234', 50, y - 60);
    drawText(`Email Address: ${email}`, 50, y - 75);

    // Event Info
    drawText('EVENT DETAILS', 350, y, { font });
    drawText('Event Type: Indoor Dining + Poolside', 350, y - 15);
    drawText('Event Date: 5/26/2022', 350, y - 30);
    drawText('Event Time: 6 PM to 11 PM', 350, y - 45);
    drawText('Event Venue: Central Office', 350, y - 60);
    drawText('No. of Attendants: 17', 350, y - 75);
    drawText('Dining Style: Buffet & Table Service', 350, y - 90);

    y -= 130;

    // Notes
    drawText('NOTES:', 50, y, { font });
    const notes = [
      '1. Initial non-refundable deposit (50%) is due upon signing.',
      '2. Remaining balance due after the event.',
      '3. Cancel at least 10 days before the event.',
      '4. Extra services on event day may incur 5% charge.',
      '5. Quote valid only until above date. Subject to change.',
    ];
    notes.forEach((note, i) => {
      drawText(note, 50, y - 20 - i * 15);
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return NextResponse.json({
      message: 'PDF preview generated',
      data: {
        pdfBase64,
        fullName,
        email,
      },
    });

        // new end

        //   generate pdf
        // const pdfDoc = await PDFDocument.create()
        // const page = pdfDoc.addPage([600, 400])
        // const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        // const fontSize = 14;
        // const text = `New Quote Request\n\nFull Name: ${fullName}\nEmail: ${email}`;
        // ;
        // page.drawText(text, {
        //     x: 50,
        //     y: 350,
        //     size: fontSize,
        //     font,
        //     color: rgb(0, 0, 0),
        //     maxWidth: 500,
        //     lineHeight: 20,
        // });
        // const pdfBytes = await pdfDoc.save()
        // const pdfBase64 = Buffer.from(pdfBytes).toString("base64")

        // send email to service provider i.e., company/restaurant with pdf attached
        // await resend.emails.send({
        //     from: "Quote System <noreply@pathak1.online>",
        //     to: "contact@pathak1.online",
        //     subject: "New Quote Request",
        //     html: `<p>You have received a new quote request from <strong>${fullName}</strong> (${email}).</p>`,
        //     attachments: [
        //         {
        //             filename: "quote.pdf",
        //             content: pdfBase64,
        //             contentType: "application/pdf"
        //         },
        //     ],
        // })

        // // send acknowledgment email to client
        // await resend.emails.send({
        //     from: "Quote System <noreply@pathak1.online>",
        //     to: email,
        //     subject: "We Received Your Quote Request",
        //     html: `<p>Hi ${fullName},<br/>Thanks for reaching out! We've received your request and will get back to you soon.</p>`,
        // });
        // return NextResponse.json({
        //     message: "Form submitted successfully",
        //     data: { fullName, email },
        // });
    } catch (error) {
        console.error("Error in POST /api/quote", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}



