import Link from 'next/link';
import { headers } from 'next/headers';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are reset properly if needed
import { t } from '@/configs/language';

// Simulating a fetch function for site data
async function getSiteData(domain) {
    // Replace with actual logic to fetch site data based on domain
    return {
        name: `Website for ${domain}`,
    };
}

export default async function NotFound() {
    const headersList = headers();
    const domain = headersList.get('host');
    const data = await getSiteData(domain); // Fetch site data based on domain

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-red-500 mb-4">
                    {t('notFoundTitle', { name: data.name })}
                </h2>
                <p className="text-gray-600 mb-6">{t('notFoundDescription')}</p>

                <p className="text-blue-600 mb-4">
                    <Link href="/">{t('showHome')}</Link>
                </p>

                <Button
                    type="primary"
                    icon={<HomeOutlined />}
                    size="large"
                    className="hover:bg-blue-600"
                    href="/"
                >
                    {t('backHome')}
                </Button>
            </div>
        </div>
    );
}
