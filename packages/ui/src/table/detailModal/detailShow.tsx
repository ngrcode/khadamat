import React, { useRef } from 'react';
import { t } from '@repo/i18n';
import { Card, Typography, Empty, Tag, Space, Divider, Button, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
  FileTextOutlined,
  IdcardOutlined,
  PrinterOutlined,
} from '@ant-design/icons';

interface DetailProps {
  data: {
    [key: string]: unknown;
  };
  loading?: boolean;
}

const { Title, Text, Paragraph } = Typography;

const fieldLabels: { [key: string]: string } = {
  Id: 'id',
  Key: 'key',
  Email: 'email',
  FirstName: 'firstName',
  LastName: 'lastName',
  Message: 'message',
  Mobile: 'mobile',
  MessageShow: 'messageShow',
  AnswerShow: 'answerShow',
  SuggestionTypeTitle: 'suggestionTypeTitle',
};

const fieldIcons: { [key: string]: React.ReactNode } = {
  Id: <IdcardOutlined />,
  Email: <MailOutlined />,
  Mobile: <PhoneOutlined />,
  FirstName: <UserOutlined />,
  LastName: <UserOutlined />,
  Message: <MessageOutlined />,
  MessageShow: <MessageOutlined />,
  AnswerShow: <FileTextOutlined />,
  SuggestionTypeTitle: <FileTextOutlined />,
};

const getFieldIcon = (key: string): React.ReactNode => {
  return fieldIcons[key] || <FileTextOutlined />;
};

// تابع safe برای تبدیل مقدار به رشته قابل نمایش
const getDisplayValue = (value: any): string => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return '';
  }

  // Handle primitive types
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  // Handle React elements
  if (React.isValidElement(value)) {
    return '[React Component]';
  }

  // Handle functions
  if (typeof value === 'function') {
    return '[Function]';
  }

  // Handle Date
  if (value instanceof Date) {
    return value.toLocaleDateString('fa-IR');
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    try {
      const items = value.map(item => {
        if (typeof item === 'object' && item !== null) {
          return '[Object]';
        }
        return String(item);
      });
      return items.join(', ');
    } catch {
      return '[Array]';
    }
  }

  // Handle Objects - safe stringify
  try {
    // Check for circular reference
    const cache = new WeakSet();
    const safeValue = JSON.stringify(value, (key, val) => {
      if (typeof val === 'object' && val !== null) {
        if (cache.has(val)) {
          return '[Circular Reference]';
        }
        cache.add(val);
      }
      if (React.isValidElement(val)) return '[React Component]';
      if (typeof val === 'function') return '[Function]';
      return val;
    });
    return safeValue;
  } catch (error) {
    return '[Object]';
  }
};

// تابع escape HTML برای جلوگیری از XSS
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const DetailShow: React.FC<DetailProps> = ({ data, loading = false }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // دریافت داده‌ها به صورت مستقیم
    const entries = Object.entries(data);
    const midPoint = Math.ceil(entries.length / 2);
    const firstColumnEntries = entries.slice(0, midPoint);
    const secondColumnEntries = entries.slice(midPoint);

    // تولید HTML برای ستون اول
    const generateFirstColumn = () => {
      return firstColumnEntries.map(([key, value]) => {
        const displayValue = getDisplayValue(value);
        const label = t(fieldLabels[key] || key);
        const finalValue = displayValue || t('notEntered');

        return `
          <div class="print-item">
            <div class="print-label">${escapeHtml(label)}</div>
            <div class="print-value">${escapeHtml(finalValue)}</div>
          </div>
        `;
      }).join('');
    };

    // تولید HTML برای ستون دوم
    const generateSecondColumn = () => {
      return secondColumnEntries.map(([key, value]) => {
        const displayValue = getDisplayValue(value);
        const label = t(fieldLabels[key] || key);
        const finalValue = displayValue || t('notEntered');

        return `
          <div class="print-item">
            <div class="print-label">${escapeHtml(label)}</div>
            <div class="print-value">${escapeHtml(finalValue)}</div>
          </div>
        `;
      }).join('');
    };

    const answerShowValue = getDisplayValue(data?.AnswerShow);
    const hasAnswer = answerShowValue && answerShowValue !== t('notEntered');

    // استایل‌های کامل چاپ
    const printStyles = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>${escapeHtml(t('detailsReport') || 'گزارش جزئیات')}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'IranSans', 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
            background: white;
            padding: 20px;
            direction: rtl;
          }
          
          @page {
            size: A4;
            margin: 15mm;
          }
          
          .print-container {
            max-width: 100%;
            margin: 0 auto;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #333;
          }
          
          .print-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #1a1a1a;
          }
          
          .print-date {
            font-size: 12px;
            color: #666;
          }
          
          .two-columns {
            display: flex;
            gap: 30px;
            margin-bottom: 30px;
          }
          
          .column {
            flex: 1;
          }
          
          .print-item {
            margin-bottom: 16px;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .print-label {
            font-weight: 600;
            background-color: #f5f5f5;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 4px;
            font-size: 13px;
            color: #1a1a1a;
            border-right: 3px solid #1890ff;
          }
          
          .print-value {
            padding: 8px 12px;
            color: #333;
            font-size: 13px;
            line-height: 1.5;
            border-bottom: 1px solid #e8e8e8;
            word-wrap: break-word;
          }
          
          .answer-section {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #b7eb8f;
            border-radius: 8px;
            background-color: #f6ffed;
            page-break-inside: avoid;
          }
          
          .answer-title {
            font-size: 16px;
            font-weight: bold;
            color: #237804;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .answer-content {
            line-height: 1.6;
            color: #333;
            white-space: pre-wrap;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .no-print {
              display: none;
            }
            
            .print-item {
              break-inside: avoid;
            }
          }
          
          @media (max-width: 700px) {
            .two-columns {
              flex-direction: column;
              gap: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <div class="print-title">${escapeHtml(t('detailsReport') || 'گزارش جزئیات')}</div>
            <div class="print-date">
              ${escapeHtml(t('printDate') || 'تاریخ چاپ')}: ${new Date().toLocaleDateString('fa-IR')} - 
              ${new Date().toLocaleTimeString('fa-IR')}
            </div>
          </div>
          
          <div class="two-columns">
            <div class="column">
              ${generateFirstColumn()}
            </div>
            <div class="column">
              ${generateSecondColumn()}
            </div>
          </div>
          
          ${hasAnswer ? `
            <div class="answer-section">
              <div class="answer-title">
                📄 ${escapeHtml(t('Answer'))} :
              </div>
              <div class="answer-content">
                ${escapeHtml(answerShowValue)}
              </div>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;

    // باز کردن پنجره چاپ
    const printWindow = window.open('', '_blank', 'width=800,height=600,toolbar=yes,scrollbars=yes,menubar=yes');

    if (!printWindow) {
      message.error('لطفا مسدودکننده پنجره بازشو را غیرفعال کنید');
      return;
    }

    printWindow.document.write(printStyles);
    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  const hasData = data && Object.keys(data).length > 0;

  if (!hasData && !loading) {
    return (
      <Card
        style={{
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Empty description={t('noDataAvailable')} />
      </Card>
    );
  }

  // Split data into two columns for screen display
  const entries = Object.entries(data);
  const midPoint = Math.ceil(entries.length / 2);
  const firstColumnEntries = entries.slice(0, midPoint);
  const secondColumnEntries = entries.slice(midPoint);

  return (
    <>
      {/* Print Button */}
      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Button
          type="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
          style={{
            borderRadius: '8px',
            height: '40px',
            padding: '0 20px',
            fontWeight: 500,
          }}
        >
          {t('print') || 'چاپ'}
        </Button>
      </div>

      {/* Screen Display Content */}
      <div ref={printRef}>
        <Card
          loading={loading}
          style={{
            direction: 'rtl',
            textAlign: 'right',
            fontFamily: 'IranSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
          bodyStyle={{ padding: '24px' }}
        >
          {/* Header Section - Screen */}
          <div
            style={{
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f0f0f0',
            }}
          >
            <Space size="middle" align="center">
              <Tag color="blue" style={{ borderRadius: '8px', padding: '4px 12px' }}>
                {t('details')}
              </Tag>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                {t('recordInformation')}
              </Text>
            </Space>
          </div>

          {/* Two Column Layout for Screen */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              {firstColumnEntries.map(([key, value]) => {
                const displayValue = getDisplayValue(value);

                return (
                  <div key={key} style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        fontWeight: 600,
                        backgroundColor: '#fafafa',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        marginBottom: '4px',
                        fontSize: '13px',
                        borderRight: '3px solid #1890ff',
                      }}
                    >
                      <Space size="small">
                        {getFieldIcon(key)}
                        <span>{t(fieldLabels[key] || key)}</span>
                      </Space>
                    </div>
                    <div
                      style={{
                        padding: '8px 12px',
                        color: displayValue ? '#1a1a1a' : '#8c8c8c',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {displayValue || t('notEntered')}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              {secondColumnEntries.map(([key, value]) => {
                const displayValue = getDisplayValue(value);

                return (
                  <div key={key} style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        fontWeight: 600,
                        backgroundColor: '#fafafa',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        marginBottom: '4px',
                        fontSize: '13px',
                        borderRight: '3px solid #1890ff',
                      }}
                    >
                      <Space size="small">
                        {getFieldIcon(key)}
                        <span>{t(fieldLabels[key] || key)}</span>
                      </Space>
                    </div>
                    <div
                      style={{
                        padding: '8px 12px',
                        color: displayValue ? '#1a1a1a' : '#8c8c8c',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {displayValue || t('notEntered')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Answer Section - Screen */}
          {(() => {
            const answerShowValue = getDisplayValue(data?.AnswerShow);
            const hasAnswer = answerShowValue && answerShowValue !== t('notEntered');

            return hasAnswer && (
              <>
                <Divider style={{ margin: '24px 0 20px 0' }} />
                <div
                  style={{
                    marginTop: '8px',
                    padding: '20px',
                    backgroundColor: '#f6ffed',
                    borderRadius: '12px',
                    border: '1px solid #b7eb8f',
                  }}
                >
                  <Space size="middle" align="center" style={{ marginBottom: '12px' }}>
                    <FileTextOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
                    <Title level={5} style={{ margin: 0, color: '#237804' }}>
                      {`${t('Answer')} :`}
                    </Title>
                  </Space>
                  <Paragraph
                    style={{
                      margin: 0,
                      padding: '8px 0',
                      fontSize: '15px',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {answerShowValue}
                  </Paragraph>
                </div>
              </>
            );
          })()}
        </Card>
      </div>
    </>
  );
};

export default DetailShow;