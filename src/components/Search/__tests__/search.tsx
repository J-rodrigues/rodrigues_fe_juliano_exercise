import React from 'react';
import {render, screen} from '@testing-library/react';
import Search from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

describe('Search', () => {
    it('should render search', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],               
            },
        ];
        render(<Search list={items} placeholder='search' setFilterList={() => {}} />);

        expect(screen.getByTestId('search')).toBeInTheDocument();
    });
});