import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WordForm = () => {
  const [docUrl, setDocUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/get-word-url')
      .then(response => setDocUrl(response.data.url))
      .catch(error => console.error('Error fetching Word URL:', error));
  }, []);

  return (
    <div>
      <h1>Edit the Word Document</h1>
      {docUrl ? (
        <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${docUrl}`} width="100%" height="600px"></iframe>
      ) : (
        <p>Loading document...</p>
      )}
      <button onClick={() => axios.post('http://localhost:8000/convert-to-pdf')
        .then(response => window.open(response.data.pdfUrl, '_blank'))
        .catch(error => console.error('Conversion failed:', error))
      }>
        Convert & Download PDF
      </button>
    </div>
  );
};

export default WordForm;
