import SearchForm from "./searchForm";

export const Search: React.FC<{
  data: any[],
  setFilteredData: (data: any[]) => void,
  placeholder:string
  selectOptions?:string
}> = ({ data, setFilteredData, placeholder, selectOptions }) => (
  <SearchForm
    data={data}
    setFilteredData={setFilteredData}
    placeholder={placeholder}
    selectOptions={selectOptions}
  />
);
