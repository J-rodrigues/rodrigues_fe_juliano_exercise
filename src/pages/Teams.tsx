import * as React from 'react';
import {TeamListItemI, TeamsI} from 'types';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const [teams, setTeams] = React.useState<TeamListItemI[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        setTeams(convertTeamListItem(await fetchTeams()));
        setIsLoading(false);
    };

    const convertTeamListItem = (teams: TeamsI[]): TeamListItemI[] => {
        return teams.map(team => {
            return {
                id: team.id,
                url: `/team/${team.id}`,
                columns: [
                    {
                        key: 'Name',
                        value: team.name,
                    },
                ],
                navigationProps: team,
            };
        });
    };

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={teams} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
