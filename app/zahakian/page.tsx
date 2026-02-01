'use client';

import { useState } from 'react';

export default function TestEuropeZahakian() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    parent_names: '',
    country: '',
    city: '',
    information: '',
    links: '',
    images: '',
    doc: '',
    files: '',
    additional_info: '',
    audit_1: false,
    audit_2: false,
    audit_3: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        links: formData.links ? formData.links.split(',').map(l => l.trim()) : [],
        images: formData.images ? formData.images.split(',').map(i => i.trim()) : [],
        doc: formData.doc ? formData.doc.split(',').map(d => d.trim()) : [],
        files: formData.files ? formData.files.split(',').map(f => f.trim()) : [],
      };

      const res = await fetch('/api/europe-zahakian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();
      setResponse(data);
      
      if (res.ok) {
        // Reset form
        setFormData({
          name: '',
          last_name: '',
          parent_names: '',
          country: '',
          city: '',
          information: '',
          links: '',
          images: '',
          doc: '',
          files: '',
          additional_info: '',
          audit_1: false,
          audit_2: false,
          audit_3: false,
        });
      }
    } catch (error) {
      setResponse({ error: 'خطا در ارسال اطلاعات' });
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/europe-zahakian');
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'خطا در دریافت اطلاعات' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">فرم ثبت اطلاعات اروپا ذهکیان</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">نام</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نام والدین</label>
            <input
              type="text"
              name="parent_names"
              value={formData.parent_names}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">کشور</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">شهر</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اطلاعات</label>
          <textarea
            name="information"
            value={formData.information}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">لینک‌ها (با کاما جدا کنید)</label>
          <input
            type="text"
            name="links"
            value={formData.links}
            onChange={handleChange}
            placeholder="https://example.com, https://test.com"
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تصاویر</label>
          <input
            type="file"
            name="images"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
            const fileNames = Array.from(files).map(f => f.name).join(', ');
            setFormData(prev => ({ ...prev, images: fileNames }));
              }
            }}
            multiple
            accept="image/*"
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {formData.images && (
            <p className="text-sm text-gray-400 mt-1">فایل‌های انتخاب شده: {formData.images}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسناد (با کاما جدا کنید)</label>
          <input
            type="text"
            name="doc"
            value={formData.doc}
            onChange={handleChange}
            placeholder="doc1.pdf, doc2.pdf"
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">فایل‌ها (با کاما جدا کنید)</label>
          <input
            type="text"
            name="files"
            value={formData.files}
            onChange={handleChange}
            placeholder="file1.mp4, file2.mp3"
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اطلاعات اضافی</label>
          <textarea
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              name="audit_1"
              checked={formData.audit_1}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm">بررسی ۱</span>
          </label>

          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              name="audit_2"
              checked={formData.audit_2}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm">بررسی ۲</span>
          </label>

          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              name="audit_3"
              checked={formData.audit_3}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm">بررسی ۳</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'در حال ارسال...' : 'ثبت اطلاعات'}
          </button>

          <button
            type="button"
            onClick={handleFetch}
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? 'در حال دریافت...' : 'دریافت همه رکوردها'}
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h2 className="font-bold mb-2">پاسخ:</h2>
          <pre className="text-sm overflow-auto text-green-400">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}