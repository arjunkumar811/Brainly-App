import { Link2, Twitter, FileText, Search, Tag, Share2 } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: Link2,
    title: 'Save Important Links',
    description: 'Bookmark and organize links with custom tags and notes for easy reference.'
  },
  {
    icon: Twitter,
    title: 'Twitter Integration',
    description: 'Save and organize your favorite tweets directly from Twitter.'
  },
  {
    icon: FileText,
    title: 'Document Storage',
    description: 'Store and organize your documents with powerful search capabilities.'
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find anything instantly with our powerful search engine.'
  },
  {
    icon: Tag,
    title: 'Custom Tags',
    description: 'Create your own organization system with custom tags and categories.'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your collections with team members or make them public.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need in One Place
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Powerful features to help you manage your digital life
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4 transition-transform duration-300 transform hover:scale-125" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
