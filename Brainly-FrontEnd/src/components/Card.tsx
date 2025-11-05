import { ShareIcon } from './../icons/ShareIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { InstagramIcon } from '../icons/InstagramIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { RedditIcon } from '../icons/RedditIcon';
import { MediumIcon } from '../icons/MediumIcon';
import { TwitterCard } from './TwitterCard';
import { useState, useEffect, useRef } from 'react';

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "linkedin" | "facebook" | "tiktok" | "reddit" | 
          "github" | "stackoverflow" | "medium" | "devto" | "vimeo" | "twitch" | "podcast" | 
          "googledocs" | "notion" | "evernote" | "pinterest" | "dribbble" | "behance";
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

const getInstagramId = (url: string) => {
    const match = url.match(/(?:instagram\.com\/(?:p|reel)\/)([\w-]+)/);
    return match ? match[1] : null;
};

const getGitHubRepo = (url: string) => {
    const match = url.match(/github\.com\/([\w-]+\/[\w-]+)/);
    return match ? match[1] : null;
};

const getPlatformConfig = (type: string) => {
    const configs = {
        youtube: { color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-600', gradient: 'from-red-500 to-red-600' },
        twitter: { color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-600', gradient: 'from-blue-400 to-blue-600' },
        instagram: { color: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-600', gradient: 'from-pink-500 to-purple-600' },
        linkedin: { color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-700', gradient: 'from-blue-600 to-blue-700' },
        github: { color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800', gradient: 'from-gray-700 to-gray-900' },
        reddit: { color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
        medium: { color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-900', gradient: 'from-gray-800 to-black' },
    };
    return configs[type as keyof typeof configs] || configs.youtube;
};

export function Card({title, link, type, contentId, onDelete}: CardProps) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);
    
    const videoId = type === "youtube" ? getYouTubeVideoId(link) : null;
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    const tweetId = type === "twitter" ? getTweetId(link) : null;
    const instagramId = type === "instagram" ? getInstagramId(link) : null;
    const githubRepo = type === "github" ? getGitHubRepo(link) : null;
    const platformConfig = getPlatformConfig(type);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShowShareMenu(false);
            }
        };

        if (showShareMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showShareMenu]);

    const handleCardClick = () => {
        window.open(link, '_blank');
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this content?')) {
            onDelete(contentId);
        }
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowShareMenu(!showShareMenu);
    };

    const copyToClipboard = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowShareMenu(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareVia = (platform: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const encodedUrl = encodeURIComponent(link);
        const encodedTitle = encodeURIComponent(title);
        
        let shareUrl = '';
        
        switch(platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            setShowShareMenu(false);
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
                    <div className="relative w-full bg-white min-h-[200px]">
                        <TwitterCard tweetId={tweetId} link={link} />
                    </div>
                )}

                {type === "instagram" && instagramId && (
                    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-purple-400 via-pink-500 to-red-400">
                        <iframe 
                            src={`https://www.instagram.com/p/${instagramId}/embed/`}
                            className="w-full h-full"
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency={true}
                        />
                        <div className="absolute bottom-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                            Instagram
                        </div>
                    </div>
                )}

                {type === "linkedin" && (
                    <div className="relative w-full aspect-video overflow-hidden bg-blue-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="scale-[2] mb-4">
                                    <LinkedInIcon />
                                </div>
                                <p className="text-sm font-semibold">LinkedIn Post</p>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded font-semibold">
                            LinkedIn
                        </div>
                    </div>
                )}

                {type === "github" && githubRepo && (
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white p-4">
                                <div className="scale-[2] mb-4">
                                    <GitHubIcon />
                                </div>
                                <p className="text-sm font-mono">{githubRepo}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded font-semibold">
                            GitHub
                        </div>
                    </div>
                )}

                {type === "reddit" && (
                    <div className="relative w-full aspect-video overflow-hidden bg-orange-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="scale-[2] mb-4">
                                    <RedditIcon />
                                </div>
                                <p className="text-sm font-semibold">Reddit Post</p>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                            Reddit
                        </div>
                    </div>
                )}

                {type === "medium" && (
                    <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="scale-[2] mb-4">
                                    <MediumIcon />
                                </div>
                                <p className="text-sm font-semibold">Medium Article</p>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded font-semibold">
                            Medium
                        </div>
                    </div>
                )}

                <div className="p-3 flex flex-col group-hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex gap-2 mb-2">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${platformConfig.bgColor}`}>
                            {type === "youtube" && (
                                <svg className={`w-4 h-4 ${platformConfig.textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            )}
                            {type === "twitter" && (
                                <svg className={`w-4 h-4 ${platformConfig.textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            )}
                            {type === "instagram" && (
                                <div className={platformConfig.textColor}><InstagramIcon /></div>
                            )}
                            {type === "linkedin" && (
                                <div className={platformConfig.textColor}><LinkedInIcon /></div>
                            )}
                            {type === "github" && (
                                <div className={platformConfig.textColor}><GitHubIcon /></div>
                            )}
                            {type === "reddit" && (
                                <div className={platformConfig.textColor}><RedditIcon /></div>
                            )}
                            {type === "medium" && (
                                <div className={platformConfig.textColor}><MediumIcon /></div>
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
                        <div className="flex items-center gap-1 relative">
                            <div className="relative" ref={shareMenuRef}>
                                <button 
                                    className='p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all transform hover:scale-110'
                                    onClick={handleShare}
                                    title="Share"
                                >
                                    <ShareIcon />
                                </button>
                                
                                {showShareMenu && (
                                    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 min-w-[220px] z-50 animate-slideDown">
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={copyToClipboard}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                {copied ? (
                                                    <>
                                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-sm font-medium text-green-600">Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm font-medium text-gray-700">Copy Link</span>
                                                    </>
                                                )}
                                            </button>
                                            
                                            <div className="border-t border-gray-100 my-1"></div>
                                            
                                            <button
                                                onClick={(e) => shareVia('twitter', e)}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">Twitter</span>
                                            </button>
                                            
                                            <button
                                                onClick={(e) => shareVia('facebook', e)}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                                            </button>
                                            
                                            <button
                                                onClick={(e) => shareVia('linkedin', e)}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                                            </button>
                                            
                                            <button
                                                onClick={(e) => shareVia('whatsapp', e)}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                                            </button>
                                            
                                            <button
                                                onClick={(e) => shareVia('telegram', e)}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">Telegram</span>
                                            </button>
                                            
                                            <button
                                                onClick={(e) => shareVia('email', e)}
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left w-full"
                                            >
                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">Email</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <button 
                                className='p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all transform hover:scale-110'
                                onClick={handleDelete}
                                title="Delete"
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