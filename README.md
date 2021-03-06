# JSON Canonical Form

[RFC 7159](https://tools.ietf.org/html/rfc7159) defines JSON as "a text format for the serialization of structured data", but allows many distinct serializations to describe the _same_ data.
Such human-friendly flexibility can hinder machine treatment of JSON text, particularly when it is used as input for cryptographic hash functions that are expected to yield identical results for logically equivalent input (as is the case in computation of digital signatures).
This specification defines a unique canonical form for **every** JSON value, the result being safe for comparison (in that logically equivalent structured data are guaranteed to have the same canonical form).


## Table of contents

<!-- toc -->

- [Definition](#definition)
- [Example](#example)
- [Implementations](#implementations)
  * [Validation](#validation)
- [Originial project link](#Original project link)
- [My approach](#My approach)

<!-- tocstop -->

## Definition

JSON text in canonical form:
  1. MUST be encoded in [UTF-8](https://tools.ietf.org/html/rfc3629)
  2. MUST NOT include insignificant (i.e., inter-token) whitespace (defined in [section 2 of RFC 7159](https://tools.ietf.org/html/rfc7159#section-2))
  3. MUST order the members of all objects lexicographically by the UCS (Unicode Character Set) code points of their names
     1. preserving and utilizing the code points in U+D800 through U+DFFF (inclusive) for all lone surrogates
  4. MUST represent all integer numbers (those with a zero-valued fractional part)
     1. without a leading minus sign when the value is zero, and
     2. without a decimal point, and
     3. without an exponent, and
     4. without insignificant leading zeroes (as already required of all JSON numbers)
  5. MUST represent all non-integer numbers in exponential notation
     1. including a nonzero single-digit significand integer part, and
     2. including a nonempty significand fractional part, and
     3. including no trailing zeroes in the significand fractional part (other than as part of a ".0" required to satisfy the preceding point), and
     4. including a capital "E", and
     5. including no plus sign in the exponent, and
     6. including no insignificant leading zeroes in the exponent
  6. MUST represent all strings (including object member names) in their minimal-length UTF-8 encoding
     1. avoiding escape sequences for characters except those otherwise inexpressible in JSON (U+0022 QUOTATION MARK, U+005C REVERSE SOLIDUS, and ASCII control characters U+0000 through U+001F) or UTF-8 (U+D800 through U+DFFF), and
     2. avoiding escape sequences for combining characters, variation selectors, and other code points that affect preceding characters, and
     3. using two-character escape sequences where possible for characters that require escaping:
        * `\b` U+0008 BACKSPACE
        * `\t` U+0009 CHARACTER TABULATION ("tab")
        * `\n` U+000A LINE FEED ("newline")
        * `\f` U+000C FORM FEED
        * `\r` U+000D CARRIAGE RETURN
        * `\"` U+0022 QUOTATION MARK
        * `\\` U+005C REVERSE SOLIDUS ("backslash"), and
     4. using six-character `\u00xx` uppercase hexadecimal escape sequences for control characters that require escaping but lack a two-character sequence, and
     5. using six-character `\uDxxx` uppercase hexadecimal escape sequences for lone surrogates

## Example

```json
{"-0":0,"-1":-1,"0.1":1.0E-1,"1":1,"10.1":1.01E1,"emoji":"????","escape":"\u001B","lone surrogate":"\uDEAD","whitespace":" \t\n\r"}
```

## Implementations

The following projects are known to correctly implement this specification:
* [canonicaljson-go](https://godoc.org/github.com/gibson042/canonicaljson-go)

If you know of any others, please submit a pull request to add them!

### Validation

This repository can be used to validate any implementation.

  1. Get a local copy of this repository.
  2. Create an executable that uses a candidate implementation to output the JSON canonical form of the contents of its first argument, exiting with a status of 0 if and only if the conversion was successful.
  3. Invoke `./test.sh /path/to/executable` from this repository, substituting the path to the above executable in the first argument.
  4. `test.sh` will provide known input and look for expected output, printing the results, exiting with a status of 0 if and only if the executable (and therefore the candidate implementation) adheres to this specification.

## Orignial project link

https://github.com/gibson042/canonicaljson-spec

## My approach 

First of all it is not finished, it currently passes all whitespace and malformed tests. I have tried to implemented the specifications of the definition in tokens yet I encountereda few problems during so. Nevertheless some of them pass, for example string test - short-escapes; while on others I got quite close but did not complete them as I encountered some problems. Specifically with string test - other-control-escapes; the implementation of the definition was perfect yet once I JSON.parse() the final work it would go back to square one. Will try to solve this problem or ask for help/guidance from someone. Overall it was a great experience and a learnt a lot.
