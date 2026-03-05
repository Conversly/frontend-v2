import { Metadata } from 'next';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import Person from "@mui/icons-material/Person";
import Schedule from "@mui/icons-material/Schedule";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import { getBlogPost, BLOG_DATA } from "@/lib/blog-data";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    return {
        title: `${post.title} | VerlyAI Blog`,
        description: post.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
        openGraph: {
            title: `${post.title} | VerlyAI Blog`,
            description: post.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
            url: `https://verlyai.xyz/blog/${slug}`,
        },
    };
}

export function generateStaticParams() {
    return Object.keys(BLOG_DATA)
        .filter(slug => slug !== 'default')
        .map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    return (
        <main className="min-h-screen bg-background relative flex flex-col">
            <Navbar />

            <article className="pt-20 pb-16 flex-1">
                <div className="max-w-4xl mx-auto px-6 mb-12">
                    <div className="space-y-6 text-center md:text-left">
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                            {post.category}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground pt-4 border-t border-border mt-8">
                            <div className="flex items-center gap-2">
                                <Person sx={{ fontSize: 16 }} />
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarMonth sx={{ fontSize: 16 }} />
                                <span className="font-medium text-foreground">{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Schedule sx={{ fontSize: 16 }} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="max-w-5xl mx-auto px-6 mb-16">
                    <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-muted">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6">
                    <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            className="[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-6 [&>p]:mb-8 [&>p]:leading-loose [&>p]:text-muted-foreground [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-3 [&>ul]:mb-8 [&>ul]:text-muted-foreground [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-foreground [&>blockquote]:my-8 [&>pre]:bg-muted/50 [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-8 [&>li>strong]:text-foreground"
                        />
                    </div>
                </div>

            </article>

            <Footer />
        </main>
    );
}
