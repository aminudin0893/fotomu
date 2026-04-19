/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  X, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw,
  Info,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  LogIn,
  ZoomIn,
  ZoomOut,
  Maximize,
  Sparkles,
  Cpu,
  Layers
} from 'lucide-react';

// --- Types ---
interface ImageState {
  original: File;
  compressed: File | null;
  originalUrl: string;
  compressedUrl: string | null;
}

interface CompressionStatus {
  isCompressing: boolean;
  progress: number;
  error: string | null;
}

// --- Login Component ---
const LoginForm = ({ onLogin }: { onLogin: () => void; key?: React.Key }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate small delay for "fresh" feel
    setTimeout(() => {
      if (username === 'Amin0893' && password === 'Amin0893&#') {
        onLogin();
      } else {
        setError('Username atau Password salah.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 space-y-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200 rotate-3">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Selamat Datang</h2>
          <p className="text-gray-500 text-sm font-medium">Silakan login untuk mengakses layanan kompresi HD</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm font-medium"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl flex items-center gap-2 border border-red-100"
              >
                <Info className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:bg-blue-300 group"
          >
            {loading ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Login Sekarang
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">&copy; 2026 CernihCompress Secure</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Components ---

const ByteFormatter = ({ bytes }: { bytes: number }) => {
  if (bytes === 0) return <span>0 Bytes</span>;
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return <span>{(bytes / Math.pow(k, i)).toFixed(2)} {sizes[i]}</span>;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState<ImageState | null>(null);
  const [status, setStatus] = useState<CompressionStatus>({
    isCompressing: false,
    progress: 0,
    error: null,
  });
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(2560); // 2K standard
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [zoom, setZoom] = useState(1);
  const [activeTab, setActiveTab] = useState<'compress' | 'enhance'>('compress');
  const [enhancePreset, setEnhancePreset] = useState<number>(3840); // Default 4K
  const [sharpenFactor, setSharpenFactor] = useState(0.4);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setStatus(prev => ({ ...prev, error: 'File harus berupa gambar.' }));
      return;
    }

    const url = URL.createObjectURL(file);
    setImage({
      original: file,
      compressed: null,
      originalUrl: url,
      compressedUrl: null,
    });
    setStatus(prev => ({ ...prev, error: null, progress: 0 }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const compressImage = async () => {
    if (!image) return;

    setStatus({ isCompressing: true, progress: 0, error: null });

    const options = {
      maxSizeMB: 0.8, // Batas maksimal 800KB sesuai permintaan untuk website ringan
      maxWidthOrHeight: maxWidth,
      useWebWorker: true,
      onProgress: (progress: number) => setStatus(prev => ({ ...prev, progress })),
      initialQuality: quality,
      fileType: targetFormat,
      alwaysKeepResolution: true, // WAJIB: Menjaga resolusi asli agar tetap tajam (mencegah blur akibat downscaling)
      preserveExif: true, // Mempertahankan metadata & profil warna agar warna tetap cernih
      maxIteration: 15, // Mencoba lebih keras untuk menemukan kualitas tertinggi yang pas dalam 800KB
    };

    try {
      const compressedFile = await imageCompression(image.original, options);
      const url = URL.createObjectURL(compressedFile);
      
      setImage(prev => prev ? ({
        ...prev,
        compressed: compressedFile,
        compressedUrl: url,
      }) : null);
      
      setStatus({ isCompressing: false, progress: 100, error: null });
    } catch (err) {
      console.error(err);
      setStatus({ isCompressing: false, progress: 0, error: 'Gagal mengompres gambar.' });
    }
  };

  const enhanceImage = async () => {
    if (!image) return;

    setStatus({ isCompressing: true, progress: 0, error: null });

    try {
      // Step 1: Load image and setup high-res target canvas
      const img = new Image();
      img.src = image.originalUrl;
      await new Promise((resolve) => (img.onload = resolve));

      // Calculate target dimensions for Master Upscale
      let targetWidth = img.width;
      let targetHeight = img.height;
      if (Math.max(img.width, img.height) < enhancePreset) {
        const ratio = enhancePreset / Math.max(img.width, img.height);
        targetWidth = Math.round(img.width * ratio);
        targetHeight = Math.round(img.height * ratio);
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas to TARGET size immediately (Upscale first)
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Enable High-Quality interpolation during upscale
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Pass 1: Initial HD Upscale + Denoise Base
      // Drawing into a larger canvas already smooths pixels. 
      // We add a tiny initial blur to melt away noise particles (bintik)
      if (sharpenFactor > 0) {
        ctx.filter = `blur(${sharpenFactor * 0.4}px)`;
      }
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Pass 2: Vector Clarity & Color Precision (Deep Processing)
      if (sharpenFactor > 0) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = targetWidth;
        tempCanvas.height = targetHeight;
        const tempCtx = tempCanvas.getContext('2d')!;
        
        // Use the current upscaled + blurred state as source
        // Apply sharpening (contrast) and color boost (saturate)
        // Contrast(1.2) + Contrast(1.1) creates deep edge definition
        tempCtx.filter = `contrast(${1 + sharpenFactor * 0.8}) saturate(${1 + sharpenFactor * 0.5}) brightness(1.02)`;
        tempCtx.drawImage(canvas, 0, 0);
        
        // Final polish for "Ultra Clean" feel
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.filter = `contrast(${1 + sharpenFactor * 0.15}) brightness(${1 + sharpenFactor * 0.02}) blur(0.1px)`;
        ctx.drawImage(tempCanvas, 0, 0);
      }

      // Final step: Convert to file with maximum quality
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, targetFormat, 1.0));
      if (!blob) throw new Error('Failed to create blob from canvas');

      const enhancedFile = new File([blob], image.original.name, { type: targetFormat });
      const url = URL.createObjectURL(enhancedFile);
      
      setImage(prev => prev ? ({
        ...prev,
        compressed: enhancedFile,
        compressedUrl: url,
      }) : null);
      
      setStatus({ isCompressing: false, progress: 100, error: null });
    } catch (err) {
      console.error(err);
      setStatus({ isCompressing: false, progress: 0, error: 'Gagal meningkatkan kualitas gambar.' });
    }
  };

  const reset = () => {
    if (image) {
      URL.revokeObjectURL(image.originalUrl);
      if (image.compressedUrl) URL.revokeObjectURL(image.compressedUrl);
    }
    setImage(null);
    setStatus({ isCompressing: false, progress: 0, error: null });
  };

  const downloadImage = () => {
    if (!image?.compressedUrl) return;
    const link = document.createElement('a');
    link.href = image.compressedUrl;
    
    // Get extension from mime type
    const extMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp'
    };
    const extension = extMap[targetFormat] || 'jpg';
    const baseName = image.original.name.substring(0, image.original.name.lastIndexOf('.')) || 'image';
    const prefix = activeTab === 'enhance' ? 'enhanced' : 'compressed';
    
    link.download = `${prefix}_${baseName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-blue-100 selection:text-blue-900 pb-12 overflow-x-hidden">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-24 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <LoginForm key="login" onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <motion.div 
              key="app"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full space-y-8 md:space-y-12"
            >
              {/* Tab Switcher */}
              <div className="flex justify-center">
                <div className="bg-white/50 backdrop-blur-xl p-1.5 rounded-[24px] border border-white/50 shadow-sm flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('compress')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === 'compress' 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                    }`}
                  >
                    <Zap className={`w-4 h-4 ${activeTab === 'compress' ? 'fill-white' : ''}`} />
                    Kompresi
                  </button>
                  <button
                    onClick={() => setActiveTab('enhance')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === 'enhance' 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                    }`}
                  >
                    <Sparkles className={`w-4 h-4 ${activeTab === 'enhance' ? 'fill-white' : ''}`} />
                    HD Enhancer
                  </button>
                </div>
              </div>

              {/* Header */}
              <header className="text-center space-y-4 md:space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] md:text-xs font-medium tracking-wide uppercase text-gray-500">Cernih Engine v1.1 Pro</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
                    <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                    <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-blue-600">High-Definition Enabled</span>
                  </div>
                </motion.div>
                <div className="space-y-2">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 px-4"
                  >
                    Cernih<span className="text-blue-600">Compress</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-6"
                  >
                    Kecilkan ukuran file gambar Anda tanpa mengorbankan kejernihan. 
                    Teknologi kompresi cerdas untuk hasil yang tetap tajam.
                  </motion.p>
                </div>
              </header>

              {/* Main Interface */}
              <section className="bg-white rounded-[32px] md:rounded-[40px] p-1 sm:p-2 shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden w-full">
                <div className="p-5 sm:p-8 md:p-12 space-y-8 md:space-y-12">
                  
                  <AnimatePresence mode="wait">
                    {!image ? (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[24px] md:rounded-[32px] py-16 md:py-24 px-6 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          hidden 
                          accept="image/*" 
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                        />
                        <div className="w-16 md:w-20 h-16 md:h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Upload className="w-8 md:w-10 h-8 md:h-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-center">Lepaskan gambar di sini</h3>
                        <p className="text-gray-400 text-sm md:text-base text-center">atau klik untuk menelusuri file dari perangkat Anda</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase">
                          <span className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">JPG</span>
                          <span className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">PNG</span>
                          <span className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">WEBP</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 md:space-y-8"
                      >
                        {/* Top Bar */}
                        <div className="flex items-center justify-between px-2 gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="bg-blue-100 p-2 rounded-xl text-blue-600 shrink-0">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-base md:text-lg truncate max-w-full">{image.original.name}</h3>
                              <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider"><ByteFormatter bytes={image.original.size} /></p>
                            </div>
                          </div>
                          <button 
                            onClick={reset}
                            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all shrink-0"
                            title="Ganti Gambar"
                          >
                            <X className="w-6 h-6 text-gray-300 transition-colors" />
                          </button>
                        </div>

                        {/* Settings Grid */}
                        <AnimatePresence mode="wait">
                          {activeTab === 'compress' ? (
                            <motion.div 
                              key="compress-settings"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50 p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-gray-100"
                            >
                              <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center justify-between">
                                  Kualitas
                                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">{Math.round(quality * 100)}%</span>
                                </label>
                                <input 
                                  type="range" 
                                  min="0.1" 
                                  max="1.0" 
                                  step="0.05"
                                  value={quality}
                                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                                  disabled={status.isCompressing}
                                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-[9px] text-gray-400 uppercase font-black tracking-tighter">
                                  <span>Small</span>
                                  <span>Pro</span>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center justify-between">
                                  Dimensi 
                                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{maxWidth}px</span>
                                </label>
                                <select 
                                  value={maxWidth}
                                  onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                                  disabled={status.isCompressing}
                                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs font-bold appearance-none cursor-pointer"
                                >
                                  <option value="1280">HD (1280px)</option>
                                  <option value="1920">Full HD (1920px)</option>
                                  <option value="2560">2K (2560px)</option>
                                  <option value="3840">4K (3840px)</option>
                                </select>
                              </div>

                              <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center justify-between">
                                  Format
                                  {targetFormat === 'image/webp' && (
                                    <span className="text-[9px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                      BEST
                                    </span>
                                  )}
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { label: 'JPG', value: 'image/jpeg' },
                                    { label: 'PNG', value: 'image/png' },
                                    { label: 'WEBP', value: 'image/webp' }
                                  ].map((fmt) => (
                                    <button
                                      key={fmt.value}
                                      onClick={() => setTargetFormat(fmt.value as any)}
                                      disabled={status.isCompressing}
                                      className={`py-2 px-1 rounded-xl text-[10px] font-black transition-all border ${
                                        targetFormat === fmt.value 
                                          ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                          : 'bg-white text-gray-400 border-gray-200 hover:border-blue-300'
                                      }`}
                                    >
                                      {fmt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="enhance-settings"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-indigo-50/30 p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-indigo-100"
                            >
                              <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-indigo-600 flex items-center justify-between">
                                  Color & Sharpness Master
                                  <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">{Math.round(sharpenFactor * 100)}%</span>
                                </label>
                                <input 
                                  type="range" 
                                  min="0.1" 
                                  max="1.0" 
                                  step="0.05"
                                  value={sharpenFactor}
                                  onChange={(e) => setSharpenFactor(parseFloat(e.target.value))}
                                  disabled={status.isCompressing}
                                  className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-[9px] text-indigo-400 uppercase font-black tracking-tighter">
                                  <span>Super Clean</span>
                                  <span>Deep HD Master</span>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-indigo-600 flex items-center justify-between">
                                  Master Upscale
                                  <span className="bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                    {enhancePreset === 1920 ? 'HD' : enhancePreset === 3840 ? '4K' : '8K'}
                                  </span>
                                </label>
                                <select 
                                  value={enhancePreset}
                                  onChange={(e) => setEnhancePreset(parseInt(e.target.value))}
                                  disabled={status.isCompressing}
                                  className="w-full bg-white border border-indigo-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-bold appearance-none cursor-pointer text-indigo-900"
                                >
                                  <option value="1920">HD Master (1080p)</option>
                                  <option value="3840">Ultra HD (4K)</option>
                                  <option value="7680">Cinema (8K)</option>
                                </select>
                              </div>

                              <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-indigo-600 flex items-center justify-between">
                                  Output Format
                                  <Cpu className="w-3 h-3 text-indigo-400" />
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { label: 'JPG', value: 'image/jpeg' },
                                    { label: 'PNG', value: 'image/png' },
                                    { label: 'WEBP', value: 'image/webp' }
                                  ].map((fmt) => (
                                    <button
                                      key={fmt.value}
                                      onClick={() => setTargetFormat(fmt.value as any)}
                                      disabled={status.isCompressing}
                                      className={`py-2 px-1 rounded-xl text-[10px] font-black transition-all border ${
                                        targetFormat === fmt.value 
                                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                                          : 'bg-white text-indigo-400 border-indigo-200 hover:border-indigo-300'
                                      }`}
                                    >
                                      {fmt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Zoom Controls */}
                        <div className="flex items-center justify-center pt-2">
                          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center p-1.5 gap-2">
                            <button 
                              onClick={() => setZoom(prev => Math.max(0.25, prev - 0.25))}
                              disabled={zoom <= 0.25}
                              className="p-2 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                              title="Zoom Out"
                            >
                              <ZoomOut className="w-4 h-4 text-gray-500" />
                            </button>
                            
                            <div className="px-3 border-x border-gray-50 flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-12 text-center">
                                {Math.round(zoom * 100)}%
                              </span>
                              <button 
                                onClick={() => setZoom(1)}
                                className={`p-1 rounded-md transition-colors ${zoom === 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-50'}`}
                                title="Reset Zoom"
                              >
                                <Maximize className="w-3 h-3" />
                              </button>
                            </div>

                            <button 
                              onClick={() => setZoom(prev => Math.min(2, prev + 0.25))}
                              disabled={zoom >= 2}
                              className="p-2 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                              title="Zoom In"
                            >
                              <ZoomIn className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>

                        {/* Performance Panel */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                          {/* Original View */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Original</span>
                              <span className="text-[10px] font-bold text-gray-400"><ByteFormatter bytes={image.original.size} /></span>
                            </div>
                            <div className="aspect-video bg-gray-50 rounded-2xl md:rounded-3xl overflow-auto relative group border border-gray-100 custom-scrollbar">
                              <img 
                                src={image.originalUrl} 
                                alt="Original" 
                                className="w-full h-full object-contain transition-transform duration-200 ease-out origin-center"
                                style={{ transform: `scale(${zoom})` }}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>

                          {/* Compressed View */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-end">
                              <span className={`text-[10px] uppercase font-bold tracking-widest ${activeTab === 'enhance' ? 'text-indigo-600' : 'text-blue-600'}`}>
                                {activeTab === 'enhance' ? 'Enhanced HD' : 'Compressed'}
                              </span>
                              {image.compressed && (
                                <span className={`text-[10px] font-bold ${activeTab === 'enhance' ? 'text-indigo-600' : 'text-blue-600'}`}>
                                  <ByteFormatter bytes={image.compressed.size} />
                                </span>
                              )}
                            </div>
                            <div className={`aspect-video bg-gray-50 rounded-2xl md:rounded-3xl overflow-auto relative border group custom-scrollbar ${activeTab === 'enhance' ? 'border-indigo-100' : 'border-blue-100'}`}>
                              {status.isCompressing ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md z-10 transition-all">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className={`p-3 ${activeTab === 'enhance' ? 'bg-indigo-50' : 'bg-blue-50'} rounded-2xl mb-4`}
                                  >
                                    <RefreshCw className={`w-8 h-8 ${activeTab === 'enhance' ? 'text-indigo-600' : 'text-blue-600'}`} />
                                  </motion.div>
                                  <p className="text-xs font-bold text-gray-600 tracking-widest uppercase">
                                    {activeTab === 'enhance' ? 'Enhancing Quality' : 'Memproses'} {Math.round(status.progress)}%
                                  </p>
                                </div>
                              ) : image.compressedUrl ? (
                                <div className="relative w-full h-full overflow-auto">
                                  <motion.img 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={image.compressedUrl} 
                                    alt="Result" 
                                    className="w-full h-full object-contain transition-transform duration-200 ease-out origin-center"
                                    style={{ transform: `scale(${zoom})` }}
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className={`absolute top-3 right-3 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 z-20 ${activeTab === 'enhance' ? 'bg-indigo-600/90' : 'bg-blue-600/90'}`}>
                                    {activeTab === 'enhance' ? (
                                      <>
                                        <Sparkles className="w-3.5 h-3.5" />
                                        ULTRA HD ENHANCED
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        CRYSTAL CLEAR HD
                                      </>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 space-y-2">
                                  <Info className="w-8 h-8 opacity-20" />
                                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Siap diproses</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                          {!image.compressed ? (
                            <button
                              onClick={activeTab === 'compress' ? compressImage : enhanceImage}
                              disabled={status.isCompressing}
                              className={`flex-1 rounded-2xl py-4 px-8 font-bold text-base md:text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-white ${
                                activeTab === 'enhance' 
                                  ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200' 
                                  : 'bg-gray-900 hover:bg-black hover:shadow-gray-200'
                              } hover:shadow-2xl`}
                            >
                              {activeTab === 'enhance' ? (
                                <Sparkles className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" />
                              ) : (
                                <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              )}
                              {activeTab === 'enhance' ? 'Tingkatkan Kualitas Ultra HD Master' : 'Mulai Kompresi'}
                            </button>
                          ) : (
                            <>
                              <div className={`flex-1 border rounded-2xl px-6 flex items-center gap-4 py-3 md:py-4 ${
                                activeTab === 'enhance' ? 'bg-indigo-50 border-indigo-100' : 'bg-blue-50 border-blue-100'
                              }`}>
                                <div className={`${activeTab === 'enhance' ? 'bg-indigo-600' : 'bg-blue-600'} rounded-xl p-2 shrink-0`}>
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-0.5 ${activeTab === 'enhance' ? 'text-indigo-400' : 'text-blue-400'}`}>
                                    {activeTab === 'enhance' ? 'HD Enhancement' : 'Efficiency'}
                                  </p>
                                  <p className={`text-xl md:text-2xl font-black leading-none ${activeTab === 'enhance' ? 'text-indigo-900' : 'text-blue-900'}`}>
                                    {activeTab === 'enhance' ? (
                                      'ACTIVE'
                                    ) : (
                                      `${Math.round(((image.original.size - image.compressed.size) / image.original.size) * 100)}%`
                                    )}
                                    <span className={`text-[10px] font-bold ml-1.5 tracking-normal ${activeTab === 'enhance' ? 'text-indigo-500' : 'text-blue-500'}`}>
                                      {activeTab === 'enhance' ? 'MASTER QUALITY' : 'SAVED'}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={downloadImage}
                                className={`sm:w-1/3 text-white rounded-2xl py-4 px-8 font-bold text-base md:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 ${
                                  activeTab === 'enhance' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-900 hover:bg-black'
                                }`}
                              >
                                <Download className="w-5 h-5" />
                                Download
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </section>

              {/* Info Cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0 pb-12">
                {[
                  { icon: Zap, bg: 'bg-indigo-50', color: 'text-indigo-600', title: 'Pristine HD', text: 'Detail visual tetap terjaga meskipun ukuran file mengecil secara drastis.' },
                  { icon: RefreshCw, bg: 'bg-emerald-50', color: 'text-emerald-600', title: 'Private & Local', text: 'Proses dilakukan 100% aman di browser tanpa mengirim data ke server.' },
                  { icon: ArrowRight, bg: 'bg-amber-50', color: 'text-amber-600', title: 'Web Ready', text: 'Optimasi maksimal untuk website agar loading halaman menjadi instan.' }
                ].map((card, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    key={card.title}
                    className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-[32px] border border-white shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center ${card.color}`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg md:text-xl font-bold">{card.title}</h4>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{card.text}</p>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-auto pt-16 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] pb-8 w-full">
          &copy; 2026 CernihCompress &bull; Security & Performance Guaranteed
        </footer>
      </main>

      {/* Toast Error */}
      <AnimatePresence>
        {status.error && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] border border-red-500 max-w-sm mx-auto"
          >
            <div className="bg-red-400/30 p-1.5 rounded-lg">
              <X className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider">{status.error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

