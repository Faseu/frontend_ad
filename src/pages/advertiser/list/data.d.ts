export interface QueryParams {
  pageIndex: number;
  pageSize: number;
  searchField?: string;
}

export interface AdvertiserItem {
  id: number;
}

export interface TableListData {
  list: AdvertiserItem[];
  pagination: {
    total: number;
    current: number;
  };
}

export interface CreateParams {
  phone: string;
  contactName: string;
  remark: string;
  pics: number[];
  uscc: string;
  address: string;
  name: string;
  type: string;
}

export interface DetailParams {
  phone: string;
  contactName: string;
  remark: string;
  pics: number[];
  uscc: string;
  address: string;
  name: string;
  type: string;
}
