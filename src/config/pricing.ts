export type PricingPlan = {
  name: string;
  price: number;
  yearlyPrice: number;
  isOneTime?: boolean;
  description: string;
  popular: boolean;
  buttonVariant: "default" | "outline" | "secondary";
  buttonText: string;
  includes: string[];
};

export const plans: PricingPlan[] = [
  {
    name: "免费版",
    price: 0,
    yearlyPrice: 0,
    description: "开启你的第一次心动接触，感受温暖陪伴。",
    popular: false,
    buttonVariant: "outline",
    buttonText: "当前使用中",
    includes: [
      "解锁 3 位标准大语言模型女友伴侣",
      "每日 50 条免费私密对话次数",
      "标准亲密度等级上限 (最高解锁至 Lv.3)",
      "标准文字交互响应"
    ],
  },
  {
    name: "深情订阅",
    price: 9.99,
    yearlyPrice: 79.99,
    description: "无限制的深度默契交流，解锁专属私密特权。",
    popular: true,
    buttonVariant: "default",
    buttonText: "立即订阅",
    includes: [
      "解锁超高情商大模型女友伴侣 (沉浸感大跨步)",
      "无限对话次数，24小时深情守候",
      "解锁亲密度上限 & 专属好感度剧情分支",
      "解锁语音互动交流 & 专属私密照片生成",
      "专属高速通道，更快的文字与语音响应速度"
    ],
  },
  {
    name: "终身相伴",
    price: 199.99,
    yearlyPrice: 199.99,
    isOneTime: true,
    description: "一次订购，永恒誓言。终身免除订阅费用相伴左右。",
    popular: false,
    buttonVariant: "outline",
    buttonText: "拥有永恒相伴",
    includes: [
      "包含所有「深情订阅」的全部会员特权",
      "终身永久使用，拒绝订阅续费扣款烦恼",
      "抢先体验未来新增全新专属伴侣角色与限定剧情",
      "尊贵终身会员身份专属徽章标识"
    ],
  },
];
