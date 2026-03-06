import { useState, useEffect } from 'react';
import { ReportCard } from './components/ReportCard';
import { ReportModal } from './components/ReportModal';

function App() {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}reports_config.json`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Failed to load reports:', err));
  }, []);

  const categories = ['全部', ...Array.from(new Set(reports.map(r => r.category || '未分类')))];
  const filteredReports = activeCategory === '全部' ? reports : reports.filter(r => (r.category || '未分类') === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-tsinghua selection:text-white pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm/50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-tsinghua to-purple-800 rounded-xl flex items-center justify-center shadow-lg shadow-tsinghua/20">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">清华大学新闻与新媒体研究中心</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">THU New Media Research Center</p>
            </div>
          </div>
          <a href="https://github.com/thu-nmrc/THU-ZeeLin-Reports" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors hidden sm:block">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-tsinghua/80 to-slate-900 opacity-90" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl lg:mx-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md leading-tight">
              清新研究团队·清华新闻学院前沿研究报告文库
            </h2>
            <p className="text-lg sm:text-xl leading-8 text-slate-200 font-medium mb-4">
              聚焦前沿科技、媒介演进、数字治理与社会变迁。本站收录沈阳教授团队及清华新闻学院公开发布的各类别深度研究成果，供全球研究者免费沉浸式阅览与下载。
            </p>
            <p className="text-sm sm:text-base leading-7 text-slate-400 font-normal">
              Focusing on cutting-edge technology, media evolution, digital governance, and social transformation. This digital library collects diverse in-depth research reports published by Professor Shen Yang's team and the Tsinghua School of Journalism and Communication, freely accessible for global researchers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 border-l-4 border-tsinghua pl-4">全部报告</h2>
            <span className="ml-4 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">共 {filteredReports.length} 份</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat as string)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                  ? 'bg-tsinghua text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-tsinghua hover:text-tsinghua'
                  }`}
              >
                {cat as string}
              </button>
            ))}
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin w-8 h-8 rounded-full border-4 border-tsinghua border-t-transparent mb-4"></div>
            <p className="text-slate-500 font-medium">加载配置中...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium">分类下暂无报告</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => setSelectedReport(report)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      {selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}

export default App;
