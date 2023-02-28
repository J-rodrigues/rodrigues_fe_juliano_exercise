import * as React from 'react';
import {TeamListItemI} from 'types';
import {Container} from '../GlobalComponents';
import {Input} from './styles';

interface Props{    
    list: TeamListItemI[];
    placeholder: string;
    setFilterList: (t: TeamListItemI[] | null) => void;
}

const Search = ({list, placeholder, setFilterList}: Props) => {
    const filters = (searchField: string) => {
        setFilterList( searchField ? list.filter(
            items => {
              return (
                items.navigationProps.title
                .toLowerCase()
                .includes(searchField.toLowerCase())
              );
            }
        ) : null);        
    };

    const handleChange = (e: {target: HTMLInputElement}) => {
        filters(e.target.value);
    };

    return (
        <Container>
            <Input 
                data-testid="search"
                type= "search" 
                placeholder={placeholder}
                onChange= {handleChange}
            />
        </Container>
    );
};

export default Search;
