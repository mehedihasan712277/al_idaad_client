import DOMPurify from "dompurify";

export const formatMongoDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    // Format time in 12-hour with AM/PM
    const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    // Format date like "10 October, 2025"
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return `${time} - ${formattedDate}`;
};

export const processImageHTML = (html: string) => {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Process all <img> tags
    doc.querySelectorAll("img").forEach((img) => {
        const containerStyle = img.getAttribute("containerstyle");
        let existingStyle = img.getAttribute("style") || "";

        let hasMargin = false;

        if (containerStyle) {
            // Look for margin in containerstyle
            const match = containerStyle.match(/margin\s*:\s*[^;]+/i);
            if (match) {
                hasMargin = true;
                // Append margin to the img's style
                existingStyle += (existingStyle ? "; " : "") + match[0];
            }
        }

        // If no margin, set display:inline-block
        if (!hasMargin) {
            existingStyle += (existingStyle ? "; " : "") + "display:inline-block ; margin-left : 1px";
        }

        img.setAttribute("style", existingStyle);

        // Remove unwanted attributes
        img.removeAttribute("containerstyle");
        img.removeAttribute("wrapperstyle");
    });

    // Serialize back to string and sanitize
    return DOMPurify.sanitize(doc.body.innerHTML, {
        ALLOWED_TAGS: ["p", "br", "b", "i", "em", "strong", "a", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "img", "figure", "figcaption"],
        ALLOWED_ATTR: ["src", "alt", "width", "height", "style", "class", "draggable", "href"],
    });
};
