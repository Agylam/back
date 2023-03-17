import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, NodeProvider } from 'stenodb';
import type { AsyncProvider, ClassEntity } from 'stenodb'
import { UsersEntity } from './entities/UsersEntity.js';
import { DaysEntity } from './entities/DaysEntity.js';
import { DayEntity } from './entities/DayEntity.js';

const pathToDatabase = resolve(dirname(fileURLToPath(import.meta.url)), "..", "db");

class Databases {
  private readonly provider: NodeProvider;
  private databases = new Map<string, AsyncProvider<any>>();

  constructor() {
    this.provider = new NodeProvider({ path: pathToDatabase });
  }

  async createDatabase<T>(
    name: string,
    entity: ClassEntity<T>,
    initialData?: T
  ) {
    const adapter = new AsyncAdapter(name, entity, initialData);
    const db = await this.provider.create(adapter);
    await db.read()
    this.databases.set(name, db);
    return db
  }

  getDatabase<T>(name: string) {
    return this.databases.get(name) as AsyncProvider<T>
  }
}

export const databases = new Databases()

// users
export const users = await databases.createDatabase('users', UsersEntity)

// days
const initialData = new DaysEntity(
  Array.from(Array(7).keys()).map(v => new DayEntity([]))
)
export const days = await databases.createDatabase('days', DaysEntity, initialData)
