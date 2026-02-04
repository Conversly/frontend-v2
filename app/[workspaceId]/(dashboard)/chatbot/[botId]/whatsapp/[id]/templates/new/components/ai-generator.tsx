import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, History, MousePointer2, Reply } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from "@/lib/utils";
import { useGenerateTemplates } from "@/services/template";

interface GeneratedOption {
    id: number;
    body: string;
    params: string[];
}

interface AIGeneratorProps {
    onGenerate: (option: GeneratedOption) => void;
    category?: string;
    language?: string;
}

export function AIGenerator({ onGenerate, category, language }: AIGeneratorProps) {
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiStyle, setAiStyle] = useState('Normal');
    const [aiOptimization, setAiOptimization] = useState<string[]>([]);
    const [generatedOptions, setGeneratedOptions] = useState<GeneratedOption[]>([]);
    const [selectedGeneratedOption, setSelectedGeneratedOption] = useState<number | null>(null);

    const { mutateAsync: generate, isPending: isGenerating } = useGenerateTemplates();

    const handleAiGenerate = async () => {
        if (!aiPrompt.trim()) {
            toast.error("Please enter a prompt to generate content");
            return;
        }
        if (!category) {
            toast.error("Please select a template category");
            return;
        }
        if (!language) {
            toast.error("Please select a template language");
            return;
        }

        try {
            const res = await generate({
                prompt: aiPrompt,
                language: language,
                style: aiStyle as 'Normal' | 'Poetic' | 'Exciting' | 'Funny',
                optimizeFor: aiOptimization[0] as 'Click Rate' | 'Reply Rate',
            });

            // API returns { success: true, data: GeneratedTemplateItem[] }
            const generatedItems = res.data?.data;

            if (Array.isArray(generatedItems) && generatedItems.length > 0) {
                const newOptions: GeneratedOption[] = generatedItems.map((item, index) => ({
                    id: Date.now() + index,
                    body: item.format,
                    params: item.templateParams || []
                }));
                setGeneratedOptions(newOptions);
            } else {
                toast.error("No content generated");
            }
        } catch (error: any) {
            console.error("AI Generation failed:", error);
            if (error?.response?.status === 401) {
                toast.error("Authentication failed. Please refresh the page or login again.");
            } else {
                toast.error("Failed to generate content. Please try again.");
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#0a474c]">
                <Sparkles className="w-5 h-5 fill-[#0a474c]" />
                <div>
                    <h3 className="font-medium text-lg text-gray-900">Generate with AI</h3>
                    <p className="text-xs text-gray-500">Create customized variations with AI</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-700">Write your prompt*</h4>
                        <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-gray-500">
                            <History className="w-3 h-3 mr-1" /> Previous prompts
                        </Button>
                    </div>
                    <Textarea
                        placeholder="eg. Please generate a promotional message to give a discount of 20% off on our product line."
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        className="min-h-[80px] bg-white resize-none"
                        maxLength={1024}
                    />
                    <p className="text-xs text-right text-gray-400">{aiPrompt.length}/1024</p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Choose your message style:</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Normal', 'Poetic', 'Exciting', 'Funny'].map((style) => (
                            <div
                                key={style}
                                onClick={() => setAiStyle(style)}
                                className={cn(
                                    "cursor-pointer px-3 py-1.5 rounded-md border text-sm flex items-center gap-1.5 transition-colors",
                                    aiStyle === style
                                        ? "bg-[#ebf5f3] border-[#0a474c] text-[#0a474c]"
                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <span>{style === 'Normal' ? '😀' : style === 'Poetic' ? '✍🏼' : style === 'Exciting' ? '🤩' : '😜'}</span>
                                {style}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Optimize your message for:</h4>
                    <div className="flex flex-wrap gap-2">
                        <div
                            onClick={() => setAiOptimization(prev => prev.includes('Click Rate') ? prev.filter(i => i !== 'Click Rate') : [...prev, 'Click Rate'])}
                            className={cn(
                                "cursor-pointer px-3 py-1.5 rounded-md border text-sm flex items-center gap-1.5 transition-colors",
                                aiOptimization.includes('Click Rate')
                                    ? "bg-[#ebf5f3] border-[#0a474c] text-[#0a474c]"
                                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <MousePointer2 className="w-3.5 h-3.5" />
                            Click Rate
                        </div>
                        <div
                            onClick={() => setAiOptimization(prev => prev.includes('Reply Rate') ? prev.filter(i => i !== 'Reply Rate') : [...prev, 'Reply Rate'])}
                            className={cn(
                                "cursor-pointer px-3 py-1.5 rounded-md border text-sm flex items-center gap-1.5 transition-colors",
                                aiOptimization.includes('Reply Rate')
                                    ? "bg-[#ebf5f3] border-[#0a474c] text-[#0a474c]"
                                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <Reply className="w-3.5 h-3.5" />
                            Reply Rate
                        </div>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="w-full bg-[#0a474c] hover:bg-[#083a3e] text-white"
                >
                    {isGenerating ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Generate ({2} free generations left)
                </Button>

                {/* Generated Options Carousel Placeholder */}
                {generatedOptions.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-4">
                        {generatedOptions.map((opt, idx) => (
                            <div key={opt.id} className="relative border rounded-lg p-4 bg-gray-50 hover:bg-white transition-all group">
                                <div className="bg-white p-3 rounded border shadow-sm mb-3 text-sm whitespace-pre-wrap">
                                    {opt.body}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-[#0a474c] hover:bg-[#083a3e] text-white"
                                        onClick={() => {
                                            setSelectedGeneratedOption(opt.id);
                                            onGenerate(opt);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-white/50 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            Use this
                                        </div>
                                    </Button>
                                </div>
                                {selectedGeneratedOption === opt.id && (
                                    <div className="absolute inset-0 bg-[#0a474c]/10 rounded-lg border-2 border-[#0a474c] pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
