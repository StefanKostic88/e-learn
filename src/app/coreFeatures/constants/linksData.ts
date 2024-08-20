import { HeaderLinkList } from '../models/shared.models';

export const footerLinksData = [
  {
    NavigationTitle: 'Products',
    navigationList: [
      {
        path: '/features',
        linkName: 'Features',
      },
      {
        path: '/pricing',
        linkName: 'Pricing',
      },
    ],
  },
  {
    NavigationTitle: 'Resources',
    navigationList: [
      {
        path: '/blog',
        linkName: 'Blog',
      },
      {
        path: '/user-guide',
        linkName: 'Users Guide',
      },
      {
        path: '/webinars',
        linkName: 'Webinars',
      },
    ],
  },
  {
    NavigationTitle: 'Company',
    navigationList: [
      {
        path: '/about-us',
        linkName: 'About us',
      },
      {
        path: '/contact-us',
        linkName: 'Contact us',
      },
    ],
  },
];

export const headerLinksList: HeaderLinkList[] = [
  { path: 'blog', linkName: 'Blog', active: true },
  { path: 'pricing', linkName: 'Pricing' },
  { path: 'about-us', linkName: 'About Us' },
];
