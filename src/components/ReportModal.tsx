
import { ReportCover } from './ReportCover';

interface ReportModalProps {
    report: any;
    onClose: () => void;
}

export function ReportModal({ report, onClose }: ReportModalProps) {
    if (!report) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-md text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Image Side */}
                <div className="w-full md:w-2/5 bg-slate-100 relative">
                    <ReportCover
                        report={report}
                        className="w-full h-full object-cover min-h-[300px]"
                    />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col">
                    <div className="inline-block bg-tsinghua/10 text-tsinghua font-semibold px-3 py-1 rounded-full text-xs mb-4 w-max">
                        版本 {report.version} • {report.date}
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                        {report.title}
                    </h2>

                    <div className="prose prose-slate prose-sm sm:prose-base mb-8">
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {report.abstract}
                        </p>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100">
                        <a
                            href={report.pdfUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center px-8 py-4 bg-tsinghua text-white rounded-xl font-bold text-lg hover:bg-purple-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-tsinghua/30"
                        >
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            下载报告文件
                        </a>
                        <p className="text-center text-slate-400 text-xs mt-4">
                            直接点击下载完整的 {report.version} 版本报告文件
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
