import * as React from 'react';
import {TeamListItemI, TeamsI} from 'types';
import {getTeams as fetchTeams} from '../api';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import Search from '../components/Search';

const Teams = () => {
    const [teamsListItem, setTeamsListItem] = React.useState<TeamListItemI[]>([]);
    const [filterTeamsListItem, setFilterTeamsListItem] = React.useState<TeamListItemI[]>(null);
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
            <Search 
                list={teamsListItem} 
                setFilterList={setFilterTeamsListItem} 
                placeholder='Search Teams'
            />
            <List items={filterTeamsListItem || teamsListItem} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
