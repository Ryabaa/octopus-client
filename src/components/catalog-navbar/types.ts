export type MenuItem = {
    id: number;
    icon: React.ReactNode;
    label: string;
    category: string;
};

export type CatalogNavbarState = {
    isExpanded: boolean;
};
