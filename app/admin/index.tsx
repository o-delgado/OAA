import { OaaCard } from '@/components/OaaCard';
import { OaaText } from '@/components/OaaText';
import { Screen } from '@/components/Screen';

export default function AdminScreen() {
  return (
    <Screen className="pt-6">
      <OaaText
        variant="caption"
        className="text-oaa-primary"
      >
        OAA ADMINISTRATION
      </OaaText>

      <OaaText
        variant="title"
        className="mt-2"
      >
        Admin
      </OaaText>

      <OaaText
        variant="muted"
        className="mt-1"
      >
        Restricted system access
      </OaaText>

      <OaaCard className="mt-7">
        <OaaText variant="section">
          ADMIN PANEL
        </OaaText>

        <OaaText
          variant="muted"
          className="mt-3"
        >
          Administrative tools will be implemented later.
        </OaaText>
      </OaaCard>
    </Screen>
  );
}