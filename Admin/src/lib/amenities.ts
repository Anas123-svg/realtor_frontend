import { AMENITIES_WITH_I, AMENITIES_WITH_ID } from "@/constants/index";

type GroupedAmenity = {
    id: number;
    name: string;
    items: string[];
};

export function groupAmenities(raw: string[] = []): GroupedAmenity[] {
    const lookup = new Map<string, number>();

    // Map amenity name to category id
    AMENITIES_WITH_ID.forEach((cat) =>
        cat.items.forEach((item) => lookup.set(item, cat.id))
    );

    const buckets = new Map<number, string[]>();

    raw.forEach((amenity) => {
        const catId = lookup.get(amenity);
        if (!catId) return; // skip if not found
        const arr = buckets.get(catId) ?? [];
        arr.push(amenity);
        buckets.set(catId, arr);
    });

    return AMENITIES_WITH_ID
        .filter((cat) => buckets.has(cat.id))
        .map((cat) => ({
            id: cat.id,
            name: cat.name,
            items: buckets.get(cat.id)!,
        }));
}
