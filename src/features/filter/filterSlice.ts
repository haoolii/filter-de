import { createSlice, current } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  type: string;
  brand: string;
  size: string;
  color: string;
}

function isInclude(arr: Array<string>, target: string) {
  return arr.length ? arr.includes(target) : true;
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

interface OptionObj {
  types: Array<string>;
  brands: Array<string>;
  colors: Array<string>;
  sizes: Array<string>;
}

function getOptions(list: Array<Product>, key: keyof Product) {
  const dict: Record<string, boolean> = {};
  list.forEach((product) => (dict[product[key]] = true));
  return Object.keys(dict);
}

function query(
  list: Array<Product>,
  targetKey: keyof Product,
  queryParam: OptionObj
) {
  const { types, brands, colors, sizes } = queryParam;
  const afterFilter: any = list.filter((item) => {
    if (targetKey === "type") {
      return isInclude(brands, item.brand) && isInclude(colors, item.color) && isInclude(sizes, item.size);
    }
    if (targetKey === "brand") {
      return isInclude(types, item.type) && isInclude(colors, item.color) && isInclude(sizes, item.size);
    }
    if (targetKey === "color") {
      return isInclude(types, item.type) && isInclude(brands, item.brand) && isInclude(sizes, item.size);
    }
    if (targetKey === "size") {
      return isInclude(types, item.type) && isInclude(brands, item.brand) && isInclude(colors, item.color);
    }
  })
    return getOptions(afterFilter, targetKey);
}

function getAllOption(list: Array<Product>, optionObj: OptionObj) {
  const afterType = query(list, "type", optionObj);
  const afterBrand = query(list, "brand", optionObj);
  const afterColor = query(list, "color", optionObj);
  const afterSize = query(list, "size", optionObj);
  return {
    typeOptions: afterType,
    brandOptions: afterBrand,
    colorOptions: afterColor,
    sizeOptions: afterSize,
  };
}

export interface FilterState {
  productList: Array<Product>;
  typeOptions: Array<string>;
  brandOptions: Array<string>;
  colorOptions: Array<string>;
  sizeOptions: Array<string>;
  disaplyTypeOptions: Array<string>;
  disaplyBrandOptions: Array<string>;
  disaplyColorOptions: Array<string>;
  disaplySizeOptions: Array<string>;
  activatedTypesDict: Record<string, boolean>;
  activatedBrandsDict: Record<string, boolean>;
  activatedColorsDict: Record<string, boolean>;
  activatedSizesDict: Record<string, boolean>;
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
    {
      id: 14,
      name: "ACER-Aspires24",
      type: "Desktop",
      brand: "ACER",
      size: "27",
      color: "咖啡色",
    },
  ],
  typeOptions: [],
  brandOptions: [],
  colorOptions: [],
  sizeOptions: [],
  disaplyTypeOptions: [],
  disaplyBrandOptions: [],
  disaplyColorOptions: [],
  disaplySizeOptions: [],
  activatedTypesDict: {},
  activatedBrandsDict: {},
  activatedColorsDict: {},
  activatedSizesDict: {},
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
    toggle: (state, action) => {
      let dict: Record<string, boolean> = {};

      if (action.payload.optionType === "type") {
        dict = { ...state.activatedTypesDict };
      }
      if (action.payload.optionType === "brand") {
        dict = { ...state.activatedBrandsDict };
      }
      if (action.payload.optionType === "color") {
        dict = { ...state.activatedColorsDict };
      }
      if (action.payload.optionType === "size") {
        dict = { ...state.activatedSizesDict };
      }

      if (dict[action.payload.option]) {
        delete dict[action.payload.option];
      } else {
        dict[action.payload.option] = true;
      }

      if (action.payload.optionType === "type") {
        state.activatedTypesDict = dict;
      }
      if (action.payload.optionType === "brand") {
        state.activatedBrandsDict = dict;
      }
      if (action.payload.optionType === "color") {
        state.activatedColorsDict = dict;
      }
      if (action.payload.optionType === "size") {
        state.activatedSizesDict = dict;
      }
    },
    filterOptions: (state) => {
      const { typeOptions, brandOptions, colorOptions, sizeOptions } = getAllOption(current(state.productList), {
        types: Object.keys(state.activatedTypesDict),
        brands: Object.keys(state.activatedBrandsDict),
        colors: Object.keys(state.activatedColorsDict),
        sizes: Object.keys(state.activatedSizesDict),
      });

      state.disaplyTypeOptions = typeOptions;
      state.disaplyBrandOptions = brandOptions;
      state.disaplyColorOptions = colorOptions;
      state.disaplySizeOptions = sizeOptions;
    },
    clearActivated: (state) => {
      state.activatedTypesDict = {};
      state.activatedBrandsDict = {};
      state.activatedColorsDict = {};
      state.activatedSizesDict = {};
    }
  },
});

export const { initOptions, toggle, filterOptions, clearActivated } = filterSlice.actions;
export default filterSlice.reducer;
