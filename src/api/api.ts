import axios from "axios";
import ScoreTable from '../json/score.json';

export async function getUsersHighscore() {
    try {
        return new Promise((resolve) => {

            let response;
            setTimeout(() => {
                const scores = ScoreTable.table;
                response = scores;
                resolve(response);
            }, 2000)
        });
        // const response = await axios.get('/api/users');
        // console.log('response  ', response)
        // return response.data;
    } catch (error) {
        return [];
    }

}