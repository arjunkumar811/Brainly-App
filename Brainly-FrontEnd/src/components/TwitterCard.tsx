import { useEffect, useRef } from 'react';
import { twitterWidgetManager } from '../utils/twitterWidget';

interface TwitterCardProps {
    tweetId: string;
    link: string;
}

export function TwitterCard({ tweetId, link }: TwitterCardProps) {
    const tweetRef = useRef<HTMLDivElement>(null);
    const hasRendered = useRef(false);

    useEffect(() => {
        if (tweetId && tweetRef.current && !hasRendered.current) {
            hasRendered.current = true;
            twitterWidgetManager.renderTweet(tweetId, tweetRef.current);
        }
    }, [tweetId]);

    return (
        <div className="relative w-full bg-white flex items-center justify-center min-h-[200px]">
            {/* Tweet container - Twitter widget will render here */}
            <div ref={tweetRef} className="w-full flex justify-center p-4" />
            
            {/* Fallback link */}
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 text-xs text-blue-500 hover:text-blue-700 underline"
            >
                View on Twitter ↗
            </a>
            
            {/* Platform badge */}
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-semibold">
                Twitter
            </div>
        </div>
    );
}
