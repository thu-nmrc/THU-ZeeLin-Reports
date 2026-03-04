

interface ReportCardProps {
    report: {
        id: string;
        title: string;
        version: string;
        date: string;
        abstract: string;
        coverUrl: string;
        pdfUrl: string;
    };
    onClick: () => void;
}

export function ReportCard({ report, onClick }: ReportCardProps) {
    return (
        <div
            onClick={onClick}
            className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                    src={report.coverUrl}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/800x600/660874/FFFFFF/png?text=AIGC+${report.version}`;
                    }}
                />
                <div className="absolute top-4 left-4 bg-tsinghua/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    v{report.version}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">{report.date}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2">{report.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">{report.abstract}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-tsinghua font-medium text-sm">
                    <span>阅读详情</span>
                    <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
            </div>
        </div>
    );
}
