import type {ObjectEntry} from './object-entry.d.ts';

/**
Create a type that describes the key-value pairs produced when calling `Object.entries()` on an object.

This is useful when you need the type of the array returned by `Object.entries()`, for example to type a helper that processes an object's entries.

Unlike `Entries`, this type is not a conditional type, so unresolved generic type parameters are preserved: inside a generic function, `ObjectEntries<T>` keeps the keys as `keyof T` and the values as `T[keyof T]` instead of widening them to `string` and `unknown`.

@example
```
import type {ObjectEntries} from 'type-fest';

type Example = {
	someKey: number;
};

const logEntries = (entries: ObjectEntries<Example>) => {
	for (const [key, value] of entries) {
		// The key and value types are known.
		key.toUpperCase();
		value.toFixed(0);
	}
};

const example: Example = {someKey: 1};
const entries = Object.entries(example) as ObjectEntries<Example>;
logEntries(entries);
```

The type is an array of `[keyof BaseType, BaseType[keyof BaseType]]` tuples.

@see `ObjectEntry` if you want to just access the type of a single entry.
@see `Entries` for the general variant covering objects, arrays, maps, and sets.

@category Object
*/
export type ObjectEntries<BaseType> = Array<ObjectEntry<BaseType>>;

export {};
