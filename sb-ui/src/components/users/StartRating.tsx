import { RiStarFill, RiStarHalfFill } from "@remixicon/react";
function StarRating({ rating }: { rating: number }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.3 && rating - fullStars <= 0.7;
    const extraFullStar = rating - fullStars > 0.7;

    const actualFullStars = extraFullStar ? fullStars + 1 : fullStars;

    for (let i = 1; i <= 5; i++) {
        if (i <= actualFullStars) {
            stars.push(
                <RiStarFill key={i} className="w-3 h-3 text-[#84ac51] fill-[#84ac51]" />
            );
        } else if (i === actualFullStars + 1 && hasHalfStar) {
            stars.push(
                <RiStarHalfFill key={i} className="w-3 h-3 text-[#84ac51] fill-[#84ac51]" />
            );
        } else {
            stars.push(
                <RiStarFill key={i} className="w-3 h-3 text-[#e5e7eb] fill-[#e5e7eb]" />
            );
        }
    }

    return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default StarRating;