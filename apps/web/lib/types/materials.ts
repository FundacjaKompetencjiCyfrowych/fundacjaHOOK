export type MaterialResource = {
  title: string;
  date: string;
  description: string;
  fileUrl?: string | null;
  linkUrl?: string | null;
  format: string;
  size: string;
  event?: string;
  type?: string;
  area?: string;
};

export type MaterialFilterItem = MaterialResource & {
  event: string;
  type: string;
  area: string;
};
