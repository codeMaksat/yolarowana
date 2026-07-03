import puppeteer from "puppeteer-core";
import { supabase } from "@/utils/supabaseClient";

export const config = {
    api: {
        responseLimit: false,
    },
};

const escapeHtml = value => {
    if (value === null || value === undefined) return "";

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

const makeAbsoluteUrl = (url, baseUrl) => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
    }

    return `${baseUrl}/${url}`;
};

const getDisplayUrl = url =>
    String(url || "")
        .replace(/^https?:\/\//i, "")
        .replace(/\/$/, "");

const getContactDetails = baseUrl => {
    const website = process.env.NEXT_PUBLIC_SITE_URL || baseUrl;
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
    const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "";
    const qrImage = process.env.NEXT_PUBLIC_BROCHURE_QR_IMAGE || "";

    const whatsappDigits = String(whatsapp).replace(/\D/g, "");

    return {
        website,
        websiteLabel: getDisplayUrl(website),
        email,
        whatsapp,
        whatsappUrl: whatsappDigits
            ? `https://wa.me/${whatsappDigits}`
            : "",
        qrImage: qrImage ? makeAbsoluteUrl(qrImage, baseUrl) : "",
    };
};

const renderList = items => {
    if (!Array.isArray(items) || items.length === 0) return "";

    const details = items[0]?.details || [];

    return details
        .map(item => `<li>${escapeHtml(item.label)}</li>`)
        .join("");
};

const renderOverview = overview => {
    if (!Array.isArray(overview) || overview.length === 0) return "";

    const labels = overview[0]?.labels || [];

    return labels
        .map(item => `<p>${escapeHtml(item.label)}</p>`)
        .join("");
};

const renderItinerary = itinerary => {
    const days = itinerary?.[0]?.details || [];

    return days
        .map(day => {
            const dayNumber = String(day.day ?? "").padStart(2, "0");

            return `
                <article class="day-card">
                    <div class="day-badge">DAY ${escapeHtml(dayNumber)}</div>

                    <div class="day-copy">
                        <h3>${escapeHtml(day.title)}</h3>
                        <p>${escapeHtml(day.content)}</p>
                    </div>
                </article>
            `;
        })
        .join("");
};

const renderPriceTiers = priceTiers => {
    if (!Array.isArray(priceTiers) || priceTiers.length === 0) {
        return `<p>Price available on request.</p>`;
    }

    return `
        <table class="price-table">
            <thead>
                <tr>
                    <th>Travelers</th>
                    <th>Price per person</th>
                </tr>
            </thead>

            <tbody>
                ${priceTiers
                    .map(
                        tier => `
                            <tr>
                                <td>${escapeHtml(tier.travelers)}</td>
                                <td>${
                                    tier.price
                                        ? `$${Number(tier.price).toLocaleString()}`
                                        : "On request"
                                }</td>
                            </tr>
                        `
                    )
                    .join("")}
            </tbody>
        </table>
    `;
};

const renderFaq = faq => {
    const questions = faq?.[0]?.question || [];

    return questions
        .map(
            item => `
                <article class="faq-item">
                    <h3>${escapeHtml(item.question)}</h3>
                    <p>${escapeHtml(item.answer)}</p>
                </article>
            `
        )
        .join("");
};

const renderPhotoGallery = (photos, baseUrl) => {
    const images = (Array.isArray(photos) ? photos : [])
        .flatMap(group => (Array.isArray(group?.images) ? group.images : []))
        .filter(item => item?.image)
        .slice(0, 6);

    if (images.length === 0) return "";

    return `
        <section class="section-block gallery-section">
            <h2>Tour Highlights</h2>

            <div class="photo-grid">
                ${images
                    .map(
                        image => `
                            <img
                                src="${escapeHtml(
                                    makeAbsoluteUrl(image.image, baseUrl)
                                )}"
                                alt="${escapeHtml(
                                    image.alt || "Tour highlight"
                                )}"
                            />
                        `
                    )
                    .join("")}
            </div>
        </section>
    `;
};

const renderContactBlock = (tour, contact, heroImage) => {
    const contactItems = [
        contact.website
            ? `
                <a class="contact-card" href="${escapeHtml(contact.website)}">
                    <span class="contact-label">Website</span>
                    <span class="contact-value">
                        ${escapeHtml(contact.websiteLabel)}
                    </span>
                </a>
            `
            : "",
        contact.email
            ? `
                <a
                    class="contact-card"
                    href="mailto:${escapeHtml(contact.email)}"
                >
                    <span class="contact-label">Email</span>
                    <span class="contact-value">
                        ${escapeHtml(contact.email)}
                    </span>
                </a>
            `
            : "",
        contact.whatsapp
            ? `
                <a
                    class="contact-card"
                    href="${escapeHtml(contact.whatsappUrl)}"
                >
                    <span class="contact-label">WhatsApp</span>
                    <span class="contact-value">
                        ${escapeHtml(contact.whatsapp)}
                    </span>
                </a>
            `
            : "",
    ].filter(Boolean);

    return `
        <section class="closing-page">
            <div class="closing-image-wrap">
                <img
                    class="closing-image"
                    src="${escapeHtml(heroImage)}"
                    alt="${escapeHtml(tour.title)}"
                />
            </div>

            <div class="closing-content">
                <div class="closing-heading-row">
                    <div class="closing-copy">
                        <p class="closing-kicker">
                            ${escapeHtml(tour.title)}
                        </p>

                        <h2>Plan Your Central Asia Journey</h2>

                        <p class="closing-intro">
                            Contact us for updated availability, final price
                            confirmation, visa guidance and custom travel planning.
                        </p>
                    </div>

                    ${
                        contact.qrImage
                            ? `
                                <div class="qr-wrap">
                                    <img
                                        src="${escapeHtml(contact.qrImage)}"
                                        alt="Yola Rowana QR code"
                                    />
                                    <span>Scan to contact us</span>
                                </div>
                            `
                            : ""
                    }
                </div>

                <div class="closing-route">
                    <span class="closing-route-label">Tour route</span>
                    <p>${escapeHtml(tour.route)}</p>
                </div>

                ${
                    contactItems.length > 0
                        ? `
                            <div class="contact-grid">
                                ${contactItems.join("")}
                            </div>
                        `
                        : ""
                }

                <div class="closing-signoff">
                    <div>
                        <div class="closing-brand">Yola Rowana</div>
                        <div class="closing-tagline">
                            Tailor-made journeys across Central Asia
                        </div>
                    </div>

                    <div class="closing-accent"></div>
                </div>
            </div>
        </section>
    `;
};

const buildFooterTemplate = tour => `
    <div style="
        width: 100%;
        padding: 0 48px 7px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 8px;
        color: #7b746a;
        display: flex;
        align-items: center;
        justify-content: space-between;
    ">
        <span>Yola Rowana | ${escapeHtml(tour.title)}</span>
        <span>
            Page <span class="pageNumber"></span>
            of <span class="totalPages"></span>
        </span>
    </div>
`;

const buildHtml = (tour, baseUrl) => {
    const heroImage = makeAbsoluteUrl(
        tour.hero_image || "/assets/images/tour-product-detail-img.jpg",
        baseUrl
    );

    const contact = getContactDetails(baseUrl);

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>${escapeHtml(tour.title)} Brochure</title>

                <style>
                    * {
                        box-sizing: border-box;
                    }

                    html {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    body {
                        margin: 0;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #202220;
                        background: #ffffff;
                        line-height: 1.55;
                    }

                    a {
                        color: inherit;
                        text-decoration: none;
                    }

                    .cover {
                        position: relative;
                        height: 360px;
                        padding: 46px 48px;
                        color: #ffffff;
                        background:
                            linear-gradient(
                                rgba(7, 27, 26, 0.22),
                                rgba(7, 27, 26, 0.72)
                            ),
                            url("${heroImage}");
                        background-size: cover;
                        background-position: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                    }

                    .cover::after {
                        content: "";
                        position: absolute;
                        left: 48px;
                        bottom: 34px;
                        width: 78px;
                        height: 3px;
                        border-radius: 999px;
                        background: #d8b46a;
                    }

                    .cover h1 {
                        position: relative;
                        z-index: 1;
                        max-width: 780px;
                        margin: 0 0 14px;
                        font-size: 42px;
                        line-height: 1.08;
                        letter-spacing: -0.5px;
                    }

                    .cover p {
                        position: relative;
                        z-index: 1;
                        max-width: 860px;
                        margin: 0 0 14px;
                        font-size: 15px;
                        line-height: 1.55;
                    }

                    .brand {
                        position: absolute;
                        z-index: 1;
                        top: 32px;
                        left: 48px;
                        font-size: 18px;
                        font-weight: 700;
                        letter-spacing: 1px;
                    }

                    .content {
                        padding: 34px 48px 38px;
                    }

                    .info-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                        margin-bottom: 26px;
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .info-card {
                        min-height: 82px;
                        padding: 13px 15px;
                        border: 1px solid #e2cfaf;
                        border-radius: 14px;
                        background: #faf7f2;
                    }

                    .info-card strong {
                        display: block;
                        margin-bottom: 4px;
                        color: #7a5b2e;
                        font-size: 11px;
                        letter-spacing: 0.45px;
                        text-transform: uppercase;
                    }

                    .section-block {
                        margin-top: 28px;
                    }

                    .section-block:first-of-type {
                        margin-top: 0;
                    }

                    h2 {
                        margin: 0 0 13px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #e2cfaf;
                        font-size: 25px;
                        line-height: 1.2;
                        break-after: avoid-page;
                        page-break-after: avoid;
                    }

                    h3 {
                        margin: 0 0 7px;
                        font-size: 16px;
                        line-height: 1.35;
                    }

                    p {
                        margin: 0 0 10px;
                        font-size: 13.5px;
                        orphans: 3;
                        widows: 3;
                    }

                    .gallery-section {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .photo-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 9px;
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .photo-grid img {
                        display: block;
                        width: 100%;
                        height: 102px;
                        object-fit: cover;
                        object-position: center;
                        border: 1px solid #eadfcf;
                        border-radius: 12px;
                    }

                    .price-section,
                    .price-table {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .price-table {
                        width: 100%;
                        overflow: hidden;
                        border: 1px solid #e2cfaf;
                        border-collapse: separate;
                        border-spacing: 0;
                        border-radius: 12px;
                    }

                    .price-table th,
                    .price-table td {
                        padding: 10px 12px;
                        border-right: 1px solid #e2cfaf;
                        border-bottom: 1px solid #e2cfaf;
                        text-align: left;
                        font-size: 13.5px;
                    }

                    .price-table th:last-child,
                    .price-table td:last-child {
                        border-right: 0;
                    }

                    .price-table tbody tr:last-child td {
                        border-bottom: 0;
                    }

                    .price-table th {
                        color: #4f3a1e;
                        background: #faf7f2;
                        font-size: 12px;
                        letter-spacing: 0.35px;
                        text-transform: uppercase;
                    }

                    .price-note {
                        margin: 10px 0 0;
                        padding: 10px 12px;
                        border-left: 3px solid #d8b46a;
                        color: #60594f;
                        background: #fffaf2;
                        font-size: 12.5px;
                    }

                    .day-card {
                        display: grid;
                        grid-template-columns: 76px 1fr;
                        gap: 15px;
                        margin-bottom: 11px;
                        padding: 14px 15px;
                        border: 1px solid #eadfcf;
                        border-left: 4px solid #d8b46a;
                        border-radius: 12px;
                        background: #fcfaf6;
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .day-badge {
                        align-self: start;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 30px;
                        padding: 6px 8px;
                        border-radius: 999px;
                        color: #ffffff;
                        background: #071b1a;
                        font-size: 10px;
                        font-weight: 700;
                        letter-spacing: 0.65px;
                    }

                    .day-copy p {
                        margin-bottom: 0;
                    }

                    ul {
                        margin: 0;
                        padding-left: 20px;
                    }

                    li {
                        margin-bottom: 6px;
                        padding-left: 2px;
                        font-size: 13.5px;
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    li::marker {
                        color: #b8893d;
                    }

                    .faq-grid {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: 10px;
                    }

                    .faq-item {
                        margin-bottom: 0;
                        padding: 11px 12px;
                        border: 1px solid #eadfcf;
                        border-radius: 12px;
                        background: #fcfaf6;
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .faq-item p {
                        margin-bottom: 0;
                    }

                    .closing-page {
                        height: 277mm;
                        color: #071b1a;
                        background: #faf7f2;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        break-before: page;
                        page-break-before: always;
                    }

                    .closing-image-wrap {
                        width: 100%;
                        height: 76mm;
                        flex-shrink: 0;
                        overflow: hidden;
                        background: #d9d2c7;
                    }

                    .closing-image {
                        display: block;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                    }

                    .closing-content {
                        flex: 1;
                        padding: 15mm 16mm 12mm;
                        display: flex;
                        flex-direction: column;
                    }

                    .closing-heading-row {
                        display: grid;
                        grid-template-columns: minmax(0, 1fr) auto;
                        gap: 24px;
                        align-items: start;
                    }

                    .closing-kicker {
                        margin: 0 0 9px;
                        color: #9a6d2e;
                        font-size: 11px;
                        font-weight: 700;
                        letter-spacing: 1.1px;
                        text-transform: uppercase;
                    }

                    .closing-copy h2 {
                        max-width: 620px;
                        margin: 0 0 13px;
                        padding: 0;
                        border: 0;
                        color: #071b1a;
                        font-size: 34px;
                        line-height: 1.13;
                    }

                    .closing-intro {
                        max-width: 620px;
                        margin: 0;
                        color: #59564f;
                        font-size: 14px;
                        line-height: 1.65;
                    }

                    .closing-route {
                        margin-top: 19px;
                        padding: 13px 15px;
                        border: 1px solid #e2cfaf;
                        border-left: 4px solid #d8b46a;
                        border-radius: 12px;
                        background: #ffffff;
                    }

                    .closing-route-label {
                        display: block;
                        margin-bottom: 5px;
                        color: #9a6d2e;
                        font-size: 9px;
                        font-weight: 700;
                        letter-spacing: 0.8px;
                        text-transform: uppercase;
                    }

                    .closing-route p {
                        margin: 0;
                        color: #343732;
                        font-size: 12px;
                        line-height: 1.5;
                    }

                    .contact-grid {
                        display: grid;
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                        gap: 10px;
                        margin-top: 18px;
                    }

                    .contact-card {
                        display: block;
                        min-height: 76px;
                        padding: 14px;
                        border: 1px solid rgba(216, 180, 106, 0.45);
                        border-radius: 14px;
                        color: #ffffff;
                        background: #071b1a;
                        overflow-wrap: anywhere;
                    }

                    .contact-label {
                        display: block;
                        margin-bottom: 7px;
                        color: #d8b46a;
                        font-size: 9px;
                        font-weight: 700;
                        letter-spacing: 0.8px;
                        text-transform: uppercase;
                    }

                    .contact-value {
                        display: block;
                        color: #ffffff;
                        font-size: 12px;
                        line-height: 1.45;
                    }

                    .qr-wrap {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 7px;
                        color: #756b5e;
                        font-size: 9px;
                    }

                    .qr-wrap img {
                        width: 94px;
                        height: 94px;
                        padding: 5px;
                        object-fit: contain;
                        border: 1px solid #e2cfaf;
                        border-radius: 10px;
                        background: #ffffff;
                    }

                    .closing-signoff {
                        margin-top: auto;
                        padding-top: 18px;
                        border-top: 1px solid #e2cfaf;
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
                        gap: 24px;
                    }

                    .closing-brand {
                        color: #071b1a;
                        font-size: 21px;
                        font-weight: 700;
                        letter-spacing: 1px;
                    }

                    .closing-tagline {
                        margin-top: 3px;
                        color: #756b5e;
                        font-size: 10px;
                        letter-spacing: 0.35px;
                    }

                    .closing-accent {
                        width: 72px;
                        height: 4px;
                        border-radius: 999px;
                        background: #d8b46a;
                    }

                    @page {
                        size: A4;
                        margin: 0;
                    }
                </style>
            </head>

            <body>
                <section class="cover">
                    <div class="brand">Yola Rowana</div>

                    <h1>${escapeHtml(tour.title)}</h1>

                    <p>${escapeHtml(tour.route)}</p>
                </section>

                <main class="content">
                    <div class="info-grid">
                        <div class="info-card">
                            <strong>Duration</strong>
                            ${escapeHtml(tour.duration)}
                        </div>

                        <div class="info-card">
                            <strong>Destinations</strong>
                            ${escapeHtml(tour.icon_label)}
                        </div>

                        <div class="info-card">
                            <strong>Travel Style</strong>
                            ${escapeHtml(tour.travel_style)}
                        </div>

                        <div class="info-card">
                            <strong>Support</strong>
                            ${escapeHtml(tour.support_label)}
                        </div>
                    </div>

                    <section class="section-block">
                        <h2>Overview</h2>
                        ${renderOverview(tour.overview)}
                    </section>

                    ${renderPhotoGallery(tour.photos, baseUrl)}

                    <section class="section-block price-section">
                        <h2>Prices</h2>

                        ${renderPriceTiers(tour.price_tiers)}

                        ${
                            tour.price_note
                                ? `
                                    <p class="price-note">
                                        ${escapeHtml(tour.price_note)}
                                    </p>
                                `
                                : ""
                        }
                    </section>

                    <section class="section-block">
                        <h2>Itinerary</h2>
                        ${renderItinerary(tour.itinerary)}
                    </section>

                    <section class="section-block">
                        <h2>What is Included</h2>
                        <ul>${renderList(tour.included)}</ul>
                    </section>

                    <section class="section-block">
                        <h2>Not Included</h2>
                        <ul>${renderList(tour.not_included)}</ul>
                    </section>

                    <section class="section-block">
                        <h2>FAQ</h2>

                        <div class="faq-grid">
                            ${renderFaq(tour.faq)}
                        </div>
                    </section>
                </main>

                ${renderContactBlock(tour, contact, heroImage)}
            </body>
        </html>
    `;
};

export default async function handler(req, res) {
    if (process.env.NODE_ENV === "production") {
        return res.status(403).json({
            error: "PDF generation is available locally/admin only.",
        });
    }

    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({
            error: "Missing tour slug.",
        });
    }

    if (!process.env.CHROME_EXECUTABLE_PATH) {
        return res.status(500).json({
            error: "Missing CHROME_EXECUTABLE_PATH in .env.local.",
        });
    }

    const { data: tour, error } = await supabase
        .from("tours")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !tour) {
        return res.status(404).json({
            error: "Tour not found.",
            debug: {
                slug,
                supabaseError: error?.message || null,
                supabaseCode: error?.code || null,
                supabaseDetails: error?.details || null,
            },
        });
    }

    let browser;

    try {
        const protocol = req.headers["x-forwarded-proto"] || "http";
        const host = req.headers.host;
        const baseUrl = `${protocol}://${host}`;

        browser = await puppeteer.launch({
            args: [],
            defaultViewport: {
                width: 1280,
                height: 720,
            },
            executablePath: process.env.CHROME_EXECUTABLE_PATH,
            headless: true,
        });

        const page = await browser.newPage();

        await page.setContent(buildHtml(tour, baseUrl), {
            waitUntil: "networkidle0",
        });

        const pdfArray = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            displayHeaderFooter: true,
            headerTemplate: "<div></div>",
            footerTemplate: buildFooterTemplate(tour),
            margin: {
                top: "0mm",
                right: "0mm",
                bottom: "20mm",
                left: "0mm",
            },
        });

        const pdfBuffer = Buffer.from(pdfArray);

        await browser.close();

        const fileName = `${tour.slug}-brochure.pdf`;

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );
        res.setHeader("Content-Length", pdfBuffer.length);

        return res.end(pdfBuffer);
    } catch (pdfError) {
        if (browser) {
            await browser.close();
        }

        console.error("PDF generation error:", pdfError);

        return res.status(500).json({
            error: "Could not generate PDF.",
            detail: String(pdfError?.message || pdfError),
        });
    }
}
