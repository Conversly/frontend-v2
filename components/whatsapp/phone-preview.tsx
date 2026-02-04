import { Image as ImageIcon, Plus, CornerDownRight, Phone } from 'lucide-react';
import { cn } from "@/lib/utils";

interface PhonePreviewProps {
    headerText: string;
    bodyText: string;
    footerText: string;
    buttons: any[];
    templateType: string;
    cachedParams: Record<string, string>;
}

export function PhonePreview({
    headerText,
    bodyText,
    footerText,
    buttons,
    templateType,
    cachedParams
}: PhonePreviewProps) {
    return (
        <div className="sticky top-24">
            <div className="mb-4">
                <h4 className="text-lg font-medium">Template Preview</h4>
                <p className="text-xs text-gray-500">Your template message preview.</p>
            </div>

            {/* Phone Preview Mockup */}
            <div className="relative mx-auto w-[320px] h-[640px] bg-[#f0f2f5] rounded-[30px] border-[8px] border-slate-900 shadow-xl overflow-hidden flex flex-col">
                {/* Status Bar */}
                <div className="h-14 bg-[#075E54] flex items-end px-4 pb-2 text-white shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-300"></div>
                        <div>
                            <p className="text-xs font-semibold">Your Business</p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-3 relative bg-[#E5DDD5] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
                    <div className="bg-white rounded-lg rounded-tl-none shadow-sm max-w-[95%] mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {/* Header */}
                        {headerText && templateType === 'TEXT' && (
                            <div className="p-2 pb-0">
                                <p className="font-bold text-sm text-gray-900">{headerText}</p>
                            </div>
                        )}
                        {templateType === 'IMAGE' && (
                            <div className="p-1">
                                <div className="bg-slate-200 h-32 rounded flex items-center justify-center text-slate-400">
                                    <ImageIcon className="w-8 h-8" />
                                </div>
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-2 pt-1 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                            {bodyText.split(/({{.*?}})/g).map((part, i) => {
                                const match = part.match(/{{(\d+)}}/);
                                if (match) {
                                    const val = cachedParams[match[1]] || part;
                                    return <span key={i} className="font-bold bg-green-50 px-0.5 rounded border border-green-100">{val}</span>;
                                }
                                // Handle markdown bold/italic
                                // Simple render for preview
                                let content: any = part;
                                if (part.startsWith('*') && part.endsWith('*')) content = <b>{part.slice(1, -1)}</b>;
                                return <span key={i}>{content}</span>;
                            }) || <span className="text-gray-400 italic">Message body...</span>}
                        </div>

                        {/* Footer */}
                        {footerText && (
                            <div className="px-2 pb-1 text-[10px] text-gray-500">
                                {footerText}
                            </div>
                        )}

                        {/* Timestamp */}
                        <div className="px-2 pb-1 text-[10px] text-gray-400 text-right">
                            12:00 PM
                        </div>

                        {/* Buttons */}
                        {buttons.length > 0 && (
                            <div className="border-t border-gray-100">
                                {buttons.map((btn, idx) => (
                                    <div key={idx} className="h-10 flex items-center justify-center text-[#00a5f4] text-sm font-medium border-b border-gray-100 last:border-none cursor-pointer hover:bg-gray-50 transition-colors">
                                        {btn.type === 'URL' && <CornerDownRight className="w-3.5 h-3.5 mr-2" />}
                                        {btn.type === 'PHONE' && <Phone className="w-3.5 h-3.5 mr-2" />}
                                        {btn.text || 'Button'}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Box Fake */}
                <div className="h-12 bg-[#F0F2F5] flex items-center px-2 gap-2 shrink-0">
                    <Plus className="w-6 h-6 text-[#54656F]" />
                    <div className="flex-1 h-9 bg-white rounded-lg border-none"></div>
                    <div className="w-6 h-6 text-[#54656F]">🎤</div>
                </div>

            </div>
        </div>
    );
}
