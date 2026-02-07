import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Container, Paper, Title, Text, Group, Badge, Button, 
  Grid, Progress, Stack, ThemeIcon, Avatar, Tooltip, ScrollArea 
} from '@mantine/core';
import { 
  IconArrowLeft, IconMail, IconMapPin, IconPhone, IconClock, 
  IconBrain, IconLeaf, IconAlertTriangle, IconShare, 
  IconSchool, IconBriefcase 
} from '@tabler/icons-react';
import candidatesData from '../data/mockCandidates.json';
import { getScoreColor } from '../utils/scoreUtils';

export function CandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const candidate = candidatesData.find(c => c.id === parseInt(id));

  if (!candidate) return <Text>Candidate not found</Text>;

  const scores = candidate.scores;
  const avg = candidate.scores?.average ?? 0;
  const crisisScore = scores.crisis || scores.crisis_management || 0;
  const sustainScore = scores.sustainability || 0;
  const motivScore = scores.motivation || scores.team_motivation || 0;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert(`Link copied to clipboard: ${url}`);
    });
  };

  return (
    <Container size="md" py="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation - Fixed at top */}
      <Group mb="md">
        <Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button component={Link} to="/" variant="subtle">
          Dashboard
        </Button>
      </Group>

      {/* Main Card - Flex grow to fill space, but doesn't overflow page */}
      <Paper shadow="sm" radius="md" withBorder style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
        
        {/* Card Header (Fixed - Always Visible) */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
            <Group justify="space-between">
            <Group>
                <Avatar 
                src={candidate.avatar} 
                alt={candidate.name} 
                size={80}
                radius={120} 
                color="blue"
                >
                {candidate.name.charAt(0)}
                </Avatar>

                <div>
                <Title order={2}>{candidate.name}</Title>
                <Text c="dimmed" size="md">{candidate.role || "Recycling Production Manager"}</Text>
                </div>
            </Group>

            <Badge 
                size="xl" 
                color={getScoreColor(avg)} 
                variant="filled"
            >
                Score: {avg}%
            </Badge>
            </Group>
        </div>

        {/* Scrollable Content Area */}
        <ScrollArea style={{ flex: 1 }} type="auto">
            <div style={{ padding: '24px' }}>
                <Grid gutter="xl">
                {/* LEFT COLUMN: Personal Info */}
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Stack gap="md" bg="gray.0" p="md" style={{ borderRadius: 8 }}>
                    <Title order={4}>Profile Details</Title>
                    
                    <Group gap="xs">
                        <ThemeIcon color="gray" variant="light"><IconMail size={16} /></ThemeIcon>
                        <Text size="sm" style={{ wordBreak: 'break-all' }}>{candidate.email}</Text>
                    </Group>
                    <Group gap="xs">
                        <ThemeIcon color="gray" variant="light"><IconPhone size={16} /></ThemeIcon>
                        <Text size="sm">{candidate.phone || "No phone"}</Text>
                    </Group>
                    <Group gap="xs">
                        <ThemeIcon color="gray" variant="light"><IconMapPin size={16} /></ThemeIcon>
                        <Text size="sm">{candidate.location}</Text>
                    </Group>
                    <Group gap="xs">
                        <ThemeIcon color="gray" variant="light"><IconBriefcase size={16} /></ThemeIcon>
                        <Text size="sm">{candidate.experience_years} Years Experience</Text>
                    </Group>
                    <Group gap="xs" align="flex-start">
                        <ThemeIcon color="gray" variant="light"><IconSchool size={16} /></ThemeIcon>
                        <Text size="sm" style={{ flex: 1 }}>{candidate.education}</Text>
                    </Group>
                    <Group gap="xs">
                        <ThemeIcon color="gray" variant="light"><IconClock size={16} /></ThemeIcon>
                        <Text size="sm">{candidate.shift_preference || "Flexible"}</Text>
                    </Group>
                    </Stack>

                    <Title order={4} mt="xl" mb="sm">Skills</Title>
                    <Group gap={5}>
                    {candidate.skills.map(skill => <Badge key={skill} variant="outline" size="md" color="dark">{skill}</Badge>)}
                    </Group>
                </Grid.Col>

                {/* RIGHT COLUMN: Scores & Actions */}
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Title order={3} mb="lg">AI Evaluation Report</Title>
                    
                    <Stack gap="lg">
                    <div>
                        <Group justify="space-between" mb={5}>
                            <Group gap={5}><IconAlertTriangle color="orange"/><Text fw={500}>Crisis Management</Text></Group>
                            <Text fw={700}>{crisisScore}/100</Text>
                        </Group>
                        <Progress value={crisisScore} color="orange" size="lg" radius="xl" />
                        <Text size="sm" c="dimmed" mt={5}>Ability to handle line jams and safety hazards efficiently.</Text>
                    </div>

                    <div>
                        <Group justify="space-between" mb={5}>
                            <Group gap={5}><IconLeaf color="green"/><Text fw={500}>Sustainability Knowledge</Text></Group>
                            <Text fw={700}>{sustainScore}/100</Text>
                        </Group>
                        <Progress value={sustainScore} color="green" size="lg" radius="xl" />
                        <Text size="sm" c="dimmed" mt={5}>Depth of knowledge in circular economy and waste reduction.</Text>
                    </div>

                    <div>
                        <Group justify="space-between" mb={5}>
                            <Group gap={5}><IconBrain color="blue"/><Text fw={500}>Team Motivation</Text></Group>
                            <Text fw={700}>{motivScore}/100</Text>
                        </Group>
                        <Progress value={motivScore} color="blue" size="lg" radius="xl" />
                        <Text size="sm" c="dimmed" mt={5}>Leadership style and ability to retain staff on night shifts.</Text>
                    </div>
                    </Stack>

                    <Group mt="xl" justify="flex-end">
                    <Tooltip label="Copy Link to Clipboard">
                        <Button variant="outline" leftSection={<IconShare size={16} />} onClick={handleShare}>
                            Share Profile
                        </Button>
                        </Tooltip>
                        <Button variant="default">Download PDF Report</Button>
                        <Button color="teal">Hire Candidate</Button>
                    </Group>
                </Grid.Col>
                </Grid>
            </div>
        </ScrollArea>
      </Paper>
    </Container>
  );
}