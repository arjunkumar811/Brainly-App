import { useEffect, useRef, useState } from 'react';
import { twitterWidgetManager } from '../utils/twitterWidget';

interface TwitterCardProps {
    tweetId: string;
    link: string;
}

export function TwitterCard({ tweetId, link }: TwitterCardProps) {
    const tweetRef = useRef<HTMLDivElement>(null);
    const hasRendered = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (tweetId && tweetRef.current && !hasRendered.current) {
            hasRendered.current = true;
            twitterWidgetManager.renderTweet(
                tweetId, 
                tweetRef.current,
                {},
                () => {
                    setIsLoading(false);
                }
            );
        }
    }, [tweetId]);

    return (
        <div className="relative w-full bg-white flex items-center justify-center min-h-[200px]">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="text-sm text-gray-600">Loading tweet...</p>
                    </div>
                </div>
            )}
            
            <div ref={tweetRef} className="w-full flex justify-center p-4" />
            
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 text-xs text-blue-500 hover:text-blue-700 underline"
            >
                View on Twitter ↗
            </a>
            
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-semibold">
                Twitter
            </div>
        </div>
    );
}
