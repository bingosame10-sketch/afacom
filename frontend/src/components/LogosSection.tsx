import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Logo {
  id: string;
  imageUrl: string;
  altText: string;
  position: number;
}

export function LogosSection() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logos`);
      const data = await response.json();
      setLogos(data);
    } catch (err) {
      console.error('Error fetching logos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="bg-gray-100 h-24"></div>;

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center gap-8">
          {logos.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No logos added yet
            </div>
          ) : (
            logos
              .sort((a, b) => a.position - b.position)
              .map(logo => (
                <div key={logo.id} className="flex-shrink-0">
                  <img
                    src={logo.imageUrl}
                    alt={logo.altText}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
