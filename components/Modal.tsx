import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { InteractiveObject, Post } from '../types';

// --- Sub-component: Post List Card ---
const PostCard: React.FC<{ post: Post; index: number; onRead: (post: Post) => void }> = ({ post, index, onRead }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group bg-white border border-slate/20 hover:border-gold/50 rounded-sm p-5 shadow-sm hover:shadow-lg transition-all duration-300"
    >
        <div className="flex flex-col md:flex-row gap-4">
            {post.image && (
                <div className="w-full md:w-1/3 h-32 overflow-hidden rounded-sm relative bg-slate/10">
                    <AnimatePresence>
                        {!imgLoaded && (
                            <motion.div 
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-gradient-to-r from-slate/10 via-slate/20 to-slate/10 animate-pulse"
                            />
                        )}
                    </AnimatePresence>
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div>
            )}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-bold text-midnight/60 uppercase tracking-wider bg-slate/10 px-2 py-1 rounded-full">
                        {post.category}
                    </span>
                    <span className="text-[10px] text-slate/40">•</span>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider bg-midnight/5 px-2 py-1 rounded-full">
                        {post.subcategory}
                    </span>
                </div>
                <h3 className="text-xl font-serif text-midnight mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                <p className="text-slate text-sm font-sans leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                </p>
                <button 
                    onClick={() => onRead(post)}
                    className="flex items-center gap-2 text-midnight text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
                >
                    Read Entry <ArrowRight size={14} className="text-gold" />
                </button>
            </div>
        </div>
    </motion.div>
  );
};

// --- Sub-component: Post Reader ---
const PostReader: React.FC<{ post: Post; onBack: () => void }> = ({ post, onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex flex-col h-full bg-paper"
        >
             <div className="p-8 pb-4 border-b border-gold/20 flex items-center justify-between bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate hover:text-midnight transition-colors uppercase text-xs font-bold tracking-widest"
                >
                    <ArrowLeft size={16} /> Back to Archives
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-8 md:p-12">
                 <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col items-center mb-6 gap-2">
                        <span className="text-slate/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                            {post.category}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-gold" />
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                            {post.subcategory}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif text-midnight mb-8 text-center leading-tight">
                        {post.title}
                    </h1>
                    
                    {post.image && (
                        <div className="w-full h-64 md:h-80 overflow-hidden rounded-sm mb-10 shadow-lg border border-gold/20">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div 
                        className="prose prose-lg prose-slate font-serif first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-gold"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    
                    <div className="mt-16 pt-8 border-t border-slate/10 text-center">
                        <div className="inline-block w-8 h-8 rounded-full bg-midnight mb-2" />
                        <p className="text-xs text-slate uppercase tracking-widest">Sacred Science Archives</p>
                    </div>
                 </div>
             </div>
        </motion.div>
    );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InteractiveObject | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Reset inner state when modal closes or data changes
  useEffect(() => {
    if (!isOpen) {
        // slight delay to avoid flicker during exit anim
        const timer = setTimeout(() => setSelectedPost(null), 300);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center md:justify-end md:pr-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.div
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full md:w-[700px] h-full bg-paper shadow-2xl flex flex-col border-l-4 border-gold overflow-hidden"
        >
          <div className="absolute top-6 right-6 z-20">
             <button 
                onClick={onClose}
                className="text-slate hover:text-gold bg-paper/80 backdrop-blur rounded-full p-2 transition-colors shadow-sm"
            >
                <X size={24} />
            </button>
          </div>

          {/* Render List or Reader */}
          <AnimatePresence mode="wait">
              {selectedPost ? (
                  <PostReader 
                    key="reader" 
                    post={selectedPost} 
                    onBack={() => setSelectedPost(null)} 
                  />
              ) : (
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                      {/* Header */}
                      <div className="p-8 pb-8 bg-midnight text-paper relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                            <img src="https://www.transparenttextures.com/patterns/victorian-pattern.png" alt="" className="w-64 h-64" />
                        </div>
                        
                        <div className="flex flex-col items-start gap-1 mb-2">
                             <span className="text-gold/60 text-[10px] font-sans uppercase tracking-[0.2em]">
                                {data.posts[0]?.category || 'Archives'}
                             </span>
                             <span className="text-gold text-xs font-sans uppercase tracking-[0.2em] font-bold">
                                {data.name}
                             </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif text-paper mb-2">{data.description}</h2>
                        
                        <div className="w-12 h-1 bg-gold mt-4" />
                      </div>

                      {/* Scrollable List */}
                      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-paper">
                        {data.posts.map((post, idx) => (
                            <PostCard 
                                key={post.id} 
                                post={post} 
                                index={idx} 
                                onRead={setSelectedPost}
                            />
                        ))}
                        
                        <div className="pt-8 text-center pb-8">
                            <p className="text-slate/40 text-sm font-serif italic">~ End of Archives ~</p>
                        </div>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;