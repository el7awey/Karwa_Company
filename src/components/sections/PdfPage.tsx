const PdfPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src="https://nlhjuscebquwslzqtsva.supabase.co/storage/v1/object/public/about/about.pdf"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfPage;
