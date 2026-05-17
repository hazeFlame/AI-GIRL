const CHARACTER_IMAGE_BASE_URL =
	"https://vlrmlshxllbmsiofxftf.supabase.co/storage/v1/object/public/character/images";

function characterImage(fileName: string) {
	return `${CHARACTER_IMAGE_BASE_URL}/${fileName}`;
}

export type Companion = {
	id: string;
	name: string;
	role: string;
	tone: string;
	image: string;
	status: "在线" | "离线";
	landingAccent: string;
	badgeColor: string;
};

export const companions: Companion[] = [
	{
		id: "mika",
		name: "Mika",
		role: "暧昧系前辈",
		tone: "轻声调侃，偶尔靠近，知道什么时候停下。",
		image: characterImage("1.png"),
		status: "在线",
		landingAccent:
			"border-[#ff6f91]/30 text-[#ff6f91] hover:shadow-[0_0_30px_rgba(255,111,145,0.2)]",
		badgeColor: "bg-[#ff6f91]/10 text-[#ff6f91]",
	},
	{
		id: "yuna",
		name: "Yuna",
		role: "日系陪伴感",
		tone: "像深夜便利店的热饮，慢慢把一天接住。",
		image: characterImage("2.png"),
		status: "在线",
		landingAccent:
			"border-[#f7c76f]/30 text-[#f7c76f] hover:shadow-[0_0_30px_rgba(247,199,111,0.2)]",
		badgeColor: "bg-[#f7c76f]/10 text-[#f7c76f]",
	},
	{
		id: "rin",
		name: "Rin",
		role: "恋爱游戏女主",
		tone: "好感度、回忆片段、只属于你的剧情分支。",
		image: characterImage("3.png"),
		status: "离线",
		landingAccent:
			"border-[#74d3c2]/30 text-[#74d3c2] hover:shadow-[0_0_30px_rgba(116,211,194,0.2)]",
		badgeColor: "bg-[#74d3c2]/10 text-[#74d3c2]",
	},
	{
		id: "aoi",
		name: "Aoi",
		role: "元气青梅竹马",
		tone: "永远充满活力，总是抢走你的便当，但其实一直在偷偷关注你。",
		image: characterImage("4.png"),
		status: "在线",
		landingAccent:
			"border-[#4facfe]/30 text-[#4facfe] hover:shadow-[0_0_30px_rgba(79,172,254,0.2)]",
		badgeColor: "bg-[#4facfe]/10 text-[#4facfe]",
	},
	{
		id: "shiori",
		name: "Shiori",
		role: "高冷冰山会长",
		tone: "表面严厉古板，只有在你面前才会卸下防备，露出慌乱软萌的一面。",
		image: characterImage("5.png"),
		status: "离线",
		landingAccent:
			"border-[#b180fc]/30 text-[#b180fc] hover:shadow-[0_0_30px_rgba(177,128,252,0.2)]",
		badgeColor: "bg-[#b180fc]/10 text-[#b180fc]",
	},
	{
		id: "hina",
		name: "Hina",
		role: "温柔治愈猫娘",
		tone: "会在你疲惫回家时送上拥抱，尾巴尖不自觉地勾住你的手腕。",
		image: characterImage("6.png"),
		status: "在线",
		landingAccent:
			"border-[#f857a6]/30 text-[#f857a6] hover:shadow-[0_0_30px_rgba(248,87,166,0.2)]",
		badgeColor: "bg-[#f857a6]/10 text-[#f857a6]",
	},
	{
		id: "tsukasa",
		name: "Tsukasa",
		role: "傲娇大小姐",
		tone: "哼，本小姐才不是特意来找你的！只是...顺路路过而已！",
		image: characterImage("7.png"),
		status: "离线",
		landingAccent:
			"border-[#fbc2eb]/30 text-[#fbc2eb] hover:shadow-[0_0_30px_rgba(251,194,235,0.2)]",
		badgeColor: "bg-[#fbc2eb]/10 text-[#fbc2eb]",
	},
	{
		id: "mei",
		name: "Mei",
		role: "知性电波画师",
		tone: "用画笔记录你的每一个侧脸。嗯？你说这幅画里的手牵在一起了？那是艺术虚构啦...",
		image: characterImage("8.png"),
		status: "在线",
		landingAccent:
			"border-[#84fab0]/30 text-[#84fab0] hover:shadow-[0_0_30px_rgba(132,250,176,0.2)]",
		badgeColor: "bg-[#84fab0]/10 text-[#84fab0]",
	},
];
