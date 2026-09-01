'use client';

import { FieldProps } from 'formik';
import TiptapEditorComponent from './index'; // Adjust the import path as needed

interface TiptapFormikProps {
        label?: string;
        maxLength?: number;
        className?: string;
        imageUrl: string;
        wrapperClassName?: string;
        setImageUrl: (url: string) => void;
       
}

const TexeEditorCKFormik: React.FC<TiptapFormikProps & FieldProps> = ({
        field,
        form,
        label,
        imageUrl,
        setImageUrl,
        wrapperClassName,
        ...props
}) => {
        // Handle content change for Formik
        const handleChange = (content: string) => {
                form.setFieldValue(field.name, content);
        };

        const error = form.errors[field.name] as string | undefined;
        const touched = form.touched[field.name] as boolean | undefined;

        return (
                <div className={`w-full ${props.className || ''}`}>
                        {label && (
                                <label className="app-form-label block text-sm font-medium mb-2">
                                        {label}
                                </label>
                        )}

                        <TiptapEditorComponent
                                content={field.value || ''}
                                onChange={handleChange}
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                wrapperClassName={wrapperClassName} 
                                {...props}
                        />

                        {touched && error && (
                                <div className="mt-1 text-sm text-red-600">{error}</div>
                        )}
                </div>
        );
};

export default TexeEditorCKFormik;