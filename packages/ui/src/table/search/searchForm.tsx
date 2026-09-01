import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';

interface SearchFormProps {
  data: any;
  setFilteredData: (data: any[]) => void;
  placeholder?: string;
  selectOptions?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ data, setFilteredData, placeholder, selectOptions }) => {
  const handleSearch = (value: string) => {

    if (value === '') {
      setFilteredData(data);
    } else {
      const filtered = data?.filter((item) => {
        const searchValue = value.toLowerCase();
        const title = item.title ? item.title.toLowerCase() : '';

        const id = item.ID ? item.ID.toLowerCase() : '';
        return selectOptions ? item[selectOptions].includes(searchValue) || id.includes(searchValue)
          :
          title.includes(searchValue) || id.includes(searchValue);
      });
      setFilteredData(filtered)
    }
  };

  const onSelect = (value: string) => {

    const selected = data.filter((item) =>
      (item.title?.toLowerCase() === value.toLowerCase()) ||
      (item.ID?.toLowerCase() === value.toLowerCase())
    );
    setFilteredData(selected);
  };

  const options = data?.map((item) => ({
    value: selectOptions ? item.selectOptions : item.title ? item.title : item.ID,
  }));

  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size="large"
    >
      <Input.Search size="large" placeholder={placeholder || 'Search...'} enterButton />
    </AutoComplete>
  );
};

export default SearchForm;
