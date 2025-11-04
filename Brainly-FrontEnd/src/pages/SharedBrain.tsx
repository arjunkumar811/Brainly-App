import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Card } from '../components/Card';
import { BrainIcon } from '../icons/BrainIcon';

interface SharedContent {
    _id: string;
    title: string;
    link: string;
    type: string;
}

interface SharedBrainData {
    name: string;
    email: string;
    content: SharedContent[];
}

export function SharedBrain() {
    const { shareId } = useParams<{ shareId: string }>();
    const [brainData, setBrainData] = useState<SharedBrainData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSharedBrain = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
                setBrainData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load shared brain. The link may be invalid or expired.');
                setLoading(false);
            }
        };

        if (shareId) {
            fetchSharedBrain();
        }
    }, [shareId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading shared brain...</p>
                </div>
            </div>
        );
    }

    if (error || !brainData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Brain Not Found</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <BrainIcon />
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Second Brain
                            </span>
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                        >
                            Create Your Own
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                                {brainData.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{brainData.name}'s Brain</h1>
                            <p className="text-gray-600">Shared collection of saved content</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="font-medium">{brainData.content.length} items saved</span>
                    </div>
                </div>

                {brainData.content.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Content Yet</h3>
                        <p className="text-gray-500">This brain doesn't have any saved content.</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Saved Content</h2>
                        </div>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {brainData.content.map((item) => (
                                <div key={item._id} className="break-inside-avoid mb-6">
                                    <Card
                                        type={item.type as any}
                                        link={item.link}
                                        title={item.title}
                                        contentId={item._id}
                                        onDelete={() => {}}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-8 text-center">
                    <p className="text-gray-600 mb-4">Want to create your own Second Brain?</p>
                    <Link
                        to="/signup"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                        Get Started for Free
                    </Link>
                </div>
            </footer>
        </div>
    );
}
