import {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from '../icon/icon';
import Text from '../text/text';

interface DirectionStepProps {
  direction: {
    id: number;
    attributes: {
      title: string;
      directions: string;
    };
  };
  index: number;
  currentStep: number;
  stepsLength: number;
  onClickSetCurrentStep: (stepNumber: number) => void;
}

const DirectionStep: React.FC<DirectionStepProps> = ({
  direction,
  index,
  stepsLength,
  currentStep,
  onClickSetCurrentStep,
}) => {
  const [activeStep, setActiveStep] = useState(false);

  const backgroundColor = activeStep ? '#fddd5c' : '#bec2c7';

  useEffect(() => {
    if (index === currentStep || index < currentStep) {
      setActiveStep(true);
    } else {
      setActiveStep(false);
    }
  }, [currentStep]);

  return (
    <TouchableOpacity onPress={() => onClickSetCurrentStep(index)}>
      <View style={styles.directionsRow} key={direction.id}>
        <View style={styles.tickWithLine}>
          <View
            style={[styles.tickContainer, {backgroundColor: backgroundColor}]}>
            {activeStep && <Icon variant="tick" size="small" color="black" />}
          </View>
          {index !== stepsLength - 1 && (
            <View style={[styles.line, {backgroundColor: backgroundColor}]} />
          )}
        </View>
        <View style={styles.directionsContent}>
          <Text size="large" fontWeight="semiBold" textStyle={styles.title}>
            {direction.attributes.title}
          </Text>
          <Text>{direction.attributes.directions}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DirectionStep;

const styles = StyleSheet.create({
  directionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tickWithLine: {
    alignItems: 'center',
  },
  tickContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    flexGrow: 1,
    backgroundColor: '#fddd5c',
  },
  directionsContent: {
    width: '85%',
    paddingBottom: 10,
  },
  title: {
    marginBottom: 6,
  },
});
