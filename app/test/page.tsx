'use client';

import { useState } from 'react';

export default function TestEuropeZahakian() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const testData = {
    name: 'علی',
    last_name: 'احمدی',
    parent_names: 'محمد و فاطمه',
    country: 'آلمان',
    city: 'برلین',
    information: 'اطلاعات تستی',
    links: ['https://example.com', 'https://test.com'],
    images: ['image1.jpg', 'image2.jpg'],
    doc: ['doc1.pdf'],
    files: ['file1.mp4'],
    additional_info: 'اطلاعات اضافی',
    audit_1: true,
    audit_2: false,
    audit_3: true,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/europe-zahakian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await res.json();
      setResponse(data);
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
      <h1 className="text-2xl font-bold mb-6">تست API اروپا ذهکیان</h1>

      <div className="space-y-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'در حال ارسال...' : 'ارسال داده تستی'}
        </button>

        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 mr-4"
        >
          {loading ? 'در حال دریافت...' : 'دریافت همه رکوردها'}
        </button>
      </div>

      {response && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h2 className="font-bold mb-2">پاسخ:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}