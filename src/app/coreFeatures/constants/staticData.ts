import { environment } from '../../enviroment';

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
    img: environment.staticImages.teamMemberTwo,
  },
  {
    name: 'John Doe',
    professionalTitle: 'Developer',
    description: 'Lorem ipsum dolor sit amet ases.',
    img: environment.staticImages.teamMemberThree,
  },
  {
    name: 'John Doe',
    professionalTitle: 'Developer',
    description: 'Lorem ipsum dolor sit amet ases.',
    img: environment.staticImages.teamMemberOne,
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
    img: environment.staticImages.featureImageOne,
  },
  {
    title: 'Feature',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non vitae suscipit ullam! Dolorem, deleniti asperiores. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non vitae suscipit ullam! Dolorem, deleniti asperiores.',
    img: environment.staticImages.featureImageTwo,
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
    img: environment.staticImages.boxImageOne,
    readTime: 5,
    tag: 'Elearning Transformation',
  },
  {
    title:
      'Mastering New Frontiers: The Rise of Virtual Reality in Online Education',
    creationDate: new Date(),
    img: environment.staticImages.boxImageTwo,
    readTime: 10,
    tag: 'Artificial Intelligence',
  },
  {
    title:
      'Unlocking Potential: Personalized Learning in the Digital Classroom',
    creationDate: new Date(),
    img: environment.staticImages.boxImageThree,
    readTime: 15,
    tag: 'Digital Learning',
  },
];

export interface BlogData {
  title: string;
  img: string;
  readTime: number;
  creationDate: Date;
  tag: string;
}

export const blogData: BlogData[] = [
  {
    title:
      'Empowering Lifelong Learning: How E-Learning Platforms are Shaping the Future of Education',
    img: environment.staticImages.boxImageOne,
    readTime: 17,
    creationDate: new Date('12-11-2023'),
    tag: '#LifelongLearning #EdTech',
  },
  {
    title:
      'Master New Skills Online: A Beginner’s Guide to Getting Started with E-Learning',
    img: environment.staticImages.boxImageTwo,
    readTime: 5,
    creationDate: new Date('05-06-2023'),
    tag: '#OnlineLearning #BeginnerGuide',
  },
  {
    title:
      'Interactive Learning: 5 Features That Make E-Learning More Engaging',
    img: environment.staticImages.boxImageThree,
    readTime: 12,
    creationDate: new Date('02-06-2023'),
    tag: '#InteractiveLearning #OnlineEducation',
  },
  {
    title: 'Top 10 Benefits of E-Learning: Why Online Education is the Future',
    img: environment.staticImages.boxImageTwo,
    readTime: 8,
    creationDate: new Date('02-02-2023'),
    tag: '#E-LearningBenefits #OnlineEducation',
  },
  {
    title: 'How to Stay Motivated and Succeed in an E-Learning Environment',
    img: environment.staticImages.boxImageOne,
    readTime: 15,
    creationDate: new Date('02-01-2023'),
    tag: '#E-LearningSuccess #MotivationTips',
  },
  {
    title:
      'From Classroom to Virtual: The Evolution of Education Through E-Learning Platforms',
    img: environment.staticImages.boxImageThree,
    readTime: 22,
    creationDate: new Date('05-06-2022'),
    tag: '#VirtualLearning #EducationEvolution',
  },
];
