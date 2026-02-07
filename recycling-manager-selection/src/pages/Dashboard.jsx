import { Container, Title, Grid, Divider, Button, Group,Paper,Text } from '@mantine/core';
import { Leaderboard } from '../components/Leaderboard';
import { SkillHeatmap } from '../components/SkillHeatmap';
import { CandidateCards } from '../components/CandidateCards';
import candidatesData from '../data/mockCandidates.json';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const sortedCandidates = [...candidatesData].sort((a, b) => b.scores.average - a.scores.average);
  const totalCandidates = candidatesData.length;
  const avgClassScore = totalCandidates
  ? Math.round(
      candidatesData.reduce((acc, c) => acc + c.scores.average, 0) / totalCandidates
    )
  : 0;

  const topTierCount = candidatesData.filter(c => c.scores.average >= 85).length;
  return (
    <Container size="xl" py="xl">
      {/* Header Section: Title on Left, Button on Right */}
      <Group justify="space-between" align="center" mb="xl">
        <div>
          <Title order={1}>Recycling Production Line Manager</Title>
          <Title order={3} fw={400} c="dimmed" mt={4}>
            Selection System Dashboard
          </Title>
        </div>
        
        <Button component={Link} to="/all-candidates" variant="outline" size="md">
          View All Applicants
        </Button>
      </Group>
      
      <Grid mb="sm">
        <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper shadow="xs" p="md" withBorder ta="center">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Applicants</Text>
                <Text fw={700} size="xl">{totalCandidates}</Text>
            </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper shadow="xs" p="md" withBorder ta="center">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Class Average</Text>
                <Text fw={700} size="xl" c="blue">{avgClassScore}%</Text>
            </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper shadow="xs" p="md" withBorder ta="center">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{'Top Talent (>85%)'}</Text>
                <Text fw={700} size="xl" c="green">{topTierCount}</Text>
            </Paper>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Leaderboard data={sortedCandidates} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <SkillHeatmap data={sortedCandidates} />
        </Grid.Col>
      </Grid>

      <Divider my="xl" label="Top Candidates Overview" labelPosition="center" />
      
      <CandidateCards data={sortedCandidates} />
    </Container>
  );
}