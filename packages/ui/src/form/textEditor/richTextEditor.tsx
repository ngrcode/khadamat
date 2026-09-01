'use client'; // Required for Next.js 13+

import { Typography } from 'antd';
import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Title, Text } = Typography;

const RichTextEditor = ({ field, form, label, classNameLabel, ...props }) => {
  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
  };

  // Get the error and touched state from Formik
  const error = form.errors[field.name] as string | undefined;
  const touched = form.touched[field.name] as boolean | undefined;

  // Custom toolbar configuration
  const modules = {
    toolbar: [
      // Inline Styles
      [{ font: [] }, { size: [] }], // Font family and size
      [{ bold: true }, { italic: true }, { underline: true }, { strike: true }, { code: true }], // Bold, italic, underline, strike, code
      [{ color: [] }, { background: [] }], // Text and background color
      [{ script: 'sub' }, { script: 'super' }], // Subscript and superscript
      [{ link: true }, { image: true }, { video: true }, { formula: true }], // Link, image, video, formula

      // Block Styles
      [{ header: '1' }, { header: '2' }, { blockquote: true }, { 'code-block': true }], // Header, blockquote, code block
      [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and bullet lists
      [{ indent: '-1' }, { indent: '+1' }], // Indent/outdent
      [{ align: [] }], // Text alignment
      [{ direction: 'rtl' }], // Text direction

      // Clear formatting
      ['clean'], // Remove formatting
    ],
  };

  const formats = [
    // Inline formats
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    // Block formats
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    // Embeds
    'formula',
    'image',
    'video',
  ];

  return (
    <>
      <Title level={5} className={classNameLabel}>
        {label}
      </Title>
      <ReactQuill
        value={field.value || ''}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
        className="editor-body"
        placeholder={props.placeholder || 'Write your content here...'}
        style={{
          ...props.style, // Merge with custom styles if provided
          direction: 'rtl', // Ensure the editor is RTL
          textAlign: 'right', // Ensure the text starts on the right
        }}
      />

      {/* Display error message if field has been touched and there's an error */}
      {touched && error && (
        <Text className="p-8" type="danger" style={{ marginTop: '0.5rem' }}>
          {error}
        </Text>
      )}
    </>
  );
};

export default RichTextEditor;
