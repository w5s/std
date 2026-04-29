import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { definitions } from './definitions';

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
  return <dfn {...props} className={clsx(styles.def, props.className)}><abbr title={definitions[props.abbr]} children={props.abbr}></abbr></dfn>;
}
