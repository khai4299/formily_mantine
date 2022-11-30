import React from 'react';

interface Props {
  message: string;
}

const ValidatorText = ({ message }: Props) => {
  return (
    <div className="block text-[12px] text-[#fa5252] leading-[1.2]">
      {message}
    </div>
  );
};

export default ValidatorText;
