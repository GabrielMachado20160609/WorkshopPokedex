import { Pokemon } from './types';
import { TYPE_COLORS } from './constants';

export const addToTeam = (team: Pokemon[], pokemon: Pokemon): Pokemon[] => {
  if (team.length >= 6) {
    return team;
  }

  const isDuplicate = team.some((member) => member.id === pokemon.id);
  if (isDuplicate) {
    return team;
  }

  return [...team, pokemon];
};

export const removeFromTeam = (team: Pokemon[], pokemonId: number): Pokemon[] => {
  return team.filter((member) => member.id !== pokemonId);
};

export const getTypeCoverage = (team: Pokemon[]): string[] => {
  const typeSet = new Set<string>();

  team.forEach((pokemon) => {
    pokemon.types.forEach((typeInfo) => {
      typeSet.add(typeInfo.type.name);
    });
  });

  return Array.from(typeSet);
};

export const getCoverageGaps = (team: Pokemon[]): string[] => {
  const coverage = new Set(getTypeCoverage(team));

  return Object.keys(TYPE_COLORS).filter((type) => !coverage.has(type));
};
