import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GalleryPhoto } from '../types';
import {
  Image,
  Upload,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  Maximize2,
  X,
  Edit,
  Camera,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  onAddPhoto: (photo: GalleryPhoto) => void;
  onUpdatePhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (photoId: string) => void;
  isOfficerLoggedIn: boolean;
  canManageGallery?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onUpdatePhoto,
  onDeletePhoto,
  isOfficerLoggedIn,
  canManageGallery = true,
}) => {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryPhoto['category']>('Workshops & Shops');
  const [imageUrl, setImageUrl] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [captionHi, setCaptionHi] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadedBy, setUploadedBy] = useState('ECORSC Media');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: Array<GalleryPhoto['category']> = [
    'Workshops & Shops',
    'Union Rallies & Morcha',
    'Felicitation & Conventions',
    'Staff Welfare & Camps',
    'National & Historic',
  ];

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  const handleOpenAddModal = () => {
    setEditingPhoto(null);
    setTitle('');
    setCategory('Workshops & Shops');
    setImageUrl('');
    setCaptionEn('');
    setCaptionHi('');
    setLocation('Mancheswar Workshop / BBS');
    setDate(new Date().toISOString().split('T')[0]);
    setUploadedBy('Super Admin / Official');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: GalleryPhoto) => {
    setEditingPhoto(p);
    setTitle(p.title);
    setCategory(p.category);
    setImageUrl(p.imageUrl);
    setCaptionEn(p.captionEn);
    setCaptionHi(p.captionHi);
    setLocation(p.location);
    setDate(p.date);
    setUploadedBy(p.uploadedBy || 'ECORSC Officer');
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setImageUrl(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      alert(lang === 'hi' ? 'कृपया फोटो अपलोड करें या इमेज लिंक दर्ज करें!' : 'Please upload a photo or enter image URL!');
      return;
    }
    if (!title.trim()) {
      alert(lang === 'hi' ? 'कृपया फोटो का शीर्षक भरें!' : 'Please enter photo title!');
      return;
    }

    if (editingPhoto) {
      onUpdatePhoto({
        ...editingPhoto,
        title,
        category,
        imageUrl,
        captionEn: captionEn || title,
        captionHi: captionHi || title,
        location,
        date,
        uploadedBy,
      });
    } else {
      const newPhoto: GalleryPhoto = {
        id: `gal-${Date.now()}`,
        title,
        category,
        imageUrl,
        captionEn: captionEn || title,
        captionHi: captionHi || title,
        location,
        date,
        uploadedBy,
      };
      onAddPhoto(newPhoto);
    }
    setIsModalOpen(false);
  };

  return (
    <section id="gallery" className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
              <Camera className="w-3.5 h-3.5" />
              <span>ECORSC OFFICIAL PHOTO GALLERY</span>
              <span className="text-stone-300">/</span>
              <span>सार्वजनिक फोटो दीर्घा</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {lang === 'hi'
                ? 'ईकोरएससी फोटो गैलरी: संघर्ष, कार्यशाला व जनसेवा के पल'
                : 'Union Photo Gallery: Solidarity, Workshop Action & Welfare'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-3xl">
              {lang === 'hi'
                ? 'कारखाना शॉप्स, रेल आंदोलन, महाधिवेशन, रक्तदान शिविर एवं राष्ट्रीय पर्वों की जीवंत व उच्च गुणवत्ता वाली तस्वीरें, जो सभी रेलकर्मी व नागरिक देख सकते हैं।'
                : 'Browse high-resolution photographs documenting workshop inspections, union rallies, welfare camps, and commemorative events across East Coast Railway.'}
            </p>
          </div>

          {/* Add Photo Button (Authorized) */}
          {isOfficerLoggedIn && canManageGallery && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="self-start md:self-auto px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>{lang === 'hi' ? '+ नई फोटो जोड़ें (Upload Photo)' : '+ Add New Photo'}</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {lang === 'hi' ? 'सभी तस्वीरें' : 'All Photos'} ({photos.length})
          </button>
          {categories.map((cat) => {
            const count = photos.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-700 text-white font-semibold shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Container with Zoom overlay */}
              <div
                className="relative h-56 bg-stone-900 cursor-pointer overflow-hidden"
                onClick={() => setLightboxPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{photo.category}</span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 bg-stone-900/80 hover:bg-red-700 text-white p-1.5 rounded-md backdrop-blur-xs transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom title in overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-bold text-sm leading-snug drop-shadow-sm text-stone-100">
                    {photo.title}
                  </h4>
                </div>
              </div>

              {/* Photo Meta & Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2">
                  {lang === 'hi' ? photo.captionHi || photo.captionEn : photo.captionEn}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <div className="flex items-center gap-1 truncate max-w-[60%]">
                    <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{photo.date}</span>
                  </div>
                </div>

                {/* Action Controls for Super Admin & Authorized Officials */}
                {isOfficerLoggedIn && canManageGallery && (
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(photo)}
                      className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3 h-3 text-stone-600" />
                      <span>{lang === 'hi' ? 'संपादित करें' : 'Edit'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            lang === 'hi'
                              ? 'क्या आप इस फोटो को गैलरी से हमेशा के लिए हटाना चाहते हैं?'
                              : 'Are you sure you want to delete this photo from the gallery?'
                          )
                        ) {
                          onDeletePhoto(photo.id);
                        }
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                      <span>{lang === 'hi' ? 'डिलीट करें' : 'Delete'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <Camera className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <p className="text-stone-500 text-sm">
              {lang === 'hi'
                ? 'इस श्रेणी में अभी कोई फोटो उपलब्ध नहीं है।'
                : 'No photos available in this category yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal (Fullscreen preview) */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="max-w-5xl w-full bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-950/80 hover:bg-red-700 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image */}
            <div className="max-h-[70vh] bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxPhoto.imageUrl}
                alt={lightboxPhoto.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Caption & Meta */}
            <div className="p-6 text-white space-y-3 bg-stone-900 border-t border-stone-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  {lightboxPhoto.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {lightboxPhoto.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {lightboxPhoto.date}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-stone-100">{lightboxPhoto.title}</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {lang === 'hi' ? lightboxPhoto.captionHi || lightboxPhoto.captionEn : lightboxPhoto.captionEn}
              </p>

              {lightboxPhoto.uploadedBy && (
                <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-800">
                  Archived by: <strong className="text-amber-300">{lightboxPhoto.uploadedBy}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden my-6">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {editingPhoto
                    ? (lang === 'hi' ? 'फोटो संपादित करें (Edit Photo)' : 'Edit Photo')
                    : (lang === 'hi' ? 'गैलरी में नई फोटो जोड़ें (Upload Photo)' : 'Add Photo to Gallery')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Photo Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'hi' ? 'फोटो अपलोड या इमेज URL *' : 'Upload Photo or Image URL *'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or upload below"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5 text-stone-600" />
                    <span>Upload File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-2 h-36 bg-stone-100 rounded-lg border border-stone-200 overflow-hidden relative">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-2 bg-stone-900/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                      Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'hi' ? 'फोटो का शीर्षक (Title) *' : 'Photo Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bogie Shop Lifting Operation"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-medium"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'hi' ? 'स्थान (Location)' : 'Location'}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mancheswar Workshop, Wheel Shop"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              {/* Hindi & English Captions */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  विवरण / व्याख्या (हिंदी में)
                </label>
                <textarea
                  rows={2}
                  value={captionHi}
                  onChange={(e) => setCaptionHi(e.target.value)}
                  placeholder="तस्वीर का विस्तृत विवरण हिंदी में लिखें..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Caption (in English)
                </label>
                <textarea
                  rows={2}
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  placeholder="Detailed description in English..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>{editingPhoto ? 'Save Changes' : 'Publish to Gallery'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
