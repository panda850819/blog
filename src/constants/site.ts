export type NavigationItem = {
    name: string;
    path: string;
};

export const SITE = {
    name: "熊貓隨口說",
    title: "區塊鏈 × 行銷 × 程式",
    description: "2018 接觸區塊鏈，過程中點各式各樣的技能點做過 Marketing/Operations 的一個會寫點程式的資管生",
    url: "https://pdzeng.dev",
    defaultImage: "/default-og-image.png",
} as const;

export const NAVIGATION: {
    main: NavigationItem[];
} = {
    main: [
        { name: "首頁", path: "/" },
        { name: "部落格", path: "/blog" },
        { name: "筆記", path: "/notes" },
        { name: "書籤", path: "/bookmarks" }
    ],
} as const;

export const CONTENT = {
    postsPerPage: 10,
    recentPostsLimit: 3,
    featuredProjectsLimit: 3,
} as const;

export const META = {
    openGraph: {
        type: "website",
        locale: "zh_TW",
    },
    twitter: {
        cardType: "summary_large_image",
    }
} as const; 