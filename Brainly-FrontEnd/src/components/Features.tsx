import { Link2, Twitter, FileText, Search, Tag, Share2 } from 'lucide-react';


const features = [
  {
    icon: Link2,
    title: 'Save Important Links',
    description: 'Bookmark and organize links with custom tags and notes for easy reference.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Twitter,
    title: 'Twitter Integration',
    description: 'Save and organize your favorite tweets directly from Twitter.',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    icon: FileText,
    title: 'Document Storage',
    description: 'Store and organize your documents with powerful search capabilities.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find anything instantly with our powerful search engine.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Tag,
    title: 'Custom Tags',
    description: 'Create your own organization system with custom tags and categories.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your collections with team members or make them public.',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              POWERFUL FEATURES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you manage your digital life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
              
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
