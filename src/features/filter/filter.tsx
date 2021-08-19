import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterState, initOptions, Product, toggle } from "./filterSlice";
import "./filter.css";
import { Opt } from "./opt";
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
  const productList = useSelector<{ filter: FilterState }, Array<Product>>(
    ({ filter }) => filter.productList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initOptions());
  }, []);

  return (
    <div className="filter">
      <div className="tab">
        <Opt
          options={typeOptions}
          activatedDict={activatedTypesDict}
          toggle={(option) => dispatch(toggle({ option, optionType: "type" }))}
        ></Opt>
      </div>
      <div className="tab">
        <Opt
          options={brandOptions}
          activatedDict={activatedBrandsDict}
          toggle={(option) => dispatch(toggle({ option, optionType: "brand" }))}
        ></Opt>
      </div>
      <div className="tab">
        <Opt
          options={colorOptions}
          activatedDict={activatedColorsDict}
          toggle={(option) => dispatch(toggle({ option, optionType: "color" }))}
        ></Opt>
      </div>
      <div className="tab">
        <Opt
          options={sizeOptions}
          activatedDict={activatedSizesDict}
          toggle={(option) => dispatch(toggle({ option, optionType: "size" }))}
        ></Opt>
      </div>
    </div>
  );
};
