import { generateQuotePDF } from "@/app/lib/pdfGenerator";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// resend api key
const resend = new Resend(process.env.RESEND_API_KEY)

// shared schemas
const menuItemSelectionSchema = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number(),
  unit: z.string(),
  quantity: z.number().min(1),
});

const baseSchema = z.object({
  serviceType: z.enum(["event", "catering"]),
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  mealType: z.array(z.string()),
  estimatedBudget: z.number().optional(),
  specialRequests: z.string().optional(),
  totalCost: z.number().default(0),
});

// event schema
const eventSchema = baseSchema.extend({
  serviceType: z.literal("event"),
  eventDate: z.string(),
  eventStartTime: z.string(),
  eventEndTime: z.string(),
  eventLocation: z.string(),
  eventType: z.string(),
  numberOfGuests: z.number(),
  eventDuration: z.number(),
  beverageType: z.array(z.string()),
});

// catering schema
const cateringSchema = baseSchema.extend({
  serviceType: z.literal("catering"),
  cateringType: z.string(),
  menuSelection: z.array(menuItemSelectionSchema), // ✅ aligned to MenuItemSelection[]
  dietaryRestriction: z.array(z.string()),
  serviceProvideType: z.enum(["delivery", "onsite", "fullService"]),
  setUpRequirement: z.array(z.string()),
  mealTime: z.string(),
  addOns: z.array(z.string()),
});

// union schema
const fullQuoteSchema = z.discriminatedUnion("serviceType", [
  eventSchema,
  cateringSchema,
]);


type Body = z.infer<typeof fullQuoteSchema> //this will tell to typescript of bodyschema type
export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    const result = fullQuoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues },
        { status: 400 }
      );
    }

    const data: Body = result.data;
    const pdfBytes = await generateQuotePDF(data)
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    // return NextResponse.json({
    //     message: 'PDF preview generated',
    //     data: {
    //         pdfBase64,
    //         data
    //     },
    // });

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
    // --- Send email to service provider ---
    await resend.emails.send({
      from: "Quote System <noreply@yourdomain.com>",
      to: "contact@yourdomain.com", // 📩 your company/restaurant email
      subject: "New Quote Request",
      html: `
        <p>You have received a new quote request.</p>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        <p><strong>Total Cost:</strong> $${data.totalCost.toFixed(2)}</p>
      `,
      attachments: [
        {
          filename: "quote.pdf",
          content: pdfBase64,
          contentType: "application/pdf",
        },
      ],
    });
    // --- Send acknowledgment email to client ---
    await resend.emails.send({
      from: "Quote System <noreply@yourdomain.com>",
      to: data.email,
      subject: "We Received Your Quote Request",
      html: `
        <p>Hi ${data.fullName},</p>
        <p>Thanks for reaching out! We’ve received your request and will get back to you soon.</p>
        <p>Here’s a copy of your quote for your records.</p>
      `,
      attachments: [
        {
          filename: "quote.pdf",
          content: pdfBase64,
          contentType: "application/pdf",
        },
      ],
    });

    // return NextResponse.json({
    //     message: 'PDF preview generated',
    //     data: {
    //         pdfBase64,
    //         data
    //     },
    // });
    return NextResponse.json({
      message: "Form submitted successfully. Emails sent.",
      data,
    });


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



