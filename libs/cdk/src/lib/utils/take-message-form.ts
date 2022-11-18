import { ArrayField, Field } from '@formily/core';

export const takeMessageForm = (
  field: Field | ArrayField,
  feedbackText?: string
) => {
  const split = (messages: any[]) => {
    return messages.reduce((buf, text, index) => {
      if (!text) return buf;
      return index < messages.length - 1
        ? buf.concat([text, ', '])
        : buf.concat([text]);
    }, []);
  };
  if (field.validating) return;
  if (feedbackText) return feedbackText;
  if (field.selfErrors.length) return split(field.selfErrors);
  if (field.selfWarnings.length) return split(field.selfWarnings);
  if (field.selfSuccesses.length) return split(field.selfSuccesses);
};
