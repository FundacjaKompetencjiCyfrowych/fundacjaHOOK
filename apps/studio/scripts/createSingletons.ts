import { getCliClient } from "sanity/cli";

/**
 * This script will create singleton documents
 *
 * 1. Take a backup of your dataset with:
 * `npx sanity@latest dataset export`
 *
 * 2. Copy this file to the root of your Sanity Studio project
 *
 * 3. Update the SINGLETONS constant to your needs
 *
 * 4. Run the script:
 * npx sanity@latest exec ./createSingletons.ts --with-user-token
 *
 * 5. Update your desk structure if needed
 */

import { DOCUMENTS } from "../config";

const SINGLETONS = DOCUMENTS.filter((d) => d.singleton);

// This will use the client configured in ./sanity.cli.ts
const client = getCliClient();

async function createSingletons() {
  const documents = SINGLETONS.map((singleton) => ({
    _id: singleton.id || singleton._type,
    _type: singleton._type,
  }));

  const transaction = client.transaction();

  documents.forEach((doc) => {
    transaction.createIfNotExists(doc as any);
  });

  await transaction
    .commit()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

createSingletons();
