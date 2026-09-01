export type DownloadPayrollStatementPdfParams = {
  element: HTMLElement;
  year: string;
  month: string;
};

const getFileName = (year: string, month: string) =>
  `fishman-${year}-${month}.pdf`;

export const downloadPayrollStatementPdf = async ({
  element,
  year,
  month,
}: DownloadPayrollStatementPdfParams) => {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  await document.fonts?.ready;

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    height: element.scrollHeight,
    logging: false,
    scale: 2,
    useCORS: true,
    width: element.scrollWidth,
    windowHeight: Math.max(window.innerHeight, element.scrollHeight),
    windowWidth: Math.max(window.innerWidth, element.scrollWidth),
  });

  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    format: "a4",
    orientation: "landscape",
    unit: "mm",
  });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;
  const imageRatio = canvas.width / canvas.height;
  let imageWidth = maxWidth;
  let imageHeight = imageWidth / imageRatio;

  if (imageHeight > maxHeight) {
    imageHeight = maxHeight;
    imageWidth = imageHeight * imageRatio;
  }

  pdf.addImage(
    imageData,
    "PNG",
    (pageWidth - imageWidth) / 2,
    (pageHeight - imageHeight) / 2,
    imageWidth,
    imageHeight,
  );
  pdf.save(getFileName(year, month));
};
