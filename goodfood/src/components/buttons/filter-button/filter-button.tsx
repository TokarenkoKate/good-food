import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FilterValuesProps} from '../../../types/filter-values';
import {capitalize} from '../../../utils/utils';
import Text from '../../text/text';

interface FilterButtonProps {
  filterKey: keyof FilterValuesProps;
  value: any;
  bottomNumberValue?: number | undefined;
  topNumberValue?: number | undefined;
  filterValues: FilterValuesProps;
  onPressSetFilter: (key: keyof FilterValuesProps, value: any) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  filterKey,
  value,
  bottomNumberValue,
  topNumberValue,
  filterValues,
  onPressSetFilter,
}) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const currentBackgroundColor = isButtonActive ? '#fddd5c' : '#969eac';

  const setCurrentFilter = () => {
    if (bottomNumberValue !== undefined && topNumberValue !== undefined) {
      onPressSetFilter(filterKey, {bottomNumberValue, topNumberValue});
    } else {
      onPressSetFilter(filterKey, value);
    }
  };

  const checkCurrentActiveButton = () => {
    if (
      filterKey === 'ingredients' &&
      filterValues[filterKey].includes(value)
    ) {
      setIsButtonActive(true);
    } else if (
      (filterKey === 'duration' || filterKey === 'callories') &&
      filterValues[filterKey].bottomNumberValue === bottomNumberValue &&
      filterValues[filterKey].topNumberValue === topNumberValue
    ) {
      setIsButtonActive(true);
    } else if (filterValues[filterKey] === value) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  useEffect(() => {
    checkCurrentActiveButton();
  }, [filterValues]);

  return (
    <TouchableOpacity onPress={setCurrentFilter}>
      <View
        style={[styles.container, {backgroundColor: currentBackgroundColor}]}>
        <Text color={isButtonActive ? 'black' : 'white'} fontWeight="semiBold">
          {capitalize(value)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});
