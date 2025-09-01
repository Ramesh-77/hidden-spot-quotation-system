import path from "path";
import fs from 'fs'
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
export const genRandomNumber = () => Math.floor(Math.random() * 1000000);
export const todayDate = () => new Date().toISOString().split("T")[0];

interface BasePdfData {
    serviceType: "event" | "catering" | "";
    fullName: string;
    email: string;
    phone: string;
    mealType: string[];
    estimatedBudget?: number;
    specialRequests?: string;
}

interface EventPdfData extends BasePdfData {
    serviceType: "event";
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventLocation: string;
    eventType: string;
    numberOfGuests: number;
    eventDuration: number;
    beverageType: string[];
    // catering-specific fields NOT present here
    cateringType?: never;
    menuSelection?: never;
    dietaryRestriction?: never;
    serviceProvideType?: never;
    setUpRequirement?: never;
    mealTime?: never;
    addOns?: never;
}

interface CateringPdfData extends BasePdfData {
    serviceType: "catering";
    cateringType: string;
    menuSelection: string[];
    dietaryRestriction: string[];
    serviceProvideType: "delivery" | "onsite" | "fullService" | "";
    setUpRequirement: string[];
    mealTime: string;
    addOns: string[];
    // event-specific fields NOT present here
    eventDate?: never;
    eventStartTime?: never;
    eventEndTime?: never;
    eventLocation?: never;
    eventType?: never;
    numberOfGuests?: never;
    eventDuration?: never;
    beverageType?: never;
}

export type PdfData = EventPdfData | CateringPdfData;
export async function generateQuotePDF(data: PdfData) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // --- NEW: Load and embed logo image ---
    // Use path from root/public folder
    const logoPath = path.join(process.cwd(), "public", "hslogo.png");
    const logoImageBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const logoDims = logoImage.scale(0.1); // scale down logo (adjust as needed)

    // Draw the logo
    page.drawImage(logoImage, {
        x: 50,      // adjust X position
        y: height - 60, // adjust Y position
        width: logoDims.width,
        height: logoDims.height,
    });

    // Adjust starting y coordinate so text starts below logo
    let y = height - logoDims.height - 30;
    const leftX = 50;
    const rightX = 350;


    // const drawLine = (
    //     text: string,
    //     x: number,
    //     size = 11,
    //     offset = 15,
    //     font = fontRegular,
    //     color = rgb(0, 0, 0)
    // ) => {
    //     page.drawText(text, { x, y, size, font, color });
    //     y -= offset;
    // };


    // --- NEW: Draw Quote Info at top right BEFORE other content ---
    const quoteX = 450; // right aligned near top-right margin
    let quoteY = height - 20;
    page.drawText(`Date Issued: ${todayDate()}`, { x: quoteX, y: quoteY, size: 11, font: fontRegular });
    quoteY -= 15;
    page.drawText(`Quote No.: ${genRandomNumber()}`, { x: quoteX, y: quoteY, size: 11, font: fontRegular });


    // Header
    page.drawText("CATERING QUOTATION", {
        x: width / 2 - 90,
        y: y,
        size: 18,
        font: fontBold,
        color: rgb(0.5, 0, 0.2),
    });
    y -= 40;
    // Company Info
    page.drawText("Hidden Spot", { x: leftX, y, size: 12, font: fontBold });
    page.drawText("Catering Services & Event Supplies", { x: leftX, y: y - 15, size: 10, font: fontRegular });
    page.drawText("All your catering needs - in one!", { x: leftX, y: y - 30, size: 10, font: fontRegular });

    page.drawText("73 Anderson Rd,", { x: rightX, y, size: 12, font: fontRegular });
    page.drawText("Smeaton Grange NSW 2567", { x: rightX, y: y - 15, size: 10, font: fontRegular });
    page.drawText("hiddenspot@outlook.com", { x: rightX, y: y - 30, size: 10, font: fontRegular });
    page.drawText("415-767-6596", { x: rightX, y: y - 45, size: 10, font: fontRegular });

    y -= 80;


    // CLIENT DETAILS & SERVICE DETAILS side by side, independent vertical offset
    let clientY = y;
    let serviceY = y;

    // Client Details
    page.drawText("CLIENT DETAILS", { x: 50, y: clientY, size: 14, font: fontBold });
    clientY -= 20;
    page.drawText(`Name: ${data.fullName}`, { x: 50, y: clientY, size: 11, font: fontRegular });
    clientY -= 15;
    page.drawText(`Contact Number: ${data.phone}`, { x: 50, y: clientY, size: 11, font: fontRegular });
    clientY -= 15;
    page.drawText(`Email Address: ${data.email}`, { x: 50, y: clientY, size: 11, font: fontRegular });

    // Service Details
    page.drawText("SERVICE DETAILS", { x: 350, y: serviceY, size: 14, font: fontBold });
    serviceY -= 20;


    if (data.serviceType === "event") {
        page.drawText(`Service Type: EVENT`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Event Type: ${data.eventType}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Event Date: ${data.eventDate}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Event Time: ${data.eventStartTime} - ${data.eventEndTime}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Event Venue: ${data.eventLocation}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Guests: ${data.numberOfGuests}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Duration: ${data.eventDuration} hours`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Beverages: ${data.beverageType.join(", ") || "None"}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
    } else if (data.serviceType === "catering") {
        page.drawText(`Service Type: CATERING`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Catering Type: ${data.cateringType}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Meal Time: ${data.mealTime}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Menu Selection: ${data.menuSelection.join(", ") || "None"}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Dietary Restrictions: ${data.dietaryRestriction.join(", ") || "None"}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Service Provided: ${data.serviceProvideType}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Setup Requirements: ${data.setUpRequirement.join(", ") || "None"}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Add-ons: ${data.addOns.join(", ") || "None"}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
    } else {
        page.drawText(`Service Type: Not specified`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
    }
    // Next section Y should be minimum of clientY and serviceY minus some space
    y = Math.min(clientY, serviceY) - 40;

    // Meal Preferences (common)
    page.drawText("MEAL PREFERENCES", { x: 50, y: y, size: 14, font: fontBold });
    y -= 20;
    page.drawText(`Meal Type: ${data.mealType.join(", ") || "None"}`, { x: 50, y: y, size: 11, font: fontRegular });

    y -= 30;

    // Budget and special requests
    page.drawText("BUDGET & NOTES", { x: 50, y: y, size: 14, font: fontBold });
    y -= 20;
    page.drawText(`Estimated Budget: $${data.estimatedBudget ?? "N/A"}`, { x: 50, y: y, size: 11, font: fontRegular });
    y -= 15;
    page.drawText(`Special Requests: ${data.specialRequests || "None"}`, { x: 50, y: y, size: 11, font: fontRegular });

    y -= 40;

    // Footer notes
    page.drawText("Thank you for requesting a quote. We’ll get back to you soon!", { x: 50, y: y, size: 12, font: fontRegular });
    y -= 15;
    page.drawText("~ The Catering Team", { x: 50, y: y, size: 12, font: fontRegular });


    return await pdfDoc.save();
}


