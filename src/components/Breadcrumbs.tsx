import React from 'react';
import { PageId } from '../types/site.ts';
import { ThemeStyles } from '../utils/theme.ts';

interface BreadcrumbsProps {
  currentPage: PageId;
  pageTitle: string;
  themeStyles: ThemeStyles;
  onNavigate: (page: PageId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  pageTitle,
  themeStyles,
  onNavigate,
}) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs">
      <button
        onClick={() => onNavigate('home')}
        className={`${themeStyles.textMuted} hover:text-white transition-colors cursor-pointer`}
      >
        Home
      </button>
      <span className={themeStyles.textMuted} aria-hidden="true">
        /
      </span>
      <span className={`font-semibold ${themeStyles.textPrimary}`} aria-current="page">
        {pageTitle}
      </span>
    </nav>
  );
};
