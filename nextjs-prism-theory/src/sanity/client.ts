import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "sli6zaza",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});