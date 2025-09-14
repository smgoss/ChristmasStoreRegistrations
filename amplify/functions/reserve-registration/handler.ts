import type { AppSyncResolverEvent } from 'aws-lambda';
import { DynamoDBClient, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { randomUUID } from 'crypto';

// Payload expected from the app server
interface RegistrationInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfKids: number;
  timeSlot: string;
  referredBy?: string;
  inviteToken?: string;
  children?: Array<{ age: string | number; gender: 'boy' | 'girl' }>;
}

// IMPORTANT: This is a scaffold. To make this fully durable and atomic across instances,
// configure REGISTRATION_TABLE and TIMESLOT_TABLE to point to your DynamoDB tables.
// Then implement a TransactWriteItems that:
//  1) Condition-updates the timeslot row: set currentRegistrations = currentRegistrations + 1
//     with a condition currentRegistrations < maxCapacity AND isActive = true
//  2) Puts the registration row
//  3) Optionally writes child rows (ideally with a single-table design or separate transaction)

const ddb = new DynamoDBClient({});

export const handler = async (event: AppSyncResolverEvent<{ input: RegistrationInput }>) => {
  const input = (event?.arguments as any)?.input as RegistrationInput;
  if (!input) {
    return { ok: false, error: 'Missing input' };
  }

  if (!process.env.REGISTRATION_TABLE || !process.env.TIMESLOT_TABLE) {
    return { ok: false, error: 'Tables not configured for transaction' };
  }

  const regId = randomUUID();
  const now = new Date().toISOString();

  try {
    // Pseudocode transaction; you must adapt Key schema and attributes to your actual tables.
    // This file is provided as a starting point.
    const cmd = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Update: {
            TableName: process.env.TIMESLOT_TABLE,
            Key: { id: { S: input.timeSlot } }, // adjust according to your schema
            UpdateExpression: 'SET currentRegistrations = currentRegistrations + :one',
            ConditionExpression: 'currentRegistrations < maxCapacity AND isActive = :true',
            ExpressionAttributeValues: {
              ':one': { N: '1' },
              ':true': { BOOL: true },
            },
          },
        },
        {
          Put: {
            TableName: process.env.REGISTRATION_TABLE,
            Item: {
              id: { S: regId },
              firstName: { S: input.firstName },
              lastName: { S: input.lastName },
              email: { S: input.email },
              phone: { S: input.phone },
              numberOfKids: { N: String(input.numberOfKids) },
              timeSlot: { S: input.timeSlot },
              referredBy: input.referredBy ? { S: input.referredBy } : { NULL: true },
              inviteToken: input.inviteToken ? { S: input.inviteToken } : { NULL: true },
              registrationDate: { S: now },
            },
          },
        },
      ],
    });

    await ddb.send(cmd);

    return { ok: true, id: regId };
  } catch (err: any) {
    console.error('reserve-registration error', err);
    return { ok: false, error: 'Capacity full or transaction failed' };
  }
};

