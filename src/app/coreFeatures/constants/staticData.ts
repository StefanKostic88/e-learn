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
  id: string;
  description: string;
}

export const blogData: BlogData[] = [
  {
    title:
      'Empowering Lifelong Learning: How E-Learning Platforms are Shaping the Future of Education',
    img: environment.staticImages.boxImageOne,
    readTime: 17,
    creationDate: new Date('12-11-2023'),
    tag: '#LifelongLearning #EdTech',
    id: 'blog-0',
    description:
      'In today’s digital age, the concept of lifelong learning is more relevant than ever. E-learning platforms have revolutionized education, breaking down traditional barriers and providing learners with access to a wealth of knowledge from anywhere in the world. This blog explores how e-learning platforms are transforming the educational landscape, making it more flexible, inclusive, and personalized. We’ll delve into how these platforms empower learners of all ages and backgrounds, adapt to individual learning styles, and provide opportunities for skill development, career advancement, and personal growth. Discover the key trends driving this shift and the role technology plays in fostering a culture of continuous learning in the modern world.',
  },
  {
    title:
      'Master New Skills Online: A Beginner’s Guide to Getting Started with E-Learning',
    img: environment.staticImages.boxImageTwo,
    readTime: 5,
    creationDate: new Date('05-06-2023'),
    tag: '#OnlineLearning #BeginnerGuide',
    id: 'blog-1',
    description:
      'Ready to start your journey into the world of online learning? This beginner’s guide is designed to help you navigate the exciting and diverse landscape of e-learning. We’ll explore how online platforms are making it easier than ever to acquire new skills, whether for personal growth, career advancement, or hobby development. From choosing the right courses to staying motivated and managing your time effectively, this blog provides practical tips and insights to help you get the most out of your e-learning experience. Dive in to discover how to take control of your education and empower yourself with the skills you’ve always wanted to learn—all from the comfort of your own home.',
  },
  {
    title:
      'Interactive Learning: 5 Features That Make E-Learning More Engaging',
    img: environment.staticImages.boxImageThree,
    readTime: 12,
    creationDate: new Date('02-06-2023'),
    tag: '#InteractiveLearning #OnlineEducation',
    id: 'blog-2',
    description:
      "E-learning is no longer just about watching videos and reading content; it's about creating an immersive, interactive experience that keeps learners engaged and motivated. In this blog, we explore five key features that modern e-learning platforms use to make online learning more dynamic and enjoyable. From interactive quizzes and gamification elements to virtual classrooms and real-time feedback, discover how these innovative tools are transforming the way we learn. Whether you’re an educator looking to enhance your courses or a student seeking a more engaging learning experience, this guide will show you what to look for in an effective e-learning platform.",
  },
  {
    title: 'Top 10 Benefits of E-Learning: Why Online Education is the Future',
    img: environment.staticImages.boxImageTwo,
    readTime: 8,
    creationDate: new Date('02-02-2023'),
    tag: '#E-LearningBenefits #OnlineEducation',
    id: 'blog-3',
    description:
      'E-learning has transformed the education landscape, offering a flexible and accessible alternative to traditional classroom settings. In this blog, we explore the top 10 benefits of online education that are driving its rapid adoption and shaping the future of learning. From flexible scheduling and cost-effectiveness to a wide variety of courses and personalized learning paths, discover how e-learning caters to diverse needs and lifestyles. Whether you’re a student, a working professional, or a lifelong learner, this comprehensive list highlights why online education is not just a trend but the future of learning. Dive in to understand how e-learning can open new doors for personal and professional growth.',
  },
  {
    title: 'How to Stay Motivated and Succeed in an E-Learning Environment',
    img: environment.staticImages.boxImageOne,
    readTime: 15,
    creationDate: new Date('02-01-2023'),
    tag: '#E-LearningSuccess #MotivationTips',
    id: 'blog-4',
    description:
      'Online learning offers incredible flexibility, but staying motivated in a self-paced environment can be challenging. In this blog, we provide practical strategies to help you stay focused, organized, and driven throughout your e-learning journey. From setting clear goals and creating a study schedule to finding a supportive community and incorporating breaks, you’ll learn tips to keep your momentum going. Whether you’re new to online learning or looking to enhance your current approach, these insights will empower you to overcome obstacles and succeed in your e-learning environment.',
  },
  {
    title:
      'From Classroom to Virtual: The Evolution of Education Through E-Learning Platforms',
    img: environment.staticImages.boxImageThree,
    readTime: 22,
    creationDate: new Date('05-06-2022'),
    tag: '#VirtualLearning #EducationEvolution',
    id: 'blog-5',
    description:
      "Education has undergone a remarkable transformation, moving from traditional classrooms to dynamic virtual environments. In this blog, we explore how e-learning platforms have revolutionized the way we teach and learn. We'll take a closer look at the technological advancements, changing teaching methods, and innovative tools that have shaped the evolution of education. From the early days of online courses to today’s interactive, personalized learning experiences, discover how e-learning has expanded access to education and adapted to the needs of modern learners. Join us as we trace the journey of education's digital shift and its impact on the future of learning.",
  },
  {
    title:
      'Empowering Lifelong Learning: How E-Learning Platforms are Shaping the Future of Education',
    img: environment.staticImages.boxImageOne,
    readTime: 17,
    creationDate: new Date('12-11-2023'),
    tag: '#LifelongLearning #EdTech',
    id: 'blog-6',
    description:
      'In today’s digital age, the concept of lifelong learning is more relevant than ever. E-learning platforms have revolutionized education, breaking down traditional barriers and providing learners with access to a wealth of knowledge from anywhere in the world. This blog explores how e-learning platforms are transforming the educational landscape, making it more flexible, inclusive, and personalized. We’ll delve into how these platforms empower learners of all ages and backgrounds, adapt to individual learning styles, and provide opportunities for skill development, career advancement, and personal growth. Discover the key trends driving this shift and the role technology plays in fostering a culture of continuous learning in the modern world.',
  },
  {
    title:
      'Master New Skills Online: A Beginner’s Guide to Getting Started with E-Learning',
    img: environment.staticImages.boxImageTwo,
    readTime: 5,
    creationDate: new Date('05-06-2023'),
    tag: '#OnlineLearning #BeginnerGuide',
    id: 'blog-7',
    description:
      'Ready to start your journey into the world of online learning? This beginner’s guide is designed to help you navigate the exciting and diverse landscape of e-learning. We’ll explore how online platforms are making it easier than ever to acquire new skills, whether for personal growth, career advancement, or hobby development. From choosing the right courses to staying motivated and managing your time effectively, this blog provides practical tips and insights to help you get the most out of your e-learning experience. Dive in to discover how to take control of your education and empower yourself with the skills you’ve always wanted to learn—all from the comfort of your own home.',
  },
  {
    title:
      'Interactive Learning: 5 Features That Make E-Learning More Engaging',
    img: environment.staticImages.boxImageThree,
    readTime: 12,
    creationDate: new Date('02-06-2023'),
    tag: '#InteractiveLearning #OnlineEducation',
    id: 'blog-8',
    description:
      "E-learning is no longer just about watching videos and reading content; it's about creating an immersive, interactive experience that keeps learners engaged and motivated. In this blog, we explore five key features that modern e-learning platforms use to make online learning more dynamic and enjoyable. From interactive quizzes and gamification elements to virtual classrooms and real-time feedback, discover how these innovative tools are transforming the way we learn. Whether you’re an educator looking to enhance your courses or a student seeking a more engaging learning experience, this guide will show you what to look for in an effective e-learning platform.",
  },
  {
    title: 'Top 10 Benefits of E-Learning: Why Online Education is the Future',
    img: environment.staticImages.boxImageTwo,
    readTime: 8,
    creationDate: new Date('02-02-2023'),
    tag: '#E-LearningBenefits #OnlineEducation',
    id: 'blog-9',
    description:
      'E-learning has transformed the education landscape, offering a flexible and accessible alternative to traditional classroom settings. In this blog, we explore the top 10 benefits of online education that are driving its rapid adoption and shaping the future of learning. From flexible scheduling and cost-effectiveness to a wide variety of courses and personalized learning paths, discover how e-learning caters to diverse needs and lifestyles. Whether you’re a student, a working professional, or a lifelong learner, this comprehensive list highlights why online education is not just a trend but the future of learning. Dive in to understand how e-learning can open new doors for personal and professional growth.',
  },
  {
    title: 'How to Stay Motivated and Succeed in an E-Learning Environment',
    img: environment.staticImages.boxImageOne,
    readTime: 15,
    creationDate: new Date('02-01-2023'),
    tag: '#E-LearningSuccess #MotivationTips',
    id: 'blog-10',
    description:
      'Online learning offers incredible flexibility, but staying motivated in a self-paced environment can be challenging. In this blog, we provide practical strategies to help you stay focused, organized, and driven throughout your e-learning journey. From setting clear goals and creating a study schedule to finding a supportive community and incorporating breaks, you’ll learn tips to keep your momentum going. Whether you’re new to online learning or looking to enhance your current approach, these insights will empower you to overcome obstacles and succeed in your e-learning environment.',
  },
  {
    title:
      'From Classroom to Virtual: The Evolution of Education Through E-Learning Platforms',
    img: environment.staticImages.boxImageThree,
    readTime: 22,
    creationDate: new Date('05-06-2022'),
    tag: '#VirtualLearning #EducationEvolution',
    id: 'blog-11',
    description:
      "Education has undergone a remarkable transformation, moving from traditional classrooms to dynamic virtual environments. In this blog, we explore how e-learning platforms have revolutionized the way we teach and learn. We'll take a closer look at the technological advancements, changing teaching methods, and innovative tools that have shaped the evolution of education. From the early days of online courses to today’s interactive, personalized learning experiences, discover how e-learning has expanded access to education and adapted to the needs of modern learners. Join us as we trace the journey of education's digital shift and its impact on the future of learning.",
  },
];
