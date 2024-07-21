# BRW - Binary Reader Writer

## Install

`npm install brw`

## Reader

```js
var Reader = require("brw").Reader;

var r = new Reader(arrayBuffer);

// Static length read functions
r.readInt8()
r.readInt16()
r.readInt32()
r.readUInt8()
r.readUInt16()
r.readUInt32()
r.readFloat32()
r.readFloat64()

// Variable length integer
r.readVarInt()
r.readUVarInt()

// UTF8 String read
r.readString() // Assumes the string has a length prefix
r.readString({ prefixed: false, len: 100 }) // Read 100 characters
```

## Writer

```js
var Writer = require("brw").Writer;

var w = new Writer();

// Static length read functions
w.writeInt8(var)
w.writeInt16(var)
w.writeInt32(var)
w.writeUInt8(var)
w.writeUInt16(var)
w.writeUInt32(var)
w.writeFloat32(var)
w.writeFloat64(var)

// Variable length integer
w.writeVarInt(var)
w.writeUVarInt(var)

// UTF8 String read
w.writeString(var) // Prefixed string with length
w.writeString(var, { prefixed: false })
```
