import { Pokemon } from './types';
import { TYPE_COLORS } from './constants';
import {
  addToTeam,
  removeFromTeam,
  getTypeCoverage,
  getCoverageGaps,
} from './teamUtils';

type PokemonTypeName = 'fire' | 'water' | 'grass' | 'electric' | 'psychic';

const makePokemon = (
  id: number,
  name: string,
  typeNames: PokemonTypeName[],
): Pokemon => ({
  id,
  name,
  height: 1,
  weight: 1,
  base_experience: 50,
  types: typeNames.map((typeName, index) => ({
    slot: index + 1,
    type: { name: typeName, url: `https://pokeapi.co/api/v2/type/${typeName}` },
  })),
  stats: [],
  abilities: [],
  sprites: {
    front_default: null,
    front_shiny: null,
    back_default: null,
    other: {
      'official-artwork': {
        front_default: null,
        front_shiny: null,
      },
    },
  },
});

describe('teamUtils', () => {
  const charmander = makePokemon(4, 'Charmander', ['fire']);
  const squirtle = makePokemon(7, 'Squirtle', ['water']);
  const bulbasaur = makePokemon(1, 'Bulbasaur', ['grass']);
  const pikachu = makePokemon(25, 'Pikachu', ['electric']);
  const mewtwo = makePokemon(150, 'Mewtwo', ['psychic']);

  describe('addToTeam', () => {
    it('adds a Pokemon when team has fewer than 6 members', () => {
      const baseTeam = [charmander, squirtle];
      const updatedTeam = addToTeam(baseTeam, bulbasaur);

      expect(updatedTeam).toHaveLength(3);
      expect(updatedTeam).toContainEqual(bulbasaur);
    });

    it('does not add a duplicate Pokemon by id', () => {
      const originalTeam = [pikachu];
      const duplicate = makePokemon(25, 'Pikachu', ['electric']);
      const updatedTeam = addToTeam(originalTeam, duplicate);

      expect(updatedTeam).toHaveLength(1);
      expect(updatedTeam).toEqual(originalTeam);
    });

    it('does not add a Pokemon when team size is already 6', () => {
      const fullTeam = [
        makePokemon(1, 'One', ['fire']),
        makePokemon(2, 'Two', ['water']),
        makePokemon(3, 'Three', ['grass']),
        makePokemon(4, 'Four', ['electric']),
        makePokemon(5, 'Five', ['psychic']),
        makePokemon(6, 'Six', ['fire']),
      ];

      const updatedTeam = addToTeam(fullTeam, mewtwo);

      expect(updatedTeam).toHaveLength(6);
      expect(updatedTeam).not.toContainEqual(mewtwo);
    });
  });

  describe('removeFromTeam', () => {
    it('removes the Pokemon with the matching id', () => {
      const team = [charmander, squirtle, bulbasaur];
      const updatedTeam = removeFromTeam(team, squirtle.id);

      expect(updatedTeam).toHaveLength(2);
      expect(updatedTeam).not.toContainEqual(squirtle);
      expect(updatedTeam).toContainEqual(charmander);
      expect(updatedTeam).toContainEqual(bulbasaur);
    });

    it('returns the original team when no matching id is found', () => {
      const team = [charmander, squirtle];
      const updatedTeam = removeFromTeam(team, 999);

      expect(updatedTeam).toEqual(team);
    });
  });

  describe('getTypeCoverage', () => {
    it('returns unique team types across all Pokemon', () => {
      const team = [charmander, makePokemon(10, 'DraftFire', ['fire']), bulbasaur];
      const coverage = getTypeCoverage(team);

      expect(coverage).toHaveLength(2);
      expect(coverage).toEqual(expect.arrayContaining(['fire', 'grass']));
    });

    it('returns an empty array for an empty team', () => {
      expect(getTypeCoverage([])).toEqual([]);
    });
  });

  describe('getCoverageGaps', () => {
    it('returns types not covered by any team member using all types from constants', () => {
      const team = [charmander, squirtle];
      const coverageGaps = getCoverageGaps(team);
      const expectedGaps = Object.keys(TYPE_COLORS).filter(
        (type) => !['fire', 'water'].includes(type),
      );

      expect(coverageGaps.sort()).toEqual(expectedGaps.sort());
      expect(coverageGaps).toHaveLength(expectedGaps.length);
      expect(coverageGaps).not.toContain('fire');
      expect(coverageGaps).not.toContain('water');
    });

    it('returns every type when the team is empty', () => {
      const coverageGaps = getCoverageGaps([]);

      expect(coverageGaps.sort()).toEqual(Object.keys(TYPE_COLORS).sort());
    });
  });
});
