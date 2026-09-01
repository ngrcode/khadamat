import { createMapper } from "@/components/Table/mappers/createMapper";
import { formatters } from "@/components/Table/mappers/formatters";


interface NoticeItem {
  id: string;
  title: string | null;
  body: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
  created: string;          // تاریخ میلادی
  lastModified: string | null;
  isPublished: boolean;
  status: number;
  unitIds: string | null;   
  attachFile: string;
  // فیلدهای اختیاری (برای داده‌های قدیمی)
  excerpt?: string | null;
  startTime?: string;
  finishTime?: string;
  startedAt?: string;
  finishedAt?: string;
  startedAtString?: string;
  finishedAtString?: string;
}


const noticeMapper = createMapper<NoticeItem>({
  id: {
    source: 'id',
  },
  title: {
    source: 'title',
  },
  body: {
    source: 'body',
  },
  createdBy: {
    source: 'createdBy',
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
  isPublished: {
    source: 'isPublished',
  },
  status: {
    source: 'status',
  },
  unitIds: {
    source: 'unitIds',
  },
  attachFile: {
    source: 'attachFile',
  },
  excerpt: {
    source: 'excerpt',
  },
  startTime: {
    source: 'startTime',
  },
  finishTime: {
    source: 'finishTime',
  },
  startedAt: {
    source: 'startedAt',
    formatter: formatters.date,
  },
  finishedAt: {
    source: 'finishedAt',
    formatter: formatters.date,
  },
  startedAtString: {
    source: 'startedAtString',
  },
  finishedAtString: {
    source: 'finishedAtString',
  },
});


export const selectFunction = (data: any) => {
  const items = data?.info || data?.result?.info || data?.result?.items || data?.items || [];

  const totalCount = data?.totalCount || data?.result?.totalCount || items.length;

  return {
    Items: items.map(noticeMapper),
    TotalCount: totalCount,
  };
};
