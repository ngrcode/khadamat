'use client';

import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import './toastProvider.css';

import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
  success: ' bg-success border-1 border-tint-300',
  error: ' bg-error border-1 border-error-border',
  warning: 'bg-warning border-1 border-warning-border',
  info: 'bg-tint-500 ',
  default: 'bg-error-border border-1 border-error-border',
  dark: 'bg-text-200 font-gray-300',
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        //TODO: { type }: any
        toastClassName={({ type }: any) =>
          `${
            contextClass[type || 'default']
          } relative top-32  flex  p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer`
        }
        bodyClassName={() =>
          'text-white w-full  flex justify-between items-center font-white font-med block p-3 '
        }
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        closeButton={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2} 
        theme="colored"
      />
    </>
  );
}
