import { Paper, Title, SimpleGrid, Tooltip, Text, Box } from '@mantine/core';
import { getScoreColor } from '../utils/scoreUtils';

export function SkillHeatmap({ data }) {
  const topCandidates = data.slice(0, 12);

  const metrics = [
    { label: 'Crisis', key: 'crisis_management', short: 'C' },
    { label: 'Sustain', key: 'sustainability', short: 'S' },
    { label: 'Motivation', key: 'team_motivation', short: 'M' },
  ];

  return (
    <Paper shadow="xs" p="md" withBorder h="100%">
      <Title order={3} mb="md">📊 Skill Performance Heatmap</Title>
      <Text size="sm" c="dimmed" mb="lg">
        Visualizing Crisis (C), Sustainability (S), and Motivation (M) scores.
      </Text>

      <SimpleGrid cols={4} spacing="xs" verticalSpacing="xl">
        {topCandidates.map((candidate) => (
          <Box key={candidate.id} ta="center">
            <Text size="xs" fw={700} truncate>
              {candidate.name}
            </Text>

            <SimpleGrid cols={3} spacing={2} mt={5}>
              {metrics.map((metric) => {
                const score = candidate.scores?.[metric.key] ?? 0;
                return (
                  <Tooltip
                    key={metric.key}
                    label={`${metric.label}: ${score}%`}
                  >
                    <Box
                      h={30}
                      bg={getScoreColor(score)}
                      style={{ borderRadius: 4, cursor: 'pointer' }}
                    />
                  </Tooltip>
                );
              })}
            </SimpleGrid>

            <SimpleGrid cols={3} spacing={2} mt={5}>
              {metrics.map((metric) => (
                <Text key={metric.short} size="10px" c="dimmed" ta="center">
                  {metric.short}
                </Text>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
