import styled from "@emotion/styled";

export interface CidrContainerProps { }

const CidrContainer = styled.div<CidrContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Philosopher';
  font-size: 1.5rem;
  font-weight: 700;
  width: fit-content;
  color: #008abc;

  & > h3 {
    margin-bottom: 0.5rem;
  }

  & > span {
      color: #454545;
  }

  & .block {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > input {
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      text-align: center;
      border: none;
      outline: none;
      width: 3rem;
      color: #454545;
    }
  }

`;

export default CidrContainer;
