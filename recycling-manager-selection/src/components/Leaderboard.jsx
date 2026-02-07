import { Table, Badge, Paper, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { getScoreColor } from '../utils/scoreUtils';

const getRankStyle = (index) => {
  if (index === 0) return { variant: 'gradient', gradient: { from: 'orange', to: 'yellow', deg: 90 } };
  if (index === 1) return { variant: 'gradient', gradient: { from: 'gray.6', to: 'gray.3', deg: 90 } };
  if (index === 2) return { variant: 'gradient', gradient: { from: '#8d5524', to: '#d4a373', deg: 90 } };
  return { variant: 'light', color: 'gray' };
};

export function Leaderboard({ data }) {
  const navigate = useNavigate();

  // Safety check
  const safeData = data || [];

  const rows = safeData.slice(0, 10).map((element, index) => {
    const { variant, gradient, color } = getRankStyle(index);
    const scoreColorName = element.scores?.average != null
    ? getScoreColor(element.scores.average) 
    : 'gray.5';

    return (
      <Table.Tr 
        key={element.id}
        onClick={() => navigate(`/candidate/${element.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <Table.Td>
          <Badge variant={variant} gradient={gradient} color={color} circle>
            {index + 1}
          </Badge>
        </Table.Td>
        <Table.Td style={{ fontWeight: 500 }}>{element.name}</Table.Td>
        <Table.Td>{element.experience_years} Years</Table.Td>
        <Table.Td style={{ fontWeight: 'bold', color: scoreColorName }}>
          {element.scores?.average != null ? `${element.scores.average}%` : '—'}
        </Table.Td>
      </Table.Tr>
    );
  });
  
  return (
    <Paper shadow="xs" p="md" withBorder h="100%">
      <Title order={3} mb="md">🏆 Top 10 Candidates</Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rank</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Experience</Table.Th>
            <Table.Th>Avg Score</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}