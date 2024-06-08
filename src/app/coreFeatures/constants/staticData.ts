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
