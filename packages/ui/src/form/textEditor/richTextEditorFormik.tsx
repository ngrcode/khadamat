

  import React from 'react';
import { Formik, Form, Field } from 'formik';
import RichTextEditor from './richTextEditor';

const richTextEditorFormik = () => {
  return (
    <Formik
      initialValues={{ content: '' }}
      onSubmit={(values) => {
      }}
    >
      {({ values }) => (
        <Form>
          <h1 className="text-xl font-bold mb-4">Create a New Post</h1>

          <Field
            name="content"
            component={RichTextEditor}
            placeholder="Write your content here..."
            style={{ minHeight: '800px' }} 
              className="min-h-[200px]"

          />

          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            Submit
          </button>

          <div className="mt-4">
            <h3>Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: values.content }} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default richTextEditorFormik;
