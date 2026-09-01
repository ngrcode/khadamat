import { ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';

import { cn } from '@repo/utils/cn';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  classNameLink?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function CustomLink({
  href,
  children,
  className,
  classNameLink,
  startIcon,
  endIcon,
  ...props
}: CustomLinkProps) {
  return (
    <Link href={href} {...props} className={cn(classNameLink)}>
      {startIcon && <span className="start-icon">{startIcon}</span>}
      <span className={cn(className)}>{children}</span>
      {endIcon && <span className="end-icon">{endIcon}</span>}
    </Link>
  );
}
