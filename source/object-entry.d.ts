/**
Create a type that describes a single key-value pair produced when calling `Object.entries()` on an object.

This is useful when you need the type of one entry, for example when destructuring the entries of an object in a loop.

Unlike the object branch of `Entry`, this type is not a conditional type, so unresolved generic type parameters are preserved: inside a generic function, `ObjectEntry<T>` keeps the key as `keyof T` and the value as `T[keyof T]` instead of widening them to `string` and `unknown`.

@example
```
import type {ObjectEntry} from 'type-fest';

type Example = {
	someKey: number;
};

const logEntry = (entry: ObjectEntry<Example>) => {
	// The key and value types are known.
	entry[0].toUpperCase();
	entry[1].toFixed(0);
};

const example: Example = {someKey: 1};
const entry = Object.entries(example)[0] as ObjectEntry<Example>;
logEntry(entry);
```

The type is a tuple of the object's keys and the values at those keys: `[keyof BaseType, BaseType[keyof BaseType]]`.

@see `ObjectEntries` if you want the array of entries (which is the return of `Object.entries()`).
@see `Entry` for the general variant covering objects, arrays, maps, and sets.

@category Object
*/
export type ObjectEntry<BaseType> = [keyof BaseType, BaseType[keyof BaseType]];

export {};
