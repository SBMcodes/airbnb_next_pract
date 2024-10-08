import countries from "world-countries";

const formattedCountries = countries.map((country) => {
  return {
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  };
});

const useCountries = () => {
  const getAll = () => {
    return formattedCountries;
  };

  const getByValue = (value: string) => {
    return formattedCountries.find((v) => v.value == value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
