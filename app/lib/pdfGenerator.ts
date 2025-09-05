import path from "path";
import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// --- Utilities ---
export const genRandomNumber = () => Math.floor(Math.random() * 1000000);
export const todayDate = () => new Date().toISOString().split("T")[0];

// --- Interfaces ---
export interface MenuItemSelection {
    id: string;        // unique identifier e.g. "buffet", "sandwichPlatter"
    label: string;     // display label e.g. "Hot Buffet"
    price: number;     // unit price
    unit: string;      // "per person" | "per platter" | "per package"
    quantity: number;  // number selected
}

interface BasePdfData {
    serviceType: "event" | "catering" | "";
    fullName: string;
    email: string;
    phone: string;
    mealType: string[];
    estimatedBudget?: number;
    specialRequests?: string;
    totalCost: number;
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
    menuSelection: MenuItemSelection[];
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

// --- PDF Generator ---
export async function generateQuotePDF(data: PdfData) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // --- Logo ---
    const logoPath = path.join(process.cwd(), "public", "hslogo.png");
    const logoImageBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const logoDims = logoImage.scale(0.1);

    page.drawImage(logoImage, {
        x: 50,
        y: height - 90,
        width: logoDims.width,
        height: logoDims.height,
    });

    // Layout positions
    let y = height - logoDims.height - 30;
    const leftX = 50;
    const rightX = 350;

    // --- Quote Info ---
    const quoteX = 450;
    let quoteY = height - 20;
    page.drawText(`Date Issued: ${todayDate()}`, { x: quoteX, y: quoteY, size: 11, font: fontRegular });
    quoteY -= 15;
    page.drawText(`Quote No.: ${genRandomNumber()}`, { x: quoteX, y: quoteY, size: 11, font: fontRegular });

    // --- Header ---
    page.drawText("CATERING QUOTATION", {
        x: width / 2 - 90,
        y: y,
        size: 18,
        font: fontBold,
        color: rgb(0.5, 0, 0.2),
    });
    y -= 40;

    // --- Company Info ---
    page.drawText("Hidden Spot", { x: leftX, y, size: 12, font: fontBold });
    page.drawText("Catering Services & Event Supplies", { x: leftX, y: y - 15, size: 10, font: fontRegular });
    page.drawText("All your catering needs - in one!", { x: leftX, y: y - 30, size: 10, font: fontRegular });

    page.drawText("73 Anderson Rd,", { x: rightX, y, size: 12, font: fontRegular });
    page.drawText("Smeaton Grange NSW 2567", { x: rightX, y: y - 15, size: 10, font: fontRegular });
    page.drawText("hiddenspot@outlook.com", { x: rightX, y: y - 30, size: 10, font: fontRegular });
    page.drawText("415-767-6596", { x: rightX, y: y - 45, size: 10, font: fontRegular });

    y -= 80;

    // --- Client & Service Details ---
    let clientY = y;
    let serviceY = y;

    page.drawText("CLIENT DETAILS", { x: 50, y: clientY, size: 14, font: fontBold });
    clientY -= 20;
    page.drawText(`Name: ${data.fullName}`, { x: 50, y: clientY, size: 11, font: fontRegular });
    clientY -= 15;
    page.drawText(`Contact Number: ${data.phone}`, { x: 50, y: clientY, size: 11, font: fontRegular });
    clientY -= 15;
    page.drawText(`Email Address: ${data.email}`, { x: 50, y: clientY, size: 11, font: fontRegular });

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
        page.drawText(`Guest Count: ${data.numberOfGuests}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Duration: ${data.eventDuration} hours`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Beverages: ${data.beverageType.join(", ") || "None"}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 20;

        // ✅ Show total cost for event
        page.drawText(`Total Cost: $${data.totalCost.toLocaleString()}`, {
            x: 350, y: serviceY, size: 12, font: fontBold, color: rgb(0, 0.5, 0),
        });
        serviceY -= 20;

    } else if (data.serviceType === "catering") {
        page.drawText(`Service Type: CATERING`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Catering Type: ${data.cateringType}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 15;
        page.drawText(`Meal Time: ${data.mealTime}`, { x: 350, y: serviceY, size: 11, font: fontRegular });
        serviceY -= 20;

        // ✅ List menu items
        page.drawText("Menu Selection:", { x: 350, y: serviceY, size: 11, font: fontBold });
        serviceY -= 15;

        if (data.menuSelection.length > 0) {
            data.menuSelection.forEach((item) => {
                page.drawText(
                    `- ${item.label} (${item.quantity} × $${item.price} ${item.unit}) = $${item.price * item.quantity}`,
                    { x: 360, y: serviceY, size: 10, font: fontRegular }
                );
                serviceY -= 12;
            });
        } else {
            page.drawText("None", { x: 360, y: serviceY, size: 10, font: fontRegular });
            serviceY -= 12;
        }

        serviceY -= 10;
        // ✅ Total Cost
        page.drawText(`Total Cost: $${data.totalCost.toLocaleString()}`, {
            x: 350, y: serviceY, size: 12, font: fontBold, color: rgb(0, 0.5, 0),
        });
        serviceY -= 20;

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

    y = Math.min(clientY, serviceY) - 40;

    // --- Meal Preferences ---
    page.drawText("MEAL PREFERENCES", { x: 50, y: y, size: 14, font: fontBold });
    y -= 20;
    page.drawText(`Meal Type: ${data.mealType.join(", ") || "None"}`, { x: 50, y: y, size: 11, font: fontRegular });
    y -= 30;

    // --- Budget & Notes ---
    page.drawText("BUDGET & NOTES", { x: 50, y: y, size: 14, font: fontBold });
    y -= 20;
    page.drawText(`Estimated Budget: $${data.estimatedBudget ?? "N/A"}`, { x: 50, y: y, size: 11, font: fontRegular });
    y -= 15;
    page.drawText(`Special Requests: ${data.specialRequests || "None"}`, { x: 50, y: y, size: 11, font: fontRegular });
    y -= 40;

    // --- Footer ---
    page.drawText("Thank you for requesting a quote. We’ll get back to you soon!", { x: 50, y: y, size: 12, font: fontRegular });
    y -= 15;
    page.drawText("~ The Catering Team", { x: 50, y: y, size: 12, font: fontRegular });

    return await pdfDoc.save();
}
