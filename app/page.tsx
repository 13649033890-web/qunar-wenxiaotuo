/// <reference types="vite/client" />
"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import {
  AirplaneTilt,
  ArrowsLeftRight,
  ArrowLeft,
  Article,
  BatteryMedium,
  Bed,
  Buildings,
  Camera,
  Car,
  CalendarDots,
  CaretRight,
  CellSignalFull,
  ChatCircleDots,
  Check,
  ClockCounterClockwise,
  ClipboardText,
  Copy,
  DownloadSimple,
  FileArrowDown,
  House,
  ImageSquare,
  LinkSimple,
  MagnifyingGlass,
  MapTrifold,
  Microphone,
  Plus,
  PaperPlaneTilt,
  SidebarSimple,
  Sparkle,
  Ticket,
  Train,
  WifiHigh,
  UploadSimple,
  X,
} from "@phosphor-icons/react";

const asset = (url: string) => url;

type View =
  | "home"
  | "search-middle"
  | "normal-search"
  | "hotel-landing"
  | "xiaotuo"
  | "guide-create"
  | "guide-copy"
  | "tickets"
  | "stay-search"
  | "hotels"
  | "hotel-select"
  | "hotel-compare";
type AppTab = "home" | "trips" | "service" | "world" | "profile";
type TicketType = "flight" | "train" | "ticket";
type BusinessLine = "flight" | "hotel" | "train" | "homestay" | "vacation" | "ticket" | "car";
type SkillMode = "inspiration" | "stay" | "compare";
type HotelSource = "favorite" | "browsed" | "recommended";
type HotelContext = "ai" | "haidian";

type SkillRecommendation = {
  text: string;
  line?: BusinessLine;
};

type Hotel = {
  id: number;
  name: string;
  rating: string;
  area: string;
  price: number;
  stars: string;
  breakfast: string;
  cancellation: string;
  room: string;
  distance: string;
  highlight: string;
  imageTone: string;
  imageSrc?: string;
};

const tabAssets: Record<AppTab, string> = {
  home: `${import.meta.env.BASE_URL}reference/qunar-home.jpg`,
  trips: `${import.meta.env.BASE_URL}reference/qunar-trips.jpg`,
  service: `${import.meta.env.BASE_URL}reference/qunar-service.jpg`,
  world: `${import.meta.env.BASE_URL}reference/qunar-world.jpg`,
  profile: `${import.meta.env.BASE_URL}reference/qunar-profile.jpg`,
};

const homeServices = [
  "特价酒店",
  "民宿·客栈",
  "海外酒店",
  "酒店专区",
  "低价机票",
  "火车·高铁",
  "租车自驾",
  "接机/送机",
  "出境/国内游",
  "景点·门票",
  "跟团游",
  "借钱/分期",
];

const flowSteps: Array<{ view: View; title: string; note: string }> = [
  { view: "home", title: "去哪儿首页", note: "搜索框统一承接入口" },
  { view: "search-middle", title: "搜索中间页", note: "搜索 / 问小驼双Tab" },
  { view: "normal-search", title: "搜索Sug页", note: "历史、推荐与搜索建议" },
  { view: "hotel-landing", title: "酒店落地页", note: "4次点击 / 停留10秒" },
  { view: "xiaotuo", title: "问小驼首页", note: "独立完整页面" },
  { view: "guide-create", title: "做攻略", note: "填写需求后生成" },
  { view: "guide-copy", title: "抄攻略", note: "导入链接 / 图片并解析" },
  { view: "stay-search", title: "找住宿", note: "非标准需求匹配" },
  { view: "tickets", title: "订票", note: "机票 / 火车票" },
  { view: "hotels", title: "酒店PK", note: "选择酒店并横向对比" },
  { view: "hotel-select", title: "选择酒店", note: "收藏 / 浏览 / 推荐" },
  { view: "hotel-compare", title: "酒店对比", note: "生成差异表与建议" },
];

const hotelCatalog: Hotel[] = [
  {
    id: 1,
    name: "成都春熙路轻居酒店",
    rating: "4.8",
    area: "春熙路 / 太古里",
    price: 328,
    stars: "高档型",
    breakfast: "双人早餐",
    cancellation: "入住前1天可免费取消",
    room: "舒适大床房",
    distance: "步行6分钟到地铁",
    highlight: "位置和早餐综合表现更均衡",
    imageTone: "mint",
  },
  {
    id: 2,
    name: "成都太古里云端酒店",
    rating: "4.7",
    area: "太古里 / 望平街",
    price: 286,
    stars: "舒适型",
    breakfast: "不含早餐",
    cancellation: "当日18点前可取消",
    room: "城景大床房",
    distance: "步行9分钟到地铁",
    highlight: "预算更低，周边餐饮选择多",
    imageTone: "blue",
  },
  {
    id: 3,
    name: "成都熊猫基地漫居酒店",
    rating: "4.9",
    area: "熊猫基地 / 昭觉寺",
    price: 418,
    stars: "豪华型",
    breakfast: "双人早餐",
    cancellation: "入住前2天可免费取消",
    room: "亲子主题房",
    distance: "驾车12分钟到熊猫基地",
    highlight: "亲子设施丰富，适合家庭出行",
    imageTone: "orange",
  },
  {
    id: 4,
    name: "成都天府广场智选酒店",
    rating: "4.6",
    area: "天府广场 / 人民公园",
    price: 259,
    stars: "舒适型",
    breakfast: "单人早餐",
    cancellation: "不可取消",
    room: "标准双床房",
    distance: "步行3分钟到地铁",
    highlight: "交通方便，适合短途城市游",
    imageTone: "purple",
  },
  {
    id: 5,
    name: "成都东站悦居酒店",
    rating: "4.5",
    area: "成都东站 / 万象城",
    price: 228,
    stars: "经济型",
    breakfast: "不含早餐",
    cancellation: "入住前1天可免费取消",
    room: "悦享大床房",
    distance: "步行8分钟到成都东站",
    highlight: "适合中转或早班车行程",
    imageTone: "gold",
  },
];

const haidianHotelCatalog: Hotel[] = [
  {
    id: 1,
    name: "全季酒店（北京中关村苏州街店）",
    rating: "4.9",
    area: "中关村 / 苏州街",
    price: 567,
    stars: "舒适型",
    breakfast: "双人早餐",
    cancellation: "入住前1天可免费取消",
    room: "高级大床房",
    distance: "距区域中心直线2.1公里",
    highlight: "位置便利，服务和早餐表现均衡",
    imageTone: "mint",
    imageSrc: `${import.meta.env.BASE_URL}reference/haidian-hotel-1.jpg`,
  },
  {
    id: 2,
    name: "秋果智选酒店（北京大学苏州街地铁站店）",
    rating: "4.9",
    area: "北京大学 / 苏州街",
    price: 457,
    stars: "舒适型",
    breakfast: "自助早餐",
    cancellation: "延迟退房，可免费取消",
    room: "智选大床房",
    distance: "距苏州街地铁站步行约6分钟",
    highlight: "交通方便，房间细节与服务评价突出",
    imageTone: "blue",
    imageSrc: `${import.meta.env.BASE_URL}reference/haidian-hotel-2.jpg`,
  },
  {
    id: 3,
    name: "巴比伦时尚酒店（北京中关村人民大学店）",
    rating: "4.5",
    area: "人民大学 / 海淀黄庄",
    price: 305,
    stars: "经济型",
    breakfast: "不含早餐",
    cancellation: "入住当日18点前可取消",
    room: "时尚大床房",
    distance: "距区域中心直线2.1公里",
    highlight: "预算更低，适合短住和高性价比需求",
    imageTone: "orange",
    imageSrc: `${import.meta.env.BASE_URL}reference/haidian-hotel-3.jpg`,
  },
  {
    id: 4,
    name: "漫兮酒店（北京大学苏州街地铁站店）",
    rating: "4.7",
    area: "北京大学 / 苏州街",
    price: 399,
    stars: "舒适型",
    breakfast: "单人早餐",
    cancellation: "入住前1天可免费取消",
    room: "雅致大床房",
    distance: "距苏州街地铁站步行约5分钟",
    highlight: "靠近地铁，适合北大及中关村周边行程",
    imageTone: "purple",
    imageSrc: `${import.meta.env.BASE_URL}reference/haidian-hotel-4.jpg`,
  },
  {
    id: 5,
    name: "富驿时尚酒店（北京中关村店）",
    rating: "4.8",
    area: "中关村 / 苏州街",
    price: 374,
    stars: "经济型",
    breakfast: "不含早餐",
    cancellation: "入住前1天可免费取消",
    room: "精选大床房",
    distance: "距区域中心直线950米",
    highlight: "距离近，适合重视通勤效率的用户",
    imageTone: "gold",
  },
];

const historyItems = [
  { id: "h0", title: "北京周边8人独立小院", time: "刚刚" },
  { id: "h1", title: "对比成都春熙路附近酒店", time: "今天 12:48" },
  { id: "h2", title: "潮汕3天2晚轻松行程", time: "昨天 21:16" },
  { id: "h3", title: "周五北京飞成都低价机票", time: "8月8日" },
];

const AI_QUERY_PRESET = "北京周边找一个能住8个人的独立小院，可以烧烤，最好有麻将桌，周末住一晚，预算3000元以内";

const businessFlows: Record<BusinessLine, { label: string; questions: Array<{ prompt: string; options: string[] }> }> = {
  flight: { label: "机票", questions: [
    { prompt: "准备从哪里出发？", options: ["当前城市", "北京", "上海", "其他城市"] },
    { prompt: "更想去哪里？", options: ["成都", "三亚", "广州", "目的地不限"] },
    { prompt: "出发时间怎么安排？", options: ["本周末", "下周", "节假日", "日期灵活"] },
  ] },
  hotel: { label: "酒店", questions: [
    { prompt: "准备住在哪里？", options: ["当前城市", "北京", "上海", "其他城市"] },
    { prompt: "这次最看重什么？", options: ["离地铁近", "免费取消", "含早餐", "价格更低"] },
    { prompt: "每晚预算大约多少？", options: ["300元内", "300—500元", "500—800元", "800元以上"] },
  ] },
  train: { label: "火车票", questions: [
    { prompt: "准备从哪里出发？", options: ["当前城市", "北京", "上海", "其他城市"] },
    { prompt: "希望什么时候出发？", options: ["今天", "明天", "本周末", "日期灵活"] },
    { prompt: "更偏好哪种车次？", options: ["高铁优先", "时间最短", "价格最低", "都可以"] },
  ] },
  homestay: { label: "民宿", questions: [
    { prompt: "这次有多少人入住？", options: ["1—2人", "3—4人", "5—8人", "8人以上"] },
    { prompt: "更想住哪种房源？", options: ["整套房", "独立小院", "亲子民宿", "特色民宿"] },
    { prompt: "需要哪些特色设施？", options: ["可以做饭", "可以烧烤", "带麻将桌", "宠物友好"] },
  ] },
  vacation: { label: "度假", questions: [
    { prompt: "更想体验哪类旅行？", options: ["海岛放松", "亲子度假", "自然风光", "城市漫游"] },
    { prompt: "准备玩几天？", options: ["2天1晚", "3天2晚", "4—5天", "一周左右"] },
    { prompt: "更偏向哪种节奏？", options: ["轻松不赶", "经典打卡", "深度体验", "都可以"] },
  ] },
  ticket: { label: "门票", questions: [
    { prompt: "想找哪类门票？", options: ["热门景区", "主题乐园", "演出展览", "当地玩乐"] },
    { prompt: "计划什么时候去？", options: ["今天", "明天", "本周末", "日期待定"] },
    { prompt: "有几位出行人？", options: ["1人", "2人", "亲子家庭", "多人同行"] },
  ] },
  car: { label: "租车", questions: [
    { prompt: "准备在哪里取车？", options: ["机场", "火车站", "市区门店", "送车上门"] },
    { prompt: "预计租几天？", options: ["1天", "2—3天", "4—6天", "一周以上"] },
    { prompt: "更需要哪种车型？", options: ["经济型", "SUV", "商务车", "车型不限"] },
  ] },
};

const aiSearchStages = [
  { title: "理解需求", detail: "识别北京周边、8人、整院、周末一晚和3000元预算" },
  { title: "补全约束", detail: "将烧烤、麻将和多人入住转成可核验的住宿条件" },
  { title: "检索实时信息", detail: "同时查询民宿设施、商品描述、评价与可订房型" },
  { title: "核验匹配来源", detail: "区分商家确认、评价提及和仍需咨询的条件" },
  { title: "生成商品结果", detail: "返回可比较、可咨询并可继续预订的住宿选项" },
];

const DEFAULT_STAY_FILTERS = ["北京周边", "8人入住", "整院", "可烧烤", "麻将桌", "周末1晚", "3000元内"];
const stayResults = [
  {
    id: 1,
    name: "怀柔山谷多人独院",
    area: "北京·怀柔 · 距市区约72公里",
    price: 2688,
    score: 96,
    cancel: "入住前3天可免费取消",
    visualTitle: "多人整院",
    visualNote: "8人 · 烧烤 · 麻将",
    visualTone: "forest",
    matches: ["8人整院", "可烧烤", "麻将桌"],
    sources: ["整院：商品描述", "烧烤：商家设施", "麻将：用户评价"],
  },
  {
    id: 2,
    name: "密云水库景观小院",
    area: "北京·密云 · 距水库约1.2公里",
    price: 2380,
    score: 91,
    cancel: "入住前1天可免费取消",
    visualTitle: "临水小院",
    visualNote: "整院 · 庭院 · 预算内",
    visualTone: "lake",
    matches: ["可住8人", "独立庭院", "预算内"],
    sources: ["人数：可订房型", "庭院：商家设施", "烧烤：需要确认"],
  },
  {
    id: 3,
    name: "延庆长城脚下整院民宿",
    area: "北京·延庆 · 距景区约3.5公里",
    price: 2980,
    score: 88,
    cancel: "限时免费取消",
    visualTitle: "长城院落",
    visualNote: "整院 · 聚会 · 麻将",
    visualTone: "mountain",
    matches: ["整院", "多人聚会", "麻将桌"],
    sources: ["整院：商品描述", "聚会：用户评价", "烧烤：需要确认"],
  },
];

const guideThinkingStages = [
  { title: "拆解旅行需求", detail: "提取同行人、预算、节奏与住宿偏好" },
  { title: "核对目的地信息", detail: "检查景点开放时间、区域距离与交通方式" },
  { title: "组合每日动线", detail: "减少折返，并为父母预留休息时间" },
  { title: "校验总预算", detail: "估算交通、住宿、门票和餐饮支出" },
];

const finderThinkingStages = [
  { title: "理解具体需求", detail: "拆分业务线、时间、人数与关键偏好" },
  { title: "补齐筛选条件", detail: "将自然语言转成可检索、可核验的条件" },
  { title: "匹配可用商品", detail: "结合实时库存、价格与规则寻找候选" },
  { title: "整理推荐结果", detail: "按匹配度呈现并说明下一步操作" },
];

const planningQuestions = [
  { label: "目的地", prompt: "这次想去哪儿玩？", options: ["北京周边", "潮汕", "海边度假", "自定义目的地"] },
  { label: "出发日期", prompt: "准备什么时候出发？", options: ["本周末", "下周", "节假日", "日期灵活"] },
  { label: "游玩天数", prompt: "打算玩几天？", options: ["2天1晚", "3天2晚", "4—5天", "一周左右"] },
  { label: "游玩与住宿", prompt: "更偏好怎样的旅行和住宿？", options: ["轻松不赶路", "亲子友好", "特色民宿", "度假酒店"] },
];

const planningGuessQuestions = ["带父母周末轻松游", "亲子出行，酒店和门票一起安排", "人均3000元，想去海边度假"];

const guidePlanDays = [
  {
    day: "D1",
    title: "抵达潮州 · 老城慢游",
    summary: "把抵达、古城和晚餐安排在同一片区域，少走回头路。",
    budget: "约 ¥420 / 人",
    stops: [
      { time: "10:30", title: "抵达潮州站", detail: "接站后先到酒店放行李", tag: "交通" },
      { time: "14:00", title: "潮州古城 & 牌坊街", detail: "边逛边吃，预留午休时间", tag: "游玩" },
      { time: "18:30", title: "潮州功夫茶与晚餐", detail: "安排本地菜，不赶晚场", tag: "餐饮" },
    ],
  },
  {
    day: "D2",
    title: "广济桥 · 韩江风景线",
    summary: "上午看桥，下午沿江散步，行程留出可调整的空档。",
    budget: "约 ¥360 / 人",
    stops: [
      { time: "09:30", title: "广济桥晨游", detail: "避开人流高峰，轻松拍照", tag: "游玩" },
      { time: "12:00", title: "午餐与酒店休息", detail: "午后不连续安排景点", tag: "休息" },
      { time: "16:00", title: "韩江江畔散步", detail: "根据体力选择步行或短途接驳", tag: "风景" },
    ],
  },
  {
    day: "D3",
    title: "慢慢返程 · 带走伴手礼",
    summary: "上午留给早餐和自由活动，再按返程时间前往车站。",
    budget: "约 ¥240 / 人",
    stops: [
      { time: "10:00", title: "酒店早餐与自由活动", detail: "不赶早，按返程时间灵活调整", tag: "早餐" },
      { time: "12:30", title: "选购潮州伴手礼", detail: "集中在古城周边完成采购", tag: "购物" },
      { time: "15:30", title: "前往车站返程", detail: "预留至少45分钟交通时间", tag: "返程" },
    ],
  },
];

const guideNextQuestions = [
  "把每天行程再放松一点",
  "帮我换成更适合带父母的酒店",
  "预算控制在每人2000元以内",
];

function QunarCamel({ compact = false, solid = false }: { compact?: boolean; solid?: boolean }) {
  return (
    <span className={compact ? "qunar-camel compact" : "qunar-camel"} aria-hidden="true">
      <img src={solid ? `${import.meta.env.BASE_URL}brand/qunar-camel-solid-white.png` : `${import.meta.env.BASE_URL}brand/qunar-camel-outline.png`} alt="" />
    </span>
  );
}

function HotelThumb({ hotel, compare = false }: { hotel: Hotel; compare?: boolean }) {
  const className = compare
    ? `compare-hotel-image ${hotel.imageTone}${hotel.imageSrc ? " has-photo" : ""}`
    : `hotel-image-placeholder ${hotel.imageTone}${hotel.imageSrc ? " has-photo" : ""}`;
  return (
    <span className={className}>
      {hotel.imageSrc ? <img src={hotel.imageSrc} alt={`${hotel.name}实拍`} /> : <Bed size={compare ? 22 : 24} />}
      {!compare && !hotel.imageSrc && <small>酒店实拍</small>}
    </span>
  );
}

function PhoneStatus() {
  return (
    <div className="phone-status" aria-label="状态栏">
      <strong>2:13</strong>
      <div>
        <CellSignalFull size={16} weight="fill" />
        <WifiHigh size={17} weight="bold" />
        <BatteryMedium size={21} weight="fill" />
      </div>
    </div>
  );
}

function ScreenHeader({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack: () => void }) {
  return (
    <header className="screen-header">
      <button type="button" onClick={onBack} aria-label="返回">
        <ArrowLeft size={22} weight="bold" />
      </button>
      <div className="screen-title">
        <strong>{title}</strong>
        {subtitle && <small>{subtitle}</small>}
      </div>
      <QunarCamel compact />
    </header>
  );
}

function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="skeleton-block" aria-label="内容占位">
      {Array.from({ length: rows }).map((_, index) => (
        <span key={index} className={index === rows - 1 ? "short" : ""} />
      ))}
    </div>
  );
}

function TaskDock({ active, onOpen }: { active?: "guide" | "stay" | "tickets" | "hotels"; onOpen: (view: View) => void }) {
  const tasks = [
    { key: "stay", label: "帮我找", view: "stay-search" as View, icon: Bed },
    { key: "guide", label: "帮我规划", view: "guide-create" as View, icon: MapTrifold },
    { key: "hotels", label: "帮我PK", view: "hotels" as View, icon: ArrowsLeftRight },
  ] as const;
  return (
    <nav className="task-dock" aria-label="问小驼功能">
      {tasks.map((task) => {
        const Icon = task.icon;
        return (
          <button
            type="button"
            key={task.key}
            className={active === task.key ? "active" : ""}
            onClick={() => onOpen(task.view)}
          >
            <Icon size={23} weight={active === task.key ? "fill" : "regular"} />
            <span>{task.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [appTab, setAppTab] = useState<AppTab>("home");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeHistory, setActiveHistory] = useState("h1");
  const [searchMiddleQuery, setSearchMiddleQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState<SkillMode | null>(null);
  const [activeBusinessLine, setActiveBusinessLine] = useState<BusinessLine | null>(null);
  const [guidedStep, setGuidedStep] = useState(0);
  const [guidedAnswers, setGuidedAnswers] = useState<string[]>([]);
  const [guidedExtras, setGuidedExtras] = useState<string[]>([]);
  const [guidedExtraInput, setGuidedExtraInput] = useState("");
  const [toast, setToast] = useState("");
  const [guideGenerated, setGuideGenerated] = useState(false);
  const [guideThinkingStep, setGuideThinkingStep] = useState(-1);
  const [guidePreference, setGuidePreference] = useState("");
  const [guideVoiceListening, setGuideVoiceListening] = useState(false);
  const [plannerFlowOpen, setPlannerFlowOpen] = useState(false);
  const [plannerSeed, setPlannerSeed] = useState("");
  const [plannerStep, setPlannerStep] = useState(0);
  const [plannerAnswers, setPlannerAnswers] = useState<string[]>([]);
  const [plannerCustomOpen, setPlannerCustomOpen] = useState(false);
  const [plannerCustomDestination, setPlannerCustomDestination] = useState("");
  const [guideDay, setGuideDay] = useState(0);
  const [guideFollowup, setGuideFollowup] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [linkParsed, setLinkParsed] = useState(false);
  const [uploadedGuideName, setUploadedGuideName] = useState("");
  const [uploadedGuidePreview, setUploadedGuidePreview] = useState("");
  const [imageParsed, setImageParsed] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiDemoStep, setAiDemoStep] = useState(-1);
  const [ticketType, setTicketType] = useState<TicketType>("flight");
  const [ticketSearched, setTicketSearched] = useState(false);
  const [ticketThinkingStep, setTicketThinkingStep] = useState(-1);
  const [hotelSearched, setHotelSearched] = useState(false);
  const [hotelSource, setHotelSource] = useState<HotelSource>("favorite");
  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);
  const [hotelContext, setHotelContext] = useState<HotelContext>("ai");
  const [landingViewedHotels, setLandingViewedHotels] = useState<number[]>([]);
  const [compareNudgeVisible, setCompareNudgeVisible] = useState(false);
  const [stayFilters, setStayFilters] = useState(DEFAULT_STAY_FILTERS);
  const [stayThinkingStep, setStayThinkingStep] = useState(-1);
  const [stayFollowup, setStayFollowup] = useState("");
  const [compareFollowup, setCompareFollowup] = useState("");
  const [compareLastQuestion, setCompareLastQuestion] = useState("");

  useEffect(() => {
    const assets = [
      ...Object.values(tabAssets),
      `${import.meta.env.BASE_URL}reference/qunar-current-search.png`,
      `${import.meta.env.BASE_URL}reference/qunar-haidian-sug.jpg`,
      `${import.meta.env.BASE_URL}reference/qunar-haidian-hotels.jpg`,
      `${import.meta.env.BASE_URL}brand/qunar-home-entry-clean-patch.png`,
      `${import.meta.env.BASE_URL}brand/qunar-camel-solid-white.png`,
      ...haidianHotelCatalog.flatMap((hotel) => hotel.imageSrc ? [hotel.imageSrc] : []),
    ];
    assets.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (view !== "hotel-landing") return;
    const timer = window.setTimeout(() => setCompareNudgeVisible(true), 10_000);
    return () => window.clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    if (view !== "xiaotuo" || aiDemoStep < 0 || aiDemoStep >= aiSearchStages.length) return;
    const timer = window.setTimeout(() => setAiDemoStep((current) => current + 1), 920);
    return () => window.clearTimeout(timer);
  }, [aiDemoStep, view]);

  useEffect(() => {
    if (view !== "guide-create" || !guideGenerated || guideThinkingStep < 0 || guideThinkingStep >= guideThinkingStages.length) return;
    const timer = window.setTimeout(() => setGuideThinkingStep((current) => current + 1), 720);
    return () => window.clearTimeout(timer);
  }, [guideGenerated, guideThinkingStep, view]);

  useEffect(() => {
    if (view !== "stay-search" || stayThinkingStep < 0 || stayThinkingStep >= finderThinkingStages.length) return;
    const timer = window.setTimeout(() => setStayThinkingStep((current) => current + 1), 680);
    return () => window.clearTimeout(timer);
  }, [stayThinkingStep, view]);

  useEffect(() => {
    if (view !== "tickets" || ticketThinkingStep < 0 || ticketThinkingStep >= finderThinkingStages.length) return;
    const timer = window.setTimeout(() => setTicketThinkingStep((current) => current + 1), 680);
    return () => window.clearTimeout(timer);
  }, [ticketThinkingStep, view]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const openView = (nextView: View) => {
    setHistoryOpen(false);
    setToast("");
    if (nextView !== "guide-create") setPlannerFlowOpen(false);
    if (nextView === "xiaotuo" && view !== "xiaotuo") {
      setAiDemoStep(-1);
      setAiQuery("");
      setActiveSkill(null);
      setActiveBusinessLine(null);
      setGuidedStep(0);
      setGuidedAnswers([]);
      setGuidedExtras([]);
      setGuidedExtraInput("");
      setPlannerFlowOpen(false);
      setPlannerSeed("");
      setPlannerStep(0);
      setPlannerAnswers([]);
      setPlannerCustomOpen(false);
      setPlannerCustomDestination("");
    }
    setView(nextView);
    if (nextView === "home") setAppTab("home");
    if (nextView === "hotels") setHotelContext("ai");
  };

  const openAppTab = (tab: AppTab) => {
    setHistoryOpen(false);
    setToast("");
    setAppTab(tab);
    setView("home");
  };

  const activeFlow = view;

  const openHotelLanding = () => {
    setHistoryOpen(false);
    setToast("");
    setHotelContext("haidian");
    setLandingViewedHotels([]);
    setCompareNudgeVisible(false);
    setView("hotel-landing");
  };

  const registerLandingHotelView = (id: number) => {
    setLandingViewedHotels((current) => {
      if (current.includes(id)) {
        notify(`已查看 ${current.length} 家酒店`);
        return current;
      }
      const next = [...current, id];
      if (next.length > 3) setCompareNudgeVisible(true);
      notify(`已查看 ${next.length} 家酒店`);
      return next;
    });
  };

  const openLandingCompare = () => {
    setHistoryOpen(false);
    setToast("");
    setHotelContext("haidian");
    setHotelSource("browsed");
    setSelectedHotels(landingViewedHotels.length >= 2 ? landingViewedHotels.slice(0, 5) : [1, 2]);
    setView("hotel-select");
  };

  const screenshotTabs = () => (
    <nav className="screenshot-tab-hotspots" aria-label="去哪儿原底部导航">
      {(["home", "trips", "service", "world", "profile"] as AppTab[]).map((tab) => (
        <button
          key={tab}
          type="button"
          aria-label={`打开${tab}页面`}
          onClick={() => {
            openAppTab(tab);
          }}
        />
      ))}
    </nav>
  );

  const renderOriginalHome = () => {
    if (appTab !== "home") {
      return (
        <div className="original-app-screen">
          <img src={tabAssets[appTab]} alt="去哪儿App原页面" className="original-screen-image" />
          <button className="original-page-hotspot" type="button" onClick={() => notify("已响应；该页面沿用去哪儿原有交互")} aria-label="原页面内容区域" />
          {screenshotTabs()}
        </div>
      );
    }

    return (
      <div className="original-app-screen">
        <img src={tabAssets.home} alt="去哪儿App首页原页面" className="original-screen-image" />
        <button className="home-search-hotspot" type="button" onClick={() => openView("search-middle")} aria-label="打开搜索与问小驼">
          <MagnifyingGlass size={20} weight="bold" />
          <span>海淀区的酒店</span>
          <b>搜索</b>
        </button>
        <div className="service-hotspots" aria-label="首页业务入口">
          {homeServices.map((service) => (
            <button type="button" key={service} onClick={() => notify(`已打开${service}`)} aria-label={service} />
          ))}
        </div>
        <button className="campaign-hotspot" type="button" onClick={() => notify("已打开首页活动")} aria-label="首页活动" />
        <div className="campaign-card-hotspots" aria-label="首页快捷活动">
          {Array.from({ length: 5 }).map((_, index) => (
            <button type="button" key={index} onClick={() => notify("已打开活动详情")} aria-label={`活动${index + 1}`} />
          ))}
        </div>
        <div className="feed-hotspots" aria-label="首页内容流">
          <button type="button" onClick={() => notify("已打开内容详情")} aria-label="左侧内容" />
          <button type="button" onClick={() => notify("已打开内容详情")} aria-label="右侧内容" />
        </div>
        {screenshotTabs()}
      </div>
    );
  };

  const renderSearchMiddle = () => (
    <div className="reference-flow-screen online-middle-screen">
      <div className="online-middle-status-capture" role="img" aria-label="去哪儿线上搜索中间页原图" />
      <div className="online-middle-body-capture" aria-hidden="true" />
      <button className="online-middle-back-hotspot" type="button" onClick={() => openView("home")} aria-label="返回去哪儿首页" />
      <div className="online-middle-tabs" role="tablist" aria-label="搜索方式">
        <button type="button" role="tab" aria-selected="true" className="active">搜索</button>
        <button type="button" role="tab" aria-selected="false" onClick={() => openView("xiaotuo")}>问小驼</button>
        <small>旅行问题，小驼都安排</small>
      </div>
      <button className="online-middle-search-hotspot" type="button" onClick={() => openView("normal-search")} aria-label="进入搜索Sug页" />
    </div>
  );

  const renderNormalSearch = () => (
    <div className="reference-flow-screen search-sug-screen">
      <img src={asset(`${import.meta.env.BASE_URL}reference/qunar-haidian-sug.jpg`)} alt="去哪儿海淀区酒店搜索建议页" />
      <div className="search-page-chrome">
        <PhoneStatus />
        <div className="search-mode-header">
          <button type="button" onClick={() => openView("search-middle")} aria-label="返回搜索中间页"><ArrowLeft size={23} weight="bold" /></button>
          <div className="search-mode-switch" role="tablist" aria-label="搜索方式">
            <button type="button" role="tab" aria-selected="true" className="active" onClick={() => openView("search-middle")}>搜索</button>
            <button type="button" role="tab" aria-selected="false" onClick={() => openView("xiaotuo")}>问小驼</button>
            <small className="mode-promise">旅行问题，小驼都安排</small>
          </div>
          <span aria-hidden="true" />
        </div>
        <div className="search-query-row">
          <div className="search-query-field"><MagnifyingGlass size={17} /><span>{searchMiddleQuery || "海淀区的酒店"}</span><X size={15} weight="fill" /></div>
          <button type="button" onClick={openHotelLanding}>搜索</button>
        </div>
      </div>
      <button className="sug-first-line-hotspot" type="button" onClick={openHotelLanding} aria-label="进入海淀区酒店业务线" />
    </div>
  );

  const renderHotelLanding = () => (
    <div className="reference-flow-screen hotel-landing-screen">
      <img src={asset(`${import.meta.env.BASE_URL}reference/qunar-haidian-hotels.jpg`)} alt="去哪儿海淀区酒店落地页" />
      <button className="landing-back-hotspot" type="button" onClick={() => openView("normal-search")} aria-label="返回搜索建议" />
      <div className="landing-hotel-hotspots" aria-label="海淀区酒店列表">
        {[1, 2, 3, 4].map((hotelId) => (
          <button
            type="button"
            key={hotelId}
            className={`landing-hotel-${hotelId}`}
            onClick={() => registerLandingHotelView(hotelId)}
            aria-label={`查看第${hotelId}家酒店`}
          />
        ))}
      </div>
      <button
        type="button"
        className={compareNudgeVisible ? "landing-compare-float visible" : "landing-compare-float"}
        onClick={openLandingCompare}
        aria-label="问小驼帮我比一比"
        tabIndex={compareNudgeVisible ? 0 : -1}
      >
        <QunarCamel compact solid />
        <strong>比一比</strong>
      </button>
    </div>
  );

  const hubSuggestions: Array<{ text: string; view: View }> = [
    { text: "北京周末去哪儿？", view: "guide-create" },
    { text: "找适合8个人入住、可以烧烤的独立小院", view: "stay-search" },
    { text: `把刚才看过的${Math.max(landingViewedHotels.length, 4)}家酒店比一比`, view: "hotels" },
  ];

  const businessLineItems = [
    { key: "hotel" as BusinessLine, label: "酒店", icon: Buildings },
    { key: "homestay" as BusinessLine, label: "民宿", icon: House },
    { key: "vacation" as BusinessLine, label: "度假", icon: MapTrifold },
    { key: "ticket" as BusinessLine, label: "门票", icon: Ticket },
    { key: "flight" as BusinessLine, label: "机票", icon: AirplaneTilt },
    { key: "train" as BusinessLine, label: "火车票", icon: Train },
    { key: "car" as BusinessLine, label: "租车", icon: Car },
  ];

  const skillPanels: Record<SkillMode, { title: string; prompt: string; lines: BusinessLine[]; recommendations: SkillRecommendation[] }> = {
    inspiration: {
      title: "帮我规划",
      prompt: "小骆会一步步了解你的旅行安排",
      lines: ["flight", "train", "vacation", "ticket", "car"],
      recommendations: planningGuessQuestions.map((text) => ({ text, line: "vacation" })),
    },
    stay: {
      title: "帮我找",
      prompt: "小骆帮你找",
      lines: ["hotel", "homestay", "vacation", "ticket", "flight", "train", "car"],
      recommendations: [
        { text: "北京国贸附近，周末住一晚，地铁步行10分钟内且可免费取消", line: "hotel" },
        { text: "北京周边8人独院，周末一晚，能烧烤且有麻将桌", line: "homestay" },
        { text: "带父母去三亚玩3天2晚，住得舒服、行程别太赶", line: "vacation" },
        { text: "北京环球度假区两大一小门票，本周末入园，优先早入园", line: "ticket" },
        { text: "北京飞成都周五晚出发，周日返程，含行李优先", line: "flight" },
      ],
    },
    compare: {
      title: "帮我PK",
      prompt: "想比较哪类旅行产品？",
      lines: ["flight", "hotel", "train", "homestay", "vacation", "ticket", "car"],
      recommendations: ["比较总价和退改", "对比刚看过的酒店", "哪种交通更省时", "租车套餐哪家划算"].map((text) => ({ text })),
    },
  };

  const openSkillPanel = (skill: SkillMode) => {
    if (skill === "inspiration") {
      openPlanner();
      return;
    }
    if (skill === "compare") {
      setActiveSkill(null);
      setActiveBusinessLine(null);
      setHotelContext("ai");
      openView("hotels");
      return;
    }
    setActiveSkill(skill);
    setActiveBusinessLine(null);
    setGuidedStep(0);
    setGuidedAnswers([]);
    setGuidedExtras([]);
    setGuidedExtraInput("");
  };

  const closeSkillPanel = () => {
    setActiveSkill(null);
    setActiveBusinessLine(null);
    setGuidedStep(0);
    setGuidedAnswers([]);
    setGuidedExtras([]);
    setGuidedExtraInput("");
  };

  const openPlanner = (seed = "") => {
    setActiveSkill(null);
    setActiveBusinessLine(null);
    setGuidedStep(0);
    setGuidedAnswers([]);
    setGuidedExtras([]);
    setGuidedExtraInput("");
    setGuideGenerated(false);
    setGuideThinkingStep(-1);
    setPlannerSeed(seed);
    setGuidePreference(seed);
    setGuideFollowup("");
    setGuideDay(0);
    setPlannerAnswers([]);
    setPlannerStep(0);
    setPlannerCustomOpen(false);
    setPlannerCustomDestination("");
    setPlannerFlowOpen(true);
    openView("guide-create");
  };

  const choosePlanningAnswer = (answer: string) => {
    const nextAnswers = [...plannerAnswers.slice(0, plannerStep), answer];
    setPlannerAnswers(nextAnswers);
    setGuidePreference([...([plannerSeed].filter(Boolean)), ...nextAnswers].join(" · "));
    setPlannerStep(Math.min(plannerStep + 1, planningQuestions.length));
  };

  const confirmPlannerDestination = () => {
    const destination = plannerCustomDestination.trim();
    if (!destination) return notify("请输入想去的城市、景区或区域");
    choosePlanningAnswer(destination);
    setPlannerCustomOpen(false);
  };

  const usePlanningGuess = (question: string) => {
    setGuidePreference([...([plannerSeed].filter(Boolean)), question].join(" · "));
    setPlannerAnswers([question]);
    setPlannerStep(planningQuestions.length);
  };

  const generatePlannedGuide = () => {
    setPlannerFlowOpen(false);
    setGuideGenerated(true);
    setGuideThinkingStep(0);
    setGuideDay(0);
  };

  const startGuidedFlow = (line: BusinessLine) => {
    setActiveBusinessLine(line);
    setGuidedStep(0);
    setGuidedAnswers([]);
    setGuidedExtras([]);
    setGuidedExtraInput("");
  };

  const chooseGuidedAnswer = (answer: string) => {
    if (!activeBusinessLine) return;
    const flow = businessFlows[activeBusinessLine];
    const nextAnswers = [...guidedAnswers.slice(0, guidedStep), answer];
    setGuidedAnswers(nextAnswers);
    setGuidedStep(Math.min(guidedStep + 1, flow.questions.length));
  };

  const deriveStayFilters = (request: string, selected: string[] = [], extras: string[] = []) => {
    const normalized = [...selected, ...extras]
      .flatMap((value) => value.split(/[，、；;,]/))
      .map((value) => value.trim())
      .filter((value) => value && !["酒店", "民宿", "帮我找", "住宿"].includes(value));
    const requestHints = request
      .split(/[：，、；;,。]/)
      .map((value) => value.trim())
      .filter((value) => value.length >= 2 && !/^(酒店|民宿|帮我找|度假)[:：]?$/.test(value));
    const values = Array.from(new Set([...normalized, ...requestHints]));
    const formatted = values.map((value) => {
      if (/^[1-9][0-9]*[—-][1-9][0-9]*人$/.test(value)) return `${value}入住`;
      if (/^[1-9][0-9]*人以上$/.test(value)) return `${value}入住`;
      return value;
    });
    return (formatted.length ? formatted : ["住宿需求已解析"]).slice(0, 7);
  };

  const submitGuidedRequest = () => {
    if (!activeBusinessLine) return;
    const flow = businessFlows[activeBusinessLine];
    const request = `${flow.label}：${[...guidedAnswers, ...guidedExtras].join("，")}`;
    const inferredFilters = activeBusinessLine === "hotel" || activeBusinessLine === "homestay"
      ? deriveStayFilters(request, guidedAnswers, guidedExtras)
      : undefined;
    startBusinessLineResult(activeBusinessLine, request, inferredFilters);
  };

  const addGuidedExtra = () => {
    const value = guidedExtraInput.trim();
    if (!value) return;
    if (guidedExtras.includes(value)) {
      setGuidedExtraInput("");
      return;
    }
    setGuidedExtras((current) => [...current, value]);
    setGuidedExtraInput("");
  };

  const submitRecommendedRequest = (request: string) => {
    setAiQuery(request);
    setActiveSkill(null);
    setAiDemoStep(0);
  };

  const startBusinessLineResult = (line: BusinessLine, request: string, inferredFilters?: string[]) => {
    setAiQuery(request);
    closeSkillPanel();
    if (line === "hotel" || line === "homestay") {
      setStayFilters(inferredFilters || deriveStayFilters(request));
      setStayThinkingStep(0);
      openView("stay-search");
      return;
    }
    if (line === "vacation") {
      setPlannerFlowOpen(false);
      setGuidePreference(request);
      setGuideGenerated(true);
      setGuideThinkingStep(0);
      setGuideDay(0);
      openView("guide-create");
      return;
    }
    if (line === "flight" || line === "train" || line === "ticket") {
      setTicketType(line === "train" ? "train" : line === "ticket" ? "ticket" : "flight");
      setTicketSearched(true);
      setTicketThinkingStep(0);
      openView("tickets");
      return;
    }
    setAiDemoStep(0);
    openView("xiaotuo");
  };

  const submitSkillRecommendation = (item: SkillRecommendation) => {
    if (item.line) {
      startBusinessLineResult(item.line, item.text);
      return;
    }
    submitRecommendedRequest(item.text);
  };

  const openHubSuggestion = (item: { text: string; view: View }) => {
    setAiQuery(item.text);
    if (item.view === "guide-create") {
      openPlanner(item.text);
      return;
    }
    if (item.view === "stay-search") {
      setStayFilters(deriveStayFilters(item.text));
      setStayThinkingStep(0);
    }
    if (item.view === "hotel-compare" && selectedHotels.length < 2) setSelectedHotels([1, 2]);
    if (item.view === "hotels" || item.view === "hotel-compare") setHotelContext("ai");
    openView(item.view);
  };

  const resetAiDemo = () => {
    setAiDemoStep(-1);
    setAiQuery("");
  };

  const startAiSearch = () => {
    const request = aiQuery.trim() || AI_QUERY_PRESET;
    setAiQuery(request);
    setHistoryOpen(false);
    setAiDemoStep(0);
  };

  const startGuideVoiceInput = () => {
    if (guideVoiceListening) return;
    setGuideVoiceListening(true);
    window.setTimeout(() => {
      setGuidePreference("人均预算3000元，带父母出行，希望每天10点左右再出门，景点之间尽量顺路，少走路、不赶早，住宿靠近地铁并含早餐，想安排一次北京特色餐，但不要连续吃太油腻的食物。");
      setGuideVoiceListening(false);
      notify("已识别并填入语音需求");
    }, 1100);
  };

  const submitGuideFollowup = () => {
    const followup = guideFollowup.trim();
    if (!followup) return notify("请先输入想调整的方向");
    setGuidePreference((current) => current ? `${current}；${followup}` : followup);
    setGuideFollowup("");
    setGuideGenerated(true);
    setPlannerFlowOpen(false);
    setGuideThinkingStep(0);
    setGuideDay(0);
    notify("已按补充条件重新整理攻略");
  };

  const handleGuideImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return notify("请选择攻略图片");
    setUploadedGuideName(file.name);
    setImageParsed(false);
    const reader = new FileReader();
    reader.onload = () => setUploadedGuidePreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const renderXiaotuoHub = () => (
    <div className="ai-screen xiaotuo-home-screen">
      <PhoneStatus />
      <section className="assistant-surface">
        <div className="assistant-topbar">
          <button type="button" onClick={() => openView("home")} aria-label="返回去哪儿首页"><ArrowLeft size={23} weight="bold" /></button>
          <div className="assistant-mode-switch" role="tablist" aria-label="搜索方式">
            <button type="button" role="tab" aria-selected="false" onClick={() => openView("search-middle")}>搜索</button>
            <button type="button" role="tab" aria-selected="true" className="active">问小驼</button>
            <small className="mode-promise">旅行问题，小驼都安排</small>
          </div>
          <button type="button" onClick={() => setHistoryOpen(true)} aria-label="打开历史对话"><SidebarSimple size={23} weight="bold" /></button>
        </div>

        {aiDemoStep < 0 ? (
          <div className="assistant-content">
            <div className="assistant-inline-prompt"><QunarCamel compact solid /><span>今天想去哪儿？小驼帮你找、帮你比、帮你规划</span></div>

            <section className="assistant-main-composer" aria-label="向问小驼提问">
              <textarea aria-label="输入旅行需求" value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder={AI_QUERY_PRESET} />
              <div><button type="button" onClick={() => notify("语音输入已开启")} aria-label="语音输入"><Microphone size={21} weight="bold" /></button><button type="button" className="main-composer-send" onClick={startAiSearch}><span>发送</span><PaperPlaneTilt size={17} weight="fill" /></button></div>
            </section>

            <section className="assistant-abilities">
              <div className="section-title-row"><strong>小驼能帮你</strong><small>三项核心能力</small></div>
              <div className="ability-grid">
                <button type="button" onClick={() => openSkillPanel("stay")}><MagnifyingGlass size={23} weight="duotone" /><span><strong>帮我找</strong><small>小骆帮你匹配服务</small></span></button>
                <button type="button" onClick={() => openSkillPanel("inspiration")}><MapTrifold size={23} weight="duotone" /><span><strong>帮我规划</strong><small>一步步补齐旅行安排</small></span></button>
                <button type="button" onClick={() => openSkillPanel("compare")}><ArrowsLeftRight size={23} weight="duotone" /><span><strong>帮我PK</strong><small>统一价格与规则</small></span></button>
              </div>
            </section>

            <div className="assistant-suggestions" aria-live="polite">
              <div className="suggestion-heading"><strong>试试这样问</strong><small>根据当前城市和浏览行为更新</small></div>
              {hubSuggestions.map((item, index) => (
                <button type="button" key={index} onClick={() => openHubSuggestion(item)}>
                  <Sparkle size={13} weight="fill" />
                  <span>{item.text}</span>
                </button>
              ))}
            </div>

            <section className="assistant-history-preview">
              <div className="section-title-row"><strong>历史对话</strong><button type="button" onClick={() => setHistoryOpen(true)}>查看全部<CaretRight size={14} /></button></div>
              <div>{historyItems.slice(0, 2).map((item) => <button type="button" key={item.id} onClick={() => { setActiveHistory(item.id); setHistoryOpen(true); }}><ClockCounterClockwise size={16} /><span>{item.title}</span><small>{item.time}</small></button>)}</div>
            </section>

            {landingViewedHotels.length >= 2 && <button className="assistant-context-card" type="button" onClick={openLandingCompare}>
              <QunarCamel compact solid />
              <span><strong>刚看过{landingViewedHotels.length}家酒店，帮你比一比</strong><small>统一价格、位置和退改条件</small></span>
              <CaretRight size={17} />
            </button>}
          </div>
        ) : (
          <div className="assistant-content ai-demo-content" aria-live="polite">
            <div className="ai-demo-heading"><QunarCamel compact solid /><span><strong>小驼正在为你搜索</strong><small>实时拆解需求并核对可订信息</small></span></div>
            <div className="user-query-bubble">{aiQuery}</div>
            <section className="ai-search-process">
              {aiSearchStages.map((stage, index) => {
                const state = aiDemoStep > index ? "done" : aiDemoStep === index ? "active" : "waiting";
                return (
                  <div className={`ai-search-step ${state}`} key={stage.title}>
                    <i>{state === "done" ? <Check size={13} weight="bold" /> : index + 1}</i>
                    <span><strong>{stage.title}</strong><small>{stage.detail}</small></span>
                    {state === "active" && <b><span /><span /><span /></b>}
                  </div>
                );
              })}
            </section>
            {aiDemoStep >= aiSearchStages.length && (
              <section className="ai-answer-card">
                <div><Sparkle size={18} weight="fill" /><strong>方案已生成</strong></div>
                <p>已将模糊描述转成7项可核验条件，并找到3个预算内的独院候选。每项结果都会说明条件来自商家设施、商品描述、用户评价或仍待确认。</p>
                <ul><li>优先展示整院、8人可住且支持烧烤的房源</li><li>价格、位置、取消规则和匹配来源均可继续比较</li></ul>
                <div className="ai-answer-actions"><button type="button" onClick={() => openView("stay-search")}>查看住宿结果</button><button type="button" onClick={() => openView("hotels")}>加入比较</button></div>
              </section>
            )}
          </div>
        )}

        {aiDemoStep >= 0 && <div className="assistant-bottom">
            <div className="assistant-composer">
              <button type="button" onClick={() => notify("语音输入已开启")} aria-label="语音输入"><Microphone size={24} weight="bold" /></button>
              <input aria-label="向小驼发送消息" value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder="继续补充旅行需求…" />
              <button type="button" onClick={() => notify("已打开相机")} aria-label="拍照或上传图片"><Camera size={23} /></button>
              <button type="button" className="assistant-send" onClick={startAiSearch} aria-label="发送并开始AI搜索"><PaperPlaneTilt size={20} weight="fill" /></button>
            </div>
          </div>
        }
      </section>
      {activeSkill && (() => {
        const panel = skillPanels[activeSkill];
        const availableLines = businessLineItems.filter((item) => panel.lines.includes(item.key));
        const activeFlow = activeBusinessLine ? businessFlows[activeBusinessLine] : null;
        const complete = activeFlow ? guidedStep >= activeFlow.questions.length : false;
        return <>
          <button type="button" className="skill-sheet-scrim" onClick={closeSkillPanel} aria-label="关闭技能面板" />
          <aside className="skill-sheet" role="dialog" aria-modal="true" aria-label={`${panel.title}需求选择`}>
            <div className="skill-sheet-head"><span><strong>{panel.title}</strong><small>小驼会根据选择继续问</small></span><button type="button" onClick={closeSkillPanel} aria-label="关闭"><X size={19} /></button></div>
            {!activeBusinessLine ? <>
              <strong className="skill-sheet-question">{panel.prompt}</strong>
              <div className={activeSkill === "stay" ? "skill-line-options find-line-options" : "skill-line-options"}>{availableLines.map((item) => { const Icon = item.icon; return <button type="button" key={item.key} onClick={() => startGuidedFlow(item.key)}><Icon size={18} weight="duotone" />{item.label}</button>; })}</div>
              <div className="skill-recommendations"><strong>小驼猜你想问</strong><div>{panel.recommendations.map((item) => <button type="button" key={item.text} onClick={() => submitSkillRecommendation(item)}>{item.text}</button>)}</div></div>
            </> : activeFlow && <div className="guided-choice-card sheet-guided-choice" aria-live="polite">
              <div className="guided-choice-head"><span><strong>{activeFlow.label}</strong><small>{complete ? "需求已明确" : `${guidedStep + 1}/${activeFlow.questions.length}`}</small></span><button type="button" onClick={() => { setActiveBusinessLine(null); setGuidedStep(0); setGuidedAnswers([]); setGuidedExtras([]); setGuidedExtraInput(""); }} aria-label="返回业务选择"><ArrowLeft size={17} /></button></div>
              {(guidedAnswers.length > 0 || guidedExtras.length > 0) && <div className="guided-answer-chips">{guidedAnswers.map((answer, index) => <button type="button" key={`${answer}-${index}`} onClick={() => { setGuidedAnswers(guidedAnswers.slice(0, index)); setGuidedStep(index); }}>{answer}<X size={11} /></button>)}{guidedExtras.map((answer, index) => <button type="button" className="extra" key={`${answer}-extra-${index}`} onClick={() => setGuidedExtras((current) => current.filter((item) => item !== answer))}>{answer}<X size={11} /></button>)}</div>}
              {!complete ? <><strong className="guided-question">{activeFlow.questions[guidedStep].prompt}</strong><div className="guided-options">{activeFlow.questions[guidedStep].options.map((option) => <button type="button" key={option} onClick={() => chooseGuidedAnswer(option)}>{option}</button>)}</div></> : <div className="guided-complete"><p>已根据你的选择整理好需求，可以继续补充或交给小驼搜索。</p><button type="button" onClick={submitGuidedRequest}>按这些条件继续<CaretRight size={15} /></button></div>}
              <div className="guided-freeform"><label htmlFor="guided-extra-input">还有其他条件？</label><div><input id="guided-extra-input" value={guidedExtraInput} onChange={(event) => setGuidedExtraInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addGuidedExtra(); } }} placeholder="例如：带宠物、离地铁近、预算更低" /><button type="button" onClick={addGuidedExtra}>加入</button></div><small>可补充自然语言，也可点击上方已选条件重新选择</small></div>
            </div>}
            {!activeBusinessLine && <div className="skill-sheet-composer"><input aria-label="补充旅行需求" value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder="也可以直接输入你的具体需求…" /><button type="button" onClick={() => notify("语音输入已开启")} aria-label="语音输入"><Microphone size={21} /></button><button type="button" onClick={() => { closeSkillPanel(); startAiSearch(); }} aria-label="发送"><PaperPlaneTilt size={18} weight="fill" /></button></div>}
          </aside>
        </>;
      })()}
      <button
        type="button"
        className={historyOpen ? "history-scrim open" : "history-scrim"}
        onClick={() => setHistoryOpen(false)}
        aria-label="关闭历史对话"
        tabIndex={historyOpen ? 0 : -1}
      />
      <aside className={historyOpen ? "history-drawer open" : "history-drawer"} aria-hidden={!historyOpen} aria-label="历史对话">
        <div className="history-drawer-head">
          <div><QunarCamel compact solid /><strong>历史对话</strong></div>
          <button type="button" onClick={() => setHistoryOpen(false)} aria-label="关闭"><X size={21} weight="bold" /></button>
        </div>
        <button className="new-conversation" type="button" onClick={() => { setHistoryOpen(false); notify("已新建一段对话"); }}>
          <Plus size={18} weight="bold" />新对话
        </button>
        <div className="history-list">
          {historyItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeHistory === item.id ? "active" : ""}
              onClick={() => {
                setActiveHistory(item.id);
                setHistoryOpen(false);
                notify(`已打开：${item.title}`);
              }}
            >
              <ChatCircleDots size={19} />
              <span><strong>{item.title}</strong><small>{item.time}</small></span>
              <CaretRight size={16} />
            </button>
          ))}
        </div>
        <p><ClockCounterClockwise size={16} />历史记录仅用于原型演示</p>
      </aside>
    </div>
  );

  const GuideModeSwitch = ({ copyMode }: { copyMode: boolean }) => (
    <div className="mode-switch" role="tablist" aria-label="攻略方式">
      <button type="button" role="tab" aria-selected={!copyMode} className={!copyMode ? "active" : ""} onClick={() => openView("guide-create")}>
        <Article size={18} />做攻略
      </button>
      <button type="button" role="tab" aria-selected={copyMode} className={copyMode ? "active" : ""} onClick={() => openView("guide-copy")}>
        <Copy size={18} />抄攻略
      </button>
    </div>
  );

  const renderGuideCreate = () => {
    const currentPlanningQuestion = planningQuestions[plannerStep];
    const planningComplete = plannerStep >= planningQuestions.length;
    const currentGuideDay = guidePlanDays[guideDay] || guidePlanDays[0];
    return (
      <div className={guideGenerated ? "ai-screen guide-generated-screen" : "ai-screen"}>
        <PhoneStatus />
        <ScreenHeader title="做攻略" subtitle="按你的需求生成" onBack={() => openView("xiaotuo")} />
        <div className={guideGenerated ? "ai-scroll task-page-scroll guide-generated-scroll" : "ai-scroll task-page-scroll"}>
          <GuideModeSwitch copyMode={false} />
          {guideGenerated ? <div className="guide-generated-flow">
            <section className="guide-thinking-card guide-thinking-card-top" aria-live="polite">
              <div className="guide-thinking-title"><Sparkle size={17} weight="fill" /><span><strong>{guideThinkingStep >= guideThinkingStages.length ? "小驼已完成思考" : "小驼正在思考"}</strong><small>正在把你的偏好整理成可执行的旅行安排</small></span></div>
              {guideThinkingStages.map((stage, index) => <div className={`guide-thinking-row ${guideThinkingStep > index ? "done" : guideThinkingStep === index ? "active" : "waiting"}`} key={stage.title}><i>{guideThinkingStep > index ? <Check size={12} weight="bold" /> : index + 1}</i><span><strong>{stage.title}</strong><small>{stage.detail}</small></span></div>)}
            </section>
            {guideThinkingStep >= guideThinkingStages.length && <>
              <section className="guide-plan-card">
                <div className="guide-plan-hero">
                  <div className="guide-plan-hero-icon"><MapTrifold size={24} weight="fill" /></div>
                  <div><span>小驼为你整理 · 轻松节奏</span><strong>潮汕 3天2晚慢游攻略</strong><small>{guidePreference || "按你的偏好安排交通、住宿和每日动线"}</small></div>
                  <b>约 ¥1,020/人</b>
                </div>
                <div className="guide-plan-day-tabs" role="tablist" aria-label="攻略日期">
                  {guidePlanDays.map((day, index) => <button type="button" role="tab" aria-selected={guideDay === index} className={guideDay === index ? "active" : ""} key={day.day} onClick={() => setGuideDay(index)}><strong>{day.day}</strong><small>{day.title.split(" · ")[0]}</small></button>)}
                </div>
                <div className="guide-plan-day-summary"><div><strong>{currentGuideDay.title}</strong><small>{currentGuideDay.summary}</small></div><b>{currentGuideDay.budget}</b></div>
                <div className="guide-plan-stop-list">
                  {currentGuideDay.stops.map((stop) => <div className="guide-plan-stop" key={`${currentGuideDay.day}-${stop.time}`}><time>{stop.time}</time><span className="guide-plan-stop-dot" /><div><strong>{stop.title}</strong><small>{stop.detail}</small></div><em>{stop.tag}</em></div>)}
                </div>
                <div className="guide-plan-footnote"><Check size={14} weight="bold" />交通、住宿和门票可继续替换，小驼会同步更新预算与动线</div>
              </section>
              <section className="guide-next-questions">
                <div className="section-title-row"><strong>猜你还想问</strong><small>点一下继续调整</small></div>
                <div>{guideNextQuestions.map((question) => <button type="button" key={question} onClick={() => setGuideFollowup(question)}><Sparkle size={13} weight="fill" /><span>{question}</span><CaretRight size={15} /></button>)}</div>
              </section>
            </>}
          </div> : plannerFlowOpen ? <section className="planner-flow-card">
            <div className="planner-flow-heading"><div className="planner-flow-icon"><Sparkle size={20} weight="fill" /></div><span><strong>帮我规划旅行</strong><small>小驼会边问边整理，随时可以补充或修改</small></span></div>
            <div className="planner-progress"><span style={{ width: `${Math.min((plannerStep / planningQuestions.length) * 100, 100)}%` }} /></div>
            {plannerSeed && <div className="planner-seed"><span>刚才的想法</span>{plannerSeed}</div>}
            {planningComplete ? <div className="planner-complete planner-complete-page"><Sparkle size={24} weight="fill" /><strong>旅行需求已整理好</strong><p>{guidePreference || "已按你的选择补全旅行条件"}</p><button type="button" onClick={generatePlannedGuide}>开始生成攻略<PaperPlaneTilt size={16} weight="fill" /></button></div> : currentPlanningQuestion && <>
              {plannerAnswers.length > 0 && <div className="guided-answer-chips planner-answer-chips">{plannerAnswers.map((answer, index) => <button type="button" key={`${answer}-${index}`} onClick={() => { setPlannerAnswers(plannerAnswers.slice(0, index)); setPlannerStep(index); }}>{answer}<X size={11} /></button>)}</div>}
              <small className="planner-step-label">{currentPlanningQuestion.label} · {plannerStep + 1}/{planningQuestions.length}</small>
              <strong className="planner-flow-question">{currentPlanningQuestion.prompt}</strong>
              <div className="guided-options planner-options">{currentPlanningQuestion.options.map((option) => {
                const isCustomDestination = plannerStep === 0 && option === "自定义目的地";
                return <button type="button" className={isCustomDestination && plannerCustomOpen ? "custom active" : isCustomDestination ? "custom" : ""} key={option} onClick={() => isCustomDestination ? setPlannerCustomOpen(true) : choosePlanningAnswer(option)}>{isCustomDestination && <Plus size={14} weight="bold" />}{option}</button>;
              })}</div>
              {plannerStep === 0 && plannerCustomOpen && <div className="planner-custom-destination">
                <div><MagnifyingGlass size={16} /><input autoFocus value={plannerCustomDestination} onChange={(event) => setPlannerCustomDestination(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); confirmPlannerDestination(); } }} placeholder="输入城市、景区或想去的区域" aria-label="自定义目的地" /><button type="button" onClick={confirmPlannerDestination}>确定</button></div>
                <small>例如：大理、川西、上海迪士尼，也可以输入“北京周边”</small>
              </div>}
              {plannerStep === 0 && <div className="planner-guess"><strong>小驼猜你想问</strong><div>{planningGuessQuestions.map((question) => <button type="button" key={question} onClick={() => usePlanningGuess(question)}>{question}</button>)}</div></div>}
            </>}
          </section> : <>
            <section className="task-intro"><MapTrifold size={28} weight="duotone" /><div><strong>告诉小驼你的旅行想法</strong><small>用你的需求生成可继续调整的攻略</small></div></section>
            <section className="form-card">
              <label><span>目的地</span><input placeholder="例如：潮汕" /></label>
              <div className="form-grid">
                <label><span>出发日期</span><button type="button" onClick={() => notify("已打开日期选择")}><CalendarDots size={17} />选择日期</button></label>
                <label><span>游玩天数</span><button type="button" onClick={() => notify("已打开天数选择")}>3天2晚<CaretRight size={16} /></button></label>
              </div>
              <label><span>预算与偏好</span><div className="preference-voice-field"><textarea value={guidePreference} onChange={(event) => setGuidePreference(event.target.value)} placeholder="例如：人均3000元，带父母出行，每天10点左右出门；少走路、不赶早，景点尽量顺路，酒店靠近地铁并含早餐，还想安排一顿北京特色餐。" /><button type="button" className={guideVoiceListening ? "listening" : ""} onClick={startGuideVoiceInput} aria-label="语音输入预算与偏好"><Microphone size={19} weight="bold" /><small>{guideVoiceListening ? "识别中" : "语音"}</small></button></div></label>
              <button className="primary-cta" type="button" onClick={() => { setPlannerFlowOpen(false); setGuideGenerated(true); setGuideThinkingStep(0); setGuideDay(0); }}><Sparkle size={18} weight="fill" />生成攻略</button>
            </section>
            <section className="empty-result-placeholder"><Skeleton rows={5} /></section>
          </>}
        </div>
        <div className="guide-bottom-area">
          <div className="guide-skill-shortcuts" aria-label="切换小驼能力">
            <button type="button" onClick={() => openView("stay-search")}><Bed size={15} />帮我找</button>
            <button type="button" className="active" onClick={() => openView("guide-create")}><MapTrifold size={15} />帮我规划</button>
            <button type="button" onClick={() => openView("hotels")}><ArrowsLeftRight size={15} />帮我PK</button>
          </div>
          <div className="guide-followup-composer">
            <button type="button" onClick={startGuideVoiceInput} aria-label="语音补充需求"><Microphone size={19} weight="bold" /></button>
            <input value={guideFollowup} onChange={(event) => setGuideFollowup(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submitGuideFollowup(); } }} placeholder={guideGenerated ? "继续调整攻略，例如：每天少安排一个景点" : "也可以直接告诉小驼你的偏好…"} aria-label="继续调整攻略" />
            <button type="button" onClick={submitGuideFollowup} aria-label="发送追问"><PaperPlaneTilt size={18} weight="fill" /></button>
          </div>
        </div>
        <TaskDock active="guide" onOpen={openView} />
      </div>
    );
  };

  const renderGuideCopy = () => (
    <div className="ai-screen">
      <PhoneStatus />
      <ScreenHeader title="抄攻略" subtitle="导入外部内容" onBack={() => openView("xiaotuo")} />
      <div className="ai-scroll task-page-scroll">
        <GuideModeSwitch copyMode />
        <section className="task-intro"><FileArrowDown size={28} weight="duotone" /><div><strong>导入外部攻略</strong><small>支持粘贴链接或上传攻略图片进行解析</small></div></section>
        <section className="form-card">
          <label><span>攻略链接</span><div className="link-field"><LinkSimple size={18} /><input value={linkValue} onChange={(event) => setLinkValue(event.target.value)} placeholder="粘贴小红书、公众号或网页链接" /></div></label>
          <button className="sample-link" type="button" onClick={() => setLinkValue("https://example.com/travel-guide")}>填入示例链接</button>
          <div className="import-divider"><span />或上传攻略图片<span /></div>
          <label className={uploadedGuidePreview ? "guide-image-upload has-preview" : "guide-image-upload"} htmlFor="guide-image-input">
            {uploadedGuidePreview ? <img src={uploadedGuidePreview} alt="待解析的攻略图片" /> : <ImageSquare size={25} weight="duotone" />}
            <span><strong>{uploadedGuideName || "上传攻略截图或长图"}</strong><small>支持 JPG、PNG，可识别地点、路线与文字</small></span>
            <UploadSimple size={20} weight="bold" />
          </label>
          <input id="guide-image-input" className="visually-hidden" type="file" accept="image/*" onChange={handleGuideImage} />
          <button className="primary-cta" type="button" onClick={() => {
            if (!linkValue.trim() && !uploadedGuideName) return notify("请粘贴链接或上传攻略图片");
            setImageParsed(Boolean(uploadedGuideName));
            setLinkParsed(true);
          }}><ClipboardText size={18} weight="fill" />导入并解析</button>
        </section>
        {linkParsed ? (
          <section className="result-placeholder">
            <div className="result-state"><Check size={18} weight="bold" /><strong>{imageParsed ? "图片解析完成，已转为可编辑结构" : "链接解析完成，已转为可编辑结构"}</strong></div>
            <div className="import-layout"><span /><span /><span /></div>
            <Skeleton rows={5} />
          </section>
        ) : <section className="empty-result-placeholder"><Skeleton rows={5} /></section>}
      </div>
      <TaskDock active="guide" onOpen={openView} />
    </div>
  );

  const renderTickets = () => {
    const TicketIcon = ticketType === "flight" ? AirplaneTilt : ticketType === "train" ? Train : Ticket;
    const isAttractionTicket = ticketType === "ticket";
    const showTicketResults = ticketSearched && (ticketThinkingStep < 0 || ticketThinkingStep >= finderThinkingStages.length);
    return (
      <div className="ai-screen">
        <PhoneStatus />
        <ScreenHeader title={isAttractionTicket ? "找门票" : "订票"} subtitle="把条件一次说清" onBack={() => openView("xiaotuo")} />
        <div className="ai-scroll task-page-scroll">
          <div className="mode-switch ticket-switch" role="tablist" aria-label="票务类型">
            <button type="button" className={ticketType === "flight" ? "active" : ""} onClick={() => { setTicketType("flight"); setTicketSearched(false); setTicketThinkingStep(-1); }}><AirplaneTilt size={18} />机票</button>
            <button type="button" className={ticketType === "train" ? "active" : ""} onClick={() => { setTicketType("train"); setTicketSearched(false); setTicketThinkingStep(-1); }}><Train size={18} />火车票</button>
            <button type="button" className={ticketType === "ticket" ? "active" : ""} onClick={() => { setTicketType("ticket"); setTicketSearched(false); setTicketThinkingStep(-1); }}><Ticket size={18} />门票</button>
          </div>
          <section className="route-card">
            <button type="button" onClick={() => notify(isAttractionTicket ? "已打开游玩城市选择" : "已打开出发地选择")}><small>{isAttractionTicket ? "游玩城市" : "出发地"}</small><strong>北京</strong></button>
            <span><TicketIcon size={22} /></span>
            <button type="button" onClick={() => notify(isAttractionTicket ? "已打开景区选择" : "已打开目的地选择")}><small>{isAttractionTicket ? "景区" : "目的地"}</small><strong>{isAttractionTicket ? "环球度假区" : "成都"}</strong></button>
            <button className="date-row" type="button" onClick={() => notify("已打开日期选择")}><CalendarDots size={18} /><span>{isAttractionTicket ? "选择入园日期" : "选择出发日期"}</span><CaretRight size={17} /></button>
            <label><span>更多条件</span><textarea placeholder={isAttractionTicket ? "例如：两大一小、优先早入园、可退改" : "例如：800元内、不要红眼、最好含行李"} /></label>
            <button className="primary-cta" type="button" onClick={() => { setTicketSearched(true); setTicketThinkingStep(0); }}><MagnifyingGlass size={18} />开始{isAttractionTicket ? "找门票" : "找票"}</button>
          </section>
          {ticketSearched && ticketThinkingStep >= 0 && <section className="guide-thinking-card compact-thinking-card" aria-live="polite">
            <div className="guide-thinking-title"><Sparkle size={17} weight="fill" /><span><strong>{showTicketResults ? "小驼已完成匹配" : "小驼正在思考"}</strong><small>正在核对条件、库存与可用规则</small></span></div>
            {finderThinkingStages.map((stage, index) => <div className={`guide-thinking-row ${ticketThinkingStep > index ? "done" : ticketThinkingStep === index ? "active" : "waiting"}`} key={stage.title}><i>{ticketThinkingStep > index ? <Check size={12} weight="bold" /> : index + 1}</i><span><strong>{stage.title}</strong><small>{stage.detail}</small></span></div>)}
          </section>}
          <section className={showTicketResults ? "ticket-result-list visible" : "ticket-result-list"}>
            {[1, 2, 3].map((item) => <button type="button" key={item} onClick={() => notify("已打开票务详情")}><span className="result-icon"><TicketIcon size={20} /></span><Skeleton rows={3} /><CaretRight size={18} /></button>)}
          </section>
        </div>
        <TaskDock active="tickets" onOpen={openView} />
      </div>
    );
  };

  const toggleHotel = (id: number) => {
    setSelectedHotels((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 5) {
        notify("最多选择5家酒店");
        return current;
      }
      return [...current, id];
    });
  };

  const submitStayFollowup = () => {
    const followup = stayFollowup.trim();
    if (!followup) return notify("请先输入想补充的条件");
    setAiQuery((current) => `${current || AI_QUERY_PRESET}；补充：${followup}`);
    setStayFollowup("");
    setStayThinkingStep(0);
  };

  const submitCompareFollowup = () => {
    const followup = compareFollowup.trim();
    if (!followup) return notify("请先输入想补充的对比条件");
    setCompareLastQuestion(followup);
    setCompareFollowup("");
    notify("已按补充条件更新酒店对比");
  };

  const renderStaySearch = () => {
    const effectiveThinkingStep = stayThinkingStep < 0 ? finderThinkingStages.length : stayThinkingStep;
    const showStayResults = effectiveThinkingStep >= finderThinkingStages.length;
    return (
      <div className="ai-screen stay-search-screen">
        <PhoneStatus />
        <ScreenHeader title="帮我找住宿" subtitle="非标准需求也能匹配" onBack={() => openView("xiaotuo")} />
        <div className="ai-scroll stay-search-page">
          <section className="stay-query-card">
            <div><Sparkle size={17} weight="fill" /><strong>小驼理解了你的需求</strong></div>
            <p>{aiQuery || AI_QUERY_PRESET}</p>
            <button type="button" onClick={() => notify("可以继续用自然语言补充或修改条件")}>继续补充条件</button>
          </section>
          <section className="guide-thinking-card compact-thinking-card stay-thinking-card" aria-live="polite">
            <div className="guide-thinking-title"><Sparkle size={17} weight="fill" /><span><strong>{showStayResults ? "小驼已完成匹配" : "小驼正在思考"}</strong><small>正在核对房源、设施、规则与可订状态</small></span></div>
            {finderThinkingStages.map((stage, index) => <div className={`guide-thinking-row ${effectiveThinkingStep > index ? "done" : effectiveThinkingStep === index ? "active" : "waiting"}`} key={stage.title}><i>{effectiveThinkingStep > index ? <Check size={12} weight="bold" /> : index + 1}</i><span><strong>{stage.title}</strong><small>{stage.detail}</small></span></div>)}
            <div className="thinking-recognized-conditions">
              <div className="stay-section-heading">
                <span><strong>已识别条件</strong><small>已纳入本轮匹配，可点击删除</small></span>
                <button type="button" onClick={() => setStayFilters(deriveStayFilters(aiQuery))}>恢复本轮条件</button>
              </div>
              <div className="stay-filter-tags">
                {stayFilters.map((filter) => (
                  <button type="button" key={filter} onClick={() => setStayFilters((current) => current.filter((item) => item !== filter))}>
                    {filter}<X size={12} weight="bold" />
                  </button>
                ))}
              </div>
            </div>
          </section>
          {showStayResults ? <>
            <div className="stay-result-heading">
              <span><strong>找到3个高匹配住宿</strong><small>按当前条件综合排序</small></span>
              <b>实时价格</b>
            </div>

            <section className="stay-result-list">
              {stayResults.map((stay) => (
                <article className="stay-result-card" key={stay.id}>
                  <div className="stay-card-main">
                    <div className={`stay-feature-chart ${stay.visualTone}`} aria-label={`${stay.name}民宿条件图表`}>
                      <div><House size={24} weight="fill" /><strong>{stay.visualTitle}</strong></div>
                      <span><i /><i /><i /></span>
                      <small>{stay.visualNote}</small>
                    </div>
                    <div className="stay-card-copy">
                      <div><strong>{stay.name}</strong><em>{stay.score}%匹配</em></div>
                      <small>{stay.area}</small>
                      <div className="stay-match-tags">{stay.matches.map((match) => <span key={match}>{match}</span>)}</div>
                      <p><b>¥{stay.price}</b> / 晚 · {stay.cancel}</p>
                    </div>
                  </div>
                  <div className="stay-source-list">
                    {stay.sources.map((source) => <span className={source.includes("需要确认") ? "pending" : ""} key={source}>{source}</span>)}
                  </div>
                  <div className="stay-card-actions">
                    <button type="button" onClick={() => {
                      setSelectedHotels((current) => current.includes(stay.id) ? current : [...current, stay.id].slice(0, 5));
                      setHotelContext("ai");
                      openView("hotels");
                    }}>加入比较</button>
                    <button type="button" onClick={() => notify(`已打开${stay.name}详情`)}>查看详情</button>
                    <button type="button" onClick={() => notify("已发起设施确认咨询")}>咨询确认</button>
                    <button className="book" type="button" onClick={() => notify("已进入预订确认页")}>预订</button>
                  </div>
                </article>
              ))}
            </section>
            <p className="stay-demo-note">以上名称、价格和匹配信息为原型演示数据，实际库存与设施需在预订前确认。</p>
          </> : <section className="stay-result-loading"><Skeleton rows={5} /></section>}
        </div>
        <div className="stay-followup-composer">
          <Sparkle size={16} weight="fill" />
          <input
            value={stayFollowup}
            onChange={(event) => setStayFollowup(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submitStayFollowup(); } }}
            placeholder="针对这次结果继续问或补充条件…"
            aria-label="针对本次住宿结果继续提问"
          />
          <button type="button" onClick={submitStayFollowup} aria-label="发送追问"><PaperPlaneTilt size={17} weight="fill" /></button>
        </div>
        <TaskDock active="stay" onOpen={openView} />
      </div>
    );
  };

  const renderHotels = () => (
    <div className="ai-screen">
      <PhoneStatus />
      <ScreenHeader title="酒店PK" subtitle="选择酒店，横向比较" onBack={() => openView("xiaotuo")} />
      <div className="ai-scroll task-page-scroll hotel-scroll">
        <button className="hotel-compare-entry" type="button" onClick={() => openView("hotel-select")}>
          <span className="hotel-compare-icons"><Buildings size={20} weight="fill" /><ArrowsLeftRight size={20} weight="bold" /><Buildings size={20} weight="fill" /></span>
          <span><strong>选择酒店开始PK</strong><small>从收藏、浏览记录或推荐中选2—5家</small></span>
          <CaretRight size={19} />
        </button>
        <section className="hotel-search-card">
          <label><span>目的地 / 位置</span><div><Buildings size={19} /><input placeholder="城市、商圈或景点" /></div></label>
          <button type="button" onClick={() => notify("已打开入住日期选择")}><CalendarDots size={18} /><span>入住日期 — 离店日期</span><CaretRight size={17} /></button>
          <label><span>酒店偏好</span><textarea placeholder="例如：亲子酒店、含早餐、1000元以内" /></label>
          <button className="primary-cta" type="button" onClick={() => setHotelSearched(true)}><MagnifyingGlass size={18} />搜索可PK酒店</button>
        </section>
        <section className={hotelSearched ? "hotel-result-list visible" : "hotel-result-list"}>
          <div className="list-caption"><strong>为你找到的酒店</strong><button type="button" onClick={() => openView("hotel-select")}>批量PK<CaretRight size={14} /></button></div>
          {hotelCatalog.slice(0, 3).map((hotel) => (
            <button type="button" key={hotel.id} className={selectedHotels.includes(hotel.id) ? "selected" : ""} onClick={() => toggleHotel(hotel.id)}>
              <HotelThumb hotel={hotel} />
              <span className="hotel-card-copy"><strong>{hotel.name}</strong><b>{hotel.rating}分 · {hotel.stars}</b><small>{hotel.area}</small><em>¥{hotel.price}起</em></span>
              <i>{selectedHotels.includes(hotel.id) && <Check size={14} weight="bold" />}</i>
            </button>
          ))}
        </section>
      </div>
      {hotelSearched && (
        <div className="compare-dock">
          <span>已选择 {selectedHotels.length} 家</span>
          <button type="button" className={selectedHotels.length >= 2 ? "ready" : ""} onClick={() => {
            if (selectedHotels.length < 2) return notify("请至少选择2家酒店");
            openView("hotel-compare");
          }}>去对比<CaretRight size={17} /></button>
        </div>
      )}
      <TaskDock active="hotels" onOpen={openView} />
    </div>
  );

  const renderHotelSelect = () => {
    const currentHotelCatalog = hotelContext === "haidian" ? haidianHotelCatalog : hotelCatalog;
    const sourceHotels = hotelSource === "favorite"
      ? currentHotelCatalog
      : hotelSource === "browsed"
        ? [currentHotelCatalog[1], currentHotelCatalog[3], currentHotelCatalog[0], currentHotelCatalog[4], currentHotelCatalog[2]]
        : [currentHotelCatalog[2], currentHotelCatalog[0], currentHotelCatalog[1], currentHotelCatalog[3], currentHotelCatalog[4]];
    return (
      <div className="ai-screen">
        <PhoneStatus />
        <ScreenHeader title="选择要PK的酒店" subtitle="最多可选择5家" onBack={() => openView(hotelContext === "haidian" ? "hotel-landing" : "hotels")} />
        <div className="hotel-source-tabs" role="tablist" aria-label="酒店来源">
          {([
            ["favorite", "收藏的酒店"],
            ["browsed", "浏览的酒店"],
            ["recommended", "小驼推荐"],
          ] as Array<[HotelSource, string]>).map(([key, label]) => (
            <button type="button" role="tab" aria-selected={hotelSource === key} className={hotelSource === key ? "active" : ""} key={key} onClick={() => setHotelSource(key)}>{label}</button>
          ))}
        </div>
        <div className="ai-scroll hotel-select-scroll">
          <div className="hotel-select-note">选择2—5家酒店，小驼将按同一条件对比价格、位置与规则</div>
          <section className="hotel-select-list">
            {sourceHotels.map((hotel) => (
              <button type="button" key={hotel.id} className={selectedHotels.includes(hotel.id) ? "selected" : ""} onClick={() => toggleHotel(hotel.id)}>
                <i>{selectedHotels.includes(hotel.id) && <Check size={15} weight="bold" />}</i>
                <HotelThumb hotel={hotel} />
                <span className="hotel-card-copy"><strong>{hotel.name}</strong><b>{hotel.rating}分 · {hotel.stars}</b><small>{hotel.area}</small><em>¥{hotel.price}起</em></span>
              </button>
            ))}
          </section>
        </div>
        <div className="hotel-select-dock">
          <span>已选 <b>{selectedHotels.length}</b>/5 家酒店</span>
          <button type="button" className={selectedHotels.length >= 2 ? "ready" : ""} onClick={() => {
            if (selectedHotels.length < 2) return notify("请至少选择2家酒店");
            openView("hotel-compare");
          }}>帮我对比</button>
        </div>
      </div>
    );
  };

  const renderHotelCompare = () => {
    const currentHotelCatalog = hotelContext === "haidian" ? haidianHotelCatalog : hotelCatalog;
    const comparedHotels = (selectedHotels.length >= 2 ? selectedHotels : [1, 2])
      .map((id) => currentHotelCatalog.find((hotel) => hotel.id === id))
      .filter((hotel): hotel is Hotel => Boolean(hotel));
    const recommended = comparedHotels.reduce((best, hotel) => Number(hotel.rating) > Number(best.rating) ? hotel : best, comparedHotels[0]);
    const compareRows: Array<{ label: string; value: (hotel: Hotel) => string }> = [
      { label: "酒店等级", value: (hotel) => hotel.stars },
      { label: "预算参考", value: (hotel) => `¥${hotel.price}起` },
      { label: "评分", value: (hotel) => `${hotel.rating}/5` },
      { label: "交通位置", value: (hotel) => hotel.distance },
      { label: "早餐", value: (hotel) => hotel.breakfast },
      { label: "取消规则", value: (hotel) => hotel.cancellation },
      { label: "对比房型", value: (hotel) => hotel.room },
      { label: "适合人群", value: (hotel) => hotel.highlight },
    ];
    const gridStyle = { gridTemplateColumns: `82px repeat(${comparedHotels.length}, 148px)` };
    return (
      <div className="ai-screen">
        <PhoneStatus />
        <ScreenHeader title="酒店对比" subtitle={`${comparedHotels.length}家酒店 · 条件已对齐`} onBack={() => openView("hotel-select")} />
        <div className="ai-scroll hotel-compare-page with-followup">
          <section className="compare-recommendation">
            <div className="compare-recommendation-icon"><QunarCamel compact solid /></div>
            <div className="compare-recommendation-copy">
              <div><b>综合首选</b></div>
              <strong>{recommended.name}</strong>
              <p>评分、交通与预算更均衡，适合作为本轮优先选择。</p>
              <div className="compare-recommendation-tags"><span>位置更方便</span><span>评分更稳</span><span>预算匹配</span></div>
              {compareLastQuestion && <div className="compare-updated-note"><Check size={12} weight="bold" />已根据“{compareLastQuestion}”重新核对</div>}
            </div>
          </section>
          <div className="compare-matrix-scroll" aria-label="酒店对比表">
            <section className="compare-matrix">
              <div className="compare-matrix-head" style={gridStyle}>
                <b>对比项</b>
                {comparedHotels.map((hotel) => (
                  <button type="button" key={hotel.id} onClick={() => notify(`已打开${hotel.name}`)}>
                    <HotelThumb hotel={hotel} compare />
                    <strong>{hotel.name}</strong>
                  </button>
                ))}
              </div>
              {compareRows.map((row) => (
                <div className="compare-matrix-row" style={gridStyle} key={row.label}>
                  <b>{row.label}</b>
                  {comparedHotels.map((hotel) => <span key={hotel.id}>{row.value(hotel)}</span>)}
                </div>
              ))}
            </section>
          </div>
          <p className="compare-disclaimer">以上为原型演示数据。实际价格、库存和取消规则需在预订时重新查询确认。</p>
          <button className="secondary-wide-button" type="button" onClick={() => openView("hotel-select")}>返回修改对比酒店</button>
        </div>
        <div className="guide-bottom-area hotel-compare-bottom">
          <div className="guide-skill-shortcuts" aria-label="切换小驼能力">
            <button type="button" onClick={() => openView("stay-search")}><Bed size={15} />帮我找</button>
            <button type="button" onClick={() => openPlanner()}><MapTrifold size={15} />帮我规划</button>
            <button type="button" className="active" onClick={() => openView("hotels")}><ArrowsLeftRight size={15} />帮我PK</button>
          </div>
          <div className="guide-followup-composer">
            <button type="button" onClick={() => notify("语音输入已开启")} aria-label="语音补充对比条件"><Microphone size={19} weight="bold" /></button>
            <input value={compareFollowup} onChange={(event) => setCompareFollowup(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submitCompareFollowup(); } }} placeholder="继续问，例如：哪家退改更灵活？" aria-label="继续调整酒店对比" />
            <button type="button" onClick={submitCompareFollowup} aria-label="发送追问"><PaperPlaneTilt size={18} weight="fill" /></button>
          </div>
        </div>
        <TaskDock active="hotels" onOpen={openView} />
      </div>
    );
  };

  const renderPhone = () => {
    if (view === "home") return renderOriginalHome();
    if (view === "search-middle") return renderSearchMiddle();
    if (view === "normal-search") return renderNormalSearch();
    if (view === "hotel-landing") return renderHotelLanding();
    if (view === "xiaotuo") return renderXiaotuoHub();
    if (view === "guide-create") return renderGuideCreate();
    if (view === "guide-copy") return renderGuideCopy();
    if (view === "tickets") return renderTickets();
    if (view === "stay-search") return renderStaySearch();
    if (view === "hotels") return renderHotels();
    if (view === "hotel-select") return renderHotelSelect();
    return renderHotelCompare();
  };

  return (
    <main className={reviewOpen ? "prototype-shell review-open" : "prototype-shell review-closed"}>
      <aside className="review-panel" aria-hidden={!reviewOpen}>
        <div className="review-heading"><p>QUNAR · 问小驼</p><h1>交互流程</h1><span>点击左侧步骤可直接跳转</span></div>
        <nav className="flow-list" aria-label="原型流程">
          {flowSteps.map((step, index) => (
            <button type="button" key={step.view} className={activeFlow === step.view ? "current" : ""} onClick={() => {
              if (step.view === "hotel-compare" && selectedHotels.length < 2) setSelectedHotels([1, 2]);
              openView(step.view);
            }}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span><strong>{step.title}</strong><small>{step.note}</small></span>
              <CaretRight size={17} />
            </button>
          ))}
        </nav>
        <a className="source-download" href={asset(`${import.meta.env.BASE_URL}qunar-wenxiaotuo-cursor.zip`)} download>
          <DownloadSimple size={18} weight="bold" />
          <span><strong>下载 Cursor 可编辑源码</strong><small>标准 React / TypeScript 项目</small></span>
        </a>
        <div className="review-note"><Sparkle size={18} weight="fill" /><p>手机内容固定为 iPhone 17 标准尺寸 393 × 852，不随左侧导航压缩。</p></div>
      </aside>
      <button className="review-toggle" type="button" onClick={() => setReviewOpen((current) => !current)} aria-label={reviewOpen ? "收起流程导航" : "展开流程导航"}>
        {reviewOpen ? <X size={19} weight="bold" /> : <SidebarSimple size={20} weight="bold" />}
        <span>{reviewOpen ? "收起" : "流程"}</span>
      </button>
      <section className="device-stage" aria-label="iPhone 17交互原型">
        <div className="device" data-testid="phone-frame">
          <div className="device-screen" data-testid="device-screen" data-phone-screen>
            <div className="screen-transition" key={`${view}-${appTab}`}>{renderPhone()}</div>
            {toast && <div className="toast" role="status">{toast}</div>}
          </div>
        </div>
        <div className="device-caption"><House size={14} />iPhone 17 · 393 × 852 · 1:1</div>
      </section>
    </main>
  );
}
