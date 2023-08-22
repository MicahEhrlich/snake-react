import { HighscoreTable, HighscoreWrapper, NameTitleRow, StyledColumn, StyledColumnScore, StyledRow } from "./Highscore.styles"
import ScoreTable from './score.json';

type ScoreRow = {
    place: number;
    name: string;
    score: number;
}

export const Highscore = () => {
    return (
        <HighscoreWrapper>
            <h2>HighScore</h2>
            <HighscoreTable>
                {ScoreTable?.table?.map((row: ScoreRow) =>
                    <StyledRow>
                        <StyledColumn><NameTitleRow><StyledColumn>{`#${row.place}`}</StyledColumn>
                            <StyledColumn>{row.name}</StyledColumn></NameTitleRow></StyledColumn>
                        <StyledColumnScore>{row.score}</StyledColumnScore>
                    </StyledRow>
                )}
            </HighscoreTable>
        </HighscoreWrapper>
    )
}