import {useState} from 'react';
import {View} from 'react-native';
import DirectionStep from '../direction-step/direction-step';

interface DirectionListProps {
  directions: {
    id: number;
    attributes: {
      title: string;
      directions: string;
    };
  }[];
}

const DirectionsList: React.FC<DirectionListProps> = ({directions}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onClickSetCurrentStep = (stepNumber: number) => {
    if (currentStep === stepNumber) {
      if (currentStep !== 0) {
        setCurrentStep(currentStep - 1);
      } else {
        setCurrentStep(0);
      }
    } else {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <View>
      {directions.map((direction, i) => (
        <DirectionStep
          key={direction.id}
          direction={direction}
          index={i}
          currentStep={currentStep}
          stepsLength={directions.length}
          onClickSetCurrentStep={onClickSetCurrentStep}
        />
      ))}
    </View>
  );
};

export default DirectionsList;
