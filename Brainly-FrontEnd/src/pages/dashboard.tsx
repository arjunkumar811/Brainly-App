import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlushIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { CreateContentModal } from '../components/CreateContentModal';
import { useState, useMemo } from 'react';
import { SideBar } from '../components/SideBar';
import { useContent } from '../hooks/useContent';
import { Card } from './../components/Card';
import axios from 'axios';
import { BACKEND_URL } from '../config';

type FilterType = 'all' | 'youtube' | 'twitter';

export function DashBoard() {
const [modelOpen, setModelOpen] = useState(false);
const [activeFilter, setActiveFilter] = useState<FilterType>('all');
const [searchQuery, setSearchQuery] = useState('');
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
    <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />}></Button> 
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
    </div>
    
  )
}
