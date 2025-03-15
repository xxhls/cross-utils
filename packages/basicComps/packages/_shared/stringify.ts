/** @format */

export interface StringifyOptions {
  /**
	Strictly encode URI components with [`strict-uri-encode`](https://github.com/kevva/strict-uri-encode). It uses [`encodeURIComponent`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) if set to `false`. You probably [don't care](https://github.com/sindresorhus/query-string/issues/42) about this option.

	@default true
	*/
  readonly strict?: boolean;

  /**
	[URL encode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the keys and values.

	@default true
	*/
  readonly encode?: boolean;

  /**
	@default 'none'

	- `bracket`: Serialize arrays using bracket representation:

		```
		import queryString = require('query-string');

		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket'});
		//=> 'foo[]=1&foo[]=2&foo[]=3'
		```

	- `index`: Serialize arrays using index representation:

		```
		import queryString = require('query-string');

		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'index'});
		//=> 'foo[0]=1&foo[1]=2&foo[2]=3'
		```

	- `comma`: Serialize arrays by separating elements with comma:

		```
		import queryString = require('query-string');

		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'comma'});
		//=> 'foo=1,2,3'

		queryString.stringify({foo: [1, null, '']}, {arrayFormat: 'comma'});
		//=> 'foo=1,,'
		// Note that typing information for null values is lost
		// and `.parse('foo=1,,')` would return `{foo: [1, '', '']}`.
		```

	- `separator`: Serialize arrays by separating elements with character:

		```
		import queryString = require('query-string');

		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'separator', arrayFormatSeparator: '|'});
		//=> 'foo=1|2|3'
		```

	- `bracket-separator`: Serialize arrays by explicitly post-fixing array names with brackets and separating elements with a custom character:

		```
		import queryString = require('query-string');

		queryString.stringify({foo: []}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
		//=> 'foo[]'

		queryString.stringify({foo: ['']}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
		//=> 'foo[]='

		queryString.stringify({foo: [1]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
		//=> 'foo[]=1'

		queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
		//=> 'foo[]=1|2|3'

		queryString.stringify({foo: [1, '', 3, null, null, 6]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
		//=> 'foo[]=1||3|||6'

		queryString.stringify({foo: [1, '', 3, null, null, 6]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|', skipNull: true});
		//=> 'foo[]=1||3|6'

		queryString.stringify({foo: [1, 2, 3], bar: 'fluffy', baz: [4]}, {arrayFormat: 'bracket-separator', arrayFormatSeparator: '|'});
		//=> 'foo[]=1|2|3&bar=fluffy&baz[]=4'
		```

	- `none`: Serialize arrays by using duplicate keys:

		```
		import queryString = require('query-string');

		queryString.stringify({foo: [1, 2, 3]});
		//=> 'foo=1&foo=2&foo=3'
		```
	*/
  readonly arrayFormat?:
    | "bracket"
    | "index"
    | "comma"
    | "separator"
    | "bracket-separator"
    | "none";

  /**
	The character used to separate array elements when using `{arrayFormat: 'separator'}`.

	@default ,
	*/
  readonly arrayFormatSeparator?: string;

  /**
	Supports both `Function` as a custom sorting function or `false` to disable sorting.

	If omitted, keys are sorted using `Array#sort`, which means, converting them to strings and comparing strings in Unicode code point order.

	@default true

	@example
	```
	import queryString = require('query-string');

	const order = ['c', 'a', 'b'];

	queryString.stringify({a: 1, b: 2, c: 3}, {
		sort: (itemLeft, itemRight) => order.indexOf(itemLeft) - order.indexOf(itemRight)
	});
	//=> 'c=3&a=1&b=2'
	```

	@example
	```
	import queryString = require('query-string');

	queryString.stringify({b: 1, c: 2, a: 3}, {sort: false});
	//=> 'b=1&c=2&a=3'
	```
	*/
  readonly sort?: ((itemLeft: string, itemRight: string) => number) | false;

  /**
	Skip keys with `null` as the value.

	Note that keys with `undefined` as the value are always skipped.

	@default false

	@example
	```
	import queryString = require('query-string');

	queryString.stringify({a: 1, b: undefined, c: null, d: 4}, {
		skipNull: true
	});
	//=> 'a=1&d=4'

	queryString.stringify({a: undefined, b: null}, {
		skipNull: true
	});
	//=> ''
	```
	*/
  readonly skipNull?: boolean;

  /**
	Skip keys with an empty string as the value.

	@default false

	@example
	```
	import queryString = require('query-string');

	queryString.stringify({a: 1, b: '', c: '', d: 4}, {
		skipEmptyString: true
	});
	//=> 'a=1&d=4'
	```

	@example
	```
	import queryString = require('query-string');

	queryString.stringify({a: '', b: ''}, {
		skipEmptyString: true
	});
	//=> ''
	```
	*/
  readonly skipEmptyString?: boolean;
}

const strictUriEncode = (str: string): string => {
  return encodeURIComponent(str).replace(/[!'()*]/g, (x) => {
    return `%${x.charCodeAt(0).toString(16).toUpperCase()}`;
  });
};

const validateArrayFormatSeparator = (value?: string) => {
  if (typeof value !== "string" || value.length !== 1) {
    throw new TypeError("arrayFormatSeparator must be single character string");
  }
};

const isNullOrUndefined = (value: string): boolean => {
  return value === null || value === undefined;
};

const encoderForArrayFormat = (options: StringifyOptions) => {
  switch (options.arrayFormat) {
    case "index":
      return (key) => (result, value) => {
        const index = result.length;

        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), "[", index, "]"].join("")];
        }

        return [
          ...result,
          [
            encode(key, options),
            "[",
            encode(index, options),
            "]=",
            encode(value, options),
          ].join(""),
        ];
      };

    case "bracket":
      return (key) => (result, value) => {
        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        if (value === null) {
          return [...result, [encode(key, options), "[]"].join("")];
        }

        return [
          ...result,
          [encode(key, options), "[]=", encode(value, options)].join(""),
        ];
      };

    case "comma":
    case "separator":
    case "bracket-separator": {
      const keyValueSep =
        options.arrayFormat === "bracket-separator" ? "[]=" : "=";

      return (key) => (result, value) => {
        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        // Translate null to an empty string so that it doesn't serialize as 'null'
        value = value === null ? "" : value;

        if (result.length === 0) {
          return [
            [encode(key, options), keyValueSep, encode(value, options)].join(
              "",
            ),
          ];
        }

        return [
          [result, encode(value, options)].join(options.arrayFormatSeparator),
        ];
      };
    }

    default:
      return (key) => (result, value) => {
        if (
          value === undefined ||
          (options.skipNull && value === null) ||
          (options.skipEmptyString && value === "")
        ) {
          return result;
        }

        if (value === null) {
          return [...result, encode(key, options)];
        }

        return [
          ...result,
          [encode(key, options), "=", encode(value, options)].join(""),
        ];
      };
  }
};

const encode = (value: string, options: StringifyOptions): string => {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }

  return value;
};

const stringify = (
  object: Record<string, any>,
  options: StringifyOptions,
): string => {
  if (!object) {
    return "";
  }

  options = Object.assign(
    {
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
    },
    options,
  );

  validateArrayFormatSeparator(options.arrayFormatSeparator);

  const shouldFilter = (key) =>
    (options.skipNull && isNullOrUndefined(object[key])) ||
    (options.skipEmptyString && object[key] === "");

  const formatter = encoderForArrayFormat(options);

  const objectCopy = {};

  for (const key of Object.keys(object)) {
    if (!shouldFilter(key)) {
      objectCopy[key] = object[key];
    }
  }

  const keys = Object.keys(objectCopy);

  if (options.sort !== false) {
    keys.sort(options.sort);
  }

  return keys
    .map((key) => {
      const value = object[key];

      if (value === undefined) {
        return "";
      }

      if (value === null) {
        return encode(key, options);
      }

      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === "bracket-separator") {
          return encode(key, options) + "[]";
        }

        return value.reduce(formatter(key), []).join("&");
      }

      return encode(key, options) + "=" + encode(value, options);
    })
    .filter((x) => x.length > 0)
    .join("&");
};

export default {
  stringify,
};
