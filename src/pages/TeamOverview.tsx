import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {TeamListItemI, UserDataI} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import List from '../components/List';
import Search from '../components/Search';

const TeamOverview = () => {
    const {teamId} = useParams();
    const [teamListMembers, setTeamListMembers] = React.useState<TeamListItemI[]>([]);
    const [filterTeamListMembers, setFilterTeamListMembers] = React.useState<TeamListItemI[]>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const memberItems = (users: UserDataI[]): TeamListItemI[] => {
        return users.map((user, i)=> {
            const columns = [
                {
                    key: 'Name',
                    value: `${user.firstName} ${user.lastName}`,
                },
                {
                    key: 'Display Name',
                    value: user.displayName,
                },
                {
                    key: 'Location',
                    value: user.location,
                },
            ];
            if (i === 0){
                columns.unshift(
                    {
                        key: 'Team Leader',
                        value: '',
                    }
                );
            }
            return {
                id: user.id,
                url: `/user/${user.id}`,
                columns,
                navigationProps: {
                    ...user, 
                    title: `${user.firstName} ${user.lastName}`,
                },           
            };
        });
    };

    const getTeamUsers = async () => {
        const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);    
        const members = await Promise.all([getUserData(teamLeadId), ...teamMemberIds.map(id => getUserData(id))]);
        setTeamListMembers(memberItems(members));
        setIsLoading(false);
    };

    React.useEffect(() => {
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Search 
                list={teamListMembers} 
                setFilterList={setFilterTeamListMembers} 
                placeholder='Search Users'
            />
            {!isLoading && !filterTeamListMembers && <Card {...teamListMembers[0]} />}
            <List items={filterTeamListMembers || teamListMembers.slice(1)} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
