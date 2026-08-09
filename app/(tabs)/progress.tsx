import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';

export default function ProgressScreen() {
  return (
    <Screen className="pt-6">
      <OaaText
        variant="caption"
        className="text-oaa-primary"
      >
        OAA SYSTEM
      </OaaText>

      <OaaText
        variant="title"
        className="mt-2"
      >
        Progress
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Ability history and statistics
      </OaaText>

      <OaaCard className="mt-7">
        <OaaText variant="section">
          History
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          No historical data available yet.
        </OaaText>
      </OaaCard>
    </Screen>
  );
}