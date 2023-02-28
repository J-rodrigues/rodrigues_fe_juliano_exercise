export interface TeamsI {
    id: string;
    name: string;
}

export interface TeamOverviewI {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface UserDataI {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface TeamListItemColumnI {
    key: string;
    value: string;
}

export interface NavPropsI {
    title?: string;
}

export interface TeamListItemI {
    id: string;
    url?: string;
    columns: Array<TeamListItemColumnI>;
    navigationProps?: UserDataI & NavPropsI | TeamsI & NavPropsI;
}
