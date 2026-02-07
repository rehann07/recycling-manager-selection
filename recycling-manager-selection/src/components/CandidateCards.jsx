import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
  Avatar,
  Stack,
  ThemeIcon,
  Divider
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconMail, IconBriefcase, IconTools } from '@tabler/icons-react';
import { getScoreColor } from '../utils/scoreUtils';

export function CandidateCards({ data }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="xl">
      {data.slice(0, 10).map((candidate) => {
        const avgScore = Math.round(candidate.scores?.average ?? 0);

        return (
          <Card
            key={candidate.id}
            radius="lg"
            withBorder
            h="100%"
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--mantine-color-body)',
              transition: 'transform 150ms ease, box-shadow 150ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--mantine-shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--mantine-shadow-sm)';
            }}
          >
            {/* HEADER */}
            <Card.Section p="md" bg="var(--mantine-color-gray-0)">
              <Group align="center">
                <Avatar
                  src={candidate.avatar}
                  alt={candidate.name}
                  size={48}
                  radius="xl"
                >
                  {candidate.name.charAt(0)}
                </Avatar>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={600} size="sm" truncate>
                    {candidate.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Candidate ID · {candidate.id}
                  </Text>
                </div>

                <Stack gap={2} align="center">
                  <Badge
                    size="lg"
                    circle
                    color={getScoreColor(avgScore)}
                    variant="filled"
                  >
                    {avgScore}
                  </Badge>
                  <Text size="10px" c="dimmed">
                    Avg
                  </Text>
                </Stack>
              </Group>
            </Card.Section>

            {/* BODY */}
            <Stack gap="sm" mt="md" mb="md" flex={1}>
              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size="sm" variant="light" color="gray">
                  <IconMail size={14} />
                </ThemeIcon>
                <Text size="sm" c="dimmed" truncate>
                  {candidate.email}
                </Text>
              </Group>

              <Group gap="xs">
                <ThemeIcon size="sm" variant="light" color="gray">
                  <IconBriefcase size={14} />
                </ThemeIcon>
                <Text size="sm" c="dimmed">
                  {candidate.experience_years} years experience
                </Text>
              </Group>

              <Divider my={4} />

              <Group gap="xs" align="flex-start" wrap="nowrap">
                <ThemeIcon
                  size="sm"
                  variant="light"
                  color="gray"
                  style={{ flexShrink: 0 }}
                >
                  <IconTools size={14} />
                </ThemeIcon>

                <Group gap={6}>
                  {candidate.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      size="xs"
                      variant="outline"
                      radius="sm"
                      style={{ textTransform: 'none' }}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 3 && (
                    <Text size="xs" c="dimmed">
                      +{candidate.skills.length - 3}
                    </Text>
                  )}
                </Group>
              </Group>
            </Stack>

            {/* FOOTER */}
            <Button
              component={Link}
              to={`/candidate/${candidate.id}`}
              fullWidth
              radius="md"
              variant="light"
            >
              View Full Profile
            </Button>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
