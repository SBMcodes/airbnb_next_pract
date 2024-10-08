import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  // const allLocations = useMemo(() => {
  //   return getAll();
  // }, [getAll]);

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="ml-1 text-neutral-400/80">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "px-3 py-1 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => {
          return {
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6",
            },
          };
        }}
      />
    </div>
  );
};

export default CountrySelect;
