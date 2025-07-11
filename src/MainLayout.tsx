import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router'

export default function MainLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <div className="relative min-h-screen">
      <header className="p-4 border-b flex justify-between items-center relative">
        <h1 className="font-bold flex items-center gap-2">
          <span role="img" aria-label="icon">📚</span> Bài Tập
        </h1>
        <button
          className="border px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {showDropdown ? 'Đóng ▲' : 'Chọn bài ▼'}
        </button>

s        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-white border shadow rounded w-60 z-50 p-4">
            <div className="space-y-2">
              <div>
                <strong>Day 1</strong>
                <ul className="ml-4 list-disc">
                  <li><button onClick={() => handleNavigate("/day1/bai1/page1")}>Bài 1 - Page 1</button></li>
                  <li><button onClick={() => handleNavigate("/day1/bai1/page2")}>Bài 1 - Page 2</button></li>
                  <li><button onClick={() => handleNavigate("/day1/bai2/page1")}>Bài 2 - Page 1</button></li>
                  <li><button onClick={() => handleNavigate("/day1/bai2/page2")}>Bài 2 - Page 2</button></li>
                </ul>
              </div>
              <div>
                <strong>Day 2</strong>
                <ul className="ml-4 list-disc">
                  <li><button onClick={() => handleNavigate("/day2/bai1")}>Bài 1</button></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
