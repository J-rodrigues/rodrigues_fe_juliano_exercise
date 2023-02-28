import * as React from 'react';
import {TeamListItemI, TeamsI} from 'types';
import {getTeams as fetchTeams} from '../api';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const [teamsListItem, setTeamsListItem] = React.useState<TeamListItemI[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
                navigationProps: {
                    ...team, 
                    title: `Team ${team.name}`,
                },
            };
        });
    };

    const getTeams = async () => {
        setTeamsListItem(convertTeamListItem(await fetchTeams()));
        setIsLoading(false);
    };

    React.useEffect(() => {
        getTeams();
    }, []);

    return (
        <Container>
            <List items={teamsListItem} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
