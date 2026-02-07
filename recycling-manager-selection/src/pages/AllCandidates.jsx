import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Title, Table, Avatar, Group, Text, Badge, Button, TextInput, Paper, UnstyledButton, Center } from '@mantine/core';
import { IconSearch, IconArrowLeft, IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import candidatesData from '../data/mockCandidates.json';
import { useDebouncedValue } from '@mantine/hooks';
import { getScoreColor } from '../utils/scoreUtils';

// --- Helper: Sortable Header Component ---
function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort} style={{ width: '100%' }}>
        <Group justify="space-between">
          <Text fw={700} fz="sm">{children}</Text>
          <Center>
            <Icon style={{ width: 16, height: 16 }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export function AllCandidates() {
  const navigate = useNavigate(); 
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const filteredData = candidatesData.filter(c =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(debouncedSearch.toLowerCase()))
  );

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;
    
    // Handle nested score sorting vs normal fields
    const payloadA = sortBy === 'score' ? a.scores.average : a[sortBy];
    const payloadB = sortBy === 'score' ? b.scores.average : b[sortBy];

    // Number vs String sorting
    if (typeof payloadA === 'number') {
        return reverseSortDirection ? payloadB - payloadA : payloadA - payloadB;
    }
    return reverseSortDirection 
      ? payloadB.localeCompare(payloadA) 
      : payloadA.localeCompare(payloadB);
  });

  const rows = sortedData.map((element) => {
    const crisis = element.scores.crisis || element.scores.crisis_management || 0;
    const sustain = element.scores.sustainability || 0;
    const motiv = element.scores.motivation || element.scores.team_motivation || 0;
    
    const handleRowClick = (e) => {
        if(e.target.closest('button')) return; 
        navigate(`/candidate/${element.id}`);
    };

    return (
      <Table.Tr 
        key={element.id}
        onClick={handleRowClick}
        style={{ cursor: 'pointer' }}
      >
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} src={element.avatar} radius={40} color="blue">{element.name[0]}</Avatar>
            <div>
              <Text fz="sm" fw={500}>{element.name}</Text>
              <Text fz="xs" c="dimmed">{element.email}</Text>
            </div>
          </Group>
        </Table.Td>
        
        <Table.Td>{element.experience_years} Years</Table.Td>
        
        <Table.Td>
          <Group gap={5}>
              {element.skills.slice(0, 2).map(skill => (
                  <Badge key={skill} size="xs" variant="outline" color="gray">{skill}</Badge>
              ))}
              {element.skills.length > 2 && <Badge size="xs" variant="light" color="gray">+{element.skills.length - 2}</Badge>}
          </Group>
        </Table.Td>
        
        <Table.Td>
          <Group gap="xs">
            <Badge size="sm" color="orange" variant="light" title="Crisis Mgmt">{crisis}</Badge>
            <Badge size="sm" color="green" variant="light" title="Sustainability">{sustain}</Badge>
            <Badge size="sm" color="blue" variant="light" title="Team Motivation">{motiv}</Badge>
          </Group>
        </Table.Td>
        
        <Table.Td
          fw={700}
          c={element.scores?.average != null ? getScoreColor(element.scores.average) : 'gray.5'}
        >
          {element.scores?.average != null ? `${element.scores.average}%` : '—'}
        </Table.Td>

        <Table.Td>
          <Button component={Link} to={`/candidate/${element.id}`} variant="subtle" size="xs">
            View
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container size="xl" py="xl">
      <Button component={Link} to="/" variant="subtle" leftSection={<IconArrowLeft size={16}/>} mb="md">
        Back to Dashboard
      </Button>

      <Group justify="space-between" mb="lg">
        <Title order={2}>All Applicants ({sortedData.length})</Title>
        <TextInput 
            placeholder="Search by name or skill..." 
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            w={300}
        />
      </Group>

      <Paper shadow="xs" radius="md" withBorder overflow="hidden">
        <Table highlightOnHover verticalSpacing="sm" striped>
            <Table.Thead bg="gray.1">
            <Table.Tr>
                <Th 
                  sorted={sortBy === 'name'} 
                  reversed={reverseSortDirection} 
                  onSort={() => setSorting('name')}
                >
                  Candidate
                </Th>
                <Th 
                  sorted={sortBy === 'experience_years'} 
                  reversed={reverseSortDirection} 
                  onSort={() => setSorting('experience_years')}
                >
                  Experience
                </Th>
                <Table.Th>Key Skills</Table.Th>
                <Table.Th>Scores (C / S / M)</Table.Th>
                <Th 
                  sorted={sortBy === 'score'} 
                  reversed={reverseSortDirection} 
                  onSort={() => setSorting('score')}
                >
                  Avg
                </Th>
                <Table.Th>Action</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ? rows : (
                    <Table.Tr>
                        <Table.Td colSpan={6} ta="center" py="xl" c="dimmed">
                            No candidates found matching "{search}"
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}