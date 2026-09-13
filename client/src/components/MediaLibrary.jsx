import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL } from '../services/api';

const MediaLibrary = ({ themes }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTheme, setFilterTheme] = useState('all');

  const fetchMedia = async () => {
    try {
      const res = await api.get('/admin/media');
      setMedia(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch media', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      try {
        await api.delete(`/admin/media/${id}`);
        fetchMedia(); // Refresh list
      } catch (error) {
        console.error('Failed to delete media', error);
      }
    }
  };

  const filteredMedia = filterTheme === 'all' 
    ? media 
    : media.filter(m => m.themeSlug === filterTheme);

  if (loading) return <div>Loading media...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Media Library</h3>
        <select
          value={filterTheme}
          onChange={(e) => setFilterTheme(e.target.value)}
          className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
        >
          <option value="all">All Themes</option>
          {themes.map(t => (
            <option key={t.slug} value={t.slug}>{t.name}</option>
          ))}
        </select>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No media found for this selection.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredMedia.map((item) => (
            <div key={item._id} className="group relative rounded-lg border border-gray-200 bg-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden h-40">
                {item.fileType === 'image' ? (
                  <img src={`${API_BASE_URL}/api/media/stream/${item.gridFsFileId}`} alt={item.caption || 'Media'} className="object-cover w-full h-full" />
                ) : (
                  <video src={`${API_BASE_URL}/api/media/stream/${item.gridFsFileId}`} className="object-cover w-full h-full" />
                )}
              </div>
              <div className="p-3">
                <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.filename}</p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none">{themes.find(t=>t.slug === item.themeSlug)?.name || item.themeSlug}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 w-full flex items-center justify-center rounded-md border border-transparent bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
