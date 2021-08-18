import { createSlice, current } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  type: string;
  brand: string;
  size: string;
  color: string;
}

function genDictWithKey<T>(list: Array<T>, key: keyof T) {
  const dict: Record<any, Array<T>> = {};
  for (let item of list) {
    const v = item[key] as any;
    if (!dict[v]) {
      dict[v] = [];
    }
    dict[v].push({ ...item });
  }
  return dict;
}

export interface FilterState {
  productList: Array<Product>;
  typeOptions: Array<string>;
  brandOptions: Array<string>;
  colorOptions: Array<string>;
  sizeOptions: Array<string>;
}

const initialState: FilterState = {
  productList: [
    {
      id: 1,
      name: "Macbook-Air",
      type: "NoteBook",
      brand: "Apple",
      size: "13.3",
      color: "銀",
    },
    {
      id: 2,
      name: "Macbook-Pro",
      type: "NoteBook",
      brand: "Apple",
      size: "13.3",
      color: "銀",
    },
    {
      id: 3,
      name: "Macbook-Pro",
      type: "NoteBook",
      brand: "Apple",
      size: "15",
      color: "銀",
    },
    {
      id: 4,
      name: "ASUS X515MA",
      type: "NoteBook",
      brand: "ASUS",
      size: "15.6",
      color: "黑",
    },
    {
      id: 5,
      name: "ASUS ZenBook 14",
      type: "NoteBook",
      brand: "ASUS",
      size: "14",
      color: "白",
    },
    {
      id: 6,
      name: "ACER Nitro5",
      type: "NoteBook",
      brand: "ACER",
      size: "17.3",
      color: "黑",
    },
    {
      id: 7,
      name: "ACER Predator",
      type: "NoteBook",
      brand: "ACER",
      size: "15.6",
      color: "黑",
    },
    {
      id: 8,
      name: "iMac",
      type: "Desktop",
      brand: "Apple",
      size: "24",
      color: "紅",
    },
    {
      id: 9,
      name: "iMac",
      type: "Desktop",
      brand: "Apple",
      size: "24",
      color: "藍",
    },
    {
      id: 10,
      name: "ASUS-S340MF",
      type: "Desktop",
      brand: "ASUS",
      size: "30",
      color: "黑",
    },
    {
      id: 11,
      name: "ASUS-S340MF",
      type: "Desktop",
      brand: "ASUS",
      size: "28",
      color: "白",
    },
    {
      id: 12,
      name: "ACER-Aspires24",
      type: "Desktop",
      brand: "ACER",
      size: "27",
      color: "金",
    },
    {
      id: 13,
      name: "ACER-Aspires24",
      type: "Desktop",
      brand: "ACER",
      size: "27",
      color: "灰",
    },
  ],
  typeOptions: [],
  brandOptions: [],
  colorOptions: [],
  sizeOptions: []
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    initOptions: (state) => {
      state.typeOptions = Object.keys(
        genDictWithKey(current(state.productList), "type")
      ).slice(0);
      state.brandOptions = Object.keys(
        genDictWithKey(current(state.productList), "brand")
      ).slice(0);
      state.colorOptions = Object.keys(
        genDictWithKey(current(state.productList), "color")
      ).slice(0);
      state.sizeOptions = Object.keys(
        genDictWithKey(current(state.productList), "size")
      ).slice(0);
    },
  },
});

export const { initOptions } = filterSlice.actions;
export default filterSlice.reducer;
