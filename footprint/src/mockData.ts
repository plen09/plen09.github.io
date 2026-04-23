import { TravelEntry } from './types';

export const travelData: TravelEntry[] = [
  {
    id: '1',
    city: '北京',
    province: '北京',
    date: '2024-01-15',
    title: '故宫初雪',
    content: '在故宫看到的今年第一场雪，红墙白雪，仿佛穿越回了明清。',
    images: ['https://images.unsplash.com/photo-1547948619-354ec32e3a51?q=80&w=800'],
    tags: ['历史', '摄影', '故乡'],
    coordinates: [116.4074, 39.9042]
  },
  {
    id: '2',
    city: '上海',
    province: '上海',
    date: '2024-03-20',
    title: '外滩的夜',
    content: '陆家嘴的霓虹与江对岸的老建筑，诉说着城市的百年。',
    images: ['https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=800'],
    tags: ['都市', '美食'],
    coordinates: [121.4737, 31.2304]
  },
  {
    id: '3',
    city: '成都',
    province: '四川',
    date: '2024-05-12',
    title: '巷子里的茶馆',
    content: '在宽窄巷子的茶馆坐了一下午，成都的时间好像是静止的。',
    images: ['https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=800'],
    tags: ['慢生活', '美食'],
    coordinates: [104.0665, 30.5723]
  },
  {
    id: '4',
    city: '杭州',
    province: '浙江',
    date: '2024-06-05',
    title: '西湖断桥',
    content: '虽然不是冬季，但断桥的夕照依然迷人。',
    images: ['https://images.unsplash.com/photo-1512404554271-92576b8a3424?q=80&w=800'],
    tags: ['风景', '避暑'],
    coordinates: [120.1536, 30.2874]
  },
  {
    id: '5',
    city: '西安',
    province: '陕西',
    date: '2023-11-10',
    title: '城墙骑行',
    content: '在古城墙上骑行，感受扑面而来的历史厚重感。',
    images: ['https://images.unsplash.com/photo-1523301551780-cd17359a95d0?q=80&w=800'],
    tags: ['古镇', '运动'],
    coordinates: [108.9398, 34.3416]
  }
];
