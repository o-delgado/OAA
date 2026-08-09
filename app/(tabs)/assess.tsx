import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';

export default function AssessScreen() {
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
        Assess
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Official ability assessments
      </OaaText>

      <OaaCard className="mt-7">
        <OaaText variant="section">
          Assessment Status
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          No assessments available yet.
        </OaaText>
      </OaaCard>
    </Screen>
  );
}