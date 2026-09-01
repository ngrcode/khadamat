import { createMapper } from "@/components/Table/mappers/createMapper";
import { formatters } from "@/components/Table/mappers/formatters";

// ------------------------------------------------------------
// ۱. تعریف نوع خروجی برای هر آیتم اطلاعیه (همه فیلدها)
// ------------------------------------------------------------
interface NoticeItem {
  id: string;
  title: string;
  excerpt: string | null;
  body: string;
  createBy: string | null;
  modifiedBy: string | null;
  created: string;          // تاریخ میلادی
  lastModified: string | null;
  isPublish: boolean;
  isPublished: number;      // 0 یا 1
  status: number;
  startTime: string;        // ساعت شروع
  finishTime: string;       // ساعت پایان
  startedAt: string;        // تاریخ میلادی شروع
  finishedAt: string;       // تاریخ میلادی پایان
  startedAtString: string;  // تاریخ شمسی همراه با ساعت
  finishedAtString: string; // تاریخ شمسی همراه با ساعت
  attachFile: string;
}

// ------------------------------------------------------------
// ۲. ساخت مپر با استفاده از createMapper (همه فیلدها)
// ------------------------------------------------------------
const noticeMapper = createMapper<NoticeItem>({
  id: {
    source: 'id',
  },
  title: {
    source: 'title',
  },
  excerpt: {
    source: 'excerpt',
  },
  body: {
    source: 'body',
  },
  createBy: {
    source: 'createBy',
  },
  modifiedBy: {
    source: 'modifiedBy',
  },
  created: {
    source: 'created',
    formatter: formatters.date,    
  },
  lastModified: {
    source: 'lastModified',
    formatter: formatters.date,
  },
  isPublish: {
    source: 'isPublish',
  },
  isPublished: {
    source: 'isPublished',
  },
  status: {
    source: 'status',
  },
  startTime: {
    source: 'startTime',
  },
  finishTime: {
    source: 'finishTime',
  },
  startedAt: {
    source: 'startedAt',
    formatter: formatters.date,     // تبدیل تاریخ میلادی شروع
  },
  finishedAt: {
    source: 'finishedAt',
    formatter: formatters.date,     // تبدیل تاریخ میلادی پایان
  },
  startedAtString: {
    source: 'startedAtString',      // اینجا نیازی به فرمتر نیست چون خودش شمسی است
  },
  finishedAtString: {
    source: 'finishedAtString',
  },
  attachFile: {
    source: 'attachFile',
  },
});

// ------------------------------------------------------------
// ۳. تابع اصلی selectFunction
// ------------------------------------------------------------
export const selectFunction = (data: any) => {
  // استخراج آرایه اطلاعیه‌ها از ساختار پاسخ
  const items = data?.info || data?.result?.info || data?.items || [];

  // تعداد کل (در اینجا از طول آرایه استفاده می‌شود)
  const totalCount = data?.totalCount || data?.result?.totalCount || items.length;

  // اعمال مپر روی هر آیتم
  return {
    Items: items.map(noticeMapper),
    TotalCount: totalCount,
  };
};
