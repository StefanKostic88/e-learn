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

export interface BoxItem {
  title: string;
  creationDate: Date;
  img: string;
  readTime: number;
  tag: string;
}

export const boxItems: BoxItem[] = [
  {
    title: 'Revolutionizing Education: How AI is Transforming E-Learning',
    creationDate: new Date(),
    img: '../../../assets/imgs/box-image-1.jpg',
    readTime: 5,
    tag: 'Elearning Transformation',
  },
  {
    title:
      'Mastering New Frontiers: The Rise of Virtual Reality in Online Education',
    creationDate: new Date(),
    img: '../../../assets/imgs/box-image-2.jpg',
    readTime: 10,
    tag: 'Artificial Intelligence',
  },
  {
    title:
      'Unlocking Potential: Personalized Learning in the Digital Classroom',
    creationDate: new Date(),
    img: '../../../assets/imgs/box-image-3.jpg',
    readTime: 15,
    tag: 'Digital Learning',
  },
];
