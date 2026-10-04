import {expectAssignable, expectNotAssignable, expectType} from 'tsd';
import type {ObjectEntries, ObjectEntry} from '../index.d.ts';

// Objects
const objectExample = {a: 1};

const objectEntry: ObjectEntry<typeof objectExample> = ['a', 1];
expectType<['a', number]>(objectEntry);
expectType<[keyof typeof objectExample, (typeof objectExample)[keyof typeof objectExample]]>(objectEntry);

const objectEntries: ObjectEntries<typeof objectExample> = [['a', 1]];
expectType<Array<ObjectEntry<typeof objectExample>>>(objectEntries);
expectAssignable<Array<[string, number]>>(objectEntries);

// Optional keys
type WithOptional = {a?: number; b: string};
const optionalEntry: ObjectEntry<WithOptional> = ['b', 'x'];
expectType<[keyof WithOptional, WithOptional[keyof WithOptional]]>(optionalEntry);

// Index signatures
type Dict = {[key: string]: number};
const dictEntry: ObjectEntry<Dict> = ['a', 1];
expectType<[string | number, number]>(dictEntry);
expectNotAssignable<ObjectEntry<Dict>>(['a', 'x']);

// Generic contexts preserve the type parameters (https://github.com/sindresorhus/type-fest/issues/649).
function generic<T extends Record<string, unknown>>(input: T) {
	for (const entry of Object.entries(input) as ObjectEntries<T>) {
		expectType<keyof T>(entry[0]);
		expectType<T[keyof T]>(entry[1]);
	}

	const single = Object.entries(input)[0] as ObjectEntry<T>;
	expectType<keyof T>(single[0]);
	expectType<T[keyof T]>(single[1]);
}
