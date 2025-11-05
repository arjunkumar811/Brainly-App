import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    LinkedIn = "linkedin",
    Facebook = "facebook",
    TikTok = "tiktok",
    Reddit = "reddit",
    GitHub = "github",
    StackOverflow = "stackoverflow",
    Medium = "medium",
    DevTo = "devto",
    Vimeo = "vimeo",
    Twitch = "twitch",
    Podcast = "podcast",
    GoogleDocs = "googledocs",
    Notion = "notion",
    Evernote = "evernote",
    Pinterest = "pinterest",
    Dribbble = "dribbble",
    Behance = "behance"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

// Platform-specific field configurations
const getPlatformConfig = (type: ContentType) => {
    const configs: Record<ContentType, { titleLabel: string; titlePlaceholder: string; linkLabel: string; linkPlaceholder: string }> = {
        [ContentType.Youtube]: {
            titleLabel: "Video Title",
            titlePlaceholder: "Enter YouTube video title",
            linkLabel: "Video URL",
            linkPlaceholder: "https://youtube.com/watch?v=..."
        },
        [ContentType.Twitter]: {
            titleLabel: "Tweet Description",
            titlePlaceholder: "Enter tweet description or title",
            linkLabel: "Tweet URL",
            linkPlaceholder: "https://twitter.com/user/status/..."
        },
        [ContentType.Instagram]: {
            titleLabel: "Post Title",
            titlePlaceholder: "Enter Instagram post title",
            linkLabel: "Post URL",
            linkPlaceholder: "https://instagram.com/p/..."
        },
        [ContentType.LinkedIn]: {
            titleLabel: "Post Title",
            titlePlaceholder: "Enter LinkedIn post title",
            linkLabel: "Post URL",
            linkPlaceholder: "https://linkedin.com/posts/..."
        },
        [ContentType.Facebook]: {
            titleLabel: "Post Title",
            titlePlaceholder: "Enter Facebook post title",
            linkLabel: "Post URL",
            linkPlaceholder: "https://facebook.com/..."
        },
        [ContentType.TikTok]: {
            titleLabel: "Video Title",
            titlePlaceholder: "Enter TikTok video title",
            linkLabel: "Video URL",
            linkPlaceholder: "https://tiktok.com/@user/video/..."
        },
        [ContentType.Reddit]: {
            titleLabel: "Post Title",
            titlePlaceholder: "Enter Reddit post title",
            linkLabel: "Post URL",
            linkPlaceholder: "https://reddit.com/r/.../comments/..."
        },
        [ContentType.GitHub]: {
            titleLabel: "Repository Name",
            titlePlaceholder: "Enter repository name (e.g., owner/repo-name)",
            linkLabel: "Repository URL",
            linkPlaceholder: "https://github.com/owner/repository"
        },
        [ContentType.StackOverflow]: {
            titleLabel: "Question Title",
            titlePlaceholder: "Enter Stack Overflow question title",
            linkLabel: "Question URL",
            linkPlaceholder: "https://stackoverflow.com/questions/..."
        },
        [ContentType.Medium]: {
            titleLabel: "Article Title",
            titlePlaceholder: "Enter Medium article title",
            linkLabel: "Article URL",
            linkPlaceholder: "https://medium.com/@author/article-title-..."
        },
        [ContentType.DevTo]: {
            titleLabel: "Article Title",
            titlePlaceholder: "Enter Dev.to article title",
            linkLabel: "Article URL",
            linkPlaceholder: "https://dev.to/username/article-title-..."
        },
        [ContentType.Vimeo]: {
            titleLabel: "Video Title",
            titlePlaceholder: "Enter Vimeo video title",
            linkLabel: "Video URL",
            linkPlaceholder: "https://vimeo.com/..."
        },
        [ContentType.Twitch]: {
            titleLabel: "Stream/Clip Title",
            titlePlaceholder: "Enter Twitch stream or clip title",
            linkLabel: "Stream/Clip URL",
            linkPlaceholder: "https://twitch.tv/..."
        },
        [ContentType.Podcast]: {
            titleLabel: "Episode Title",
            titlePlaceholder: "Enter podcast episode title",
            linkLabel: "Episode URL",
            linkPlaceholder: "https://podcasts.apple.com/... or Spotify link"
        },
        [ContentType.GoogleDocs]: {
            titleLabel: "Document Name",
            titlePlaceholder: "Enter Google Doc name",
            linkLabel: "Document URL",
            linkPlaceholder: "https://docs.google.com/document/d/..."
        },
        [ContentType.Notion]: {
            titleLabel: "Page Title",
            titlePlaceholder: "Enter Notion page title",
            linkLabel: "Page URL",
            linkPlaceholder: "https://notion.so/..."
        },
        [ContentType.Evernote]: {
            titleLabel: "Note Title",
            titlePlaceholder: "Enter Evernote note title",
            linkLabel: "Note URL",
            linkPlaceholder: "https://evernote.com/..."
        },
        [ContentType.Pinterest]: {
            titleLabel: "Pin Title",
            titlePlaceholder: "Enter Pinterest pin title",
            linkLabel: "Pin URL",
            linkPlaceholder: "https://pinterest.com/pin/..."
        },
        [ContentType.Dribbble]: {
            titleLabel: "Shot Title",
            titlePlaceholder: "Enter Dribbble shot title",
            linkLabel: "Shot URL",
            linkPlaceholder: "https://dribbble.com/shots/..."
        },
        [ContentType.Behance]: {
            titleLabel: "Project Title",
            titlePlaceholder: "Enter Behance project title",
            linkLabel: "Project URL",
            linkPlaceholder: "https://behance.net/gallery/..."
        }
    };
    
    return configs[type];
};

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const platformConfig = getPlatformConfig(type);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            if (titleRef.current) titleRef.current.value = '';
            if (linkRef.current) linkRef.current.value = '';
            setType(ContentType.Youtube);
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add content. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">Add New Content</h3>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                            >
                                <CrossIcon />
                            </button>
                        </div>
                    </div>

                    <div className="px-6 py-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content Type (20 Platforms)
                                </label>
                                <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
                                    <p className="text-xs text-gray-500 font-semibold">SOCIAL MEDIA</p>
                                    <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType(ContentType.Youtube)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Youtube
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                            YouTube
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Twitter)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Twitter
                                                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                            </svg>
                                            Twitter
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Instagram)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Instagram
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                            Instagram
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.LinkedIn)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.LinkedIn
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                            LinkedIn
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.GitHub)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.GitHub
                                                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            GitHub
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Reddit)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Reddit
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                                            </svg>
                                            Reddit
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Medium)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 col-span-2 ${
                                            type === ContentType.Medium
                                                ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                                            </svg>
                                            Medium
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Facebook)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Facebook
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                            Facebook
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.TikTok)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.TikTok
                                                ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                            </svg>
                                            TikTok
                                        </div>
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 font-semibold mt-3">PROFESSIONAL / DEV</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType(ContentType.StackOverflow)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.StackOverflow
                                                ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.093-10.473-2.201zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"/>
                                            </svg>
                                            Stack Overflow
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.DevTo)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.DevTo
                                                ? 'bg-gradient-to-r from-gray-900 to-black text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
                                            </svg>
                                            Dev.to
                                        </div>
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 font-semibold mt-3">VIDEO / CONTENT</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType(ContentType.Vimeo)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Vimeo
                                                ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797z"/>
                                            </svg>
                                            Vimeo
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Twitch)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Twitch
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                                            </svg>
                                            Twitch
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Podcast)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 col-span-2 ${
                                            type === ContentType.Podcast
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455c-3.614 0-6.545 2.931-6.545 6.545 0 2.462 1.357 4.607 3.364 5.736l.618-1.145c-1.628-.916-2.727-2.654-2.727-4.591 0-2.93 2.37-5.3 5.3-5.3s5.3 2.37 5.3 5.3c0 1.937-1.099 3.675-2.727 4.591l.618 1.145c2.007-1.129 3.364-3.274 3.364-5.736 0-3.614-2.931-6.545-6.565-6.545zm0 3.273c-1.806 0-3.273 1.467-3.273 3.272 0 1.283.74 2.388 1.818 2.918V19.09h2.91v-4.172c1.078-.53 1.818-1.635 1.818-2.918 0-1.805-1.467-3.272-3.273-3.272z"/>
                                            </svg>
                                            Podcast
                                        </div>
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 font-semibold mt-3">DOCUMENTS / NOTES</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType(ContentType.GoogleDocs)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.GoogleDocs
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818v1.364zm0-3.282H7.091V9.264h9.818v1.363zM14.727 6h6l-6-6v6z"/>
                                            </svg>
                                            Google Docs
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Notion)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Notion
                                                ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
                                            </svg>
                                            Notion
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Evernote)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 col-span-2 ${
                                            type === ContentType.Evernote
                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.222 5.393c0-1.198.68-1.736 1.92-1.736.198 0 .4.01.614.03V1.594C10.523 1.546 10.285 1.5 10.047 1.5c-2.238 0-3.85 1.382-3.85 3.881v10.66H2.333c-.344 0-.622.278-.622.622v4.337h4.51v-15.607zm3.558 12.95c0 .346.278.624.623.624h3.888c.345 0 .623-.278.623-.623V13h4.085c.346 0 .623-.278.623-.623V7.722c0-.346-.277-.623-.623-.623h-4.085V2.814c0-.345-.278-.623-.623-.623h-4.51c-.346 0-.624.278-.624.623v15.53z"/>
                                            </svg>
                                            Evernote
                                        </div>
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 font-semibold mt-3">DESIGN / OTHER</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType(ContentType.Pinterest)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Pinterest
                                                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                                            </svg>
                                            Pinterest
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Dribbble)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            type === ContentType.Dribbble
                                                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                                            </svg>
                                            Dribbble
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Behance)}
                                        className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 col-span-2 ${
                                            type === ContentType.Behance
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M0 7.87v8.26h6.537c1.457 0 2.755-.293 3.893-.88 1.14-.585 2.03-1.508 2.675-2.765.645-1.257.968-2.658.968-4.204 0-1.545-.323-2.947-.968-4.204-.645-1.256-1.535-2.178-2.675-2.764-1.138-.585-2.436-.878-3.893-.878H0zm3.527-3.726h2.55c.824 0 1.54.176 2.148.528.607.35 1.08.85 1.416 1.498.336.647.504 1.402.504 2.264 0 .86-.168 1.614-.504 2.262-.337.647-.81 1.147-1.416 1.497-.608.35-1.324.525-2.148.525h-2.55V4.143zM15.232 0h8.486v2.143h-8.486V0zM12.272 14.11c0 .76.14 1.42.42 1.98.28.56.68 1.03 1.2 1.41.52.38 1.13.66 1.83.84.7.18 1.47.27 2.31.27.85 0 1.63-.09 2.34-.27.71-.18 1.33-.46 1.85-.84.52-.38.94-.85 1.26-1.41.32-.56.48-1.22.48-1.98h-3.28c-.1.42-.32.77-.66 1.05-.34.28-.8.42-1.38.42-.58 0-1.04-.14-1.38-.42-.34-.28-.56-.63-.66-1.05h-3.28z"/>
                                            </svg>
                                            Behance
                                        </div>
                                    </button>
                                </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {platformConfig.titleLabel}
                                </label>
                                <Input 
                                    ref={titleRef} 
                                    placeholder={platformConfig.titlePlaceholder} 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {platformConfig.linkLabel}
                                </label>
                                <Input 
                                    ref={linkRef} 
                                    placeholder={platformConfig.linkPlaceholder} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addContent}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? 'Adding...' : 'Add Content'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
