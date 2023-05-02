function useFilter(array, operation, value) {
  switch (operation) {
  case 1:
    return array.filter((item) => item > value);
  case 2:
    return array.filter((item) => item < value);
  case 3:
    return array.filter((item) => item === value);
  default:
    return array;
  }
}

export default useFilter;
