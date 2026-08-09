import { View } from 'react-native';

import { OaaText } from './OaaText';

interface RankDisplayProps {
  label?: string;
  rank?: string;
  score?: number;
  status?: string;
}

export function RankDisplay({
  label = 'Overall Ability',
  rank,
  score,
  status = 'NOT EVALUATED',
}: RankDisplayProps) {
  return (
    <View>
      <OaaText variant="section">
        {label}
      </OaaText>

      <View className="mt-4 flex-row items-end justify-between">
        <View>
          <OaaText
            variant="display"
            className="text-6xl"
          >
            {rank ?? '--'}
          </OaaText>

          {score !== undefined && (
            <OaaText
              variant="caption"
              className="mt-1 text-oaa-primary"
            >
              {score.toFixed(2)}
            </OaaText>
          )}
        </View>

        {!rank && (
          <OaaText
            variant="caption"
            className="pb-2 text-oaa-muted"
          >
            {status}
          </OaaText>
        )}
      </View>
    </View>
  );
}