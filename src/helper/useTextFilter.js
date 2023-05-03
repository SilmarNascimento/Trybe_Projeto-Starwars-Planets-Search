function useTextFilter(value) {
  const { planetdata, setPlanetData } = useContext(PlanetContext);
  setPlanetData(planetdata.filter((item) => item.includes(value)));
}

export default useTextFilter;