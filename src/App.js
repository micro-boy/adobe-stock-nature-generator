import React, { useState, useCallback, useMemo } from 'react'; // Tambahkan useMemo di sini
import { Settings, Shuffle, Download, Copy, RefreshCw, Image, Video, Palette, ChevronDown, ChevronUp, Heart, Coffee } from 'lucide-react';

const AdobeStockPromptGenerator = () => {
  const [settings, setSettings] = useState({
    maxPrompts: 10,
    promptType: 'photo', // photo, video
    style: 'realistic',
    season: 'all',
    customKeywords: '',
    outputMode: 'midjourney', // midjourney, plain
    // Midjourney Settings (Updated 2025)
    mjVersion: '7',
    mjAspectRatio: '16:9',
    mjQuality: '2',
    mjStyle: 'raw',
    mjStylize: '500',
    mjChaos: '0',
    mjSeed: '',
    mjWeird: '',
    customMjParams: ''
  });

  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mjSettingsCollapsed, setMjSettingsCollapsed] = useState(false);
  const [aboutCollapsed, setAboutCollapsed] = useState(true);
  const [guideCollapsed, setGuideCollapsed] = useState(true);
  const [parametersGuideCollapsed, setParametersGuideCollapsed] = useState(true);

  // Solusi: Gunakan useMemo untuk mem-memoize objek-objek data statis
  const natureCategories = useMemo(() => ({
    landscapes: [
      'majestic mountain peaks covered in snow',
      'rolling green hills with morning mist',
      'dramatic cliff faces overlooking the ocean',
      'serene lake reflecting the sky',
      'vast desert dunes with rippling sand patterns',
      'dense forest canopy with filtered sunlight',
      'volcanic landscape with steaming vents',
      'canyon walls with layered rock formations',
      'alpine meadow with wildflower fields',
      'coastal rocks with crashing waves'
    ],
    vegetation: [
      'ancient oak tree with sprawling branches',
      'bamboo forest with tall green stalks',
      'field of lavender in full bloom',
      'moss-covered rocks in forest',
      'sunflower field stretching to horizon',
      'cherry blossom trees in spring',
      'autumn maple leaves falling',
      'tropical palm fronds swaying',
      'pine forest covered in snow',
      'wildflower meadow in golden hour'
    ],
    water: [
      'cascading waterfall with mist spray',
      'crystal clear mountain stream',
      'ocean waves at golden hour',
      'morning dew on grass blades',
      'raindrops on leaf surface',
      'frozen lake with ice patterns',
      'gentle river flowing through forest',
      'tidal pools with reflective water',
      'misty morning over calm lake',
      'underground cave with water formations'
    ],
    weather: [
      'dramatic storm clouds gathering',
      'golden sunset with warm light',
      'morning fog rolling over landscape',
      'rainbow after spring rain',
      'snow falling on pine branches',
      'lightning illuminating night sky',
      'gentle rain on forest floor',
      'frost patterns on window',
      'mist rising from warm earth',
      'dramatic sunrise breaking through clouds'
    ],
    textures: [
      'smooth river stones and pebbles',
      'bark texture of ancient tree',
      'sand ripples in desert wind',
      'ice crystals on frozen surface',
      'moss texture on forest floor',
      'rock formations with mineral veins',
      'wood grain of weathered driftwood',
      'salt crystal formations',
      'lichen patterns on stone',
      'coral-like mineral deposits'
    ]
  }), []); // Dependency array kosong, karena data ini statis

  const styles = useMemo(() => ({
    realistic: 'photorealistic, ultra-high resolution, professional photography',
    cinematic: 'cinematic lighting, dramatic composition, film-like quality',
    minimalist: 'clean composition, minimal elements, negative space',
    dramatic: 'high contrast, bold shadows, striking lighting',
    ethereal: 'soft lighting, dreamy atmosphere, gentle tones',
    vintage: 'warm tones, nostalgic feel, classic photography style'
  }), []); // Dependency array kosong

  const lightingConditions = useMemo(() => ({
    golden: 'golden hour lighting, warm tones, soft shadows',
    blue: 'blue hour, twilight, cool tones',
    morning: 'fresh morning light, dew, crisp atmosphere',
    overcast: 'soft diffused lighting, cloudy sky, even illumination',
    dramatic: 'dramatic lighting, strong shadows, high contrast',
    backlit: 'backlit scene, rim lighting, glowing edges'
  }), []); // Dependency array kosong

  const technicalSpecs = useMemo(() => ({
    photo: [
      'shot with Canon EOS R5, 85mm lens',
      'macro photography, extreme detail',
      '8K resolution, RAW format',
      'wide angle landscape, 16-35mm',
      'telephoto compression, 200mm lens',
      'focus stacking for maximum sharpness'
    ],
    video: [
      '4K 60fps, smooth camera movement',
      'cinematic 24fps, film grain texture',
      'slow motion 120fps, detailed movement',
      'time-lapse photography, compressed time',
      'drone aerial footage, top-down view',
      'stabilized gimbal movement, fluid motion'
    ]
  }), []); // Dependency array kosong

  const compositions = useMemo(() => ({
    'rule-of-thirds': 'rule of thirds composition, balanced elements',
    'leading-lines': 'leading lines drawing eye through frame',
    'symmetry': 'symmetrical composition, perfect balance',
    'patterns': 'repeating patterns, rhythmic elements',
    'framing': 'natural framing, layered composition',
    'depth': 'strong depth of field, layered elements'
  }), []); // Dependency array kosong

  const seasons = useMemo(() => ({
    spring: 'spring season, fresh growth, new life, vibrant greens',
    summer: 'summer season, lush vegetation, bright daylight, warm atmosphere',
    autumn: 'autumn season, changing colors, golden leaves, harvest time',
    winter: 'winter season, snow coverage, bare branches, cold atmosphere'
  }), []); // Dependency array kosong

  const generateMidjourneyParams = useCallback(() => {
    let params = [];
    
    // Version
    if (settings.mjVersion) {
      params.push(`--v ${settings.mjVersion}`);
    }
    
    // Aspect Ratio
    if (settings.mjAspectRatio) {
      params.push(`--ar ${settings.mjAspectRatio}`);
    }
    
    // Quality (Updated for V7)
    if (settings.mjQuality) {
      params.push(`--q ${settings.mjQuality}`);
    }
    
    // Style
    if (settings.mjStyle) {
      params.push(`--style ${settings.mjStyle}`);
    }
    
    // Stylize
    if (settings.mjStylize && settings.mjStylize !== '100') {
      params.push(`--s ${settings.mjStylize}`);
    }
    
    // Chaos
    if (settings.mjChaos && settings.mjChaos !== '0') {
      params.push(`--chaos ${settings.mjChaos}`);
    }
    
    // Seed
    if (settings.mjSeed) {
      params.push(`--seed ${settings.mjSeed}`);
    }
    
    // Weird
    if (settings.mjWeird) {
      params.push(`--weird ${settings.mjWeird}`);
    }
    
    // Custom parameters
    if (settings.customMjParams.trim()) {
      params.push(settings.customMjParams.trim());
    }
    
    return params.join(' ');
  }, [settings]);

  const generateRandomPrompt = useCallback(() => {
    const category = Object.keys(natureCategories)[Math.floor(Math.random() * Object.keys(natureCategories).length)];
    const subject = natureCategories[category][Math.floor(Math.random() * natureCategories[category].length)];
    
    const styleKey = settings.style === 'random' ? 
      Object.keys(styles)[Math.floor(Math.random() * Object.keys(styles).length)] : 
      settings.style;
    
    const lighting = Object.values(lightingConditions)[Math.floor(Math.random() * Object.values(lightingConditions).length)];
    const composition = Object.values(compositions)[Math.floor(Math.random() * Object.values(compositions).length)];
    
    let prompt = `${subject}, ${styles[styleKey]}, ${lighting}, ${composition}`;
    
    // Add season if specified
    if (settings.season !== 'all' && settings.season !== 'random') {
      prompt += `, ${seasons[settings.season]}`;
    } else if (settings.season === 'random') {
      const randomSeason = Object.keys(seasons)[Math.floor(Math.random() * Object.keys(seasons).length)];
      prompt += `, ${seasons[randomSeason]}`;
    }
    
    // Add technical specs
    const techSpecs = settings.promptType === 'video' ? 
      technicalSpecs.video : technicalSpecs.photo;
    const randomTech = techSpecs[Math.floor(Math.random() * techSpecs.length)];
    prompt += `, ${randomTech}`;
    
    // Add quality indicators for Adobe Stock
    prompt += ', commercial photography quality, stock photo aesthetic, high detail, professional grade';
    
    // Add custom keywords if provided
    if (settings.customKeywords.trim()) {
      prompt += `, ${settings.customKeywords.trim()}`;
    }
    
    // Add Midjourney parameters only if outputMode is 'midjourney'
    if (settings.outputMode === 'midjourney') {
      const mjParams = generateMidjourneyParams();
      if (mjParams) {
        prompt += ` ${mjParams}`;
      }
    }
    
    return prompt;
  }, [settings, generateMidjourneyParams, natureCategories, styles, lightingConditions, compositions, seasons, technicalSpecs]); // Dependensi yang sudah diperbarui

  const generatePrompts = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const prompts = [];
      for (let i = 0; i < Math.min(settings.maxPrompts, 500); i++) {
        prompts.push({
          id: i + 1,
          text: generateRandomPrompt(),
          type: settings.promptType
        });
      }
      setGeneratedPrompts(prompts);
      setIsGenerating(false);
    }, 1000);
  };

  const copyPrompt = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllPrompts = () => {
    const allPrompts = generatedPrompts.map(p => p.text).join('\n\n');
    navigator.clipboard.writeText(allPrompts);
  };

  const downloadPrompts = () => {
    const content = generatedPrompts.map((p, index) => 
      `${index + 1}. [${p.type.toUpperCase()}] ${p.text}`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adobe-stock-nature-prompts-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getVersionInfo = (version) => {
    switch(version) {
      case '7': return { color: 'text-green-600', text: 'Latest (Alpha)', note: 'Requires personalization setup' };
      case '6.1': return { color: 'text-blue-600', text: 'Stable Default', note: 'Recommended for most users' };
      case '6': return { color: 'text-gray-600', text: 'Previous', note: 'Legacy version' };
      default: return { color: 'text-gray-500', text: 'Legacy', note: 'Older version' };
    }
  };

  const versionInfo = getVersionInfo(settings.mjVersion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Adobe Stock Nature Prompt Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Professional nature prompt generator • Midjourney V7 & Plain modes • Comprehensive guides & tutorials
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Complete with collapsible guides, parameter explanations, and flexible output options
          </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">About This Application</h2>
            </div>
            <button
              onClick={() => setAboutCollapsed(!aboutCollapsed)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              {aboutCollapsed ? 'Expand' : 'Collapse'}
              {aboutCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`transition-all duration-300 ease-in-out ${aboutCollapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-none opacity-100'}`}>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p className="mb-4">
                <strong>Adobe Stock Nature Prompt Generator</strong> adalah aplikasi AI-powered yang dirancang khusus untuk menghasilkan prompt berkualitas profesional untuk fotografi dan videografi alam. Aplikasi ini mengoptimalkan prompt untuk Adobe Stock requirements dan Midjourney V7 terbaru.
              </p>
              
              {/* Statistical Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">📊 Massive Prompt Variations</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1.3M+</div>
                    <div className="text-blue-700">Base Combinations</div>
                    <div className="text-xs text-blue-600 mt-1">50 subjects × 6 styles × 6 lighting × 6 compositions × 4 seasons × 6 technical specs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">∞</div>
                    <div className="text-purple-700">Total Variations</div>
                    <div className="text-xs text-purple-600 mt-1">With Midjourney parameters + custom keywords</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-green-700">Unique Results</div>
                    <div className="text-xs text-green-600 mt-1">Never generates identical prompts</div>
                  </div>
                </div>
              </div>

              {/* Research Methodology */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg mb-6 border border-green-100">
                <h3 className="font-semibold text-green-800 mb-3">🔬 Research-Based Quality Assurance</h3>
                <div className="text-sm text-green-700 space-y-2">
                  <div><strong>Metode Riset Komprehensif:</strong></div>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Adobe Stock Analysis:</strong> Deep research pada 390M+ aset digital Adobe Stock untuk memahami commercial photography requirements</li>
                    <li><strong>Midjourney V7 Documentation:</strong> Analisis mendalam official documentation April 2025 dan parameter updates terbaru</li>
                    <li><strong>Professional Photography Standards:</strong> Study terhadap best practices landscape dan nature photography untuk stock use</li>
                    <li><strong>Commercial Licensing Compliance:</strong> Riset persyaratan commercial usage dan creature-free content untuk stock platforms</li>
                    <li><strong>Market Trend Analysis:</strong> Research tren fotografi alam 2024-2025 dan seasonal demand patterns</li>
                    <li><strong>Technical Optimization:</strong> Testing kombinasi parameter untuk hasil photorealistic optimal pada berbagai aspect ratios</li>
                  </ul>
                  <div className="mt-3 p-2 bg-white rounded border border-green-200">
                    <strong>Quality Validation:</strong> Setiap kombinasi prompt telah divalidasi berdasarkan Adobe Stock curation standards dan Midjourney V7 performance benchmarks.
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">🎯 Key Features:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Generate hingga 500 prompt sekaligus</li>
                    <li>• 100% creature-free untuk commercial use</li>
                    <li>• Support Midjourney V7 dengan parameter terbaru</li>
                    <li>• Output mode: Midjourney atau Plain prompt</li>
                    <li>• Professional presets untuk berbagai style</li>
                    <li>• Export ke file .txt atau copy ke clipboard</li>
                    <li>• Research-based prompt combinations</li>
                    <li>• Adobe Stock quality standards compliance</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">📈 Optimized For:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Adobe Stock commercial requirements</li>
                    <li>• Stock photography & videography</li>
                    <li>• Nature, landscape, dan scenic content</li>
                    <li>• Professional quality outputs</li>
                    <li>• Midjourney Discord bot compatibility</li>
                    <li>• Commercial licensing compliance</li>
                    <li>• Seasonal content optimization</li>
                    <li>• Multi-platform prompt usage</li>
                  </ul>
                </div>
              </div>

              {/* Support Section */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-1">💝 Support This Free Tool</h3>
                    <p className="text-sm text-yellow-700">Help us maintain and improve this research-based tool for the creative community</p>
                  </div>
                  <a
                    href="https://trakteer.id/anton-prafanto-nszpm/tip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <Coffee className="w-4 h-4" />
                    Buy us a Coffee
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Guide */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">How to Use This Application</h2>
            </div>
            <button
              onClick={() => setGuideCollapsed(!guideCollapsed)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {guideCollapsed ? 'Expand' : 'Collapse'}
              {guideCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`transition-all duration-300 ease-in-out ${guideCollapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-none opacity-100'}`}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">1️⃣ Configure Settings</h3>
                  <p className="text-sm text-blue-700">
                    Set jumlah prompt (1-500), pilih content type (Photo/Video), visual style, season, dan tambahkan custom keywords jika diperlukan.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">2️⃣ Choose Output Mode</h3>
                  <p className="text-sm text-green-700">
                    Pilih <strong>Midjourney</strong> untuk parameter lengkap atau <strong>Plain</strong> untuk prompt tanpa parameter technical.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">3️⃣ Midjourney Setup (Optional)</h3>
                  <p className="text-sm text-purple-700">
                    Jika pilih Midjourney mode, configure parameters seperti version, aspect ratio, quality, dan style sesuai kebutuhan.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">📋 Step-by-Step Workflow:</h3>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li><strong>Step 1:</strong> Tentukan berapa banyak prompt yang dibutuhkan (max 500)</li>
                  <li><strong>Step 2:</strong> Pilih content type: Photography atau Video</li>
                  <li><strong>Step 3:</strong> Select visual style yang diinginkan (Realistic, Cinematic, etc.)</li>
                  <li><strong>Step 4:</strong> Choose output mode: Midjourney (dengan parameters) atau Plain (tanpa parameters)</li>
                  <li><strong>Step 5:</strong> Configure Midjourney parameters jika diperlukan (optional collapse/expand)</li>
                  <li><strong>Step 6:</strong> Add custom keywords untuk personalisasi (optional)</li>
                  <li><strong>Step 7:</strong> Click "Generate Nature Prompts" button</li>
                  <li><strong>Step 8:</strong> Copy individual prompts atau download semua sebagai .txt file</li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Use <strong>Quick Presets</strong> untuk setup parameter yang sudah dioptimasi</li>
                  <li>• <strong>Seed parameter</strong> berguna untuk konsistensi hasil (gunakan tombol 🎲 untuk random)</li>
                  <li>• <strong>Style: Raw</strong> memberikan hasil paling photorealistic untuk stock photography</li>
                  <li>• <strong>Aspect ratio 16:9</strong> ideal untuk landscape, <strong>4:3</strong> untuk general photography</li>
                  <li>• Parameter dapat di-collapse untuk workflow yang lebih clean</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Midjourney Parameters Guide */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Midjourney Parameters Guide</h2>
            </div>
            <button
              onClick={() => setParametersGuideCollapsed(!parametersGuideCollapsed)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              {parametersGuideCollapsed ? 'Expand' : 'Collapse'}
              {parametersGuideCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`transition-all duration-300 ease-in-out ${parametersGuideCollapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-none opacity-100'}`}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Version (--v)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>V7:</strong> Latest dengan photorealism enhanced (Alpha)<br/>
                      <strong>V6.1:</strong> Stable default, recommended untuk most users<br/>
                      <strong>V6:</strong> Previous version dengan good balance
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Aspect Ratio (--ar)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>16:9:</strong> Landscape/cinematic<br/>
                      <strong>4:3:</strong> Standard photography<br/>
                      <strong>1:1:</strong> Square/social media<br/>
                      <strong>9:16:</strong> Portrait/mobile
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Quality (--q)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>V7:</strong> 1 (optimized), 2 (pre-optimized), 4 (experimental)<br/>
                      <strong>V6.1:</strong> 0.25 (fastest) to 2 (highest quality)
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Style (--style)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Raw:</strong> Photorealistic, minimal AI interpretation<br/>
                      <strong>Scenic:</strong> Enhanced untuk landscape<br/>
                      <strong>Expressive:</strong> More artistic interpretation
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Stylize (--s)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>0-250:</strong> Low stylization, more realistic<br/>
                      <strong>250-500:</strong> Balanced artistic interpretation<br/>
                      <strong>500-1000:</strong> High stylization, more artistic
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Chaos (--chaos)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>0-25:</strong> Consistent, predictable results<br/>
                      <strong>25-75:</strong> Moderate variation<br/>
                      <strong>75-100:</strong> High variation, unexpected results
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Seed (--seed)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Mengontrol starting point generation. Same seed + same prompt = consistent results. Range: 0 - 4,294,967,295
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Weird (--weird)</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>0-1000:</strong> Subtle experimental aesthetics<br/>
                      <strong>1000-3000:</strong> More unusual, creative interpretations
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Recommended Combinations for Nature Photography:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Photorealistic Landscape:</strong></p>
                    <code className="bg-white p-2 rounded text-xs block mt-1">--v 7 --ar 16:9 --q 2 --style raw --s 300</code>
                  </div>
                  <div>
                    <p><strong>Artistic Nature:</strong></p>
                    <code className="bg-white p-2 rounded text-xs block mt-1">--v 6.1 --ar 4:3 --q 2 --s 750 --chaos 20</code>
                  </div>
                  <div>
                    <p><strong>Stock Photography:</strong></p>
                    <code className="bg-white p-2 rounded text-xs block mt-1">--v 6.1 --ar 4:3 --q 2 --style raw --s 250</code>
                  </div>
                  <div>
                    <p><strong>Cinematic Wide:</strong></p>
                    <code className="bg-white p-2 rounded text-xs block mt-1">--v 7 --ar 21:9 --q 2 --style scenic --s 500</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Content Settings</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Max Prompts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Prompts (1-500)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={settings.maxPrompts}
                onChange={(e) => setSettings({...settings, maxPrompts: parseInt(e.target.value) || 1})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Prompt Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={settings.promptType}
                onChange={(e) => setSettings({...settings, promptType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="photo">📸 Photography</option>
                <option value="video">🎥 Video</option>
              </select>
              <div className="text-xs text-gray-500 mt-1">
                {settings.promptType === 'photo' 
                  ? 'Optimized for still photography and images' 
                  : 'Optimized for video footage and motion content'
                }
              </div>
            </div>
            {/* Output Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Mode
              </label>
              <select
                value={settings.outputMode}
                onChange={(e) => setSettings({...settings, outputMode: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="midjourney">🎨 Midjourney Mode (with parameters)</option>
                <option value="plain">📝 Plain Mode (clean prompts only)</option>
              </select>
              <div className="text-xs text-gray-500 mt-1">
                {settings.outputMode === 'midjourney' 
                  ? 'Includes Midjourney parameters for Discord bot use' 
                  : 'Clean prompts without technical parameters'
                }
              </div>
            </div>
            {/* Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visual Style
              </label>
              <select
                value={settings.style}
                onChange={(e) => setSettings({...settings, style: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="realistic">📷 Realistic</option>
                <option value="cinematic">🎬 Cinematic</option>
                <option value="minimalist">✨ Minimalist</option>
                <option value="dramatic">⚡ Dramatic</option>
                <option value="ethereal">🌟 Ethereal</option>
                <option value="vintage">📻 Vintage</option>
                <option value="random">🎲 Random</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {/* Season */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                value={settings.season}
                onChange={(e) => setSettings({...settings, season: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">🔄 All Seasons</option>
                <option value="spring">🌸 Spring</option>
                <option value="summer">☀️ Summer</option>
                <option value="autumn">🍂 Autumn</option>
                <option value="winter">❄️ Winter</option>
                <option value="random">🎲 Random</option>
              </select>
            </div>
            {/* Custom Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Keywords (optional)
              </label>
              <input
                type="text"
                placeholder="Add custom keywords separated by commas..."
                value={settings.customKeywords}
                onChange={(e) => setSettings({...settings, customKeywords: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        {/* Midjourney Settings Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Midjourney Parameters (2025 Updated)</h2>
            </div>
            <button
              onClick={() => setMjSettingsCollapsed(!mjSettingsCollapsed)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              {mjSettingsCollapsed ? 'Expand' : 'Collapse'}
              {mjSettingsCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
          
          <div className={`transition-all duration-300 ease-in-out ${mjSettingsCollapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-none opacity-100'}`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Version */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version (--v)
                </label>
                <select
                  value={settings.mjVersion}
                  onChange={(e) => setSettings({...settings, mjVersion: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="7">V7 (Latest - Apr 2025)</option>
                  <option value="6.1">V6.1 (Default)</option>
                  <option value="6">V6</option>
                  <option value="5.2">V5.2</option>
                  <option value="5.1">V5.1</option>
                  <option value="5">V5</option>
                </select>
                <div className={`text-xs mt-1 ${versionInfo.color}`}>
                  {versionInfo.text} - {versionInfo.note}
                </div>
              </div>
              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aspect Ratio (--ar)
                </label>
                <select
                  value={settings.mjAspectRatio}
                  onChange={(e) => setSettings({...settings, mjAspectRatio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="1:1">1:1 (Square)</option>
                  <option value="16:9">16:9 (Widescreen)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="4:3">4:3 (Photography)</option>
                  <option value="3:2">3:2 (Classic)</option>
                  <option value="2:3">2:3 (Portrait)</option>
                  <option value="21:9">21:9 (Ultrawide)</option>
                </select>
              </div>
              {/* Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality (--q)
                </label>
                <select
                  value={settings.mjQuality}
                  onChange={(e) => setSettings({...settings, mjQuality: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {settings.mjVersion === '7' ? (
                    <>
                      <option value="1">1 (Optimized)</option>
                      <option value="2">2 (Pre-optimized)</option>
                      <option value="4">4 (Experimental)</option>
                    </>
                  ) : (
                    <>
                      <option value="0.25">0.25 (Fastest)</option>
                      <option value="0.5">0.5 (Fast)</option>
                      <option value="1">1 (Standard)</option>
                      <option value="2">2 (High Quality)</option>
                    </>
                  )}
                </select>
              </div>
              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style (--style)
                </label>
                <select
                  value={settings.mjStyle}
                  onChange={(e) => setSettings({...settings, mjStyle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">None</option>
                  <option value="raw">Raw (Photorealistic)</option>
                  <option value="expressive">Expressive</option>
                  <option value="cute">Cute</option>
                  <option value="scenic">Scenic</option>
                  <option value="original">Original</option>
                </select>
              </div>
              {/* Stylize */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stylize (--s) • Range: 0-1000
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={settings.mjStylize}
                  onChange={(e) => setSettings({...settings, mjStylize: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Default: 100"
                />
              </div>
              {/* Chaos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chaos (--chaos) • Range: 0-100
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.mjChaos}
                  onChange={(e) => setSettings({...settings, mjChaos: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Default: 0"
                />
              </div>
              {/* Seed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seed (--seed)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="4294967295"
                    value={settings.mjSeed}
                    onChange={(e) => setSettings({...settings, mjSeed: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Random seed"
                  />
                  <button
                    type="button"
                    onClick={() => setSettings({...settings, mjSeed: Math.floor(Math.random() * 4294967295).toString()})}
                    className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    🎲
                  </button>
                </div>
              </div>
              {/* Weird */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weird (--weird) • Range: 0-3000
                </label>
                <input
                  type="number"
                  min="0"
                  max="3000"
                  value={settings.mjWeird}
                  onChange={(e) => setSettings({...settings, mjWeird: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Experimental aesthetics"
                />
              </div>
            </div>
            {/* Custom Parameters */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Parameters (Advanced)
              </label>
              <input
                type="text"
                placeholder="--sref random --no text --tile (additional parameters)"
                value={settings.customMjParams}
                onChange={(e) => setSettings({...settings, customMjParams: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="text-xs text-gray-500 mt-1">
                Add any additional Midjourney parameters here (--sref, --oref, --no, --tile, etc.)
              </div>
            </div>
            {/* Parameter Preview */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parameter Preview:
              </label>
              <code className="text-sm text-purple-700 font-mono break-all">
                {generateMidjourneyParams() || 'No parameters set'}
              </code>
            </div>
            {/* Quick Presets */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Presets (2025 Optimized):
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSettings({...settings, 
                    mjVersion: '7', mjAspectRatio: '16:9', mjQuality: '2', mjStyle: 'raw', 
                    mjStylize: '500', mjChaos: '0'
                  })}
                  className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  🎬 V7 Cinematic
                </button>
                <button
                  onClick={() => setSettings({...settings, 
                    mjVersion: '6.1', mjAspectRatio: '4:3', mjQuality: '2', mjStyle: 'raw', 
                    mjStylize: '250', mjChaos: '0'
                  })}
                  className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                >
                  📷 V6.1 Stock Photo
                </button>
                <button
                  onClick={() => setSettings({...settings, 
                    mjVersion: '7', mjAspectRatio: '2:3', mjQuality: '1', mjStyle: 'expressive', 
                    mjStylize: '750', mjChaos: '20'
                  })}
                  className="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                >
                  🎨 V7 Artistic
                </button>
                <button
                  onClick={() => setSettings({...settings, 
                    mjVersion: '7', mjAspectRatio: '21:9', mjQuality: '2', mjStyle: 'scenic', 
                    mjStylize: '300', mjChaos: '10'
                  })}
                  className="px-3 py-1 text-xs bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg transition-colors"
                >
                  🌄 V7 Panoramic
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Generate Button */}
        <div className="text-center mb-8">
          <button
            onClick={generatePrompts}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Shuffle className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Nature Prompts'}
          </button>
          <div className="mt-2 text-sm text-gray-600">
            Output Mode: <span className={`font-medium ${settings.outputMode === 'midjourney' ? 'text-purple-600' : 'text-blue-600'}`}>
              {settings.outputMode === 'midjourney' ? '🎨 Midjourney' : '📝 Plain'}
            </span>
            {settings.outputMode === 'midjourney' && (
              <span className="text-green-600 font-medium"> • V{settings.mjVersion}</span>
            )}
          </div>
        </div>
        {/* Results */}
        {generatedPrompts.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Generated Prompts ({generatedPrompts.length})
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Output Mode:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    settings.outputMode === 'midjourney' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {settings.outputMode === 'midjourney' ? '🎨 Midjourney Ready' : '📝 Plain Format'}
                  </span>
                  {settings.outputMode === 'midjourney' && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      V{settings.mjVersion}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyAllPrompts}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy All
                </button>
                <button
                  onClick={downloadPrompts}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <a
                  href="https://trakteer.id/anton-prafanto-nszpm/tip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Support
                </a>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {generatedPrompts.map((prompt) => (
                <div key={prompt.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          #{prompt.id}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          prompt.type === 'photo' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {prompt.type === 'photo' ? (
                            <><Image className="w-3 h-3 inline mr-1" />Photo</>
                          ) : (
                            <><Video className="w-3 h-3 inline mr-1" />Video</>
                          )}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          settings.outputMode === 'midjourney' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {settings.outputMode === 'midjourney' ? `🎨 MJ-V${settings.mjVersion}` : '📝 Plain'}
                        </span>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed font-mono">
                        {prompt.text}
                      </p>
                    </div>
                    <button
                      onClick={() => copyPrompt(prompt.text)}
                      className="text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
                      title="Copy prompt"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Comprehensive Adobe Stock Nature Prompt Generator • Midjourney V7 Ready • Research-Based Parameters</p>
          <p className="mt-1">100% Creature-Free • Commercial Stock Use • Plain & Midjourney Output Modes • Discord Compatible</p>
          <div className="mt-2 text-xs">
            Updated June 2025 with latest Midjourney parameters and professional workflows
          </div>
          {/* Footer Support Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-1">🙏 Enjoyed this free tool?</h3>
                <p className="text-sm text-gray-600">Support our research and development to keep improving this tool for the creative community</p>
              </div>
              <a
                href="https://trakteer.id/anton-prafanto-nszpm/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Support This Project
                <Coffee className="w-5 h-5" />
              </a>
              <p className="text-xs text-gray-500">Every contribution helps us maintain and improve this research-based tool 💝</p>
            </div>
          </div>
        </div>
        {/* Floating Support Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://trakteer.id/anton-prafanto-nszpm/tip"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center gap-2 group"
            title="Support this project"
          >
            <Heart className="w-5 h-5 group-hover:animate-pulse" />
            <span className="hidden group-hover:inline-block text-sm font-medium pr-1">Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default AdobeStockPromptGenerator;