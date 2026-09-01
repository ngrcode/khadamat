// app/global-error.js
'use client';

import { Result, Button } from 'antd';

export default function GlobalError({ error, reset }) {
        return (
                <html className="h-full bg-gray-100">
                        <body className="flex items-center justify-center min-h-screen">
                                <div className="max-w-lg p-6 bg-white shadow-md rounded-lg">
                                        <Result
                                                status="500"
                                                title="Something went wrong"
                                                subTitle={error.message || "Please try again later."}
                                                extra={
                                                        <Button
                                                                type="primary"
                                                                onClick={() => reset()}
                                                                className="bg-blue-500 hover:bg-blue-600"
                                                        >
                                                                Try Again
                                                        </Button>
                                                }
                                        />
                                </div>
                        </body>
                </html>
        );
}
