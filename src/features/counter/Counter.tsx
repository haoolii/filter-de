import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

interface counterProps {}

export const Counter: React.FC<counterProps> = () => {
  const count = useSelector<{ counter: { value: number } }, number>(
    (state) => state.counter.value
  );
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};
