import { tutorialData } from '../../../constants';
import TutorialStepper from '../TutorialStepper/TutorialStepper';

export const TutorialComponent = () => {
  return <TutorialStepper dataTutorial={tutorialData.dataTutorial} />;
};
