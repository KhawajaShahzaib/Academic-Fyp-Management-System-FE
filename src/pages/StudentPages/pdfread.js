import React, { useState } from 'react';
import { pdfjs } from 'pdfjs-dist';
import PdfUpload from './PdfUpload';
import '../../components/Headerstudent.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
  const [pdf, setPdf] = useState(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onPdfUpload = (arrayBuffer) => {
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
      },
      (error) => {
        console.error('Error loading PDF:', error);
      }
    );
  };

  const renderPage = (pageNumber) => {
    if (!pdf) return;
    pdf.getPage(pageNumber).then((page) => {
      const canvas = document.getElementById('pdf-canvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  };

  // Load the first page when PDF is ready
  React.useEffect(() => {
    if (pdf) {
      renderPage(page);
    }
  }, [pdf, page]);

  return (
    <div>
      <PdfUpload onUpload={onPdfUpload} />
      {pdf && (
        <div>
          <canvas id="pdf-canvas" />
          <div>
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page} of {numPages}
            </span>
            <button
              disabled={page >= numPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
