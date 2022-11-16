import { RecordScope } from '@formily/react';
import React, { createContext } from 'react';

export interface IArrayBaseItemProps {
  index: number;
  record: ((index: number) => Record<string, any>) | Record<string, any>;
}

const ItemContext = createContext<IArrayBaseItemProps | null>(null);
const takeRecord = (val: any, index?: number) =>
  typeof val === 'function' ? val(index) : val;

const MyComponent = ({ children, ...props }: any) => {
  const index = props.index;
  const record = takeRecord(props.record, props.index);
  return (
    <ItemContext.Provider value={props}>
      <RecordScope getIndex={() => index} getRecord={() => record}>
        {children}
      </RecordScope>
    </ItemContext.Provider>
  );
};

export default MyComponent;
