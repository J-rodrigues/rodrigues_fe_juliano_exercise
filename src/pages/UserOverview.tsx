import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {UserDataI} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';

interface CardUserI {
    user: UserDataI;
}

const CardUser = ({user}: CardUserI) => {
    var columns = [
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
    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = () => {
    const location = useLocation();
    return (
        <Container>
            <CardUser user={location.state} />
        </Container>
    );
};

export default UserOverview;
