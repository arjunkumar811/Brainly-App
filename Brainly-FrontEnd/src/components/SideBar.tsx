import { TwitterIcon } from '../icons/TwitterIcon';
import { YouTubeIcon } from '../icons/YouTubeIcon';
import { BrainIcon } from "../icons/BrainIcon";

type FilterType = 'all' | 'youtube' | 'twitter';

interface SideBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    youtube: number;
    twitter: number;
  };
}

export function SideBar({ activeFilter, onFilterChange, stats }: SideBarProps) {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 text-black">
  
<div className="flex text-xl pl-4 font-montserrat cursor-pointer pt-4">
  <div className="pr-1 flex items-center text-purple-600 cursor-pointer"><BrainIcon /></div>
    Brainly
</div>

<div className="pt-8 px-4">
  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Categories</h3>
  
  <button
    onClick={() => onFilterChange('all')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'all'
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <span className="font-medium">All Content</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'all' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.total}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('youtube')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'youtube'
        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <YouTubeIcon />
      <span className="font-medium">YouTube</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'youtube' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.youtube}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('twitter')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'twitter'
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <TwitterIcon />
      <span className="font-medium">Twitter</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'twitter' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.twitter}
    </span>
  </button>
</div>

<div className="absolute bottom-0 left-0 right-0 p-4 border-t">
  <div className="flex items-center gap-3 px-3 py-2">
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
      A
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-800">Arjun Kumar</p>
      <p className="text-xs text-gray-500">arjun@example.com</p>
    </div>
  </div>
</div>

    </div>
}