import React from 'react';

const Item = (props: any) => {
  console.log(props);
  return <div {...props}>{props.children}</div>;
};

export default Item;
