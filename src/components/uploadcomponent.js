import React, { useState } from 'react';
import { uploadFile } from '../api/upload';

function UploadComponent() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    try {
      const result = await uploadFile(file, title);
      alert("Upload successful!");
      console.log(result);
    } catch (err) {
      alert("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadComponent;

