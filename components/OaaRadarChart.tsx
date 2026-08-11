import { View } from 'react-native';
import Svg, {
    Circle,
    Line,
    Polygon,
    Text as SvgText,
} from 'react-native-svg';

interface OaaRadarChartProps {
  academic: number | null;
  physical: number | null;
  adaptability: number | null;
  socialContribution: number | null;
}

const SIZE = 300;
const CENTER = SIZE / 2;
const MAX_RADIUS = 92;

function clampScore(score: number | null) {
  if (score === null) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, score),
  );
}

function point(
  angle: number,
  radius: number,
) {
  return {
    x:
      CENTER +
      Math.cos(angle) * radius,
    y:
      CENTER +
      Math.sin(angle) * radius,
  };
}

function pointsToString(
  points: {
    x: number;
    y: number;
  }[],
) {
  return points
    .map(({ x, y }) => `${x},${y}`)
    .join(' ');
}

export function OaaRadarChart({
  academic,
  physical,
  adaptability,
  socialContribution,
}: OaaRadarChartProps) {
  const scores = [
    clampScore(academic),
    clampScore(physical),
    clampScore(adaptability),
    clampScore(socialContribution),
  ];

  const angles = [
    -Math.PI / 2,
    0,
    Math.PI / 2,
    Math.PI,
  ];

  const outerPoints = angles.map(
    (angle) =>
      point(angle, MAX_RADIUS),
  );

  const middlePoints = angles.map(
    (angle) =>
      point(angle, MAX_RADIUS * 0.66),
  );

  const innerPoints = angles.map(
    (angle) =>
      point(angle, MAX_RADIUS * 0.33),
  );

  const scorePoints = angles.map(
    (angle, index) =>
      point(
        angle,
        MAX_RADIUS *
          (scores[index] / 100),
      ),
  );

  return (
    <View className="items-center">
      <Svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Radar grid */}

        <Polygon
          points={pointsToString(
            outerPoints,
          )}
          fill="none"
          stroke="#263947"
          strokeWidth={1}
        />

        <Polygon
          points={pointsToString(
            middlePoints,
          )}
          fill="none"
          stroke="#263947"
          strokeWidth={1}
        />

        <Polygon
          points={pointsToString(
            innerPoints,
          )}
          fill="none"
          stroke="#263947"
          strokeWidth={1}
        />

        {/* Axis lines */}

        {outerPoints.map(
          (outerPoint, index) => (
            <Line
              key={index}
              x1={CENTER}
              y1={CENTER}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="#263947"
              strokeWidth={1}
            />
          ),
        )}

        {/* Ability polygon */}

        <Polygon
          points={pointsToString(
            scorePoints,
          )}
          fill="#20A9FF"
          fillOpacity={0.18}
          stroke="#20A9FF"
          strokeWidth={2}
        />

        {/* Score points */}

        {scorePoints.map(
          (scorePoint, index) => (
            <Circle
              key={index}
              cx={scorePoint.x}
              cy={scorePoint.y}
              r={4}
              fill="#071017"
              stroke="#20A9FF"
              strokeWidth={2}
            />
          ),
        )}

        {/* Center */}

        <Circle
          cx={CENTER}
          cy={CENTER}
          r={3}
          fill="#20A9FF"
        />

        {/* Labels */}

        <SvgText
          x={CENTER}
          y={27}
          fill="#91A5B4"
          fontSize={11}
          textAnchor="middle"
          letterSpacing={1}
        >
          ACADEMIC
        </SvgText>

        <SvgText
          x={CENTER}
          y={43}
          fill="#20A9FF"
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          {scores[0].toFixed(0)}
        </SvgText>

        <SvgText
          x={SIZE - 8}
          y={CENTER - 4}
          fill="#91A5B4"
          fontSize={11}
          textAnchor="end"
          letterSpacing={1}
        >
          PHYSICAL
        </SvgText>

        <SvgText
          x={SIZE - 8}
          y={CENTER + 13}
          fill="#20A9FF"
          fontSize={12}
          fontWeight="bold"
          textAnchor="end"
        >
          {scores[1].toFixed(0)}
        </SvgText>

        <SvgText
          x={CENTER}
          y={SIZE - 26}
          fill="#91A5B4"
          fontSize={11}
          textAnchor="middle"
          letterSpacing={1}
        >
          ADAPTABILITY
        </SvgText>

        <SvgText
          x={CENTER}
          y={SIZE - 10}
          fill="#20A9FF"
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          {scores[2].toFixed(0)}
        </SvgText>

        <SvgText
          x={8}
          y={CENTER - 4}
          fill="#91A5B4"
          fontSize={11}
          textAnchor="start"
          letterSpacing={1}
        >
          SOCIAL
        </SvgText>

        <SvgText
          x={8}
          y={CENTER + 13}
          fill="#20A9FF"
          fontSize={12}
          fontWeight="bold"
          textAnchor="start"
        >
          {scores[3].toFixed(0)}
        </SvgText>
      </Svg>
    </View>
  );
}