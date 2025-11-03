import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
                                    Content Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setType(ContentType.Youtube)}
                                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            type === ContentType.Youtube
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                            YouTube
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setType(ContentType.Twitter)}
                                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            type === ContentType.Twitter
                                                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg transform scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                            </svg>
                                            Twitter
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <Input 
                                    ref={titleRef} 
                                    placeholder="Enter content title" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Link
                                </label>
                                <Input 
                                    ref={linkRef} 
                                    placeholder="Paste your link here" 
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
