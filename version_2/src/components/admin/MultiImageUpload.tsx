import { useState, useRef, DragEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, X, Plus, Image as ImageIcon, Link as LinkIcon, Smartphone, Monitor } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MultiImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
}

export default function MultiImageUpload({ images, onImagesChange }: MultiImageUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Handle local files - in this demo we alert, 
            // in real app we'd upload to cloud storage
            alert("Local file upload requires cloud storage setup. In this demo, please use the URL import for high-quality synced images.");
        }
    };

    const addImage = (url: string) => {
        if (url && !images.includes(url)) {
            onImagesChange([...images, url]);
            setUrlInput('');
        }
    };

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div 
                className={cn(
                    "relative group p-10 rounded-[40px] border-2 border-dashed transition-all flex flex-col items-center justify-center text-center",
                    dragActive ? "border-[#f59e0b] bg-amber-50" : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#f59e0b]"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="w-20 h-20 bg-white rounded- [32px] shadow-2xl shadow-gray-200/50 flex items-center justify-center text-gray-300 group-hover:text-[#f59e0b] mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <UploadCloud size={40} />
                </div>
                <h4 className="text-lg font-black text-gray-900 tracking-tight uppercase italic">Drop Premium Images</h4>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2 mb-8">Supports High-Res JPG, PNG, WEBP</p>
                
                <div className="flex flex-wrap justify-center gap-4">
                    <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#f59e0b] transition-all shadow-xl shadow-gray-100 active:scale-95"
                    >
                        <Monitor size={14} /> Desktop Upload
                    </button>
                    <div className="hidden md:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                        <Smartphone size={14} className="text-[#f59e0b]" />
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Any Device Sync Active</span>
                    </div>
                </div>

                <input 
                    ref={fileInputRef}
                    type="file" 
                    multiple 
                    className="hidden" 
                    accept="image/*"
                    onChange={() => alert("Local file upload requires cloud storage setup. Use URLs for now.")}
                />
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <LinkIcon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f59e0b] transition-colors" />
                    <input 
                        type="url" 
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addImage(urlInput);
                            }
                        }}
                        placeholder="Import via High-Res URL (Enter to Add)..."
                        className="w-full bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-6 pl-14 pr-32 outline-none font-bold text-sm transition-all"
                    />
                    <button 
                        type="button"
                        onClick={() => addImage(urlInput)}
                        className="absolute right-3 top-3 bottom-3 bg-gray-900 text-white px-6 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-[#f59e0b] transition-all"
                    >
                        Import Link
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {images.map((img, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                className="aspect-square relative group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm"
                            >
                                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                                >
                                    <X size={14} />
                                </button>
                                {i === 0 && (
                                    <div className="absolute bottom-3 left-3 px-4 py-1.5 bg-[#f59e0b] text-white text-[8px] font-black uppercase tracking-widest rounded-xl shadow-lg italic">
                                        Primary Master
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
