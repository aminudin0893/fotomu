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
  Info
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

// --- Components ---

const ByteFormatter = ({ bytes }: { bytes: number }) => {
  if (bytes === 0) return <span>0 Bytes</span>;
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return <span>{(bytes / Math.pow(k, i)).toFixed(2)} {sizes[i]}</span>;
};

export default function App() {
  const [image, setImage] = useState<ImageState | null>(null);
  const [status, setStatus] = useState<CompressionStatus>({
    isCompressing: false,
    progress: 0,
    error: null,
  });
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(2560); // 2K standard
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  
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
    
    link.download = `compressed_${baseName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <header className="mb-16 text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide uppercase text-gray-500">Cernih Engine v1.1 Pro</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
              <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">High-Definition Enabled</span>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
          >
            Cernih<span className="text-blue-600">Compress</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Kecilkan ukuran file gambar Anda tanpa mengorbankan kejernihan. 
            Teknologi kompresi cerdas untuk hasil yang tetap tajam.
          </motion.p>
        </header>

        {/* Main Interface */}
        <section className="bg-white rounded-[32px] p-2 shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 space-y-12">
            
            <AnimatePresence mode="wait">
              {!image ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[24px] py-24 px-8 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    accept="image/*" 
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  />
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Lepaskan gambar di sini</h3>
                  <p className="text-gray-500">atau klik untuk menelusuri file dari perangkat Anda</p>
                  <div className="mt-8 flex gap-4 text-xs font-medium text-gray-400">
                    <span className="px-3 py-1 bg-gray-50 rounded-md">JPG</span>
                    <span className="px-3 py-1 bg-gray-50 rounded-md">PNG</span>
                    <span className="px-3 py-1 bg-gray-50 rounded-md">WEBP</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg max-w-[200px] truncate md:max-w-md">{image.original.name}</h3>
                        <p className="text-xs text-gray-400"><ByteFormatter bytes={image.original.size} /></p>
                      </div>
                    </div>
                    <button 
                      onClick={reset}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Ganti Gambar"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid md:grid-cols-3 gap-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        Kualitas Kompresi
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest">{Math.round(quality * 100)}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="1.0" 
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        disabled={status.isCompressing}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
                        <span>Ukuran Terkecil</span>
                        <span>Kualitas Terbaik</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        Limit Dimensi 
                        <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{maxWidth}px</span>
                      </label>
                      <select 
                        value={maxWidth}
                        onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                        disabled={status.isCompressing}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                      >
                        <option value="1280">HD (1280px)</option>
                        <option value="1920">Full HD (1920px)</option>
                        <option value="2560">2K (2560px)</option>
                        <option value="3840">4K (3840px)</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-600 flex items-center justify-between">
                        Format Target
                        {targetFormat === 'image/webp' && (
                          <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100 animate-pulse">
                            REKOMENDASI WEB
                          </span>
                        )}
                      </label>
                      <div className="flex gap-2">
                        {[
                          { label: 'JPG', value: 'image/jpeg' },
                          { label: 'PNG', value: 'image/png' },
                          { label: 'WEBP', value: 'image/webp' }
                        ].map((fmt) => (
                          <button
                            key={fmt.value}
                            onClick={() => setTargetFormat(fmt.value as any)}
                            disabled={status.isCompressing}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                              targetFormat === fmt.value 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {fmt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Performance Panel */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Original View */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-xs uppercase font-bold tracking-widest text-gray-400">Original</span>
                        <span className="text-xs font-medium text-gray-500"><ByteFormatter bytes={image.original.size} /></span>
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
                        <img 
                          src={image.originalUrl} 
                          alt="Original" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Compressed View */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-xs uppercase font-bold tracking-widest text-blue-600">Compressed</span>
                        {image.compressed && (
                          <span className="text-xs font-semibold text-blue-600">
                            <ByteFormatter bytes={image.compressed.size} />
                          </span>
                        )}
                      </div>
                      <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative border border-blue-100">
                        {status.isCompressing ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 transition-all">
                            <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                            <p className="text-sm font-semibold text-gray-600">Memproses... {Math.round(status.progress)}%</p>
                          </div>
                        ) : image.compressedUrl ? (
                          <div className="relative w-full h-full">
                            <motion.img 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              src={image.compressedUrl} 
                              alt="Compressed" 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              CRYSTAL CLEAR HD
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <Info className="w-6 h-6 mr-2 opacity-50" />
                            <span className="text-sm italic">Siap untuk diproses</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-100">
                    {!image.compressed ? (
                      <button
                        onClick={compressImage}
                        disabled={status.isCompressing}
                        className="flex-1 bg-gray-900 text-white rounded-2xl py-5 px-8 font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        Mulai Kompresi
                      </button>
                    ) : (
                      <>
                        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-2xl px-8 flex items-center gap-4 py-4">
                          <div className="bg-blue-600 rounded-full p-2">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-0.5">Berhasil Dihemat</p>
                            <p className="text-2xl font-bold text-blue-900">
                              {Math.round(((image.original.size - image.compressed.size) / image.original.size) * 100)}%
                              <span className="text-sm font-normal text-blue-500 ml-2">lebih kecil</span>
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={downloadImage}
                          className="md:w-1/3 bg-gray-900 text-white rounded-2xl py-5 px-8 font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                        >
                          <Download className="w-5 h-5" />
                          Unduh Sekarang
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
        <section className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[32px] border border-white/50 space-y-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Kualitas Pristine</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Algoritma kami mendeteksi detail visual penting dan melindunginya selama proses reduksi ukuran.</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[32px] border border-white/50 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Privasi Utama</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Proses dilakukan 100% di browser Anda. Gambar Anda tidak pernah dikirim ke server kami.</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[32px] border border-white/50 space-y-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <ArrowRight className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Siap Pakai</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Kompatibel dengan semua platform media sosial dan website modern melalui format standar industri.</p>
          </div>
        </section>

        <footer className="mt-24 text-center text-gray-400 text-xs font-semibold uppercase tracking-widest pb-12">
          &copy; 2026 CernihCompress &bull; Crystal Clear Compression
        </footer>
      </main>

      {/* Toast Error */}
      <AnimatePresence>
        {status.error && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-semibold">{status.error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

