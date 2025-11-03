import { TwitterIcon } from '../icons/TwitterIcon';
import { YouTubeIcon } from '../icons/YouTubeIcon';
import { BrainIcon } from "../icons/BrainIcon";
import { InstagramIcon } from '../icons/InstagramIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { RedditIcon } from '../icons/RedditIcon';
import { MediumIcon } from '../icons/MediumIcon';
import { FacebookIcon } from '../icons/FacebookIcon';
import { TikTokIcon } from '../icons/TikTokIcon';
import { StackOverflowIcon } from '../icons/StackOverflowIcon';
import { DevToIcon } from '../icons/DevToIcon';
import { VimeoIcon } from '../icons/VimeoIcon';
import { TwitchIcon } from '../icons/TwitchIcon';
import { PodcastIcon } from '../icons/PodcastIcon';
import { GoogleDocsIcon } from '../icons/GoogleDocsIcon';
import { NotionIcon } from '../icons/NotionIcon';
import { EvernoteIcon } from '../icons/EvernoteIcon';
import { PinterestIcon } from '../icons/PinterestIcon';
import { DribbbleIcon } from '../icons/DribbbleIcon';
import { BehanceIcon } from '../icons/BehanceIcon';

type FilterType = 'all' | 'youtube' | 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'tiktok' | 'reddit' | 
                  'github' | 'stackoverflow' | 'medium' | 'devto' | 'vimeo' | 'twitch' | 'podcast' | 
                  'googledocs' | 'notion' | 'evernote' | 'pinterest' | 'dribbble' | 'behance';

interface SideBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    youtube: number;
    twitter: number;
    instagram: number;
    linkedin: number;
    facebook: number;
    tiktok: number;
    reddit: number;
    github: number;
    stackoverflow: number;
    medium: number;
    devto: number;
    vimeo: number;
    twitch: number;
    podcast: number;
    googledocs: number;
    notion: number;
    evernote: number;
    pinterest: number;
    dribbble: number;
    behance: number;
  };
}

export function SideBar({ activeFilter, onFilterChange, stats }: SideBarProps) {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 text-black overflow-y-auto">
  
<div className="flex text-xl pl-4 font-montserrat cursor-pointer pt-4">
  <div className="pr-1 flex items-center text-purple-600 cursor-pointer"><BrainIcon /></div>
    Brainly
</div>

<div className="pt-8 px-4 pb-24">
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

  <button
    onClick={() => onFilterChange('instagram')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'instagram'
        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <InstagramIcon />
      <span className="font-medium">Instagram</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'instagram' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.instagram}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('linkedin')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'linkedin'
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <LinkedInIcon />
      <span className="font-medium">LinkedIn</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'linkedin' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.linkedin}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('github')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'github'
        ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <GitHubIcon />
      <span className="font-medium">GitHub</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'github' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.github}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('reddit')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'reddit'
        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <RedditIcon />
      <span className="font-medium">Reddit</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'reddit' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.reddit}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('medium')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'medium'
        ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <MediumIcon />
      <span className="font-medium">Medium</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'medium' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.medium}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('facebook')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'facebook'
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <FacebookIcon />
      <span className="font-medium">Facebook</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'facebook' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.facebook}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('tiktok')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'tiktok'
        ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <TikTokIcon />
      <span className="font-medium">TikTok</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'tiktok' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.tiktok}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('stackoverflow')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'stackoverflow'
        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <StackOverflowIcon />
      <span className="font-medium">Stack Overflow</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'stackoverflow' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.stackoverflow}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('devto')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'devto'
        ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <DevToIcon />
      <span className="font-medium">Dev.to</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'devto' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.devto}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('vimeo')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'vimeo'
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <VimeoIcon />
      <span className="font-medium">Vimeo</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'vimeo' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.vimeo}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('twitch')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'twitch'
        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <TwitchIcon />
      <span className="font-medium">Twitch</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'twitch' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.twitch}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('podcast')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'podcast'
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <PodcastIcon />
      <span className="font-medium">Podcast</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'podcast' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.podcast}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('googledocs')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'googledocs'
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <GoogleDocsIcon />
      <span className="font-medium">Google Docs</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'googledocs' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.googledocs}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('notion')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'notion'
        ? 'bg-gradient-to-r from-gray-800 to-black text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <NotionIcon />
      <span className="font-medium">Notion</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'notion' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.notion}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('evernote')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'evernote'
        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <EvernoteIcon />
      <span className="font-medium">Evernote</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'evernote' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.evernote}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('pinterest')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'pinterest'
        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <PinterestIcon />
      <span className="font-medium">Pinterest</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'pinterest' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.pinterest}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('dribbble')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'dribbble'
        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <DribbbleIcon />
      <span className="font-medium">Dribbble</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'dribbble' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.dribbble}
    </span>
  </button>

  <button
    onClick={() => onFilterChange('behance')}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg mb-2 transition-all ${
      activeFilter === 'behance'
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center gap-3">
      <BehanceIcon />
      <span className="font-medium">Behance</span>
    </div>
    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
      activeFilter === 'behance' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
    }`}>
      {stats.behance}
    </span>
  </button>
</div>

    </div>
}