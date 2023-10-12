import React from "react";
import { getUsersHighscore } from "../../api/api";
import { HighscoreTable, HighscoreWrapper, NameTitleRow, StyledColumn, StyledColumnScore, StyledRow } from "./Highscore.styles"

type ScoreRow = {
    place: number;
    name: string;
    score: number;
}

export const Highscore = () => {
    const [scoreTable, setScoreTable] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);

    const getUsersScores = async () => {
        setLoading(true);
        const response = await getUsersHighscore();
        setScoreTable(response);
        setLoading(false);
    }

    React.useEffect(() => {
        getUsersScores();
    }, []);

    return (
        <HighscoreWrapper>
            <h2>High Score</h2>
            {loading ? <h3>Loading</h3> : (
            <HighscoreTable>
                {scoreTable?.map((row: ScoreRow) =>
                    <StyledRow>
                        <StyledColumn><NameTitleRow><StyledColumn>{`#${row.place}`}</StyledColumn>
                            <StyledColumn>{row.name}</StyledColumn></NameTitleRow></StyledColumn>
                        <StyledColumnScore>{row.score}</StyledColumnScore>
                    </StyledRow>
                )}
            </HighscoreTable>)}
        </HighscoreWrapper>
    )
}