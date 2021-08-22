import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearActivated,
  filterOptions,
  FilterState,
  initOptions,
  Product,
  toggle,
} from "./filterSlice";
import "./filter.css";
import { Opt } from "./opt";
import { Activated } from "./activated";
import { Origin } from "./origin";
interface filterProps {}

export const Filter: React.FC<filterProps> = () => {
  const activatedTypesDict = useSelector<
    { filter: FilterState },
    Record<string, boolean>
  >(({ filter }) => filter.activatedTypesDict);

  const activatedBrandsDict = useSelector<
    { filter: FilterState },
    Record<string, boolean>
  >(({ filter }) => filter.activatedBrandsDict);

  const activatedColorsDict = useSelector<
    { filter: FilterState },
    Record<string, boolean>
  >(({ filter }) => filter.activatedColorsDict);

  const activatedSizesDict = useSelector<
    { filter: FilterState },
    Record<string, boolean>
  >(({ filter }) => filter.activatedSizesDict);

  const typeOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.typeOptions
  );
  const brandOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.brandOptions
  );
  const colorOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.colorOptions
  );
  const sizeOptions = useSelector<{ filter: FilterState }, Array<string>>(
    ({ filter }) => filter.sizeOptions
  );

  const displayTypeOptions = useSelector<
    { filter: FilterState },
    Array<string>
  >(({ filter }) => filter.disaplyTypeOptions);
  const displayBrandOptions = useSelector<
    { filter: FilterState },
    Array<string>
  >(({ filter }) => filter.disaplyBrandOptions);
  const displayColorOptions = useSelector<
    { filter: FilterState },
    Array<string>
  >(({ filter }) => filter.disaplyColorOptions);
  const displaySizeOptions = useSelector<
    { filter: FilterState },
    Array<string>
  >(({ filter }) => filter.disaplySizeOptions);

  const productList = useSelector<{ filter: FilterState }, Array<Product>>(
    ({ filter }) => filter.productList
  );

  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearActivated());
    dispatch(filterOptions());
  };

  useEffect(() => {
    dispatch(initOptions());
    dispatch(filterOptions());
  }, []);

  return (
    <div>
      <h1>原始選項</h1>
      <div className="filter-origin">
        <div className="tab">
          <Origin options={typeOptions}></Origin>
        </div>
        <div className="tab">
          <Origin options={brandOptions}></Origin>
        </div>
        <div className="tab">
          <Origin options={colorOptions}></Origin>
        </div>
        <div className="tab">
          <Origin options={sizeOptions}></Origin>
        </div>
      </div>
      <h1>實際顯示</h1>
      <div className="filter-opt">
        <div className="tab">
          <Opt
            options={displayTypeOptions}
            activatedDict={activatedTypesDict}
            toggle={(option) =>
              dispatch(toggle({ option, optionType: "type" }))
            }
          ></Opt>
        </div>
        <div className="tab">
          <Opt
            options={displayBrandOptions}
            activatedDict={activatedBrandsDict}
            toggle={(option) =>
              dispatch(toggle({ option, optionType: "brand" }))
            }
          ></Opt>
        </div>
        <div className="tab">
          <Opt
            options={displayColorOptions}
            activatedDict={activatedColorsDict}
            toggle={(option) =>
              dispatch(toggle({ option, optionType: "color" }))
            }
          ></Opt>
        </div>
        <div className="tab">
          <Opt
            options={displaySizeOptions}
            activatedDict={activatedSizesDict}
            toggle={(option) =>
              dispatch(toggle({ option, optionType: "size" }))
            }
          ></Opt>
        </div>
      </div>
      <div className="btns">
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => dispatch(filterOptions())}>Save</button>
      </div>
      <h1>選取中啟用</h1>
      <div className="filter-activated">
        <div className="tab">
          <Activated activatedDict={activatedTypesDict}></Activated>
        </div>
        <div className="tab">
          <Activated activatedDict={activatedBrandsDict}></Activated>
        </div>
        <div className="tab">
          <Activated activatedDict={activatedColorsDict}></Activated>
        </div>
        <div className="tab">
          <Activated activatedDict={activatedSizesDict}></Activated>
        </div>
      </div>
    </div>
  );
};
