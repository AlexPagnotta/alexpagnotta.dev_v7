import a from "./extrusions/a.svg?url";
import e from "./extrusions/e.svg?url";
import g from "./extrusions/g.svg?url";
import l from "./extrusions/l.svg?url";
import n from "./extrusions/n.svg?url";
import o from "./extrusions/o.svg?url";
import p from "./extrusions/p.svg?url";
import t from "./extrusions/t.svg?url";
import x from "./extrusions/x.svg?url";

const EXTRUSIONS = { A: a, E: e, G: g, L: l, N: n, O: o, P: p, T: t, X: x } as Readonly<Record<string, typeof a>>;

/** The letter's extrusion as a CSS `url()`, or `undefined` for a letter without one. */
export const extrusionFor = (letter: string) => {
  const src = EXTRUSIONS[letter];
  return src && `url(${typeof src === "string" ? src : src.src})`;
};
