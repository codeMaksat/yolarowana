import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { supabase } from "@/utils/supabaseClient";

export const config = {
    api: {
        responseLimit: false,
    },
    maxDuration: 60,
};

const escapeHtml = value => {
    if (!value) return "";

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
        .map(
            day => `
                <div class="day">
                    <h3>Day ${escapeHtml(day.day)}: ${escapeHtml(day.title)}</h3>
                    <p>${escapeHtml(day.content)}</p>
                </div>
            `
        )
        .join("");
};

const renderPriceTiers = priceTiers => {
    if (!Array.isArray(priceTiers) || priceTiers.length === 0) {
        return `<p>Price available on request.</p>`;
    }

    return `
        <table>
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
                <div class="faq-item">
                    <h3>${escapeHtml(item.question)}</h3>
                    <p>${escapeHtml(item.answer)}</p>
                </div>
            `
        )
        .join("");
};

const buildHtml = (tour, baseUrl) => {
    const heroImage = makeAbsoluteUrl(
        tour.hero_image || "/assets/images/tour-product-detail-img.jpg",
        baseUrl
    );

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

                    body {
                        margin: 0;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #1f1f1f;
                        background: #ffffff;
                        line-height: 1.55;
                    }

                    .cover {
                        position: relative;
                        height: 360px;
                        background: linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url("${heroImage}");
                        background-size: cover;
                        background-position: center;
                        color: #ffffff;
                        padding: 50px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                    }

                    .cover h1 {
                        font-size: 42px;
                        line-height: 1.1;
                        margin: 0 0 15px;
                        max-width: 780px;
                    }

                    .cover p {
                        font-size: 16px;
                        margin: 0;
                        max-width: 850px;
                    }

                    .brand {
                        position: absolute;
                        top: 35px;
                        left: 50px;
                        font-size: 18px;
                        font-weight: 700;
                        letter-spacing: 1px;
                    }

                    .content {
                        padding: 38px 50px;
                    }

                    .info-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 14px;
                        margin-bottom: 30px;
                    }

                    .info-card {
                        border: 1px solid #e2cfaf;
                        background: #faf7f2;
                        border-radius: 14px;
                        padding: 14px 16px;
                    }

                    .info-card strong {
                        display: block;
                        font-size: 12px;
                        text-transform: uppercase;
                        color: #7a5b2e;
                        margin-bottom: 4px;
                    }

                    h2 {
                        font-size: 26px;
                        margin: 34px 0 14px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #e2cfaf;
                    }

                    h3 {
                        font-size: 17px;
                        margin: 0 0 8px;
                    }

                    p {
                        margin: 0 0 11px;
                        font-size: 14px;
                    }

                    .day {
                        padding: 15px 0;
                        border-bottom: 1px solid #eeeeee;
                        break-inside: avoid;
                    }

                    ul {
                        margin: 0;
                        padding-left: 20px;
                    }

                    li {
                        margin-bottom: 7px;
                        font-size: 14px;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }

                    th,
                    td {
                        border: 1px solid #e2cfaf;
                        padding: 10px;
                        text-align: left;
                        font-size: 14px;
                    }

                    th {
                        background: #faf7f2;
                    }

                    .faq-item {
                        margin-bottom: 15px;
                        break-inside: avoid;
                    }

                    .footer {
                        margin-top: 35px;
                        padding: 22px;
                        background: #1f1f1f;
                        color: white;
                        border-radius: 16px;
                    }

                    .footer h2 {
                        border: none;
                        margin: 0 0 10px;
                        padding: 0;
                        color: white;
                    }

                    .footer p {
                        margin: 0;
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

                <section class="content">
                    <div class="info-grid">
                        <div class="info-card">
                            <strong>Duration</strong>
                            ${escapeHtml(tour.duration)}
                        </div>

                        <div class="info-card">
                            <strong>Countries</strong>
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

                    <h2>Overview</h2>
                    ${renderOverview(tour.overview)}

                    <h2>Prices</h2>
                    ${renderPriceTiers(tour.price_tiers)}

                    <h2>Itinerary</h2>
                    ${renderItinerary(tour.itinerary)}

                    <h2>What is Included</h2>
                    <ul>${renderList(tour.included)}</ul>

                    <h2>Not Included</h2>
                    <ul>${renderList(tour.not_included)}</ul>

                    <h2>FAQ</h2>
                    ${renderFaq(tour.faq)}

                    <div class="footer">
                        <h2>Plan Your Central Asia Journey</h2>
                        <p>
                            Contact Yola Rowana for updated availability, final price confirmation,
                            visa guidance and custom travel planning.
                        </p>
                    </div>
                </section>
            </body>
        </html>
    `;
};

export default async function handler(req, res) {
    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({ error: "Missing tour slug." });
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

    if (tour.status !== "published") {
        return res.status(403).json({
            error: "Tour is not published.",
            debug: {
                slug,
                status: tour.status,
            },
        });
    }

    let browser;

    try {
        const isProduction = process.env.NODE_ENV === "production";

        const protocol =
            req.headers["x-forwarded-proto"] ||
            (isProduction ? "https" : "http");

        const host = req.headers.host;

        const baseUrl = `${protocol}://${host}`;

        const executablePath = isProduction
            ? await chromium.executablePath()
            : process.env.CHROME_EXECUTABLE_PATH;

        browser = await puppeteer.launch({
            args: isProduction
                ? [
                      ...chromium.args,
                      "--no-sandbox",
                      "--disable-setuid-sandbox",
                      "--disable-dev-shm-usage",
                      "--disable-gpu",
                      "--hide-scrollbars",
                      "--font-render-hinting=none",
                  ]
                : [],
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: isProduction ? chromium.headless : true,
        });

        const page = await browser.newPage();

        await page.setContent(buildHtml(tour, baseUrl), {
            waitUntil: "networkidle0",
        });

        const pdfArray = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
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