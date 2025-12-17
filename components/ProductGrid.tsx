"use client";
import { useState, useEffect, useRef } from "react";
import { Play, ChevronRight, Clock, User, Star } from "lucide-react";

interface MediaItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  mentor: string;
  rating: number;
  lessons: number;
  youtubeUrl: string;
}

interface Category {
  name: string;
  description: string;
  items: MediaItem[];
}

// Function to generate unique YouTube link for each product
const getUniqueYoutubeLink = (id: number) => {
  // Base YouTube URL - you can replace this with your actual unique links
  const baseUrls = [
    "https://youtube.com/shorts/U_vmoSoAEFU?si=fJ5Pr7tzoAVzpdYQ",
    "https://youtube.com/shorts/3iQRDhiqbPg?si=GS6WgH5q-R1Vb0Mw",
    "https://youtube.com/shorts/example1?si=abc123",
    "https://youtube.com/shorts/example2?si=def456",
    "https://youtube.com/shorts/example3?si=ghi789",
    "https://youtube.com/shorts/example4?si=jkl012",
    "https://youtube.com/shorts/example5?si=mno345",
  ];
  
  // Use the ID to get a unique combination
  return `${baseUrls[id % baseUrls.length]}&vid=${id}`;
};

// Unique YouTube links for Inner Circle Trading section (20 videos)
const innerCircleTradingLinks = [
  // vid 1
  "https://youtube.com/shorts/U_vmoSoAEFU?si=fJ5Pr7tzoAVzpdYQ&feature=share",
  // vid 2
  "https://youtube.com/shorts/3iQRDhiqbPg?si=GS6WgH5q-R1Vb0Mw&feature=share",
  // vid 3
  "https://youtube.com/shorts/abcd1234efgh?si=ijkl5678&feature=share",
  // vid 4
  "https://youtube.com/shorts/mnop9012qrst?si=uvwx3456&feature=share",
  // vid 5
  "https://youtube.com/shorts/5678uvwxyza?si=bcde7890&feature=share",
  // vid 6
  "https://youtube.com/shorts/fghi1234jklm?si=nopq5678&feature=share",
  // vid 7
  "https://youtube.com/shorts/rstu9012vwxy?si=zabc3456&feature=share",
  // vid 8
  "https://youtube.com/shorts/defg7890hijk?si=lmno1234&feature=share",
  // vid 9
  "https://youtube.com/shorts/pqrs5678tuvw?si=xyza9012&feature=share",
  // vid 10
  "https://youtube.com/shorts/bcde3456fghi?si=jklm7890&feature=share",
  // vid 11
  "https://youtube.com/shorts/nopq1234rstu?si=vwxy5678&feature=share",
  // vid 12
  "https://youtube.com/shorts/zabc9012defg?si=hijk3456&feature=share",
  // vid 13
  "https://youtube.com/shorts/lmno7890pqrs?si=tuvw1234&feature=share",
  // vid 14
  "https://youtube.com/shorts/xyza5678bcde?si=fghi9012&feature=share",
  // vid 15
  "https://youtube.com/shorts/jklm3456nopq?si=rstu7890&feature=share",
  // vid 16
  "https://youtube.com/shorts/vwxy1234zabc?si=defg5678&feature=share",
  // vid 17
  "https://youtube.com/shorts/hijk9012lmno?si=pqrs3456&feature=share",
  // vid 18
  "https://youtube.com/shorts/tuvw7890xyza?si=bcde1234&feature=share",
  // vid 19
  "https://youtube.com/shorts/fghi5678jklm?si=nopq9012&feature=share",
  // vid 20
  "https://youtube.com/shorts/rstu3456vwxy?si=zabc7890&feature=share",
];

// Unique YouTube links for Gold Batch section (15 videos)
const goldBatchLinks = [
  // vid 1
  "https://youtube.com/shorts/gold1_abcdef?si=1234&feature=share",
  // vid 2
  "https://youtube.com/shorts/gold2_ghijkl?si=5678&feature=share",
  // vid 3
  "https://youtube.com/shorts/gold3_mnopqr?si=9012&feature=share",
  // vid 4
  "https://youtube.com/shorts/gold4_stuvwx?si=3456&feature=share",
  // vid 5
  "https://youtube.com/shorts/gold5_yzabcd?si=7890&feature=share",
  // vid 6
  "https://youtube.com/shorts/gold6_efghij?si=1234&feature=share",
  // vid 7
  "https://youtube.com/shorts/gold7_klmnop?si=5678&feature=share",
  // vid 8
  "https://youtube.com/shorts/gold8_qrstuv?si=9012&feature=share",
  // vid 9
  "https://youtube.com/shorts/gold9_wxyzab?si=3456&feature=share",
  // vid 10
  "https://youtube.com/shorts/gold10_cdefgh?si=7890&feature=share",
  // vid 11
  "https://youtube.com/shorts/gold11_ijklmn?si=1234&feature=share",
  // vid 12
  "https://youtube.com/shorts/gold12_opqrst?si=5678&feature=share",
  // vid 13
  "https://youtube.com/shorts/gold13_uvwxyz?si=9012&feature=share",
  // vid 14
  "https://youtube.com/shorts/gold14_abcdefg?si=3456&feature=share",
  // vid 15
  "https://youtube.com/shorts/gold15_hijklmn?si=7890&feature=share",
];

// Unique YouTube links for MACRO section (10 videos)
const macroLinks = [
  // vid 1
  "https://youtube.com/shorts/macro1_abc123?si=456&feature=share",
  // vid 2
  "https://youtube.com/shorts/macro2_def456?si=789&feature=share",
  // vid 3
  "https://youtube.com/shorts/macro3_ghi789?si=012&feature=share",
  // vid 4
  "https://youtube.com/shorts/macro4_jkl012?si=345&feature=share",
  // vid 5
  "https://youtube.com/shorts/macro5_mno345?si=678&feature=share",
  // vid 6
  "https://youtube.com/shorts/macro6_pqr678?si=901&feature=share",
  // vid 7
  "https://youtube.com/shorts/macro7_stu901?si=234&feature=share",
  // vid 8
  "https://youtube.com/shorts/macro8_vwx234?si=567&feature=share",
  // vid 9
  "https://youtube.com/shorts/macro9_yza567?si=890&feature=share",
  // vid 10
  "https://youtube.com/shorts/macro10_bcd890?si=123&feature=share",
];

// Unique YouTube links for Advanced Concepts section (20 videos)
const advancedConceptsLinks = [
  // vid 1
  "https://youtube.com/shorts/adv1_abc?si=123&feature=share",
  // vid 2
  "https://youtube.com/shorts/adv2_def?si=456&feature=share",
  // vid 3
  "https://youtube.com/shorts/adv3_ghi?si=789&feature=share",
  // vid 4
  "https://youtube.com/shorts/adv4_jkl?si=012&feature=share",
  // vid 5
  "https://youtube.com/shorts/adv5_mno?si=345&feature=share",
  // vid 6
  "https://youtube.com/shorts/adv6_pqr?si=678&feature=share",
  // vid 7
  "https://youtube.com/shorts/adv7_stu?si=901&feature=share",
  // vid 8
  "https://youtube.com/shorts/adv8_vwx?si=234&feature=share",
  // vid 9
  "https://youtube.com/shorts/adv9_yza?si=567&feature=share",
  // vid 10
  "https://youtube.com/shorts/adv10_bcd?si=890&feature=share",
  // vid 11
  "https://youtube.com/shorts/adv11_efg?si=123&feature=share",
  // vid 12
  "https://youtube.com/shorts/adv12_hij?si=456&feature=share",
  // vid 13
  "https://youtube.com/shorts/adv13_klm?si=789&feature=share",
  // vid 14
  "https://youtube.com/shorts/adv14_nop?si=012&feature=share",
  // vid 15
  "https://youtube.com/shorts/adv15_qrs?si=345&feature=share",
  // vid 16
  "https://youtube.com/shorts/adv16_tuv?si=678&feature=share",
  // vid 17
  "https://youtube.com/shorts/adv17_wxy?si=901&feature=share",
  // vid 18
  "https://youtube.com/shorts/adv18_zab?si=234&feature=share",
  // vid 19
  "https://youtube.com/shorts/adv19_cde?si=567&feature=share",
  // vid 20
  "https://youtube.com/shorts/adv20_fgh?si=890&feature=share",
];

// Unique YouTube links for Psychology section (5 videos)
const psychologyLinks = [
  // vid 1
  "https://youtube.com/shorts/psych1_abc?si=123&feature=share",
  // vid 2
  "https://youtube.com/shorts/psych2_def?si=456&feature=share",
  // vid 3
  "https://youtube.com/shorts/psych3_ghi?si=789&feature=share",
  // vid 4
  "https://youtube.com/shorts/psych4_jkl?si=012&feature=share",
  // vid 5
  "https://youtube.com/shorts/psych5_mno?si=345&feature=share",
];

// Reordered categories: Gold Batch, Inner Circle Trading, MACRO, Advanced Concepts, Psychology
const categories: Category[] = [
  {
    name: "Gold Batch",
    description: "Premium content for elite traders and investors",
    items: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Gold Strategy ${i + 1}: Institutional Methods`,
      description: `Exclusive trading methodologies used by top-performing hedge funds and institutional investors worldwide. Learn the secrets of market makers.`,
      duration: `${20 + i} min`,
      mentor: "Sarah Chen",
      rating: 4.9,
      lessons: i + 8,
      youtubeUrl: goldBatchLinks[i] || getUniqueYoutubeLink(i + 1)
    }))
  },
  {
    name: "Inner Circle Trading",
    description: "Learn advanced trading strategies and market analysis techniques",
    items: Array.from({ length: 20 }, (_, i) => ({
      id: i + 16,
      title: `Trading Strategy ${i + 1}: Advanced Scalping`,
      description: `Master professional trading techniques and risk management strategies for consistent profits in financial markets. This course covers everything from basic concepts to advanced algorithms used by hedge funds.`,
      duration: `${15 + i} min`,
      mentor: "James Anderson",
      rating: 4.8,
      lessons: i + 5,
      youtubeUrl: innerCircleTradingLinks[i] || getUniqueYoutubeLink(i + 16)
    }))
  },
  {
    name: "MACRO",
    description: "Global economic analysis and market trends",
    items: Array.from({ length: 10 }, (_, i) => ({
      id: i + 36,
      title: `Macro Analysis ${i + 1}: Global Economics`,
      description: `Understand global economic trends, central bank policies, and their impact on financial markets. Learn how to predict market movements.`,
      duration: `${25 + i} min`,
      mentor: "Michael Rodriguez",
      rating: 4.7,
      lessons: i + 6,
      youtubeUrl: macroLinks[i] || getUniqueYoutubeLink(i + 36)
    }))
  },
  {
    name: "Advanced Concepts",
    description: "Cutting-edge trading technologies and methodologies",
    items: Array.from({ length: 20 }, (_, i) => ({
      id: i + 46,
      title: `Advanced Concept ${i + 1}: AI Algorithms`,
      description: `Explore quantum trading, AI algorithms, and other next-generation trading technologies. Stay ahead of the curve with modern techniques.`,
      duration: `${30 + i} min`,
      mentor: "Dr. Alan Turing",
      rating: 4.8,
      lessons: i + 10,
      youtubeUrl: advancedConceptsLinks[i] || getUniqueYoutubeLink(i + 46)
    }))
  },
  {
    name: "Psychology",
    description: "Trading psychology and emotional control",
    items: Array.from({ length: 5 }, (_, i) => ({
      id: i + 66,
      title: `Mindset ${i + 1}: Emotional Discipline`,
      description: `Develop the mental fortitude and emotional discipline required for successful trading. Overcome fear, greed, and other psychological barriers.`,
      duration: `${10 + i} min`,
      mentor: "Dr. Emma Wilson",
      rating: 4.9,
      lessons: i + 4,
      youtubeUrl: psychologyLinks[i] || getUniqueYoutubeLink(i + 66)
    }))
  },
];

// Function to get category-specific image
const getCategoryImage = (categoryName: string) => {
  const imageMap: { [key: string]: string } = {
    "Inner Circle Trading": "/ICT.jpg",
    "Gold Batch": "/GB.jpg",
    "MACRO": "/MC.jpg",
    "Psychology": "/PHY.jpg",
    "Advanced Concepts": "/AC.jpg"
  };
  
  return imageMap[categoryName] || "/default.jpg";
};

// Color themes changed to: blue, red, rose, purple, green
const getCategoryColor = (categoryIndex: number) => {
  const colors = [
    { accent: 'border-blue-500', text: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:bg-blue-100', overlay: 'bg-blue-600/30' }, // Blue
    { accent: 'border-red-500', text: 'text-red-600', bg: 'bg-red-50', hover: 'hover:bg-red-100', overlay: 'bg-red-600/30' }, // Red
    { accent: 'border-rose-500', text: 'text-rose-600', bg: 'bg-rose-50', hover: 'hover:bg-rose-100', overlay: 'bg-rose-600/30' }, // Rose
    { accent: 'border-purple-500', text: 'text-purple-600', bg: 'bg-purple-50', hover: 'hover:bg-purple-100', overlay: 'bg-purple-600/30' }, // Purple
    { accent: 'border-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', overlay: 'bg-emerald-600/30' }, // Green
  ];
  return colors[categoryIndex % colors.length];
};

export default function NetflixStyleCategoryGrid() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({
    "Gold Batch": false,
    "Inner Circle Trading": false,
    "MACRO": false,
    "Advanced Concepts": false,
    "Psychology": false
  });
  const [touchMode, setTouchMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  // Detect touch devices and screen size
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchMode(isTouchDevice);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleCardHover = (itemId: number, isEntering: boolean) => {
    if (touchMode) return;
    setHoveredItem(isEntering ? itemId : null);
  };

  const handleCardClick = (itemId: number) => {
    if (touchMode) {
      setHoveredItem(hoveredItem === itemId ? null : itemId);
    }
  };

  const handleWatchNow = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">

      <div className="max-w-7xl mx-auto">
        {/* Categories Grid */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
          {categories.map((category, catIndex) => {
            const color = getCategoryColor(catIndex);
            const isExpanded = expandedCategories[category.name];
            const categoryImage = getCategoryImage(category.name);
            
            // Desktop: 5 items when collapsed, Mobile: 1 item when collapsed
            const initialItems = isMobile ? 1 : 5;
            const displayItems = isExpanded ? category.items : category.items.slice(0, initialItems);
            const hasMoreItems = category.items.length > initialItems;
            
            return (
              <section key={category.name} className="space-y-4 sm:space-y-6">
                {/* Category Header with Background Image and Color Overlay */}
                <div 
                  className={`relative overflow-hidden rounded-lg p-4 sm:p-6 border-l-4 ${color.accent}`}
                  style={{
                    backgroundImage: `url(/hero.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  {/* Color Overlay */}
                  <div className={`absolute inset-0 ${color.overlay} backdrop-blur-[2px]`} />
                  
                  {/* Dark Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                            {category.name}
                          </h2>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${color.text} bg-white/90 backdrop-blur-sm w-fit`}>
                            {category.items.length} videos
                          </span>
                        </div>
                        <p className="text-white/90 text-sm sm:text-base drop-shadow-md">{category.description}</p>
                      </div>
                      {hasMoreItems && (
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm ${color.text} hover:bg-white transition-colors w-full sm:w-auto`}
                        >
                          <span className="text-sm font-medium">
                            {isExpanded ? 'Show Less' : `Show All ${category.items.length}`}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className={`grid ${
                  isMobile && !isExpanded ? 'grid-cols-1' : 
                  'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
                } gap-3 sm:gap-4`}>
                  {displayItems.map((item, index) => (
                    <div
                      key={item.id}
                      ref={(el) => { cardRefs.current[item.id] = el; }}
                      className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] sm:hover:scale-[1.05] border border-gray-200 hover:border-gray-300"
                      onMouseEnter={() => handleCardHover(item.id, true)}
                      onMouseLeave={() => handleCardHover(item.id, false)}
                      onClick={() => handleCardClick(item.id)}
                    >
                      {/* Image Container with Blur Effect */}
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        hoveredItem === item.id ? 'filter blur-sm' : ''
                      }`}>
                        <div 
                          className="w-full h-full bg-gradient-to-br from-gray-900 to-black"
                          style={{
                            backgroundImage: `url(${categoryImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>

                      {/* Default Content Overlay */}
                      <div className="absolute inset-0 p-3 flex flex-col justify-end">
                        {/* Title */}
                        <h3 className="text-xs sm:text-sm font-medium text-white line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        
                        {/* Metadata */}
                        <div className="flex items-center gap-2 mt-1 text-[10px] xs:text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {item.rating}
                          </span>
                        </div>
                      </div>

                      {/* Hover Overlay - Shows inside the image */}
                      <div className={`absolute inset-0 bg-black/60 transition-all duration-300 flex flex-col justify-center items-center text-white p-4 text-center ${
                        hoveredItem === item.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}>
                        {/* Mentor Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="font-medium text-sm sm:text-base">{item.mentor}</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-xs sm:text-sm line-clamp-3 mb-4">
                          {item.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">{item.rating}</div>
                            <div className="text-xs text-gray-300">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">{item.lessons}</div>
                            <div className="text-xs text-gray-300">Lessons</div>
                          </div>
                        </div>
                        
                        {/* Watch Now Button */}
                        <button 
                          onClick={() => handleWatchNow(item.youtubeUrl)}
                          className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                        >
                          <Play className="w-4 h-4" />
                          Watch Now
                        </button>
                        
                        {/* Video Number Indicator (only on hover) */}
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          Video {index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More/Less Indicator */}
                {hasMoreItems && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg ${color.text} ${color.bg} ${color.hover} transition-colors text-sm font-medium`}
                    >
                      {isExpanded ? 'Show Less' : `Show ${category.items.length - initialItems} More Videos`}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Stats Section - Responsive */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">70</div>
              <div className="text-gray-600 text-xs sm:text-sm">Total Videos</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">35h</div>
              <div className="text-gray-600 text-xs sm:text-sm">Content Duration</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">5</div>
              <div className="text-gray-600 text-xs sm:text-sm">Categories</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600 text-xs sm:text-sm">Access</div>
            </div>
          </div>
        </div>

        {/* Mobile Touch Instructions */}
        {touchMode && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Tap on any video to see details. Tap again to close.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}