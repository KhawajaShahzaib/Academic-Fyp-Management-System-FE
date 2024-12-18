import React, { useState } from 'react';

const PdfUpload = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        onUpload(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PdfUpload;
