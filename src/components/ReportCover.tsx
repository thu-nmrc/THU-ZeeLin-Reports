import { useEffect, useMemo, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const PDF_THUMB_CACHE = new Map<string, string>();

interface ReportForCover {
  title: string;
  version: string;
  coverUrl?: string;
  pdfUrl: string;
}

interface ReportCoverProps {
  report: ReportForCover;
  className: string;
}

function isPdfFile(url: string): boolean {
  const clean = url.split('#')[0]?.split('?')[0]?.toLowerCase() ?? '';
  return clean.endsWith('.pdf');
}

function buildFallbackCover(version: string): string {
  const text = encodeURIComponent(`AIGC ${version}`);
  return `https://placehold.co/800x600/660874/FFFFFF/png?text=${text}`;
}

export function ReportCover({ report, className }: ReportCoverProps) {
  const [pdfThumbUrl, setPdfThumbUrl] = useState<string | null>(null);
  const [pdfThumbFailed, setPdfThumbFailed] = useState(false);

  const shouldRenderPdfCover = useMemo(() => isPdfFile(report.pdfUrl), [report.pdfUrl]);

  useEffect(() => {
    if (!shouldRenderPdfCover) {
      setPdfThumbUrl(null);
      setPdfThumbFailed(false);
      return;
    }

    const cached = PDF_THUMB_CACHE.get(report.pdfUrl);
    if (cached) {
      setPdfThumbUrl(cached);
      setPdfThumbFailed(false);
      return;
    }

    let cancelled = false;

    const renderPdfThumb = async () => {
      try {
        const loadingTask = getDocument({ url: report.pdfUrl });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const rawViewport = page.getViewport({ scale: 1.5 });
        const maxWidth = 1200;
        const adjustScale = rawViewport.width > maxWidth ? maxWidth / rawViewport.width : 1;
        const viewport = page.getViewport({ scale: 1.5 * adjustScale });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas context unavailable');
        }

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        await page.render({ canvas, canvasContext: ctx, viewport }).promise;

        const thumbUrl = canvas.toDataURL('image/jpeg', 0.86);
        PDF_THUMB_CACHE.set(report.pdfUrl, thumbUrl);

        if (!cancelled) {
          setPdfThumbUrl(thumbUrl);
          setPdfThumbFailed(false);
        }
      } catch {
        if (!cancelled) {
          setPdfThumbFailed(true);
        }
      }
    };

    void renderPdfThumb();

    return () => {
      cancelled = true;
    };
  }, [report.pdfUrl, shouldRenderPdfCover]);

  if (shouldRenderPdfCover && !pdfThumbUrl && !pdfThumbFailed) {
    return (
      <div className={`${className} bg-slate-100 flex items-center justify-center`}>
        <span className="text-xs text-slate-500 font-medium">封面生成中...</span>
      </div>
    );
  }

  const src =
    (shouldRenderPdfCover && pdfThumbUrl) || report.coverUrl || buildFallbackCover(report.version);

  return (
    <img
      src={src}
      alt={report.title}
      className={className}
      onError={(e) => {
        e.currentTarget.src = buildFallbackCover(report.version);
      }}
    />
  );
}
