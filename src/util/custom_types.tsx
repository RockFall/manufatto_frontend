export type ImageType = {
    image: {
      original: string;
      originalWbp: string;
    };
  };

export type LinkType = {
    id: number;
    text: string;
    url: string;
};

export type MosaicType = {
    type: 'MOSAIC';
    id: number;
    title: string;
    order: number;
    background: string;
    description: string;
    isActive: boolean;
    images: ImageType[];
    links: LinkType[];
};

export type OutfitType = {
    type: 'OUTFIT';
    id: number;
    title: string;
    order: number;
    background: string;
    description: string;
    isActive: boolean;
    images: ImageType[];
    links: LinkType[];
};

export type HighlightBanner = MosaicType | OutfitType;