import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';

export default function TrainScreen() {
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
        Train
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Improve your abilities
      </OaaText>

      <OaaCard className="mt-7">
        <OaaText variant="section">
          Training
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Training modules will be available later.
        </OaaText>
      </OaaCard>
    </Screen>
  );
}