import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlushIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { CreateContentModal } from '../components/CreateContentModal';
import { useState, useMemo } from 'react';
import { SideBar } from '../components/SideBar';
import { useContent } from '../hooks/useContent';
import { Card } from './../components/Card';
import axios from 'axios';
import { BACKEND_URL, FRONTEND_URL } from '../config';

type FilterType = 'all' | 'youtube' | 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'tiktok' | 'reddit' | 
                  'github' | 'stackoverflow' | 'medium' | 'devto' | 'vimeo' | 'twitch' | 'podcast' | 
                  'googledocs' | 'notion' | 'evernote' | 'pinterest' | 'dribbble' | 'behance';

export function DashBoard() {
const [modelOpen, setModelOpen] = useState(false);
const [activeFilter, setActiveFilter] = useState<FilterType>('all');
const [searchQuery, setSearchQuery] = useState('');
const [shareModalOpen, setShareModalOpen] = useState(false);
const [shareLink, setShareLink] = useState('');
const [copied, setCopied] = useState(false);
const { content, refreshContent } = useContent();

const filteredContent = useMemo(() => {
  let filtered = content;
  
  if (activeFilter !== 'all') {
    filtered = filtered.filter((item: any) => item.type === activeFilter);
  }
  
  if (searchQuery) {
    filtered = filtered.filter((item: any) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
}, [content, activeFilter, searchQuery]);

const stats = useMemo(() => {
  return {
    total: content.length,
    youtube: content.filter((item: any) => item.type === 'youtube').length,
    twitter: content.filter((item: any) => item.type === 'twitter').length,
    instagram: content.filter((item: any) => item.type === 'instagram').length,
    linkedin: content.filter((item: any) => item.type === 'linkedin').length,
    facebook: content.filter((item: any) => item.type === 'facebook').length,
    tiktok: content.filter((item: any) => item.type === 'tiktok').length,
    reddit: content.filter((item: any) => item.type === 'reddit').length,
    github: content.filter((item: any) => item.type === 'github').length,
    stackoverflow: content.filter((item: any) => item.type === 'stackoverflow').length,
    medium: content.filter((item: any) => item.type === 'medium').length,
    devto: content.filter((item: any) => item.type === 'devto').length,
    vimeo: content.filter((item: any) => item.type === 'vimeo').length,
    twitch: content.filter((item: any) => item.type === 'twitch').length,
    podcast: content.filter((item: any) => item.type === 'podcast').length,
    googledocs: content.filter((item: any) => item.type === 'googledocs').length,
    notion: content.filter((item: any) => item.type === 'notion').length,
    evernote: content.filter((item: any) => item.type === 'evernote').length,
    pinterest: content.filter((item: any) => item.type === 'pinterest').length,
    dribbble: content.filter((item: any) => item.type === 'dribbble').length,
    behance: content.filter((item: any) => item.type === 'behance').length,
  };
}, [content]);

const handleDelete = async (contentId: string) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        'Authorization': token
      },
      data: {
        contentId: contentId
      }
    });
    refreshContent();
  } catch (error) {
    console.error('Error deleting content:', error);
    alert('Failed to delete content');
  }
};

const handleShareBrain = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, 
      { share: true },
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    const hash = response.data.hash;
    const fullLink = `${FRONTEND_URL}/brain/${hash}`;
    setShareLink(fullLink);
    setShareModalOpen(true);
  } catch (error) {
    console.error('Error creating share link:', error);
    alert('Failed to create share link');
  }
};

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

  return (
<div className="bg-gray-50 min-h-screen">

   <SideBar activeFilter={activeFilter} onFilterChange={setActiveFilter} stats={stats} />

    <div className='p-8 ml-72 min-h-screen'> 
<CreateContentModal open={modelOpen} onClose={() => {
  setModelOpen(false);
  refreshContent();
}}/>

<div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-800 mb-2">My Brain</h1>
  <p className="text-gray-600">Organize and manage your saved content</p>
</div>

<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div className="flex-1">
      <div className="relative">
        <input
          type="text"
          placeholder="Search your content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
        <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
    
    <div className="flex gap-2">
      <button
        onClick={() => setActiveFilter('all')}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          activeFilter === 'all'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All ({stats.total})
      </button>
      <button
        onClick={() => setActiveFilter('youtube')}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          activeFilter === 'youtube'
            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        YouTube ({stats.youtube})
      </button>
      <button
        onClick={() => setActiveFilter('twitter')}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${
          activeFilter === 'twitter'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Twitter ({stats.twitter})
      </button>
    </div>
  </div>
</div>

<div className="flex justify-end gap-4 mb-8">
    <Button onClick={() => {
      setModelOpen(true)
    }}  variant='primary' text='Add Content' startIcon={<PlusIcon />}></Button> 
    <Button onClick={handleShareBrain} variant='secondary' text='Share Brain' startIcon={<ShareIcon />}></Button> 
    </div>
    
    {filteredContent.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-white rounded-full p-6 mb-4 shadow-lg">
          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {searchQuery ? 'No results found' : activeFilter === 'all' ? 'No content yet' : `No ${activeFilter} content`}
        </h3>
        <p className="text-gray-500 mb-6">
          {searchQuery ? 'Try a different search term' : 'Start adding content to organize your brain'}
        </p>
        {!searchQuery && (
          <Button onClick={() => setModelOpen(true)} variant='primary' text='Add Your First Content' startIcon={<PlusIcon />} />
        )}
      </div>
    ) : (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {searchQuery ? `Search results (${filteredContent.length})` : 
             activeFilter === 'all' ? `All Content (${filteredContent.length})` : 
             `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} (${filteredContent.length})`}
          </h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
            <option>Sort by: Recent</option>
            <option>Sort by: Title</option>
            <option>Sort by: Type</option>
          </select>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredContent.map(({type, link, title, _id }: any) => 
            <div key={_id} className="break-inside-avoid mb-6">
              <Card type={type} link={link} title={title} contentId={_id} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>
    )}

    </div>

    {shareModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShareModalOpen(false)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Share Your Brain
            </h2>
            <button 
              onClick={() => setShareModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Share this link with anyone to give them view-only access to all your saved content.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-purple-200">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 outline-none text-gray-700 text-sm bg-transparent"
              />
              <button
                onClick={copyShareLink}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Share via:</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=Check%20out%20my%20Second%20Brain!`, '_blank');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Twitter</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`, '_blank');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`, '_blank');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://wa.me/?text=${encodeURIComponent('Check out my Second Brain: ' + shareLink)}`, '_blank');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=Check%20out%20my%20Second%20Brain!`, '_blank');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Telegram</span>
              </button>

              <button
                onClick={() => {
                  window.location.href = `mailto:?subject=Check%20out%20my%20Second%20Brain&body=${encodeURIComponent(shareLink)}`;
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Email</span>
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">Public Access</p>
                <p className="text-xs text-yellow-700">Anyone with this link can view all your saved content. To revoke access, you can delete the share link from your settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    
    </div>
    
  )
}
