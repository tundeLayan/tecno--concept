export type AppRoute = {
  path: string;
  element: React.ReactNode;
};

export type IDropdownProps = {
  text: string;
  items: { text: string; action?: () => void; isLoading?: boolean }[];
};
