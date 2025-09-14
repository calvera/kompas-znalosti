import * as migration_20250913_100016 from './20250913_100016';
import * as migration_20250913_103119 from './20250913_103119';
import * as migration_20250913_103811 from './20250913_103811';
import * as migration_20250914_080838 from './20250914_080838';
import * as migration_20250914_201133 from './20250914_201133';
import * as migration_20250914_221821 from './20250914_221821';

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
    name: '20250913_103811',
  },
  {
    up: migration_20250914_080838.up,
    down: migration_20250914_080838.down,
    name: '20250914_080838',
  },
  {
    up: migration_20250914_221821.up,
    down: migration_20250914_221821.down,
    name: '20250914_081821',
  },
  {
    up: migration_20250914_201133.up,
    down: migration_20250914_201133.down,
    name: '20250914_201133'
  },
];
