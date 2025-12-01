export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    socials?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
}

export interface MediaItem {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string; // For videos
    alt?: string;
}

export interface Comment {
    id: string;
    author: {
        name: string;
        avatarUrl: string;
        username?: string;
        isMaker?: boolean;
        badge?: string;
    };
    content: string;
    createdAt: string;
    upvotes: number;
    replies?: Comment[];
}

export interface ProductLaunchData {
    id: string;
    userId?: string;
    name: string;
    tagline?: string;
    description?: string; // Markdown or HTML
    logoUrl?: string;
    websiteUrl?: string;
    launchDate?: string | Date;
    tags?: string[];
    likesCount?: number;
    keyFeatures?: string[];
    isPublished?: boolean;

    // Customization
    theme?: {
        primaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
        fontFamily?: string;
        accentColor?: string;
        gradient?: string;
        layout?: 'classic' | 'modern' | 'minimal' | string;
        heroStyle?: 'split' | 'center' | 'video-bg' | 'image-left' | 'image-right' | string;
        cardStyle?: 'square' | 'rounded' | 'glass' | 'elevated' | string;
        heroVideo?: string;
    };

    announcement?: {
        enabled?: boolean;
        text?: string;
        link?: string;
        emoji?: string;
        backgroundColor?: string;
        textColor?: string;
        showCountdown?: boolean;
    };

    countdown?: {
        enabled?: boolean;
        targetDate?: string;
        title?: string;
    };

    socialLinks?: {
        twitter?: string;
        github?: string;
        discord?: string;
        website?: string;
        youtube?: string;
    };

    chatbotId?: string | null;

    // Sections
    media?: MediaItem[];
    team?: TeamMember[];
    comments?: Comment[];

    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export type CreateProductLaunchInput = Omit<ProductLaunchData, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'likesCount' | 'comments'>;
export type UpdateProductLaunchInput = Partial<CreateProductLaunchInput>;
