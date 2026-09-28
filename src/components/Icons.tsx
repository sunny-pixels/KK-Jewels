// Line icons sized like the Lanes theme icons (currentColor strokes/fills).
type P = { className?: string };

export const SearchIcon = ({ className }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M13.5 13.5L10.2 10.2M11.8 6.4a5.4 5.4 0 11-10.8 0 5.4 5.4 0 0110.8 0z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const BagIcon = ({ className }: P) => (
  <svg className={className} width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true">
    <path d="M1.2 5.6h12.6l-.7 11.2H1.9L1.2 5.6z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    <path d="M4.6 7.6V4.4a2.9 2.9 0 015.8 0v3.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className }: P) => (
  <svg className={className} width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
    <path d="M13 5H1m0 0l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg className={className} width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ className }: P) => (
  <svg className={className} width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg className={className} width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M1.5 5.8l2.6 2.6L9.5 2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InstagramIcon = ({ className }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" />
  </svg>
);

export const WhatsAppIcon = ({ className }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91A9.84 9.84 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 018.23 8.24c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.22-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23a7.46 7.46 0 01-1.38-1.72c-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 00-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
  </svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 3h3.2l1.6 4.4-2 1.3a11 11 0 006.5 6.5l1.3-2 4.4 1.6V18a2 2 0 01-2.1 2A16.5 16.5 0 013 5.1 2 2 0 015 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s-7-6.3-7-11.5a7 7 0 1114 0C19 14.7 12 21 12 21z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ClockIcon = ({ className }: P) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

