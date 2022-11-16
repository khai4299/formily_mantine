import React from 'react';

const Item = (props: any) => {
  return (
    <div {...props} onChange={() => {}}>
      {props.children}
    </div>
  );
};

export default Item;
