import * as migration_20250913_100016 from './20250913_100016';
import * as migration_20250913_103119 from './20250913_103119';
import * as migration_20250913_103811 from './20250913_103811';

export const migrations = [
  {
    up: migration_20250913_100016.up,
    down: migration_20250913_100016.down,
    name: '20250913_100016',
  },
  {
    up: migration_20250913_103119.up,
    down: migration_20250913_103119.down,
    name: '20250913_103119',
  },
  {
    up: migration_20250913_103811.up,
    down: migration_20250913_103811.down,
    name: '20250913_103811'
  },
];
