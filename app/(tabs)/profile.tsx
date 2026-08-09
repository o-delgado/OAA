import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';

export default function ProfileScreen() {
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
        Profile
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Account and personal information
      </OaaText>

      <OaaCard className="mt-7">
        <OaaText variant="section">
          User
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          No user authenticated.
        </OaaText>
      </OaaCard>
    </Screen>
  );
}