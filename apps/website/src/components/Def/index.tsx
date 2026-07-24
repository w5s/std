import clsx from 'clsx';
import React from 'react';

import { definitions } from './definitions';
import styles from './styles.module.css';

export interface DefProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'children'> {
  abbr: keyof typeof definitions;
}

/**
 * A component to display a definition with a tooltip.
 *
 * @example
 * <Def title="FP" />
 * @param props
 */
export function Def(props: DefProps) {
  return <dfn {...props} className={clsx(styles.def, props.className)}><abbr children={props.abbr} title={definitions[props.abbr]}></abbr></dfn>;
}
