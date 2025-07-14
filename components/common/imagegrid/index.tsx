// src/components/propertyDetails/ImageGrid.tsx
"use client";

import React from "react";
import Image from "next/image";

interface ImageGridProps {
    images: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
    const getImageGroup = (startIndex: number) => {
        return images.slice(startIndex, startIndex + 3);
    };

    const groups = [];
    for (let i = 0; i < images.length; i += 3) {
        groups.push(getImageGroup(i));
    }

    return (
        <div className="space-y-6">
            {groups.map((group, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 h-[300px]">
                    {/* Left Large Image */}
                    {group[0] && (
                        <div className="col-span-2 relative rounded-lg overflow-hidden">
                            <Image
                                src={group[0]}
                                alt={`Property image ${idx * 3 + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    {/* Right Column - Two Small Stacked Images */}
                    <div className="flex flex-col gap-4">
                        {group[1] && (
                            <div className="relative h-[143px] rounded-lg overflow-hidden">
                                <Image
                                    src={group[1]}
                                    alt={`Property image ${idx * 3 + 2}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        {group[2] && (
                            <div className="relative h-[143px] rounded-lg overflow-hidden">
                                <Image
                                    src={group[2]}
                                    alt={`Property image ${idx * 3 + 3}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
