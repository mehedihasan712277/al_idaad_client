import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "*",
                disallow: ["/api/", "/admin/", "/dashboard/", "/checkout/"],
            },
        ],
        sitemap: "https://al-idaad-client.vercel.app/sitemap.xml", // 🔁 change domain
    };
}
