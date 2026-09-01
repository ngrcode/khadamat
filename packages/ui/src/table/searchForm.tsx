import { Form, Input } from 'antd';
import { FC } from 'react';

interface SearchFormProps {
  onSearch?: (search: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const handleFormSubmit = (values: { search?: string }) => {
    if (onSearch) {
      onSearch(values.search || '');
    }
  };

  return (
    <Form layout="inline" onFinish={handleFormSubmit}>
      <Form.Item name="search">
        <Input.Search
          placeholder="Search..."
          onSearch={(value) => handleFormSubmit({ search: value })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
