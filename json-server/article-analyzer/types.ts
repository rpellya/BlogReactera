export interface Article {
    id: string;
    title: string;
    authors: string[];
    year: number;
    citations: string[];
}

export interface RawArticle {
    id: string | number;
    title: string;
    authors?: string[];
    year?: number;
    citations?: string[];
    references?: string[];
}
