import { ShareIcon } from './../icons/ShareIcon';
import { NoteBookIcon } from '../icons/NoteBookIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { YouTubeIcon } from '../icons/YouTubeIcon';
import { TwitterIcon } from '../icons/TwitterIcon';
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        twttr: any;
    }
}

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    contentId: string;
    onDelete: (contentId: string) => void;
}

const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
};

const getTweetId = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
};

export function Card({title, link, type, contentId, onDelete}: CardProps) {
    const videoId = type === "youtube" ? getYouTubeVideoId(link) : null;
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    const tweetId = type === "twitter" ? getTweetId(link) : null;
    const tweetRef = useRef<HTMLDivElement>(null);
    const hasRendered = useRef(false);

    useEffect(() => {
        if (type === "twitter" && tweetId && tweetRef.current && window.twttr?.widgets && !hasRendered.current) {
            hasRendered.current = true;
            tweetRef.current.innerHTML = '';
            window.twttr.widgets.createTweet(
                tweetId,
                tweetRef.current,
                {
                    theme: 'light',
                    conversation: 'none',
                    cards: 'visible',
                    width: 550
                }
            );
        }
    }, [type, tweetId]);

    const handleCardClick = () => {
        if (type === "youtube") {
            window.open(link, '_blank');
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this content?')) {
            onDelete(contentId);
        }
    };

    return (
        <div className="group h-fit">
            <div 
                onClick={handleCardClick}
                className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col cursor-pointer h-fit"
            >
                {type === "youtube" && thumbnailUrl && (
                    <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <img 
                            src={thumbnailUrl} 
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-red-600 rounded-full p-4 transform scale-90 group-hover:scale-100 opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-2xl">
                                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>

                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-semibold">
                            YouTube
                        </div>
                    </div>
                )}

                {type === "twitter" && tweetId && (
                    <div className="relative w-full bg-white">
                        <div 
                            ref={tweetRef} 
                            className="w-full flex justify-center"
                        />
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                            Twitter
                        </div>
                    </div>
                )}

                <div className="p-3 flex flex-col group-hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex gap-2 mb-2">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${type === "youtube" ? "bg-red-100" : "bg-blue-100"}`}>
                            {type === "youtube" ? (
                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-purple-600 transition-colors">{title}</h3>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <a 
                            href={link} 
                            target='_blank' 
                            rel="noopener noreferrer"
                            className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open
                        </a>
                        <div className="flex items-center gap-1">
                            <button 
                                className='p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all transform hover:scale-110'
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ShareIcon />
                            </button>
                            <button 
                                className='p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all transform hover:scale-110'
                                onClick={handleDelete}
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}