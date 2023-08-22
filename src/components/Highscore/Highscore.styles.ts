import styled from "styled-components";

export const HighscoreWrapper = styled.div`
    color: white;
    backdrop-filter: blur(10px);
`;

export const HighscoreTable = styled.table`
    width: 30rem;
    margin-bottom: 2rem;
`;

export const StyledRow = styled.tr`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const NameTitleRow = styled(StyledRow)`
    width: 10rem;
`;

export const StyledColumn = styled.td`

`;

export const StyledColumnScore = styled(StyledColumn)`
    text-align: right;
`;