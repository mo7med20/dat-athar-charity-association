import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Check,
  Download,
  RefreshCw,
  Upload,
  FileSpreadsheet,
  KeyRound,
  RotateCcw,
  Save,
  Layers,
} from 'lucide-react';
import {
  CHARITY_INFO,
  NewsArticleItem,
  NewsDisplayMode,
  NEWS_DISPLAY_MODE_LABELS,
  formatNewsArticleAsSheetRow,
  generateNewsSheetTemplateCsv,
  normalizeGoogleSheetCsvUrl,
  normalizeImageUrl,
  resolveDisplayedNews,
} from '../utils/charityData';

interface NewsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArticles: NewsArticleItem[];
  customArticles: NewsArticleItem[];
  displayMode: NewsDisplayMode;
  onSaveDisplayMode: (mode: NewsDisplayMode) => void;
  onSaveCustomArticles: (updated: NewsArticleItem[]) => void;
  onResetDefaultArticles: () => void;
  sheetUrl: string;
  onSaveSheetUrl: (url: string) => Promise<{ ok: boolean; count: number; error?: string }>;
  adminPasscode: string;
}

const PRESET_IMAGES = [
  { label: 'صورة التقرير الصحفي الرسمي', src: CHARITY_INFO.activitiesImage },
  { label: 'دار رياض الصالحين', src: '/assets/activities/dar_riyad.jpg' },
  { label: 'دورة الخط العربي', src: '/assets/activities/calligraphy.jpg' },
  { label: 'دورة التجويد والفصول', src: '/assets/activities/tajweed_course.jpg' },
  { label: 'الوجبات الساخنة', src: '/assets/activities/hot_meals.jpg' },
  { label: 'شنط المواد الغذائية', src: '/assets/activities/food_bags.jpg' },
  { label: 'معرض الملابس الخيري', src: '/assets/activities/clothing_fair.jpg' },
];

async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 900;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => reject(new Error('تعذر قراءة الصورة المختارة'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('تعذر تحميل ملف الصورة'));
    reader.readAsDataURL(file);
  });
}

export const NewsAdminModal: React.FC<NewsAdminModalProps> = ({
  isOpen,
  onClose,
  defaultArticles,
  customArticles,
  displayMode,
  onSaveDisplayMode,
  onSaveCustomArticles,
  onResetDefaultArticles,
  sheetUrl,
  onSaveSheetUrl,
  adminPasscode,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [activeTab, setActiveTab] = useState<'articles' | 'sheet'>('articles');

  // Pending display mode selected in UI before clicking the explicit Save button
  const [pendingDisplayMode, setPendingDisplayMode] = useState<NewsDisplayMode>(displayMode);

  useEffect(() => {
    setPendingDisplayMode(displayMode);
  }, [displayMode, isOpen]);

  // Article Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('مبادرات ميدانية');
  const [dateLabel, setDateLabel] = useState('أكتوبر 2026');
  const [authorNote, setAuthorNote] = useState('');
  const [summary, setSummary] = useState('');
  const [fullTextRaw, setFullTextRaw] = useState('');
  const [imageSrc, setImageSrc] = useState<string>(CHARITY_INFO.activitiesImage);
  const [imageAlt, setImageAlt] = useState('');
  const [formError, setFormError] = useState('');
  const [statusBanner, setStatusBanner] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sheet Sync State
  const [sheetUrlInput, setSheetUrlInput] = useState(sheetUrl);
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);
  const [sheetStatusMsg, setSheetStatusMsg] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleLockAndClose = () => {
    setIsUnlocked(false);
    setPasscodeInput('');
    setPasscodeError('');
    onClose();
  };

  const mergedArticles = resolveDisplayedNews('merged', defaultArticles, customArticles);
  const currentlyDisplayedArticles = resolveDisplayedNews(
    displayMode,
    defaultArticles,
    customArticles
  );

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === adminPasscode) {
      setIsUnlocked(true);
      setPasscodeInput('');
      setPasscodeError('');
      setSheetUrlInput(sheetUrl);
      setPendingDisplayMode(displayMode);
    } else {
      setPasscodeError('رمز المرور السري غير صحيح. هذه اللوحة مخصصة لإدارة الجمعية فقط.');
    }
  };

  const handleConfirmDisplayModeSave = () => {
    onSaveDisplayMode(pendingDisplayMode);
    setStatusBanner(
      `تم حفظ واعتماد طريقة العرض بنجاح: «${NEWS_DISPLAY_MODE_LABELS[pendingDisplayMode]}» — يظهر هذا الاختيار الآن لزوار الموقع.`
    );
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategoryLabel('مبادرات ميدانية');
    setDateLabel('أكتوبر 2026');
    setAuthorNote('');
    setSummary('');
    setFullTextRaw('');
    setImageSrc(CHARITY_INFO.activitiesImage);
    setImageAlt('');
    setFormError('');
  };

  const handleStartEdit = (article: NewsArticleItem) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategoryLabel(article.categoryLabel);
    setDateLabel(article.dateLabel);
    setAuthorNote(article.authorNote || '');
    setSummary(article.summary);
    setFullTextRaw(article.fullText.join('\n\n'));
    setImageSrc(article.imageSrc);
    setImageAlt(article.imageAlt);
    setFormError('');
    setStatusBanner('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      setImageSrc(compressed);
      if (!imageAlt.trim() && title.trim()) {
        setImageAlt(title.trim());
      }
      setStatusBanner('تم ضغط الصورة وتجهيزها للعرض السريع بنجاح.');
    } catch {
      setFormError('حدث خطأ أثناء معالجة الصورة. يرجى اختيار صورة أخرى.');
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanSummary = summary.trim();
    if (cleanTitle.length < 5) {
      setFormError('يرجى إدخال عنوان واضح للخبر (5 أحرف على الأقل).');
      return;
    }
    if (cleanSummary.length < 10) {
      setFormError('يرجى إدخال ملخص للخبر (10 أحرف على الأقل).');
      return;
    }

    const paragraphs = fullTextRaw
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const newArticle: NewsArticleItem = {
      id: editingId || `news-custom-${Date.now()}`,
      title: cleanTitle,
      categoryLabel: categoryLabel.trim() || 'أخبار الجمعية',
      dateLabel: dateLabel.trim() || '2026',
      authorNote: authorNote.trim() || undefined,
      summary: cleanSummary,
      fullText: paragraphs.length > 0 ? paragraphs : [cleanSummary],
      imageSrc: normalizeImageUrl(imageSrc),
      imageAlt: imageAlt.trim() || cleanTitle,
    };

    const existsInCustom = customArticles.some((item) => item.id === editingId);
    let updatedList: NewsArticleItem[];
    if (editingId && existsInCustom) {
      updatedList = customArticles.map((item) =>
        item.id === editingId ? newArticle : item
      );
      setStatusBanner('تم حفظ تعديلات الخبر بنجاح ضمن أخبار الملف / المضافة.');
    } else {
      updatedList = [newArticle, ...customArticles];
      setStatusBanner(
        displayMode === 'default'
          ? 'تم حفظ الخبر في قائمة الأخبار المضافة! لعرضه على الموقع اختر «أخبار الملف فقط» أو «دمج الاثنين معاً» بالأعلى ثم اضغط زر «حفظ واعتماد طريقة العرض».'
          : 'تم نشر الخبر الجديد بنجاح ويظهر الآن في قسم الأخبار.'
      );
    }

    onSaveCustomArticles(updatedList);
    resetForm();
  };

  const handleDeleteArticle = (id: string) => {
    const filtered = customArticles.filter((item) => item.id !== id);
    onSaveCustomArticles(filtered);
    if (editingId === id) {
      resetForm();
    }
    setStatusBanner('تم حذف الخبر من قائمة الأخبار المضافة.');
  };

  const handleCopySheetRow = async (article: NewsArticleItem) => {
    const rowTsv = formatNewsArticleAsSheetRow(article);
    try {
      await navigator.clipboard.writeText(rowTsv);
      setCopiedId(article.id);
      setStatusBanner(
        'تم نسخ الخبر كصف جاهز! افتح Google Sheet واضغط لصق (Ctrl+V) في صف جديد.'
      );
      setTimeout(() => setCopiedId(null), 3000);
    } catch {
      setStatusBanner('تعذر النسخ التلقائي، يرجى المحاولة مرة أخرى.');
    }
  };

  const handleDownloadCsvTemplate = () => {
    const sourceForCsv =
      customArticles.length > 0 ? customArticles : defaultArticles;
    const csvContent = generateNewsSheetTemplateCsv(sourceForCsv);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dat-athar-news-sheet.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSheetStatusMsg(
      'تم تحميل ملف الجدول الجاهز (dat-athar-news-sheet.csv). يمكنك رفعه مباشرة إلى Google Sheets في حسابك الشخصي.'
    );
  };

  const handleSyncSheetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncingSheet(true);
    setSheetStatusMsg('');
    const result = await onSaveSheetUrl(sheetUrlInput.trim());
    setIsSyncingSheet(false);
    if (!sheetUrlInput.trim()) {
      setSheetStatusMsg('تم إلغاء رابط الجدول الخارجي.');
    } else if (result.ok) {
      setSheetStatusMsg(
        `تم الربط والمزامنة بنجاح! تم جلب ${result.count} أخبار من جدول Google Sheet. يمكنك اختيار طريقة العرض من الشريط العلوي والضغط على «حفظ واعتماد طريقة العرض».`
      );
    } else {
      setSheetStatusMsg(
        result.error ||
          'تعذر قراءة الجدول. تأكد أن الجدول مشارك للعامة (أي شخص لديه الرابط يمكنه العرض) أو منشور للويب كملف CSV.'
      );
    }
  };

  const normalizedPreviewUrl = normalizeGoogleSheetCsvUrl(sheetUrlInput);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="لوحة إدارة ونشر أخبار الجمعية"
      className="fixed inset-0 z-50 bg-[#103B70]/85 backdrop-blur-xs flex items-center justify-center p-3 md:p-5 overflow-y-auto"
      onClick={handleLockAndClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 md:p-6 space-y-5 shadow-xl border border-[#DCE7E5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#DCE7E5] pb-3.5">
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-bold text-blue-900">
              لوحة إدارة ونشر الأخبار — {CHARITY_INFO.shortTitle}
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              إضافة وتعديل الأخبار والتقارير الدورية مع التحكم الكامل في مصدر الأخبار المعروض على الموقع
            </p>
          </div>
          <button
            type="button"
            onClick={handleLockAndClose}
            aria-label="إغلاق لوحة إدارة الأخبار"
            className="min-h-[42px] min-w-[42px] inline-flex items-center justify-center rounded-xl text-blue-900 hover:bg-[#F5F9F7] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {!isUnlocked ? (
          /* Passcode Gate */
          <form onSubmit={handleUnlock} className="max-w-md mx-auto py-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] mx-auto">
              <Lock className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-base md:text-lg font-bold text-blue-900">
                الدخول المخصص لإدارة الجمعية فقط
              </h4>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                أدخل رمز المرور السري الخاص بإدارة جمعية ذات أثر لفتح لوحة نشر وتحديث الأخبار.
              </p>
            </div>

            <div>
              <label
                htmlFor="admin-passcode-input"
                className="block text-xs md:text-sm font-medium text-blue-900 mb-1.5"
              >
                رمز المرور السري للإدارة
              </label>
              <input
                id="admin-passcode-input"
                type="password"
                dir="ltr"
                required
                autoComplete="off"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-center font-mono-num text-base text-blue-900 focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
              />
              {passcodeError && (
                <p role="alert" className="text-xs font-medium text-red-700 mt-1.5 text-center">
                  {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-5 rounded-xl bg-blue-900 hover:bg-[#159EAA] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              فتح لوحة التحكم
            </button>
          </form>
        ) : (
          /* Unlocked Dashboard */
          <div className="space-y-5">
            {/* Top Display Source Selector & Save Button */}
            <div className="p-4 rounded-2xl bg-[#F5F9F7] border-2 border-[#159EAA]/40 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-blue-900">
                  <Layers className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />
                  <h4 className="text-sm md:text-base font-bold">
                    تحديد مصدر الأخبار المعروض على الموقع
                  </h4>
                </div>
                <span className="text-xs font-medium text-teal-700 bg-white px-3 py-1 rounded-lg border border-[#DCE7E5]">
                  المعتمد حالياً: <strong>{NEWS_DISPLAY_MODE_LABELS[displayMode]}</strong> ({currentlyDisplayedArticles.length} أخبار)
                </span>
              </div>

              <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed">
                اختر المصدر الذي ترغب في إظهاره لزوار الموقع، ثم اضغط على زر <strong>«حفظ واعتماد طريقة العرض»</strong> لتثبيت اختيارك حتى لا يطغى ملف Google Sheet على الأخبار الافتراضية أو العكس.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label="مصدر الأخبار المعروض">
                <button
                  type="button"
                  role="radio"
                  aria-checked={pendingDisplayMode === 'default'}
                  onClick={() => setPendingDisplayMode('default')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                    pendingDisplayMode === 'default'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-blue-900 border-[#DCE7E5] hover:border-[#159EAA]'
                  }`}
                >
                  <span className="text-xs md:text-sm font-bold">
                    الأخبار الافتراضية فقط
                  </span>
                  <span
                    className={`text-[11px] ${
                      pendingDisplayMode === 'default' ? 'text-gray-200' : 'text-gray-500'
                    }`}
                  >
                    عرض الأخبار التأسيسية فقط ({defaultArticles.length})
                  </span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={pendingDisplayMode === 'custom'}
                  onClick={() => setPendingDisplayMode('custom')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                    pendingDisplayMode === 'custom'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-blue-900 border-[#DCE7E5] hover:border-[#159EAA]'
                  }`}
                >
                  <span className="text-xs md:text-sm font-bold">
                    أخبار الملف / المضافة فقط
                  </span>
                  <span
                    className={`text-[11px] ${
                      pendingDisplayMode === 'custom' ? 'text-gray-200' : 'text-gray-500'
                    }`}
                  >
                    عرض أخبار Google Sheet / المضافة ({customArticles.length})
                  </span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={pendingDisplayMode === 'merged'}
                  onClick={() => setPendingDisplayMode('merged')}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                    pendingDisplayMode === 'merged'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-white text-blue-900 border-[#DCE7E5] hover:border-[#159EAA]'
                  }`}
                >
                  <span className="text-xs md:text-sm font-bold">
                    دمج الاثنين معاً
                  </span>
                  <span
                    className={`text-[11px] ${
                      pendingDisplayMode === 'merged' ? 'text-gray-200' : 'text-gray-500'
                    }`}
                  >
                    أخبار الملف + الأخبار الافتراضية ({mergedArticles.length})
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleConfirmDisplayModeSave}
                  className="py-2.5 px-5 rounded-xl bg-[#159EAA] hover:bg-blue-900 text-white text-xs md:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>حفظ واعتماد طريقة العرض</span>
                </button>

                {pendingDisplayMode !== displayMode && (
                  <span className="text-xs font-medium text-amber-700">
                    تنبيه: قمت بتغيير الاختيار، اضغط «حفظ واعتماد طريقة العرض» لتطبيقه على الموقع.
                  </span>
                )}
              </div>
            </div>

            {/* Segmented Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F5F9F7] rounded-xl border border-[#DCE7E5]">
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs md:text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'articles'
                    ? 'bg-blue-900 text-white'
                    : 'text-blue-900 hover:bg-white'
                }`}
              >
                <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>إدارة وإضافة الأخبار ({customArticles.length} مضافة / {defaultArticles.length} افتراضية)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sheet')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs md:text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'sheet'
                    ? 'bg-blue-900 text-white'
                    : 'text-blue-900 hover:bg-white'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>الربط مع Google Sheet (حسابك الشخصي / الجمعية)</span>
              </button>
            </div>

            {statusBanner && (
              <div
                role="status"
                className="p-3 rounded-xl bg-[#F5F9F7] border border-[#159EAA] text-xs md:text-sm text-blue-900 font-medium flex items-center justify-between gap-2"
              >
                <span>{statusBanner}</span>
                <button
                  type="button"
                  onClick={() => setStatusBanner('')}
                  className="text-xs text-teal-600 hover:underline shrink-0 cursor-pointer"
                >
                  إخفاء
                </button>
              </div>
            )}

            {activeTab === 'articles' ? (
              <div className="space-y-6">
                {/* Add / Edit Article Form */}
                <form
                  onSubmit={handleSaveArticle}
                  className="bg-[#F5F9F7] rounded-2xl p-4 md:p-5 border border-[#DCE7E5] space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm md:text-base font-bold text-blue-900">
                      {editingId ? 'تعديل بيانات الخبر' : 'إضافة خبر أو تقرير ميداني جديد'}
                    </h4>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs font-medium text-teal-600 hover:underline cursor-pointer"
                      >
                        إلغاء التعديل وإضافة خبر جديد
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="news-title-input"
                        className="block text-xs md:text-sm font-medium text-blue-900 mb-1"
                      >
                        عنوان الخبر أو الفعالية <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="news-title-input"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مثال: توزيع 200 وجبة ساخنة وشنطة غذائية للأسر المستحقة بقرية الأقواز"
                        className="w-full px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-sm text-gray-800 focus:outline-2 focus:outline-[#159EAA]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="news-category-input"
                        className="block text-xs md:text-sm font-medium text-blue-900 mb-1"
                      >
                        التصنيف
                      </label>
                      <input
                        id="news-category-input"
                        type="text"
                        value={categoryLabel}
                        onChange={(e) => setCategoryLabel(e.target.value)}
                        placeholder="مبادرات ميدانية / الأنشطة التعليمية / تقرير صحفي"
                        className="w-full px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-sm text-gray-800 focus:outline-2 focus:outline-[#159EAA]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="news-date-input"
                        className="block text-xs md:text-sm font-medium text-blue-900 mb-1"
                      >
                        تاريخ النشر المعروض
                      </label>
                      <input
                        id="news-date-input"
                        type="text"
                        value={dateLabel}
                        onChange={(e) => setDateLabel(e.target.value)}
                        placeholder="أكتوبر 2026"
                        className="w-full px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-sm text-gray-800 focus:outline-2 focus:outline-[#159EAA]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="news-author-input"
                        className="block text-xs md:text-sm font-medium text-blue-900 mb-1"
                      >
                        تنويه الكاتب أو المصدر (اختياري)
                      </label>
                      <input
                        id="news-author-input"
                        type="text"
                        value={authorNote}
                        onChange={(e) => setAuthorNote(e.target.value)}
                        placeholder="مثال: اللجنة الإعلامية بجمعية ذات أثر"
                        className="w-full px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-sm text-gray-800 focus:outline-2 focus:outline-[#159EAA]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="news-summary-input"
                        className="block text-xs md:text-sm font-medium text-blue-900 mb-1"
                      >
                        ملخص الخبر (يظهر في البطاقة الخارجية) <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="news-summary-input"
                        rows={2}
                        required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="نبذة مختصرة في سطرين توضح أهم تفاصيل الفعالية أو التقرير..."
                        className="w-full px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-sm text-gray-800 leading-relaxed focus:outline-2 focus:outline-[#159EAA]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="news-fulltext-input"
                        className="block text-xs md:text-sm font-medium text-blue-900 mb-1"
                      >
                        التفاصيل الكاملة للخبر (تظهر عند الضغط على «اقرأ التفاصيل الكاملة»)
                      </label>
                      <textarea
                        id="news-fulltext-input"
                        rows={4}
                        value={fullTextRaw}
                        onChange={(e) => setFullTextRaw(e.target.value)}
                        placeholder="اكتب فقرات الخبر بالتفصيل (كل سطر جديد يعتبر فقرة مستقلة)..."
                        className="w-full px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-sm text-gray-800 leading-relaxed focus:outline-2 focus:outline-[#159EAA]"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2.5">
                      <label
                        htmlFor="news-image-url-input"
                        className="block text-xs md:text-sm font-medium text-blue-900"
                      >
                        صورة الخبر (رفع صورة من الهاتف/الكمبيوتر، أو رابط Google Drive، أو اختيار صورة جاهزة)
                      </label>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <input
                          id="news-image-url-input"
                          type="text"
                          dir="ltr"
                          value={imageSrc}
                          onChange={(e) => setImageSrc(e.target.value)}
                          placeholder="/assets/activities/dar_riyad.jpg أو رابط صورة"
                          className="flex-1 px-3.5 py-2 bg-white border border-[#DCE7E5] rounded-xl text-xs md:text-sm text-gray-800 focus:outline-2 focus:outline-[#159EAA]"
                        />

                        <label className="py-2 px-4 rounded-xl bg-white border border-[#DCE7E5] hover:border-[#159EAA] text-blue-900 text-xs md:text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap">
                          <Upload className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
                          <span>رفع صورة من جهازك</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-xs text-gray-600 ml-1">صور أنشطة الجمعية الجاهزة:</span>
                        {PRESET_IMAGES.map((preset) => (
                          <button
                            key={preset.src}
                            type="button"
                            onClick={() => setImageSrc(preset.src)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                              imageSrc === preset.src
                                ? 'bg-blue-900 text-white border-blue-900'
                                : 'bg-white text-gray-700 border-[#DCE7E5] hover:border-[#159EAA]'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-red-700">
                      {formError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-blue-900 hover:bg-[#159EAA] text-white text-xs md:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{editingId ? 'حفظ التعديلات' : 'حفظ ونشر الخبر الآن'}</span>
                    </button>
                  </div>
                </form>

                {/* Existing Articles Management List */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm md:text-base font-bold text-blue-900">
                      أخبار الملف / المضافة ({customArticles.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        onResetDefaultArticles();
                        setPendingDisplayMode('default');
                        setStatusBanner(
                          'تمت استعادة الضبط الافتراضي واعتماد عرض الأخبار التأسيسية الافتراضية فقط.'
                        );
                      }}
                      className="py-1.5 px-3 rounded-lg bg-[#F5F9F7] hover:bg-[#DCE7E5] text-blue-900 text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>استعادة الأخبار التأسيسية الافتراضية</span>
                    </button>
                  </div>

                  {customArticles.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] text-xs md:text-sm text-gray-600">
                      لا توجد أخبار مضافة من ملف خارجي أو من اللوحة حالياً. يمكنك إضافة خبر جديد من النموذج أعلاه أو ربط ملف Google Sheet من التبويب الثاني.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {customArticles.map((article) => (
                        <div
                          key={article.id}
                          className="p-3.5 rounded-xl bg-white border border-[#DCE7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <p className="text-xs font-medium text-teal-600">
                              {article.categoryLabel} · {article.dateLabel}
                            </p>
                            <h5 className="text-sm font-bold text-blue-900 whitespace-normal">
                              {article.title}
                            </h5>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopySheetRow(article)}
                              className="py-1.5 px-3 rounded-lg bg-[#F5F9F7] hover:bg-blue-900 text-blue-900 hover:text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              {copiedId === article.id ? (
                                <Check className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                              )}
                              <span>
                                {copiedId === article.id
                                  ? 'تم النسخ للجدول'
                                  : 'نسخ لـ Google Sheet'}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStartEdit(article)}
                              className="py-1.5 px-3 rounded-lg bg-[#F5F9F7] hover:bg-[#DCE7E5] text-blue-900 text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>تعديل</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteArticle(article.id)}
                              aria-label={`حذف ${article.title}`}
                              className="py-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Foundational Default Articles List */}
                  <div className="pt-2 space-y-2.5">
                    <h4 className="text-sm md:text-base font-bold text-blue-900">
                      الأخبار التأسيسية الافتراضية الموثقة ({defaultArticles.length})
                    </h4>
                    {defaultArticles.map((article) => (
                      <div
                        key={article.id}
                        className="p-3.5 rounded-xl bg-[#F5F9F7]/70 border border-[#DCE7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <p className="text-xs font-medium text-teal-600">
                            {article.categoryLabel} · {article.dateLabel} (خبر افتراضي أساسي)
                          </p>
                          <h5 className="text-sm font-bold text-blue-900 whitespace-normal">
                            {article.title}
                          </h5>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopySheetRow(article)}
                            className="py-1.5 px-3 rounded-lg bg-white hover:bg-blue-900 text-blue-900 hover:text-white border border-[#DCE7E5] text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {copiedId === article.id ? (
                              <Check className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                            <span>
                              {copiedId === article.id
                                ? 'تم النسخ للجدول'
                                : 'نسخ لـ Google Sheet'}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Tab 2: Google Sheet Sync & Account Switching */
              <div className="space-y-5">
                {/* Step-by-step instructions for personal account test -> charity account */}
                <div className="p-4 rounded-2xl bg-[#F5F9F7] border border-[#DCE7E5] space-y-3">
                  <h4 className="text-sm md:text-base font-bold text-blue-900">
                    خطوات التجربة على حسابك الشخصي ثم النقل لحساب الجمعية (متوافق 100% مع Vercel)
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm text-gray-700 leading-relaxed">
                    <li>
                      اضغط على زر <strong>«تحميل قالب Google Sheet الجاهز (CSV)»</strong> بالأسفل، ثم افتح{' '}
                      <a
                        href="https://sheets.new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 font-bold underline"
                      >
                        Google Sheets
                      </a>{' '}
                      بحسابك الشخصي واستورد الملف (File &rarr; Import &rarr; Upload).
                    </li>
                    <li>
                      من داخل Google Sheets اضغط <strong>مشاركة (Share)</strong> واجعل الصلاحية{' '}
                      <strong>«أي شخص لديه الرابط يمكنه العرض» (Anyone with the link can view)</strong>، أو من قائمة{' '}
                      <strong>File &rarr; Share &rarr; Publish to web (CSV)</strong>، ثم انسخ الرابط والصقه في الحقل بالأسفل.
                    </li>
                    <li>
                      عند إضافة أي خبر جديد هنا في لوحة التحكم، اضغط زر <strong>«نسخ لـ Google Sheet»</strong> بجوار الخبر والصقه (`Ctrl+V`) في صف جديد داخل جدولك ليظهر فوراً لكل زوار موقع Vercel على جميع الهواتف!
                    </li>
                    <li>
                      <strong>عند النقل لحساب الجمعية الرسمي لاحقاً:</strong> كرر نفس الخطوة على حساب الجمعية وضع الرابط الجديد هنا (أو في متغير البيئة{' '}
                      <code className="font-mono-num bg-white px-1.5 py-0.5 rounded border border-[#DCE7E5]">
                        VITE_NEWS_SHEET_CSV_URL
                      </code>{' '}
                      داخل إعدادات Vercel).
                    </li>
                  </ol>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleDownloadCsvTemplate}
                      className="py-2 px-4 rounded-xl bg-white border border-[#159EAA] text-blue-900 hover:bg-blue-900 hover:text-white text-xs md:text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>تحميل قالب Google Sheet الجاهز (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Google Sheet URL Form */}
                <form
                  onSubmit={handleSyncSheetSubmit}
                  className="p-4 rounded-2xl bg-white border border-[#DCE7E5] space-y-3.5"
                >
                  <label
                    htmlFor="google-sheet-url-input"
                    className="block text-xs md:text-sm font-bold text-blue-900"
                  >
                    رابط جدول Google Sheet (حسابك الشخصي للتجربة الآن أو حساب الجمعية لاحقاً)
                  </label>
                  <input
                    id="google-sheet-url-input"
                    type="url"
                    dir="ltr"
                    value={sheetUrlInput}
                    onChange={(e) => setSheetUrlInput(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/.../edit?usp=sharing"
                    className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-xs md:text-sm text-gray-800 focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
                  />

                  {normalizedPreviewUrl && (
                    <p className="text-xs text-gray-600 break-all">
                      رابط جلب البيانات التلقائي (CSV) الجاهز لـ Vercel:{' '}
                      <span className="font-mono-num text-blue-900" dir="ltr">
                        {normalizedPreviewUrl}
                      </span>
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="submit"
                      disabled={isSyncingSheet}
                      className="py-2 px-5 rounded-xl bg-blue-900 hover:bg-[#159EAA] text-white text-xs md:text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <RefreshCw
                        className={`w-4 h-4 shrink-0 ${isSyncingSheet ? 'animate-spin' : ''}`}
                        aria-hidden="true"
                      />
                      <span>
                        {isSyncingSheet
                          ? 'جاري الاتصال بجدول Google Sheet...'
                          : 'حفظ ومزامنة الجدول الآن'}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Official Management Passcode Security Notice */}
                <div className="p-4 rounded-2xl bg-[#F5F9F7] border border-[#DCE7E5] space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-blue-900">
                      <KeyRound className="w-4 h-4 text-[#159EAA]" aria-hidden="true" />
                      <h4 className="text-xs md:text-sm font-bold">
                        حماية رمز المرور السري (خاص بإدارة الجمعية فقط)
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleLockAndClose}
                      className="py-1.5 px-3 rounded-lg bg-white hover:bg-blue-900 text-blue-900 hover:text-white border border-[#DCE7E5] text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>قفل اللوحة الآن</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    لضمان أمان الموقع، تم إيقاف إمكانية تغيير كلمة المرور من المتصفح نهائياً حتى لا يتمكن أي زائر من العبث بها. يتم التحكم في رمز المرور حصرياً من قِبل إدارة الجمعية عبر متغير البيئة السري{' '}
                    <code className="font-mono-num bg-white px-1.5 py-0.5 rounded border border-[#DCE7E5] text-blue-900">
                      VITE_ADMIN_PASSCODE
                    </code>{' '}
                    في إعدادات حساب <strong>Vercel</strong> الخاص بالجمعية. كما أن تعديل جدول Google Sheet لا يتم إلا من خلال الحساب الذي يمتلك صلاحية التعديل (حسابك الشخصي الآن أو حساب الجمعية الرسمي).
                  </p>
                </div>

                {sheetStatusMsg && (
                  <div
                    role="status"
                    className="p-3.5 rounded-xl bg-[#F5F9F7] border border-[#159EAA] text-xs md:text-sm text-blue-900 font-medium"
                  >
                    {sheetStatusMsg}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
