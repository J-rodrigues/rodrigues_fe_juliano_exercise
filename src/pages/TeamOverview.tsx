import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {TeamListItemI, UserDataI} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

interface CardLeadI {
    teamLead: UserDataI;
}

interface PageState {
    teamLead?: UserDataI;
    teamListMembers?: TeamListItemI[];
}

const CardLead = ({teamLead}: CardLeadI) => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} />;
};

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const memberItems = (users: UserDataI[]): TeamListItemI[] => {
        return users.map(user=> ({
            id: user.id,
            url: `/user/${user.id}`,
            columns: [
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
            ],
            navigationProps: user,            
        }));
    };

    const getTeamUsers = async () => {
        const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);    
        const members = await Promise.all([getUserData(teamLeadId), ...teamMemberIds.map(id => getUserData(id))]);
        setPageData({teamLead: members.shift(), teamListMembers: memberItems(members)});
        setIsLoading(false);
    };

    React.useEffect(() => {
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && <CardLead teamLead={pageData.teamLead} />}
            <List items={pageData?.teamListMembers} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
