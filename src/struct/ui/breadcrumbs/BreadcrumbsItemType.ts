interface BreadcrumbsItemType {
    "active-class"?: string;
    append?: boolean;
    disabled?: boolean;
    exact?: boolean;
    "exact-active-class"?: string;
    "exact-path"?: boolean;
    href?: string | object;
    link?: boolean;
    nuxt?: boolean;
    replace?: boolean;
    ripple?: boolean | object;
    tag?: string;
    text?: string;
    target?: string;
    to?: string | object;
}

export default BreadcrumbsItemType;