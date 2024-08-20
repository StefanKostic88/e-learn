export interface TeamData {
  name: string;
  professionalTitle: string;
  description: string;
  img: string;
}

export const teamData: TeamData[] = [
  {
    name: 'John Doe',
    professionalTitle: 'Developer',
    description: 'Lorem ipsum dolor sit amet ases.',
    img: '../../../assets/imgs/team-member-2.jpg',
  },
  {
    name: 'John Doe',
    professionalTitle: 'Developer',
    description: 'Lorem ipsum dolor sit amet ases.',
    img: '../../../assets/imgs/team-member-3.jpg',
  },
  {
    name: 'John Doe',
    professionalTitle: 'Developer',
    description: 'Lorem ipsum dolor sit amet ases.',
    img: '../../../assets/imgs/team-member-1.jpg',
  },
];

export interface FeatureBoxData {
  title: string;
  content: string;
  img: string;
}

export const featureDataArr: FeatureBoxData[] = [
  {
    title: 'Feature',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non vitae suscipit ullam! Dolorem, deleniti asperiores. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non vitae suscipit ullam! Dolorem, deleniti asperiores.',
    img: '../../../assets/imgs/feature-img-1.jpg',
  },
  {
    title: 'Feature',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non vitae suscipit ullam! Dolorem, deleniti asperiores. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non vitae suscipit ullam! Dolorem, deleniti asperiores.',
    img: '../../../assets/imgs/feature-img-2.jpg',
  },
];

export interface PricingCard {
  title: string;
  description: string;
  priceStat: {
    price: number;
    category: string;
  };
  includedProps: { name: string; marker: boolean }[];
  outlinedBtn: boolean;
  isFavorite?: boolean;
  border?: string;
}

export const pricingCardData: PricingCard[] = [
  {
    title: 'Group',
    description: 'Perfect for side hobbies and projects',
    priceStat: {
      price: 50,
      category: '/month',
    },
    includedProps: [
      {
        name: 'Up to 5 users',
        marker: true,
      },
      {
        name: 'Collaboration features',
        marker: true,
      },
      {
        name: 'Smart analitics',
        marker: false,
      },
      {
        name: '30-day free trial',
        marker: false,
      },
    ],
    outlinedBtn: false,
    border: 'left',
  },
  {
    title: 'Personal',
    description: 'Perfect for small teams',
    priceStat: {
      price: 100,
      category: '/team/month',
    },
    includedProps: [
      {
        name: 'Up to 50 users',
        marker: true,
      },
      {
        name: 'Collaboration features',
        marker: true,
      },
      {
        name: 'Smart analitics',
        marker: true,
      },
      {
        name: '30-day free trial',
        marker: true,
      },
    ],
    outlinedBtn: true,
    isFavorite: true,
  },
  {
    title: 'Organization',
    description: 'Perfect for organizations',
    priceStat: {
      price: 150,
      category: '/user/month',
    },
    includedProps: [
      {
        name: 'Unlimited users',
        marker: true,
      },
      {
        name: 'Collaboration features',
        marker: true,
      },
      {
        name: 'Smart analitics',
        marker: true,
      },
      {
        name: '30-day free trial',
        marker: true,
      },
    ],
    outlinedBtn: false,
    border: 'right',
  },
];

export interface FaqDataInterface {
  question: string;
  answer: string;
}
export const faqData: FaqDataInterface[] = [
  {
    question: 'How do I enroll in a course?',
    answer: `Log in to your account.\nBrowse through the course catalog or use the search bar to find a specific course.\nClick on the course title to view more details.\nClick the "Enroll" button.\nFollow the prompts to complete the enrollment process, including any payment if required.`,
  },
  {
    question: 'Can I get a refund if I’m not satisfied with a course?',
    answer: `Yes, we offer a refund policy. If you are not satisfied with a course, you can request a refund within 14 days of purchase, provided you have not completed more than 25% of the course content. To request a refund, go to your account settings, find the course under your enrolled courses, and click on "Request Refund."`,
  },
  {
    question: 'How do I enroll in a course?',
    answer: `Log in to your account.\nBrowse through the course catalog or use the search bar to find a specific course.\nClick on the course title to view more details.\nClick the "Enroll" button.\nFollow the prompts to complete the enrollment process, including any payment if required.`,
  },
  {
    question: 'Can I get a refund if I’m not satisfied with a course?',
    answer: `Yes, we offer a refund policy. If you are not satisfied with a course, you can request a refund within 14 days of purchase, provided you have not completed more than 25% of the course content. To request a refund, go to your account settings, find the course under your enrolled courses, and click on "Request Refund."`,
  },
  {
    question: 'Can I get a refund if I’m not satisfied with a course?',
    answer: `Yes, we offer a refund policy. If you are not satisfied with a course, you can request a refund within 14 days of purchase, provided you have not completed more than 25% of the course content. To request a refund, go to your account settings, find the course under your enrolled courses, and click on "Request Refund."`,
  },
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
