import styled from 'styled-components';

export const StyledUpload = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1 1 0%;
  justify-content: center;

  .mantine-FileInput-input {
    display: flex;

    align-items: center;

    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
    }
  }
`;
