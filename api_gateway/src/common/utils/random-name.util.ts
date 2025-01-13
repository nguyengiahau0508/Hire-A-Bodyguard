
import { faker } from '@faker-js/faker';

export function generateRandomName(): string {
  return faker.internet.username()
}
