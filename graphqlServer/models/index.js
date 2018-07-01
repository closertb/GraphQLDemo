/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2017-06-12
 */
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { merge } from 'lodash';

import { addErrorLoggingToSchema, makeExecutableSchema } from 'graphql-tools';

// collect all schema definition
const schemaModules = glob.sync(path.resolve(__dirname, './**/*.graphql'));
const schemaStringArray = schemaModules.map(module => fs.readFileSync(module, { encoding: 'UTF-8' }));

// collect all resolver definition
const resolverModules = glob.sync(path.resolve(__dirname, './**/resolver.js'));
const resolvers = resolverModules.map(module => require(module).default);


const schema = makeExecutableSchema({ typeDefs: schemaStringArray, resolvers: merge(...resolvers) });
console.log(schema);
addErrorLoggingToSchema(schema, {
	log(e){
		console.error(e.stack);
	}
});

export default schema;
