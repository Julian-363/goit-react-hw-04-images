import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Input } from '../styles/Searchbar';
import { LoaderContainer, Spinner } from '../styles/Loader';

const Searchbar = ({ onSubmit, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        {isLoading ? (
          <LoaderContainer>
            <Spinner />
          </LoaderContainer>
        ) : null}
        <Button type="submit">
          <span>Search</span>
        </Button>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Searchbar;
