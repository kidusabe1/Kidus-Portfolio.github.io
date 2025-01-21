pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    const initPDFViewer = () => {
        pdfjsLib.getDocument("ATS_CV_Variant").promise
        .then(pdfDoc => {
            console.log("PDF Loaded:", pdfDoc);
        })
        .catch(pdfErr => {
            console.log("Failed to load PDF:", pdfErr);
        });
    };

    $(function() {
        initPDFViewer();
    });