import SettingsModel from '../Classes/UserSettings';
import Statistics from '../Classes/Statistics';
import ProgressBarInstance from '../Classes/ProgressBar';

async function initProgressBar() {
  const statistics = new Statistics();
  const dayResults = await statistics.getLimits();
  const dayLimits = SettingsModel.wordLimitsPerDay;
  ProgressBarInstance.init(dayResults, dayLimits);
}

export default initProgressBar;
