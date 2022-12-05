import React from 'react';

interface Props {
  children: React.ReactNode;
  className: string;
}

const FormGrid = (props: Props) => {
  console.log(props);
  return <div className={props.className}>{props.children}</div>;
};

export default FormGrid;
